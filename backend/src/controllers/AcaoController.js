const AcaoManager = require("../managers/AcaoManager");

const AcaoController = {
    create_acao: async (req, res) => {
        try {
            const response = await AcaoManager.create_acao(req.body);
            res.status(201).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

}

module.exports = AcaoController;