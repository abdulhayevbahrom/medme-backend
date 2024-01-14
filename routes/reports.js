const { Router } = require("express");
const { getReports } = require("../controllers/reports");

const reports = Router();

// get reports
reports.get("/getReports", getReports);

module.exports = { reports };
