'use strict';

describe('Service: Rooms/room', function () {

  // load the service's module
  beforeEach(module('armsAngularApp'));

  // instantiate service
  var Rooms/room;
  beforeEach(inject(function (_Rooms/room_) {
    Rooms/room = _Rooms/room_;
  }));

  it('should do something', function () {
    expect(!!Rooms/room).toBe(true);
  });

});
