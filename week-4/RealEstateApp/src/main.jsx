import React from "react";
import ReactDOM from "react-dom/client";
import Authenticate from "./components/Auth.jsx";
import App from "./components/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authenticate>
      <App />
    </Authenticate>
  </React.StrictMode>
);
