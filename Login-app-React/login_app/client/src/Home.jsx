import axios from "axios";
import { useEffect, useState } from "react";
import './style.css'; 
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user-info")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h2 className="home-title">Thông tin tài khoản</h2>
        {userInfo ? (
          <>
            <p className="home-info">Xin chào, {userInfo.name}!</p>
            <p className="home-info">Email: {userInfo.email}</p>
            <p className="home-info"> Số dư tài khoản: {userInfo.accountBalance} đồng</p>
            <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <p className="loading-message">Loading user information...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
