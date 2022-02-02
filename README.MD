- Esse projeto consiste em uma API REST para cadastro e gerenciamento de contas.

- Para rodar o projeto é necessário ter instalado.

  - NodeJS >= 14.x
  - Docker e Docker Compose.

#### Principais Tecnologias utilizada no projeto:

- express
  https://expressjs.com/

- sequelize
  https://sequelize.org/

- mysql2
  https://github.com/sidorares/node-mysql2

- joi
  https://github.com/sideway/joi

- Testes:

  - chai
    https://www.chaijs.com/

  - mocha:
    https://mochajs.org/

  - supertest
    https://github.com/visionmedia/supertest

#### Arquitetura de diretórios do projeto

```
├── src
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── accountController.js
│   │   └── userController.js
│   ├── database
│   │ ├── index.js
│   │ ├── migrations
│   │ │   ├── 20220128220739-create-users.js
│   │ │   ├── 20220128220914-create-accounts.js
│   │ │   └── 20220128231149-tabel-transactions.js
│   │ └── seeders
│   │     ├── 20220130010718-usersPopulation.js
│   │     └── 20220130011501-accountPopulation.js
│   ├── errors
│   │   ├── ResourceNotFound.js
│   │   └── ValidationError.js
│   ├── middlewares
│   │   ├── Auth.js
│   │   ├── errorMiddleware.js
│   │   └── validator.js
│   ├── model
│   │   ├── Account.js
│   │   ├── Transactions.js
│   │   └── User.js
│   ├── routes.js
│   ├── server.js
│   ├── services
│   │   ├── accountServices.js
│   │   ├── AuthServices.js
│   │   ├── depositServices.js
│   │   ├── transactionsServices.js
│   │   ├── usersServices.js
│   │   └── validators
│   │       ├── accountsValidator.js
│   │       ├── depositValidator.js
│   │       └── userValidator.js
│   └── utils
│   ├── errorsMessages.json
│   └── utils.js
└── test
    ├── 01-users.test.js
    ├── 02-accounts.test.js
    ├── mock
    │   └── usersPopulate.json
    └── utils
    └── index.js
```

#### Passos para rodar a aplicação.

- é preciso seguir os seguintes passos para rodar a aplicação:

1. Crie um arquivo na raiz do projeto chamado `.env` e depois copie as variáveis de ambiente do arquivo `.env.example` para dentro dele.

2. docker-compose up -d
   Para rodar os bancos de dados de teste e de desenvolvimento.

3. `npm install`
   Para instalar todas as dependências do projeto.

4. npm run dev:
   Para iniciar a aplicação.

- Collections para comunicar com a API.

  - Insomnia é um cliente HTTP que facilita a interação com API REST.
  - Caso não tenha ele instalado, você pode baixa-lo no seguinte link.
    https://insomnia.rest/download
  - Você pode importar o schema que está na pasta insomnina, que já tem varias collections de exemplo configuradas.

- Para rodar os testes basta rodar o seguinte comando:
  - `npm run test`
