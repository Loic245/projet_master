import axios from "axios";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../components/pageNotFound";
import Loader from "../common/Spinner";
import Layout from "../common/Layout/Layout";

const User = lazy(() => import("../components/users"));

const Accueil = lazy(() => import("../components/accueil"));

const CreateAdmin = lazy(() => import("../components/users/createView"));

const CreateProf = lazy(
  () => import("../components/users/createViewProfessor")
);

const CreateStudent = lazy(() => import("../components/users/createStudent"));

const Login = lazy(() => import("../components/login"));

const Communique = lazy(() => import("../components/communique"));

const Message = lazy(() => import("../components/message"));

const Notification = lazy(() => import("../components/notification"));

const Parametre = lazy(() => import("../components/parametre"));

const About = lazy(() => import("../components/apropos"));

const Profil = lazy(() => import("../components/profil"));

const Documents = lazy(() => import("../components/documents"));

const Statistique = lazy(() => import("../components/statistique"));

const Note = lazy(() => import("../components/note"));

const Gmail = lazy(() => import("../components/gmail"));

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/dashboard"
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

      <Route
        path="/users/createAdmin"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <CreateAdmin />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/users/createProf"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <CreateProf />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/users/createStudent"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <CreateStudent />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/communique"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Communique />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/message"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Message />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/notification"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Notification />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/parametre"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Parametre />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/a_propos"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <About />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/profil"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Profil />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/documents"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Documents />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/note"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Note />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/statistique"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Statistique />
            </Layout>
          </Suspense>
        }
      />

      <Route
        path="/mail"
        element={
          <Suspense fallback={<Loader />}>
            <Layout>
              <Gmail />
            </Layout>
          </Suspense>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
