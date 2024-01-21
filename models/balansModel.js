const { Schema, model } = require("mongoose");
let time = new Date();
let today =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

let dayMonth = time.toLocaleString("en-US", { month: "long" });

const balanceSchema = new Schema(
  {
    day: { type: String },
    patientsAmountOfMoney: { type: Number, default: 0 },
    roomsAmountOfMoney: { type: Number, default: 0 },
    totalNumPatients: { type: Number, default: 0 },
    totalSumm: { type: Number, default: 0 },
    month: { type: String, default: dayMonth },
  },
  { timestamps: true }
);

const Balance = model("balance", balanceSchema);
module.exports = Balance;
