import { initialState, nextState, WIDTH, HEIGHT, okMove } from './index';
const readline = require('readline');
import { Snake, State } from './types';
import { pointEqual, snakeIncludes } from './util';

const print = (str: string): void => {
  process.stdout.write(str);
};
const printDashed = (width: number, c: string) => {
  for (let i = 1; i <= width + 2; i++) print(c);
  print('\n');
};
const render = (state: State): void => {
  printDashed(WIDTH, '-');
  for (let i = HEIGHT - 1; i >= 0; i--) {
    print('|');
    for (let j = 0; j < WIDTH; j++) {
      const point = { x: j, y: i };
      if (snakeIncludes(state, point)) print('o');
      else if (pointEqual(state.food, point)) print('x');
      else print(' ');
    }
    print('|\n');
  }
  printDashed(WIDTH, '-');
};

let state = nextState('left', initialState);

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (_, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  if (okMove(key.name, state) && ['up', 'down', 'left', 'right'].includes(key.name)) state.direction = key.name;
});

setInterval(() => {
  console.clear();
  render(state);
  state = nextState(state.direction, state);
}, 800);
