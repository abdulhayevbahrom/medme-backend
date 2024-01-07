const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      // required: [false, "specialization is require"],
    },
    experience: {
      type: String,
      // required: [false, "experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
    },
    analisisPrices: {
      blood_analysis: {
        type: Number,
      },
      urine_analysis: {
        type: Number,
      },
      biochemical_analysis: {
        type: Number,
      },
    },
    labator: {
      type: String,
    },
    diagnostica: {
      type: String,
    },
    analis: {
      type: String,
    },
    login: {
      type: String,
      required: [true, "login is require"],
    },
    password: {
      type: String,
      required: [true, "password is require"],
    },
    docORrecep: {
      type: String,
      required: [true, " or reception is require"],
    },
    checkList: {
      type: String,
    },
    percent: {
      type: Number,
    },
    salary: {
      type: Number,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
