import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../modules/auth/redux/slice';
import { bannerSlice } from '../modules/banner/redux/slice';
import { challengeSlice } from '../modules/challenge/redux/slice';
import { eventSlice } from '../modules/publication/redux/slice';
import {postulationSlice} from '../modules/postulation/redux/slice'


export const store = configureStore({
  reducer: {
    challenge: challengeSlice.reducer,
    banner: bannerSlice.reducer,
    event: eventSlice.reducer,
    auth: userSlice.reducer,
    postulation: postulationSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch