import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../../helpers/Auth";
import { authContext } from "../../context/authContext";

const Protected = ({ children }) => {
  const { authenticated, setAuthenticated } = useContext(authContext);
  if (!authenticated || isTokenExpired()) {
    setAuthenticated(false);
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
