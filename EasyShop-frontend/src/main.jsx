import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/pages/authPage/Login.jsx";
import Router from "./Router.jsx";
import PageTransition from "./components/service/PageTnsition.jsx";
import { Provider } from "react-redux";
import { store } from "./components/Redux/Store/Store.js";
import AppWrapper from "./components/Layout/AppWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppWrapper>
        <Router />
      </AppWrapper>
    </BrowserRouter>
  </Provider>,
);
