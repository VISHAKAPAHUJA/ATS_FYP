import { FaBell, FaHome, FaUser } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleLogout = () => {
    // Optional: Clear user session/token (if using localStorage)
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    
    // Redirect to login
    navigate('/login');
  };
  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="navbar-glass p-3 rounded-full float-effect">
              <FaHandshake className="text-2xl text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Talent<span className="font-light">Match</span>
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-white hover:text-blue-100 transition">
                <FaHome className="mr-1 inline" /> Dashboard
              </a>
              <a href="#" className="text-white hover:text-blue-100 transition">
                <FaBell className="mr-1 inline" /> Alerts
              </a>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
                <FaUser className="text-white" />
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Settings</a>
                {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Log out</a> */}
                <button 
              onClick={handleLogout} // Use onClick instead of href
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Log out
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;