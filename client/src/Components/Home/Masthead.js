// Masthead.jsx
import React from "react";

function Masthead() {
  return (
    <section className="masthead-holo">
      <div className="container text-center">
        <h1 className="display-3 fw-bold">
          Welcome to <span className="gradient-text">Signfusion</span>
        </h1>
        <p className="lead subtitle">
          The toolkit for Indian Sign Language – crafted to be inclusive,
          informative, and intuitive.
        </p>
        <a className="holo-btn mt-4" href="#intro">
          Get Started
        </a>
      </div>
      <style>{`
        .masthead-holo {
          background: linear-gradient(145deg, #0b0c1a 0%, #101a2b 100%);
          color: #f0faff;
          padding: 140px 0 120px;
          text-align: center;
          font-family: 'Segoe UI', sans-serif;
        }
        .gradient-text {
          background: linear-gradient(90deg, #5efcff, #b76cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subtitle {
          font-size: 1.25rem;
          color: #a8b5c3;
        }
        .holo-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 32px;
          border: 10;
          background: linear-gradient(120deg, #5efcff, #b76cff);
          font-weight: 600;
          color: #111;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .holo-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(94, 252, 255, 0.35);
        }
      `}</style>
    </section>
  );
}

export default Masthead;