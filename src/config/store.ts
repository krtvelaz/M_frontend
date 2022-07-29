import { configureStore } from '@reduxjs/toolkit';
import { bannerSlice } from '../modules/admin/banner/redux/slice';
import { challengeSlice } from '../modules/admin/challenge/redux/slice';


export const store = configureStore({
  reducer: {
    challenge: challengeSlice.reducer,
    banner: bannerSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch