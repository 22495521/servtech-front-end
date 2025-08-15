import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      console.log(response);
      alert("註冊成功！");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "註冊失敗");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>註冊</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">使用者名稱</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="請輸入使用者名稱"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="請輸入密碼"
              required
            />
          </div>

          <button type="submit" className="login-button">
            註冊
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
