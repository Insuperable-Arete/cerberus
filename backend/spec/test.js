var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var server = require('../server/config.js');
var worker = require('../worker/config.js')

var db = require('../db/mongodb-data/config.js');
var Beach = require('../db/models/beach.js');

describe('', function() {

  beforeEach(function(done) {
    request(server)
      .get('/logout')
      .end(function(err, res) {
        done();
      });
  });

    describe('Link creation: ', function() {

      it('Expects a 200 response code from the root endpoint', function(done) {
        request(server)
          .get('/')
          .expect(200)
          .end(done);
      });

      it('Expects a 404 response code on an invalid endpoint', function(done){
        request(server)
          .get('/foo')
          .expect(404)
          .end(done);
      })

    describe('Surf Data Request', function() {

      it('Responds with with JSON data', function(done) {
        request(server)
          .get('/dbData')
          .expect(200)
          .expect(function(res) {
            var ran = Math.floor( Math.random() * res.body.length );
            expect(res.body[ran].forecastData.length).to.equal(8);
          })
          .end(done);
      });

      //need to find a more creative (i.e. effective) way to actualy test this...
      it('Responds with surf data with a timebox of 24 hours', function(done) {
        request(server)
          .get('/dbData')
          .expect(200)
          .expect(function(res) {
            var ran = Math.floor( Math.random() * res.body.length );
            expect(res.body[ran].forecastData.length).to.equal(8);
          })
          .end(done);
      });
    }); 

  }); // link creation



  describe('Database', function(){

    it('Retrieves the correct beach name', function(done) {
      request(server)
        .get('/dbData')
        .expect(200)
        .expect(function(res) {
          Beach.findOne({'mswId': '271'})
            .exec(function(err, beach) {
              if (err) console.log(err);
              expect(beach.beachname).to.equal("Hammonds Reef");
            });
        })
      .end(done);
    });

  }); //Database

});
