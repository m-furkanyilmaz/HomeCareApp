const dbController = require("../mssqlserver.js");
const router = require("express").Router();

router.post("/addMember", dbController.createPatient);

router.post("/processes", dbController.createProcess);

router.get("/patientInfo", dbController.findOnePatient);

router.get("/", dbController.findOneUser);

router.get("/users", dbController.findLastPatients);

module.exports = router;
