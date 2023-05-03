import { DOTS, getPaginationModel } from './utils';

describe('pagination', () => {
  it('should return correct pagination model', () => {
    expect(getPaginationModel(3, 5, 1)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationModel(3, 100, 1)).toEqual([1, 2, 3, 4, 5, DOTS, 100]);
    expect(getPaginationModel(99, 100, 1)).toEqual([1, DOTS, 96, 97, 98, 99, 100]);
    expect(getPaginationModel(50, 100, 1)).toEqual([1, DOTS, 49, 50, 51, DOTS, 100]);
  });
});
