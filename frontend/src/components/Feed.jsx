import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../context/PostContext'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'
import CreatePost from './CreatePost'
import PostCard from './PostCard'
import { RefreshCw, Users, Zap } from 'lucide-react'
import axios from 'axios'

export default function Feed() {
  const { posts, loading, getTimelinePosts } = useContext(PostContext)
  const { isAuthentication } = useContext(AuthContext)
  const { userData } = useContext(UserContext)

  const [currentUser, setCurrentUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (isAuthentication) {
        try {
          const USER_API = import.meta.env.VITE_USER_API
          const { data } = await axios.get(`${USER_API}/get-auth-user`, {
            withCredentials: true,
          })
          setCurrentUser(data)
        } catch (error) {
          console.error('Error fetching current user:', error)
        } finally {
          setLoadingUser(false)
        }
      } else {
        setLoadingUser(false)
      }
    }

    fetchCurrentUser()
  }, [isAuthentication])

  // Refresh posts when component mounts
  useEffect(() => {
    getTimelinePosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loadingUser) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='relative'>
          <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-200'></div>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 absolute top-0 left-0'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-2xl mx-auto px-4'>
      {/* Feed Header - Only visible when authenticated */}
      {isAuthentication && (
        <div className='flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-md border border-gray-100'>
          <h2 className='text-xl font-bold text-gray-800 flex items-center'>
            <Zap size={24} className='text-blue-500 mr-2' />
            Your Feed
          </h2>

          <div className='flex space-x-2'>
            <button
              onClick={() => getTimelinePosts()}
              className='flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 text-sm font-medium'
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button className='flex items-center space-x-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-600 text-sm font-medium'>
              <Users size={16} />
              <span>Friends</span>
            </button>
          </div>
        </div>
      )}

      {/* Create Post Section */}
      {isAuthentication && currentUser && <CreatePost userData={currentUser} />}

      {/* Posts Feed */}
      {loading ? (
        <div className='flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-md p-8 border border-gray-100'>
          <div className='relative mb-4'>
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-200'></div>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 absolute top-0 left-0'></div>
          </div>
          <p className='text-gray-500 animate-pulse'>Loading posts...</p>
        </div>
      ) : posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} currentUserId={currentUser?._id} />
          ))}

          {/* Load More Button */}
          <div className='flex justify-center my-8'>
            <button className='px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 font-medium flex items-center space-x-2'>
              <RefreshCw size={18} />
              <span>Load More</span>
            </button>
          </div>
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-lg p-10 text-center border border-gray-100'>
          <div className='w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Zap size={32} className='text-blue-500' />
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-3'>No Posts Yet</h3>
          <p className='text-gray-600 max-w-md mx-auto mb-6'>
            {isAuthentication
              ? 'Create your first post or follow users to see their posts here!'
              : 'Login to see posts from your network!'}
          </p>
          {isAuthentication && (
            <button
              onClick={() => getTimelinePosts()}
              className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium'
            >
              Refresh Feed
            </button>
          )}
        </div>
      )}
    </div>
  )
}
