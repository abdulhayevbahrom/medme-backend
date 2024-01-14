const roomModel = require("../models/roomsModel");
const ClientModel = require("../models/clientModel");

// CREATE ROOM
const addRoomController = async (req, res) => {
  try {
    const exisitingUser = await roomModel.findOne({
      roomNumber: req.body.roomNumber,
    });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "Room Already Exist", success: false });
    }
    const newUser = new roomModel(req.body);
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

//GET ALL DOC
const getAllRoom = async (req, res) => {
  try {
    const doctors = await roomModel.find();
    res.status(200).send({
      success: true,
      message: "Room Lists Fetched Successfully",
      innerData: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Fetching Room",
    });
  }
};

// DELETE ROOM

const deleteRoom = async (req, res) => {
  try {
    let deletedRoom = await roomModel.findByIdAndDelete(req.params._id);
    res.json({ success: true, message: "Deleted", data: deletedRoom });
  } catch {
    res.json({ state: false, msg: "Server error", innerData: null });
  }
};

// UPDATE OR ADD CLIEND TO ROOM
const updateRoom = async (req, res) => {
  try {
    let updatedRoom = await roomModel.findByIdAndUpdate(
      req.params._id,
      req.body
    );
    res.json({
      success: true,
      message: "Bemor xonaga qo'shildi",
      data: updatedRoom,
    });
  } catch {
    res.json({ state: false, msg: "Server error", innerData: null });
  }
};

// delete user from room
// const deleteUserFromRoom = async (req, res) => {
//   let { clientID } = req.query;
//   let { roomID } = req.query;
//   let clientRoom = req.body;

//   let client = await ClientModel.findOne({ _id: clientRoom.id });
//   // client.room = {
//   //   dayOfTreatment: clientRoom.dayOfTreatment,
//   //   payForRoom: clientRoom.payForRoom,
//   //   outDate: 222,
//   // };
//   let s = await {
//     ...client,
//     room: {
//       dayOfTreatment: clientRoom.dayOfTreatment,
//       payForRoom: clientRoom.payForRoom,
//       outDate: 222,
//     },
//   };
//   res.send(s);

//   // // update client
//   // await ClientModel.findByIdAndUpdate(client._id, client);
//   // // update room
//   // let room = await roomModel.findById(roomID);
//   // let capacity = room.capacity;

//   // let removeFromCapacity = capacity.filter((i) => i.phone !== clientID);

//   // room.capacity = removeFromCapacity;

//   // let updatedRoom = await roomModel.findByIdAndUpdate(roomID, room);

//   // res.send({
//   //   success: true,
//   //   message: "Bemor xonadan o'chirildi",
//   //   data: updatedRoom,
//   // });
// };

// Zarur modelni import qiling (ClientModel va roomModel uchun)

// Foydalanuvchini xonadan o'chirish
const deleteUserFromRoom = async (req, res) => {
  try {
    const { clientID } = req.query;
    const { roomID } = req.query;
    const clientRoom = req.body;

    // ID bo'yicha foydalanuvchini izlash
    const client = await ClientModel.findOne({ _id: clientRoom.id });

    client.stories[0].room = {
      dayOfTreatment: clientRoom.dayOfTreatment,
      payForRoom: clientRoom.payForRoom,
      outDay: clientRoom?.outDay,
    };

    // Foydalanuvchi xonasini malumotlarini yangilash
    await ClientModel.findByIdAndUpdate(client._id, client, { new: true });

    let room = await roomModel.findById(roomID);
    let capacity = room.capacity;

    let removeFromCapacity = capacity.filter((i) => i.idNumber !== clientID);

    room.capacity = removeFromCapacity;

    let updatedRoom = await roomModel.findByIdAndUpdate(roomID, room);

    res.send({
      success: true,
      message: "Bemor xonadan o'chirildi",
      data: updatedRoom,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Foydalanuvchini xonadan o'chirishda xatolik",
      error: error.message,
    });
  }
};

module.exports = {
  getAllRoom,
  addRoomController,
  deleteRoom,
  updateRoom,
  deleteUserFromRoom,
};
