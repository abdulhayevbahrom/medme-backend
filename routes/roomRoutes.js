const express = require("express");
const {
  getAllRoom,
  addRoomController,
  deleteRoom,
  updateRoom,
  deleteUserFromRoom
} = require("../controllers/roomCtrl");
const roomValidation = require('../Validation/room.validation')

//router onject
const router = express.Router();

//REGISTER || POST
router.post("/addRoom", [roomValidation.add], addRoomController);

//GET ALL DOC
router.get("/getAllRoom", getAllRoom);

// DELETE ROOM
router.delete('/delete/:_id', deleteRoom)

// UPDATE OR ADD CLIEND TO ROOM
router.put('/update/:_id', updateRoom)

// DELETE USER FROM ROOM
router.patch('/deletefromroom/', deleteUserFromRoom)

module.exports = router;
