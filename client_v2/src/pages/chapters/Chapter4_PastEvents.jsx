import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const Chapter4_PastEvents = ({ events, onSelectEvent }) => {
  const pastEvents = events.filter(e => e.completed).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar relative select-none bg-[#050810]">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full text-center pt-24 pb-12"
      >
        <div className="text-[10px] uppercase tracking-[0.5em] text-indigo-500/80 mb-6 font-mono">
          The Archives
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-serif-luxury text-white tracking-widest leading-none mb-8 uppercase">
          PAST EXPERIENCES
        </h1>
        <div className="w-[1px] h-16 bg-gradient-to-b from-indigo-500/50 to-transparent mx-auto" />
      </motion.div>

      {pastEvents.length === 0 ? (
        <div className="text-center py-20 text-slate-500 font-light tracking-widest uppercase text-sm">
          No past experiences recorded.
        </div>
      ) : (
        <div className="flex flex-col pb-32">
          {pastEvents.map((event, idx) => {
            const date = new Date(event.date);
            return (
              <FadeEvent key={event.id}>
                
                {/* Permanent Background Image */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-1000 scale-100 group-hover:scale-105 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-[#050810] opacity-80" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="text-xs md:text-sm tracking-[0.4em] uppercase text-indigo-300 font-mono mb-4">
                    {date.getFullYear()}
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif-luxury text-white tracking-widest leading-tight mb-6 max-w-5xl drop-shadow-xl">
                    {event.title}
                  </h2>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-6">
                    <span className="text-xs tracking-[0.2em] uppercase text-slate-300 font-mono">
                      Venue: <span className="text-indigo-300">{event.venue}</span>
                    </span>
                    <div className="w-12 h-[1px] md:w-[1px] md:h-6 bg-white/20" />
                    <span className="text-xs tracking-[0.2em] uppercase text-slate-300 font-mono">
                      Date: <span className="text-indigo-300">{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </span>
                  </div>

                  {event.teamAssignments && event.teamAssignments.length > 0 && (
                    <div className="flex flex-col items-center gap-2 mb-8">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Members Involved</span>
                      <div className="flex flex-wrap justify-center gap-3">
                        {event.teamAssignments.map((member, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">{member}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 transition-all duration-700">
                    <button 
                      onClick={() => onSelectEvent(event)}
                      className="px-8 py-3 rounded-full border border-indigo-500/50 text-[10px] tracking-widest font-mono text-indigo-300 uppercase hover:bg-indigo-500/20 bg-indigo-900/40 backdrop-blur-sm transition-colors duration-300 flex items-center gap-4"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
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

export default Chapter4_PastEvents;
