import React, { useEffect } from "react";
import Navbar from "../Navbar";
import "../css/home.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Footer from "../Footer";

function Home() {
  const [style, setStyle] = useState("none");
  const [patientInfo, setPatientInfo] = useState({
    PatientID: 1,
    Name: " ",
    Surname: " ",
    CountryIdentity: "11111111111",
    Gender: " ",
    Blood: " ",
    BirthDate: "1980-01-01",
    Device: " ",
    Disability: " ",
    Bedridden: " ",
    FatherName: " ",
    Phone: "1111111111",
    Address: " ",
    Diagnosis: " ",
  });

  const [processInfo, setProcessInfo] = useState({
    VisiterID: 1,
    Visiter: ``,
    PatientID: 1,
    PatientName: "",
    ProcessDate: "",
    DoctorInfo: "",
    Consultation: "",
    Intravenous: "",
    Subcutaneous: "",
    Dressing: "",
    Catheter: "",
    Examination: "",
    BurnDressing: "",
    Nasogastric: "",
    Intramuscular: "",
    SentEmergency: "",
    Request: "",
    Hospitalize: "",
    ElderlyCare: "",
    Kilometer: "",
    TypeOfNutrition: "",
  });

  // useEffect(() => {
  //   const getPatientData = async () => {
  //     console.log(identityValue, identityValue.length);
  //     await axios
  //       .get(`/api/homecare/patientInfo/${identityValue}`)
  //       .then(function (response) {
  //         if (response.data[0] === undefined) {
  //           setIsThere(false);
  //           console.log(response);
  //         } else {
  //           setPatientInfo(response.data[0]);
  //           console.log(response.data[0]);
  //           setIsThere(true);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         setIsThere(false);
  //       });
  // setPatientInfo(resp);
  // console.log(resp);
  // console.log(patientInfo);
  //   };
  //   if (identityValue.length === 11) getPatientData();
  // }, []);

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
              <input type="text" value={patientInfo.Name} disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>TC Kimlik No:</b>
              </p>
              <input type="text" value={patientInfo.CountryIdentity} disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>Baba Adı:</b>
              </p>
              <input type="text" value={patientInfo.FatherName} disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>D.Tarihi:</b>
              </p>
              <input
                style={{ width: "189px" }}
                value={patientInfo.BirthDate}
                type="date"
                disabled
              />
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
            value={patientInfo.Address}
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
            value={""}
            disabled
          ></textarea>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
