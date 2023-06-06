import { directions } from '../utils/directions';

describe('directions', () => {
  it('defines the correct directions', () => {
    expect(directions).toEqual({
      N: {
        L: 'W',
        R: 'E',
        move: expect.any(Function),
      },
      E: {
        L: 'N',
        R: 'S',
        move: expect.any(Function),
      },
      S: {
        L: 'E',
        R: 'W',
        move: expect.any(Function),
      },
      W: {
        L: 'S',
        R: 'N',
        move: expect.any(Function),
      },
    });
  });

  it('moves correctly in each direction', () => {
    // Test N direction
    expect(directions.N.move([0, 0])).toEqual([0, 1]);

    // Test E direction
    expect(directions.E.move([0, 0])).toEqual([1, 0]);

    // Test S direction
    expect(directions.S.move([0, 0])).toEqual([0, -1]);

    // Test W direction
    expect(directions.W.move([0, 0])).toEqual([-1, 0]);
  });
});
