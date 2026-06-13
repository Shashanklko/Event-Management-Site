import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Derive live event status from schedule fields (no stored `ongoing` needed)
const getEventStatus = (evt) => {
  if (evt.completed) return "past";
  if (!evt.date) return "upcoming";
  const now = new Date();
  const start = new Date(`${evt.date}T${evt.startTime || "00:00"}`);
  let end;
  if (evt.endTime) {
    end = new Date(`${evt.date}T${evt.endTime}`);
    if (end <= start) end.setDate(end.getDate() + 1); // midnight crossover
  } else {
    const durationHours = Math.max(Number(evt.duration) || 2, 0.25);
    end = new Date(start.getTime() + durationHours * 3600000);
  }
  if (now >= start && now < end) return "ongoing";
  return "upcoming";
};

const isRegistrationClosed = (evt) => {
  if (!evt.registrationDeadline) return false;
  return new Date() > new Date(evt.registrationDeadline);
};

// ── Live Countdown Timer ────────────────────────────────────────────────────
const CountdownTimer = ({ event }) => {
  const getTimeLeft = () => {
    const now = new Date();
    const target = new Date(`${event.date}T${event.startTime || "00:00"}`);
    const diff = target - now;
    if (diff <= 0) return null; // started
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [event.date, event.startTime]);

  if (!timeLeft) return null; // event started — don't show countdown

  const units = [
    { label: "Days",    value: timeLeft.days },
    { label: "Hours",   value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-3 my-6">
      <p className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-mono">
        Commences In
      </p>
      <div className="flex items-center gap-2 sm:gap-4">
        {units.map(({ label, value }, i) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1">
              {/* Number box */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/8 to-transparent backdrop-blur-sm shadow-[0_0_16px_rgba(245,158,11,0.06)] overflow-hidden">
                {/* Shine line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                <motion.span
                  key={value}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-2xl sm:text-3xl font-light text-white tabular-nums font-mono tracking-tight"
                >
                  {String(value).padStart(2, "0")}
                </motion.span>
              </div>
              <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 font-mono">{label}</span>
            </div>
            {/* Separator dots (not after last) */}
            {i < units.length - 1 && (
              <div className="flex flex-col gap-1.5 pb-5">
                <div className="w-1 h-1 rounded-full bg-amber-500/40" />
                <div className="w-1 h-1 rounded-full bg-amber-500/40" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const FadeEvent = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center py-20 px-4 group relative"
  >
    {children}
  </motion.div>
);


const Chapter5_UpcomingEvents = ({ events, onRsvp }) => {
  const upcomingEvents = events.filter(e => !e.completed).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar relative select-none bg-[#050810]">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full text-center pt-24 pb-12"
      >
        <div className="text-[10px] uppercase tracking-[0.5em] text-amber-500/80 mb-6 font-mono">
          The Horizon
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-serif-luxury text-white tracking-widest leading-none mb-8 uppercase">
          UPCOMING GATHERINGS
        </h1>
        <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500/50 to-transparent mx-auto" />
      </motion.div>

      {upcomingEvents.length === 0 ? (
        <div className="text-center py-20 text-slate-500 font-light tracking-widest uppercase text-sm">
          No upcoming gatherings scheduled.
        </div>
      ) : (
        <div className="flex flex-col pb-32">
          {upcomingEvents.map((event) => {
            const date = new Date(event.date);
            const status = getEventStatus(event);
            const regClosed = isRegistrationClosed(event);
            const isOngoing = status === "ongoing";

            return (
              <FadeEvent key={event.id}>
                
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-1000 scale-100 group-hover:scale-105 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-[#050810] opacity-80" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-500 font-mono mb-4">
                    {date.getFullYear()}
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif-luxury text-white tracking-widest leading-tight mb-6 max-w-5xl drop-shadow-xl">
                    {event.title}
                  </h2>

                  {event.description && (
                    <p className="max-w-2xl text-slate-300 font-light text-sm leading-relaxed mb-6">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 bg-[#050810]/50 backdrop-blur-md px-8 py-4 rounded-full border border-white/5">
                    {event.host && (
                      <>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-mono">
                          Host: <span className="text-amber-400">{event.host}</span>
                        </span>
                        <div className="w-8 h-[1px] md:w-[1px] md:h-4 bg-white/20" />
                      </>
                    )}
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-mono">
                      Date: <span className="text-amber-400">{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </span>
                    {event.startTime && (
                      <>
                        <div className="w-8 h-[1px] md:w-[1px] md:h-4 bg-white/20" />
                        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-mono">
                          {event.startTime}{event.endTime ? ` → ${event.endTime}` : ""}
                        </span>
                      </>
                    )}
                  </div>

                  {event.guestLecturer && (
                    <div className="text-xs text-amber-200 tracking-widest uppercase mb-6 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-amber-400/50" />
                      Featuring: {event.guestLecturer}
                      <span className="w-8 h-[1px] bg-amber-400/50" />
                    </div>
                  )}

                  {/* Registration deadline indicator */}
                  {event.registrationDeadline && !isOngoing && (
                    <div className={`text-[9px] tracking-widest uppercase mb-6 font-mono px-4 py-1.5 rounded-full border ${
                      regClosed
                        ? "text-rose-400 border-rose-500/20 bg-rose-500/5"
                        : "text-sky-400 border-sky-500/20 bg-sky-500/5"
                    }`}>
                      {regClosed
                        ? "Registration Closed"
                        : `Register by ${new Date(event.registrationDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                      }
                    </div>
                  )}

                  {event.teamAssignments && event.teamAssignments.length > 0 && (
                    <div className="flex flex-col items-center gap-2 mb-8">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Organizing Committee</span>
                      <div className="flex flex-wrap justify-center gap-3">
                        {event.teamAssignments.map((member, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-300 uppercase tracking-wider">{member}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Live Countdown — only shown before event starts ── */}
                  {!isOngoing && event.date && event.startTime && (
                    <CountdownTimer event={event} />
                  )}

                  {/* CTA area */}
                  <div className="mt-2 transition-all duration-700 flex flex-col items-center gap-4">
                    {isOngoing ? (
                      /* Ongoing — registration completely closed */
                      <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] tracking-widest font-mono uppercase select-none shadow-[0_0_20px_rgba(16,185,129,0.12)]">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        </span>
                        <span>Ongoing Session — Registration Closed</span>
                      </div>
                    ) : regClosed ? (
                      /* Registration deadline passed */
                      <div className="px-8 py-3 rounded-full border border-rose-500/30 text-[10px] tracking-widest font-mono text-rose-400/70 uppercase select-none">
                        Registration Closed
                      </div>
                    ) : event.registerLinks && event.registerLinks.length > 0 ? (
                      /* Has registration links */
                      <div className="flex flex-wrap justify-center gap-4">
                        {event.registerLinks.map((link, i) => (
                          <a 
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 py-3 rounded-full border border-amber-500/50 text-[10px] tracking-widest font-mono text-amber-400 uppercase hover:bg-amber-500/20 bg-amber-900/40 backdrop-blur-sm transition-colors duration-300 flex items-center gap-4"
                          >
                            <span>Register Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      /* RSVP fallback */
                      <button 
                        onClick={(e) => { e.stopPropagation(); onRsvp(event); }}
                        className="px-8 py-3 rounded-full border border-amber-500/50 text-[10px] tracking-widest font-mono text-amber-400 uppercase hover:bg-amber-500/20 bg-amber-900/40 backdrop-blur-sm transition-colors duration-300 flex items-center gap-4"
                      >
                        <span>Request Invitation</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                </div>
                
                {/* Minimalist Divider */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-white/10 to-transparent" />
              </FadeEvent>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Chapter5_UpcomingEvents;
