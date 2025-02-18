const UsuarioManager = require("../managers/UsuarioManager");

const UsuarioController = {
    create_usuario: async (req, res) => {
        try {
            const user = await UsuarioManager.createUsuario(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    login_usuario: async (req, res) => {
        try {
            const user = await UsuarioManager.loginUsuario(req.body);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    get_acoes_executadas: async (req, res) => {
        try {
            const reqBody = {
                    id: req.query.id,
                    token: req.query.token
            }
            const acoes = await UsuarioManager.getAcoesExecutadas(reqBody);
            res.status(200).send(acoes);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

module.exports = UsuarioController;