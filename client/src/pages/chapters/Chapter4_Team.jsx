import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";

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

const Chapter4_Team = ({ team }) => {
  const [selectedMember, setSelectedMember] = useState(null);

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
              onClick={() => setSelectedMember(member)}
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

      {/* Ultra-Minimalist Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050810]/95 backdrop-blur-md"
          >
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors duration-300 z-10"
            >
              <X className="w-8 h-8 font-light" strokeWidth={1} />
            </button>

            <div className="flex flex-col md:flex-row w-full max-w-7xl h-full md:h-[80vh] items-center justify-center p-8 md:p-16 gap-12 md:gap-24 overflow-y-auto no-scrollbar">
              
              {/* Massive Image */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 h-[50vh] md:h-full max-h-[800px] overflow-hidden"
              >
                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
              </motion.div>

              {/* Bio & Details */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 flex flex-col items-start gap-8"
              >
                <div>
                  <h2 className="text-6xl md:text-8xl font-serif-luxury text-white tracking-widest leading-none mb-4">
                    {selectedMember.name}
                  </h2>
                  <div className="text-sm tracking-[0.4em] uppercase text-amber-500 font-mono">
                    {selectedMember.role}
                  </div>
                </div>

                <div className="h-[1px] w-full max-w-sm bg-white/10" />

                <p className="text-lg font-light text-slate-400 leading-relaxed max-w-xl">
                  {selectedMember.bio}
                </p>

                {/* Elegant Socials */}
                <div className="flex items-center gap-8 mt-4">
                  <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chapter4_Team;
