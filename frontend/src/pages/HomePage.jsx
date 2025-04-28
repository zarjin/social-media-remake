import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Feed from '../components/Feed'
import { Link } from 'react-router-dom'
import { UserPlus, Users, LogIn, Globe, Sparkles, MessageSquare } from 'lucide-react'

export default function HomePage() {
  const { isAuthentication } = useContext(AuthContext)

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8'>
      <div className='container mx-auto px-4'>
        {/* Welcome Banner (only for non-authenticated users) */}
        {!isAuthentication && (
          <div className='mb-12'>
            {/* Hero Section */}
            <div className='bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100'>
              <div className='flex flex-col md:flex-row'>
                {/* Left Content */}
                <div className='p-8 md:p-12 md:w-3/5'>
                  <h1 className='text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    Welcome to NetBook
                  </h1>
                  <p className='text-gray-600 mb-8 text-lg leading-relaxed'>
                    Connect with friends, share moments, and discover what's happening in your
                    community.
                  </p>

                  <div className='flex flex-wrap gap-4 mb-8'>
                    <Link
                      to='/register'
                      className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2 font-medium'
                    >
                      <UserPlus size={20} />
                      <span>Sign Up</span>
                    </Link>
                    <Link
                      to='/login'
                      className='px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2 font-medium transform hover:scale-105'
                    >
                      <LogIn size={20} />
                      <span>Login</span>
                    </Link>
                  </div>

                  {/* Feature List */}
                  <div className='space-y-4'>
                    <div className='flex items-start space-x-3'>
                      <div className='bg-blue-100 p-2 rounded-lg'>
                        <Globe size={20} className='text-blue-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Connect Globally</h3>
                        <p className='text-gray-600 text-sm'>
                          Find and connect with people from around the world
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <div className='bg-purple-100 p-2 rounded-lg'>
                        <Sparkles size={20} className='text-purple-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Share Moments</h3>
                        <p className='text-gray-600 text-sm'>
                          Post updates, photos, and experiences with your network
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3'>
                      <div className='bg-green-100 p-2 rounded-lg'>
                        <MessageSquare size={20} className='text-green-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-800'>Engage in Conversations</h3>
                        <p className='text-gray-600 text-sm'>
                          Comment, like, and interact with content from your friends
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className='md:w-2/5 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-6 md:p-0'>
                  <img
                    src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
                    alt='People connecting'
                    className='rounded-xl shadow-lg max-h-80 object-cover'
                  />
                </div>
              </div>
            </div>

            {/* Community Link */}
            <div className='mt-8 text-center'>
              <Link
                to='/community'
                className='inline-flex items-center space-x-2 px-8 py-4 bg-white border border-purple-200 text-purple-600 rounded-full hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium'
              >
                <Users size={20} />
                <span>Explore Community</span>
              </Link>
            </div>
          </div>
        )}

        {/* Feed Section */}
        <div className={!isAuthentication ? 'max-w-4xl mx-auto' : ''}>
          <Feed />
        </div>
      </div>
    </main>
  )
}
