import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

function PatientView() {
  const [showInfo, setShowInfo] = useState("none");
  const [identityValue, setIdentityValue] = useState("");
  const [isThere, setIsThere] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    Name: "",
    Surname: "",
    FatherName: "",
    MotherName: "",
    Address: "",
    Phone: "1111111111",
    Gender: "",
    BirthDate: "1980-01-01",
    CountryIdentity: "11111111111",
    Blood: "",
    RegistrationDate: new Date(),
  });

  useEffect(() => {
    const getPatientData = async () => {
      console.log(identityValue, identityValue.length);
      const resp = await axios
        .get("//localhost:5000/api/homecare/patientInfo", identityValue)
        .then(function (response) {
          console.log(response.data);
          setIsThere(true);
          setPatientInfo(resp);
        })
        .catch(function (error) {
          console.log(error);
          setIsThere(false);
        });
      console.log(resp);
    };
    getPatientData(identityValue);
  }, [identityValue.length === 11]);
  return (
    <div className="container">
      <Navbar />
      <p>
        <b>Hasta Kimlik No:</b>
      </p>
      <input
        onKeyDown={(event) => {
          if (event.key === "Enter" && identityValue.length === 11 && isThere) {
            setShowInfo("flex");
          } else {
            setShowInfo("none");
          }
        }}
        type="search"
        value={identityValue}
        id="searchPatient"
        name="search"
        maxLength="11"
        onChange={(event) => {
          console.log(identityValue);
          setIdentityValue(event.target.value);
        }}
      />
      <div
        style={{
          display: `${showInfo}`,
          marginTop: "30px",
        }}
        className="row container g-3 needs-validation mt-3"
      >
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Ad:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            disabled
            value={patientInfo.Name}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Soyad:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            disabled
            value={patientInfo.Surname}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            TC Kimlik No:
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              placeholder=""
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              maxLength="11"
              disabled
              value={patientInfo.CountryIdentity}
            />
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Baba Adı:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            disabled
            value={patientInfo.FatherName}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Anne Adı:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            disabled
            value={patientInfo.MotherName}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Telefon:
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              placeholder="555 555 55 55"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              maxLength="10"
              disabled
              value={patientInfo.Phone}
            />
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">
            Cinsiyet:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            disabled
            value={patientInfo.Gender}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">
            Kan Grubu:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            disabled
            value={patientInfo.Blood}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom05" className="form-label">
            Doğum Tarihi:
          </label>
          <input
            type="date"
            className="form-control"
            id="validationCustom05"
            disabled
            value={patientInfo.BirthDate}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">
            Adres:
          </label>
          <textarea
            type="text"
            style={{ height: "170px" }}
            className="form-control"
            id="validationCustom03"
            disabled
            value={patientInfo.Address}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PatientView;
