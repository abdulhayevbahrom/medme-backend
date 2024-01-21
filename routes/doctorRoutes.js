const express = require("express");
const {
  loginController,
  registerController,
  getAllDocotrsController,
  deleteDoctor,
  updateDoctor,
} = require("../controllers/doctorCtrl");
// const authMiddleware = require("../middlewares/authMiddleware");
const adminValidation = require("../Validation/admin.validation");

const {
  createReport,
  deleteDoctorInReport,
} = require("../controllers/reports");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", [adminValidation.add], (req, res) => {
  createReport(req, res), registerController(req, res);
});

//GET ALL DOC
router.get("/getAllDoctors", getAllDocotrsController);

// DELETE DOCTOR
// router.delete("/delete/:_id", deleteDoctor);
router.delete("/delete/:_id", (req, res) => {
  deleteDoctor(req, res), deleteDoctorInReport(req, res);
});

// update doctor
router.put("/update/:_id", updateDoctor);

//APply Doctor || POST
// router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
// router.post(
//   "/get-all-notification",
//   authMiddleware,
//   getAllNotificationController
// );
//Notifiaction  Doctor || POST
// router.post(
//   "/delete-all-notification",
//   authMiddleware,
//   deleteAllNotificationController
// );

//BOOK APPOINTMENT
// router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
// router.post(
//   "/booking-availbility",
//   authMiddleware,
//   bookingAvailabilityController
// );

//Appointments List
// router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
