'use strict';

//Setting up route
angular.module('mean.buildings').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all buildings', {
        url: '/buildings',
        templateUrl: 'buildings/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create building', {
        url: '/buildings/create',
        templateUrl: 'buildings/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit building', {
        url: '/buildings/:buildingId/edit',
        templateUrl: 'buildings/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('building by id', {
        url: '/buildings/:buildingId',
        templateUrl: 'buildings/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
