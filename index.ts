import { eq, funPop } from './util';
// Types
type Coor = {
  x: number;
  y: number;
};

type Snake = Coor[];
type Direction = 'left' | 'right' | 'up' | 'down';

type State = {
  snake: Snake;
  direction: Direction;
  food: Coor;
  head: Coor;
};

// Initial state
let initialFood: Coor = { x: 1, y: 1 };
let initialSnake: Snake = [{ x: 2, y: 2 }];
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

// Code
const willEat = (state): boolean => eq(state.food, nextHead(state));
const willClash = (state: State): boolean => {
  return state.snake.some((el) => eq(el, nextHead(state)));
};

const nextFood = (state: State): Coor => {
  return { x: 2, y: 2 };
};

const eat = (state: State): State => ({
  snake: [state.head, ...state.snake],
  head: state.food,
  food: nextFood(state),
  direction: state.direction,
});

console.log(funPop(initialState.snake));
const regularMove = (state: State) => ({
  snake: [state.head, ...funPop(state.snake)],
  head: nextHead(state),
  food: nextFood(state),
  direction: state.direction,
});

const nextSnake = (state: State): State => {
  if (willEat(state)) return eat(state);

  if (willClash(state)) return state;
  //to update this one
  else return regularMove(state);
};

const nextHead = (state: State): Coor => {
  const { head } = state;
  const { x, y } = head;
  let newHead: Coor;
  if (state.direction === 'left') {
    const newX = x === 0 ? 20 : x - 1;
    newHead = { x: newX, y };
  } else if (state.direction === 'right') {
    const newX = x === 20 ? 0 : x + 1;
    newHead = { x: newX, y };
  } else if (state.direction === 'up') {
    const newY = y === 20 ? 0 : y + 1;
    newHead = { x, y: newY };
  } else if (state.direction === 'down') {
    const newY = y === 0 ? 20 : y - 1;
    newHead = { x, y: newY };
  }
  return newHead;
};

const nextState = (state: State): State => {
  return {
    snake: nextSnake(state).snake,
    head: nextHead(state),
    direction: state.direction,
    food: nextFood(state),
  };
};
const p = () => {
  initialState = nextState(initialState);
  return initialState;
};

setInterval(() => {
  console.log(p());
}, 500);
