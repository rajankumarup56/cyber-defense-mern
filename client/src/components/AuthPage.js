import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function AuthPage({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert(res.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setIsLogin(true); // switch to login after register

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      alert(res.data.message);

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p style={{ marginTop: "10px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "transparent",
            color: "blue",
            border: "none",
            cursor: "pointer"
          }}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>

      </div>
    </div>
  );
}

export default AuthPage;
