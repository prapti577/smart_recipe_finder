import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <div className="left" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* 🔹 Logo + Text */}
        <img
          src="/appLogo.png"
          alt="App Logo"
          className="app-logo"
          style={{ width: "50px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h2 style={{ cursor: "pointer", margin: 0 }} onClick={() => navigate("/")}>
          Recipe App
        </h2>
      </div>

      <div className="right">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>

        {user ? (
          <>
            <div className="user-info">
              <img
                src={user.profilePic || process.env.PUBLIC_URL + "/avatar.png"}
                alt="profile"
                className="profile-pic"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              />
              <span className="user-name">{user.name || user.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
