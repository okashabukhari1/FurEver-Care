import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X, Clock, MapPin, Users } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface NavbarProps {
  showUserInfo?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showUserInfo = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, currentTime, location, visitorCount } = useUser();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Pet Care', path: '/petcare' },
    { name: 'Products', path: '/products' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Emergency', path: '/emergency' },
    { name: 'Adoption', path: '/adoption' },
    { name: 'AdoptionRequests', path: '/AdoptionRequests' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <>
      {/* Scrolling Ticker */}
      {showUserInfo && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 overflow-hidden">
          <motion.div
            animate={{ x: [1200, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap flex items-center space-x-8 text-sm"
          >
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {currentTime}
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {location}
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Visitors: {visitorCount.toLocaleString()}
            </span>
            <span>🐾 New pet care tips available!</span>
            <span>🏥 24/7 Emergency veterinary support</span>
            <span>🎉 Adoption drive this weekend!</span>
          </motion.div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Heart className="h-8 w-8 text-pink-500 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FurEver Care
              </span>
            </motion.div>

            {/* User Info */}
            {showUserInfo && user.name && (
              <div className="hidden md:flex items-center">
                <span className="text-sm text-gray-600">Welcome to FurEver,</span>
                <span className="font-semibold text-gray-800">{user.name}</span>
                {user.petName && (
                  <span className="text-sm text-gray-600">& {user.petName}</span>
                )}
              </div>
            )}

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative group font-medium transition-colors duration-300 ${
                        isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                      }`
                    }
                  >
                    {item.name}
                    <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-purple-600 transition-all duration-300 w-0 group-hover:w-full group-[aria-current=page]:w-full"></span>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {user.name && (
                <div className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                  Welcome, <span className="font-semibold">{user.name}</span>
                  {user.petName && <span> & {user.petName}</span>}
                </div>
              )}
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative group block px-3 py-2 rounded-md transition-colors duration-300 ${
                      isActive
                        ? 'text-purple-700 bg-purple-100'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <span className="pointer-events-none absolute bottom-0 left-3 right-3 mx-auto h-0.5 bg-purple-600 transition-all duration-300 w-0 group-hover:w-[calc(100%-24px)] group-[aria-current=page]:w-[calc(100%-24px)]"></span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;