const router = require('express').Router();
const AcaoController = require('../controllers/AcaoController');

router.route('/nova-acao')
    .post((req, res) => AcaoController.create_acao(req, res));
router.route('/executar-acao')
    .post((req, res) => AcaoController.execute_acao(req, res));
router.route('/remover-acao')
    .delete((req, res) => AcaoController.delete_acao(req, res));
router.route('/acoes-executadas')
    .get((req, res) => AcaoController.recuperar_acoes_executadas(req, res));
router.route('/acoes-usuario')
    .get((req, res) => AcaoController.get_acoes_por_usuario(req, res));
module.exports = router