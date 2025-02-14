const router = require('express').Router();

// const exampleRouter = require('./exampleRouter');
const usuarioRouter = require('./usuarioRouter');
// router.use('/', exampleRouter);
router.use('/', usuarioRouter);

module.exports = router;