import userModel from "../models/user.models.js";

export const updateUserData = async (req, res) => {
  const { about, work } = req.body;
  const userId = req.user.id;

  try {
    await userModel.findByIdAndUpdate(
      userId,
      {
        profile: req.file ? req.file.path : "",
        cover: req.file ? req.file.path : "",
        about,
        work,
      },
      { new: true }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Update user failed", error: error.message });
  }
};

export const userFollower = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyFollow = user.follower.includes(userId);

    const updateOperator = alreadyFollow ? "$pull" : "$push";

    await userModel.findByIdAndUpdate(
      id,
      { [updateOperator]: { follower: userId } },
      { new: true }
    );
    await userModel.findByIdAndUpdate(
      userId,
      { [updateOperator]: { fowling: id } },
      { new: true }
    );

    return res.status(200).json({
      message: alreadyFollow ? "Unfollowed" : "Followed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userFowling = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyFollowing = user.follower.includes(userId);
    const updateOperator = alreadyFollowing ? "$pull" : "$push";

    await userModel.findByIdAndUpdate(
      id,
      { [updateOperator]: { follower: userId } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      userId,
      { [updateOperator]: { fowling: id } },
      { new: true }
    );

    return res.status(200).json({
      message: alreadyFollowing ? "Unfollowed" : "Followed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
