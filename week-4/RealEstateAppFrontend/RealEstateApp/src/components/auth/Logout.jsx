import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../helpers/Auth";

const Logout = () => {
  const navigate = useNavigate();
  clearToken();

  useEffect(() => {
    // Set a timeout to navigate after 5 seconds
    const timeoutId = setTimeout(() => {
      navigate("/login"); // Replace '/other-page' with the actual path
    }, 3000);

    // Clean up the timeout if the component unmounts before the timeout is reached
    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center text-2xl">
      <p>You have been logged out.</p>
      <p>You will be redirected to the login page in 3 seconds.</p>
    </section>
  );
};

export default Logout;
