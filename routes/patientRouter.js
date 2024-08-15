const dbController = require("../mssqlserver.js");
const router = require("express").Router();

router.post("/addmember", dbController.createPatient);

router.post("/processes", dbController.createProcess);

router.get("/patientInfo/:CountryIdentity", dbController.findOnePatient);

router.get("/oldProcessInfo", dbController.findOldProcesses);

router.get("/patientData/:PatientID", dbController.findAllPatient);

router.get("/viewpatient/process/:PatientID", dbController.findPatientProcess);

// router.get("/patientInfo/", dbController.findAllPatient);

// router.get("/users", dbController.findAllUsers);

router.get("/users/:Username", dbController.findOneUser);

module.exports = router;
