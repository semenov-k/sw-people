import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPersonListAPI, getPersonAPI } from '../api';
import { PersonDto } from '../dto';

export const getPersonList = createAsyncThunk<APIListResponse<PersonDto>, { page: number; search: string }>(
  'people/getPersonList',
  async ({ page, search }, { signal }) => {
    const response = await getPersonListAPI(search, page, signal);

    return response.data;
  },
);

export const getPerson = createAsyncThunk<PersonDto, { id: string }>('people/getPerson', async ({ id }) => {
  const response = await getPersonAPI(id);

  return response.data;
});
