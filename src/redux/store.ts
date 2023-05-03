import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '../features/people/store';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
