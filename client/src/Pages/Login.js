// Pages/Login.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Generate captcha
  const generateCaptcha = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (captchaInput.trim().toUpperCase() !== captcha) {
      setError("⚠️ Captcha incorrect! Try again.");
      handleRefreshCaptcha();
      return;
    }

    const ADMIN_EMAIL = "admin@sign.com";
    const ADMIN_PASS = "admin";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const isAdmin =
      email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASS;

    const isRegisteredUser =
      storedUser &&
      storedUser.email.toLowerCase() === email.trim().toLowerCase() &&
      storedUser.password === password;

    if (isAdmin || isRegisteredUser) {
      localStorage.setItem("auth", "true");
      setAuth(true);
      navigate("/sign-kit/home", { replace: true });
    } else {
      setError("❌ Invalid email or password!");
      handleRefreshCaptcha();
    }
  };

  // Animated cosmic background
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
          <span className="highlight">SIGN</span>FUSION LOGIN
        </h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="📧 Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="captcha-wrapper">
            <span className="captcha">{captcha}</span>
            <input
              type="text"
              placeholder="Enter Captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleRefreshCaptcha}
              className="refresh-btn"
            >
              ⟳
            </button>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="auth-btn neon-btn">
            ACCESS PORTAL
          </button>

          <p className="switch-text">
            New here?{" "}
            <span
              className="link"
              onClick={() => navigate("/sign-kit/register")}
            >
              Create Account
            </span>
          </p>
        </form>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Exo+2:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        .auth-bg {
          height: 100vh; width: 100vw;
          display: flex; align-items: center; justify-content: center;
          background: radial-gradient(circle at 50% 30%, #010314 0%, #000008 100%);
          overflow: hidden; position: relative;
        }
        .cosmic-bg {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
        }
        .neo-glass {
          position: relative;
          z-index: 10;
          background: rgba(15, 20, 40, 0.9);
          border: 1px solid rgba(0, 255, 195, 0.5);
          border-radius: 20px;
          padding: 32px;
          width: 400px;
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
        .captcha-wrapper {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 14px;
        }
        .captcha {
          background: linear-gradient(90deg, #00ffc3, #009dff);
          color: #000;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          letter-spacing: 3px;
          font-family: 'Orbitron', sans-serif;
        }
        .refresh-btn {
          background: transparent;
          border: none;
          color: #00ffc3;
          font-size: 20px;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .refresh-btn:hover {
          transform: rotate(180deg);
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
          margin-top: 12px;
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

export default Login;
