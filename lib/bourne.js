/*
 * bourne
 * https://github.com/andreww8088/bourne
 *
 * Copyright (c) 2014 Andrew Burgess
 * Licensed under the MIT license.
 */
(function () {
'use strict';

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
