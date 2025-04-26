import postModel from "../models/post.models.js";
import userModel from "../models/user.models.js";

export const createPost = async (req, res) => {
  const { desc } = req.body;
  const userId = req.user.id;
  try {
    if (!desc) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newPost = new postModel({
      userId,
      desc,
      img: req.file?.path,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res
      .staus(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const likePost = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);
    const updateOperator = alreadyLiked ? "$pull" : "$push";

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      {
        [updateOperator]: { likes: userId },
      },
      { new: true }
    );

    res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update like status",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;
  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      {
        desc,
        img: req.file?.path,
      },
      { new: true }
    );
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res
      .staus(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate("userId");
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getTimelinePosts = async (req, res) => {
  const userId = req.user.id;
  try {
    const currentUser = await userModel.findById(userId);
    const userPosts = await postModel
      .find({ userId: currentUser._id })
      .populate("userId");
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return postModel.find({ userId: friendId }).populate("userId");
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
