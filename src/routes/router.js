const express = require('express');
const associadoRouter = require('./associadoRouter');
const mototboyRouter = require('./motoboyRouter');
const clienteRouter = require('./clienteRouter');
const entregaRouter = require('./entregaRouter');
const router = express.Router();

router.get('/', (req, res) => {
	res.send(`It's working`);
});

router.use('/associados', associadoRouter);
router.use('/motoboys', mototboyRouter);
router.use('/clientes', clienteRouter);
router.use('/entregas', entregaRouter);

module.exports = router;