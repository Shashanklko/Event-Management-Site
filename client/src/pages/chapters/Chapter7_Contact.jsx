import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const InputLine = ({ label, type = "text", value, onChange, placeholder, required = false }) => (
  <div className="relative w-full group">
    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-2">
      {label} {required && <span className="text-amber-500">*</span>}
    </div>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-white/10 text-white placeholder:text-white/20 pb-4 focus:outline-none focus:border-amber-400 transition-colors duration-300 resize-none font-light min-h-[100px]"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-white/10 text-white placeholder:text-white/20 pb-4 focus:outline-none focus:border-amber-400 transition-colors duration-300 font-light"
      />
    )}
  </div>
);

const Chapter9_Contact = ({ submitInquiry }) => {
  const [contactForm, setContactForm] = useState({ name: "", email: "", inquiry: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitInquiry(contactForm);
    setContactSuccess(true);
    setContactForm({ name: "", email: "", inquiry: "" });
    setTimeout(() => setContactSuccess(false), 4000);
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar relative select-none bg-[#050810]">
      
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between px-6 md:px-12 py-24 gap-20">
        
        {/* Left Side: Massive Typography */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col gap-12"
        >
          <div>
            <div className="text-[10px] uppercase tracking-[0.5em] text-amber-500/80 mb-6 font-mono">
              Contact Desk
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif-luxury text-white tracking-widest leading-none">
              START A<br/>
              <span className="text-amber-50">DIALOGUE.</span>
            </h1>
          </div>

          <div className="flex flex-col gap-6 text-sm font-light text-slate-400">
            <p className="max-w-md leading-relaxed">
              Whether you're an institution looking to host an unprecedented summit, or a delegate with a vision—we're here.
            </p>
            <div className="w-12 h-[1px] bg-white/20" />
            
            <div className="flex flex-col gap-4 mt-4">
              <a href="mailto:hello@elysian.org" className="text-xl md:text-2xl font-serif-luxury text-white hover:text-amber-400 transition-colors duration-300">
                hello@elysian.org
              </a>
              <div className="flex gap-6 text-[10px] uppercase tracking-widest font-mono text-slate-500">
                <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Twitter</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Minimalist Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="w-full lg:w-1/2 max-w-xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 mt-4 lg:mt-12">
            
            <InputLine 
              label="Your Name" 
              value={contactForm.name} 
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})} 
              placeholder="Jane Doe" 
              required 
            />

            <InputLine 
              label="Email Address" 
              type="email"
              value={contactForm.email} 
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})} 
              placeholder="jane@institution.edu" 
              required 
            />

            <InputLine 
              label="How can we help?" 
              type="textarea"
              value={contactForm.inquiry} 
              onChange={(e) => setContactForm({...contactForm, inquiry: e.target.value})} 
              placeholder="Describe your vision..." 
              required 
            />

            <div className="flex items-center justify-between mt-4">
              <button 
                type="submit"
                className="group relative flex items-center gap-6"
              >
                <span className="text-sm tracking-[0.3em] font-mono text-white uppercase group-hover:text-amber-400 transition-colors duration-300">
                  Send Message
                </span>
                <div className="w-12 h-[1px] bg-white group-hover:bg-amber-400 transition-colors duration-300 relative">
                  <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-white group-hover:text-amber-400 transition-all duration-300 group-hover:translate-x-2" />
                </div>
              </button>

              <AnimatePresence>
                {contactSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] tracking-widest text-amber-500 font-mono uppercase"
                  >
                    Message Received
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Chapter9_Contact;
