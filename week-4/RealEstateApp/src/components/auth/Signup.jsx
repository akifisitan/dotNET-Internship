import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../services/AuthService";

const Signup = () => {
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [infoMessage, setInfo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(email, password, username);
    if (!response) {
      setInfo("Something went wrong. Please try again");
    } else {
      const status = response.status;
      switch (status) {
        case 200:
          navigate("/login");
          break;
        default:
          setInfo("Something went wrong. Please try again");
          break;
      }
    }
  };

  return (
    <section className="mt-8">
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
              className="bg-blue-600 hover:bg-blue-700 w-full text-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign Up
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
            <div>
              <p className="text-center text-red-700">
                {infoMessage !== null ? infoMessage : null}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
