const clientModel = require("../models/clientModel");
const Balance = require("../models/balansModel");
const roomModel = require("../models/roomsModel");
const schedule = require("node-schedule");

let time = new Date();
let today =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  

let month = time.toLocaleString("default", { month: "long" });

const getBalance = async (req, res) => {
  try {
    let allBalance = await Balance.find();
    if (!allBalance.length) {
      return res.status(404).json({
        success: false,
        message: "Balance is empty",
        innerData: allBalance,
      });
    }

    res.status(200).json({
      success: true,
      message: "Balance found",
      innerData: allBalance,
    });
  } catch (err) {
    res.json({ success: false, message: "Server error", err, data: null });
  }
};

// Create balanse
const createBalance = async (req, res) => {
  try {
    let {
      patientsAmountOfMoney,
      roomsAmountOfMoney,
      totalNumPatients,
      totalSumm,
    } = req.body;

    let info = {
      day: today,
      patientsAmountOfMoney: 0,
      roomsAmountOfMoney: 0,
      totalNumPatients: 0,
      totalSumm: 0,
    };

    const exisitingUser = await ReportsDB.findOne({ idNumber });
    if (exisitingUser) {
      return res;
    }
    await Balance.create(info);
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error", err, data: null });
  }
};

schedule.scheduleJob("*/1 * * * *", async () => {
  try {
    let AllClients = await clientModel.find();
    let AllBalance = await Balance.find();
    let AllRooms = await roomModel.find();

    let clients = AllClients?.filter(
      (i) => i?.stories[0]?.view === true && i?.stories[0]?.day === today
    );

    let rooms = AllRooms?.filter((i) => i?.capacity !== 0);

    let balanceItem = AllBalance[AllBalance.length - 1];

    let patients = clients?.reduce((a, b) => a + b?.stories[0]?.totalSumm, 0);
    let patientsLength = clients?.length;
    let roomAll = rooms?.filter((i) =>
      i?.capacity?.reduce((a, b) => a + b?.stories[0]?.room?.dayOfTreatment, 0)
    );

    // console.log(patients);

    // if (balanceItem?.day === today) {
    //   balanceItem = {
    //     day: today,
    //     month,
    //     patientsAmountOfMoney: patients,
    //     roomsAmountOfMoney: roomAll,
    //     totalNumPatients: patientsLength,
    //     totalSumm: patients + roomAll,
    //   };
    //   return await Balance.findByIdAndUpdate(balanceItem?._id, balanceItem);
    // } else {
    //   balanceItem = {
    //     day: today,
    //     month,
    //     patientsAmountOfMoney: patients,
    //     roomsAmountOfMoney: roomAll,
    //     totalNumPatients: patientsLength,
    //     totalSumm: patients + roomAll,
    //   };

    //   await Balance.create(balanceItem);
    // }

    // }
  } catch (error) {
    console.error("Xatolik:", error);
  }
});
module.exports = { getBalance, createBalance };
