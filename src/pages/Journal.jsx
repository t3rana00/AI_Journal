import { useState } from "react";
import { generateFromNotes } from "../utils/ai";
import { saveEntry } from "../utils/storage";

export default function Journal({ user, onLogout }) {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    const r = await generateFromNotes(notes);
    setResult(r);
  };

  const handleSave = () => {
    if (!result?.entry) return;
    setSaving(true);
    saveEntry({
      date: new Date().toISOString(),
      raw: notes.trim(),
      polished: result.entry,
      mood: result.mood,
      suggestion: result.suggestion,
    });
    setSaving(false);
    setNotes("");
    setResult(null);
    alert("✅ Entry saved!");
  };

  return (
    <div>
      {/* Added greeting + logout button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-primary">
          📝 Write About Your Day {user && `— Welcome, ${user}`}
        </h2>
        {onLogout && (
          <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
            Logout
          </button>
        )}
      </div>

      <div className="journal-page mb-3">
        <textarea
          className="form-control border-0 bg-transparent"
          rows="8"
          placeholder="Type your thoughts…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button onClick={handleGenerate} className="btn btn-primary">
          ✨ Generate Entry
        </button>
        <button
          onClick={handleSave}
          className="btn btn-success"
          disabled={!result?.entry || saving}
        >
          {saving ? "Saving…" : "💾 Save"}
        </button>
      </div>

      {result && (
        <div className="card mt-4 border-primary-subtle shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-primary">Your Polished Entry</h5>
            <p className="card-text">{result.entry}</p>
            <p className="text-muted mb-0">
              <strong>💡 Tip for Tomorrow:</strong> {result.suggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
