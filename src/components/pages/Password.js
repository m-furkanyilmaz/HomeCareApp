import React from "react";
import "../css/password.css";

const handleClick = () => {};

function Password() {
  return (
    <div className="mt-3 ms-3">
      <label>TC Kimlik No:</label>
      <input type="text" />
      <button className="rememberPw" type="submit" onClick={handleClick}>
        Şifre Getir
      </button>
    </div>
  );
}

export default Password;
