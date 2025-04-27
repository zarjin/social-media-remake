import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);

  const [registerUserData, setRegisterUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    register(registerUserData);
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Create Account
        </h1>
        <form className="space-y-6" onSubmit={handelSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={(e) =>
                setRegisterUserData({
                  ...registerUserData,
                  name: e.target.value,
                })
              }
              value={registerUserData.name}
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) =>
                setRegisterUserData({
                  ...registerUserData,
                  email: e.target.value,
                })
              }
              value={registerUserData.email}
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              onChange={(e) =>
                setRegisterUserData({
                  ...registerUserData,
                  password: e.target.value,
                })
              }
              value={registerUserData.password}
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Log in here
          </Link>
        </div>
      </div>
    </main>
  );
}
