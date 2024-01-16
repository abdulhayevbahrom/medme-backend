const clientModel = require("../models/clientModel");
const Balance = require('../models/balansModel');
const roomModel = require("../models/roomsModel");
const schedule = require("node-schedule");

let time = new Date();
let today =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

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
            totalSumm
        } = req.body;

        let info = {
            day: today,
            patientsAmountOfMoney: 0,
            roomsAmountOfMoney: 0,
            totalNumPatients: 0,
            totalSumm: 0

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



schedule.scheduleJob("0 * * * * *", async () => {
    try {
        let AllClients = await clientModel.find();
        let AllBalance = await Balance.find();
        let AllRooms = await roomModel.find();

        let clients = AllClients?.filter(
            (i) => i?.stories[0]?.view === true && i?.stories[0]?.day === today
        );

        let rooms = AllRooms?.filter((i) => i?.capacity !== 0);

        for (let i = 0; i < AllBalance.length; i++) {
            let balanceItem = AllBalance[i];
            let patients = clients?.reduce((a, b) => a + b?.totalSumm, 0)
            let patientsLength = clients?.filter((i) => i?.stories[0])?.length
            let roomAll = rooms?.filter((i) => i?.capacity?.filter((i) => i?.stories[0]?.filter((i) => i.room?.reduce((a, b) => a + b.stories[0]?.dayOfTreatment, 0)))
            )
            balanceItem[0] = {
                day: today,
                patientsAmountOfMoney: patients,
                roomsAmountOfMoney: roomAll,
                totalNumPatients: patientsLength,
                totalSumm: patients + roomAll
            };
        }
    } catch (error) {
        console.error("Xatolik:", error);
    }
});
module.exports = { getBalance, createBalance };