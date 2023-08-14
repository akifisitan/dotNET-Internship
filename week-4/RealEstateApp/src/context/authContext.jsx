import { createContext } from "react";

export const authContext = createContext({
  userInfo: null,
  setUserInfo: () => {},
});
