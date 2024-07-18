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

//? Bir Hasta Bilgisi Getir

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

const findAllPatient = async (req, res) => {
  let ID = req.params.CountryIdentity;
  const result = await Database.Patients.findAll();
  console.log("result", result.dataValues);
  res.status(200).send(result);
};

const findAllUsers = async (req, res) => {
  const results = await Database.Users.findAll();
  console.log("result", results.dataValues);
  res.status(200).send(results);
};

//? Bir Kuruma Eriş
/*
const findOneState = async () => {
  const result = await Database.States.findOne({ where: { StateID: 1 } });
  console.log("result", result.dataValues);
};

findOneState();
*/
//? Kullanıcı Ekle

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

// createUser();

//? Hasta Ekle

const createPatient = async (req, res) => {
  let newPatient = {
    Name: req.params.Name,
    Surname: req.params.Surname,
    FatherName: req.params.FatherName,
    MotherName: req.params.MotherName,
    Address: req.params.Address,
    Phone: req.params.Phone,
    Gender: req.params.Gender,
    BirthDate: req.params.BirthDate,
    CountryIdentity: req.params.CountryIdentity,
    Blood: req.params.Blood,
    RegistrationDate: req.params.RegistrationDate,
  };
  const request = await Database.Patients.create({
    Name: newPatient.Name,
    Surname: newPatient.Surname,
    FatherName: newPatient.FatherName,
    MotherName: newPatient.MotherName,
    Address: newPatient.Address,
    Phone: newPatient.Phone,
    Gender: newPatient.Gender,
    BirthDate: newPatient.BirthDate,
    CountryIdentity: newPatient.CountryIdentity,
    Blood: newPatient.Blood,
    RegistrationDate: newPatient.RegistrationDate,
  });
  console.log("request", request.dataValues);
  console.log("Yeni Hasta Bilgileri:", newPatient);
  res.status(200).send(request);
};

//? İşlem Oluştur

const createProcess = async (req, res) => {
  const request = await Database.Processes.create({
    VisiterID: user.UserID,
    PatientID: patient.PatientID,
    ProcessName: process.Name,
    ProcessComment: process.ProcessComment,
    ProcessBegin: process.ProcessBegin,
    ProcessFinish: process.ProcessFinish,
  });
  console.log("request", request.dataValues);
};

//? Hasta Bilgilerini Getir, İşlem Yapılacak mı? Kontrol Et!

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
  findAllPatient,
  createPatient,
  createUser,
  findOnePatient,
  createProcess,
  findAllUsers,
};
