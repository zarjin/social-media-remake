import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'
import { Pencil, UserPlus, UserMinus } from 'lucide-react'
import ProfileEdit from './ProfileEdit'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const { isAuthentication } = useContext(AuthContext)
  const { userFollow } = useContext(UserContext)
  const { userId } = useParams() // Get userId from URL if available

  const [showEditForm, setShowEditForm] = useState(false)
  const [userData, setUserData] = useState({
    _id: '',
    name: 'John Doe',
    work: 'Web Developer & Designer',
    about:
      'Passionate developer with 5+ years of experience. Loves to create beautiful and functional user experiences.',
    profile: 'https://randomuser.me/api/portraits/men/32.jpg',
    cover:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80',
    follower: [],
    following: [],
  })
  const [isCurrentUser, setIsCurrentUser] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthentication) {
        try {
          const USER_API = import.meta.env.VITE_USER_API

          // First get current authenticated user
          const authUserResponse = await axios.get(`${USER_API}/get-auth-user`, {
            withCredentials: true,
          })

          const authUser = authUserResponse.data

          // If userId is provided in URL, fetch that user's profile
          if (userId && userId !== authUser._id) {
            const userResponse = await axios.get(`${USER_API}/get-user/${userId}`, {
              withCredentials: true,
            })

            const profileUser = userResponse.data

            setUserData({
              _id: profileUser._id,
              name: profileUser.name || 'User',
              work: profileUser.work || 'Not specified',
              about: profileUser.about || 'No information provided',
              profile: profileUser.profile || 'https://randomuser.me/api/portraits/men/32.jpg',
              cover:
                profileUser.cover ||
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80',
              follower: profileUser.follower || [],
              following: profileUser.following || [],
            })

            // Check if current user is following this profile
            setIsFollowing(profileUser.follower.includes(authUser._id))
            setIsCurrentUser(false)
          } else {
            // Show current user's profile
            setUserData({
              _id: authUser._id,
              name: authUser.name || 'User',
              work: authUser.work || 'Not specified',
              about: authUser.about || 'No information provided',
              profile: authUser.profile || 'https://randomuser.me/api/portraits/men/32.jpg',
              cover:
                authUser.cover ||
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80',
              follower: authUser.follower || [],
              following: authUser.following || [],
            })
            setIsCurrentUser(true)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchUserData()
  }, [isAuthentication, showEditForm, userId])

  // Toggle edit form
  const toggleEditForm = () => {
    setShowEditForm(!showEditForm)
  }

  // Animation classes
  const profileCardClasses =
    'w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-8 transition-all duration-300 transform hover:shadow-xl'

  return (
    <main className={profileCardClasses}>
      {/* Cover Photo */}
      <div className='relative w-full h-60 bg-gradient-to-r from-blue-400 to-purple-500'>
        <img
          src={userData.cover}
          alt='Cover'
          className='w-full h-full object-cover transition-opacity duration-300'
        />

        {/* Edit Button (only shown for current user) */}
        {isCurrentUser && (
          <button
            onClick={toggleEditForm}
            className='absolute top-4 right-4 p-2 bg-white bg-opacity-75 rounded-full shadow-md hover:bg-opacity-100 transition-all transform hover:scale-105'
          >
            <Pencil size={20} className='text-gray-700' />
          </button>
        )}

        {/* Profile Picture */}
        <div className='absolute -bottom-16 left-1/2 transform -translate-x-1/2 transition-all duration-300'>
          <div className='w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200'>
            <img
              src={userData.profile}
              alt='Profile'
              className='w-full h-full object-cover transition-opacity duration-300'
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className='pt-20 pb-8 px-8 text-center'>
        <h2 className='text-2xl font-bold text-gray-800'>{userData.name}</h2>
        <p className='text-gray-500 mb-4'>{userData.work}</p>

        <div className='flex justify-center gap-4 mb-6'>
          {!isCurrentUser && (
            <button
              onClick={() => {
                userFollow(userData._id)
                setIsFollowing(!isFollowing) // Optimistically update UI
              }}
              className={`px-4 py-2 ${
                isFollowing ? 'bg-gray-600' : 'bg-blue-600'
              } text-white rounded-full shadow hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center space-x-2`}
            >
              {isFollowing ? (
                <>
                  <UserMinus size={18} />
                  <span>Unfollow</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Follow</span>
                </>
              )}
            </button>
          )}

          {!isCurrentUser && (
            <div className='flex space-x-4 mt-2 text-sm text-gray-500'>
              <div>
                <span className='font-semibold'>{userData.follower?.length || 0}</span> followers
              </div>
              <div>
                <span className='font-semibold'>{userData.following?.length || 0}</span> following
              </div>
            </div>
          )}
        </div>

        {/* Works */}
        <div className='mb-6 transition-all duration-300 hover:bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>Works</h3>
          <p className='text-gray-600'>
            {userData.work ||
              'Building modern web applications with React, Node.js, and Tailwind CSS.'}
          </p>
        </div>

        {/* About */}
        <div className='transition-all duration-300 hover:bg-gray-50 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>About</h3>
          <p className='text-gray-600'>{userData.about}</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditForm && <ProfileEdit onClose={toggleEditForm} userData={userData} />}
    </main>
  )
}
