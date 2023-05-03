import peopleReducer, { updateCurrentPerson } from './reducer';
import { getPerson, getPersonList } from './thunks';

describe('peopleReducer', () => {
  it('should return initial state', () => {
    expect(peopleReducer(undefined, { type: undefined })).toEqual({
      person: undefined,
      people: undefined,
      listIsLoading: false,
      detailsIsLoading: false,
    });
  });

  it('should update person by id', () => {
    const updatedPerson = {
      name: 'Joe',
      height: '22',
      mass: '55',
      hairColor: 'brown',
      skinColor: 'black',
      eyeColor: 'green',
      birthYear: '234FA',
    };

    expect(peopleReducer(undefined, updateCurrentPerson({ person: updatedPerson }))).toEqual({
      person: updatedPerson,
      people: undefined,
      listIsLoading: false,
      detailsIsLoading: false,
    });
  });

  it('should change state to loading when fetching list', () => {
    expect(peopleReducer(undefined, { type: getPersonList.pending })).toEqual({
      person: undefined,
      people: undefined,
      listIsLoading: true,
      detailsIsLoading: false,
    });
  });

  it('should store data when list is fetched', () => {
    expect(peopleReducer(undefined, { type: getPersonList.fulfilled, payload: { count: 0, results: [] } })).toEqual({
      person: undefined,
      people: {
        count: 0,
        results: [],
      },
      listIsLoading: false,
      detailsIsLoading: false,
    });
  });

  it('should change state to loading when fetching person', () => {
    expect(peopleReducer(undefined, { type: getPerson.pending })).toEqual({
      person: undefined,
      people: undefined,
      listIsLoading: false,
      detailsIsLoading: true,
    });
  });

  it('should store data when person is fetched', () => {
    expect(peopleReducer(undefined, { type: getPerson.fulfilled, payload: {} })).toEqual({
      person: {},
      people: undefined,
      listIsLoading: false,
      detailsIsLoading: false,
    });
  });
});
