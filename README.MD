# 🏦 TJGO / UFG - INTRODUÇÃO A PROGRAMAÇÃO 🖥️
# 🌱 PROJETO I
> [Board do Projeto](https://github.com/orgs/Residencia-em-Tecnologia-TJGO/projects/1/views/1)<br>
> [Código Fonte](https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/tree/projeto-01)<br>
> <strong>Prof(a):</strong> Nádia Felix Felipe da Silva - <strong>Aluno:</strong> [Samuel Victor Oliveira Lima](https://samuelvictorol.github.io/portfolio/)


## 📖 Documentação


<strong>Visão Geral</strong><br>
> <strong>WebApp para criação de Contatos de Emergência e Execução de Ações</strong><br>
> O WebApp de Contatos de Emergência é uma plataforma desenvolvida com Quasar + Vue3 no frontend e Express.js + MongoDB no backend. Seu objetivo é permitir que os usuários cadastrem contatos de emergência e acionem alertas em situações críticas, enviando notificações via WhatsApp e, opcionalmente, compartilhando sua localização atual.

<strong>Como Rodar</strong><br>
> Após clonar o projeto, abra um terminal na raíz do diretório (onde contém o 🐳 <strong>docker-compose.yml</strong>) e digite o seguinte comando: <strong>docker-compose up --build</strong>. É necessário ter o [🐳 Docker](https://www.docker.com/) instalado na máquina.

> <strong>Portas padrões</strong><br>
> backend: localhost:3000 e frontend: localhost:9000

### <br><strong>Modelagem de Dados</strong>

> [Acessar modelagem](https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/blob/projeto-01/modelagem-de-dados-Projeto-01.png)

O sistema é composto por quatro modelos principais:

<strong>1. Usuário</strong><br>
> Armazena os dados do usuário, garantindo segurança com criptografia de senha e proteção dos dados sensíveis.

- nome: Nome do usuário.
- cpf: CPF do usuário (armazenado de forma segura).
- senha: Hash criptografado da senha.
- email: email do usuário

<strong>2. Contato de Emergência</strong><br>
> Representa os contatos de emergência cadastrados pelo usuário.

- usuarioId: Referência ao usuário dono do contato.
- nome: Nome do contato.
- telefone: Número de WhatsApp do contato.
- email: email do contato emergencial

<strong>3. Ação</strong><br>
> Define uma ação de emergência iniciada pelo usuário.

- usuarioId: Referência ao usuário que criou a ação.
- tipo_acao: Tipo de emergência (ex.: "Emergência Saúde", "Roubo", "Sequestro").

<strong>4. Log</strong><br>
> Registra todas as interações do usuário com o sistema.

- tipo_log: Breve descrição da finalidade do log
- usuarioId: Referência ao usuário.
- acaoId: Referência à ação (se aplicável).
- mensagem: Registro textual da ação executada.
- localizacao:  (Opcional) Latitude e longitude do usuário.
- dataHora: Data e hora da ocorrência.


<strong>Fluxo de Funcionamento</strong><br>

- Cadastro do Usuário: O usuário cria uma conta informando nome, CPF e senha.<br>
- Cadastro de Contatos: Ele adiciona contatos de emergência com nome e número de WhatsApp.<br>
- Criação de Ação: O usuário inicia uma ação emergencial selecionando um dos tipos predefinidos.<br>
- Regra de Negócio: Cada usuário pode ter até 3 ações simultâneas.

<strong>Envio da Notificação:</strong><br>

- O sistema envia uma mensagem automática via WhatsApp para os contatos cadastrados.<br>
- O usuário pode optar por compartilhar sua localização junto com o alerta.<br>
- Registro de Logs: Todas as ações são armazenadas para auditoria.<br>

## <strong>🧱 Tecnologias Utilizadas<strong><br>
> Frontend: Quasar Framework (Vue 3)
> Backend: Express.js
> Banco de Dados: MongoDB
> Criptografia: Bcrypt para senhas
> Mensageria: Nodemailer e WhatsApp para envio de emails e mensagens
> Geolocalização: navigator.geolocation no frontend
> Possíveis Melhorias Futuras
> Responsividade em diversos dispositivos


## ⌨️ Backend

> [Acessar diretório](https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/tree/projeto-01/backend)
- [Como rodar o backend](https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/blob/projeto-01/backend/README.md)

## 🖥️ Frontend

> [Acessar diretório](https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/tree/projeto-01/frontend)
- [Como rodar o frontend](https://github.com/Residencia-em-Tecnologia-TJGO/Introducao-Programacao/blob/projeto-01/frontend/README.md)

# 🎲 Base de Dados

- 🍃 [Mongo](https://cloud.mongodb.com/v2/67aa609b61c70d27b71fcc76#/metrics/replicaSet/67aa6181f84ff70f87a7315d/explorer)

> ⚙️ Para <strong>configurar as bases de dados</strong>, nas variáveis de ambiente (.env) do projeto, o <strong>'NOME-DO-BANCO'</strong> deve está preenchido por <strong>Projeto-1-db</strong>

> Pode ser necessário <strong>permissão</strong> para o acesso da visualização direta ao banco de dados. Solicitar acesso para samuel.softdev@outook.com

> As <strong>variáveis de ambiente</strong> e os <strong>projetos</strong> deste repositório, dão acesso para <strong>base de dados</strong> de projetos com fins exclusivamente acadêmicos, e por isso são <strong>públicos</strong>.
