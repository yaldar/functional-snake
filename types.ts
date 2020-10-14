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

export { Coor, Snake, State, Direction };
