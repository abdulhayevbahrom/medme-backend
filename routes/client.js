const { Router } = require('express')
const router = Router()
const { getAllClient,
    getOneClient,
    newClient,
    deleteClient,
    searchClient,
    updateClient,
    cleareClient } = require('../controllers/client')
const clientValidation = require('../Validation/client.Validation')

// GET ALL CLIENT
router.get('/all', getAllClient)

// GET ONE (1) CLIENT
router.get('/:_id', getOneClient)

// CRATE CLIENT || NEW CLIENT
router.post('/', [clientValidation.add], newClient)

// DELETE CLIENT
router.delete('/remove/:_id', deleteClient)

// UPDATE CLIENT
router.put('/:_id', [clientValidation.add], updateClient)

// SEARCH CLIENT
router.post('/search', searchClient)

// CLEAR DATA
router.delete('/clear', cleareClient)

module.exports = router