import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { UserPlus, UserMinus } from "lucide-react";
import axios from "axios";

export default function FrindesPages() {
  const { userData, userFollow } = useContext(UserContext);
  const { isAuthentication } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState("");

  // Get current user ID
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (isAuthentication) {
        try {
          const USER_API = import.meta.env.VITE_USER_API;
          const { data } = await axios.get(`${USER_API}/get-auth-user`, {
            withCredentials: true,
          });
          setCurrentUserId(data._id);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, [isAuthentication]);

  // Check if current user is following a user
  const isFollowing = (user) => {
    return user.follower?.includes(currentUserId);
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Community
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userData.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
            >
              <Link to={`/profile/${user._id}`} className="profileImg">
                <img
                  src={
                    user.profile ||
                    "https://randomuser.me/api/portraits/men/32.jpg"
                  }
                  alt={user.name}
                  className="w-20 h-20 rounded-full border-4 border-blue-200 object-cover transition-transform hover:scale-105 duration-300"
                />
              </Link>

              <div className="flex flex-col justify-center flex-1">
                <Link
                  to={`/profile/${user._id}`}
                  className="name text-xl font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors"
                >
                  {user.name}
                </Link>

                <p className="text-gray-500 text-sm mb-3 line-clamp-1">
                  {user.work || "No work information"}
                </p>

                {user._id !== currentUserId && (
                  <button
                    onClick={() => userFollow(user._id)}
                    className={`px-5 py-2 ${
                      isFollowing(user) ? "bg-gray-600" : "bg-blue-600"
                    }
                      text-white rounded-full font-medium shadow hover:bg-opacity-90 transition-all
                      flex items-center justify-center space-x-2`}
                  >
                    {isFollowing(user) ? (
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
              </div>
            </div>
          ))}
        </div>

        {userData.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>
    </main>
  );
}
