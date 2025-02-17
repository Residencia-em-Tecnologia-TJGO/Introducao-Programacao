const mongoose = require('mongoose')

const { Schema } = mongoose

const contatoEmergenciaSchema = new Schema({
    nome: {
        type: String,
        maxlength: 100,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    nome: {
        type: String,
        maxlength: 100,
        required: true,
    },
    email: {
        type: String,
        maxlength: 100,
    },
    telefone: {
        type: String,
        maxlength: 15,
        required: true,
    },
},
)
contatoEmergenciaSchema.index({ cpf: 1 }, { unique: true });
contatoEmergenciaSchema.index({ email: 1 }, { unique: true });
contatoEmergenciaSchema.index({ telefone: 1 }, { unique: true });

const ContatoEmergencia = mongoose.model('ContatoEmergencia', contatoEmergenciaSchema)

module.exports = {
    ContatoEmergencia,
    contatoEmergenciaSchema,
}