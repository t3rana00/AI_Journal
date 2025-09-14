import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-center">
      <h1 className="fw-bold display-5 text-primary mb-3">Welcome to AI Journal</h1>
      <p className="text-muted mb-4">
        Dump your thoughts, get a polished entry, mood insight, and a tip for tomorrow.
      </p>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/journal" className="btn btn-primary btn-lg">
          Start Journaling
        </Link>
        <Link to="/history" className="btn btn-outline-secondary btn-lg">
          View History
        </Link>
      </div>

      <div className="mt-5">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">✨ Polished Entries</h5>
                <p className="card-text">Turn rough notes into a clean journal entry in seconds.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🎭 Mood Insight</h5>
                <p className="card-text">Get a simple mood label based on what you wrote.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">💡 Suggestions</h5>
                <p className="card-text">A tiny tip to make tomorrow a little better.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
