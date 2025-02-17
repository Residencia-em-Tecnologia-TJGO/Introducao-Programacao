const router = require('express').Router();
const UsuarioController = require('../controllers/UsuarioController');

router.route('/novo-usuario')
    .post((req, res) => UsuarioController.create_usuario(req, res));
router.route('/login-usuario')
    .post((req, res) => UsuarioController.login_usuario(req, res));
module.exports = router