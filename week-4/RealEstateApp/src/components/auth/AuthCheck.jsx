import { useState } from "react";
import { authContext } from "../../context/authContext";
import { getUserData } from "../../helpers/Auth";

export const AuthCheck = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUserData());

  return (
    <div>
      <authContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </authContext.Provider>
    </div>
  );
};
