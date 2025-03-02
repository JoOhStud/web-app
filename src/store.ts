import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/user/userSlice";
import chatReducer from "./features/chat/chatSlice";
import { chatApi } from "./features/chat/chatApi";
import { searchApi } from "./features/search/searchApi";
import { userApi } from "./features/user/userApi";
import { specializationApi } from "./features/specializations/specializationsApi";
import { blogApi } from "./features/blog/blogApi";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    chat: chatReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [specializationApi.reducerPath]: specializationApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      chatApi.middleware,
      searchApi.middleware,
      userApi.middleware,
      specializationApi.middleware,
      blogApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
