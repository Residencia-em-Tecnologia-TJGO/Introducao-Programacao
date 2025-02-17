const router = require('express').Router();
const AcaoController = require('../controllers/AcaoController');

router.route('/nova-acao')
    .post((req, res) => AcaoController.create_acao(req, res));
router.route('/executar-acao')
    .post((req, res) => AcaoController.execute_acao(req, res));


module.exports = router