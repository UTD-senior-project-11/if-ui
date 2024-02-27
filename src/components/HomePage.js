import "./HomePage.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  let loggedIn = localStorage.getItem("logged_in") || false; // TODO with backend. Local storage for token?
  document.title = "Home Page | Image Filter";

  function navigateToPage(page) {
    navigate(page);
  }

  return (
    <div className="home-page">
      <h1 className="home-page-header">Welcome to ImageFilter</h1>

      {!loggedIn ? (
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
        <button
          className="home-page-grid-button"
          type="button"
          onClick={() => navigateToPage("/grid")}
        >
          View Images?
        </button>
      )}
    </div>
  );
};

export default HomePage;
