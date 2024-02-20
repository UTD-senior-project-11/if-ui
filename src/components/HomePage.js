import "./HomePage.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  document.title = "Home Page | Image Filter";

  function handleClick() {
    navigate("/grid");
  }

  return (
    <div className="home-page">
      <h1 className="home-page-header">Welcome to ImageFilter</h1>
      <button className="home-page-button" type="button" onClick={handleClick}>
        View Images?
      </button>
    </div>
  );
};

export default HomePage;
