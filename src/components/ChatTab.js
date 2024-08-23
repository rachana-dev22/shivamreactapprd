import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Switch, Avatar } from "@mui/material";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";

export default function ChatTab() {
  const auth = getAuth();
  const db = getFirestore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [anonymous, setAnonymous] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "chats");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const user = auth.currentUser;

    await addDoc(collection(db, "chats"), {
      text: message,
      displayName: anonymous ? "Anonymous" : user.displayName,
      avatar: anonymous ? null : user.photoURL,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  useEffect(() => {
    const messagesRef = collection(db, "chats");
    const cleanupOldMessages = async () => {
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      const q = query(messagesRef, orderBy("timestamp"));

      try {
        const snapshot = await getDocs(q);

        snapshot.docs.forEach(async (doc) => {
          const messageTimestamp = doc.data().timestamp;
          if (messageTimestamp && messageTimestamp.toMillis() < cutoff) {
            try {
              await deleteDoc(doc.ref);
            } catch (error) {
              console.log(`Failed to delete doc ${doc.id}:`, error.message);
            }
          }
        });
      } catch (error) {
        console.log("Error fetching documents for cleanup:", error.message);
      }
    };
    cleanupOldMessages();
  }, [db]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 80px)" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {messages.map((msg, index) => {
          const prevMsg = messages[index - 1];
          const nextMsg = messages[index + 1];
          const isSameUser = prevMsg && msg.userId === prevMsg.userId;
          const isWithinTimeLimit = prevMsg && msg.timestamp && prevMsg.timestamp && msg.timestamp.toMillis() - prevMsg.timestamp.toMillis() < 5 * 60 * 1000; // 5 minutes

          const isLastInGroup = nextMsg && (msg.userId !== nextMsg.userId || (nextMsg.timestamp && msg.timestamp && nextMsg.timestamp.toMillis() - msg.timestamp.toMillis() > 5 * 60 * 1000));

          const showAvatarAndName = !(isSameUser && isWithinTimeLimit);

          return (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                alignSelf: msg.userId === auth.currentUser.uid ? "flex-end" : "flex-start",
                flexDirection: msg.userId === auth.currentUser.uid ? "row-reverse" : "row",
                mb: isLastInGroup ? 2 : 0.2,
                ml: showAvatarAndName ? 0 : 6,
              }}
            >
              {showAvatarAndName && msg.userId !== auth.currentUser.uid && <Avatar src={msg.photoURL || msg.avatar} sx={{ mr: msg.userId !== auth.currentUser.uid ? 1 : 0, ml: msg.userId === auth.currentUser.uid ? 1 : 0 }} />}
              <Box
                sx={{
                  maxWidth: "70%",
                  textAlign: msg.userId === auth.currentUser.uid ? "right" : "left",
                }}
              >
                {showAvatarAndName && (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: msg.userId === auth.currentUser.uid ? "flex-end" : "flex-start" }}>
                    {msg.userId === auth.currentUser.uid && (
                      <Typography variant="caption" color="textSecondary" sx={{ ml: 1, mr: 1 }}>
                        {new Date(msg.timestamp?.toMillis()).toLocaleTimeString()}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {msg.displayName}
                    </Typography>
                    {msg.userId !== auth.currentUser.uid && (
                      <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                        {new Date(msg.timestamp?.toMillis()).toLocaleTimeString()}
                      </Typography>
                    )}
                  </Box>
                )}
                <Box
                  sx={{
                    backgroundColor: msg.userId === auth.currentUser.uid ? "#1976d2" : "#e0e0e0",
                    color: msg.userId === auth.currentUser.uid ? "#fff" : "#000",
                    borderRadius: 2,
                    p: 1,
                    fontFamily: "Mulish, sans-serif",
                    display: "inline-block",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    textAlign: msg.userId === auth.currentUser.uid ? "right" : "left",
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            </Box>
          );
        })}

        <div ref={messagesEndRef} />
        {doc && null}
      </Box>

      <Box
        sx={{
          borderTop: "0.5px solid #eee",
          p: "0px 10px",
          boxShadow: "0 -1px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="caption">Chats delete after 24 hours</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              Anonymous Mode
            </Typography>
            <Switch checked={anonymous} onChange={() => setAnonymous(!anonymous)} />
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <TextField fullWidth variant="outlined" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} sx={{ mr: 1 }} />
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
