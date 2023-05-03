import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PersonDto } from '../dto';
import { getPerson, getPersonList } from './thunks';

export type PeopleSliceState = {
  person?: PersonDto;
  people?: APIListResponse<PersonDto>;
  listIsLoading: boolean;
  detailsIsLoading: boolean;
};

export const initialState: PeopleSliceState = {
  person: undefined,
  people: undefined,
  listIsLoading: false,
  detailsIsLoading: false,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    updateCurrentPerson: (state, action: PayloadAction<{ person: Omit<PersonDto, 'url'> }>) => {
      const { person } = action.payload;

      state.person = { ...(state.person as PersonDto), ...person };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPersonList.pending, (state) => {
      state.listIsLoading = true;
      state.people = undefined;
    });

    builder.addCase(getPersonList.fulfilled, (state, action) => {
      state.listIsLoading = false;
      state.people = action.payload;
    });

    builder.addCase(getPersonList.rejected, (state) => {
      state.listIsLoading = false;
    });

    builder.addCase(getPerson.pending, (state) => {
      state.detailsIsLoading = true;
      state.person = undefined;
    });

    builder.addCase(getPerson.fulfilled, (state, action) => {
      state.detailsIsLoading = false;
      state.person = action.payload;
    });

    builder.addCase(getPerson.rejected, (state) => {
      state.detailsIsLoading = false;
    });
  },
});

const { actions, reducer } = peopleSlice;

export const { updateCurrentPerson } = actions;
export default reducer;
