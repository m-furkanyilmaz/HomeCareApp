const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// var corOptions = {
//   origin: "localhost:5001",
// };
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`server is running on port=${PORT}`);
});

//* Router
const router = require("./routes/patientRouter");
app.use("/api/homecare", router);

//? APP . GET - POST - SET - DELETE İLE APİ'YE İSTEK ATMA

app.get("/patientInfo/:CountryIdentity", router);

app.get("/users/:Username", router);

app.get("/oldProcessInfo", router);

app.get("/patientData/:PatientID", router);

app.get("/viewpatient/process/:PatientID", router);

// app.get("/users", router);

app.post("/addmember", router);

app.post("/processes", router);
