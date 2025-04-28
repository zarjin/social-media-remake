import { useState, useContext } from 'react'
import { PostContext } from '../context/PostContext'
import { AuthContext } from '../context/AuthContext'
import { Image, X, Send, Smile, MapPin, Calendar } from 'lucide-react'
import { toast } from 'react-toastify'

export default function CreatePost({ userData }) {
  const { createPost } = useContext(PostContext)
  const { isAuthentication } = useContext(AuthContext)

  const [postText, setPostText] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      setPostImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Remove selected image
  const removeImage = () => {
    setPostImage(null)
    setImagePreview(null)
  }

  // Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthentication) {
      toast.error('Please login to create a post')
      return
    }

    if (!postText.trim() && !postImage) {
      toast.error('Please add some text or an image to post')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('desc', postText)

      if (postImage) {
        formData.append('img', postImage)
      }

      await createPost(formData)

      // Reset form after successful submission
      setPostText('')
      setPostImage(null)
      setImagePreview(null)
    } catch (error) {
      console.error('Post submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300'>
      <div className='flex items-start space-x-4'>
        {/* User Avatar with gradient border */}
        <div className='relative min-w-[48px]'>
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-[1px]'></div>
          <img
            src={userData?.profile || 'https://randomuser.me/api/portraits/men/32.jpg'}
            alt='User'
            className='w-12 h-12 rounded-full object-cover border-2 border-white relative z-10'
          />
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className='flex-1'>
          <div className='mb-4 relative group'>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind?"
              className='w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50 group-hover:bg-white transition-all duration-300 text-gray-700'
              rows='3'
              style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}
            ></textarea>
            <div className='absolute bottom-3 right-3 text-gray-400'>
              <Smile size={20} className='hover:text-yellow-500 cursor-pointer transition-colors' />
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className='relative mb-4 rounded-xl overflow-hidden shadow-md group'>
              <img
                src={imagePreview}
                alt='Post Preview'
                className='max-h-80 w-full object-contain bg-black bg-opacity-5 group-hover:scale-[1.01] transition-transform duration-500'
              />
              <button
                type='button'
                onClick={removeImage}
                className='absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all hover:rotate-90 duration-300'
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-wrap items-center justify-between bg-gray-50 p-3 rounded-xl'>
            <div className='flex items-center space-x-4'>
              {/* Image Upload Button */}
              <label className='flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-300 p-2 rounded-lg hover:bg-blue-50'>
                <Image size={20} className='text-blue-500' />
                <span className='font-medium text-sm'>Photo</span>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                />
              </label>

              {/* Additional buttons for visual appeal */}
              <button
                type='button'
                className='flex items-center space-x-2 text-gray-600 p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-300'
              >
                <MapPin size={20} className='text-green-500' />
                <span className='font-medium text-sm'>Location</span>
              </button>

              <button
                type='button'
                className='flex items-center space-x-2 text-gray-600 p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-all duration-300'
              >
                <Calendar size={20} className='text-purple-500' />
                <span className='font-medium text-sm'>Event</span>
              </button>
            </div>

            {/* Post Button */}
            <button
              type='submit'
              disabled={isSubmitting || (!postText.trim() && !postImage)}
              className={`px-5 py-2.5 rounded-xl flex items-center space-x-2 font-medium shadow-sm ${
                isSubmitting || (!postText.trim() && !postImage)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-[1.02] active:scale-[0.98]'
              } transition-all duration-300`}
            >
              <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
              <span>{isSubmitting ? 'Posting...' : 'Share Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
