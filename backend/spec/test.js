var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var should = require('chai').should;
var mongoose = require('mongoose');

var server = require('../server/config.js');
var worker = require('../worker/config.js');
var apiUtils = require('../worker/utils/apiUtils.js');

var db = require('../db/mongodb-data/config.js');
var Beach = require('../db/models/beach.js');

/////////////////
///the below is for testing CRUD operations to a "dummy" DB
////////////


// var dbURI = 'mongodb://localhost/dummy';
// var Dummy = mongoose.model('Dummy', new mongoose.Schema({
//   mswId: Number,
//   beachname: String,
//   forecastData: Array,
//   tweets: Array
// }));
// var clearDB = require('mocha-mongoose')(dbURI);


// describe('API Utils - DB write', function(){

//   beforeEach(function(done){
//     if (mongoose.connection.db) return done();
//     mongoose.connect(dbURI, done);
//   })

//   it('getTweetAsync should write surf data to the DB', function(done){
//     apiUtils.getMswAsync({mswId: 172})
//   });

//   it('getMswAsync should write tweet data to the DB', function(done){

//   });



// }); //Database

describe('', function() {

  beforeEach(function(done) {
    request(server)
      .get('/')
      .end(function(err, res) {
        done();
      });
  });

    describe('Server endpoints', function() {

      it('Expects a 200 response code from the root endpoint', function(done) {
        request(server)
          .get('/')
          .expect(200)
          .end(done);
      });

      it ('Expects html to be served from the root endpoint', function(done){
        request(server)
          .get('/')
          .expect(function(res){
            //expect(res.type === 'text/html').to.equal(true);
            expect(res.type).to.equal('text/html');
          })
          .end(done);
      })

      it('Expects a 404 response code on an invalid endpoint', function(done){
        request(server)
          .get('/foo/bar')
          .expect(404)
          .end(done);
      });

    }); //Server endpoints

    describe('Surf Data Request', function() {

      it('Responds with JSON data', function(done) {
        request(server)
          .get('/fetch')
          .expect(200)
          .expect(function(res) {
            expect(typeof res.body).to.equal('object');
          })
          .end(done);
      });

      //need to find a more creative (i.e. effective) way to actually test this...
      //could test what time is exactley on object
      it('Responds with surf data with a timebox of 24 hours', function(done) {
        request(server)
          .get('/fetch')
          .expect(200)
          .expect(function(res) {
            var ran = Math.floor( Math.random() * res.body.length );
            expect(res.body[ran].forecastData.length).to.equal(8);
          })
          .end(done);
      });

    }); //Surf Data Request


    describe('API Utils - REST calls', function(){

      it('getMswAsync should return JSON', function(done){
        apiUtils.getMswAsync({mswId: 270})
          .then(function(success, err){
            expect(typeof success).to.equal('object');
            done()
          })
      });

      it ('getTweetAsync should return JSON', function(done){
        apiUtils.getTweetAsync(33.9015, -118.423)
          .then(function(success, err){
            expect(typeof success).to.equal('object');
            done()
          })
      });



    }); //Api Utils
});
