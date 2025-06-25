"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { useAuth } from "@/contexts/auth-context";

export interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
	const router = useRouter();
	const { user, isAuthenticated, isLoading } = useAuth();
	const [isChecking, setIsChecking] = React.useState<boolean>(true);

	const checkPermissions = async (): Promise<void> => {
		if (isLoading) {
			return;
		}

		if (!isAuthenticated || !user) {
			logger.debug("[AuthGuard]: User is not logged in, redirecting to sign in");
			router.replace(paths.auth.signIn);
			return;
		}

		setIsChecking(false);
	};

	React.useEffect(() => {
		checkPermissions().catch(() => {
			// noop
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
	}, [user, isAuthenticated, isLoading]);

	if (isChecking || isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return <React.Fragment>{children}</React.Fragment>;
}
