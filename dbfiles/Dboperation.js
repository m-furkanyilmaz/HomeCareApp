/* const config = require("./Dbconfig"),
  sqlConnectionToserver = require("mssql");

const createVisit = async (visitInput) => {
  try {
    let pool = await sqlConnectionToserver.connect(config);
    let insertVisit = pool
      .request()
      .query(
        `INSERT INTO Visits (VisitID,UsersID,PatientsID,ProcessID,VisitType,VisitDate) VALUES (${visitInput.VisitID},${visitInput.UsersID},${visitInput.PatientsID},${visitInput.ProcessID},${visitInput.VisitType},'2022-05-09')`
      );
    console.log(insertVisit);
    return insertVisit;
  } catch (error) {
    console.log(error);
  }
};
const getEmployees = async () => {
  try {
    let pool = await sqlConnectionToserver.connect(config);
    let employees = pool.request().query(`SELECT * FROM Visits`);
    console.log(employees);
    return employees;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createVisit,
  getEmployees,
};
*/
