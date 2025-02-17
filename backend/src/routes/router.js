const router = require('express').Router();
const usuarioRouter = require('./usuarioRouter');
const contatoEmergenciaRouter = require('./contatoEmergenciaRouter');

router.use('/', usuarioRouter);
router.use('/', contatoEmergenciaRouter);

module.exports = router;