import { useState } from "react";
import { authContext } from "../context/authContext";
import { isLoggedIn } from "../helpers/Auth";

const Authenticate = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  return (
    <div>
      <authContext.Provider value={{ authenticated, setAuthenticated }}>
        {children}
      </authContext.Provider>
    </div>
  );
};

export default Authenticate;
