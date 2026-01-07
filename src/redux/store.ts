import { thunk } from "redux-thunk";
import userReducer from "./reducers/userreducers";
import { createStore, applyMiddleware, combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
});

const middleWare = [thunk];
export const store = createStore(rootReducer, applyMiddleware(...middleWare));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
