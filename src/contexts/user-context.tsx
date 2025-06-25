"use client";

import * as React from "react";

import type { User } from "@/types/user";
import { useAuth } from "@/contexts/auth-context";

export interface UserContextValue {
	user: User | null;
	error: string | null;
	isLoading: boolean;
	checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
	children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
	const { user: authUser, isLoading, isAuthenticated } = useAuth();

	// Convert Redux auth user to legacy user format for compatibility
	const user: User | null = React.useMemo(() => {
		if (!authUser || !isAuthenticated) return null;

		return {
			id: authUser.email, // Use email as ID since it's unique
			name: `${authUser.firstName} ${authUser.lastName}`.trim(),
			avatar: authUser.imageUrl || undefined,
			email: authUser.email,
			firstName: authUser.firstName,
			lastName: authUser.lastName,
			title: authUser.title,
			restaurantId: authUser.restaurantId,
			phoneNumber: authUser.phoneNumber,
		};
	}, [authUser, isAuthenticated]);

	const checkSession = React.useCallback(async (): Promise<void> => {
		// This is handled by the Redux auth system now
		// We keep this for compatibility with existing code
	}, []);

	const value: UserContextValue = {
		user,
		error: null,
		isLoading,
		checkSession,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
