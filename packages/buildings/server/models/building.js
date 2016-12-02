'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Building Schema
 */
var BuildingSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
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
BuildingSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

BuildingSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
BuildingSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Building', BuildingSchema);
