const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
const cors = require("cors");
var corOptions = {
  origin: "localhost:5001",
};
app.use(cors(corOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`server is running on port=${PORT}`);
});

const dbController = require("./mssqlserver");
//* Router
const router = require("./routes/patientRouter");
app.use("/api/homecare", router);

//? APP - GET - POST - SET - DELETE İLE APİ'YE İSTEK ATMA

app.get("/patientInfo", async (req, res) => {
  try {
    const viewPatient = await dbController.findOnePatient(req.params);
    console.log(viewPatient);
    res.status(200).send(viewPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/users", router);
