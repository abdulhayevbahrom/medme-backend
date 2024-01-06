const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  choseDoctor: {
    type: String,
    required: [true, "doctor is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  year: {
    type: String,
    required: [true, "doctor is required"],
  },
  payState: {
    type: Boolean,
    required: [true, "true or false value is required"],
  },
  paySumm: {
    type: Number,
    required: [true, "default: 0 , before other summ"],
  },
  doctorFirstName: {
    type: String,
    required: [true, "firstname is required"],
  },
  doctorPhone: {
    type: String,
  },
  doctorLastName: {
    type: String,
    required: [true, "lastname is required"],
  },
  idNumber: {
    type: String,
    required: [true, "ID number is required"],
  },
  temperature: {
    type: String
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  diagnostics: {
    type: String
  },
  urgentCheck: {
    type: String
  },
  analysis: {
    type: String
  },
  urgent: {
    type: String
  },

  sickname: {
    type: String,
  },
  retsept: [
    {
      writed_at: {
        type: String
      },
      writed_doctor: {
        type: String
      },
      sickname: {
        type: String
      },
      retseptList: {
        type: String
      }
    }
  ],
  view: {
    type: Number,
  },
  day: {
    type: String,
  },
  month: {
    type: String,
  },
  queueNumber: {
    type: Number,
  },
  room: {
    dayOfTreatment: {
      type: Number,
      default: 0,
    },
    payForRoom: {
      type: Number,
      default: 0,
    },
    roomNumber: {
      type: Number,
    },
    outDay: {
      type: String,
      default: 0,
    },
  },
});

const ClientModel = model("client", clientSchema);
module.exports = ClientModel;
