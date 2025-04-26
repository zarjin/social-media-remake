import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(formData);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="w-full h-screen flex justify-center items-center font-Roboto bg-gradient-to-br from-blue-900 via-black to-purple-900 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{ bottom: '5%', right: '10%' }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Welcome Back</h1>
            <p className="text-blue-200 text-center mb-8">Sign in to your account</p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="email" className="block mb-2 text-blue-200 font-medium">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={18} className="text-blue-300" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setformData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 p-3 rounded-lg bg-white/5 border border-blue-500/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className="block mb-2 text-blue-200 font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock size={18} className="text-blue-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  onChange={(e) => setformData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 p-3 rounded-lg bg-white/5 border border-blue-500/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-blue-300 hover:text-blue-100 transition-colors"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-blue-300 hover:text-blue-100 transition-colors"
                    />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-blue-300 hover:text-blue-100 transition-colors">
                  Forgot password?
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-medium flex items-center justify-center hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <LogIn size={18} className="mr-2" />
                )}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-blue-200">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
