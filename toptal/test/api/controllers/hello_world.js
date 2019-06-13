const should = require('should');
const request = require('supertest');
const server = require('../../../app');

describe('controllers', function() {

  describe('restaurant', function() {

    describe('GET /restaurants', function() {

      it('should return a default string', function(done) {

        request(server)
          .get('/restaurants')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.an.Array();

            done();
          });
      });

      it('should accept a name parameter', function(done) {

        request(server)
          .get('/restaurants')
          .query({ name: 'Scott'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.an.Array();

            done();
          });
      });

    });

  });

});
