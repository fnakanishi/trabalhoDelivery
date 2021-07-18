const express = require('express');
const clienteRouter = express.Router();
const clientesController = require('../controllers/clientesController');
const auth = require('../middleware/auth');

clienteRouter.get('/list', auth, clientesController.list);
clienteRouter.get('/find/:cnpj', clientesController.getByCNPJ);
clienteRouter.put('/edit', auth, clientesController.edit);
clienteRouter.post('/create', auth, clientesController.add);
clienteRouter.delete('/remove/:id', auth, clientesController.delete);

module.exports = clienteRouter;