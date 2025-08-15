import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage/session if you are storing token
    localStorage.removeItem("token");
    navigate("/"); // redirect to login/signup
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="profile">
          <span className="profile-icon">👤</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main>
        <h1>Welcome!</h1>
        <p>You are logged in succesfully.</p>
      </main>
    </div>
  );
};

export default Dashboard;
