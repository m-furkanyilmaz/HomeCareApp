import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

function PatientView() {
  const [showPatientInfo, setShowPatientInfo] = useState("none");
  const [identityValue, setIdentityValue] = useState("");
  const [isThere, setIsThere] = useState(false);
  const [isThereProcess, setIsThereProcess] = useState(false);
  const [showProcessInfo, setShowProcessInfo] = useState("none");

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

  const [processDetail, setProcessDetail] = useState([
    {
      ProcessID: 1,
      VisiterID: 1,
      PatientID: 1,
      Visiter: "",
      PatientName: "",
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
      ProcessDate: "",
    },
  ]);

  const headers = [
    // "id",
    // "ProcessID",
    // "VisiterID",
    { label: "Dosya No", value: "PatientID" },
    { label: "Ziyaret Eden", value: "Visiter" },
    { label: "Hasta Adı", value: "PatientName" },
    { label: "DR", value: "DoctorInfo" },
    { label: "Kons", value: "Consultation" },
    { label: "IV", value: "Intravenous" },
    { label: "Subkutan", value: "Subcutaneous" },
    { label: "Pansuman", value: "Dressing" },
    { label: "Sonda", value: "Catheter" },
    { label: "Tetkik", value: "Examination" },
    { label: "Yanık Pansuman", value: "BurnDressing" },
    { label: "NG", value: "Nasogastric" },
    { label: "IM", value: "Intramuscular" },
    { label: "Acile Yönlendirildi", value: "SentEmergency" },
    { label: "Talep", value: "Request" },
    { label: "Hastaneye Kaldırıldı", value: "Hospitalize" },
    { label: "Yaşbak Yönlendirildi", value: "ElderlyCare" },
    { label: "KM", value: "Kilometer" },
    { label: "Beslenme Şekli", value: "TypeOfNutrition" },
    { label: "İşlem Tarihi", value: "ProcessDate" },
  ];

  const processDetailWithId = processDetail.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  const ProcessInfoClick = () => {
    const getPatientProcessInfo = async () => {
      await axios
        .get(`/api/homecare/viewpatient/process/${patientInfo.PatientID}`)
        .then(function (response) {
          if (response.data.length === 0) {
            setIsThereProcess(false);
            console.log(response.data[0]);
          } else {
            setProcessDetail(response.data);
            console.log(
              processDetail.length,
              response.data.length,
              processDetail,
              response.data
            );
            setIsThereProcess(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getPatientProcessInfo();
    setTimeout(setShowProcessInfo("block"), 3000);
    console.log(processDetailWithId);
  };

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
    };
    if (identityValue.length === 11) getPatientData();
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
            setShowPatientInfo("flex");
          } else {
            setShowPatientInfo("none");
          }
        }}
        type="number"
        value={identityValue}
        id="searchPatient"
        name="search"
        className="form-control w-25 border-info"
        maxLength="11"
        onChange={(event) => {
          if (event.target.value.length >= 12) {
            event.target.value.slice(0, 11);
          } else {
            setIdentityValue(event.target.value);
            setIsThere(false);
            setIsThereProcess(false);
            setShowProcessInfo("none");
          }
          console.log(identityValue);
        }}
      />
      <div
        style={{
          display: `${showPatientInfo}`,
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
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Cihaz:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            disabled
            value={patientInfo.Device}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            Engelli:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            disabled
            value={patientInfo.Disability}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            Yatalak:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            disabled
            value={patientInfo.Bedridden}
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
          <label htmlFor="validationCustom02" className="form-label">
            Tanı:
          </label>
          <textarea
            type="text"
            className="form-control"
            style={{ height: "170px" }}
            id="validationCustom02"
            disabled
            value={patientInfo.Diagnosis}
          />
        </div>
        <div className="col-12 d-flex justify-content-between">
          <button
            className="btn btn-info h-auto"
            type="submit"
            onClick={ProcessInfoClick}
          >
            İşlem Görüntüle
          </button>
        </div>
        {/* //!-------------------------------------------------------------------SecondForm---------------------------------------------------------------------------- */}
        <div
          className="col-md-12 processViewScreen"
          style={{
            display: `${showProcessInfo}`,
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          {isThereProcess ? (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#f2f2f2", color: "#333" }}>
                    #
                  </th>
                  {headers.map((header, index) => (
                    <th
                      style={{
                        backgroundColor: "#f2f2f2",
                        color: "#333",
                      }}
                      key={header.value}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {processDetailWithId.map((item, index) => {
                  // console.log("Item:", item);
                  return (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      {headers.map((header, idx) => (
                        <td key={idx}>
                          {/* {console.log(
                            "Header:",
                            header,
                            "Value:",
                            item[header]
                          )} */}
                          {typeof item[header.value] === "boolean"
                            ? item[header.value]
                              ? "Evet"
                              : "Hayır"
                            : item[header.value] !== undefined
                            ? item[header.value]
                            : "N/A"}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>
              {" "}
              <h1>GÖRÜNTÜLEDİĞİNİZ HASTAYA AİT İŞLEM BULUNAMADI!</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PatientView;
