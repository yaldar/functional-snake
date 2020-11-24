import { Coor, Snake, State, Direction } from './types';
import { pointEqual, popTail, rand, snakeIncludes } from './util';

// Initial state
const initialFood: Coor = { x: 1, y: 1 };
const initialSnake: Snake = [{ x: 2, y: 2 }];
const initialHead = {
  x: 1,
  y: 2,
};

let initialState: State = {
  snake: initialSnake,
  direction: 'left',
  food: initialFood,
  head: initialHead,
};

const WIDTH = 20;
const HEIGHT = 20;

// Code
const okMove = (direction: Direction, state: State) => {
  if (
    (direction === 'right' && state.direction === 'left') ||
    (direction === 'up' && state.direction === 'down') ||
    (direction === 'down' && state.direction === 'up') ||
    (direction === 'left' && state.direction === 'right')
  )
    return false;
  else return true;
};

const willEat = (state: State): boolean => pointEqual(state.food, nextHead(state));
const willClash = (state: State): boolean => {
  return state.snake.some((el) => pointEqual(el, nextHead(state)));
};

const nextFood = (state: State): Coor => {
  const randFood = {
    x: rand(0, WIDTH - 1),
    y: rand(0, HEIGHT - 1),
  };

  if (snakeIncludes(state, randFood)) nextFood(state);
  return randFood;
};

const eat = (state: State): State => ({
  snake: [state.head, ...state.snake],
  head: state.food,
  food: nextFood(state),
  direction: state.direction,
});

const regularMove = (direction: Direction, state: State) => ({
  snake: [state.head, ...popTail(state.snake)],
  head: nextHead(state),
  food: state.food,
  direction: okMove(direction, state) ? direction : state.direction,
});

const nextState = (direction: Direction, state: State): State => {
  if (willEat(state)) return eat(state);
  if (willClash(state)) return initialState;
  else return regularMove(direction, state);
};

const nextHead = (state: State): Coor => {
  const { x, y } = state.head;
  if (state.direction === 'left') {
    const newX = x === 0 ? WIDTH - 1 : x - 1;
    return { x: newX, y };
  } else if (state.direction === 'right') {
    const newX = x === WIDTH - 1 ? 0 : x + 1;
    return { x: newX, y };
  } else if (state.direction === 'up') {
    const newY = y === HEIGHT - 1 ? 0 : y + 1;
    return { x, y: newY };
  } else if (state.direction === 'down') {
    const newY = y === 0 ? HEIGHT - 1 : y - 1;
    return { x, y: newY };
  }
  return state.head;
};

export { nextState, initialState, WIDTH, HEIGHT, okMove };
