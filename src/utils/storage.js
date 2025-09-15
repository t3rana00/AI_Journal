import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

const COLLECTION = "entries";

export async function getEntries() {
  try {
    if (!auth.currentUser) return [];
    const q = query(collection(db, COLLECTION), where("user", "==", auth.currentUser.email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
}

export async function saveEntry(entry) {
  try {
    if (!auth.currentUser) throw new Error("User not logged in");
    const docRef = await addDoc(collection(db, COLLECTION), {
      user: auth.currentUser.email,
      ...entry,
    });
    return { id: docRef.id, ...entry };
  } catch (error) {
    console.error("Error saving entry:", error);
    return null;
  }
}

export async function deleteEntry(id) {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

export async function clearAll() {
  try {
    if (!auth.currentUser) return;
    const q = query(collection(db, COLLECTION), where("user", "==", auth.currentUser.email));
    const snapshot = await getDocs(q);
    const deletions = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletions);
  } catch (error) {
    console.error("Error clearing entries:", error);
  }
}
