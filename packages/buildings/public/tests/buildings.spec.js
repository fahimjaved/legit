'use strict';

(function() {
  // Buildings Controller Spec
  describe('MEAN controllers', function() {
    describe('BuildingsController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.buildings');
      });

      // Initialize the controller and a mock scope
      var BuildingsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        BuildingsController = $controller('BuildingsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one building object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('buildings').respond([{
            title: 'Building about Legit',
            content: 'Legit rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.buildings).toEqualData([{
            title: 'Building about Legit',
            content: 'Legit rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one building object fetched ' +
        'from XHR using a buildingId URL parameter', function() {
          // fixture URL parament
          $stateParams.buildingId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testBuildingData = function() {
            return {
              title: 'Building about Legit',
            content: 'Legit rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/buildings\/([0-9a-fA-F]{24})$/).respond(testBuildingData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.building).toEqualData(testBuildingData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postBuildingData = function() {
            return {
              title: 'Building about Legit',
            content: 'Legit rocks!'
            };
          };

          // fixture expected response data
          var responseBuildingData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'Building about Legit',
            content: 'Legit rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'Building about Legit';
          scope.content = 'Legit rocks!';

          // test post request is sent
          $httpBackend.expectPOST('buildings', postBuildingData()).respond(responseBuildingData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/buildings/' + responseBuildingData()._id);
        });

      it('$scope.update(true) should update a valid building', inject(function(Buildings) {

        // fixture rideshare
        var putBuildingData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'Building about Legit',
            to: 'Legit is great!'
          };
        };

        // mock building object from form
        var building = new Buildings(putBuildingData());

        // mock building in scope
        scope.building = building;

        // test PUT happens correctly
        $httpBackend.expectPUT(/buildings\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/buildings\/([0-9a-fA-F]{24})$/, putBuildingData()).respond();
        /*
                Error: Expected PUT /buildings\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Building about legit","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Building about legit","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/buildings/' + putBuildingData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid buildingId ' +
        'and remove the building from the scope', inject(function(Buildings) {

          // fixture rideshare
          var buildings = new Buildings({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.buildings = [];
          scope.buildings.push(building);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/buildings\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(building);
          $httpBackend.flush();

          // test after successful delete URL location buildings list
          //expect($location.path()).toBe('/buildings');
          expect(scope.buildings.length).toBe(0);

        }));
    });
  });
}());
