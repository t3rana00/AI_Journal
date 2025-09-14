export async function generateFromNotes(raw) {
  const text = (raw || "").trim();
  if (!text) {
    return {
      entry: "",
      mood: "Neutral",
      suggestion: "Write a bit about your day to get started.",
    };
  }

  const low = text.toLowerCase();
  let mood = "Neutral";
  if (/(happy|fun|great|awesome|good|excited|proud|joy)/.test(low)) mood = "Positive";
  if (/(stress|tired|anxious|sad|angry|overwhelm|hard|frustrat)/.test(low)) mood = "Stressed";

  const entry =
    `Today, ${text.replace(/\s+/g, " ").trim().replace(/(^\w)/, m => m.toUpperCase())}.`;

  const suggestion =
    mood === "Positive"
      ? "Keep the momentum—note one thing you want to repeat tomorrow."
      : mood === "Stressed"
      ? "Try a 10-minute walk or a short breathing exercise in the morning."
      : "Plan one small, doable task to build momentum.";

  return { entry, mood, suggestion };
}
