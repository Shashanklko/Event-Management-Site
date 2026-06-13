import React from "react";
import { motion } from "framer-motion";

const FadeSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-20%" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className="w-full flex flex-col items-center justify-center py-20 px-4"
  >
    {children}
  </motion.div>
);

const Chapter6_Team = ({ team, onSelectMember }) => {

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
          The Visionaries
        </div>
        <h1 className="text-5xl md:text-7xl font-serif-luxury text-white tracking-widest leading-none mb-8">
          MANAGEMENT
        </h1>
        <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500/50 to-transparent mx-auto" />
      </motion.div>

      {/* Minimalist Team List */}
      <div className="flex flex-col pb-32">
        {team.map((member, idx) => (
          <FadeSection key={member.id}>
            <div 
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 w-full max-w-6xl mx-auto cursor-pointer group"
              onClick={() => onSelectMember(member)}
            >
              {/* Portrait */}
              <div className="w-[200px] h-[300px] md:w-[300px] md:h-[450px] overflow-hidden grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out border border-white/5">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" 
                />
              </div>

              {/* Typography */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-lg">
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif-luxury text-white tracking-widest leading-none group-hover:text-amber-50 transition-colors duration-700">
                  {member.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
                </h2>
                <div className="h-[1px] w-24 bg-amber-500/30 group-hover:bg-amber-400 transition-colors duration-700" />
                <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-500 font-mono">
                  {member.role}
                </p>
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  );
};

export default Chapter6_Team;
