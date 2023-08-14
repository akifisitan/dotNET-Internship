import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../helpers/Auth";
import { authContext } from "../../context/authContext";

export const Logout = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(authContext);

  useEffect(() => {
    clearToken();
    setAuthenticated(false);
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate, setAuthenticated]);

  return (
    <section className="flex flex-col items-center justify-center text-2xl">
      <p>You have been logged out.</p>
      <p>You will be redirected to the login page in 3 seconds.</p>
    </section>
  );
};
