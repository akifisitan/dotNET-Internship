import { createContext } from "react";
import { isLoggedIn } from "../helpers/Auth";

export const authContext = createContext({
  authenticated: true,
  setAuthenticated: () => {},
});
