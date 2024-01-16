const { Router } = require("express");
const { getBalance } = require("../controllers/balans");

const balans = Router();

// get balans
balans.get("/getBalance", getBalance);

module.exports = { balans };
