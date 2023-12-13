const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: [true, "Room number is required"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
    },
    category: {
      type: String,
      required: [true, "phone no is required"],
    },
    usersNumber: {
      type: Number,
      required: true
    },
    capacity: {
      type: Array,
    },
    floor: {
      type: Number,
      required: true
    }
  },
);

const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;
