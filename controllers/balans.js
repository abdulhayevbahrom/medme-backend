const ReportsDB = require("../models/reportsModel");
const Balance = require('../models/balansModel');

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


// Create report
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
        await Balance.create(info);
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Server error", err, data: null });
    }
};



schedule.scheduleJob("0 * * * * *", async () => {
    try {
        let AllReports = await ReportsDB.find();
        let AllBalance = await Balance.find();

        let reports = AllReports?.filter(
            (i) => i?.stories[0].totalSumm !== 0 && i?.stories[0].totalClient !== 0
        );

        for (let i = 0; i < AllBalance.length; i++) {
            let balanceItem = AllBalance[i];

            balanceItem[0] = {
                day: today,
                patientsAmountOfMoney: reports.reduce((a, b) => a + b?.totalSumm, 0),
                roomsAmountOfMoney: 0,
                totalNumPatients: reports.reduce((a, b) => a + b?.totalClient, 0)?.length,
            };
        }
    } catch (error) {
        console.error("Xatolik:", error);
    }
});
module.exports = { getBalance, createBalance };