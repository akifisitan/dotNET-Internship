import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";

const Navbar = () => {
  const { authenticated } = useContext(authContext);

  return (
    <nav className="flex sm:justify-center space-x-4">
      <Link
        to="/"
        className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
      >
        Dashboard
      </Link>
      <Link
        to="/myProperties"
        className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
      >
        My Properties
      </Link>
      {authenticated ? (
        <Link
          to="/admin"
          className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
        >
          Admin
        </Link>
      ) : null}
      {authenticated ? (
        <Link
          to="/logout"
          className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
        >
          Logout
        </Link>
      ) : null}
    </nav>
  );
};

export default Navbar;
