import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ArrowLeft, Settings, Sun, Moon, Shield, Compass } from "lucide-react";
import { useEvents } from "../context/EventContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, adminLogout, isLightTheme, toggleTheme } = useEvents();

  const isDashboard = location.pathname.startsWith("/admin/dashboard");
  const isAdminPage = location.pathname === "/admin";

  const navLinks = [
    { id: "about", anchorId: "about", label: "About" },
    { id: "gallery", anchorId: "gallery", label: "Gallery" },
    { id: "events", anchorId: "past-events", label: "Events" },
    { id: "upcoming", anchorId: "upcoming", label: "Upcoming" },
    { id: "team", anchorId: "team", label: "Team" },
    { id: "contact", anchorId: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDashboard || isAdminPage) return;

    const sections = ["welcome", "about", "gallery", "past-events", "upcoming", "team", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "welcome") {
            setActiveSection("");
          } else if (id === "past-events") {
            setActiveSection("events");
          } else if (id === "upcoming") {
            setActiveSection("upcoming");
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [isDashboard, isAdminPage]);

  // Handle active navigation line layout sizing from start to end of active tab
  useEffect(() => {
    const updateLine = () => {
      if (!activeSection) {
        setLineStyle({ left: 0, width: 0 });
        return;
      }
      const container = containerRef.current;
      if (!container) return;

      const activeLink = navLinks.find((l) => l.id === activeSection);
      if (!activeLink) return;

      const activeAnchor = container.querySelector(`a[href="#${activeLink.anchorId}"]`);
      if (activeAnchor) {
        const rect = activeAnchor.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        // Spans from the left of the container (0) to the right edge of the active link text
        setLineStyle({ left: 0, width: rect.right - containerRect.left });
      }
    };

    updateLine();
    window.addEventListener("resize", updateLine);
    return () => window.removeEventListener("resize", updateLine);
  }, [activeSection]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isLightTheme
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-2.5"
            : "bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5 py-2.5"
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
            <span className={`bg-gradient-to-r ${isLightTheme ? "from-amber-600 via-amber-500 to-amber-700" : "from-amber-400 via-amber-200 to-amber-500"} bg-clip-text text-transparent font-medium drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]`}>
              ELYSIAN
            </span>
          </Link>

          {isDashboard && (
            <div className={`hidden sm:flex items-center gap-2 text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border ${
              isLightTheme 
                ? "text-amber-700 bg-amber-500/10 border-amber-500/20" 
                : "text-amber-400/80 bg-amber-400/5 border-amber-400/10"
            }`}>
              <Shield className="w-3 h-3" />
              Secure Administration
            </div>
          )}
        </div>

        {/* Center Navigation Links (Only on Live Website) */}
        {!isDashboard && !isAdminPage && (
          <div 
            ref={containerRef}
            className="hidden md:flex items-center gap-6 text-[10px] tracking-widest uppercase font-medium relative py-2.5"
          >
            {/* Background line track running from start to end of the links group */}
            <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${isLightTheme ? "bg-slate-200" : "bg-white/10"}`} />
            
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.anchorId}`}
                  className={`relative py-1 transition-colors duration-300 focus:outline-none ${
                    isActive 
                      ? isLightTheme ? "text-amber-600 font-semibold" : "text-amber-400 font-semibold"
                      : isLightTheme ? "text-slate-600 hover:text-amber-600" : "text-slate-400 hover:text-amber-200"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Dynamic completing line indicator */}
            {lineStyle.width > 0 && (
              <motion.div
                className={`absolute bottom-0 h-[1px] rounded-full ${
                  isLightTheme
                    ? "bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-[0_1px_6px_rgba(217,119,6,0.4)]"
                    : "bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 shadow-[0_0_12px_#fbbf24,0_0_4px_#fbbf24]"
                }`}
                style={{ backgroundSize: "200% 100%" }}
                animate={{
                  left: lineStyle.left,
                  width: lineStyle.width,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  left: { type: "spring", stiffness: 300, damping: 30 },
                  width: { type: "spring", stiffness: 300, damping: 30 },
                  backgroundPosition: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }
                }}
              >
                {/* Sparkling glowing tip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <motion.div
                    className={`absolute w-3.5 h-3.5 rounded-full blur-[1px] ${
                      isLightTheme ? "bg-amber-500/40" : "bg-amber-400/50"
                    }`}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.4, 0.9, 0.4]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className={`absolute w-1.5 h-1.5 rounded-full bg-white ${
                      isLightTheme 
                        ? "shadow-[0_0_6px_#fff,0_0_10px_#d97706]" 
                        : "shadow-[0_0_8px_#fff,0_0_15px_#fbbf24]"
                    }`}
                    animate={{
                      scale: [0.7, 1.4, 0.7],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center ${
              isLightTheme
                ? "border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-amber-600"
                : "border-white/5 hover:border-amber-400/30 bg-white/3 hover:bg-white/8 text-slate-300 hover:text-amber-400"
            }`}
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
                ? isLightTheme
                  ? "border-amber-500 text-amber-700 bg-amber-500/10"
                  : "border-amber-400/50 text-amber-400 bg-amber-400/5"
                : isLightTheme
                  ? "border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-amber-600"
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