import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../../../context/authContext";
import { signup } from "../../../services/AuthService";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/", { replace: true });
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let success = false;
    const response = await signup(email, password, username);
    if (!response) {
      setError("We cannot serve you at this moment. Please try again later");
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          success = true;
          navigate("/login", {
            replace: true,
            state: { message: "Account created" },
          });
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
        {error ? (
          <div className="container flex items-center justify-center text-white mx-auto min-h-12 mb-4 bg-red-900 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0">
            <p>{error}</p>
          </div>
        ) : null}
        <div className="container mx-auto w-full bg-gray-800 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5 "
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
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
                  placeholder="Enter password"
                  className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5 "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 w-full disabled:cursor-not-allowed text-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <p className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium hover:underline text-blue-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
