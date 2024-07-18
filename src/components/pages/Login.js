import React, { useEffect, useState } from "react";
import "../css/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    UserID: 1,
    StateID: 1,
    Name: " ",
    Surname: " ",
    Username: " ",
    Password: " ",
    Title: " ",
    CountryIdentity: "11111111111",
    Gender: " ",
    BirthPlace: " ",
    BirthDate: "1980-01-01",
    Address: " ",
    Phone: "1111111111",
  });
  const [userInfo, setUserInfo] = useState({
    Username: "",
    Password: "",
  });

  const setInput = (e) => {
    const { name, value } = e.target;
    console.log(userInfo.Username, userInfo.Password);
    setUserInfo((preValues) => ({
      ...preValues,
      [name]: value,
    }));
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userInfo.Username === userDetail.Username &&
      userInfo.Password === userDetail.Password.trim()
    ) {
      console.log("Eşleşme Sağlandı!");
      try {
        setTimeout(navigate, 0, "/home");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Uyuşmazlık!");
      alert("Lütfen Bilgilerinizi Kontrol Ediniz");
      return navigate("/");
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await axios
        .get(`/api/homecare/users/${userInfo.Username}`)
        .then(function (response) {
          console.log(response.data);
          setUserDetail(response.data);
          console.log(userInfo);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(data);
    };
    if (userInfo.Password.length >= 5) getUserInfo();
  }, [userInfo.Password.length >= 5]);

  return (
    <form className="container d-flex flex-column align-items-center loginForm">
      <label style={{ width: "25%" }}>Kullanıcı Adı:</label>
      <input
        onChange={setInput}
        id="userId"
        name="Username"
        style={{ width: "25%" }}
        type="text"
      />
      <label style={{ width: "25%", marginTop: "5px" }}>Şifre:</label>
      <input
        onChange={setInput}
        id="userPassword"
        name="Password"
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
          onClick={(event) => handleSubmit(event)}
          className="enterButton btn btn-dark"
        >
          Giriş
        </NavLink>
      </div>
    </form>
  );
}

export default Login;
