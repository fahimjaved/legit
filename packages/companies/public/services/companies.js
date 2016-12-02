'use strict';

//Companies service used for companies REST endpoint
angular.module('mean.companies').factory('Companies', ['$resource',
  function($resource) {
    return $resource('companies/:companyId', {
      companyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
