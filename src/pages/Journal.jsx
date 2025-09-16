import { useState } from "react";
import { generateFromNotes } from "../utils/ai";
import { saveEntry } from "../utils/storage";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function Journal({ user }) {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null); // ✅ for showing success/error

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    try {
      console.log("Generating entry from notes:", notes);
      const r = await generateFromNotes(notes);
      console.log("AI generated result:", r);
      setResult(r);
    } catch (error) {
      console.error("❌ Error generating entry:", error);
      setAlert({ type: "danger", message: "Failed to generate entry. Try again." });
    }
  };

  const handleSave = async () => {
    if (!result?.entry) return;
    setSaving(true);
    try {
      console.log("Saving entry to Firestore...");
      const docId = await saveEntry({
        date: new Date().toISOString(),
        raw: notes.trim(),
        polished: result.entry,
        mood: result.mood,
        suggestion: result.suggestion,
      });
      console.log("✅ Entry saved with ID:", docId);
      setAlert({ type: "success", message: "Entry saved successfully!" });

      // Reset form
      setNotes("");
      setResult(null);
    } catch (error) {
      console.error("❌ Error saving entry:", error);
      setAlert({ type: "danger", message: "Failed to save entry. Check console." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="journal-container">
      {/* Alert Notification */}
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
          ></button>
        </div>
      )}

      {/* Date Header */}
      <div className="journal-header">
        <h2>📅 {today}</h2>
        <p className="welcome-text">
          {user ? `Welcome back, ${user}!` : "Write about your day below."}
        </p>
      </div>

      {/* Journal Page */}
      <div className="journal-page-with-tape">
        <div className="washi-tape top"></div>
        <div className="journal-page">
          <textarea
            className="journal-textarea"
            rows="8"
            placeholder="Dear Journal..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="washi-tape bottom"></div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button
          onClick={handleGenerate}
          className="btn btn-primary"
          disabled={!notes.trim()}
        >
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

      {/* Polished Entry Display */}
      {result && (
        <div className="card mt-4 border-primary-subtle shadow-sm journal-result">
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
