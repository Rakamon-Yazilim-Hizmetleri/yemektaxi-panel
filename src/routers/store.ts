import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import { baseApi } from "./base-api";

export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[baseApi.reducerPath]: baseApi.reducer,
		auth: authReducer,
		// Add other reducers here as needed
	},
	// Adding the api middleware enables caching, invalidation, polling, and other useful features of RTK Query
	// eslint-disable-next-line unicorn/prefer-spread
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
