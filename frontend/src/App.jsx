import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import FrindesPages from './pages/FrindesPages'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <PostProvider>
            <ToastContainer position='top-right' autoClose={3000} />
            <Navbar />
            <Routes>
              {/* Public routes */}
              <Route path='/' element={<HomePage />} />

              {/* Public only routes - redirect to home if already logged in */}
              <Route
                path='/register'
                element={
                  <PublicOnlyRoute>
                    <Register />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path='/login'
                element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                }
              />

              {/* Protected routes - require authentication */}
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile/:userId'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/community'
                element={
                  <ProtectedRoute>
                    <FrindesPages />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route for 404 */}
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </PostProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
