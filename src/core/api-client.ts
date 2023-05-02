import axios from 'axios';
import { snakeToCamelInterceptor } from './interceptors';

export const apiClient = axios.create({
  baseURL: 'https://swapi.dev/',
});

apiClient.interceptors.response.use(snakeToCamelInterceptor);
