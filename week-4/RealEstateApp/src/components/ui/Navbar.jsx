import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

export const Navbar = () => {
  const { userInfo } = useContext(authContext);
  if (!userInfo) return null;
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
        {userInfo.roles.includes("Admin") ? (
          <Link to="/admin" className="btn btn-ghost normal-case text-base">
            Admin
          </Link>
        ) : null}
        <p className="btn btn-ghost normal-case text-base">
          {userInfo.username}
        </p>

        <Link to="/logout" className="btn btn-ghost normal-case text-base">
          Logout
        </Link>
      </div>
    </nav>
  );
};
