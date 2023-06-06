export const directions: {
    [key: string]: {
      L: string;
      R: string;
      move: ([x, y]: [number, number]) => [number, number];
    };
  } = {
    N: {
      L: 'W',
      R: 'E',
      move: ([x, y]: [number, number]): [number, number] => [x, y + 1],
    },
    E: {
      L: 'N',
      R: 'S',
      move: ([x, y]: [number, number]): [number, number] => [x + 1, y],
    },
    S: {
      L: 'E',
      R: 'W',
      move: ([x, y]: [number, number]): [number, number] => [x, y - 1],
    },
    W: {
      L: 'S',
      R: 'N',
      move: ([x, y]: [number, number]): [number, number] => [x - 1, y],
    },
  };