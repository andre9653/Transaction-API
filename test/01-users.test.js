const chai = require('chai');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const connection = require('../src/database');
const User = require('../src/model/User');
const userPopulate = require('./mock/usersPopulate.json');
const { app } = require('../src/server');
const Account = require('../src/model/Account');

const { expect } = chai;

describe('1- Testes de usuários.', () => {
  let server;
  before(async () => {
    await Account.sync({ force: true });
    await User.sync({ force: true });
  });
  after(async (done) => {
    done();
  });
  it('Testa que não é possível fazer um cadastro sem os campos necessários.', async () => {
    // email, password, name, cpf
    const requestTestName = await supertest(app).post('/register')
      .send({
        email: 'test2jose@email.com',
        cpf: '19776546210',
        password: '11235465469',
      })
      .expect(401);
    const requestTestEmail = await supertest(app).post('/register')
      .send({
        name: 'teste name',
        cpf: '19776546210',
        password: '11235465469',
      })
      .expect(401);
    const requestTestCpf = await supertest(app).post('/register')
      .send({
        name: 'teste name',
        email: 'test2jose@email.com',
        password: '11235465469',
      })
      .expect(401);
    const requestTestPassword = await supertest(app).post('/register')
      .send({
        name: 'teste name',
        email: 'test2jose@email.com',
        cpf: '19776546210',
      })
      .expect(401);
    expect(requestTestName.body).to.be.a('object');
    expect(requestTestName.body.Error).to.be.equal('"name" is required');
    expect(requestTestEmail.body).to.be.a('object');
    expect(requestTestEmail.body.Error).to.be.equal('"email" is required');
    expect(requestTestCpf.body).to.be.a('object');
    expect(requestTestCpf.body.Error).to.be.equal('"cpf" is required');
    expect(requestTestPassword.body).to.be.a('object');
    expect(requestTestPassword.body.Error).to.be.equal('"password" is required');
  });
  it('Testa que não é possível criar um usuário onde o CPF ou e-mail ja cadastrados.', async () => {

  });
  it('Testa que é criado um usuário com sucesso.', async () => {
    const { status } = await supertest(app).post('/register')
      .send({
        name: 'teste name',
        email: 'test2jose@email.com',
        cpf: '19776546210',
        password: '11235465469',
      });
    expect(status).to.be.equal(201);
  });
  it('Testa que não é possível fazer login sem os campos necessários.', async () => {});
  it('Testa que não é possível fazer login com e-mail inválido.', async () => {});
  it('Testa que não é possível fazer login com senha inválida.', async () => {});
  it('Testa que o login foi feito com sucesso e retorna um token.', async () => {});
  it('Testa que na resposta não tenha os campos password e cpf.', async () => {});
  it('Testa que foi listado todos os usuários.', async () => {});
});
