import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, KeyRound, AlertTriangle, X, Eye, EyeOff } from "lucide-react";
import { useEvents } from "../context/EventContext";
import { GlassCard, GlowBg } from "../components/ui";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { adminLogin, isAdminLoggedIn } = useEvents();
  const navigate = useNavigate();

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const success = adminLogin(username, password);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credential configurations. Access Denied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blurs */}
      <GlowBg />

      <div className="w-full max-w-md relative z-10">
        <GlassCard className="border border-white/10 shadow-2xl p-8 md:p-10 relative">
          {/* Close Button */}
          <button 
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 p-2 rounded-full border border-white/5 hover:border-amber-400/30 bg-white/3 hover:bg-white/8 text-slate-400 hover:text-amber-400 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center"
            title="Go to Live Website"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-light text-white font-serif-luxury tracking-wide">
              Elysian Management
            </h2>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
              Secure Operations Terminal
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Administrator Username
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-white/3 border border-white/5 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Secure Pin Password
              </label>
              <div className="relative">
              <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/3 border border-white/5 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer focus:outline-none"
                  tabIndex={-1}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-bold tracking-wider text-xs uppercase rounded-lg shadow-[0_4px_25px_rgba(212,175,55,0.2)] transition-all cursor-pointer focus:outline-none"
            >
              Sign In Terminal
            </button>
          </form>



        </GlassCard>
      </div>
    </div>
  );
};

export default AdminLogin;
