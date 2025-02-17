const router = require('express').Router();
const ContatoEmergenciaController = require('../controllers/ContatoEmergenciaController');

router.route('/novo-contato')
    .post((req, res) => ContatoEmergenciaController.create_contato_emergencia(req, res));

module.exports = router