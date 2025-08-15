import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const handleApiCall = async () => {
    const token = Cookies.get("token");

    if (!token) {
      alert("沒有登入 token，請先登入");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("API 呼叫成功！");
      setUserData(response.data.data.users);
      // console.log(response.data.data.users);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Token 無效，請重新登入");
        handleLogout();
      } else {
        alert("API 呼叫失敗");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>功能頁面</h1>
        <button onClick={handleLogout} className="logout-button">
          登出
        </button>
      </header>

      <main className="dashboard-content">
        <button onClick={handleApiCall} className="api-button">
          呼叫 API
        </button>
      </main>

      {userData.length > 0 && (
        <ul>
          {userData.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
