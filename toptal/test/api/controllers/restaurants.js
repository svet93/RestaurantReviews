/* eslint-disable */
const should = require('should');
const request = require('supertest');
// const server = require('../../../app');
const server = request.agent('http://localhost:3001');
let cookie = null;

const login = () => {
  return function(done) {
      server
          .post('/auth/login')
          .send({ email: 'svet@theproscloset.com', password: 'test123' })
          .expect(200)
          .end(onResponse);

      function onResponse(err, res) {
         if (err) return done(err);
         const {
           token,
         } = res.body;
         cookie = token;
         return done();
      }
  };
};

describe('controllers', () => {
  describe('restaurant', () => {
    describe('GET /restaurants', () => {
      it('login', login());
      it('should return a default string', (done) => {
        server
          .get('/restaurants')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${cookie}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);

            res.body.should.be.an.Array();

            done();
          });
      });

      it('should accept a name parameter', (done) => {
        server
          .get('/restaurants')
          .query({ isOwner: true })
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${cookie}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);

            res.body.should.be.an.Array();

            done();
          });
      });
    });
  });
});
