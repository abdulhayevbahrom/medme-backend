const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await doctorModel.findOne({
      login: req.body.login,
      idNumber: req.body.idNumber,
    });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    // const password = req.body.password;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // req.body.password = hashedPassword;
    const newUser = new doctorModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res
        .status(403)
        .json({
          state: false,
          msg: "Username or password is empty",
          innerData: null,
        });
    }

    const exactAdmin = await doctorModel.findOne({ login }); // => {username : username}
    if (!exactAdmin) {
      return res
        .status(400)
        .json({
          state: false,
          msg: "Username or password is incorrect",
          innerData: null,
        });
    }

    if (exactAdmin.password !== password) {
      return res
        .status(400)
        .json({
          state: false,
          msg: "Username or password is incorrect",
          innerData: null,
        });
    }

    const token = jwt.sign({ id: exactAdmin._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ message: "Login Success", success: true, token, exactAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

//GET ALL DOC
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    let deletedDoctor = await doctorModel.findByIdAndDelete(req.params._id);
    res
      .status(200)
      .json({ success: true, message: "Deleted", data: deletedDoctor });
  } catch {
    res.json({ state: false, msg: "Server error", innerData: null });
  }
};

const updateDoctor = async (req, res) => {
  try {
    let id = req.params._id;
    let body = req.body;
    let updateDoctor = await doctorModel.findByIdAndUpdate(id, body);
    res
      .status(200)
      .json({ success: true, message: "Updated", data: updateDoctor });
  } catch {
    res.json({ state: false, msg: "Server error", innerData: null });
  }
};

module.exports = {
  loginController,
  registerController,
  getAllDocotrsController,
  deleteDoctor,
  updateDoctor,
};
