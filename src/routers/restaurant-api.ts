import { baseApi } from "./base-api";

// Define the RestaurantAddress type
export interface RestaurantAddress {
	id: string;
	restaurantId: string;
	address: string;
	optionalAddress: string | null;
	city: string;
	district: string;
	neighborhood: string;
	postalCode: string;
	status: string;
	isDeleted: boolean;
}

// Define the Restaurant type based on your API response
export interface Restaurant {
	id: string;
	name: string;
	authorizedFullName: string | null;
	phoneNumber: string;
	mail: string;
	restaurantAddress: RestaurantAddress;
	taxNumber: string | null;
	mersisNumber: string | null;
	registrationNumber: string | null;
	customerServicePhoneNumber: string | null;
	logo: string | null;
	imageUrl: string | null;
	workingHours: unknown[]; // You can define a more specific type for working hours if needed
}

// Define API response type - the response is directly an array of restaurants
export type RestaurantsResponse = Restaurant[];

// Restaurant API endpoints
export const restaurantApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllRestaurants: builder.query<RestaurantsResponse, void>({
			query: () => "Restaurant/GetAllRestaurants",
			providesTags: ["Restaurant"],
		}),
	}),
	overrideExisting: false,
});

// Export hooks for usage in functional components
export const { useGetAllRestaurantsQuery } = restaurantApi;
