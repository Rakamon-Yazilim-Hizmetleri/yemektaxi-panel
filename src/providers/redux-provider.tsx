"use client";

import React from "react";
import { store } from "@/routers/store";
import { Provider } from "react-redux";

interface ReduxProviderProps {
	children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps): React.JSX.Element {
	return <Provider store={store}>{children}</Provider>;
}
