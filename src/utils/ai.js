// super simple mock "AI" to get you moving
export async function generateFromNotes(raw) {
  const text = raw.trim();
  if (!text) return { entry: "", mood: "Neutral", suggestion: "Write a bit about your day." };

  // tiny mood heuristic
  const low = text.toLowerCase();
  let mood = "Neutral";
  if (/(happy|fun|great|awesome|good|excited|proud)/.test(low)) mood = "Positive";
  if (/(stress|tired|anxious|sad|angry|overwhelm|hard)/.test(low)) mood = "Stressed";

  const entry = `Today, ${text
    .replace(/^i\b/gi,"I")
    .replace(/\s+/g," ")
    .trim()
    .replace(/(^\w)/, (m) => m.toUpperCase())}.`;

  const suggestion =
    mood === "Positive"
      ? "Keep the momentum—write down one thing you want to repeat tomorrow."
      : mood === "Stressed"
      ? "Start tomorrow with 3 deep breaths and a 10-minute walk."
      : "Plan one small, doable task for tomorrow.";

  return { entry, mood, suggestion };
}
