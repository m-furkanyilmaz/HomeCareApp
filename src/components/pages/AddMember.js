import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const AddMember = () => {
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

  const setPatientData = async (info) => {
    const data = await axios
      .post("//localhost:5000/", info)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
  };

  const setInput = (e) => {
    const { name, value } = e.target;
    //* Veritabanına gönderilecek verinin tipini değiştirmek için kullanılır
    /* if (name === "TCNO" || name === "Telefon") {
      setPatientInfo((preValues) => ({
        ...preValues,
        [name]: parseInt(value),
      }));
      return;
    }} else {*/
    setPatientInfo((preValues) => ({
      ...preValues,
      [name]: value,
    }));
    return;
  };

  return (
    <div className="container">
      <Navbar />
      <form
        className="row g-3 needs-validation mt-3"
        noValidate
        onSubmit={setPatientData(patientInfo)}
      >
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Ad:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            name="Ad"
            required
            onChange={setInput}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Soyad:
          </label>
          <input
            type="text"
            name="Soyad"
            className="form-control"
            id="validationCustom02"
            required
            onChange={setInput}
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
              name="TCNO"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              maxLength="11"
              required
              onChange={setInput}
            />
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Baba Adı:
          </label>
          <input
            type="text"
            name="BabaAdi"
            className="form-control"
            id="validationCustom01"
            required
            onChange={setInput}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Anne Adı:
          </label>
          <input
            type="text"
            name="AnneAdi"
            className="form-control"
            id="validationCustom02"
            required
            onChange={setInput}
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
              name="Telefon"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              maxLength="10"
              required
              onChange={setInput}
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
            required
            onSelect={setInput}
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
            required
            onSelect={setInput}
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
            required
            onChange={setInput}
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
            required
            onChange={setInput}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-dark h-auto" type="submit">
            Kaydet
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default AddMember;
