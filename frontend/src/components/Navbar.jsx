import React, { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import {
  LogIn,
  LogOut,
  Newspaper,
  UserCircle2,
  Users,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const { isAuthentication, logout } = useContext(AuthContext);

  const [menu, setMenu] = useState(false);
  const handelMenu = () => {
    setMenu(!menu);
  };

  return (
    <main className="w-full h-16 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="logo">
        <Link
          to="/"
          className="text-[#0066ff] font-semibold text-2xl tracking-widest"
        >
          NetBook
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/">
          <Newspaper size={28} />
        </Link>
        <Link to="/profile">
          <UserCircle2 size={28} />
        </Link>
        <Link to="/community">
          <Users size={28} />
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center space-x-3.5 font-medium">
        {isAuthentication ? (
          <button
            onClick={logout}
            className="px-5 py-1.5 bg-[#ff0000d4] rounded-sm flex space-x-1.5 items-center cursor-pointer"
          >
            <span>Logout</span> <LogOut size={18} />
          </button>
        ) : (
          <Link to="/login">
            <button className="px-5 py-1.5 bg-[#0066ff] rounded-sm flex space-x-1.5 items-center cursor-pointer">
              <LogIn size={18} /> <span>Login</span>
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <button onClick={handelMenu} className="md:hidden">
        <Menu size={30} />
      </button>

      {/* Mobile Nav */}
      {menu && (
        <div className="absolute top-16 left-0 w-full bg-[#0066ff]  flex flex-col items-center space-y-4 py-4 md:hidden z-50">
          <Link to="/">
            <Newspaper size={28} />
          </Link>
          <Link to="/profile">
            <UserCircle2 size={28} />
          </Link>
          <Link to="/community">
            <Users size={28} />
          </Link>
          <Link to="/login">
            <button className="px-5 py-1.5 bg-[#121212] text-[#0066ff] rounded-sm flex space-x-1.5 items-center">
              <LogIn size={18} /> <span>Login</span>
            </button>
          </Link>
          <button className="px-5 py-1.5 bg-[#ff0000d4] rounded-sm flex space-x-1.5 items-center">
            <span>Logout</span> <LogOut size={18} />
          </button>
        </div>
      )}
    </main>
  );
}
