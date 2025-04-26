import userModel from "../models/user.models.js";

export const updateUserData = async (req, res) => {
  const { about, work } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        profile: req.files?.profile ? req.files.profile[0].path : undefined,
        cover: req.files?.cover ? req.files.cover[0].path : undefined,
        about,
        work,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    res
      .status(500)
      .json({ message: "Update user failed", error: error.message });
  }
};

export const userFollow = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyFollowing = user.follower.includes(userId);
    const updateOperator = alreadyFollowing ? "$pull" : "$push";

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { [updateOperator]: { following: id } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      id,
      { [updateOperator]: { follower: userId } },
      { new: true }
    );

    return res.status(200).json({
      message: alreadyFollowing ? "Unfollowed" : "Followed",
      user: updatedUser,
    });
  } catch (error) {
    console.error("User following error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAuthUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
