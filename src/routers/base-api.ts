import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom base query with token refresh logic
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	// Base query configuration
	const baseQuery = fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_URL + "/api",
		prepareHeaders: (headers, { getState }) => {
			// Get token from Redux state first, fallback to localStorage
			const state = getState() as { auth?: { token?: string } };
			const token = state.auth?.token || localStorage.getItem("authToken") || "";

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			headers.set("Accept", "text/plain");
			headers.set("Content-Type", "application/json");

			return headers;
		},
	});

	let result = await baseQuery(args, api, extraOptions);

	// Handle 401 errors - token might be expired
	if (result.error && result.error.status === 401) {
		// Try to refresh token
		const refreshToken = localStorage.getItem("refreshToken");

		if (refreshToken) {
			// Attempt to refresh the token
			const refreshResult = await baseQuery(
				{
					url: "Auth/RefreshToken", // Adjust this endpoint based on your API
					method: "POST",
					body: { refreshToken },
				},
				api,
				extraOptions
			);

			if (refreshResult.data) {
				// If refresh successful, update tokens and retry original request
				const newTokenData = refreshResult.data as { token: string; refreshToken: string };

				// Update localStorage
				localStorage.setItem("authToken", newTokenData.token);
				localStorage.setItem("refreshToken", newTokenData.refreshToken);

				// Retry the original query with new token
				result = await baseQuery(args, api, extraOptions);
			} else {
				// Refresh failed, clear auth data
				localStorage.removeItem("authToken");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("user");

				// Dispatch logout action if available
				// api.dispatch(logout());
			}
		}
	}

	return result;
};

// Base API slice
export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Restaurant", "User", "Order", "Auth"], // Add more tag types as needed
	endpoints: () => ({}),
});
