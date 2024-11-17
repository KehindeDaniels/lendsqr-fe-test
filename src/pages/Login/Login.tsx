import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import logo from "../../assets/logo.svg";
import illustration from "../../assets/loginIllustration.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  const handleDemoLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="content">
        <div className="illustration">
          <img
            className="illustration"
            src={illustration}
            alt="Login Illustration"
          />
        </div>

        <div className="form">
          <div className="welcome">
            <h1>Welcome</h1>
            <p>Enter details to login</p>
          </div>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email: Kindly use the login button directly"
              />
            </div>
            <div className="password">
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password: Kindly use the login button directly"
              />
              <p>Forgot Password?</p>
            </div>
            <button onClick={handleDemoLogin} style={{ marginTop: "10px" }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
