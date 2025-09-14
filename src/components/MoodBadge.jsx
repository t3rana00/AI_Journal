export default function MoodBadge({ mood }) {
  const color =
    mood === "Positive"
      ? "bg-green-100 text-green-700 border border-green-300"
      : mood === "Stressed"
      ? "bg-red-100 text-red-700 border border-red-300"
      : "bg-gray-100 text-gray-700 border border-gray-300";
  return (
    <span className={`inline-block px-3 py-1 text-sm rounded-full ${color}`}>
      {mood}
    </span>
  );
}
