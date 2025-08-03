import { Route, Routes, useLocation } from "react-router";
import Auth from "./components/Layout/AuthLayout";
import Login from "./components/pages/authPage/Login";
import Profile from "./components/pages/IsLogin/User/Profile";
import User from "./components/pages/IsLogin/User/UserLayout";
import Layout from "./components/Layout/Layout";
import Register from "./components/pages/authPage/Register";
import NotFound from "./components/pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { PageTransitionFade } from "./components/service/PageTnsition";
import PrivetRout from "./components/privet/Private";

const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransitionFade key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route path="user" element={<User />}>
              <Route
                path="Profile"
                element={
                  <PrivetRout>
                    <Profile />
                  </PrivetRout>
                }
              />
            </Route>
          </Route>
          <Route path="/auth" element={<Auth />}>
            <Route path="Register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route
            path="/private"
            element={
              <PrivetRout>
                <h1>Shamim</h1>
              </PrivetRout>
            }></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransitionFade>
    </AnimatePresence>
  );
};

export default Router;
