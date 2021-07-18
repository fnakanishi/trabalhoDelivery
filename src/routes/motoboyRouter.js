const express = require('express');
const motoboyRouter = express.Router();
const motoboysController = require('../controllers/motoboysController');
const auth = require('../middleware/auth');

motoboyRouter.get('/list', auth, motoboysController.list);
motoboyRouter.get('/find/:cpf', motoboysController.getByCPF);
motoboyRouter.put('/edit', auth, motoboysController.edit);
motoboyRouter.post('/create', auth, motoboysController.add);
motoboyRouter.delete('/remove/:id', auth, motoboysController.delete);

module.exports = motoboyRouter;