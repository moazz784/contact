import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("adminToken");
  const isAdmin = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
          onClick={() => setIsOpen(false)}
        >
          MyWebsite
        </Link>

        {/* Desktop Links (الشاشات المتوسطة والكبيرة) */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-600 transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-green-600 transition font-medium"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-green-600 transition font-medium"
          >
            Contact
          </Link>

          {isAdmin ? (
            <>
              <NotificationBell />

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Action Controls (زر الهامبرغر + الإشعارات على الهواتف) */}
        <div className="flex md:hidden items-center gap-3">
          {isAdmin && <NotificationBell />}

          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-green-600 focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (شاشات الهواتف) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pt-4 pb-6 flex flex-col gap-4 shadow-lg animate-fadeIn">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-600 font-medium py-1"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-green-600 font-medium py-1"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-green-600 font-medium py-1"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <hr className="border-gray-200 my-1" />

          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full text-center cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;