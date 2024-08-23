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
  console.log("getting here 1");
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    await setDoc(userRef, { paymentStatus: status }, { merge: true });
    console.log("Payment status updated successfully");
  } catch (error) {
    console.error("Error updating payment status:", error);
  }
}

export async function deleteUserAccount(userId) {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    await setDoc(userRef, { deleted: true }, { merge: true });
    console.log("User account deleted successfully");
  } catch (error) {
    console.error("Error deleting user account:", error);
  }
}
