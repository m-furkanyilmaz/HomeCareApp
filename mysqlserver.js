const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("homecaredb", "root", "homeCare1", {
  host: "localhost",
  dialect: "mysql",
});

const Users = require("./models/mysql/myusers");

const onConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Bağlandı!");
    await Users.sync({ force: false });
  } catch (error) {
    console.log("hata", error);
  }
};

onConnect();

const getUsers = async () => {
  try {
    const result = await Users.findByPk(2);
    console.log("result", result);
  } catch (result) {
    console.log("hata", result);
  }
};

getUsers();
