const express = require('express');
const motoboyRouter = express.Router();
const motoboysController = require('../controllers/motoboysController');
const auth = require('../middleware/auth');

motoboyRouter.get('/list', auth, motoboysController.listAllAssociados);
motoboyRouter.get('/CNPJ/:cnpj', motoboysController.searchByCNPJ);
motoboyRouter.get('/find/:id', auth, motoboysController.searchById);
motoboyRouter.post('/create', auth, motoboysController.newAssociado);
motoboyRouter.delete('/remove/:id', auth, motoboysController.deleteAssociado);

module.exports = motoboyRouter;