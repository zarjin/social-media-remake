import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { X, Upload, Camera } from "lucide-react";

export default function ProfileEdit({ onClose, userData }) {
  const { userUpdate } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    about: userData?.about || "",
    work: userData?.work || "",
  });
  
  const [files, setFiles] = useState({
    profile: null,
    cover: null,
  });
  
  const [previewUrls, setPreviewUrls] = useState({
    profile: userData?.profile || null,
    cover: userData?.cover || null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    
    if (selectedFiles && selectedFiles[0]) {
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(selectedFiles[0]);
      
      setFiles({
        ...files,
        [name]: selectedFiles[0],
      });
      
      setPreviewUrls({
        ...previewUrls,
        [name]: previewUrl,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData object for file uploads
      const updateData = new FormData();
      updateData.append("about", formData.about);
      updateData.append("work", formData.work);
      
      if (files.profile) {
        updateData.append("profile", files.profile);
      }
      
      if (files.cover) {
        updateData.append("cover", files.cover);
      }
      
      // Call the userUpdate function from context
      await userUpdate(updateData);
      
      // Close the edit form after successful update
      onClose();
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl animate-fade-in-up">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cover Photo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cover Photo</label>
            <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
              {previewUrls.cover && (
                <img 
                  src={previewUrls.cover} 
                  alt="Cover Preview" 
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="p-3 rounded-full bg-white bg-opacity-75 cursor-pointer hover:bg-opacity-100 transition-all shadow-md">
                  <input
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Camera size={24} className="text-gray-700" />
                </label>
              </div>
            </div>
          </div>
          
          {/* Profile Photo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <div className="relative w-32 h-32 mx-auto bg-gray-100 rounded-full overflow-hidden">
              {previewUrls.profile && (
                <img 
                  src={previewUrls.profile} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="p-2 rounded-full bg-white bg-opacity-75 cursor-pointer hover:bg-opacity-100 transition-all shadow-md">
                  <input
                    type="file"
                    name="profile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Camera size={20} className="text-gray-700" />
                </label>
              </div>
            </div>
          </div>
          
          {/* Work Information */}
          <div className="space-y-2">
            <label htmlFor="work" className="block text-sm font-medium text-gray-700">Work</label>
            <input
              type="text"
              id="work"
              name="work"
              value={formData.work}
              onChange={handleInputChange}
              placeholder="What do you do?"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          
          {/* About Information */}
          <div className="space-y-2">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all resize-none"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 mr-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Upload size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
