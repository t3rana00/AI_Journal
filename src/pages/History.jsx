import { useEffect, useState } from "react";
import { getEntries, deleteEntry, clearAll } from "../utils/storage";

export default function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getEntries();
      setEntries(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to delete all entries?")) return;
    await clearAll();
    setEntries([]);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary mb-0">📜 Your History</h2>
        {entries.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading entries...</p>
      ) : entries.length === 0 ? (
        <p className="text-muted">No entries found.</p>
      ) : (
        entries.map((e) => (
          <div key={e.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6 className="text-muted">{new Date(e.date).toLocaleString()}</h6>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  🗑 Delete
                </button>
              </div>
              <p className="mb-2">{e.polished}</p>
              {e.mood && <small className="text-secondary">Mood: {e.mood}</small>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
