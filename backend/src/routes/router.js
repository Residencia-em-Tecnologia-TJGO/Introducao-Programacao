const router = require('express').Router();
const usuarioRouter = require('./usuarioRouter');
const contatoEmergenciaRouter = require('./contatoEmergenciaRouter');
const acaoRouter = require('./acaoRouter');

router.use('/', usuarioRouter);
router.use('/', contatoEmergenciaRouter);
router.use('/', acaoRouter);

module.exports = router;