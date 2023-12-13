const ClientModel = require('../models/clientModel');

// GET ALL CLIENT
const getAllClient = async (req, res) => {
    try {
        const allData = await ClientModel.find()
        if (!allData.length) {
            return res.json({
                success: false, message: "Clients are not fount",
                data: allData
            })
        }
        res.status(200).json({
            success: true,
            message: "all clients",
            data: allData
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Fetching Doctor",
        });
    }
}

// GET ONE (1) CLIENT
const getOneClient = async (req, res) => {
    try {
        let client = await ClientModel.findById(req.params._id);
        if (!client) {
            return res.status(404).json({ success: false, message: "Product with unique id found", data: null })
        }
        res.json({ success: true, message: "Product with unique id found", data: client })
    }
    catch {
        res
            .status(500)
            .json({ state: false, msg: "Server error", innerData: null });
    }
}

// CRATE CLIENT || NEW CLIENT
const newClient = async (req, res) => {
    try {
        const createProduct = new ClientModel(req.body)
        if (!createProduct) {
            return res.status(400).json({ success: false, message: "Can not create", data: createProduct });
        }
        const saveProduct = await createProduct.save();
        res.status(200).json({
            success: true,
            message: "client saved",
            data: saveProduct
        });
    }
    catch {
        res.json({ success: false, message: "Server error", data: null })
    }
}

// DELETE CLIENT
const deleteClient = async (req, res) => {
    try {
        let deletedClient = await ClientModel.findByIdAndDelete(req.params._id);
        res.json({ success: true, message: "Deleted", data: deletedClient });
    } catch {
        res.json({ state: false, msg: "Server error", innerData: null })
    }
}

// UPDATE CLIENT
const updateClient = async (req, res) => {
    try {
        let updatedClient = await ClientModel.findByIdAndUpdate(req.params._id, req.body);
        res.json({ success: true, message: "updated", data: updatedClient });
    } catch {
        res.json("something went wrong");
    }
}

// SEARCH CLIENT
const searchClient = async (req, res) => {
    try {
        const { clientName } = req.body
        const allClients = await ClientModel.find()
        // .limit(10)
        const find = await allClients.filter(i => i.firstname.toLowerCase().includes(clientName.toLowerCase()))
        if (!find.length) {
            return res.json({ success: false, message: "user not found", data: null })
        }
        res.status(200).json({ success: true, message: "Topilgan ma'lumotlar", data: find })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "server error", data: null })
    }
}

const cleareClient = async (req, res) => {
    let cleared = await ClientModel.deleteMany()
    res.status(200).json({ success: true, message: "users deleted", data: cleared })
}

module.exports = {
    getAllClient,
    getOneClient,
    newClient,
    deleteClient,
    updateClient,
    searchClient,
    cleareClient
}