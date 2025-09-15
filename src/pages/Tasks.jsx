import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return; // route is protected, but just in case
    // Real-time query for this user’s tasks (newest first)
    const q = query(
      collection(db, "tasks"),
      where("user", "==", auth.currentUser.email),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const addTask = async () => {
    const title = newTask.trim();
    if (!title) return;
    await addDoc(collection(db, "tasks"), {
      user: auth.currentUser.email,
      title,
      completed: false,
      createdAt: serverTimestamp(),
    });
    setNewTask("");
  };

  const toggleComplete = async (id, current) => {
    await updateDoc(doc(db, "tasks", id), { completed: !current });
  };

  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div>
      <h2 className="mb-3 text-primary">✅ Task Sheet</h2>

      {/* Add Task */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New task…"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="btn btn-primary" onClick={addTask}>Add</button>
      </div>

      {loading ? (
        <p>Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted">No tasks yet. Add your first one! ✨</p>
      ) : (
        <ul className="list-group">
          {tasks.map((t) => (
            <li
              key={t.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                t.completed ? "text-decoration-line-through text-muted" : ""
              }`}
            >
              <span
                role="button"
                onClick={() => toggleComplete(t.id, t.completed)}
                title="Toggle complete"
              >
                {t.title}
              </span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeTask(t.id)}
                title="Delete task"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
