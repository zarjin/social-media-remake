import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import { Home, Users, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg flex items-center justify-between px-6 font-Roboto"
    >
      <Link
        to="/"
        className="text-2xl font-bold text-white hover:text-blue-200 transition-colors duration-300"
      >
        SocialApp
      </Link>
      <div className="flex items-center space-x-6">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link to="/" className="text-white hover:text-blue-200 transition-colors duration-300">
            <Home size={28} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            to="/friends"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            <Users size={28} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            to="/profile"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            <UserCircle size={28} />
          </Link>
        </motion.div>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100 transition-colors duration-300 shadow-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100 transition-colors duration-300 shadow-md"
          >
            Login
          </Link>
        )}
      </motion.div>
    </motion.nav>
  );
}
