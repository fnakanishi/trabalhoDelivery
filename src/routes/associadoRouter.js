const express = require('express');
const associadoRouter = express.Router();
const associadosController = require('../controllers/associadosController');
const auth = require('../middleware/auth');

associadoRouter.get('/list', auth, associadosController.list);
associadoRouter.get('/find/:cnpj', associadosController.getByCNPJ);
associadoRouter.put('/edit', auth, associadosController.edit);
associadoRouter.post('/create', auth, associadosController.add);
associadoRouter.delete('/remove/:id', auth, associadosController.delete);

module.exports = associadoRouter;