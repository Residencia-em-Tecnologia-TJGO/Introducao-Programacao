const router = require('express').Router();
const ContatoEmergenciaController = require('../controllers/ContatoEmergenciaController');

router.route('/novo-contato')
    .post((req, res) => ContatoEmergenciaController.create_contato_emergencia(req, res));

router.route('/buscar-contatos')
    .get((req, res) => ContatoEmergenciaController.get_contatos_emergencia_por_usuario(req, res));

router.route('/remover-contato')
    .delete((req, res) => ContatoEmergenciaController.delete_contato_emergencia(req, res));

module.exports = router