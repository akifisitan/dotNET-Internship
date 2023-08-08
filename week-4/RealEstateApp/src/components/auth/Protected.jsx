import { Navigate } from "react-router-dom";
import { isLoggedIn, isTokenExpired } from "../../helpers/Auth";

const Protected = ({ children }) => {
  if (!isLoggedIn() || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
