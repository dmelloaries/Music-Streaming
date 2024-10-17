
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Heart } from 'lucide-react';

const SideNavbar = () => {
  return (
    <div className="w-64 bg-black text-gray-300 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">GRS-Player</h1>
      </div>
      
      <nav className="space-y-4">
        <NavLink to="/" className={({ isActive }) => `flex items-center space-x-3 ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors`}>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `flex items-center space-x-3 ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors`}>
          <Search size={20} />
          <span>Search</span>
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `flex items-center space-x-3 ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors`}>
          <Library size={20} />
          <span>Your Library</span>
        </NavLink>
      </nav>
      
      <div className="mt-auto">
       
      </div>
    </div>
  );
};

export default SideNavbar;