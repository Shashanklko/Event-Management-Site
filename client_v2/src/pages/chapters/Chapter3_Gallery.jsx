import React from "react";
import { motion } from "framer-motion";

const ImageCard = ({ index, className, delay = 0, gallery, onSelectMedia }) => {
  const getImage = (idx) => {
    const item = gallery[idx % gallery.length];
    return item ? item.url : "";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.6, delay: delay * 0.5, ease: "easeOut" }}
      className={`relative flex-shrink-0 ${className}`}
    >
      <motion.div
        animate={{ y: ["-5%", "5%", "-5%"] }}
        transition={{ 
          duration: 5 + (index % 4), // Staggered float speeds
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay 
        }}
        onClick={() => onSelectMedia(index % gallery.length)}
        className="w-full h-full overflow-hidden group cursor-pointer relative"
      >
        <img 
          src={getImage(index)} 
          alt="Gallery preview"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-[#0B0F19]/40 group-hover:bg-transparent transition-colors duration-700" />
      </motion.div>
    </motion.div>
  );
};

const Chapter3_Gallery = ({ gallery, onSelectMedia }) => {
  if (!gallery || gallery.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
        No gallery items available.
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto no-scrollbar relative select-none bg-[#050810] flex flex-col justify-start items-center gap-6 md:gap-12 pt-32 pb-24">
      
      {/* ROW 1 */}
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full flex-nowrap translate-x-4 md:translate-x-12">
        <ImageCard index={0} gallery={gallery} onSelectMedia={onSelectMedia} className="w-20 h-12 md:w-72 md:h-40" delay={0.1} />
        <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-serif-luxury text-white tracking-widest flex-shrink-0 leading-none">
          Curating
        </h2>
        <ImageCard index={1} gallery={gallery} onSelectMedia={onSelectMedia} className="w-24 h-14 md:w-64 md:h-36" delay={0.2} />
        <ImageCard index={2} gallery={gallery} onSelectMedia={onSelectMedia} className="w-20 h-12 md:w-56 md:h-32" delay={0.3} />
        <ImageCard index={3} gallery={gallery} onSelectMedia={onSelectMedia} className="w-24 h-14 md:w-72 md:h-40 hidden lg:block" delay={0.4} />
      </div>

      {/* ROW 2 */}
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full flex-nowrap -translate-x-8 md:-translate-x-24">
        <ImageCard index={4} gallery={gallery} onSelectMedia={onSelectMedia} className="w-24 h-14 md:w-72 md:h-40" delay={0.2} />
        <ImageCard index={5} gallery={gallery} onSelectMedia={onSelectMedia} className="w-20 h-12 md:w-64 md:h-36 hidden sm:block" delay={0.3} />
        <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-serif-luxury text-white tracking-widest flex-shrink-0 leading-none">
          Iconic
        </h2>
        <ImageCard index={6} gallery={gallery} onSelectMedia={onSelectMedia} className="w-20 h-12 md:w-56 md:h-32" delay={0.4} />
        <ImageCard index={7} gallery={gallery} onSelectMedia={onSelectMedia} className="w-24 h-14 md:w-72 md:h-40 hidden md:block" delay={0.5} />
      </div>

      {/* ROW 3 */}
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full flex-nowrap translate-x-6 md:translate-x-8">
        <ImageCard index={8} gallery={gallery} onSelectMedia={onSelectMedia} className="w-24 h-14 md:w-72 md:h-40 hidden md:block" delay={0.3} />
        <h2 className="text-5xl md:text-8xl lg:text-[8rem] font-serif-luxury text-amber-400 tracking-widest flex-shrink-0 leading-none">
          Moments
        </h2>
        <ImageCard index={9} gallery={gallery} onSelectMedia={onSelectMedia} className="w-24 h-14 md:w-64 md:h-36" delay={0.4} />
        <ImageCard index={10} gallery={gallery} onSelectMedia={onSelectMedia} className="w-20 h-12 md:w-56 md:h-32 hidden lg:block" delay={0.5} />
      </div>

    </div>
  );
};

export default Chapter3_Gallery;
