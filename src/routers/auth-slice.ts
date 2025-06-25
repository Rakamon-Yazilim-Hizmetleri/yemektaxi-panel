import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { User } from "./auth-api";

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
}

// Get initial state from localStorage if available
const getInitialState = (): AuthState => {
	if (typeof window !== "undefined") {
		const storedToken = localStorage.getItem("authToken");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			try {
				return {
					user: JSON.parse(storedUser),
					token: storedToken,
					isAuthenticated: true,
				};
			} catch {
				// If parsing fails, clear localStorage and return default state
				localStorage.removeItem("authToken");
				localStorage.removeItem("user");
			}
		}
	}

	return {
		user: null,
		token: null,
		isAuthenticated: false,
	};
};

const authSlice = createSlice({
	name: "auth",
	initialState: getInitialState(),
	reducers: {
		loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;

			// Persist to localStorage
			if (typeof globalThis.window !== "undefined") {
				localStorage.setItem("authToken", action.payload.token);
				localStorage.setItem("user", JSON.stringify(action.payload.user));
			}
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;

			// Clear localStorage
			if (typeof globalThis.window !== "undefined") {
				localStorage.removeItem("authToken");
				localStorage.removeItem("user");
			}
		},
		updateUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;

			// Update localStorage
			if (typeof globalThis.window !== "undefined") {
				localStorage.setItem("user", JSON.stringify(action.payload));
			}
		},
	},
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
