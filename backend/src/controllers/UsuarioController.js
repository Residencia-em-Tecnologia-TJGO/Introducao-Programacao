const UsuarioManager = require("../managers/UsuarioManager");

const UsuarioController = {
    create_usuario: async (req, res) => {
        try {
            const user = await UsuarioManager.createUsuario(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

}

module.exports = UsuarioController;