/// <reference types="react-scripts" />

type APIListResponse<T> = {
  count: number;
  results: T[];
};
