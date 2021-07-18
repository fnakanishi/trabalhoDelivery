const express = require('express');
const associadoRouter = express.Router();
const associadosController = require('../controllers/associadosController');
const auth = require('../middleware/auth');

associadoRouter.get('/list', auth, associadosController.listAllAssociados);
associadoRouter.get('/CNPJ/:cnpj', associadosController.searchByCNPJ);
associadoRouter.get('/find/:id', auth, associadosController.searchById);
associadoRouter.post('/create', auth, associadosController.newAssociado);
associadoRouter.delete('/remove/:id', auth, associadosController.deleteAssociado);

module.exports = associadoRouter;