import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import History from "./pages/History";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">AI Journal</Link>
          <div className="flex gap-4 text-sm">
            <Link to="/journal" className="hover:underline">Journal</Link>
            <Link to="/history" className="hover:underline">History</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/history" element={<History />} />
      </Routes>

      <footer className="mt-12 py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  );
}
