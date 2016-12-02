'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Company Schema
 */
var CompanySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  cname: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  office: {
    type: String,
    required: true,
    trim: true
  },
  house: {
    type: String,
    required: true,
    trim: true
  },
  trade: {
    type: String,
    required: true,
    trim: true
  },
  garea: {
    type: String,
    required: true,
    trim: true
  },
  other: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
CompanySchema.path('cname').validate(function(cname) {
  return !!cname;
}, 'Comapny Name cannot be blank');

CompanySchema.path('owner').validate(function(owner) {
  return !!owner;
}, 'Owner cannot be blank');

CompanySchema.path('city').validate(function(city) {
  return !!city;
}, 'City cannot be blank');

/**
 * Statics
 */
CompanySchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Company', CompanySchema);
