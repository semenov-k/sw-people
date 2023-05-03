import { AxiosResponse } from 'axios';
import { apiClient } from '../../core/api-client';
import { PersonDto } from './dto';

export const getPersonListAPI = (
  search: string,
  page: number,
  signal: AbortSignal,
): Promise<AxiosResponse<APIListResponse<PersonDto>>> =>
  apiClient.get('/api/people', { params: { search, page }, signal });

export const getPersonAPI = (id: string): Promise<AxiosResponse<PersonDto>> => apiClient.get(`/api/people/${id}`);
