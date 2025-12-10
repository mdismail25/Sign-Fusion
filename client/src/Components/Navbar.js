// Components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.jpeg";

function Navbar({ setAuth }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const checkAuth = () => setIsAuth(localStorage.getItem("auth") === "true");
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(false);
    setIsAuth(false);
    setShowMenu(false);
    navigate("/sign-kit/login", { replace: true });
  };

  return (
    <nav className="neo-navbar navbar navbar-expand-lg fixed-top">
      <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
        {/* Brand */}
        <Link to={isAuth ? "/sign-kit/home" : "/sign-kit/login"} className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            width="40"
            height="40"
            alt="Logo"
            className="me-2 rounded-circle glowing-logo"
          />
          <span className="brand-neo">SIGN<span className="glow">FUSION</span></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {isAuth ? (
          <div className="collapse navbar-collapse justify-content-end" id="navbarResponsive">
            <ul className="navbar-nav neo-nav">
              <li className="nav-item"><Link to="/sign-kit/home" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link to="/sign-kit/convert" className="nav-link">Convert</Link></li>
              <li className="nav-item"><Link to="/sign-kit/learn-sign" className="nav-link">Learn Sign</Link></li>
              <li className="nav-item"><Link to="/sign-kit/feedback" className="nav-link">Feedback</Link></li>
            </ul>

            <div className="account-menu" ref={dropdownRef}>
              <div
                className="profile-square"
                onClick={() => setShowMenu(prev => !prev)}
                title="Account"
              >
                <div className="profile-inner">
                  <i className="fas fa-user"></i>
                </div>
              </div>

              {showMenu && (
                <div className="account-dropdown">
                  <p className="dropdown-user">👤 Admin</p>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        .neo-navbar,
        .brand-neo,
        .neo-nav .nav-link {
          font-family: 'Orbitron', sans-serif !important;
        }

        .neo-navbar {
          background: linear-gradient(135deg, rgba(15,15,30,0.95), rgba(25,30,60,0.95));
          backdrop-filter: blur(14px);
          border-bottom: 2px solid #00ffc3;
          padding: 0.85rem 1.2rem;
          box-shadow: 0 0 12px rgba(0,255,227,0.1);
          position: relative;
          z-index: 1000;
        }

        .brand-neo {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 1px;
        }
        .brand-neo .glow {
          color: #00ffc3;
          text-shadow: 0 0 6px #00ffc3, 0 0 14px #00ffc3;
        }

        .glowing-logo {
          border: 2px solid #00ffc3;
          box-shadow: 0 0 8px #00ffc3;
        }

        .neo-nav .nav-link {
          color: #d0faff;
          margin: 0 0.8rem;
          position: relative;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .neo-nav .nav-link:hover {
          color: #00ffc3;
          text-shadow: 0 0 8px #00ffc3;
        }
        .neo-nav .nav-link::after {
          content: '';
          display: block;
          height: 2px;
          width: 0;
          background: #00ffc3;
          transition: width 0.4s ease;
          margin-top: 4px;
        }
        .neo-nav .nav-link:hover::after {
          width: 100%;
        }

        .navbar-toggler { border: none; }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0,255,227,0.9)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
        }

        .account-menu { position: relative; margin-left: 1.2rem; }

        .profile-square {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15));
          border: 2px solid rgba(0,255,195,0.18);
          box-shadow: 0 6px 18px rgba(0,255,195,0.03), inset 0 0 10px rgba(0,255,195,0.02);
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .profile-square:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: rgba(0,255,195,0.55);
          box-shadow: 0 10px 30px rgba(0,255,195,0.12), 0 0 12px rgba(0,255,195,0.06);
        }

        /* --- Centered profile icon --- */
        .profile-inner {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(0,255,195,0.06), rgba(0,160,255,0.03));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;    /* adjusted */
          line-height: 1;      /* key fix for vertical alignment */
          color: #00ffc3;
          box-shadow: inset 0 0 6px rgba(0,255,195,0.04);
        }

        .account-dropdown {
          position: absolute;
          right: 0;
          top: 58px;
          background: rgba(0,14,22,0.95);
          border: 1px solid rgba(0,255,195,0.45);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,255,195,0.06), inset 0 0 12px rgba(0,255,195,0.02);
          padding: 10px;
          min-width: 150px;
          animation: menuAppear 180ms cubic-bezier(.2,.9,.2,1);
          z-index: 1100;
        }

        .dropdown-user {
          color: #bfffe9;
          font-size: 0.9rem;
          text-align: center;
          border-bottom: 1px solid rgba(0,255,195,0.12);
          padding-bottom: 6px;
          margin-bottom: 8px;
        }

        .dropdown-item {
          background: transparent;
          border: none;
          color: #dff9f1;
          font-family: 'Orbitron', sans-serif;
          text-align: left;
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          transition: all 0.18s;
          cursor: pointer;
        }

        .dropdown-item.logout {
          color: #ff8f8f;
          border: 1px solid rgba(255,100,100,0.06);
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));
        }

        .dropdown-item.logout:hover {
          background: rgba(255,77,77,0.06);
          color: #ff5959;
          box-shadow: 0 6px 16px rgba(255,77,77,0.06);
          transform: translateY(-2px);
        }

        @keyframes menuAppear {
          from { opacity: 0; transform: translateY(-6px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
