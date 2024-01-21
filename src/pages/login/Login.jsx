// Login.jsx
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Simulyatsiya uchun: foydalanuvchi ma'lumotlarini Local Storage ga saqlash
      localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", "true");

      // Yozilishi kerak bo'lgan kod: API bilan tashqi bog'lanish va autentifikatsiya
      console.log("Username:", username);
      console.log("Password:", password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
