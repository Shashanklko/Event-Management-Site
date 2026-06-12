import React from "react";
import { motion } from "framer-motion";

const FadeSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-20%" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center min-h-[50vh] px-6"
  >
    {children}
  </motion.div>
);

const Chapter2_About = () => {
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar relative select-none bg-[#050810]">
      
      {/* Subtle background glow fixed in the center */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="w-full relative z-10 flex flex-col items-center pb-32">
        
        <div className="pt-32" />
        {/* Story Sections */}
        <FadeSection>
          <h2 className="text-3xl md:text-5xl font-light text-slate-200 leading-tight md:leading-snug">
            We are a <span className="font-serif-luxury italic text-amber-400">student-driven</span> organization building the world's most high-impact academic platforms.
          </h2>
        </FadeSection>

        <FadeSection>
          <p className="text-xl md:text-3xl font-light text-slate-400 leading-relaxed max-w-3xl">
            We do not just run events. We engineer experiences that shape <span className="text-white">leaders</span>, strengthen <span className="text-white">institutions</span>, and forge <span className="text-white">legacies</span>.
          </p>
        </FadeSection>

        <FadeSection>
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-amber-500 mb-6 font-mono">
            The Numbers
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 opacity-80">
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-serif-luxury text-white">80+</span>
              <span className="text-[9px] tracking-widest uppercase text-slate-500">Masterpieces</span>
            </div>
            <div className="w-12 h-[1px] md:w-[1px] md:h-12 bg-white/10" />
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-serif-luxury text-white">7500+</span>
              <span className="text-[9px] tracking-widest uppercase text-slate-500">Delegates</span>
            </div>
            <div className="w-12 h-[1px] md:w-[1px] md:h-12 bg-white/10" />
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-serif-luxury text-white">15+</span>
              <span className="text-[9px] tracking-widest uppercase text-slate-500">Institutions</span>
            </div>
          </div>
        </FadeSection>

        <FadeSection>
          <div className="w-[1px] h-24 bg-gradient-to-t from-amber-500/50 to-transparent mb-12" />
          <h2 className="text-4xl md:text-6xl font-serif-luxury text-white tracking-wider mb-6">
            The Gold Standard.
          </h2>
          <p className="text-sm md:text-base tracking-widest uppercase text-slate-500 font-mono">
            Est. 2019
          </p>
        </FadeSection>

      </div>
    </div>
  );
};

export default Chapter2_About;
