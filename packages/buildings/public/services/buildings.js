'use strict';

//Buildings service used for buildings REST endpoint
angular.module('mean.buildings').factory('Buildings', ['$resource',
  function($resource) {
    return $resource('buildings/:buildingId', {
      buildingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
