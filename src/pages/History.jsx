import { useEffect, useState } from "react";
import { getEntries, deleteEntry, clearAll } from "../utils/storage";

export default function History() {
  const [entries, setEntries] = useState([]);

  const load = () => setEntries(getEntries());
  useEffect(load, []);

  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0 text-primary">Your Journal</h2>
        <button className="btn btn-outline-danger btn-sm"
          onClick={() => { if (confirm("Clear all entries?")) { clearAll(); load(); } }}>
          Clear All
        </button>
      </div>

      {!entries.length && <p className="text-muted">No entries yet. Write one in the Journal tab.</p>}

      <div className="row g-3">
        {entries.map(e => (
          <div className="col-md-6" key={e.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <small className="text-muted">{formatDate(e.date)}</small>
                  <span className="badge bg-secondary">{e.mood}</span>
                </div>
                <p className="fst-italic text-muted small">Raw: {e.raw}</p>
                <p className="mb-2">{e.polished}</p>
                <p className="text-muted mb-3"><strong>Tip:</strong> {e.suggestion}</p>
                <div className="text-end">
                  <button className="btn btn-outline-danger btn-sm" onClick={() => { deleteEntry(e.id); load(); }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
