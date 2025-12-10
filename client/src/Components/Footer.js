import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-futuristic text-white mt-5">
      <div className="container-fluid pt-3">
        <div className="container text-md-left mt-5">
          <div className="row mt-3">
            {/* SignFusion Block */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="footer-title">SIGNFUSION</h6>
              <hr className="footer-divider" />
              <p className="footer-text">
                A comprehensive toolkit containing various features related to Indian Sign Language.
              </p>
            </div>

            {/* Services */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="footer-heading">Services</h6>
              <hr className="footer-divider" />
              <p><Link to="/sign-kit/convert" className="footer-link">Convert</Link></p>
              <p><Link to="/sign-kit/learn-sign" className="footer-link">Learn Sign</Link></p>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="footer-heading">Useful links</h6>
              <hr className="footer-divider" />
              <p><Link to="/sign-kit/home" className="footer-link">Home</Link></p>
              <p><Link to="/sign-kit/feedback" className="footer-link">Feedback</Link></p>
            </div>

            {/* Contact */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="footer-heading">Contact</h6>
              <hr className="footer-divider" />
              <p><i className="fa fa-home me-2"></i><span className="footer-text">VTU CPGS, Mysore</span></p>
              <p><i className="fa fa-envelope me-2"></i><span className="footer-text">channurofficala1@gmail.com</span></p>
              <p><i className="fa fa-envelope me-2"></i><span className="footer-text">harshithakc@gmail.com</span></p>
              <p><i className="fa fa-envelope me-2"></i><span className="footer-text">ravichalmar@gmail.com</span></p>
              <p><i className="fa fa-envelope me-2"></i><span className="footer-text">mdismaily25@gmail.com</span></p>
              <p><i className="fa fa-phone me-2"></i><span className="footer-text">+91 XXXXXXXXXX</span></p>
              <p><i className="fa fa-phone me-2"></i><span className="footer-text">+91 XXXXXXXXXX</span></p>
              <p><i className="fa fa-phone me-2"></i><span className="footer-text">+91 XXXXXXXXXX</span></p>
              <p><i className="fa fa-phone me-2"></i><span className="footer-text">+91 XXXXXXXXXX</span></p>
            </div>
          </div>
        </div>

        <div className="text-center py-3 text-muted small">© 2025 Copyright</div>
      </div>

      {/* Futuristic Footer Styles */}
      <style>{`
        .footer-futuristic {
          background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
          font-family: 'Segoe UI', sans-serif;
          padding-top: 2rem;
          border-top: 3px solid #00f7ff33;
          box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.05);
        }

        .footer-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #00f7ff;
          text-shadow: 0 0 8px #00f7ff;
        }

        .footer-heading {
          font-size: 1.2rem;
          font-weight: bold;
          color: #00ffe7;
        }

        .footer-divider {
          width: 60px;
          height: 3px;
          background-color: #00f7ff;
          border: none;
          margin: 8px 0;
          box-shadow: 0 0 5px #00f7ff;
        }

        .footer-text {
          color: #d1d1d1;
          font-size: 0.95rem;
        }

        .footer-link {
          color: #a9e2f3;
          text-decoration: none;
          transition: color 0.3s, text-shadow 0.3s;
        }

        .footer-link:hover {
          color: #ffffff;
          text-shadow: 0 0 10px #00f7ff;
        }

        i.fa {
          color: #00d9ff;
          width: 20px;
        }

        @media (max-width: 768px) {
          .footer-title, .footer-heading {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
