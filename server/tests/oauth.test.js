const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');

const app = require('../src/app');

chai.use(chaiHttp);
const { expect } = chai;

const agent = chai.request.agent(app);

describe('OAuth request', () => {
  it('Get oauth url', (done) => {
    agent.get('/api/oauth_request')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('connect.sid');
        expect(res.body).to.have.nested.property('data').to.have.nested.property('url');
        done();
      })
  });
  it('Destroy session and invalidate token', (done) => {
    agent.post('/api/disconnect')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
