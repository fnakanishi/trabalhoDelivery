const express = require('express');
const router = express.Router();
const entregasController = require('../controllers/entregasController');
const motoboysController = require('../controllers/motoboysController');
const auth = require('../middleware/auth/authMotoboy');
const validator = require('../middleware/validator/motoboyValidator');

// Login
router.post('/login', motoboysController.login);

// Entregas
router.get('/list-completed', auth, entregasController.findCompleted);
router.get('/list-pending', auth, entregasController.findPending);
router.get('/relatorio', auth, entregasController.relatorioFinMotoboy);
router.put('/edit/:id', auth, entregasController.editMotoboy);

module.exports = router;