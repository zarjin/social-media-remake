import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function Register() {
  const { register } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    register(formData);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <main className="w-full h-screen flex justify-center items-center font-Roboto bg-gradient-to-br from-blue-900 via-black to-purple-900 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
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
          style={{ top: '10%', right: '15%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
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
          style={{ bottom: '5%', left: '10%' }}
        />
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold mb-2 text-white text-center">
              {step === 1 && 'Create Account'}
              {step === 2 && 'Almost There'}
              {step === 3 && 'Success!'}
            </h1>
            <p className="text-blue-200 text-center">
              {step === 1 && 'Fill in your details to get started'}
              {step === 2 && 'Set up your password'}
              {step === 3 && 'Your account has been created'}
            </p>
          </motion.div>

          {/* Progress indicator */}
          {step < 3 && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center w-2/3">
                <motion.div
                  className={`h-2 rounded-l-full ${
                    step >= 1 ? 'bg-blue-500' : 'bg-gray-600'
                  } flex-1`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
                <motion.div
                  className={`h-2 rounded-r-full ${
                    step >= 2 ? 'bg-blue-500' : 'bg-gray-600'
                  } flex-1`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step >= 2 ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={nextStep}
              >
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="name" className="block mb-2 text-blue-200 font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-blue-300" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 rounded-lg bg-white/5 border border-blue-500/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="email" className="block mb-2 text-blue-200 font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={18} className="text-blue-300" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 rounded-lg bg-white/5 border border-blue-500/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-medium flex items-center justify-center hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                </motion.div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="password" className="block mb-2 text-blue-200 font-medium">
                    Create Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock size={18} className="text-blue-300" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 rounded-lg bg-white/5 border border-blue-500/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Create a strong password"
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
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="text-xs text-blue-200 flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      ></div>
                      At least 8 characters
                    </div>
                    <div className="text-xs text-blue-200 flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      ></div>
                      At least one uppercase letter
                    </div>
                    <div className="text-xs text-blue-200 flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          /[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      ></div>
                      At least one number
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-transparent border border-blue-500/50 text-white p-3 rounded-lg font-medium flex items-center justify-center hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-medium flex items-center justify-center hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} className="mr-2" />
                        Create Account
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="mb-6 bg-green-500/20 p-4 rounded-full"
                >
                  <CheckCircle size={60} className="text-green-500" />
                </motion.div>
                <h2 className="text-xl text-white font-medium mb-2">
                  Account Created Successfully!
                </h2>
                <p className="text-blue-200 text-center mb-8">
                  You can now login with your credentials
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium inline-block hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Go to Login
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 3 && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-blue-200">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
