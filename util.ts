import { State } from './types';

type Coor = {
  x: number;
  y: number;
};

const pointEqual = (obj1: Coor, obj2: Coor) =>
  obj1.x === obj2.x && obj1.y === obj2.y;

const popTail = <T>(arr: T[]): T[] =>
  arr.filter((_, index) => index !== arr.length - 1);

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


const snakeIncludes = (state: State, p: Coor) =>
  [...state.snake, state.head].some((el) => pointEqual(el, p));


export { pointEqual, popTail, rand, snakeIncludes };
