import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-sky-100 to-violet-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-3">AI-Generated Journal</h1>
        <p className="text-gray-600 mb-6">Dump your thoughts. Get a polished entry, mood, and a tip for tomorrow.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/journal" className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Start Journaling</Link>
          <Link to="/history" className="px-5 py-3 rounded-lg bg-white border hover:bg-gray-50">View History</Link>
        </div>
      </div>
    </section>
  );
}
