export default function MoodBadge({ mood }) {
  const color = mood === "Positive" ? "bg-green-100 text-green-700"
              : mood === "Stressed" ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700";
  return <span className={`inline-block px-2 py-1 text-sm rounded ${color}`}>{mood}</span>;
}
