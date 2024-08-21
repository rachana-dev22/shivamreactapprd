import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export async function checkPaymentStatus() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return data.paymentStatus || "free";
    } else {
      await setDoc(userRef, { paymentStatus: "free" });
      return "free";
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    return "free";
  }
}

export async function updatePaymentStatus(userId, status) {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    await setDoc(userRef, { paymentStatus: status }, { merge: true });
    console.log("Payment status updated successfully");
  } catch (error) {
    console.error("Error updating payment status:", error);
  }
}
