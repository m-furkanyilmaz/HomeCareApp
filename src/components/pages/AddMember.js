import { React, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const AddMember = () => {
  const [isThere, setIsThere] = useState(true);
  const [newPatientInfo, setNewPatientInfo] = useState({
    Name: "",
    Surname: "",
    FatherName: "",
    CountryIdentity: "",
    Diagnosis: "",
    Address: "",
    Phone: "",
    Gender: "",
    BirthDate: "1960-01-01",
    Blood: "",
    Device: "",
    Disability: "",
    Bedridden: "",
  });

  const checkPatientData = async () => {
    await axios
      .get(`/api/homecare/patientInfo/${newPatientInfo.CountryIdentity}`)
      .then(function (response) {
        if (response.data.length === 0) {
          setIsThere(false);
          console.log(isThere);
        } else {
          setIsThere(true);
          console.log(response.data[0]);
          console.log(isThere);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(isThere);
  };

  const setPatientData = async (e) => {
    e.preventDefault();
    console.log(isThere);
    if (!isThere) {
      await axios
        .post(`/api/homecare/addmember`, newPatientInfo)
        .then(function (response) {
          console.log(response.data);
          alert("Hasta Bilgileri Kaydedildi.");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Girdiğiniz TC Kimlik Numarasına Kayıtlı Hasta Bulunmaktadır.");
    }
    console.log(isThere);
  };

  const setInput = (e) => {
    const { name, value } = e.target;

    //* Veritabanına gönderilecek verinin tipini değiştirmek için kullanılır
    /*if (name === "CountryIdentity" || name === "Telefon") {
      setNewPatientInfo((preValues) => ({
        ...preValues,
        [name]: value.parseInt(0, 11),
      }));
      return;
    } else {*/
    setNewPatientInfo((preValues) => ({
      ...preValues,
      [name]: value,
    }));
    if (newPatientInfo.CountryIdentity.length === 11) checkPatientData();
    return;
  };

  return (
    <div className="container">
      <Navbar />
      <form
        className="row g-3 needs-validation mt-3"
        onSubmit={(event) => setPatientData(event)}
      >
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Ad:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            name="Name"
            maxLength="20"
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
            name="Surname"
            className="form-control"
            id="validationCustom02"
            maxLength="30"
            required
            onChange={setInput}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            TC Kimlik No:
          </label>

          <input
            type="number"
            id="countrySearch"
            className="form-control"
            name="CountryIdentity"
            value={newPatientInfo.CountryIdentity}
            required
            onChange={(event) => {
              if (event.target.value.length >= 12) {
                event.target.value.substring(0, 11);
              } else {
                setNewPatientInfo((preValues) => ({
                  ...preValues,
                  CountryIdentity: event.target.value,
                }));
              }
            }}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">
            Cinsiyet:
          </label>
          <select
            defaultValue=""
            className="form-select"
            id="validationCustom04"
            name="Gender"
            required
            onChange={setInput}
          >
            <option disabled value={""}>
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
            name="Blood"
            required
            onChange={setInput}
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
            name="BirthDate"
            required
            onChange={setInput}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">
            Cihaz:
          </label>
          <select
            defaultValue=""
            className="form-select"
            id="validationCustom04"
            name="Device"
            required
            onChange={setInput}
          >
            <option disabled value="">
              Seçim Yapınız:
            </option>
            <option>Yok</option>
            <option>O2</option> <option>PEG</option>
            <option>Trakeostomi</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationDisability" className="form-label">
            Engelli:
          </label>
          <select
            defaultValue=""
            className="form-select"
            id="validationDisability"
            name="Disability"
            required
            onChange={setInput}
          >
            <option disabled value="">
              Seçim Yapınız:
            </option>
            <option>Evet</option> <option>Hayır</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationBedridden" className="form-label">
            Yatalak:
          </label>
          <select
            defaultValue=""
            className="form-select"
            id="validationBedridden"
            name="Bedridden"
            required
            onChange={setInput}
          >
            <option disabled value="">
              Seçim Yapınız:
            </option>
            <option>Eve Bağımlı</option> <option>Destekle Eve Bağımlı</option>{" "}
            <option>Yatalak</option>
            <option>Yarı Yatalak</option> <option>Geçici Yatalak</option>
            <option>Mobil</option> <option>Destekle Yarı Mobil</option>
            <option>Destekle Mobil</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            Baba Adı:
          </label>
          <input
            type="text"
            name="FatherName"
            className="form-control"
            id="validationCustom01"
            maxLength="20"
            required
            onChange={setInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustomUsername" className="form-label">
            Telefon:
          </label>

          <input
            type="number"
            placeholder="555 555 55 55"
            name="Phone"
            className="form-control"
            id="searchPhone"
            value={newPatientInfo.Phone}
            required
            onChange={(event) => {
              if (event.target.value.length >= 11) {
                event.target.value.substring(0, 10);
              } else {
                setNewPatientInfo((preValues) => ({
                  ...preValues,
                  Phone: event.target.value,
                }));
              }
            }}
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
            name="Address"
            maxLength="60"
            required
            onChange={setInput}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            Tanı:
          </label>
          <textarea
            type="text"
            name="Diagnosis"
            style={{ height: "170px" }}
            className="form-control"
            id="validationCustom02"
            maxLength="20"
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
