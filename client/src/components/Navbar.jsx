import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ArrowLeft, Settings, Sun, Moon, Shield, Compass } from "lucide-react";
import { useEvents } from "../context/EventContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

          {/* Settings Gear Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center ${
                isSettingsOpen
                  ? "border-amber-400/50 text-amber-400 bg-amber-400/5"
                  : "border-white/5 hover:border-amber-400/30 bg-white/3 hover:bg-white/8 text-slate-300 hover:text-amber-400"
              }`}
              title="Portal Options"
            >
              <Settings className={`w-4 h-4 ${isSettingsOpen ? "rotate-45" : ""} transition-transform duration-300`} />
            </button>

            <AnimatePresence>
              {isSettingsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsSettingsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2.5 w-56 rounded-xl border border-white/10 bg-[#0B0F19]/95 backdrop-blur-md shadow-2xl p-2 z-50 flex flex-col gap-1"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-1 text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
                      System Portal
                    </div>

                    {isAdminLoggedIn ? (
                      <>
                        {!isDashboard && (
                          <button
                            onClick={() => {
                              setIsSettingsOpen(false);
                              navigate("/admin/dashboard");
                            }}
                            className="w-full flex items-center gap-2.5 text-xs tracking-wider uppercase text-left text-amber-300 hover:text-amber-200 hover:bg-amber-500/5 px-3 py-2 rounded-lg transition-all focus:outline-none cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            Go to Dashboard
                          </button>
                        )}

                        {(isDashboard || isAdminPage) && (
                          <button
                            onClick={() => {
                              setIsSettingsOpen(false);
                              navigate("/");
                            }}
                            className="w-full flex items-center gap-2.5 text-xs tracking-wider uppercase text-left text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all focus:outline-none cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Live Website
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setIsSettingsOpen(false);
                            adminLogout();
                            navigate("/");
                          }}
                          className="w-full flex items-center gap-2.5 text-xs tracking-wider uppercase text-left text-red-400 hover:text-red-300 hover:bg-red-500/5 px-3 py-2 rounded-lg transition-all focus:outline-none cursor-pointer border-t border-white/5 pt-3 mt-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        {!isAdminPage && (
                          <button
                            onClick={() => {
                              setIsSettingsOpen(false);
                              navigate("/admin");
                            }}
                            className="w-full flex items-center gap-2.5 text-xs tracking-wider uppercase text-left text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all focus:outline-none cursor-pointer"
                          >
                            <Shield className="w-3.5 h-3.5" />
                            Admin Portal
                          </button>
                        )}

                        {isAdminPage && (
                          <button
                            onClick={() => {
                              setIsSettingsOpen(false);
                              navigate("/");
                            }}
                            className="w-full flex items-center gap-2.5 text-xs tracking-wider uppercase text-left text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all focus:outline-none cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Live Website
                          </button>
                        )}
                      </>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;