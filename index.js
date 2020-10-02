"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var util_1 = require("./util");
// Initial state
var initialFood = { x: 1, y: 1 };
var initialSnake = [{ x: 2, y: 2 }];
var initialHead = {
    x: 1,
    y: 2
};
var initialState = {
    snake: initialSnake,
    direction: 'left',
    food: initialFood,
    head: initialHead
};
// Code
var willEat = function (state) { return util_1.eq(state.food, nextHead(state)); };
var willClash = function (state) {
    return state.snake.some(function (el) { return util_1.eq(el, nextHead(state)); });
};
var nextFood = function (state) {
    return { x: 2, y: 2 };
};
var eat = function (state) { return ({
    snake: __spreadArrays([state.head], state.snake),
    head: state.food,
    food: nextFood(state),
    direction: state.direction
}); };
console.log(util_1.funPop(initialState.snake));
var regularMove = function (state) { return ({
    snake: __spreadArrays([state.head], util_1.funPop(state.snake)),
    head: nextHead(state),
    food: nextFood(state),
    direction: state.direction
}); };
var nextSnake = function (state) {
    if (willEat(state))
        return eat(state);
    if (willClash(state))
        return state;
    //to update this one
    else
        return regularMove(state);
};
var nextHead = function (state) {
    var head = state.head;
    var x = head.x, y = head.y;
    var newHead;
    if (state.direction === 'left') {
        var newX = x === 0 ? 20 : x - 1;
        newHead = { x: newX, y: y };
    }
    else if (state.direction === 'right') {
        var newX = x === 20 ? 0 : x + 1;
        newHead = { x: newX, y: y };
    }
    else if (state.direction === 'up') {
        var newY = y === 20 ? 0 : y + 1;
        newHead = { x: x, y: newY };
    }
    else if (state.direction === 'down') {
        var newY = y === 0 ? 20 : y - 1;
        newHead = { x: x, y: newY };
    }
    return newHead;
};
var nextState = function (state) {
    return {
        snake: nextSnake(state).snake,
        head: nextHead(state),
        direction: state.direction,
        food: nextFood(state)
    };
};
var p = function () {
    initialState = nextState(initialState);
    return initialState;
};
setInterval(function () {
    console.log(p());
}, 500);
