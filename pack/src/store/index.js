import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import toggleReducer from "./reducers/toggleReducer";
import adminUserService from "./services/adminUserService";
import authService from "./services/authService";
import bookingService from "./services/bookingService";
import packageService from "./services/packageService";
import themeService from "./services/themeService";

const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [themeService.reducerPath]: themeService.reducer,
    [adminUserService.reducerPath]: adminUserService.reducer,
    [packageService.reducerPath]: packageService.reducer,
    [bookingService.reducerPath]: bookingService.reducer,
    globalReducer: globalReducer,
    authReducer: authReducer,
    toggleReducer: toggleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authService.middleware]).concat([themeService.middleware]).concat([adminUserService.middleware]).concat([bookingService.middleware]).concat([packageService.middleware]),
},+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
