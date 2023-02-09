import axios from "axios";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../components/pageNotFound";
import Loader from "../common/Spinner";
import NavBar from "../common/Navbar/NavBar";
import Layout from "../common/Layout/Layout";

const User = lazy(() => import("../components/users"));

const Accueil = lazy(() => import("../components/accueil"));

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Accueil />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/users"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <User />
            </Layout>
          </Suspense>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
