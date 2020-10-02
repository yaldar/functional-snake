"use strict";
exports.__esModule = true;
exports.funPop = exports.eq = void 0;
var eq = function (obj1, obj2) {
    return obj1.x === obj2.x && obj1.y === obj2.y;
};
exports.eq = eq;
var funPop = function (arr) { return arr.filter(function (_, index) { return index !== arr.length - 1; }); };
exports.funPop = funPop;
