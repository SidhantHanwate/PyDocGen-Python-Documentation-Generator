import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "../App.css"

export default function Navbar(props) {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  const handleNavItemClick = (event) => {
    setActiveItem(event.target.innerText);
  };

  return (
    <>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${activeItem === "Code Summarizer" ? "active" : ""}`}>
                <Link className="nav-link" to="/codesummarizer" onClick={handleNavItemClick}>
                  Code Summarizer
                </Link>
              </li>
              <li className={`nav-item ${activeItem === "Requirements File generator" ? "active" : ""}`}>
                <Link className="nav-link" to="/requirementsFileGenerator" onClick={handleNavItemClick}>
                  Requirements File generator
                </Link>
              </li>
              <li className={`nav-item ${activeItem === "File Dependency Visualizer" ? "active" : ""}`}>
                <Link className="nav-link" to="/dependencyVisualizer" onClick={handleNavItemClick}>
                  File Dependency Visualizer
                </Link>
              </li>
              <li className={`nav-item ${activeItem === "Coding Style Guide" ? "active" : ""}`}>
                <Link className="nav-link" to="/codingStyleGuide" onClick={handleNavItemClick}>
                  Coding Style Guide
                </Link>
              </li>
              <li className={`nav-item ${activeItem === "Release Notes" ? "active" : ""}`}>
                <Link className="nav-link" to="/releaseNotes" onClick={handleNavItemClick}>
                  Release Notes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Title",
};
