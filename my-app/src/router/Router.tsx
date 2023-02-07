import axios from "axios";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../components/pageNotFound";
import Acceuil from "../components/accueil";
import Users from "../components/users";

const User = lazy(() => import("../components/users"));

const Router = () => {

    return(
        <Routes>
            <Route
                path="/"
                element={<Acceuil />}
            />

            <Route
                path="/users"
                element={
                    <Suspense fallback={<>...</>}>
                        <User />
                    </Suspense>
                }
            />

            <Route
                path="*"
                element={<PageNotFound />}
            />
        </Routes>
    )
}

export default Router;