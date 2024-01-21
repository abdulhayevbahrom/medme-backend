const clientModel = require("../models/clientModel");
const Balance = require("../models/balansModel");
const schedule = require("node-schedule");

let time = new Date();
let today =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

let month = time.toLocaleString("en-US", { month: "long" });

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

schedule.scheduleJob("* */40 * * * *", async () => {
  try {
    let AllClients = await clientModel.find();
    let AllBalance = await Balance.find();
    let clients = AllClients?.filter(
      (i) => i?.stories[0]?.view === true && i?.stories[0]?.day === today
    );

    let balanceItem = AllBalance[AllBalance.length - 1];

    let patients = clients?.reduce((a, b) => a + b?.stories[0]?.paySumm, 0);
    let patientsLength = clients?.length;
    let roomAll = AllClients.filter(
      (client) => client?.stories[0]?.room?.outDay === today
    ).reduce((a, b) => a + b?.stories[0]?.room?.dayOfTreatment, 0);

    if (balanceItem?.day === today) {
      balanceItem.day = today;
      balanceItem.month = month;
      balanceItem.patientsAmountOfMoney = patients;
      balanceItem.roomsAmountOfMoney = roomAll;
      balanceItem.totalNumPatients = patientsLength;
      balanceItem.totalSumm = patients + roomAll;

      return await Balance.findByIdAndUpdate(balanceItem?._id, balanceItem);
    } else {
      let newBalans = {
        day: today,
        month,
        patientsAmountOfMoney: patients,
        roomsAmountOfMoney: roomAll,
        totalNumPatients: patientsLength,
        totalSumm: patients + roomAll,
      };

      let newB = await Balance.create(newBalans);
      return await newB.save();
    }
  } catch (error) {
    console.error("Xatolik:", error);
  }
});

// delete balans
const deleteBalans = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedBalans = await Balance.findByIdAndDelete(id);
    res.send(deletedBalans);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

// shart boyicha ochiradi
const deleteMany = async (req, res) => {
  try {
    let deletedBalans = await Balance.deleteMany();
    res.send(deletedBalans);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

module.exports = { getBalance, deleteBalans, deleteMany };
