"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAuth } from "@/contexts/auth-context";

export function AccountInfo(): React.JSX.Element {
	const { user } = useAuth();

	const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest User";

	return (
		<Card>
			<CardContent>
				<Stack spacing={2} sx={{ alignItems: "center" }}>
					<div>
						<Avatar src={user?.imageUrl || "/assets/avatar.png"} sx={{ height: "80px", width: "80px" }} />
					</div>
					<Stack spacing={1} sx={{ textAlign: "center" }}>
						<Typography variant="h5">{fullName}</Typography>
						<Typography color="text.secondary" variant="body2">
							{user?.title || "No title specified"}
						</Typography>
						<Typography color="text.secondary" variant="body2">
							{user?.email || "Email not provided"}
						</Typography>
					</Stack>
				</Stack>
			</CardContent>
			<Divider />
			<CardActions>
				<Button fullWidth variant="text">
					Upload picture
				</Button>
			</CardActions>
		</Card>
	);
}
