import { configureStore } from '@reduxjs/toolkit';
import { challengeSlice } from '../modules/challenge/redux/slice';


export const store = configureStore({
  reducer: {
    challenge: challengeSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch