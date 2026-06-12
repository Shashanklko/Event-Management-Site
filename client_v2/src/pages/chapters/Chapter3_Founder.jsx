import React from "react";
import { GlassCard } from "../../components/ui";
import { motion } from "framer-motion";
import { MapPin, Users, Video, Award } from "lucide-react";

const Chapter3_Founder = () => {
  return (
    <div className="w-full py-4 relative z-10">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Blueprint Interactive Flow */}
          <div className="lg:col-span-6 relative w-full flex flex-col gap-4 text-left">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white leading-tight">
                Our Four-Phase <br />
                <span className="font-serif-luxury italic text-amber-300">Curation Architecture</span>
              </h2>
              <div className="w-16 h-[1px] bg-amber-400/50 my-4" />
            </motion.div>

            <div className="flex flex-col gap-3.5 pl-2 border-l border-white/5 relative mt-2">
              {[
                { phase: "Phase 01", title: "Delegation & Allocation Guide", desc: "Committees allocs, guidebooks dispatch, and credential reviews.", icon: Users },
                { phase: "Phase 02", title: "Speaker Panel Briefings", desc: "Coordinating university scholars, keynote panels, and tech briefs.", icon: Award },
                { phase: "Phase 03", title: "Prerecords & Telemetry Dry-run", desc: "Audio tests, Zoom feeds calibration, and security sandbox runs.", icon: Video },
                { phase: "Phase 04", title: "Assembly Day Execution", desc: "Live moderator support, real-time feedback logging, and certifications.", icon: MapPin }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 * idx }} className="relative pl-6 group">
                    {/* Ring indicator */}
                    <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-amber-400/50 group-hover:border-amber-400 group-hover:scale-110 transition-all shadow-[0_0_8px_rgba(212,175,55,0.2)]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">{step.phase}</span>
                        <span className="text-slate-600 font-light text-[9px]">/</span>
                        <span className="text-white font-medium text-xs md:text-sm font-sans tracking-wide">{step.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Philosophy Context */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-left relative z-10">
            <GlassCard className="p-6 md:p-8 flex flex-col gap-4 border border-white/10 bg-[#0B0F19]/60 backdrop-blur-md rounded-2xl shadow-xl">
              <h3 className="text-lg md:text-xl font-light text-white font-serif-luxury tracking-wide">
                Rigorous Academic Execution
              </h3>
              <p className="text-slate-300 font-light text-xs md:text-sm leading-relaxed">
                “We treat collegiate events not as simple assemblies, but as high-fidelity educational platforms. Every Model UN debate, tech hackathon, and medicine seminar is mapped, rehearsed, and engineered to mimic global corporate events.”
              </p>
              <p className="text-slate-400 font-light text-[11px] md:text-xs leading-relaxed">
                By integrating structured timelines with our bespoke digital registration boards, we ensure seamless experiences for both in-person delegates and virtual webinar attendees worldwide.
              </p>

              <div className="border-t border-white/5 pt-4 mt-2 flex flex-col gap-1 items-start">
                <span className="font-serif-luxury text-xl md:text-2xl italic text-amber-200 tracking-wider">Elysian Curation Desk</span>
                <span className="text-[8px] text-slate-500 tracking-widest uppercase">Standard Operating Framework</span>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Chapter3_Founder;
