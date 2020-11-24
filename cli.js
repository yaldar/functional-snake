"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var readline = require('readline');
var util_1 = require("./util");
var print = function (str) {
    process.stdout.write(str);
};
var printDashed = function (width, c) {
    for (var i = 1; i <= width + 2; i++)
        print(c);
    print('\n');
};
var render = function (state) {
    printDashed(index_1.WIDTH, '-');
    for (var i = index_1.HEIGHT - 1; i >= 0; i--) {
        print('|');
        for (var j = 0; j < index_1.WIDTH; j++) {
            var point = { x: j, y: i };
            if (util_1.snakeIncludes(state, point))
                print('o');
            else if (util_1.pointEqual(state.food, point))
                print('x');
            else
                print(' ');
        }
        print('|\n');
    }
    printDashed(index_1.WIDTH, '-');
};
var state = index_1.nextState('left', index_1.initialState);
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', function (_, key) {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    }
    if (index_1.okMove(key.name, state) && ['up', 'down', 'left', 'right'].includes(key.name))
        state.direction = key.name;
    console.log(key.name);
});
setInterval(function () {
    console.clear();
    render(state);
    state = index_1.nextState(state.direction, state);
}, 800);
