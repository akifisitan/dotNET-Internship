import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";

const Navbar = () => {
  const { authenticated } = useContext(authContext);

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost font-bold normal-case text-lg">
          RealEstate
        </Link>

        <Link to="/map" className="btn btn-ghost normal-case text-base">
          Map
        </Link>
        <Link to="/dashboard" className="btn btn-ghost normal-case text-base">
          Dashboard
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
