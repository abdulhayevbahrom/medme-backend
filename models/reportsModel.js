const { Schema, model } = require("mongoose");

let time = new Date();
let today =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

let dayMonth = time.toLocaleString("en-US", { month: "long" });

const schema = new Schema(
  {
    idNumber: { type: String },
    doctorFullName: { type: String },
    specialization: { type: String },
    feesPerCunsaltation: { type: Number },
    percent: { type: Number },
    salary: { type: Number },
    analisisPrices: { type: Object },
    stories: [
      {
        day: { type: String, default: today },
        month: { type: String, default: dayMonth },
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
