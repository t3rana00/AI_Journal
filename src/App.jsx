import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import History from "./pages/History";

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar with soft glass background */}
      <nav
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)" }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            AI Journal
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/journal">Journal</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-grow-1 py-5">
        <div className="container">
          {/* Glassy card over gradient */}
          <div className="card shadow-sm p-4" style={{ background: "rgba(255,255,255,0.88)", borderRadius: 16 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-3 border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} Nadeesha’s AI Journal — Bootstrap + React
        </small>
      </footer>
    </div>
  );
}
