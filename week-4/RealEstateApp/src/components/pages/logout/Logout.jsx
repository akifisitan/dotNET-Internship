import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { clearUserData } from "../../../helpers/Auth";

export const Logout = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(authContext);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    } else {
      clearUserData();
      setUserInfo(null);
      const timeoutId = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-2xl text-center">
        <p>
          You have been logged out
          <br />
          You will be redirected to the login page in 3 seconds
        </p>
      </div>
    </section>
  );
};
