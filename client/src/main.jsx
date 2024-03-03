import React from "react";

import App from "./App";
import '@mantine/notifications/styles.css';

import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <MantineProvider>
          <Notifications position="top-right" zIndex={1000} />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
