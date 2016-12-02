'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Building = mongoose.model('Building'),
  _ = require('lodash');


/**
 * Find building by id
 */
exports.building = function(req, res, next, id) {
  Building.load(id, function(err, building) {
    if (err) return next(err);
    if (!building) return next(new Error('Failed to load building ' + id));
    req.building = building;
    next();
  });
};

/**
 * Create an building
 */
exports.create = function(req, res) {
  var building = new Building(req.body);
  building.user = req.user;

  building.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the building'
      });
    }
    res.json(building);

  });
};

/**
 * Update an building
 */
exports.update = function(req, res) {
  var building = req.building;

  building = _.extend(building, req.body);

  building.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the building'
      });
    }
    res.json(building);

  });
};

/**
 * Delete an building
 */
exports.destroy = function(req, res) {
  var building = req.building;

  building.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the building'
      });
    }
    res.json(building);

  });
};

/**
 * Show an building
 */
exports.show = function(req, res) {
  res.json(req.building);
};

/**
 * List of Building
 */
exports.all = function(req, res) {
  Building.find().sort('-created').populate('user', 'name username').exec(function(err, buildings) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the buildings'
      });
    }
    res.json(buildings);

  });
};
