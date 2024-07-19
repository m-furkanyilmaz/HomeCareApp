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
  console.log(req);
  let newPatient = {
    Name: req.body.Name,
    Surname: req.body.Surname,
    FatherName: req.body.FatherName,
    MotherName: req.body.MotherName,
    Address: req.body.Address,
    Phone: req.body.Phone,
    Gender: req.body.Gender,
    BirthDate: req.body.BirthDate,
    CountryIdentity: req.body.CountryIdentity,
    Blood: req.body.Blood,
    RegistrationDate: req.body.RegistrationDate,
  };
  console.log(newPatient);

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
  await request.save();
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
