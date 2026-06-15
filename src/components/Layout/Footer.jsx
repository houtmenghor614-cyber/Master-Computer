import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiGithub, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-card border-t border-gray-800 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-xl font-bold text-white">MasterComputer</h3>
            </div>
            <p className="text-dark-textMuted leading-relaxed">
              Your one-stop shop for premium computer accessories and electronics.
            </p>
            <div className="flex space-x-4 mt-4">
              <button 
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="text-dark-textMuted hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </button>
              <button 
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="text-dark-textMuted hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </button>
              <button 
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="text-dark-textMuted hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </button>
              <button 
                onClick={() => window.open('https://github.com', '_blank')}
                className="text-dark-textMuted hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-dark-textMuted hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-dark-textMuted hover:text-primary-400 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-dark-textMuted hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-dark-textMuted hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 text-dark-textMuted">
              <li className="flex items-start space-x-3"><FiMapPin className="mt-1 text-primary-400" /><span>123 Computer Street, Tech City</span></li>
              <li className="flex items-center space-x-3"><FiPhone className="text-primary-400" /><span>+1 (234) 567-8900</span></li>
              <li className="flex items-center space-x-3"><FiMail className="text-primary-400" /><span>info@mastercomputer.com</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-dark-textMuted mb-3">Subscribe for exclusive offers!</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-lg bg-dark-bg border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
              <button type="button" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-dark-textMuted">
          <p>&copy; {currentYear} MasterComputer. Made with <FiHeart className="inline text-red-500 animate-pulse" size={14} /> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;