// Export store and types
export { store } from "./store";
export type { RootState, AppDispatch } from "./store";

// Export base API
export { baseApi } from "./base-api";

// Export restaurant API
export { restaurantApi, useGetAllRestaurantsQuery } from "./restaurant-api";
export type { Restaurant, RestaurantsResponse, RestaurantAddress } from "./restaurant-api";

// Export auth API
export { authApi, useLoginMutation } from "./auth-api";
export type { User, LoginRequest, LoginResponse, Role, Permission } from "./auth-api";

// Export auth slice
export {
	loginSuccess,
	logout,
	updateUser,
	selectAuth,
	selectUser,
	selectToken,
	selectIsAuthenticated,
} from "./auth-slice";
