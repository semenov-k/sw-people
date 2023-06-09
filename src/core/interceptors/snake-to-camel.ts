import { AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

export const snakeToCamelInterceptor = (response: AxiosResponse) => {
  if (response.data && response.headers['content-type'] === 'application/json') {
    response.data = camelizeKeys(response.data);
  }

  return response;
};
