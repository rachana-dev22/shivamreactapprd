import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Switch, Avatar } from "@mui/material";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
      const cutoff = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago
      const q = query(messagesRef, orderBy("timestamp"));
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().timestamp && doc.data().timestamp.toMillis() < cutoff) {
            deleteDoc(doc.ref);
          }
        });
      });
    };
    cleanupOldMessages();
  }, [db]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 115px)" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent: msg.userId === auth.currentUser.uid ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            {msg.userId !== auth.currentUser.uid && msg.avatar && <Avatar src={msg.avatar} sx={{ mr: 1 }} />}
            <Box sx={{ maxWidth: "70%" }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {msg.displayName}
              </Typography>
              <Box
                sx={{
                  backgroundColor: msg.userId === auth.currentUser.uid ? "#1976d2" : "#e0e0e0",
                  color: msg.userId === auth.currentUser.uid ? "#fff" : "#000",
                  borderRadius: 2,
                  p: 1,
                  fontFamily: "Mulish, sans-serif",
                }}
              >
                {msg.text}
              </Box>
              <Typography variant="caption" color="textSecondary">
                {new Date(msg.timestamp?.toMillis()).toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
        {doc && null}
      </Box>

      <Box sx={{ borderTop: "1px solid #ddd", p: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="caption">Chats delete after 24 hours</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              Anonymous Mode
            </Typography>
            <Switch checked={anonymous} onChange={() => setAnonymous(!anonymous)} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", mt: 1 }}>
          <TextField fullWidth variant="outlined" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} sx={{ mr: 1 }} />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
