import { useState } from "react";
import MoodBadge from "../components/MoodBadge";
import { generateFromNotes } from "../utils/ai";
import { saveEntry } from "../utils/storage";

export default function Journal() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    const r = await generateFromNotes(notes);
    setResult(r);
  };

  const handleSave = async () => {
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
    alert("Saved to your journal ✨");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Write about your day</h2>

      <div className="journal-page">
        <textarea
          className="w-full h-64 bg-transparent outline-none journal-text"
          placeholder="e.g., had a tough exam but coffee with friends helped..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={handleGenerate} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
          Generate with AI (mock)
        </button>
        <button
          onClick={handleSave}
          disabled={!result?.entry || saving}
          className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Entry"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-5 rounded-xl border bg-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Polished Entry</h3>
            <MoodBadge mood={result.mood} />
          </div>
          <p className="text-gray-800 leading-7">{result.entry}</p>
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">Suggestion for tomorrow:</span> {result.suggestion}
          </div>
        </div>
      )}
    </div>
  );
}
