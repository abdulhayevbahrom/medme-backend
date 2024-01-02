const ClientModel = require("../models/clientModel");
const schedule = require("node-schedule");

// GET ALL CLIENT
const getAllClient = async (req, res) => {
  try {
    const allData = await ClientModel.find();

    if (!allData.length) {
      return res.json({
        success: false,
        message: "Clients are not fount",
        data: allData,
      });
    }

    res.status(200).json({
      success: true,
      message: "all clients",
      data: allData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Doctor",
    });
  }
};

// GET ONE (1) CLIENT
const getOneClient = async (req, res) => {
  try {
    let client = await ClientModel.findById(req.params._id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Product with unique id found",
        data: null,
      });
    }
    res.json({
      success: true,
      message: "Product with unique id found",
      data: client,
    });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "Server error", innerData: null });
  }
};

// CRATE CLIENT || NEW CLIENT
let time = new Date();
let todaysTime =
  time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

const newClient = async (req, res) => {
  try {
    let client = req.body;
    const unActiveClients = await ClientModel.find({
      choseDoctor: client.choseDoctor,
      day: todaysTime,
    });

    const createProduct = new ClientModel({
      ...req.body,
      queueNumber: unActiveClients.length + 1,
    });

    if (!createProduct) {
      return res.status(400).json({
        success: false,
        message: "Can not create",
        data: createProduct,
      });
    }

    const saveProduct = await createProduct.save();
    res.status(200).json({
      success: true,
      message: "client saved",
      data: saveProduct,
    });
  } catch {
    res.json({ success: false, message: "Server error", data: null });
  }
};

// DELETE CLIENT
const deleteClient = async (req, res) => {
  try {
    let deletedClient = await ClientModel.findByIdAndDelete(req.params._id);
    res.json({ success: true, message: "Deleted", data: deletedClient });
  } catch {
    res.json({ state: false, msg: "Server error", innerData: null });
  }
};

// UPDATE CLIENT
const updateClient = async (req, res) => {
  try {
    let updatedClient = await ClientModel.findByIdAndUpdate(
      req.params._id,
      req.body
    );
    res.json({ success: true, message: "updated", data: updatedClient });
  } catch {
    res.json("something went wrong");
  }
};

// SEARCH CLIENT
const searchClient = async (req, res) => {
  try {
    const { clientName } = req.body;
    const allClients = await ClientModel.find();
    // .limit(10)
    const find = await allClients.filter((i) =>
      i.firstname.toLowerCase().includes(clientName.toLowerCase())
    );
    if (!find.length) {
      return res.json({
        success: false,
        message: "user not found",
        data: null,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Topilgan ma'lumotlar", data: find });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error", data: null });
  }
};

// clear client
const cleareClient = async (req, res) => {
  let cleared = await ClientModel.deleteMany();
  res
    .status(200)
    .json({ success: true, message: "users deleted", data: cleared });
};

// auto delete some clients
schedule.scheduleJob("0 0 0 * * *", async () => {
  try {
    const result = await ClientModel.deleteMany({
      payState: false,
      paySumm: 0,
    });
  } catch (error) {
    console.error("Xatolik:", error);
  }
});

// const autoDelete = async (props) => {

// const allData = await ClientModel.find();
// const inactivityPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
// const currentTime = new Date().getTime();

// allData?.forEach((user) => {
//   if (currentTime - user.queueNumber > inactivityPeriod) {
//     user.payState = false;
//     user.paySumm = 0;
//   }
// });
// };
// setInterval(autoDelete, 60 * 60 * 1000); // Run every hour

module.exports = {
  getAllClient,
  getOneClient,
  newClient,
  deleteClient,
  updateClient,
  searchClient,
  cleareClient,
};
