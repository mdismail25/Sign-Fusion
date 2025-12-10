// Pages/Register.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("❌ Passwords do not match!");
      return;
    }

    const userToStore = {
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };
    localStorage.setItem("user", JSON.stringify(userToStore));

    alert("🎉 Account created. Please login with your credentials.");
    navigate("/sign-kit/login", { replace: true });
  };

  // 🌌 Cosmic starfield + meteor animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      o: Math.random() * 0.9 + 0.1,
    }));

    let meteors = [];

    const createMeteor = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height / 3);
      meteors.push({
        x: startX,
        y: startY,
        length: 180 + Math.random() * 100,
        speed: 10 + Math.random() * 6,
        angle: Math.PI / 4 + Math.random() * 0.2,
        opacity: 1,
      });
    };

    const drawStars = () => {
      ctx.fillStyle = "white";
      for (let s of stars) {
        ctx.globalAlpha = s.o;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawMeteors = () => {
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(0,255,255,${m.opacity})`);
        gradient.addColorStop(0.5, `rgba(255,0,255,${m.opacity * 0.6})`);
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.015;

        if (m.opacity <= 0) meteors.splice(i, 1);
      }
    };

    let meteorTimer = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(2, 5, 25, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawStars();
      drawMeteors();
      meteorTimer++;
      if (meteorTimer % 80 === 0 && meteors.length < 10) createMeteor();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="auth-bg">
      <canvas ref={canvasRef} className="cosmic-bg"></canvas>

      <div className="auth-card neo-glass">
        <h2 className="auth-title">
          <span className="highlight">CREATE</span> ACCOUNT
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="fname"
            placeholder="🧍‍♂️ First Name"
            onChange={handleChange}
            required
          />
          <input
            name="lname"
            placeholder="🧍‍♀️ Last Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="📧 Email Address"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="🔒 Create Password"
            onChange={handleChange}
            required
          />
          <input
            name="confirm"
            type="password"
            placeholder="🔁 Confirm Password"
            onChange={handleChange}
            required
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="auth-btn neon-btn">
            REGISTER NOW
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => navigate("/sign-kit/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Exo+2:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        .auth-bg {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 30%, #010314 0%, #000008 100%);
          overflow: hidden;
          position: relative;
        }
        .cosmic-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0;
        }
        .neo-glass {
          position: relative;
          z-index: 10;
          background: rgba(15, 20, 40, 0.9);
          border: 1px solid rgba(0, 255, 195, 0.5);
          border-radius: 20px;
          padding: 32px;
          width: 420px;
          box-shadow: 0 0 40px rgba(0,255,195,0.1), 0 0 100px rgba(0,128,255,0.2);
          backdrop-filter: blur(14px);
          animation: float 6s ease-in-out infinite alternate;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        .auth-title {
          font-family: 'Orbitron', sans-serif;
          color: #fff;
          font-size: 1.8rem;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }
        .highlight {
          color: #00ffc3;
          text-shadow: 0 0 15px #00ffc3, 0 0 25px #009dff;
        }
        input {
          display: block;
          width: 100%;
          margin: 10px 0;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(0,255,195,0.3);
          background: rgba(255,255,255,0.04);
          color: #e0f9f7;
          font-family: 'Exo 2', sans-serif;
          outline: none;
          transition: all 0.3s ease;
        }
        input:focus {
          border-color: #00ffc3;
          box-shadow: 0 0 10px #00ffc3;
        }
        .error-msg {
          color: #ff4f6d;
          text-align: center;
          margin-bottom: 10px;
        }
        .neon-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          font-family: 'Orbitron', sans-serif;
          color: #000;
          background: linear-gradient(90deg, #00ffc3, #009dff);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-top: 6px;
        }
        .neon-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: all 0.4s ease;
        }
        .neon-btn:hover::after {
          left: 100%;
        }
        .neon-btn:hover {
          box-shadow: 0 0 15px #00ffc3, 0 0 30px #009dff;
        }
        .switch-text {
          color: #b0f2ff;
          text-align: center;
          margin-top: 14px;
          font-family: 'Exo 2', sans-serif;
        }
        .link {
          color: #00ffc3;
          cursor: pointer;
          text-shadow: 0 0 5px #00ffc3;
          transition: all 0.3s ease;
        }
        .link:hover {
          color: #009dff;
          text-shadow: 0 0 10px #009dff;
        }
      `}</style>
    </div>
  );
}

export default Register;
