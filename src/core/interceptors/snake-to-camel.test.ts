/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosResponse } from 'axios';
import { snakeToCamelInterceptor } from './snake-to-camel';

const responseFactory = (data: object, isJSON: boolean) => {
  const response = {
    data,
    headers: {},
  } as AxiosResponse;

  if (isJSON) {
    response.headers['content-type'] = 'application/json';
  }

  return response;
};

describe('snakeToCamelInterceptor()', () => {
  it('should convert when response is object', () => {
    const response = responseFactory({ test_key: 123 }, true);

    const newResponse = snakeToCamelInterceptor(response);

    expect(newResponse.data).toEqual({ testKey: 123 });
  });

  it('should convert when response is array', () => {
    const response = responseFactory([{ test_key: 123 }], true);

    const newResponse = snakeToCamelInterceptor(response);

    expect(newResponse.data).toEqual([{ testKey: 123 }]);
  });

  it('should not convert when response is not a JSON', () => {
    const response = responseFactory([{ test_key: 123 }], false);

    const newResponse = snakeToCamelInterceptor(response);

    expect(newResponse.data).toEqual([{ test_key: 123 }]);
  });
});
