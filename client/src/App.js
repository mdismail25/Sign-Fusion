import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Convert from "./Pages/Convert";
import LearnSign from "./Pages/LearnSign";
import Feedback from "./Pages/Feedback";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth === "true") setAuth(true);
  }, []);

  return (
    <div className="app-container">
      <Router>
        {/* Navbar only when logged in */}
        {auth && <Navbar setAuth={setAuth} />}

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            {!auth && (
              <>
                <Route path="/sign-kit/login" element={<Login setAuth={setAuth} />} />
                <Route path="/sign-kit/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/sign-kit/login" replace />} />
              </>
            )}

            {/* Protected Routes */}
            {auth && (
              <>
                <Route path="/sign-kit/home" element={<Home />} />
                <Route path="/sign-kit/convert" element={<Convert />} />
                <Route path="/sign-kit/learn-sign" element={<LearnSign />} />
                <Route path="/sign-kit/feedback" element={<Feedback />} />
                <Route path="*" element={<Navigate to="/sign-kit/home" replace />} />
              </>
            )}
          </Routes>
        </main>

        {/* Footer visible only when logged in */}
        {auth && <Footer />}
      </Router>

      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: radial-gradient(circle at 30% 30%, #030013, #01010b 80%);
          overflow-x: hidden;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default App;
