'use strict';

describe('Controller: RoomsRoomCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var RoomsRoomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoomsRoomCtrl = $controller('RoomsRoomCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RoomsRoomCtrl.awesomeThings.length).toBe(3);
  });
});
