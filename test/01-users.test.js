const chai = require('chai');
const supertest = require('supertest');
const httpStatus = require('http-status');
const casual = require('casual');
const database = require('../src/database');
const { clearDatabase } = require('./utils/index');

const { expect, assert } = chai;

describe('1- Testes de users.', () => {
  let server;

  before(async () => {
    server = require('../src/server');
    await clearDatabase(database);
    // await Account.destroy({ where: {}, cascade: true, force: true });
    // await User.destroy({ where: {}, cascade: true, force: true });
  });

  after((done) => {
    server.shutdown(done);
  });

  it('Testa que não é possível fazer um cadastro sem os campos necessários.', async () => {
    const withoutName = await supertest(server.app)
      .post('/users/register')
      .send({
        email: casual.email,
        cpf: '19776546210',
        password: casual.password,
      })
      .expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotNull(withoutName.body);
    assert.isObject(withoutName.body);
    assert.strictEqual(withoutName.body.name, 'ValidationError');
    expect(withoutName.body.statusMessage).to.be.equal('"name" is required');

    const withoutEmail = await supertest(server.app)
      .post('/users/register')
      .send({
        name: casual.name,
        cpf: '19776546210',
        password: casual.password,
      })
      .expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotNull(withoutEmail.body);
    assert.isObject(withoutEmail.body);
    assert.strictEqual(withoutEmail.body.name, 'ValidationError');
    expect(withoutEmail.body.statusMessage).to.be.equal('"email" is required');

    const withoutCpf = await supertest(server.app)
      .post('/users/register')
      .send({
        name: casual.name,
        email: casual.email,
        password: casual.password,
      })
      .expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotNull(withoutCpf.body);
    assert.isObject(withoutCpf.body);
    assert.strictEqual(withoutCpf.body.name, 'ValidationError');
    expect(withoutCpf.body.statusMessage).to.be.equal('"cpf" is required');

    const withoutPassword = await supertest(server.app)
      .post('/users/register')
      .send({
        name: casual.name,
        email: casual.email,
        cpf: '19776546210',
      })
      .expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotNull(withoutPassword.body);
    assert.isObject(withoutPassword.body);
    assert.strictEqual(withoutPassword.body.name, 'ValidationError');
    expect(withoutPassword.body.statusMessage).to.be.equal(
      '"password" is required',
    );
  });

  it('Testa que não é possível criar um usuário onde o CPF ou e-mail ja cadastrados.', async () => {
    const userData = {
      name: casual.name,
      email: casual.email,
      cpf: '19776546210',
      password: casual.password,
    };

    await supertest(server.app).post('/users/register').send(userData);
    const response = await supertest(server.app).post('/users/register').send(userData);

    assert.isNotEmpty(response.body);
    assert.strictEqual(response.body.name, 'ValidationError');
    assert.strictEqual(response.body.statusMessage, 'Ja existe usuário com este email ou cpf');
  });

  it('Testa que é criado um usuário com sucesso.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    const response = await supertest(server.app).post('/users/register').send(user);

    expect(response.status).to.be.equal(httpStatus.CREATED);

    assert.isNotEmpty(response.body);
    assert.deepOwnInclude(response.body, {
      email: user.email.toLowerCase(),
      name: user.name,
    });
  });
  it('Testa que não é possível fazer login sem os campos necessários.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);

    const withoutPassword = await supertest(server.app).post('/login').send({ email: user.email }).expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotEmpty(withoutPassword.body);
    assert.strictEqual(withoutPassword.body.name, 'ValidationError');
    assert.strictEqual(withoutPassword.body.statusMessage, '"password" is required');

    const withoutEmail = await supertest(server.app).post('/login').send({ password: user.password }).expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotEmpty(withoutEmail.body);
    assert.strictEqual(withoutEmail.body.name, 'ValidationError');
    assert.strictEqual(withoutEmail.body.statusMessage, '"email" is required');
  });

  it('Testa que não é possível fazer login com e-mail inválido.', async () => {
    const response = await supertest(server.app)
      .post('/login')
      .send({ email: 'email_is_invalid', password: 'password' })
      .expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotEmpty(response.body);
    assert.strictEqual(response.body.name, 'ValidationError');
    assert.strictEqual(response.body.statusMessage, '"email" must be a valid email');
  });

  it('Testa que não é possível fazer login com senha inválida.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);

    const response = await supertest(server.app).post('/login').send({ email: user.email, password: 'password_is_invalid' }).expect(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotEmpty(response.body);
    assert.strictEqual(response.body.name, 'ValidationError');
    assert.strictEqual(response.body.statusMessage, 'Email ou senha inválidos');
  });

  it('Testa que o login foi feito com sucesso e retorna um token.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);
    const response = await supertest(server.app)
      .post('/login')
      .send({ email: user.email.toLowerCase(), password: user.password })
      .expect(httpStatus.OK);

    assert.isNotEmpty(response.body);
    assert.property(response.body, 'token');
  });

  it('Testa que na resposta não tenha os campos password e cpf.', async () => {
    const user = {
      name: casual.name,
      email: casual.email,
      cpf: Date.now().toString().substring(0, 11),
      password: casual.password,
    };

    const response = await supertest(server.app).post('/users/register').send(user).expect(httpStatus.CREATED);

    assert.isNotEmpty(response.body);
    assert.deepOwnInclude(response.body, {
      email: user.email.toLowerCase(),
      name: user.name,
    });
    expect(response.body).to.be.not.have.property('cpf');
    expect(response.body).to.be.not.have.property('password');
  });
});
