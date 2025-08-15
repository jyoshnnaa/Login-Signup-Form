// src/components/AuthForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../api/api";
import "./AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await loginUser({ email: formData.email, password: formData.password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        await signupUser(formData);
        setIsLogin(true);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </>
        )}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <div className="password-toggle">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <button type="submit" className="submit-btn">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <div className="switch-text">
        {isLogin ? (
          <>
            Don't have an account?
            <span onClick={handleToggle}> Signup</span>
          </>
        ) : (
          <>
            Already have an account?
            <span onClick={handleToggle}> Login</span>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
