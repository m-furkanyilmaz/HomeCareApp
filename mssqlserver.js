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

const getUsers = async () => {
  const result = await Database.Users.findAll();
  console.log("result", result.length);
  result.forEach((item) => {
    console.log("item", item.dataValues);
  });
};

getUsers();

//? Bir Kullanıcıya Eriş

const findOneUser = async (denemeName) => {
  const result = await Database.Users.findOne({
    where: { Username: denemeName },
  });
  console.log("result", result.dataValues);
};

// findOneUser();

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
  res.status(200).send(request);
  console.log("request", request.dataValues);
};

// createUser();

//? Hasta Ekle

const createPatient = async (patient) => {
  const request = await Database.Patients.create({
    Name: patient.Name,
    Surname: patient.Surname,
    FatherName: patient.FatherName,
    MotherName: patient.MotherName,
    Address: patient.Address,
    Phone: patient.Phone,
    Gender: patient.Gender,
    BirthDate: patient.BirthDate,
    CountryIdentity: patient.CountryIdentity,
    Blood: patient.Blood,
    RegistrationDate: patient.RegistrationDate,
  });
  console.log("request", request.dataValues);
};

//? İşlem Oluştur

const createProcess = async (patient, user, process) => {
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

const getPatientInfo = async (patientInfo) => {
  const result = await Database.Patients.findOne({
    where: { CountryIdentity: `${patientInfo}` },
  });
};

module.exports = {
  getPatientInfo,
  createPatient,
  createUser,
  findOneUser,
  createProcess,
};
