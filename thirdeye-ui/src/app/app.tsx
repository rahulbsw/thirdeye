import React, { FunctionComponent } from "react";
import { AppBar } from "./components/app-bar/app-bar.component";
import { AppRouter } from "./routers/app-router/app-router";

// ThirdEye UI app
export const App: FunctionComponent = () => {
    return (
        <>
            <AppBar />

            <AppRouter />
        </>
    );
};
