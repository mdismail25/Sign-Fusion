// Intro.jsx
import React from "react";

function Intro() {
  return (
    <section className="intro-holo" id="intro">
      <div className="container text-center">
        <div className="intro-box">
          <h2 className="fw-bold">We've what you need!</h2>
          <div className="divider" />
          <p className="intro-text">
            A comprehensive and aesthetic Indian Sign Language toolkit,
            featuring a futuristic yet accessible interface. Dive into
            features designed for inclusivity and clarity.
          </p>
        </div>
      </div>
      <style>{`
        .intro-holo {
          background: linear-gradient(135deg, #080b12, #1a2533);
          color: #e8f1ff;
          padding: 100px 0;
          font-family: 'Segoe UI', sans-serif;
        }
        .intro-box {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 3rem;
          max-width: 750px;
          margin: 0 auto;
          box-shadow: 0 0 25px rgba(0,255,255,0.08);
        }
        .divider {
          width: 80px;
          height: 4px;
          margin: 1rem auto;
          background: linear-gradient(90deg, #5efcff, #b76cff);
          border-radius: 2px;
        }
        .intro-text {
          font-size: 1.15rem;
          color: #c6d5eb;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}

export default Intro;
