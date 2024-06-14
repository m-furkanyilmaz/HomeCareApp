const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("HomeCareDB", "root", "homeCare1", {
  host: "localhost",
  dialect: "mysql",
  sync: true,
  define: {
    timestamps: false,
  },
});

const Users = sequelize.define(
  "Users",
  {
    UserID: {
      primaryKey: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    StateID: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CountryIdentity: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    BirthPlace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BirthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Users",
  }
);

module.exports = Users;
