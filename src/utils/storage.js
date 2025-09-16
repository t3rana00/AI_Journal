import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth } from "../firebase";

const COLLECTION = "entries";

export async function getEntries() {
  if (!auth.currentUser) return [];
  try {
    const q = query(
      collection(db, COLLECTION),
      where("user", "==", auth.currentUser.email),
      orderBy("date", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
}

export async function saveEntry(entry) {
  if (!auth.currentUser) {
    console.error("Cannot save entry — no user logged in.");
    return null;
  }
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...entry,
      user: auth.currentUser.email,
    });
    console.log("Entry saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving entry:", error);
    throw error;
  }
}

export async function deleteEntry(id) {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
    console.log("Deleted entry:", id);
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

export async function clearAll() {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("user", "==", auth.currentUser.email)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => deleteDoc(doc(db, COLLECTION, d.id)));
    console.log("All entries cleared");
  } catch (error) {
    console.error("Error clearing entries:", error);
  }
}
