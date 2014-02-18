'use strict';

if (typeof require !== 'undefined') {
    var Bourne = require('../lib/bourne.js');
    var Chance = require('chance');
}

var c = new Chance();

var testName = (typeof __dirname !== 'undefined') ? __dirname + '/' : '';
testName += c.string({ pool: 'abcdefghijklmnopqrstuvwxyz' });

var testRecord1 = { firstname: c.first(), lastname: c.last(), age: c.age(), birthday: c.birthday() };

this.bourne_test = {
  setUp: function(done) {
    done();
  },
  'can create Bourne instance': function(test) {
    test.expect(1);

    test.doesNotThrow(function () {
        var db = new Bourne(testName, { reset: true });
    });

    test.done();
  }
};
