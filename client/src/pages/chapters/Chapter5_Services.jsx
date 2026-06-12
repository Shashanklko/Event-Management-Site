import React from "react";
import { Users, Briefcase, Video, Heart, Award } from "lucide-react";
import { GlassCard, ScrollReveal } from "../../components/ui";

const Chapter5_Services = () => {
  return (
    <div className="w-full py-4 relative z-10">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white font-serif-luxury">
            Collegiate Event <span className="italic text-amber-300">Specializations</span>
          </h2>
          <div className="w-12 h-[1px] bg-amber-400/50 mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {[
            { title: "Model United Nations", desc: "Global diplomacy debates featuring allocation boards, detailed study guides, and hybrid Dais support.", icon: Users },
            { title: "Academic Webinars", desc: "Pristine medicine and technology webinars with high-fidelity telemetry feeds and global speaker panels.", icon: Video },
            { title: "Technical Fests", desc: "Campus-wide coding hackathons, robotic war rooms, and collegiate startup pitches.", icon: Briefcase },
            { title: "Cultural Fests", desc: "National fests integrating acoustic bands, theater play contests, and creative writing workshops.", icon: Heart },
            { title: "Youth Summits", desc: "Speech conferences, delegate roundtable workshops, and thought-leadership panels.", icon: Award }
          ].map((srv, i) => {
            const Icon = srv.icon;
            return (
              <ScrollReveal key={i} delay={0.05 * i}>
                <GlassCard className="p-5 min-h-[160px] hover:border-amber-400/25 flex flex-col group h-full">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-amber-400 mb-4 transition-all group-hover:bg-amber-400/10">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm md:text-base font-light text-white mb-1.5 font-serif-luxury tracking-wide">{srv.title}</h3>
                  <p className="text-slate-400 text-[10px] md:text-[11px] font-light leading-relaxed">{srv.desc}</p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chapter5_Services;
