const { Router } = require("express");
const { getReports, deleteMany } = require("../controllers/reports");

const reports = Router();

// get reports
reports.get("/getReports", getReports);

reports.delete("/clear", deleteMany);

module.exports = { reports };
