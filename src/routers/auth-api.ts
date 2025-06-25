import { baseApi } from "./base-api";

// Define Permission interface
export interface Permission {
	id: string;
	name: string;
	description: string;
}

// Define Role interface
export interface Role {
	id: string;
	name: string;
	description: string | null;
	status: string;
	restaurantId: string;
	permissions: Permission[];
}

// Define User interface based on the login response
export interface User {
	firstName: string;
	lastName: string;
	email: string;
	token: string;
	refreshToken: string;
	roles: Role[];
	title: string;
	isNewUser: boolean;
	restaurantId: string;
	yearOfBirth: number;
	phoneNumber: string;
	identityNumber: string;
	imageUrl: string | null;
	isAuthUser: boolean;
	confirmationStatus: string;
}

// Define Login request interface
export interface LoginRequest {
	email: string;
	password: string;
}

// Define Login response interface
export interface LoginResponse {
	succeeded: boolean;
	message: string | null;
	item: User;
}

// Auth API endpoints
export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: "Auth/Login",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
	overrideExisting: false,
});

// Export hooks for usage in functional components
export const { useLoginMutation } = authApi;
