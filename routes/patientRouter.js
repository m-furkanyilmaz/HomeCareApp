const dbController = require("../mssqlserver.js");
const router = require("express").Router();

router.post("/addmember", dbController.createPatient);

router.post("/processes", dbController.createProcess);

router.get("/patientInfo/:CountryIdentity", dbController.findOnePatient);

router.get("/patientInfo/oldPatients", dbController.findOldPatients);

// router.get("/patientInfo/", dbController.findAllPatient);

// router.get("/users", dbController.findAllUsers);

router.get("/users/:Username", dbController.findOneUser);

module.exports = router;
