import React, { useState, useEffect } from "react";
import "../App.css";

function Feedback() {
  const [formData, setFormData] = useState({ name: "", email: "", feedback: "" });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({ name: "", email: "", feedback: "" });
        setSuccessMessage("✅ Feedback received. Thank you!");
      } else {
        setSuccessMessage("❌ " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSuccessMessage("❌ Failed to send feedback");
    }

    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // keep a single source of truth for card width so footer can match it
  const CARD_MAX_WIDTH = "550px";

  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #0f0c29, #302b63, #24243e)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Orbitron', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main area — centers the card horizontally & vertically (with padding) */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: CARD_MAX_WIDTH,
            background: "rgba(0,0,0,0.7)",
            border: "2px solid #00ffe0",
            borderRadius: "15px",
            padding: "40px",
            boxShadow: "0 0 30px #00ffe0",
            animation: "neonPulse 3s infinite ease-in-out",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#00ffe0" }}>
            ✨ Leave Your Feedback
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group mb-4">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group mb-4">
              <label>Feedback</label>
              <textarea
                rows="4"
                name="feedback"
                required
                value={formData.feedback}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#00ffe0",
                color: "#000",
                fontWeight: "bold",
                padding: "10px 25px",
                border: "none",
                borderRadius: "8px",
                width: "100%",
                boxShadow: "0 0 20px #00ffe0",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
              }}
            >
              🚀 Submit Feedback
            </button>
          </form>

          {successMessage && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#0f0c29",
                border: "1px solid #00ffe0",
                color: "#00ffe0",
                textAlign: "center",
                borderRadius: "10px",
                animation: "fadeIn 0.8s ease-in",
              }}
            >
              {successMessage}
            </div>
          )}
        </div>
      </main>

      {/* Footer: centered and matched to the card's max width so it's properly aligned */}
      <footer
        style={{
          width: "100%",
          backgroundColor: "#020617",
          borderTop: "1px solid #1e293b",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            maxWidth: CARD_MAX_WIDTH,
            margin: "0 auto",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, color: "#475569" }}>© {new Date().getFullYear()} SignFusion.</p>
        </div>
      </footer>

      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

        @keyframes neonPulse {
          0% { box-shadow: 0 0 10px #00ffe0; }
          50% { box-shadow: 0 0 25px #00ffe0, 0 0 50px #00ffe0; }
          100% { box-shadow: 0 0 10px #00ffe0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        input, textarea {
          outline: none;
        }
        `}
      </style>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 15px",
  backgroundColor: "transparent",
  color: "#00ffe0",
  border: "1px solid #00ffe0",
  borderRadius: "8px",
  fontFamily: "'Orbitron', sans-serif",
};

export default Feedback;
