const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("HomeCareDB", "HomeCareLogin", "homeCare123", {
  port: 1337,
  host: "localhost",
  dialect: "mssql",
  database: "HomeCareDB",
  server: "YILMAZBILGIISLE",
  options: {
    port: 1337,
  },
});

const Database = require("./models/mssql/database");
//? Bağlantı

const onConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Bağlandı!");
    await Database.Users.sync({ force: false });
    await Database.Visits.sync({ force: false });
    await Database.States.sync({ force: false });
    await Database.Patients.sync({ force: false });
    await Database.Processes.sync({ force: false });
  } catch (error) {
    console.log("hata", error);
  }
};

onConnect();

//? Tüm Kullanıcılar

// const getUsers = async () => {
//   const result = await Database.Users.findAll();
//   console.log("result", result.length);
//   result.forEach((item) => {
//     console.log("item", item.dataValues);
//   });
// };

// getUsers();

//? TC Kimlik Numarası Girilen Hasta Bilgisi Getir

const findOnePatient = async (req, res) => {
  let ID = req.params.CountryIdentity;
  const result = await Database.Patients.findAll({
    where: {
      CountryIdentity: ID,
    },
  });
  if (result === null) {
    console.log("Not found!", req.params.CountryIdentity);
  } else {
    console.log("result", result.dataValues);
    res.status(200).send(result);
  }
};

//? Eski tarihli işlemleri getir

const findOldProcesses = async (req, res) => {
  try {
    const result = await Database.Processes.findAll({
      order: [
        ["ProcessDate", "ASC"], // 'ASC' küçükten büyüğe sıralar
      ],
      limit: 10, // İlk 10 veriyi çeker
    });

    if (result.length === 0) {
      console.log("No records found!");
      res.status(404).send("No records found!");
    } else {
      console.log("Result:", result);
      res.status(200).send(result);
    }
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).send("Internal Server Error");
  }
};

// findOldProcesses();

//? Tüm Hastaları Bul

const findAllPatient = async (req, res) => {
  let ID = req.params.PatientID;
  const result = await Database.Patients.findOne({
    where: {
      PatientID: ID,
    },
  });
  if (result === null) {
    console.log("Not found!", req.params.CountryIdentity);
  } else {
    console.log("result", result.dataValues);
    res.status(200).send(result);
  }
};

//? Hastaya ait işlemleri bul

const findPatientProcess = async (req, res) => {
  console.log(req.body.PatientID, req.params.PatientID);
  let PID = req.params.PatientID;
  const result = await Database.Processes.findAll({
    where: { PatientID: PID },
  });
  console.log("result", result.dataValues);
  res.status(200).send(result);
};

const findAllUsers = async (req, res) => {
  const results = await Database.Users.findAll();
  console.log("result", results.dataValues);
  res.status(200).send(results);
};

//! Kullanıcı ekle ---Kullanılmıyor!---

const createUser = async (user, res) => {
  const request = await Database.Users.create({
    StateID: user.StateID,
    Name: user.Name,
    Surname: user.Surname,
    Username: user.Username,
    Password: user.Password,
    Title: user.Title,
    CountryIdentity: user.CountryIdentity,
    Gender: user.Gender,
    BirthPlace: user.BirthPlace,
    BirthDate: user.BirthDate,
    Address: user.Address,
    Phone: user.Phone,
  });
  console.log("request", request.dataValues);
  res.status(200).send(request);
};

//? Hasta Ekle

const createPatient = async (req, res) => {
  console.log(req);
  let newPatient = {
    Name: req.body.Name,
    Surname: req.body.Surname,
    CountryIdentity: req.body.CountryIdentity,
    Gender: req.body.Gender,
    Blood: req.body.Blood,
    BirthDate: req.body.BirthDate,
    Device: req.body.Device,
    Disability: req.body.Disability,
    Bedridden: req.body.Bedridden,
    FatherName: req.body.FatherName,
    Phone: req.body.Phone,
    Address: req.body.Address,
    Diagnosis: req.body.Diagnosis,
  };
  const request = await Database.Patients.create({
    Name: newPatient.Name,
    Surname: newPatient.Surname,
    CountryIdentity: newPatient.CountryIdentity,
    Gender: newPatient.Gender,
    Blood: newPatient.Blood,
    BirthDate: newPatient.BirthDate,
    Device: newPatient.Device,
    Disability: newPatient.Disability,
    Bedridden: newPatient.Bedridden,
    FatherName: newPatient.FatherName,
    Phone: newPatient.Phone,
    Address: newPatient.Address,
    Diagnosis: newPatient.Diagnosis,
  });

  console.log("request", request.dataValues);
  console.log("Yeni Hasta Bilgileri:", newPatient);
  await request.save();
  res.status(200).send(request);
};

//? Kullanıcının girdiği işlemi database e kaydet

const createProcess = async (req, res) => {
  let newProcess = {
    VisiterID: req.body.VisiterID,
    Visiter: req.body.Visiter,
    PatientID: req.body.PatientID,
    PatientName: req.body.PatientName,
    ProcessDate: req.body.ProcessDate,
    DoctorInfo: req.body.DoctorInfo,
    Consultation: req.body.Consultation,
    Intravenous: req.body.Intravenous,
    Subcutaneous: req.body.Subcutaneous,
    Dressing: req.body.Dressing,
    Catheter: req.body.Catheter,
    Examination: req.body.Examination,
    BurnDressing: req.body.BurnDressing,
    Nasogastric: req.body.Nasogastric,
    Intramuscular: req.body.Intramuscular,
    SentEmergency: req.body.SentEmergency,
    Request: req.body.Request,
    Hospitalize: req.body.Hospitalize,
    ElderlyCare: req.body.ElderlyCare,
    Kilometer: req.body.Kilometer,
    TypeOfNutrition: req.body.TypeOfNutrition,
  };
  const request = await Database.Processes.create({
    VisiterID: newProcess.VisiterID,
    Visiter: newProcess.Visiter,
    PatientID: newProcess.PatientID,
    PatientName: newProcess.PatientName,
    ProcessDate: newProcess.ProcessDate,
    DoctorInfo: newProcess.DoctorInfo,
    Consultation: newProcess.Consultation,
    Intravenous: newProcess.Intravenous,
    Subcutaneous: newProcess.Subcutaneous,
    Dressing: newProcess.Dressing,
    Catheter: newProcess.Catheter,
    Examination: newProcess.Examination,
    BurnDressing: newProcess.BurnDressing,
    Nasogastric: newProcess.Nasogastric,
    Intramuscular: newProcess.Intramuscular,
    SentEmergency: newProcess.SentEmergency,
    Request: newProcess.Request,
    Hospitalize: newProcess.Hospitalize,
    ElderlyCare: newProcess.ElderlyCare,
    Kilometer: newProcess.Kilometer,
    TypeOfNutrition: newProcess.TypeOfNutrition,
  });
  console.log("request", request.dataValues);
  await request.save();
  res.status(200).send(request);
};

//? Username girilen kullanıcı bilgisini getir

const findOneUser = async (req, res) => {
  let userInfo = req.params.Username;
  const result = await Database.Users.findOne({
    where: { Username: userInfo },
  });
  if (result === null) {
    console.log("User Not Found!");
  } else {
    res.status(200).send(result);
  }
};

module.exports = {
  findOneUser,
  findOldProcesses,
  findAllPatient,
  createPatient,
  createUser,
  findOnePatient,
  createProcess,
  findAllUsers,
  findPatientProcess,
};
