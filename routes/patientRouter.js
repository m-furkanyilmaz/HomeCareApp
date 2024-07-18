const dbController = require("../mssqlserver.js");
const router = require("express").Router();

router.post("/addMember/:patientInfo", dbController.createPatient);

router.post("/processes", dbController.createProcess);

router.get("/patientInfo/:CountryIdentity", dbController.findOnePatient);

// router.get("/patientInfo/", dbController.findAllPatient);

// router.get("/users", dbController.findAllUsers);

router.get("/users/:Username", dbController.findOneUser);

module.exports = router;
