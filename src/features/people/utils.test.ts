import { parsePersonIdFromUrl } from './utils';

describe('people utils', () => {
  it('should parse id from url', () => {
    expect(parsePersonIdFromUrl('https://swapi.dev/api/people/1/')).toBe('1');
  });
});
