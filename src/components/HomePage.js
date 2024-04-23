import "./HomePage.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("logged_in") || "false");
  document.title = "Home Page | Image Filter";

  function navigateToPage(page) {
    navigate(page);
  }

  return (
    <div className="home-page">
      <h1 className="home-page-header">Welcome to ImageFilter</h1>

      <p className="home-page-tagline">An AI-powered image classification service that aims to detect banned images.</p>

      {loggedIn === "false" ? (
        <div className="home-page-buttons-container">
          <button
            className="home-page-login-button"
            type="button"
            onClick={() => navigateToPage("/login")}
          >
            Login
          </button>
          <button
            className="home-page-signup-button"
            type="button"
            onClick={() => navigateToPage("/signup")}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="home-page-buttons-container">
          <button
            className="home-page-grid-button"
            type="button"
            onClick={() => navigateToPage("/grid")}
          >
            View Banned Images
          </button>
          <button
            className="home-page-upload-button"
            type="button"
            onClick={() => navigateToPage("/upload")}
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
