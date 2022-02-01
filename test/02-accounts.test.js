const chai = require('chai');
const supertest = require('supertest');
const httpStatus = require('http-status');
const casual = require('casual');
const database = require('../src/database');
const { clearDatabase } = require('./utils/index');

const { expect, assert } = chai;

describe('2- Testes de accounts', () => {
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
  it('Testa que é passado o campo "amount".', async () => {});
  it('Testa que não é possível criar conta caso o usuário não exista.', async () => {
    const account = {
      amount: 2000,
    };

    const response = await supertest(server.app).post('/accounts/register/2').send(account);

    expect(response.status).to.be.equal(httpStatus.UNPROCESSABLE_ENTITY);

    assert.isNotNull(response.body);
    assert.isObject(response.body);
    assert.strictEqual(response.body.name, 'ValidationError');
    expect(response.body.statusMessage).to.be.equal('User not found.');
  });
  it('Testa que não é possível criar conta caso o usuário ja tenha uma conta cadastrada.', async () => {});
  it('Testa que é criado uma conta com sucesso', async () => {});
  it('Testa que é passado um token pelo header da requisição.', async () => {});
  it('Testa que o token é valido.', async () => {});
  it('Testa que é passado os campos "cpf" e "amount".', async () => {});
  it('Testa que existe um usuário pagador e um credor.', async () => {});
  it('Testa que ambos os usuários tenham contas abertas.', async () => {});
  it('Testa que não é possível transferir valores entre contas iguais.', async () => {});
  it('Testa que na conta do usuário pagador foi subtraído o valor transferido.', async () => {});
  it('Testa que na conta do usuário pagador foi subtraído o valor transferido.', async () => {});
  it('Testa que foi realizado uma transferência', async () => {});
  it('Testa que é passado os campos "depositValue" e "accountNumber".', async () => {});
  it('Testa que existe a conta para deposito.', async () => {});
  it('Testa que é realizado o deposito com sucesso.', async () => {});
});
