const ReportsDB = require("../models/reportsModel");
const clientModel = require("../models/clientModel");
const schedule = require("node-schedule");
const doctorModel = require("../models/doctorModel");

let time = new Date();
let today =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

const getReports = async (req, res) => {
  try {
    let allReports = await ReportsDB.find();
    if (!allReports.length) {
      return res.status(404).json({
        success: false,
        message: "No reports",
        innerData: allReports,
      });
    }

    res.status(200).json({
      success: true,
      message: "Reports found",
      innerData: allReports,
    });
  } catch (err) {
    res.json({ success: false, message: "Server error", err, data: null });
  }
};

// Create report
const createReport = async (req, res) => {
  try {
    let {
      idNumber,
      firstName,
      lastName,
      specialization,
      percent,
      salary,
      analisisPrices,
      feesPerCunsaltation,
    } = req.body;

    let info = {
      idNumber,
      doctorFullName: firstName + " " + lastName,
      specialization,
      feesPerCunsaltation,
      percent,
      salary,
      analisisPrices,
      stories: [
        {
          day: today,
          totalSumm: 0,
          totalClient: 0,
          doctorTP: 0,
        },
      ],
    };

    const exisitingUser = await ReportsDB.findOne({ idNumber });
    if (exisitingUser) {
      return res;
    }
    await ReportsDB.create(info);
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error", err, data: null });
  }
};

// auto update
// schedule.scheduleJob("0 3 * * * *", async () => {
schedule.scheduleJob(" */40 * * * * *", async () => {
  try {
    let AllClients = await clientModel.find();
    let AllReports = await ReportsDB.find();

    let clients = AllClients?.filter(
      (i) => i?.stories[0]?.view === true && i?.stories[0]?.day === today
    );

    for (let i = 0; i < AllReports.length; i++) {
      let reportItem = AllReports[i];

      let item = {
        day: today,

        // totalSumm: clients
        //   ?.filter((i) => i?.stories[0]?.doctorIdNumber === reportItem.idNumber)
        //   ?.reduce((a, b) => a + b.stories[0].paySumm, 0),

        totalSumm:
          clients?.filter(
            (i) => i?.stories[0]?.doctorIdNumber === reportItem.idNumber
          ).length * reportItem.feesPerCunsaltation,

        totalClient: clients?.filter(
          (i) => i?.stories[0]?.doctorIdNumber === reportItem.idNumber
        )?.length,

        doctorTP:
          (clients?.filter(
            (i) => i?.stories[0]?.doctorIdNumber === reportItem.idNumber
          ).length *
            reportItem.feesPerCunsaltation *
            reportItem.percent) /
          100,
      };

      reportItem?.stories[0]?.day === today
        ? ((reportItem.stories[0] = item),
          await ReportsDB.findByIdAndUpdate(reportItem._id, reportItem))
        : reportItem.stories.unshift(item);
      await ReportsDB.findByIdAndUpdate(reportItem._id, reportItem);
    }
  } catch (error) {
    console.error("Xatolik:", error);
  }
});

// delete doctor in report
const deleteDoctorInReport = async (req, res) => {
  try {
    let findDoctor = await doctorModel.findOne({ _id: req.params._id });
    let result = await ReportsDB.deleteOne({
      idNumber: findDoctor?.idNumber,
    });
    console.log(result);
    // res.status(200).json({
    //   success: true,}
    //   message: "delete Doctor In Report",
    //   innerData: result,
    // });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error", err, data: null });
  }
};

// shart boyicha ochiradi
const deleteMany = async (req, res) => {
  try {
    let clear = await ReportsDB.deleteMany();
    res.send(clear);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

module.exports = { getReports, createReport, deleteDoctorInReport, deleteMany };
