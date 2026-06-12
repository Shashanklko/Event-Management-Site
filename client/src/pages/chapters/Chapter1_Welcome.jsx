import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Chapter1_Welcome = ({ onNavigate }) => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center relative z-10 py-12">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center px-4 relative z-10">



        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif-luxury text-white tracking-widest leading-none mb-12">
            ELYSIAN
          </h1>
          <div className="w-[1px] h-24 bg-gradient-to-b from-amber-500/50 to-transparent mx-auto mb-12" />
        </motion.div>


      </div>
    </div>
  );
};

export default Chapter1_Welcome;
