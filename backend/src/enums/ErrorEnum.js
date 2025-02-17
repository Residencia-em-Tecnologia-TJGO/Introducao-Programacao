
const ErrorEnum = {
    NAME_LENGTH: 'Nome deve ter no mínimo 3 caracteres',
    PASSWORD_LENGTH: 'Senha deve ter no mínimo 6 caracteres',
    PHONE_LENGTH: 'Telefone deve ter 11 caracteres',
    CPF_INVALID: 'CPF inválido',
    EMAIL_INVALID: 'Email inválido',
    MISSING_FIELDS: 'Campos obrigatórios não preenchidos',
    EXISTING_USER: 'Usuário já cadastrado',
    USER_NOT_FOUND: 'Usuário não encontrado',
    INVALID_TOKEN: 'Token inválido',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    ACAO_NOT_FOUND: 'Ação não encontrada',
}

module.exports = ErrorEnum;