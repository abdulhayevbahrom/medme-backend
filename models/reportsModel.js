const { Schema, model } = require("mongoose");

let time = new Date();
let today =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

const schema = new Schema(
  {
    idNumber: { type: String },
    doctorFullName: { type: String },
    specialization: { type: String },
    percent: { type: Number },
    salary: { type: Number },
    analisisPrices: { type: Object },
    stories: [
      {
        day: { type: String, default: today },
        totalSumm: { type: Number, default: 0 },
        totalClient: { type: Number, default: 0 },
        doctorTP: { type: Number, default: 0 }, // doctorTP ===>> doctor ning bugungi oyligi (foizi)
      },
    ],
  },
  { timestamps: true }
);

const ReportsDB = model("reports", schema);

module.exports = ReportsDB;
