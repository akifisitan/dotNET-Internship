import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";

const Navbar = () => {
  const { authenticated } = useContext(authContext);

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-base">
          Home
        </Link>
        <Link to="/dashboard" className="btn btn-ghost normal-case text-base">
          Dashboard
        </Link>
        <Link
          to="/myProperties"
          className="btn btn-ghost normal-case text-base"
        >
          My Properties
        </Link>
      </div>
      <div className="navbar-end">
        {authenticated ? (
          <Link to="/admin" className="btn btn-ghost normal-case text-base">
            Admin
          </Link>
        ) : null}
        {authenticated ? (
          <Link to="/logout" className="btn btn-ghost normal-case text-base">
            Logout
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
