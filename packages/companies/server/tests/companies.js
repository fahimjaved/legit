'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Company = mongoose.model('Company');

/**
 * Globals
 */
var user;
var company;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Company:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        company = new Company({
          Cname: 'Company Name',
          owner: 'Company Owner',
          city:  'Company City';
          office:  'Company Office';
          house:  'Company House';
          trade:  'Company Trade';
          garea:  'Company Gross Leasable Area';
          other:  'Company Other';
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return company.save(function(err) {
          should.not.exist(err);
          company.cname.should.equal('Company Name');
          company.owner.should.equal('Company Owner');
          company.city.should.equal('Company City');
          company.office.should.equal('Company Office');
          company.house.should.equal('Company House');
          company.trade.should.equal('Company Trade');
          company.garea.should.equal('Company Gross Leasable Area');
          company.other.should.equal('Company Other');
          company.user.should.not.have.length(0);
          company.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without cname', function(done) {
        company.cname = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without owner', function(done) {
        company.owner = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should be able to show an error when try to save without city', function(done) {
        company.city = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should be able to show an error when try to save without office', function(done) {
        company.office = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should be able to show an error when try to save without house', function(done) {
        company.house = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should be able to show an error when try to save without trade', function(done) {
        company.trade = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should be able to show an error when try to save without garea', function(done) {
        company.garea = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });
      it('should be able to show an error when try to save without other', function(done) {
        company.other = '';

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        company.user = {};

        return company.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      company.remove();
      user.remove();
      done();
    });
  });
});
