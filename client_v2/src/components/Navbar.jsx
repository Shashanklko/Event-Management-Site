import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ArrowLeft, Settings, Sun, Moon, Shield, Compass } from "lucide-react";
import { useEvents } from "../context/EventContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, adminLogout, isLightTheme, toggleTheme } = useEvents();

  const isDashboard = location.pathname.startsWith("/admin/dashboard");
  const isAdminPage = location.pathname === "/admin";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5 py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="w-full px-6 md:px-12 flex justify-between items-center gap-4">
        {/* Logo & Admin Indicator */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl tracking-[0.25em] font-light text-white font-serif-luxury cursor-pointer focus:outline-none flex-shrink-0"
          >
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent font-medium drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
              ELYSIAN
            </span>
          </Link>

          {isDashboard && (
            <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-wider uppercase text-amber-400/80 bg-amber-400/5 px-2.5 py-1 rounded-full border border-amber-400/10">
              <Shield className="w-3 h-3" />
              Secure Administration
            </div>
          )}
        </div>

        {/* Center Navigation Links (Only on Live Website) */}
        {!isDashboard && !isAdminPage && (
          <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest uppercase font-medium text-slate-400">
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#past-events" className="hover:text-amber-400 transition-colors">Events</a>
            <a href="#team" className="hover:text-amber-400 transition-colors">Team</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </div>
        )}

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/5 hover:border-amber-400/30 bg-white/3 hover:bg-white/8 text-slate-300 hover:text-amber-400 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center"
            title={isLightTheme ? "Switch to Dark Mode" : "Switch to Light Theme"}
          >
            {isLightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Settings Gear Button (Directly goes to login/dashboard) */}
          <button
            onClick={() => {
              if (isAdminLoggedIn) {
                navigate("/admin/dashboard");
              } else {
                navigate(isAdminPage ? "/" : "/admin");
              }
            }}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center ${
              isAdminPage || isDashboard
                ? "border-amber-400/50 text-amber-400 bg-amber-400/5"
                : "border-white/5 hover:border-amber-400/30 bg-white/3 hover:bg-white/8 text-slate-300 hover:text-amber-400"
            }`}
            title={isAdminLoggedIn ? "Go to Dashboard" : (isAdminPage ? "Back to Live Website" : "Admin Portal")}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Sign Out Button (Only when Admin is Logged In) */}
          {isAdminLoggedIn && (
            <button
              onClick={() => {
                adminLogout();
                navigate("/");
              }}
              className="p-2 rounded-full border border-red-500/10 hover:border-red-500/35 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;