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
            const reqData = {
                usuario: {
                    id: req.query.usuario_id,
                    token: req.query.token
                },
                acao_id: req.query.acao_id
            }
            const response = await AcaoManager.deleteAcao(reqData);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    recuperar_acoes_executadas: async (req, res) => {
        try {
            const reqData = {
                usuario: req.query.usuario_id,
                token: req.query.token
            }
            const response = await AcaoManager.recuperarAcoesExecutadas(reqData);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    get_acoes_por_usuario: async (req, res) => {
        try {
            const reqData = {
                usuario: req.query.usuario_id,
                token: req.query.token
            }
            const response = await AcaoManager.getAcoesPorUsuario(reqData);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

module.exports = AcaoController;