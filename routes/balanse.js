const { Router } = require("express");
const {
  getBalance,
  deleteBalans,
  deleteMany,
} = require("../controllers/balans");

const balans = Router();

// get balans
balans.get("/getBalance", getBalance);

balans.delete("/deleteBalance/:id", deleteBalans);

balans.delete("/deleteMany", deleteMany);

module.exports = { balans };
