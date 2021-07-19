const express = require('express');
const router = express.Router();
const associadosController = require('../controllers/associadosController');
const clientesController = require('../controllers/clientesController');
const entregasController = require('../controllers/entregasController');
const motoboysController = require('../controllers/motoboysController');
const auth = require('../middleware/auth/authAssociado');
const associadoValidator = require('../middleware/validator/associadoValidator');
const clienteValidator = require('../middleware/validator/clienteValidator');
const entregaValidator = require('../middleware/validator/entregaValidator');
const motoboyValidator = require('../middleware/validator/motoboyValidator');

// Login, Logout e acesso a dados
router.post('/login', associadosController.login);
router.put('/edit', auth, associadoValidator, associadosController.edit);
router.get('/', auth, associadosController.get);

// Relatórios
router.get('/relatorio/administrativo', auth, entregasController.relatorioAdm);
router.get('/relatorio/financeiro', auth, entregasController.relatorioFin);

// CRUD Clientes
router.get('/cliente/list', auth, clientesController.list);
router.get('/cliente/find/:cnpj', auth, clientesController.getByCNPJ);
router.put('/cliente/edit', auth, clienteValidator, clientesController.edit);
router.post('/cliente/create', auth, clienteValidator, clientesController.add);
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
router.put('/entregas/edit', auth, entregaValidator, entregasController.edit);
router.post('/entregas/create', auth, entregaValidator, entregasController.add);
router.delete('/entregas/remove/:id', auth, entregasController.delete);

module.exports = router;