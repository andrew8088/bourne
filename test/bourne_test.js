'use strict';

if (typeof require !== 'undefined') {
    var Bourne = require('../lib/bourne.js');
    var Chance = require('chance');
}

var c = new Chance();

var testName = (typeof __dirname !== 'undefined') ? __dirname + '/' : '';
testName += c.string({ pool: 'abcdefghijklmnopqrstuvwxyz' });

var testRecord1 = { firstname: c.first(), lastname: c.last(), age: c.age(), birthday: c.birthday() },
    testRecord2 = { firstname: c.first(), lastname: c.last(), age: c.age(), birthday: c.birthday() },
    testRecord3 = { firstname: c.first(), lastname: c.last(), age: c.age(), birthday: c.birthday() };

this.bourne_test = {
    setUp: function(done) {
        var db = this.db = new Bourne(testName, { reset: true });
        db.insert(testRecord1, function () {
            db.insert(testRecord2, function () {
                db.insert(testRecord3, done);
            });
        });
    },
    'can create Bourne instance': function(test) {
        test.expect(1);

        test.doesNotThrow(function () {
            var db = new Bourne(testName, { reset: true });
        });

        test.done();
    },
    'can insert record': function (test) {
        test.expect(2);
        var db = new Bourne(testName, { reset: true });
        db.insert(testRecord1, function (err, record) {
            test.equal(testRecord1.firstname, record.firstname, 'names should be equal');
            test.equal(record.id, 1, 'id should be 1');
            test.done();
        });
    },
    'can store record peristently': function (test) {
        var db1 = new Bourne(testName, { reset: true });
        db1.insert(testRecord1, function (err, record) {
            var db2 = new Bourne(testName);
            test.equal(db2.data[0].firstname, testRecord1.firstname, 'names should be equal');
            test.done();
        });
    },
    'can find records by one key': function (test) {
        this.db.find({ firstname: testRecord1.firstname }, function (err, records) {
            test.equal(records.length, 1, 'should find one record');
            test.equal(records[0].firstname, testRecord1.firstname, 'names should be equal');
            test.done();
        });
    },
    'can find records by multiple keys': function (test) {
        this.db.find({ firstname: testRecord1.firstname, age: testRecord1.age }, function (err, records) {
            test.equal(records.length, 1, 'should find one record');
            test.equal(records[0].age, testRecord1.age, 'names should be equal');
            test.done();
        });
    },
    'can find multiple records': function (test) {
        var r = { firstname: testRecord1.firstname, age: c.age() };

        var db = this.db;

        db.insert(r, function () {
            db.find({ firstname: testRecord1.firstname }, function (err, records) {
                test.equal(records.length, 2, '2 records should be found');
                test.done();
            });
        });
    }
};
