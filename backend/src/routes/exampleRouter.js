const router = require('express').Router();
const ExampleController = require('../controllers/ExampleController');

router.route('/example')
    .post((req, res) => ExampleController.callExampleManagerFunction(req, res));

module.exports = router