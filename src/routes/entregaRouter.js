const express = require('express');
const entregaRouter = express.Router();
const entregasController = require('../controllers/entregasController');
const auth = require('../middleware/auth');

entregaRouter.get('/list', auth, entregasController.list);
entregaRouter.get('/find-completed', entregasController.findCompleted);
entregaRouter.get('/find-pending', auth, entregasController.findPending);
entregaRouter.get('/find/:motoboyId', auth, entregasController.findByMotoboy);
entregaRouter.put('/edit', auth, entregasController.edit);
entregaRouter.post('/create', auth, entregasController.add);
entregaRouter.delete('/remove/:id', auth, entregasController.delete);

module.exports = entregaRouter;