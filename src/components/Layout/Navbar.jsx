import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiSearch, FiHome, FiGrid, FiPhone, FiMail, FiInfo } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-card/95 backdrop-blur-md shadow-2xl border-b border-gray-800' 
          : 'bg-dark-card shadow-lg'
      }`}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-primary-400 bg-clip-text text-transparent">
                MasterComputer
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1 group">
                <FiHome size={18} className="group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </Link>
              <Link to="/shop" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1 group">
                <FiGrid size={18} className="group-hover:scale-110 transition-transform" />
                <span>Shop</span>
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1 group">
                <FiInfo size={18} className="group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1 group">
                <FiPhone size={18} className="group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-dark-bg border border-gray-700 rounded-full px-4 py-1 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none px-2 py-1 w-80 text-white placeholder-gray-500"
              />
              <button type="submit" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FiSearch size={20} />
              </button>
            </form>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://t.me/hortmenghor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                <FiMail size={22} />
              </a>
              
              <button className="text-gray-300 hover:text-primary-400 transition-colors">
                <FiUser size={22} />
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 animate-slideDown">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white py-2 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiHome size={18} />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/shop" 
                  className="text-gray-300 hover:text-white py-2 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiGrid size={18} />
                  <span>Shop</span>
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white py-2 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiInfo size={18} />
                  <span>About</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white py-2 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiPhone size={18} />
                  <span>Contact</span>
                </Link>
                
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex items-center bg-dark-bg border border-gray-700 rounded-full px-4 py-2 mt-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-white placeholder-gray-500"
                  />
                  <button type="submit" className="text-gray-400">
                    <FiSearch size={20} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;