import React, { useState } from "react";
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	FormControl,
	FormLabel,
	OutlinedInput,
	Typography,
} from "@mui/material";

import { useAuth } from "@/contexts/auth-context";

export function LoginFormRedux(): React.JSX.Element {
	const { login, isLoading } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		const result = await login({ email, password });

		if (!result.success) {
			setError(result.error || "Login failed");
		}
		// On success, the auth context will handle the state update
		// and the user will be redirected by your auth guard
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				p: 2,
			}}
		>
			<Card sx={{ maxWidth: 400, width: "100%" }}>
				<CardHeader title="Login to YemekTaxi" sx={{ textAlign: "center" }} />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							{error && <Alert severity="error">{error}</Alert>}

							<FormControl>
								<FormLabel>Email</FormLabel>
								<OutlinedInput
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder="admin@yemektaxi.com"
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Password</FormLabel>
								<OutlinedInput
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									placeholder="Enter your password"
								/>
							</FormControl>

							<Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 2 }}>
								{isLoading ? (
									<>
										<CircularProgress size={20} sx={{ mr: 1 }} />
										Logging in...
									</>
								) : (
									"Login"
								)}
							</Button>
						</Box>
					</form>

					<Box sx={{ mt: 2, p: 1, backgroundColor: "grey.100", borderRadius: 1 }}>
						<Typography variant="caption" color="text.secondary">
							Demo credentials:
							<br />
							Email: admin@yemektaxi.com
							<br />
							Password: testtest
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
