const router = require('express').Router();

const exampleRouter = require('./exampleRouter');

router.use('/', exampleRouter);

module.exports = router;