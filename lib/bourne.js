/*
 * bourne
 * https://github.com/andreww8088/bourne
 *
 * Copyright (c) 2014 Andrew Burgess
 * Licensed under the MIT license.
 */
(function () {
'use strict';

var store = {};

if (typeof require !=== 'undfined') {
    var fs = require('fs');
    store.exists = fs.existsSync.bind(fs);
    store.remove = fs.unlinkSync.bind(fs);
    store.get    = fs.readFileSync.bind(fs);
    store.set    = fs.writeFile.bind(fs);
} else {
    store.exists = function (key) { return localStorage.getItem(key) !== null; };
    store.remove = localStorage.removeItem.bind(localStorage);
    store.get    = localStorage.getItem.bind(localStorage);
    store.set    = function (key, value, callback) { localStorage.setItem(key, value); callback && callback(); };
}

var Bourne = {};

Bourne.awesome = function() {
  return 'awesome';
};


if (typeof exports !== 'undefined') {
    module.exports = Bourne;
} else {
    window.Bourne = Bourne;
}

}.call(this));
