const { Router } = require("express");
const router = Router();
const {
  getAllClient,
  getOneClient,
  newClient,
  deleteClient,
  searchClient,
  updateClient,
  cleareClient,
  getByIdnumber,
} = require("../controllers/client");

const clientValidation = require("../Validation/client.validation");

// GET ALL CLIENT
router.get("/all", getAllClient);

// GET ONE (1) CLIENT
router.get("/:_id", getOneClient);

// GET ONE (1) CLIENT By ID_NUMBER
router.get("/getIdNumber/:id", getByIdnumber);

// CRATE CLIENT || NEW CLIENT
router.post("/", [clientValidation.add], newClient);

// DELETE CLIENT
router.delete("/remove/:_id", deleteClient);

// UPDATE CLIENT
router.put("/:_id", updateClient);

// SEARCH CLIENT
router.post("/search", searchClient);

// CLEAR DATA
router.delete("/clear", cleareClient);

module.exports = router;
