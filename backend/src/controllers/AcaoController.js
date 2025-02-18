const AcaoManager = require("../managers/AcaoManager");

const AcaoController = {
    create_acao: async (req, res) => {
        try {
            const response = await AcaoManager.createAcao(req.body);
            res.status(201).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    execute_acao: async (req, res) => {
        try {
            const response = await AcaoManager.executarAcao(req.body);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    delete_acao: async (req, res) => {
        try {
            const response = await AcaoManager.deleteAcao(req.body);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    recuperar_acoes: async (req, res) => {
        try {
            const reqData = {
                usuario: req.query.usuario_id,
                token: req.query.token
            }
            const response = await AcaoManager.recuperarAcoes(reqData);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

module.exports = AcaoController;