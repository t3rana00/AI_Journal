import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./pages/Home";
import Journal from "./pages/Journal";
import History from "./pages/History";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Listen for auth state changes (keeps user logged in after refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.email);
      } else {
        setLoggedInUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar */}
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
              {!loggedInUser ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/journal">Journal</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-link nav-link text-danger">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="card shadow-sm p-4" style={{ background: "rgba(255,255,255,0.88)", borderRadius: 16 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!loggedInUser ? <Login onLogin={(user) => setLoggedInUser(user)} /> : <Navigate to="/journal" />} />
              <Route path="/signup" element={!loggedInUser ? <Signup /> : <Navigate to="/journal" />} />
              <Route path="/journal" element={loggedInUser ? <Journal user={loggedInUser} onLogout={handleLogout} /> : <Navigate to="/login" />} />
              <Route path="/history" element={loggedInUser ? <History /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-3 border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} Nadeesha’s AI Journal — Firebase + React
        </small>
      </footer>
    </div>
  );
}
