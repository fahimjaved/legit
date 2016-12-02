'use strict';

//Setting up route
angular.module('mean.companies').config(['$stateProvider',
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
      .state('all companies', {
        url: '/companies',
        templateUrl: 'companies/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create company', {
        url: '/companies/create',
        templateUrl: 'companies/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit company', {
        url: '/companies/:companyId/edit',
        templateUrl: 'companies/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('company by id', {
        url: '/companies/:companyId',
        templateUrl: 'companies/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
