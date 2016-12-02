'use strict';

var buildings = require('../controllers/buildings');

// Building authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.building.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Buildings, app, auth) {

  app.route('/buildings')
    .get(buildings.all)
    .post(auth.requiresLogin, buildings.create);
  app.route('/buildings/:buildingId')
    .get(buildings.show)
    .put(auth.requiresLogin, hasAuthorization, buildings.update)
    .delete(auth.requiresLogin, hasAuthorization, buildings.destroy);

  // Finish with setting up the buildingId param
  app.param('buildingId', buildings.building);
};
