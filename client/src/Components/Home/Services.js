// Services.jsx  – holographic‑tilt redesign
import React from "react";
import { Link } from "react-router-dom";
import imgConvert from "../../Assets/convert.png";
import imgLearnSign from "../../Assets/learn-sign.jpg";

function Services() {
  /* ───────── 3‑D tilt handlers ───────── */
  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;         // cursor X within card
    const y = e.clientY - rect.top;          // cursor Y within card
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    /* map cursor position to rotation degrees */
    const rotY = ((x - midX) / midX) * 10;   // ±10°
    const rotX = (-(y - midY) / midY) * 10;  // ±10°
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };
  const resetMove = (e) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <>
      {/* ───── Inline CSS (self‑contained) ───── */}
      <style>{`
        .services-holo {
          background: linear-gradient(145deg, #080b12 0%, #101823 100%);
          color: #f8f9fa;
          padding: 100px 0 120px;
          font-family: "Segoe UI", sans-serif;
        }
        .services-holo h2 {
          font-size: 2.8rem;
          font-weight: 700;
        }
        .services-holo .subtitle {
          color: #9ba2b2;
          font-size: 1.15rem;
        }

        /* holographic card shell */
        .holo-card {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }
        .holo-card:hover {
          box-shadow: 0 25px 45px rgba(0, 255, 255, 0.18);
        }
        /* inner content box */
        .holo-inner {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          position: relative;
          z-index: 2;
        }
        .holo-inner img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }
        .holo-body {
          padding: 2rem;
        }
        .holo-body h5 {
          font-size: 1.55rem;
          font-weight: 600;
          background: linear-gradient(90deg, #5efcff, #b76cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .holo-body p {
          color: #c7d1e0;
          margin-bottom: 1.6rem;
          line-height: 1.55;
        }
        .holo-btn {
          display: block;
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          background: linear-gradient(120deg, #5efcff, #b76cff 60%, #ff8cfa);
          color: #040510;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .holo-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(94, 252, 255, 0.35);
        }

        /* holographic animated border via pseudo */
        .holo-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          padding: 2px;
          background: conic-gradient(from 0deg,
            #5efcff, #ff8cfa, #b76cff, #5efcff);
          -webkit-mask: 
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          animation: spinBorder 8s linear infinite;
        }
        @keyframes spinBorder {
          to { transform: rotate(1turn); }
        }

        @media(max-width: 768px) {
          .services-holo h2 { font-size: 2.2rem; }
          .holo-inner img { height: 200px; }
        }
      `}</style>

      {/* ───── Section Content ───── */}
      <section className="services-holo" id="services">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Our Services</h2>
            <div
              style={{
                width: "90px",
                height: "4px",
                background: "linear-gradient(90deg,#5efcff,#b76cff)",
                margin: "16px auto",
                borderRadius: "2px",
              }}
            />
            <p className="subtitle">
              Discover tools for converting and learning Indian Sign Language&mdash;perfect for
              both novices and pros.
            </p>
          </div>

          <div className="row g-5">
            {/* Convert Card */}
            <div className="col-lg-6">
              <div
                className="holo-card"
                onMouseMove={handleMove}
                onMouseLeave={resetMove}
              >
                <div className="holo-inner">
                  <img src={imgConvert} alt="Convert" />
                  <div className="holo-body">
                    <h5>Convert</h5>
                    <p>
                      Transform voice or text or document/PDF/text file into Indian Sign Language in
                      seconds. Speak, type, and watch the magic unfold.
                    </p>
                    <Link to="/sign-kit/convert" className="holo-btn">
                       <div className="w-100 text-center">Explore Now!</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Learn Sign Card */}
            <div className="col-lg-6">
              <div
                className="holo-card"
                onMouseMove={handleMove}
                onMouseLeave={resetMove}
              >
                <div className="holo-inner">
                  <img src={imgLearnSign} alt="Learn Sign" />
                  <div className="holo-body">
                    <h5>Learn Sign</h5>
                    <p>
                      Browse a rich library of ISL signs and practise on loop.
                      Master sign language at your own pace!
                    </p>
                    <Link to="/sign-kit/learn-sign" className="holo-btn">
                       <div className="w-100 text-center">Explore Now!</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
