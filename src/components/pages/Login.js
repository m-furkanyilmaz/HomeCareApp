import React, { useEffect, useState } from "react";
import "../css/login.css";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate("/");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  useEffect(() => {});
  return (
    <form className="container d-flex flex-column align-items-center loginForm">
      <label style={{ width: "25%" }}>Kullanıcı Adı:</label>
      <input
        onChange={(event) => setUserName(event.target.value)}
        id="userId"
        style={{ width: "25%" }}
        type="text"
      />
      <label style={{ width: "25%", marginTop: "5px" }}>Şifre:</label>
      <input
        onChange={(event) => setUserPassword(event.target.value)}
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
          to="/home"
          className="enterButton btn btn-dark"
          onClick={() => {
            if (userName === !"Furkan" && userPassword === !"Furkan") {
              navigate("/");
            } else {
              navigate("/home");
            }
          }}
        >
          Giriş
        </NavLink>
      </div>
    </form>
  );
}

export default Login;
