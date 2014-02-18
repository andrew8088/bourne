'use strict';

if (typeof require !== 'undefined') {
    var Bourne = require('../lib/bourne.js');
}

this.bourne_test = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(Bourne.awesome(), 'awesome', 'should be awesome.');
    test.done();
  },
};
