import React, { useEffect } from "react";
import Navbar from "../Navbar";
import "../css/home.css";
import { useState } from "react";
import Footer from "../Footer";
import axios from "axios";

function Home() {
  const [showDetail, setShowDetail] = useState("none");
  const [loading, setLoading] = useState(true);
  const [showingValues, setShowingValues] = useState({
    Name: "",
    CountryIdentity: "",
    FatherName: "",
    BirthDate: "",
    ProcessDate: "",
    Address: "",
    LastProcess: "",
  });
  const [patientInfo, setPatientInfo] = useState([
    {
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
    },
  ]);
  const [processInfo, setProcessInfo] = useState([
    {
      VisiterID: 1,
      Visiter: "",
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
    },
  ]);

  useEffect(() => {
    const getProcessData = async () => {
      await axios
        .get("/oldProcessInfo")
        .then(function (response) {
          setProcessInfo(response.data);
          console.log(response.data);
          console.log(response.data[0], processInfo);
          // if(response!==undefined){
          //   getPatientDatas();
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getProcessData();
  }, []);

  useEffect(() => {
    const getPatientData = async () => {
      setLoading(true); // Yükleme başladığında true yap
      try {
        // API isteklerinin bir listesini oluştur
        const requests = processInfo.map((item) =>
          axios.get(`/patientData/${item.PatientID}`).then((response) => ({
            id: item.PatientID,
            data: response.data,
          }))
        );

        // Tüm istekleri bekle
        const results = await Promise.all(requests);

        // `processInfo` sırasına göre verileri sıralı bir dizide sakla
        const sortedData = results
          .sort(
            (a, b) =>
              processInfo.findIndex((item) => item.PatientID === a.id) -
              processInfo.findIndex((item) => item.PatientID === b.id)
          )
          .map((result) => result.data);

        // `patientInfo` durumunu güncelle
        setPatientInfo(sortedData);
      } catch (error) {
        console.error("API çağrısı sırasında bir hata oluştu:", error);
      } finally {
        setLoading(false); // Veri yükleme tamamlandığında false yap
      }
    };

    getPatientData();
  }, [processInfo]);

  const handleClick = (patientValues, processValues) => {
    if (showDetail === "none") {
      setShowingValues({
        Name: `${patientValues.Name} ${patientValues.Surname}`,
        CountryIdentity: patientValues.CountryIdentity,
        FatherName: patientValues.FatherName,
        BirthDate: patientValues.BirthDate,
        ProcessDate: processValues.ProcessDate,
        Address: patientValues.Address,
        LastProcess: `\tDR: ${processValues.DoctorInfo}\t 
        KONS: ${processValues.Consultation}\t 
        IM: ${processValues.Intramuscular}\t 
        IV: ${processValues.Intravenous}\t 
        SUBKUTAN: ${processValues.Subcutaneous}\t 
        PANSUMAN: ${processValues.Dressing}\t 
        SONDA: ${processValues.Catheter}\t 
        NG: ${processValues.Nasogastric}\t 
        TETKİK: ${processValues.Examination}\t 
        ACİLE YÖNLENDİRİLDİ: ${
          processValues.SentEmergency ? "Evet" : "Hayır"
        }\t 
        TALEP: ${processValues.Request ? "Evet" : "Hayır"}\t 
        YANIK PANSUMAN: ${processValues.BurnDressing}\t 
        HASTANEYE KALDIRILDI: ${processValues.Hospitalize ? "Evet" : "Hayır"}\t 
        YAŞBAK: ${processValues.ElderlyCare ? "Evet" : "Hayır"}`,
      });
      setShowDetail("block");
    } else {
      setShowDetail("none");
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
          <h3
            style={{
              marginRight: "20px",
              marginBottom: "25px",
              marginTop: "20px",
            }}
          >
            Uzun Süredir Ziyaret Edilmeyen Hastalar
          </h3>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            processInfo.map((item, index) => {
              const patientItem = patientInfo[index] || { ProcessDate: "N/A" };
              return (
                <li key={index}>
                  <p
                    style={{
                      cursor: "pointer",
                      border: "1px solid black",
                      textAlign: "center",
                      borderRadius: "10px",
                      color: "green",
                      fontFamily: "sans-serif",
                    }}
                    onClick={() => handleClick(patientItem, item)}
                  >
                    {`${patientItem.Name} 
                  ${patientItem.Surname}
                  ${item.ProcessDate.slice(0, 10)}`}
                  </p>
                </li>
              );
            })
          )}
        </ol>
        <div
          style={{ display: `${showDetail}` }}
          className="col-md-6 patientInfo"
        >
          <div className="col-md-12 row">
            <div className="col-md-6">
              <p>
                <b>Hasta Adı:</b>
              </p>
              <input type="text" value={showingValues.Name} disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>TC Kimlik No:</b>
              </p>
              <input
                type="text"
                value={showingValues.CountryIdentity}
                disabled
              />
            </div>
            <div className="col-md-6">
              <p>
                <b>Baba Adı:</b>
              </p>
              <input type="text" value={showingValues.FatherName} disabled />
            </div>
            <div className="col-md-6">
              <p>
                <b>D.Tarihi:</b>
              </p>
              <input
                style={{ width: "189px" }}
                value={showingValues.BirthDate}
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
            value={showingValues.Address}
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
            value={showingValues.LastProcess}
            disabled
          ></textarea>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
