const config = {
  user: "HomeCareLogin",
  password: "homeCare123",
  server: "YILMAZBILGIISLE",
  database: "HomeCareDB",
  port: 1337,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
};

module.exports = config;
