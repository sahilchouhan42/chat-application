// import {configureStore} from "@reduxjs/toolkit"
// import userReducer from "./userSlice.js"
// import messageReducer from './messageSlice.js'
// import socketReducer from './socketSlice.js'

// const store = configureStore({
//     reducer:{
//         user: userReducer,
//         message: messageReducer,
//         socket: socketReducer
//     }
// })

// export default store


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer
} from "redux-persist";

// import storage from "redux-persist/lib/storage";
// import storage from "redux-persist/lib/storage/index.js";

import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";

// custom storage
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

// combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer
});

// persist config
const persistConfig = {
  key: "root",
  storage,
  // agar kisi slice ko persist nahi karna:
  blacklist: ["socket"]
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// persistor
export const persistor = persistStore(store);