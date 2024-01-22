import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.scss";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (username && password) {
      setUser(username);
      navigate("/");
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="LoginPage">
      <div className="Login">
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};

export default Login;
