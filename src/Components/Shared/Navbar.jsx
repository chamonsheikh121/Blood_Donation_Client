import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Find books", path: "/all-books" },
  // { label: "Profile", path: "/profile" },
  // { label: "admin", path: "/admin" },
  { label: "About Us", path: "/about-us" },
  { label: "Contact Us", path: "/contact-us" },
  // { label: "Login/Signup", path: "/login" },
];

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { user, admin, logOut } = useContext(AuthContext)



  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged Out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign out error:", error);
      });
  };
  // const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Library Logo">
              <svg
                width={48}
                height={48}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:opacity-80 transition-opacity"
              >
                <rect
                  x="8"
                  y="12"
                  width="48"
                  height="40"
                  rx="4"
                  ry="4"
                  stroke="#1f2937"
                  strokeWidth="3"
                  fill="#f9fafb"
                />
                <line
                  x1="20"
                  y1="20"
                  x2="44"
                  y2="20"
                  stroke="#1f2937"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="28"
                  x2="44"
                  y2="28"
                  stroke="#1f2937"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="36"
                  x2="44"
                  y2="36"
                  stroke="#1f2937"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="44"
                  x2="44"
                  y2="44"
                  stroke="#1f2937"
                  strokeWidth="2"
                />
                <rect x="8" y="12" width="6" height="40" fill="#1f2937" />
              </svg>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold uppercase text-gray-700 hover:text-green-700 hover:bg-green-100 rounded transition
                  ${isActive
                    ? "border-b-4 border-green-600 text-green-700"
                    : ""
                  }`
                }
                onClick={() => setShowNav(false)}
              >
                {label}
              </NavLink>
            ))}

            {user && (
              user.email === admin ? (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `px-4 py-2 font-semibold uppercase text-gray-700 hover:text-green-700 hover:bg-green-100 rounded transition ${isActive ? "border-b-4 border-green-600 text-green-700" : ""
                    }`
                  }
                  onClick={() => setShowNav(false)}
                >
                  admin
                </NavLink>
              ) : (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-4 py-2 font-semibold uppercase text-gray-700 hover:text-green-700 hover:bg-green-100 rounded transition ${isActive ? "border-b-4 border-green-600 text-green-700" : ""
                    }`
                  }
                  onClick={() => setShowNav(false)}
                >
                  profile
                </NavLink>
              )
            )}



            {
              user ? <button
                onClick={handleLogout}
                className="px-4 py-2 font-semibold uppercase text-gray-700 hover:text-green-700 bg-red-100 hover:bg-red-200  rounded transition">Signout</button> : <NavLink
                to={'/login'}  
                className={({ isActive }) =>
                    `px-4 py-2 font-semibold uppercase text-gray-700 hover:text-green-700 hover:bg-green-100 rounded transition
                  ${isActive
                      ? "border-b-4 border-green-600 text-green-700"
                      : ""
                    }`
                  }
                  onClick={() => setShowNav(false)}
                >
                signIn/ signup
              </NavLink>
            }


          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowNav(!showNav)}
              aria-label="Toggle menu"
              className="text-green-700 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {showNav ? (
                <RxCross1 size={28} />
              ) : (
                <IoMenu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showNav && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-1 px-4 py-4">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded font-semibold uppercase text-gray-700 hover:text-green-700 hover:bg-green-100 transition
                  ${isActive
                    ? "border-l-4 border-green-600 bg-green-50 text-green-700"
                    : ""
                  }`
                }
                onClick={() => setShowNav(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
