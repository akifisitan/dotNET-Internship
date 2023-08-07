import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex sm:justify-center space-x-4">
      <Link
        to="/"
        className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
      >
        Home
      </Link>
      <Link
        to="/authors"
        className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
      >
        Authors
      </Link>
      <Link
        to="/books"
        className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
      >
        Books
      </Link>
      <Link
        to="/logout"
        className="rounded-lg px-3 py-2 text-gray-100 font-medium hover:text-blue-600"
      >
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
