import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// Glassmorphic Card
export const GlassCard = ({ children, className = "", hoverable = true, ...props }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-6 md:p-8 ${
        hoverable ? "glass-card-hover" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Glow blobs in the background
export const GlowBg = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[10%] left-[20%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-purple-700/10 blur-[100px] md:blur-[160px] animate-blob" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-blue-600/10 blur-[100px] md:blur-[150px] animate-blob [animation-delay:3s]" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-amber-500/5 blur-[90px] md:blur-[140px] animate-blob [animation-delay:6s]" />
    </div>
  );
};

// Animated Numbers
export const CountUp = ({ to, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(to, 10);
    if (isNaN(end)) return;

    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, duration, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

// Framer Motion reveal on scroll
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  xOffset = 0,
  scale = 1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { 
          opacity: 0, 
          y: yOffset, 
          x: xOffset,
          scale: scale 
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: {
            duration: duration,
            delay: delay,
            ease: [0.16, 1, 0.3, 1] // Custom luxury ease-out
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
