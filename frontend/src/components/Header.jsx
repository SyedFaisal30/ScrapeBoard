import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import logo from "../assets/logo1.png";

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/">
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className="w-5 h-6" />
          <h1 className="text-xl sm:text-3xl font-bold text-blue-600">ScrapeBoard</h1>
        </div>
      </Link>

      <nav className="flex items-center gap-4 sm:gap-6 text-gray-700 font-medium">
        <Link to="/dashboard" className="hover:text-blue-600 flex items-center ">
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        {!user ? (
          <Link to="/login" className="hover:text-blue-600 flex items-center gap-1">
            <LogIn size={18} /> Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-red-600 flex items-center text-red-500 cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
