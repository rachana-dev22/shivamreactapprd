const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const e = "every 1 min";
exports.delOldChats = functions.pubsub.schedule(e).onRun(async () => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago
  const cutoffTimestamp = admin.firestore.Timestamp.fromMillis(cutoff);

  const chatsRef = db.collection("chats");
  const oldChatsQuery = chatsRef.where("timestamp", "<=", cutoffTimestamp);

  const oldChatsSnapshot = await oldChatsQuery.get();

  const batch = db.batch();

  oldChatsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  console.log("Deleted old chats successfully.");
  return null;
});
