import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import Masthead from "../Components/Home/Masthead";
import Intro from "../Components/Home/Intro";
import Services from "../Components/Home/Services";

function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #00040f, #011627)",
        minHeight: "100vh",
        color: "#e0f2fe",
        fontFamily: "'Orbitron', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(to right, #0f172a, #1e3a8a)",
          position: "relative",
        }}
      >
        <div className="container text-center position-relative z-1">
          <h1
            className="display-3 fw-bold"
            style={{ color: "#0ff", textShadow: "0 0 15px #0ff" }}
          >
            SignFusion
          </h1>
          <p className="lead" style={{ maxWidth: "680px", margin: "0 auto", color: "#cbd5e1" }}>
            Experience next-gen sign language interaction with immersive 3D avatars and dynamic gestures.
          </p>
          <div
            className="mt-5 p-5 rounded-5 shadow-lg"
            style={{
              background: "rgba(0, 255, 255, 0.06)",
              border: "1px solid #0ff2",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(0, 255, 255, 0.1)",
            }}
          >
            <Masthead />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <h2 className="fw-bold" style={{ color: "#0ea5e9" }}>Explore the Future</h2>
              <p className="fs-5" style={{ color: "#bae6fd" }}>
                Dive into intelligent gesture recognition, AI-powered motion, and a visually futuristic UI.
              </p>
            </div>
          </div>
          <div
            className="mt-4 rounded-5 shadow-lg p-5"
            style={{
              background: "linear-gradient(120deg, #0f172a, #334155)",
              border: "1px solid #1e3a8a",
              boxShadow: "0 0 60px rgba(14, 165, 233, 0.15)",
            }}
          >
            <Intro />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <h2 className="fw-bold" style={{ color: "#10b981" }}>Innovative Solutions</h2>
              <p className="fs-5" style={{ color: "#a7f3d0" }}>
                From real-time avatar sign translation to accessible learning modules — we're shaping the future of inclusive communication.
              </p>
            </div>
          </div>
          <div
            className="mt-4 rounded-5 shadow-lg p-5"
            style={{
              background: "linear-gradient(120deg, #022c22, #064e3b)",
              border: "1px solid #10b981",
              boxShadow: "0 0 60px rgba(16, 185, 129, 0.15)",
            }}
          >
            <Services />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer
        className="text-center py-3"
        style={{ backgroundColor: "#020617", borderTop: "1px solid #1e293b" }}
      >
        <p className="mb-0 text-sm" style={{ color: "#475569" }}>
          © {new Date().getFullYear()} SignFusion. 
        </p>
      </footer>
    </div>
  );
}

export default Home;
