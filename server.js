// const express = require("express");
// const DB = require("./models/mssql/database");
// const cookieParser = require("cookie-parser");
// const addMember = require("./src/components/pages/AddMember.js");
// const bodyParser = require("body-parser");
// const verifyToken = require("verify-token");
// const operation = require("./mssqlserver");
// cors = require("cors");

// const API_PORT = process.env.PORT || 5000;

// const app = express();
// app.use(cors());
// app.use(express.json);
// app.use(bodyParser.json());
// app.use(cookieParser());

// app.get("/addmember", (req, res) => {
//   res.sendFile("index.html");
// });

// app.use((req,res,next) => {

// })

// app.listen(3000);

// app.operation.getPatientInfo(`${variable}`).then((res) => {
//   console.log(res.recordset);
// });

// operation.createPatient(`${variable}`).then((res) => {
//   console.log(res.recordset);
// });

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`server is running on port=${PORT}`);
});

const dbController = require("./mssqlserver");
const router = require("express").Router();

router.get("/addmember", async (req, res) => {
  try {
    const currentPatient = await dbController.createPatient(req.params);
    res.status(200).json(currentPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.post("http://localhost:3000/addmember", dbController.createPatient);
// router.post("/", dbController.findOneUser);
// router.post("/process", dbController.createProcess);

// router.get("/", dbController.findOneUser);
// router.get("/viewpatient", dbController.getPatientInfo);
// router.get("/addmember", dbController.createPatient);
