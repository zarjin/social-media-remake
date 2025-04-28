import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { PostContext } from '../context/PostContext'
import { AuthContext } from '../context/AuthContext'
import { Heart, MessageCircle, Share, MoreVertical, Trash2 } from 'lucide-react'

export default function PostCard({ post, currentUserId }) {
  const { likePost, deletePost } = useContext(PostContext)
  const { isAuthentication } = useContext(AuthContext)

  const [showOptions, setShowOptions] = useState(false)

  // Check if current user has liked the post
  const isLiked = post.likes.includes(currentUserId)

  // Check if current user is the post author
  const isAuthor = post.userId._id === currentUserId

  // Format the post date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return 'just now'
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`
    }

    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`
  }

  const formattedDate = formatDate(post.createdAt)

  // Handle like/unlike
  const handleLike = () => {
    if (!isAuthentication) return
    likePost(post._id)
  }

  // Handle post deletion
  const handleDelete = () => {
    if (!isAuthentication || !isAuthor) return

    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post._id)
    }

    setShowOptions(false)
  }

  return (
    <div className='bg-white rounded-xl shadow-lg p-5 mb-8 hover:shadow-xl transition-all duration-300 border border-gray-100'>
      {/* Post Header */}
      <div className='flex justify-between items-center mb-5'>
        <div className='flex items-center space-x-3'>
          <Link to={`/profile/${post.userId._id}`} className='relative group'>
            <div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300'></div>
            <img
              src={post.userId.profile || 'https://randomuser.me/api/portraits/men/32.jpg'}
              alt={post.userId.name}
              className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md z-10 relative transition-transform group-hover:scale-105'
            />
          </Link>
          <div>
            <Link
              to={`/profile/${post.userId._id}`}
              className='font-semibold text-gray-800 hover:text-blue-600 transition-colors text-lg'
            >
              {post.userId.name}
            </Link>
            <p className='text-xs text-gray-500 flex items-center'>
              <span className='inline-block w-2 h-2 rounded-full bg-green-400 mr-1'></span>
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Post Options (only for author) */}
        {isAuthor && (
          <div className='relative'>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className='p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-md'
            >
              <MoreVertical size={20} className='text-gray-600' />
            </button>

            {showOptions && (
              <div className='absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-100 overflow-hidden animate-pulse'>
                <button
                  onClick={handleDelete}
                  className='w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-all duration-300'
                >
                  <Trash2 size={16} />
                  <span>Delete Post</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className='mb-5'>
        <p className='text-gray-700 whitespace-pre-line text-base leading-relaxed'>{post.desc}</p>
      </div>

      {/* Post Image (if any) */}
      {post.img && (
        <div className='mb-5 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
          <img
            src={post.img}
            alt='Post'
            className='w-full h-auto object-cover max-h-[500px] hover:scale-[1.01] transition-transform duration-700'
          />
        </div>
      )}

      {/* Post Stats */}
      <div className='flex items-center justify-between text-sm text-gray-500 mb-4 px-1'>
        <div className='flex items-center space-x-1'>
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              isLiked ? 'bg-red-100' : 'bg-gray-100'
            } transition-colors duration-300`}
          >
            <Heart
              size={14}
              className={`${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
            />
          </div>
          <span className='font-medium'>{post.likes.length}</span>
        </div>

        <div className='flex space-x-4 text-xs font-medium'>
          <span className='hover:text-blue-500 transition-colors cursor-pointer'>0 comments</span>
          <span className='hover:text-blue-500 transition-colors cursor-pointer'>0 shares</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 ${
            isLiked ? 'text-red-500 font-medium' : 'text-gray-600'
          }`}
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${isLiked ? 'fill-red-500 scale-110' : ''}`}
          />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>

        <button className='flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 text-gray-600'>
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>

        <button className='flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 text-gray-600'>
          <Share size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  )
}
