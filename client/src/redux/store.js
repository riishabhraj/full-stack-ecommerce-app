import { combineReducers, configureStore } from "@reduxjs/toolkit";
import customerReducer from "./reducers/customerReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer.js";
import sellerReducer from "./reducers/sellerReducer.js";

const rootReducer = combineReducers({
  customer: customerReducer,
  product: productReducer,
  cart: cartReducer,
  seller: sellerReducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
