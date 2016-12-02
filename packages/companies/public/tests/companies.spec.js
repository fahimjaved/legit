'use strict';

(function() {
  // Companies Controller Spec
  describe('MEAN controllers', function() {
    describe('CompaniesController', function() {
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
        module('mean.companies');
      });

      // Initialize the controller and a mock scope
      var CompaniesController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        CompaniesController = $controller('CompaniesController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one company object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('companies').respond([{
            cname: 'company name',
            owner: 'comapny owner',
            city: 'company city',
            office: 'company office',
            house: 'company house',
            trade: 'company trade',
            garea: 'company garea',
            other: 'company other'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.companies).toEqualData([{
            cname: 'company name',
            owner: 'comapny owner',
            city: 'company city',
            office: 'company office',
            house: 'company house',
            trade: 'company trade',
            garea: 'company garea',
            other: 'company other'
          }]);

        });

      it('$scope.findOne() should create an array with one company object fetched ' +
        'from XHR using a companyId URL parameter', function() {
          // fixture URL parament
          $stateParams.companyId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testCompanyData = function() {
            return {
              cname: 'company name',
              owner: 'comapny owner',
              city: 'company city',
              office: 'company office',
              house: 'company house',
              trade: 'company trade',
              garea: 'company garea',
              other: 'company other'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/companies\/([0-9a-fA-F]{24})$/).respond(testCompanyData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.company).toEqualData(testCompanyData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postCompanyData = function() {
            return {
              cname: 'company name',
              owner: 'comapny owner',
              city: 'company city' ,
              office: 'company office',
              house: 'company house',
              trade: 'company trade',
              garea: 'company garea',
              other: 'company other' 
            };
          };

          // fixture expected response data
          var responseCompanyData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'Company about Legit',
            content: 'Legit rocks!'
            };
          };

          // fixture mock form input values
          scope.cname = 'Company Name';
          scope.owner = 'Company owner';
          scope.city = 'Company City';
          scope.office = 'Company Office';
          scope.house = 'Company House';
          scope.trade = 'Company Trade';
          scope.garea = 'Company Gross Leasable Area';
          scope.other = 'Company Other';

          // test post request is sent
          $httpBackend.expectPOST('companies', postCompanyData()).respond(responseCompanyData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.cname).toEqual('');
          expect(scope.owner).toEqual('');
          expect(scope.city).toEqual('');
          expect(scope.office).toEqual('');
          expect(scope.house).toEqual('');
          expect(scope.trade).toEqual('');
          expect(scope.garea).toEqual('');
          expect(scope.other).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/companies/' + responseCompanyData()._id);
        });

      it('$scope.update(true) should update a valid company', inject(function(Companies) {

        // fixture rideshare
        var putCompanyData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            cname: 'Company name',
            to: 'Legit is great!'
          };
        };

        // mock company object from form
        var company = new Companies(putCompanyData());

        // mock company in scope
        scope.company = company;

        // test PUT happens correctly
        $httpBackend.expectPUT(/companies\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/companies\/([0-9a-fA-F]{24})$/, putCompanyData()).respond();
        /*
                Error: Expected PUT /companies\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Company about legit","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Company about legit","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/companies/' + putCompanyData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid companyId ' +
        'and remove the company from the scope', inject(function(Companies) {

          // fixture rideshare
          var companies = new Companies({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.companies = [];
          scope.companies.push(company);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/companies\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(company);
          $httpBackend.flush();

          // test after successful delete URL location companies list
          //expect($location.path()).toBe('/companies');
          expect(scope.companies.length).toBe(0);

        }));
    });
  });
}());
