import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

function Process() {
  const [showInfo, setShowInfo] = useState("none");
  const [showProcess, setShowProcess] = useState("none");
  const [identityValue, setIdentityValue] = useState("");
  const [isThere, setIsThere] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    PatientID: 1,
    Name: " ",
    Surname: " ",
    CountryIdentity: "",
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

  const storedUserData = localStorage.getItem("user");

  const [userData, setUserData] = useState(JSON.parse(storedUserData));

  const [processInfo, setProcessInfo] = useState({
    VisiterID: 1,
    Visiter: "",
    PatientID: 1,
    PatientName: "",
    ProcessDate: new Date(),
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

  //? İşlemin girileceği alanın displayini flexe çeken metod

  const handleClick = (e) => {
    e.preventDefault();
    if (isThere) {
      setShowProcess("flex");
      setProcessInfo({
        PatientID: patientInfo.PatientID,
        PatientName: `${patientInfo.Name} ${patientInfo.Surname}`,
      });
      console.log(
        processInfo.VisiterID,
        processInfo.Visiter,
        processInfo.ProcessDate
      );
    } else {
      if (patientInfo.CountryIdentity.length < 11)
        alert("Girdiğiniz TC Kimlik Numarasını Kontrol Ediniz");
      else
        alert("Girmiş Olduğunuz Kimlik Numarasıyla Kayıtlı Hasta Bulunamadı!");
      setShowProcess("none");
    }
  };

  //?Girilen TC No ile Hasta Bilgilerini Çeken ve PatientInfo Hook'una Atan metod

  useEffect(() => {
    const getPatientData = async () => {
      console.log(identityValue, identityValue.length);
      await axios
        .get(`/api/homecare/patientInfo/${identityValue}`)
        .then(function (response) {
          if (response.data[0] === undefined) {
            setIsThere(false);
            console.log(response);
          } else {
            setPatientInfo(response.data[0]);
            console.log(response.data[0]);
            setIsThere(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsThere(false);
        });
      // setPatientInfo(resp);
      // console.log(resp);
      // console.log(patientInfo);
    };
    if (identityValue.length === 11) getPatientData();
  }, [identityValue.length === 11]);

  //? Kaydet Butonu ile Çalışan ve Veriyi Api ye istek atan metod

  const setProcessData = async (e) => {
    e.preventDefault();
    console.log(isThere);
    await axios
      .post(`/api/homecare/processes`, processInfo)
      .then(function (response) {
        console.log(response.data);
        alert("Hasta İşlemleri Kaydedildi.");
      })
      .catch(function (error) {
        alert("İşlemler Kaydedilirken Bir Sorun Oluştu!", error);
        console.log(error);
      });
  };

  //? Kullanıcının Girdiği işlemleri ProcessInfo'ya kaydeden metod

  const setInput = (e) => {
    const { name, value } = e.target;

    //* Veritabanına gönderilecek verinin tipini değiştirmek için kullanılır
    /*if (name === "CountryIdentity" || name === "Telefon") {
      setPatientInfo((preValues) => ({
        ...preValues,
        [name]: value.parseInt(0, 11),
      }));
      return;
    } else {*/
    setProcessInfo((preValues) => ({
      ...preValues,
      [name]: value,
      VisiterID: userData.UserID,
      Visiter: userData.Username,
      ProcessDate: new Date(),
    }));
    console.log(name, value);
    console.log(
      patientInfo.Name,
      patientInfo.Surname,
      processInfo.Visiter,
      processInfo.ProcessDate,
      processInfo.VisiterID
    );
    return;
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <p>
          <b>Hasta Kimlik No:</b>
        </p>
        <input
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              identityValue.length === 11 &&
              isThere
            ) {
              setShowInfo("flex");
            } else {
              setShowInfo("none");
            }
          }}
          type="number"
          value={identityValue}
          id="searchPatient"
          name="search"
          className="form-control w-25 border-danger"
          maxLength="11"
          onChange={(event) => {
            if (event.target.value.length >= 12) {
              event.target.value.slice(0, 11);
            } else {
              setIdentityValue(event.target.value);
              setIsThere(false);
            }
            console.log(identityValue);
          }}
        />
        <div>
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
              <label htmlFor="validationCustom02" className="form-label">
                Yatalak:
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom02"
                disabled
                value={patientInfo.Bedridden}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCustom04" className="form-label">
                Engelli:
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom02"
                disabled
                value={patientInfo.Gender}
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

            <div className="col-md-6">
              <label htmlFor="validationCustom03" className="form-label">
                Tanı:
              </label>
              <textarea
                type="text"
                style={{ height: "170px" }}
                className="form-control"
                id="validationCustom03"
                disabled
                value={patientInfo.Diagnosis}
              />
            </div>
            <div className="col-12 d-flex justify-content-between">
              <button
                className="btn btn-warning h-auto"
                type="submit"
                onClick={handleClick}
              >
                İşleme Aç
              </button>
            </div>
          </div>
        </div>
        {/* //!-------------------------------------------------------------------SecondForm---------------------------------------------------------------------------- */}
        <form onSubmit={(event) => setProcessData(event)}>
          <div
            style={{
              display: `${showProcess}`,
              marginTop: "30px",
              marginBottom: "50px",
            }}
            className="row container g-3 needs-validation mt-3"
          >
            <div className="col-md-4">
              <label htmlFor="validationDrInfo" className="form-label">
                Dr:
              </label>
              <input
                type="number"
                max="9"
                className="form-control"
                id="validationDrInfo"
                name="DoctorInfo"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCons" className="form-label">
                Kons:
              </label>
              <input
                type="number"
                className="form-control"
                id="validationCons"
                name="Consultation"
                max="9"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationIM" className="form-label">
                IM:
              </label>
              <div className="form-label">
                <input
                  type="number"
                  className="form-control"
                  id="validationIM"
                  name="Intramuscular"
                  max="20"
                  required
                  onChange={setInput}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationIV" className="form-label">
                IV:
              </label>
              <input
                type="number"
                className="form-control"
                id="validationIV"
                name="Intravenous"
                max="9"
                required
                onChange={setInput}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="validationSub" className="form-label">
                Subkütan:
              </label>

              <input
                type="number"
                className="form-control"
                id="validationSub"
                name="Subcutaneous"
                max="9"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationDressing" className="form-label">
                Pansuman:
              </label>

              <input
                type="number"
                className="form-control"
                id="validationDressing"
                name="Dressing"
                max="9"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCatheter" className="form-label">
                Sonda:
              </label>

              <input
                type="number"
                className="form-control"
                name="Catheter"
                id="validationCatheter"
                max="9"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationNasogastric" className="form-label">
                NG:
              </label>
              <select
                defaultValue={"default"}
                className="form-select"
                id="validationNasogastric"
                name="Nasogastric"
                required
                onChange={setInput}
              >
                <option disabled value="default">
                  Seçim Yapınız:
                </option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationExamination" className="form-label">
                Tetkik:
              </label>
              <input
                type="number"
                max="9"
                name="Examination"
                className="form-control"
                id="validationExamination"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationSentEmergency" className="form-label">
                Acile Yönlendirildi:
              </label>
              <select
                defaultValue={"default"}
                className="form-select"
                id="validationSentEmergency"
                name="SentEmergency"
                required
                onChange={setInput}
              >
                <option disabled value="default">
                  Seçim Yapınız:
                </option>
                <option value="1">Evet</option>
                <option value="0">Hayır</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationRequest" className="form-label">
                Talebi Var:
              </label>
              <select
                defaultValue={"default"}
                className="form-select"
                id="validationRequest"
                name="Request"
                required
                onChange={setInput}
              >
                <option disabled value="default">
                  Seçim Yapınız:
                </option>
                <option value="1">Evet</option>
                <option value="0">Hayır</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationBurnDressing" className="form-label">
                Yanık Pansuman:
              </label>
              <input
                type="number"
                max="9"
                name="BurnDressing"
                className="form-control"
                id="validationBurnDressing"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationHospitalize" className="form-label">
                Hastaneye Kaldırıldı:
              </label>
              <select
                defaultValue={"default"}
                className="form-select"
                id="validationHospitalize"
                name="Hospitalize"
                required
                onChange={setInput}
              >
                <option disabled value="default">
                  Seçim Yapınız:
                </option>
                <option value="1">Evet</option>
                <option value="0">Hayır</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationElderlyCare" className="form-label">
                Yaşbak Yönlendirildi:
              </label>
              <select
                defaultValue={"default"}
                className="form-select"
                id="validationElderlyCare"
                name="ElderlyCare"
                required
                onChange={setInput}
              >
                <option disabled value="default">
                  Seçim Yapınız:
                </option>
                <option value="1">Evet</option>
                <option value="0">Hayır</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationKilometer" className="form-label">
                Kilometre:
              </label>
              <input
                type="number"
                max="99"
                name="Kilometer"
                className="form-control"
                id="validationKilometer"
                required
                onChange={setInput}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="validationTON" className="form-label">
                Beslenme Şekli:
              </label>
              <select
                defaultValue={"default"}
                className="form-select"
                id="validationTON"
                name="TypeOfNutrition"
                required
                onChange={setInput}
              >
                <option disabled value="default">
                  Seçim Yapınız:
                </option>
                <option value="NGS">NGS</option>
                <option value="PEG">PEG</option>
                <option value="ORAL">ORAL</option>
              </select>
            </div>
            <div className="col-12 d-flex justify-content-between">
              <button className="btn btn-dark h-auto " type="submit">
                Kaydet
              </button>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
}

export default Process;
