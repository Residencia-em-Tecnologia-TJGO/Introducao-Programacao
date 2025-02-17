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

}

module.exports = ContatoEmergenciaController;