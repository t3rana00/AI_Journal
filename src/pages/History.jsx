import { useEffect, useState } from "react";
import MoodBadge from "../components/MoodBadge";
import { getEntries, deleteEntry, clearAll } from "../utils/storage";

export default function History() {
  const [entries, setEntries] = useState([]);

  const load = () => setEntries(getEntries());
  useEffect(load, []);

  const handleDelete = (id) => {
    deleteEntry(id);
    load();
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Your Journal</h2>
        <button onClick={() => { if (confirm("Clear all entries?")) { clearAll(); load(); } }}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-50">Clear All</button>
      </div>

      {!entries.length && <p className="text-gray-600">No entries yet. Write your first one on the Journal page.</p>}

      <div className="grid md:grid-cols-2 gap-4">
        {entries.map(e => (
          <article key={e.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">{formatDate(e.date)}</span>
              <MoodBadge mood={e.mood} />
            </div>
            <p className="text-sm text-gray-500 line-clamp-3 mb-2 italic">Raw: {e.raw}</p>
            <p className="text-gray-800">{e.polished}</p>
            <div className="mt-3 text-sm text-gray-600"><b>Suggestion:</b> {e.suggestion}</div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => handleDelete(e.id)} className="text-red-600 text-sm hover:underline">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
