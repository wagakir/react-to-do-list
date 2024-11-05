import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasks";
import authSlice from "./slices/auth";
export const store = configureStore({
  reducer: { tasksSlice, authSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
