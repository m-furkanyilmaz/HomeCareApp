import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

function PatientView() {
  const [showInfo, setShowInfo] = useState("none");
  const [identityValue, setIdentityValue] = useState("");
  return (
    <div className="container">
      <Navbar />
      <p>
        <b>Hasta Kimlik No:</b>
      </p>
      <input
        onKeyDown={(event) => {
          if (event.key === "Enter" && identityValue.length === 11) {
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
            />
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">
            Cinsiyet:
          </label>
          <select
            defaultValue=""
            className="form-select"
            id="validationCustom04"
            disabled
          >
            <option disabled value="">
              Seçim Yapınız:
            </option>
            <option>Erkek</option> <option>Kadın</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">
            Kan Grubu:
          </label>
          <select
            defaultValue=""
            className="form-select"
            id="validationCustom04"
            disabled
          >
            <option disabled value="">
              Seçim Yapınız:
            </option>
            <option>0 Rh(-)</option> <option>0 Rh(+)</option>
            <option>A Rh(-)</option> <option>A Rh(+)</option>
            <option>B Rh(-)</option> <option>B Rh(+)</option>
            <option>AB Rh(-)</option> <option>AB Rh(+)</option>
          </select>
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
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PatientView;
