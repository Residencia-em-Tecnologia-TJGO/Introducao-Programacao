const ContatoEmergenciaManager = require("../managers/ContatoEmergenciaManager");

const ContatoEmergenciaController = {
    create_contato_emergencia: async (req, res) => {
        try {
            const response = await ContatoEmergenciaManager.createContatoEmergencia(req.body);
            res.status(201).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    get_contatos_emergencia_por_usuario: async (req, res) => {
        try {
            const paramsData = {
                id: req.query.usuario_id,
                token: req.query.token
            }
            const response = await ContatoEmergenciaManager.getContatosEmergenciaPorUsuario(paramsData);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    delete_contato_emergencia: async (req, res) => {
        try {
            const paramsData = {
                id: req.query.usuario_id,
                token: req.query.token,
                contato_id: req.query.contato_id
            }
            const response = await ContatoEmergenciaManager.deleteContatoEmergencia(paramsData);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

}

module.exports = ContatoEmergenciaController;