import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { ThunkAction } from "redux-thunk";
import appReducer, { watchFetchWord } from "./AppSlice";

export const rootReducer = combineReducers({
  app: appReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware),
});
sagaMiddleware.run(watchFetchWord);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
