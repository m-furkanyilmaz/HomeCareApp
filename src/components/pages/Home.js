import React from "react";
import Navbar from "../Navbar";
import "../css/home.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Footer from "../Footer";

function Home() {
  const [style, setStyle] = useState("none");

  const handleClick = () => {
    if (style === "none") {
      setStyle("block");
    } else {
      setStyle("none");
    }
  };

  return (
    <div className="container ">
      <Navbar />
      <div
        className="row"
        style={{ marginTop: "80px", justifyContent: "center" }}
      >
        <ol
          style={{ listStyleType: "none" }}
          className="patientInfoList col-md-6"
        >
          {/* {" Uzun Zamandır Gidilmeyen Hastalar"} */}
          <h3
            style={{
              marginRight: "20px",
              marginBottom: "25px",
              marginTop: "20px",
            }}
          >
            Uzun Süredir Gidilmeyen Hastalar
          </h3>

          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClick}
            >{`Ad Soyad: Deneme Deneme     Son Muayene:GG/AA/YYYY`}</NavLink>
          </li>
        </ol>
        <div style={{ display: `${style}` }} className="col-md-6 patientInfo">
          <div className="col-md-12 row">
            <div className="col-md-6">
              <p>
                <b>Hasta Adı:</b>
              </p>
              <input type="text" disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>TC Kimlik No:</b>
              </p>
              <input type="text" disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>Baba Adı:</b>
              </p>
              <input type="text" disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>D.Tarihi:</b>
              </p>
              <input style={{ width: "189px" }} type="date" disabled />
            </div>
          </div>

          <p>
            <b>Son Ziyaret Edildiği Tarih:</b>
          </p>
          <input style={{ width: "189px" }} type="date" disabled />
          <p>
            <b>Adres:</b>
          </p>
          <textarea
            style={{
              width: "-webkit-fill-available",
              marginBottom: "8px",
              maxHeight: "75px",
            }}
            name=""
            id=""
            disabled
          ></textarea>
          <p>
            <b>Son Yapılan İşlem:</b>
          </p>
          <textarea
            style={{
              width: "-webkit-fill-available",
              marginBottom: "8px",
              maxHeight: "180px",
            }}
            name=""
            id=""
            disabled
          ></textarea>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
