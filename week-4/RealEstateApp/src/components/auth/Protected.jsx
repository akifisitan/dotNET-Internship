import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../../helpers/Auth";
import { authContext } from "../../context/authContext";

export const Protected = ({ children }) => {
  const { userInfo, setUserInfo } = useContext(authContext);
  if (!userInfo || isTokenExpired()) {
    setUserInfo(null);
    return <Navigate to="/login" replace />;
  }
  return children;
};
