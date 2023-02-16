import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContext } from "./components/context/AuthContext";

// window.addEventListener("resize", (event) => {
//   // console.log(window.location.pathname);
//   if (window.location.pathname !== "/" && window.innerWidth < 768) {
//     const menu_icon = document.getElementById("menu-icon");
//     menu_icon.style.display = "none";
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>
);
