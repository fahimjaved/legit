'use strict';

angular.module('mean.buildings').controller('BuildingsController', ['$scope', '$stateParams', '$location', 'Global', 'Buildings',
  function($scope, $stateParams, $location, Global, Buildings) {
    $scope.global = Global;

    $scope.hasAuthorization = function(building) {
      if (!building || !building.user) return false;
      return $scope.global.isAdmin || building.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var building = new Buildings({
          title: this.title,
          content: this.content
        });
        building.$save(function(response) {
          $location.path('buildings/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(building) {
      if (building) {
        building.$remove();

        for (var i in $scope.buildings) {
          if ($scope.buildings[i] === building) {
            $scope.buildings.splice(i, 1);
          }
        }
      } else {
        $scope.building.$remove(function(response) {
          $location.path('buildings');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var building = $scope.building;
        if (!building.updated) {
          building.updated = [];
        }
        building.updated.push(new Date().getTime());

        building.$update(function() {
          $location.path('buildings/' + building._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Buildings.query(function(buildings) {
        $scope.buildings = buildings;
      });
    };

    $scope.findOne = function() {
      Buildings.get({
        buildingId: $stateParams.buildingId
      }, function(building) {
        $scope.building = building;
      });
    };
  }
]);
