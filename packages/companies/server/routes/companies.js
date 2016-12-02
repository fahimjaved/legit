'use strict';

var companies = require('../controllers/companies');

// Company authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.company.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Companies, app, auth) {

  app.route('/companies')
    .get(companies.all)
    .post(auth.requiresLogin, companies.create);
  app.route('/companies/:companyId')
    .get(companies.show)
    .put(auth.requiresLogin, hasAuthorization, companies.update)
    .delete(auth.requiresLogin, hasAuthorization, companies.destroy);

  // Finish with setting up the companyId param
  app.param('companyId', companies.company);
};
