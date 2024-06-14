const { Sequelize, where } = require("sequelize");

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
const { AutoIncrement } = require("@sequelize/core/decorators-legacy");

//? Bağlantı

const onConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Bağlandı!");
    await Database.Users.sync({ force: false });
    await Database.States.sync({ force: false });
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

const findOneUser = async () => {
  const result = await Database.Users.findOne({ where: { UserID: 10001 } });
  console.log("result", result.dataValues);
};

// findOneUser();

//? Bir Kuruma Eriş

const findOneState = async () => {
  const result = await Database.States.findOne({ where: { StateID: 1 } });
  console.log("result", result.dataValues);
};

findOneState();

//? User Ekle

const createUsers = async (user) => {
  const result = await Database.Users.create({
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
  console.log("result", result.dataValues);
};

// createUsers();
