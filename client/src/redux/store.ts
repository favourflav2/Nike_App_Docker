import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { shoeApi } from "./api/shoeApi";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categorySlice from "./features/categorySlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";
import { cachedApiCalls } from "./api/authApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  categoryState: categorySlice,
  [shoeApi.reducerPath]: shoeApi.reducer,
  cart:cartSlice,
  auth:authSlice,
  [cachedApiCalls.reducerPath]: cachedApiCalls.reducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
     }).concat([shoeApi.middleware,cachedApiCalls.middleware]),
});

// Need this in order to use useDipatch and useSelctor
export const Dispatch: () => typeof store.dispatch = useDispatch;
export const UseSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
