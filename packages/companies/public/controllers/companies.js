'use strict';

angular.module('mean.companies').controller('CompaniesController', ['$scope', '$stateParams', '$location', 'Global', 'Companies',
  function($scope, $stateParams, $location, Global, Companies) {
    $scope.global = Global;

    $scope.hasAuthorization = function(company) {
      if (!company || !company.user) return false;
      return $scope.global.isAdmin || company.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var company = new Companies({
          cname: this.cname,
          owner: this.owner,
          city:this.city,
          office:this.office,
          house:this.house,
          trade:this.trade,
          garea:this.garea,
          other:this.other
        });
        company.$save(function(response) {
          $location.path('companies/' + response._id);
        });

        this.cname = '';
        this.owner = '';
        this.city = '';
        this.office = '';
        this.house = '';
        this.trade = '';
        this.garea = '';
        this.other = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(company) {
      if (company) {
        company.$remove();

        for (var i in $scope.companies) {
          if ($scope.companies[i] === company) {
            $scope.companies.splice(i, 1);
          }
        }
      } else {
        $scope.company.$remove(function(response) {
          $location.path('companies');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var company = $scope.company;
        if (!company.updated) {
          company.updated = [];
        }
        company.updated.push(new Date().getTime());

        company.$update(function() {
          $location.path('companies/' + company._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Companies.query(function(companies) {
        $scope.companies = companies;
      });
    };

    $scope.findOne = function() {
      Companies.get({
        companyId: $stateParams.companyId
      }, function(company) {
        $scope.company = company;
      });
    };
  }
]);
