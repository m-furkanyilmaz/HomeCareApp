import React, { useEffect, useState } from "react";
import "../css/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate("/home");
  const [userInfo, setUserName] = useState({
    Username: "",
    Password: "",
  });

  const handleSubmit = () => {
    // if (findOneUser(userInfo)) {
    //   navigate("/home");
    // } else {
    // }
  };

  useEffect(() => {
    const getUserInfo = async (userAccount) => {
      const data = await axios
        .get("localhost:5000", userAccount)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(data);
    };
    getUserInfo(userInfo);
  }, [handleSubmit]);

  const setInput = (e) => {
    const { name, value } = e.target;
    setUserName((preValues) => ({
      ...preValues,
      [name]: value,
    }));
    return;
  };
  return (
    <form className="container d-flex flex-column align-items-center loginForm">
      <label style={{ width: "25%" }}>Kullanıcı Adı:</label>
      <input
        onChange={(event) => setInput}
        id="userId"
        style={{ width: "25%" }}
        type="text"
      />
      <label style={{ width: "25%", marginTop: "5px" }}>Şifre:</label>
      <input
        onChange={(event) => setInput}
        id="userPassword"
        style={{ width: "25%" }}
        type="password"
      />
      <div
        className="buttonDiv"
        style={{
          width: "25%",
          justifyContent: "space-between",
          display: "flex",
          marginTop: "10px",
        }}
      >
        <NavLink
          to="/rememberpw"
          target="_blank"
          style={{
            textDecoration: "none",
            color: "black",
            width: "100px",
            fontSize: "13px",
          }}
        >
          Şifremi Unuttum
        </NavLink>
        <NavLink
          style={{ width: "80px" }}
          to={navigate("/home")}
          className="enterButton btn btn-dark"
          onClick={() => handleSubmit}
        >
          Giriş
        </NavLink>
      </div>
    </form>
  );
}

export default Login;
