import React from "react";
import { NavLink } from "react-router-dom";
import "../components/css/navbar.css";

function Navbar() {
  const handleQuit = () => {
    localStorage.clear();
  };

  return (
    <div>
      <ul
        style={{ borderEndEndRadius: "10px", borderBottomLeftRadius: "10px" }}
        className="navbarLinks d-flex justify-content-evenly bg-dark "
      >
        <NavLink
          to="/"
          style={{
            padding: "10px",
            backgroundColor: "red",
            borderRadius: "10px",
          }}
          onClick={handleQuit}
        >
          Çıkış Yap
        </NavLink>
        <NavLink to="/addmember" style={{ padding: "10px" }}>
          Hasta Kaydet
        </NavLink>
        <NavLink to="/viewpatient" style={{ padding: "10px" }}>
          Hasta Bilgileri Görüntüle
        </NavLink>
        <NavLink to="/process" style={{ padding: "10px" }}>
          İşlem Yap
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
