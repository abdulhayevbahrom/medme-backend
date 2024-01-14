const { Router } = require("express");
const dailyReports = Router();
const ClientModel = require("../models/clientModel");
const doctorModel = require("../models/doctorModel");

dailyReports.get("/doctorsMoney", async (req, res) => {
  let allUsers = await ClientModel.find();

  let users = allUsers.filter((user) => user?.stories[0].view === true);
  let doctors = await doctorModel.find({ docORrecep: "doctor" });
  let time = new Date();
  let day =
    time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

  let doctorDailyMoney = {};
  let todaysClient = {};
  // let percent = {};

  for (let i = 0; i < doctors.length; i++) {
    const doctor = doctors[i];
    const filteredUsers = users.filter(
      (user) => user?.stories[0]?.choseDoctor === doctor.specialization
    );
    doctorDailyMoney[doctor.specialization] = filteredUsers
      .filter((u) => u?.stories[0]?.day === day)
      .reduce((a, b) => a + b?.stories[0]?.paySumm, 0);

    todaysClient[doctor.specialization] = filteredUsers.filter(
      (u) => u?.stories[0]?.day === day
    ).length;

    // percent kodi oxshamagan

    // const totalPay = filteredUsers
    //   .filter((user) => user.day === day)
    //   .reduce((sum, user) => sum + (user.paySumm || 0), 0);
    // const doctorPercent = +doctor.percent || 0;
    // percent[doctor.specialization] = (totalPay * doctorPercent) / 100;
  }
  res.status(200).json({
    state: true,
    message: "kunlik tushumlar",
    innerData: { doctors, doctorDailyMoney, todaysClient },
  });
});

module.exports = { dailyReports };

// bu codelar chatGPT yozgan va togri

// dailyReports.get("/doctorsMoney", async (req, res) => {
//   try {
//     let users = await ClientModel.find({ view: true });
//     let doctors = await doctorModel.find({ docORrecep: "doctor" });
//     let time = new Date();
//     let day =
//       time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

//     let doctorDailyMoney = {};
//     let todaysClient = {};
//     let percent = {};

//     for (let i = 0; i < doctors.length; i++) {
//       const doctor = doctors[i];
//       const filteredUsers = users.filter(
//         (user) => user.choseDoctor === doctor.specialization
//       );

//       doctorDailyMoney[doctor.specialization] = filteredUsers
//         .filter((u) => u.day === day)
//         .reduce((a, b) => a + (b.paySumm || 0), 0);

//       todaysClient[doctor.specialization] = filteredUsers.filter(
//         (u) => u.day === day
//       ).length;

//       const totalPay = filteredUsers
//         .filter((user) => user.day === day)
//         .reduce((sum, user) => sum + (user.paySumm || 0), 0);

//       const doctorPercent = +doctor.percent || 0;
//       percent[doctor.specialization] = (totalPay * doctorPercent) / 100;
//     }

//     res.status(200).json({
//       state: true,
//       message: "kunlik tushumlar",
//       innerData: { doctors, doctorDailyMoney, todaysClient, percent },
//     });
//   } catch (error) {
//     console.error("Error in /doctorsMoney route:", error);
//     res.status(500).json({ state: false, message: "Server error" });
//   }
// });
