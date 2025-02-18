const mongoose = require('mongoose')

const { Schema } = mongoose

const logSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    contatoEmergencia: {
        type: Schema.Types.ObjectId,
        ref: 'ContatoEmergencia',
    },
    acao: {
        type: Schema.Types.ObjectId,
        ref: 'Acao',
    },
    tipo_log:{
        type: String,
        required: true,
    },
    dataHora:{
        type: Date,
        default: Date.now,
    },
},
)

const Log = mongoose.model('Log', logSchema)

module.exports = {
    Log,
    logSchema,
}