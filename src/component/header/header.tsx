import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header: React.FC = () => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
      <span className="text-xl font-semibold">Kwasel Media</span>
    </div>
    <div className="space-x-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        <Link to="/login">Login</Link>
      </button>
      <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
        <Link to="/signUp">Register Now!</Link>
      </button>
    </div>
  </header>
);

export default Header;
