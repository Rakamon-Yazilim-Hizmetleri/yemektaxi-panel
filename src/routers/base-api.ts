import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query with authorization header
const baseQuery = fetchBaseQuery({
	baseUrl: "https://yemektaxiapp.com/api/",
	prepareHeaders: (headers, { getState }) => {
		// Get token from Redux state first, fallback to localStorage
		const state = getState() as { auth?: { token?: string } };
		const token = state.auth?.token || localStorage.getItem("authToken") || "";

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		headers.set("Accept", "text/plain");

		return headers;
	},
});

// Base API slice
export const baseApi = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["Restaurant", "User", "Order", "Auth"], // Add more tag types as needed
	endpoints: () => ({}),
});
