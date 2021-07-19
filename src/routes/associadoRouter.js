const express = require('express');
const router = express.Router();
const associadosController = require('../controllers/associadosController');
const clientesController = require('../controllers/clientesController');
const entregasController = require('../controllers/entregasController');
const motoboysController = require('../controllers/motoboysController');
const auth = require('../middleware/auth/authAssociado');
const validator = require('../middleware/validator/associadoClienteValidator');
const motoboyValidator = require('../middleware/validator/motoboyValidator');

// Login, Logout e acesso a dados
router.post('/login', validator, associadosController.login);
//router.get('/logout', auth, associadosController.logout);
router.put('/edit', auth, validator, associadosController.edit);
router.get('/', auth, associadosController.get);

// Relatórios
router.get('/relatorio/admnistrativo', auth, entregasController.relatorioAdm);
router.get('/relatorio/financeiro', auth, entregasController.relatorioFin);

// CRUD Clientes
router.get('/cliente/list', auth, clientesController.list);
router.get('/cliente/find/:cnpj', auth, clientesController.getByCNPJ);
router.put('/cliente/edit', auth, validator, clientesController.edit);
router.post('/cliente/create', auth, validator, clientesController.add);
router.delete('/cliente/remove', auth, clientesController.delete);

// CRUD Motoboy
router.get('/motoboys/list', auth, motoboysController.list);
router.get('/motoboys/find/:cpf', auth, motoboysController.find);
router.put('/motoboys/edit', auth, motoboyValidator, motoboysController.edit);
router.post('/motoboys/create', auth, motoboyValidator, motoboysController.add);
router.delete('/motoboys/remove/:id', auth, motoboysController.delete);

// CRUD Entregas
router.get('/entregas/list-entregas', auth, entregasController.list);
router.get('/entregas/find-completed', auth, entregasController.findCompleted);
router.get('/entregas/find-pending', auth, entregasController.findPending);
router.get('/entregas/find/:motoboyId', auth, entregasController.findByMotoboy);
router.put('/entregas/edit', auth, entregasController.edit);
router.post('/entregas/create', auth, entregasController.add);
router.delete('/entregas/remove/:id', auth, entregasController.delete);

module.exports = router;