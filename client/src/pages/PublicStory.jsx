import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MapPin, Users, CheckCircle, Clock,
  X, ChevronLeft, ChevronRight, Compass
} from "lucide-react";
import { useEvents } from "../context/EventContext";
import { GlowBg } from "../components/ui";
const welcomeBg = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1920";
import welcomeVideo from "../assets/12912084_1920_1080_25fps.mp4";

// Chapter component imports
import Chapter1_Welcome from "./chapters/Chapter1_Welcome";
import Chapter2_About from "./chapters/Chapter2_About";
import Chapter3_Gallery from "./chapters/Chapter3_Gallery";
import Chapter4_PastEvents from "./chapters/Chapter4_PastEvents";
import Chapter5_UpcomingEvents from "./chapters/Chapter5_UpcomingEvents";
import Chapter6_Team from "./chapters/Chapter6_Team";
import Chapter7_Contact from "./chapters/Chapter7_Contact";

const PublicStory = ({ activeChapter, setActiveChapter }) => {
  const { events, gallery, team, submitInquiry } = useEvents();

  // Navigation Direction state including direction (1 for next, -1 for prev) and axis (horizontal vs vertical)
  const [transitionState, setTransitionState] = useState({ dir: 1, axis: "horizontal" });
  const [isMobile, setIsMobile] = useState(false);

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpEvent, setRsvpEvent] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: "", email: "", phone: "", notes: "" });

  // Filters state
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");

  // Track mobile screen sizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent browser-level window scrolling and lock it to viewport height
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden", "h-screen");
    document.body.classList.add("overflow-hidden", "h-screen");
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.classList.remove("overflow-hidden", "h-screen");
      document.body.classList.remove("overflow-hidden", "h-screen");
    };
  }, []);

  // Enforce scroll reset on chapter changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [activeChapter]);

  // Handle page transitions
  const handleNavigate = (targetId) => {
    if (targetId < 0 || targetId > 8) return;
    const dir = targetId > activeChapter ? 1 : -1;
    // Use a single consistent horizontal bidirectional transition axis
    const axis = "horizontal";
    setTransitionState({ dir, axis });
    setActiveChapter(targetId);
  };

  // Scroll spy (Wheel Throttled page flip)
  useEffect(() => {
    const handleWheel = (e) => {
      // Avoid page turns if overlay is active
      if (selectedEvent || rsvpEvent || lightboxIndex !== null || e.target.closest('.no-page-turn')) return;

      // Dynamically find the closest actually scrollable container under the cursor
      let scrollContainer = e.target.closest('.overflow-y-auto, #chapter-scroll-container');
      while (scrollContainer && scrollContainer.scrollHeight <= scrollContainer.clientHeight) {
        scrollContainer = scrollContainer.parentElement ? scrollContainer.parentElement.closest('.overflow-y-auto, #chapter-scroll-container') : null;
      }

      if (scrollContainer) {
        // Only allow page turn if the user is at the top/bottom boundary of the hovered scrollable area
        if (e.deltaY > 0 && scrollContainer.scrollTop + scrollContainer.clientHeight < scrollContainer.scrollHeight - 5) return;
        if (e.deltaY < 0 && scrollContainer.scrollTop > 5) return;
      }

      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return; // Throttled to 1.2s

      const scrollThreshold = 40;
      if (e.deltaY > scrollThreshold) {
        if (activeChapter < 6) {
          handleNavigate(activeChapter + 1);
          lastScrollTime.current = now;
        }
      } else if (e.deltaY < -scrollThreshold) {
        if (activeChapter > 0) {
          handleNavigate(activeChapter - 1);
          lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeChapter, selectedEvent, rsvpEvent, lightboxIndex]);

  // Touch Swipe for mobile page transitions
  const touchStart = useRef(0);
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (selectedEvent || rsvpEvent || lightboxIndex !== null || e.target.closest('.no-page-turn')) return;
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (selectedEvent || rsvpEvent || lightboxIndex !== null || e.target.closest('.no-page-turn')) return;
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;

      // Dynamically find the closest actually scrollable container
      let scrollContainer = e.target.closest('.overflow-y-auto, #chapter-scroll-container');
      while (scrollContainer && scrollContainer.scrollHeight <= scrollContainer.clientHeight) {
        scrollContainer = scrollContainer.parentElement ? scrollContainer.parentElement.closest('.overflow-y-auto, #chapter-scroll-container') : null;
      }

      if (scrollContainer) {
        // Only allow page turn if the user is at the top/bottom boundary
        if (diff > 0 && scrollContainer.scrollTop + scrollContainer.clientHeight < scrollContainer.scrollHeight - 5) return;
        if (diff < 0 && scrollContainer.scrollTop > 5) return;
      }

      const swipeThreshold = 80;
      if (diff > swipeThreshold && activeChapter < 6) {
        handleNavigate(activeChapter + 1);
      } else if (diff < -swipeThreshold && activeChapter > 0) {
        handleNavigate(activeChapter - 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeChapter, selectedEvent, rsvpEvent, lightboxIndex]);

  const lastScrollTime = useRef(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent navigation if typing in an input/textarea
      const activeElement = document.activeElement;
      if (activeElement && ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName)) return;

      // Prevent navigation if any modal or overlay is active
      if (selectedEvent || rsvpEvent || lightboxIndex !== null || document.querySelector('.no-page-turn')) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 500) return; // Throttled to prevent rapid skipping

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        if (activeChapter < 6) {
          handleNavigate(activeChapter + 1);
          lastScrollTime.current = now;
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        if (activeChapter > 0) {
          handleNavigate(activeChapter - 1);
          lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapter, selectedEvent, rsvpEvent, lightboxIndex]);

  // Submit RSVP Form
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    submitInquiry({
      name: rsvpForm.name,
      email: rsvpForm.email,
      phone: rsvpForm.phone,
      eventType: rsvpEvent.category,
      message: `[RSVP Seating Request for Event: ${rsvpEvent.title}] Notes: ${rsvpForm.notes}`
    });
    setRsvpSuccess(true);
    setRsvpForm({ name: "", email: "", phone: "", notes: "" });
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpEvent(null);
    }, 2200);
  };

  // Helper to get dynamic transform origin based on transition axis
  const getTransformOrigin = () => {
    if (isMobile) return "center center";
    return transitionState.axis === "vertical" ? "top center" : "center left";
  };

  // 3D Hinge/Roll Page Flip Variants (Desktop)
  const desktopBookVariants = {
    initial: (custom) => {
      const { dir, axis } = custom || { dir: 1, axis: "horizontal" };
      if (axis === "vertical") {
        return {
          rotateX: dir > 0 ? -85 : 85,
          y: dir > 0 ? "50%" : "-50%",
          x: "0%",
          opacity: 0,
          z: -150
        };
      }
      return {
        rotateY: dir > 0 ? 85 : -85,
        x: dir > 0 ? "50%" : "-50%",
        y: "0%",
        opacity: 0,
        z: -150
      };
    },
    animate: {
      rotateY: 0,
      rotateX: 0,
      x: "0%",
      y: "0%",
      opacity: 1,
      z: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (custom) => {
      const { dir, axis } = custom || { dir: 1, axis: "horizontal" };
      if (axis === "vertical") {
        return {
          rotateX: dir > 0 ? 85 : -85,
          y: dir > 0 ? "-50%" : "50%",
          x: "0%",
          opacity: 0,
          z: -150,
          transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }
        };
      }
      return {
        rotateY: dir > 0 ? -85 : 85,
        x: dir > 0 ? "-50%" : "50%",
        y: "0%",
        opacity: 0,
        z: -150,
        transition: {
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1]
        }
      };
    }
  };

  // 2D Slide/Fade turn variants (Mobile)
  const mobileVariants = {
    initial: (custom) => {
      const { dir, axis } = custom || { dir: 1, axis: "horizontal" };
      if (axis === "vertical") {
        return {
          y: dir > 0 ? "100%" : "-100%",
          x: "0%",
          opacity: 0
        };
      }
      return {
        x: dir > 0 ? "100%" : "-100%",
        y: "0%",
        opacity: 0
      };
    },
    animate: {
      x: "0%",
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: (custom) => {
      const { dir, axis } = custom || { dir: 1, axis: "horizontal" };
      if (axis === "vertical") {
        return {
          y: dir > 0 ? "-100%" : "100%",
          x: "0%",
          opacity: 0,
          transition: {
            duration: 0.6,
            ease: "easeIn"
          }
        };
      }
      return {
        x: dir > 0 ? "-100%" : "100%",
        y: "0%",
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: "easeIn"
        }
      };
    }
  };

  const activeVariants = isMobile ? mobileVariants : desktopBookVariants;

  // Render proper chapter file
  const renderChapter = () => {
    switch (activeChapter) {
      case 0: return <Chapter1_Welcome onNavigate={handleNavigate} />;
      case 1: return <Chapter2_About />;
      case 2: return <Chapter3_Gallery gallery={gallery} onSelectMedia={setLightboxIndex} />;
      case 3: return <Chapter4_PastEvents events={events} eventFilter={eventFilter} setEventFilter={setEventFilter} onSelectEvent={setSelectedEvent} />;
      case 4: return <Chapter5_UpcomingEvents events={events} onRsvp={setRsvpEvent} />;
      case 5: return <Chapter6_Team team={team} />;
      case 6: return <Chapter7_Contact submitInquiry={submitInquiry} />;
      default: return <Chapter1_Welcome onNavigate={handleNavigate} />;
    }
  };

  const chapterNames = [
    "Welcome", "About Us", "Gallery Carousel", "Past Events", "Upcoming",
    "Management Team", "Contact Desk"
  ];

  return (
    <div className="relative w-full h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-between overflow-hidden">
      {/* Background radial blurs */}
      <GlowBg />

      {/* Global Background Video for Welcome page (Chapter 0), fades out when navigating to other chapters */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none select-none transition-opacity duration-1000 ${activeChapter === 0 ? "opacity-100" : "opacity-0"
          }`}
      >
        <video
          src={welcomeVideo}
          autoPlay
          loop
          muted
          playsInline
          poster={welcomeBg}
          className="w-full h-full object-cover opacity-55 scale-110 blur-[3px]"
        >
          {/* Fallback image */}
          <img
            src={welcomeBg}
            alt="Elysian Theme Background"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Soft dark vignette overlays to blend into the main site background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-[#0B0F19]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-transparent to-[#0B0F19]" />
        
        {/* Portal for Chapter-specific global backgrounds */}
        <div id="chapter-background-portal" className="absolute inset-0 z-0 pointer-events-none" />
      </div>

      {/* STICKY SIDE PROGRESS DOTS */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4 items-end select-none">
        {chapterNames.map((name, idx) => {
          const isActive = activeChapter === idx;
          return (
            <button
              key={idx}
              onClick={() => handleNavigate(idx)}
              className="group flex items-center gap-4 cursor-pointer focus:outline-none"
            >
              <span className={`text-[10px] tracking-widest uppercase font-medium transition-all duration-300 ${isActive ? "text-amber-400 translate-x-0 opacity-100" : "text-slate-500 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                }`}>
                CH {String(idx + 1).padStart(2, "0")} — {name}
              </span>
              <div className={`h-2 rounded-full transition-all duration-500 ${isActive ? "w-10 bg-gradient-to-r from-amber-400 to-amber-200" : "w-2 bg-slate-700 group-hover:bg-slate-500"
                }`} />
            </button>
          );
        })}
      </div>

      {/* CORE 3D PERSPECTIVE BOOK CONTAINER */}
      <div
        className="flex-1 w-full h-full flex items-start justify-center relative z-10 overflow-hidden"
        style={{ perspective: isMobile ? "none" : "1500px" }}
      >
        <div
          className="w-full h-full relative flex items-start justify-center"
          style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
        >
          <AnimatePresence mode="wait" custom={transitionState}>
            <motion.div
              key={activeChapter}
              custom={transitionState}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={activeVariants}
              id="chapter-scroll-container"
              className="w-full max-h-full overflow-y-auto no-scrollbar py-2"
              style={{
                transformOrigin: getTransformOrigin(),
                backfaceVisibility: "hidden"
              }}
            >
              {renderChapter()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>



      {/* FOOTER */}
      <footer className="py-5 border-t border-white/5 text-[9px] text-slate-600 tracking-widest uppercase relative z-10 bg-slate-950/40 select-none">
        <div className="w-full px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-1/3 text-center sm:text-left">© 2026 ELYSIAN EXPERIENCES INC.</div>

          {/* Modular Pagination Controls */}
          <div className="w-full sm:w-1/3 flex items-center justify-center gap-3">
            <button
              disabled={activeChapter === 0}
              onClick={() => handleNavigate(activeChapter - 1)}
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 focus:outline-none group ${activeChapter === 0
                  ? "border-white/2 opacity-25 cursor-not-allowed"
                  : "border-white/5 hover:border-amber-400/50 text-slate-400 hover:text-amber-400 cursor-pointer bg-white/2 hover:bg-white/5"
                }`}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <span className="text-[9px] tracking-[0.2em] font-medium text-slate-500">
              CH {String(activeChapter + 1).padStart(2, "0")} / 07
            </span>
            <button
              disabled={activeChapter === 6}
              onClick={() => handleNavigate(activeChapter + 1)}
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 focus:outline-none group ${activeChapter === 6
                  ? "border-white/2 opacity-25 cursor-not-allowed"
                  : "border-white/5 hover:border-amber-400/50 text-slate-400 hover:text-amber-400 cursor-pointer bg-white/2 hover:bg-white/5"
                }`}
              aria-label="Next Page"
            >
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="w-full sm:w-1/3 flex justify-center sm:justify-end gap-4">
            <span className="hover:text-amber-400 cursor-pointer">INSTAGRAM</span>
            <span className="hover:text-amber-400 cursor-pointer">PINTEREST</span>
          </div>
        </div>
      </footer>


      {/* ==================== OVERLAY MODALS ==================== */}

      {/* 1. EVENT DETAIL CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-[#0B0F19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative text-left"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center text-white hover:border-amber-400 transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-5 aspect-square md:aspect-auto md:h-[550px] relative bg-slate-900">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B0F19] via-transparent to-transparent" />
                </div>

                <div className="md:col-span-7 p-6 md:p-8 flex flex-col gap-5 max-h-[550px] overflow-y-auto">
                  <div>
                    <span className="text-[9px] tracking-widest uppercase text-amber-400 font-semibold px-2 rounded-full border border-amber-400/20 bg-amber-400/5">
                      {selectedEvent.category} Case Study
                    </span>
                    <h3 className="text-2xl font-light text-white font-serif-luxury mt-3 mb-2">{selectedEvent.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-light">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedEvent.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedEvent.venue}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">{selectedEvent.description}</p>

                  <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1">Lead Organizers</div>
                      <div className="text-xs md:text-sm text-white font-medium flex items-center gap-2 font-sans">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        {selectedEvent.teamAssignments.join(", ")}
                      </div>
                      <span className="text-[8px] uppercase tracking-widest font-semibold text-amber-400/70 mt-1 block">
                        Event Execution Team
                      </span>
                    </div>

                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-1">Execution Status</div>
                      <div className="text-xs md:text-sm text-amber-300 font-medium">
                        {selectedEvent.completionPercentage}% Complete
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-gradient-to-r from-amber-400 to-amber-200 h-full rounded-full" style={{ width: `${selectedEvent.completionPercentage}%` }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-2">Milestone Checklist</h4>
                    <div className="flex flex-col gap-2">
                      {selectedEvent.tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-2 bg-white/3 border border-white/2 rounded-lg p-2">
                          {task.completed ? (
                            <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                          )}
                          <span className={`text-xs ${task.completed ? "text-slate-300 line-through" : "text-slate-400"}`}>
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-2">Assigned Crew</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEvent.teamAssignments.map((name, idx) => (
                        <span key={idx} className="bg-slate-900 border border-white/5 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-slate-300">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. UPCOMING RSVP RESERVATION MODAL */}
      <AnimatePresence>
        {rsvpEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#0B0F19] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative text-left"
            >
              <button
                onClick={() => setRsvpEvent(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center text-white hover:border-amber-400 transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[8px] uppercase tracking-widest text-amber-400 font-semibold">Exclusive RSVP invitation</span>
              <h3 className="text-xl md:text-2xl font-light text-white font-serif-luxury mt-2 mb-1">Request Seating Access</h3>
              <div className="text-[11px] text-slate-400 font-light mb-5">
                Event: <span className="text-slate-300 font-semibold">{rsvpEvent.title}</span> <br />
                Location: <span className="text-slate-300">{rsvpEvent.venue}</span>
              </div>

              {rsvpSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 animate-bounce" />
                  <div className="text-sm text-white font-serif-luxury">RSVP Application Dispatched</div>
                  <div className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Seating availability is verified manually. An operations director will contact you shortly.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">Your Full Name</label>
                    <input
                      type="text" required
                      value={rsvpForm.name}
                      onChange={e => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      placeholder="Sir Marcus Sterling"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">Email Address</label>
                    <input
                      type="email" required
                      value={rsvpForm.email}
                      onChange={e => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                      className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      placeholder="marcus@sterling.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">Phone Contact</label>
                    <input
                      type="tel"
                      value={rsvpForm.phone}
                      onChange={e => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                      className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      placeholder="+44 7911 123456"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">RSVP Notes & Requests</label>
                    <textarea
                      rows={2.5}
                      value={rsvpForm.notes}
                      onChange={e => setRsvpForm({ ...rsvpForm, notes: e.target.value })}
                      className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                      placeholder="Specify guest counts, dietary notes, or hotel requests..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-semibold tracking-wider text-xs uppercase rounded-lg transition-all cursor-pointer focus:outline-none"
                  >
                    Submit RSVP Credentials
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. LIGHTBOX MEDIA VIEWER */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950/98"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white hover:border-amber-400 cursor-pointer focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-w-3xl aspect-[4/3] max-h-[75vh] flex items-center justify-center">
              <button
                onClick={() => setLightboxIndex(prev => (prev - 1 + gallery.length) % gallery.length)}
                className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer focus:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <img
                src={gallery[lightboxIndex]?.url}
                alt={gallery[lightboxIndex]?.title}
                className="max-w-full max-h-full object-contain rounded-lg border border-white/10"
              />

              <button
                onClick={() => setLightboxIndex(prev => (prev + 1) % gallery.length)}
                className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer focus:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mt-5">
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-semibold mb-1 block">
                {gallery[lightboxIndex]?.category}
              </span>
              <h4 className="text-base text-white font-serif-luxury font-light">
                {gallery[lightboxIndex]?.title}
              </h4>
              <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest font-mono">
                {lightboxIndex + 1} / {gallery.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PublicStory;
