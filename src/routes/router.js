const express = require('express');
const associadoRouter = require('./associadoRouter');
const mototboyRouter = require('./motoboyRouter');
const acpRouter = require('./acpRouter');
const router = express.Router();

router.get('/', (req, res) => {
	res.send(`It's working`);
});

router.use('/acp', acpRouter);
router.use('/associados', associadoRouter);
router.use('/motoboys', mototboyRouter);

module.exports = router;