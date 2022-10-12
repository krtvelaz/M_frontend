import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../modules/auth/redux/slice';
import { bannerSlice } from '../modules/banner/redux/slice';
import { challengeSlice } from '../modules/challenge/redux/slice';
import { publicationSlice } from '../modules/publication/redux/slice';
import {postulationSlice} from '../modules/postulation/redux/slice'
import {eventSlice} from '../modules/event/redux/slice'
import { userSlice } from '../modules/user/redux/slice';
import { notificationSlice } from '../modules/notificacion/redux/slice';


export const store = configureStore({
  reducer: {
    challenge: challengeSlice.reducer,
    banner: bannerSlice.reducer,
    publication: publicationSlice.reducer,
    event: eventSlice.reducer,
    auth: authSlice.reducer,
    postulation: postulationSlice.reducer,
    user: userSlice.reducer,
    notification: notificationSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch