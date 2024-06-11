//!------------------------------------------------------MSSQL Bağlantısı---------------------------------------------------------------

// const express = require("express"),
//   visitInput = require("./dbfiles/visitinput"),
//   dbOperation = require("./dbfiles/Dboperation");
// cors = require("cors");

// const API_PORT = process.env.PORT || 5000;
// const app = express();

// dbOperation.getEmployees().then((res) => {
//   console.log(res.recordset);
// });

// let newVisit = new visitInput(2, 3, 4, 5, "Deneme", "2024-06-10");

// console.log(newVisit);

// dbOperation.createVisit(newVisit);

//!---------------------------------------------------Sequelize Bağlantısı---------------------------------------------------------------

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("HomeCareDB", "HomeCareLogin", "homeCare123", {
  host: "localhost",
  dialect: "mssql",
  port: 1337,
  sync: true,
});

const onConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Bağlandi!");
  } catch (error) {
    console.log("Hata!", error);
  }
};

onConnect();
