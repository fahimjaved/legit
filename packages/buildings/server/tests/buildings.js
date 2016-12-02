'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Building = mongoose.model('Building');

/**
 * Globals
 */
var user;
var building;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Building:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        building = new Building({
          title: 'Building Title',
          content: 'Building Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return building.save(function(err) {
          should.not.exist(err);
          building.title.should.equal('Building Title');
          building.content.should.equal('Building Content');
          building.user.should.not.have.length(0);
          building.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        building.title = '';

        return building.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        building.content = '';

        return building.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        building.user = {};

        return building.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      building.remove();
      user.remove();
      done();
    });
  });
});
