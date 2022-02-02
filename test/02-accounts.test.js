/* eslint-disable max-len */
const chai = require('chai');
const supertest = require('supertest');
const httpStatus = require('http-status');
const casual = require('casual');
const jwt = require('jsonwebtoken');
const database = require('../src/database');
const { clearDatabase } = require('./utils/index');
const Account = require('../src/model/Account');

const { expect, assert } = chai;

describe('2- Testes de accounts', () => {
  let server;

  before(async () => {
    server = require('../src/server');
    await clearDatabase(database);
    require('dotenv').config();
  });

  after((done) => {
    server.shutdown(done);
  });
  it('Testa que é passado o campo "amount".', async () => {});
  it('Testa que não é possível criar conta caso o usuário não exista.', async () => {
    const account = {
      amount: 2000,
    };

    const response = await supertest(server.app).post('/accounts/register/1').send(account);

    expect(response.status).to.be.equal(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotNull(response.body);
    assert.isObject(response.body);
    assert.strictEqual(response.body.name, 'ValidationError');
    expect(response.body.statusMessage).to.be.equal('User not found.');
  });
  it('Testa que não é possível criar conta caso o usuário ja tenha uma conta cadastrada.', async () => {
    const account = {
      amount: 2000,
    };
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    const userCreate = await supertest(server.app).post('/users/register').send(user);
    await supertest(server.app).post(`/accounts/register/${userCreate.body.id}`).send(account);

    const response = await supertest(server.app).post(`/accounts/register/${userCreate.body.id}`).send(account).expect(422);
    assert.isNotNull(response.body);
    assert.isObject(response.body);
    assert.strictEqual(response.body.name, 'ValidationError');
    expect(response.body.statusMessage).to.be.equal('Ja existe uma conta para este usuário.');
  });
  it('Testa que é criado uma conta com sucesso', async () => {
    const account = {
      amount: 2000,
    };
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    const userCreate = await supertest(server.app).post('/users/register').send(user);
    const response = await supertest(server.app).post(`/accounts/register/${userCreate.body.id}`).send(account).expect(201);
    assert.isNotNull(response.body);
    assert.isObject(response.body);
    assert.strictEqual(response.body.message, `Conta iniciada com R$ ${account.amount}`);
  });
  it('Testa que é passado um token pelo header da requisição.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };
    const transfer = {
      amount: 100,
      cpf: '01234567890',
    };

    await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);
    const login = await supertest(server.app)
      .post('/login')
      .send({ email: user.email, password: user.password })
      .expect(httpStatus.OK);
    const result = await supertest(server.app).post('/accounts/payment').set('authorization', login.body.token).send(transfer);
    expect(result.request.header).to.have.a.property('authorization');
    const decodeToken = jwt.decode(result.request.header.authorization);
    assert.isNotNull(decodeToken);
  });
  it('Testa que é passado os campos "cpf" e "amount" para fazer uma transferência.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };
    const transfer = {
      amount: 100,
    };

    await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);
    const login = await supertest(server.app)
      .post('/login')
      .send({ email: user.email, password: user.password })
      .expect(httpStatus.OK);
    const { status, body } = await supertest(server.app).post('/accounts/payment').set('authorization', login.body.token).send(transfer);
    expect(status).to.be.equal(422);
    expect(body.statusMessage).to.be.equal('"cpf" is required');
  });
  it('Testa que existe um usuário  um credor.', async () => {
    const account = {
      amount: 2000,
    };
    const userPayer = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };
    const payment = {
      amount: 100,
      cpf: '01234567890',
    };
    const createUserPayer = await supertest(server.app).post('/users/register').send(userPayer).expect(httpStatus.CREATED);
    await supertest(server.app).post(`/accounts/register/${createUserPayer.body.id}`).send(account).expect(201);
    const login = await supertest(server.app)
      .post('/login')
      .send({ email: userPayer.email, password: userPayer.password })
      .expect(httpStatus.OK);
    const { status, body } = await supertest(server.app).post('/accounts/payment').set('authorization', login.body.token).send(payment);
    expect(status).to.be.equal(422);
    expect(body.statusMessage).to.be.equal('not_found');
  });
  it('Testa que ambos os usuários tenham contas abertas.', async () => {
    const account = {
      amount: 2000,
    };
    const userPayer = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };
    const userReceiver = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(1, 12),
      password: casual.password,
    };
    const payment = {
      amount: 100,
      cpf: userReceiver.cpf,
    };
    const createUserPayer = await supertest(server.app).post('/users/register').send(userPayer).expect(httpStatus.CREATED);
    const createUserReceiver = await supertest(server.app).post('/users/register').send(userReceiver).expect(httpStatus.CREATED);
    await supertest(server.app).post(`/accounts/register/${createUserPayer.body.id}`).send(account).expect(201);
    const login = await supertest(server.app)
      .post('/login')
      .send({ email: userPayer.email, password: userPayer.password })
      .expect(httpStatus.OK);
    const { status, body } = await supertest(server.app).post('/accounts/payment').set('authorization', login.body.token).send(payment);
    expect(status).to.be.equal(422);
    expect(body.statusMessage).to.be.equal('not_found');
  });
  it('Testa que não é possível transferir valores entre contas iguais.', async () => {
    const account = {
      amount: 2000,
    };
    const userPayer = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };
    const payment = {
      amount: 100,
      cpf: userPayer.cpf,
    };
    const createUserPayer = await supertest(server.app).post('/users/register').send(userPayer).expect(httpStatus.CREATED);
    await supertest(server.app).post(`/accounts/register/${createUserPayer.body.id}`).send(account).expect(201);
    const login = await supertest(server.app)
      .post('/login')
      .send({ email: userPayer.email, password: userPayer.password })
      .expect(httpStatus.OK);
    const { status, body } = await supertest(server.app).post('/accounts/payment').set('authorization', login.body.token).send(payment);
    expect(status).to.be.equal(422);
    expect(body.statusMessage).to.be.equal('Não é possível transferir um valor para a própria conta!');
  });

  it('Testa que foi realizado uma transferência', async () => {
    const account = {
      amount: 2000,
    };
    const userPayer = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };
    const userReceiver = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(1, 12),
      password: casual.password,
    };
    const payment = {
      amount: 100,
      cpf: userReceiver.cpf,
    };
    const payment2 = {
      amount: 150,
      cpf: userReceiver.cpf,
    };
    const createUserPayer = await supertest(server.app).post('/users/register').send(userPayer).expect(httpStatus.CREATED);
    const createUserReceiver = await supertest(server.app).post('/users/register').send(userReceiver).expect(httpStatus.CREATED);
    await supertest(server.app).post(`/accounts/register/${createUserPayer.body.id}`).send(account).expect(201);
    await supertest(server.app).post(`/accounts/register/${createUserReceiver.body.id}`).send(account).expect(201);
    const login = await supertest(server.app)
      .post('/login')
      .send({ email: userPayer.email, password: userPayer.password })
      .expect(httpStatus.OK);
    const e = await supertest(server.app).post('/accounts/payment').set('authorization', login.body.token).send(payment);
    const r = await supertest(server.app).post('/accounts/payment').set('authorization', login.body.token).send(payment2);
    const result = await supertest(server.app).get('/accounts/listTransactions');
    expect(result.body[0].amount).to.be.equal((payment.amount.toFixed(2)));
    expect(result.body[1].amount).to.be.equal((payment2.amount.toFixed(2)));
  });
  it('Testa que é passado os campos "depositValue" e "accountNumber".', async () => {
    const deposit = {
      depositValue: 100,
    };
    const withoutAccountNumber = await supertest(server.app).put('/accounts/deposit').send(deposit);
    expect(withoutAccountNumber.status).to.be.equal(422);
    expect(withoutAccountNumber.body.statusMessage).to.be.equal('"accountNumber" is required');

    const depositWithoutDeposit = {
      accountNumber: 1245689,
    };
    const withoutDeposit = await supertest(server.app).put('/accounts/deposit').send(depositWithoutDeposit);
    expect(withoutDeposit.status).to.be.equal(422);
    expect(withoutDeposit.body.statusMessage).to.be.equal('"depositValue" is required');
  });
  it('Testa que existe a conta para deposito.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };
    const account = {
      depositValue: 100,
      accountNumber: 1245689,
    };

    const createUser = await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);
    const createAccount = await supertest(server.app).post(`/accounts/register/${createUser.body.id}`).send({ amount: 2000 }).expect(201);
    const existAccount = await Account.findOne({ where: { account_id: createAccount.body.id } });
    const notExistAccount = await Account.findOne({ where: { account_id: account.accountNumber } });
    assert.isNull(notExistAccount);
    assert.isNotNull(existAccount);
  });
  it('Testa que é realizado o deposito com sucesso.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    const createUser = await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);
    const createAccount = await supertest(server.app).post(`/accounts/register/${createUser.body.id}`).send({ amount: 2000 }).expect(201);
    const deposit = {
      depositValue: 100,
      accountNumber: createAccount.body.id,
    };
    const result = await supertest(server.app).put('/accounts/deposit').send(deposit);

    expect(result.body.message).to.be.equal('O deposito no valor de R$100 foi efetuado com sucesso');
  });
});
