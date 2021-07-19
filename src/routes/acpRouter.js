const express = require('express');
const router = express.Router();
const associadosController = require('../controllers/associadosController');
const validator = require('../middleware/validator/associadoValidator');

// CRUD Associados
router.post('/login', associadosController.login);
router.get('/list', associadosController.list);
router.get('/find/:cnpj', associadosController.getByCNPJ);
router.put('/edit', validator, associadosController.edit);
router.post('/create', validator, associadosController.add);
router.delete('/remove/:id', associadosController.delete);

module.exports = router;