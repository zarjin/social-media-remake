import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Friends from './pages/Friends.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
