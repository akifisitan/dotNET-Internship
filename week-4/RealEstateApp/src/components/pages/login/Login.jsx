import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { login } from "../../../services/AuthService";
import { storeUserData } from "../../../helpers/Auth";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userInfo) navigate("/", { replace: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.state) navigate(location.pathname, { replace: true });
    setLoading(true);
    setError(null);
    let success = false;
    const response = await login(username, password);
    if (!response) {
      setError("We cannot serve you at this moment. Please try again later");
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          success = true;
          storeUserData(
            username,
            response.data.roles,
            response.data.token,
            response.data.expiration
          );
          setUserInfo({
            username: username,
            roles: response.data.roles,
          });
          navigate("/", { replace: true });
          break;
        case 400:
          setError("Invalid parameters");
          break;
        case 401:
          setError("Invalid username or password");
          break;
        default:
          setError(`An undocumented error ocurred. Status code: ${statusCode}`);
          break;
      }
    }
    if (!success) setLoading(false);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container mx-auto w-full">
        {location.state ? (
          <div className="container flex items-center justify-center text-white mx-auto min-h-12 mb-4 bg-green-800 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0">
            <p>Account created successfully</p>
          </div>
        ) : null}
        {error ? (
          <div className="container flex items-center justify-center text-white mx-auto min-h-12 mb-4 bg-red-900 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0">
            <p>{error}</p>
          </div>
        ) : null}
        <div className="container mx-auto w-full bg-gray-800 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5 "
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5 "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 w-full disabled:cursor-not-allowed text-gray-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium hover:underline text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
