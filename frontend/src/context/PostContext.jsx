import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const POST_API = import.meta.env.VITE_POST_API;
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new post
  const createPost = async (postData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${POST_API}/create-post`, postData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Refresh posts after creating a new one
      getTimelinePosts();
      toast.success(data.message);
    } catch (error) {
      console.error("Create post error:", error);
      toast.error(error.response?.data?.message || "Failed to create post");
      setError(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  // Like or unlike a post
  const likePost = async (postId) => {
    try {
      const { data } = await axios.put(
        `${POST_API}/like-post/${postId}`,
        {},
        { withCredentials: true }
      );
      
      // Update the posts state to reflect the like/unlike
      setPosts(
        posts.map((post) =>
          post._id === postId
            ? { ...post, likes: data.post.likes }
            : post
        )
      );
      
      toast.success(data.message);
    } catch (error) {
      console.error("Like post error:", error);
      toast.error(error.response?.data?.message || "Failed to like post");
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      const { data } = await axios.delete(`${POST_API}/delete-post/${postId}`, {
        withCredentials: true,
      });
      
      // Remove the deleted post from state
      setPosts(posts.filter((post) => post._id !== postId));
      
      toast.success(data.message);
    } catch (error) {
      console.error("Delete post error:", error);
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  };

  // Get all posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${POST_API}/get-all-posts`, {
        withCredentials: true,
      });
      setPosts(data);
    } catch (error) {
      console.error("Get all posts error:", error);
      setError(error.response?.data?.message || "Failed to fetch posts");
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Get timeline posts (posts from user and followed users)
  const getTimelinePosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${POST_API}/get-timeline-posts`, {
        withCredentials: true,
      });
      setPosts(data);
    } catch (error) {
      console.error("Get timeline posts error:", error);
      setError(error.response?.data?.message || "Failed to fetch timeline posts");
      toast.error(error.response?.data?.message || "Failed to fetch timeline posts");
    } finally {
      setLoading(false);
    }
  };

  // Get a single post
  const getPost = async (postId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${POST_API}/get-post/${postId}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error("Get post error:", error);
      setError(error.response?.data?.message || "Failed to fetch post");
      toast.error(error.response?.data?.message || "Failed to fetch post");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load timeline posts on component mount
  useEffect(() => {
    getTimelinePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        createPost,
        likePost,
        deletePost,
        getAllPosts,
        getTimelinePosts,
        getPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
