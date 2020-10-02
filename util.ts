type Coor = {
  x: number;
  y: number;
};

const eq = (obj1: Coor, obj2: Coor): boolean =>
  obj1.x === obj2.x && obj1.y === obj2.y;

const funPop = <T>(arr: T[]): T[] =>  arr.filter((_, index) => index !== arr.length-1);


export { eq, funPop };
