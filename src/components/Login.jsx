import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        }
      );
      const token = response.data.data.token;

      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "登入失敗，請檢查帳號密碼");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>登入</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">帳號</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="請輸入帳號"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              required
            />
          </div>

          <button type="submit" className="login-button">
            登入
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
