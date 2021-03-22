import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./Firebase";
import { ToastProvider } from "react-toast-notifications";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/app.css";
//khan
ReactDOM.render(
  <AuthProvider>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement="bottom-right"
    >
      <App />
    </ToastProvider>
  </AuthProvider>,
  document.getElementById("root")
);
