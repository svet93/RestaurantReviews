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
          .send({ email: 'svet.93@gmail.com', password: 'test123' })
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

      it('should create a restaurant', (done) => {
        server
          .post('/restaurants')
          .send({
            name: 'Test Restaurant',
            description: 'Testing 123',
            imageUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Scrum-Delicious-Burgers_EXPS_CHMZ19_824_B10_30_2b.jpg',
            userId: 1,
          })
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${cookie}`)
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            should.not.exist(err);

            done();
          });
      });
    });
  });
});
