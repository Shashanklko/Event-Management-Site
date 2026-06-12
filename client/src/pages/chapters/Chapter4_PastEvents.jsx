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
                
                {/* Event Image Fades in faintly on hover behind text */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none">
                  <img src={event.image} alt={event.name} className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
                  <div className="absolute inset-0 bg-[#050810]/60" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="text-xs md:text-sm tracking-[0.4em] uppercase text-slate-500 font-mono mb-6">
                    {date.getFullYear()}
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif-luxury text-white tracking-widest leading-tight mb-8 group-hover:text-indigo-200 transition-colors duration-700 max-w-5xl">
                    {event.name}
                  </h2>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="text-xs tracking-[0.3em] uppercase text-indigo-400 font-mono">
                      {event.venue}
                    </span>
                    <div className="w-12 h-[1px] md:w-[1px] md:h-6 bg-white/20" />
                    <span className="text-xs tracking-[0.3em] uppercase text-indigo-400 font-mono">
                      {date.toLocaleString('en-US', { month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="mt-12 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                    <button 
                      onClick={() => onSelectEvent(event)}
                      className="px-8 py-3 rounded-full border border-indigo-500/30 text-[10px] tracking-widest font-mono text-indigo-400 uppercase hover:bg-indigo-500/10 transition-colors duration-300 flex items-center gap-4"
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
