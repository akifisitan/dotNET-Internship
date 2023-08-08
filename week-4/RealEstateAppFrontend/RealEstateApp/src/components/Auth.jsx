import { useState } from "react";
import App from "./App";
import { authContext } from "../context/authContext";
import { isLoggedIn } from "../helpers/Auth";

const Auth = () => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  return (
    <div>
      <authContext.Provider value={{ authenticated, setAuthenticated }}>
        <App />
      </authContext.Provider>
    </div>
  );
};

export default Auth;
