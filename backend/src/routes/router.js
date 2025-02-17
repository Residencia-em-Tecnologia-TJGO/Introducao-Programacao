const router = require('express').Router();
const usuarioRouter = require('./usuarioRouter');

router.use('/', usuarioRouter);

module.exports = router;