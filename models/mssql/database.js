const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("HomeCareDB", "HomeCareLogin", "homeCare123", {
  dialect: "mssql",
  host: "localhost",
  port: 1337,
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
      autoIncrement: true,
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
      type: DataTypes.CHAR,
      allowNull: false,
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
      type: DataTypes.DATEONLY,
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

const Patients = sequelize.define(
  "Patients",
  {
    PatientID: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MotherName: {
      type: DataTypes.STRING,
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
    Gender: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    BirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    CountryIdentity: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    Blood: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    RegistrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Patients",
    modelName: "Patients",
  }
);

const Processes = sequelize.define(
  "Processes",
  {
    ProcessID: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    VisiterID: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    PatientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProcessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProcessComment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProcessBegin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ProcessFinish: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Processes",
  }
);

const States = sequelize.define(
  "States",
  {
    StateID: {
      primaryKey: true,
      type: DataTypes.TINYINT,
      allowNull: false,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Town: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "States",
  }
);

const Visits = sequelize.define(
  "Visits",
  {
    VisitID: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    PatientsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProcessID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    VisitType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    VisitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    VisitComment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Visits",
  }
);

module.exports = { Users, Patients, Processes, States, Visits };
