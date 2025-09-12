import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Menu, X, Clock, MapPin, Users, ChevronDown } from "lucide-react";
import { useUser } from "../context/UserContext";

interface NavbarProps {
  showUserInfo?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showUserInfo = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeDropdownTimeout = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeDropdownTimeout.current) {
      clearTimeout(closeDropdownTimeout.current);
      closeDropdownTimeout.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeDropdownTimeout.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Only pull user from context
  const { user } = useUser();
  const navigate = useNavigate();

  // Fake defaults until you wire real values
  const currentTime = new Date().toLocaleTimeString();
  const location = "Karachi, PK";
  const visitorCount = 1200;

  const menuItems = [
    { name: "Home", path: "/" },
    {
      name: "Pet Care",
      path: "/petcare",
      dropdown: [
        { name: "Products", path: "/products" },
        { name: "Wishlist", path: "/wishlist" },
        { name: "Emergency", path: "/emergency" },
      ],
    },
    {
      name: "Adoption",
      path: "/adoption",
      dropdown: [{ name: "Adoption Requests", path: "/AdoptionRequests" }],
    },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/contact" },
    { name: "Feedback", path: "/Feedback" },
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
      <nav className="bg-white/85 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/Images/FurEver-Care-logo.svg"   // ✅ put your logo file in public/logo.png
                alt="FurEver Care Logo"
                className="h-[90px] w-auto mt-4"
              />
            </motion.div>

            {/* User Info */}
            {showUserInfo && user?.name && (
              <div className="hidden md:flex gap-2 items-center">
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
                  className="relative"
                  onMouseEnter={() => {
                    if (item.dropdown) {
                      cancelClose();
                      setActiveDropdown(item.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.dropdown) {
                      scheduleClose();
                    }
                  }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative group font-medium transition-colors duration-300 flex items-center ${isActive
                        ? "text-purple-600"
                        : "text-gray-700 hover:text-purple-600"
                      }`
                    }
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-purple-600 transition-all duration-300 w-0 group-hover:w-full group-[aria-current=page]:w-full"></span>
                  </NavLink>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <NavLink
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={({ isActive }) => {
                            const isNoBg =
                              dropdownItem.path === "/wishlist" ||
                              dropdownItem.path === "/AdoptionRequests";
                            const isWishlist = dropdownItem.path === "/wishlist";
                            const activeClass = isWishlist
                              ? "text-gray-700"
                              : isNoBg
                                ? "text-purple-600"
                                : "text-purple-600 bg-purple-50";
                            const inactiveClass =
                              "text-gray-700 hover:text-purple-600 hover:bg-purple-50";
                            return `block px-4 py-2 text-sm transition-colors duration-200 ${isActive ? activeClass : inactiveClass
                              }`;
                          }}
                        >
                          {dropdownItem.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {user?.name && (
                <div className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                  Welcome, <span className="font-semibold">{user.name}</span>
                  {user.petName && <span> & {user.petName}</span>}
                </div>
              )}
              {menuItems.map((item) => (
                <div key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative group block px-3 py-2 rounded-md transition-colors duration-300 ${isActive
                        ? "text-purple-700 bg-purple-100"
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <span className="pointer-events-none absolute bottom-0 left-3 right-3 mx-auto h-0.5 bg-purple-600 transition-all duration-300 w-0 group-hover:w-[calc(100%-24px)] group-[aria-current=page]:w-[calc(100%-24px)]"></span>
                  </NavLink>

                  {/* Mobile Dropdown Items */}
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <NavLink
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={({ isActive }) => {
                            const isNoBg =
                              dropdownItem.path === "/wishlist" ||
                              dropdownItem.path === "/AdoptionRequests";
                            const isWishlist = dropdownItem.path === "/wishlist";
                            const activeClass = isWishlist
                              ? "text-gray-600"
                              : isNoBg
                                ? "text-purple-600"
                                : "text-purple-600 bg-purple-50";
                            const inactiveClass =
                              "text-gray-600 hover:text-purple-600 hover:bg-purple-50";
                            return `block px-3 py-2 text-sm rounded-md transition-colors duration-300 ${isActive ? activeClass : inactiveClass
                              }`;
                          }}
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
