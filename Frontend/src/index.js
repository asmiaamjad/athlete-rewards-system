import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ToastContainer
  position="top-right"
  autoClose={3000}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  draggable
  pauseOnFocusLoss={false}
/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
