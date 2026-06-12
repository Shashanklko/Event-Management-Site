import React from "react";
import { Trash2 } from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardInquiries = ({ inquiries, deleteInquiry, markInquiryRead }) => {
  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Inquiry Inbox</h1>
        <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Review contact form submissions, registration applications and client RSVPs.</p>
      </div>

      <GlassCard>
        <h3 className="text-lg font-light text-white mb-6 font-serif-luxury">Message Inbox List</h3>

        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm font-light">
            No contact inquiries registered in queue inbox.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {inquiries.map(inq => (
              <div
                key={inq.id}
                onClick={() => markInquiryRead(inq.id)}
                className={`border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${inq.status === "new" ? "bg-amber-400/5 border-amber-500/25" : "bg-white/2 border-white/5"
                  }`}
              >
                <div className="flex-1 flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-semibold text-white">{inq.name}</h4>
                    <span className="bg-slate-900 border border-white/5 text-[9px] uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded-full">
                      {inq.eventType}
                    </span>
                    {inq.status === "new" && (
                      <span className="bg-amber-400 text-[#0B0F19] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 font-light">
                    Email: <span className="text-white select-all">{inq.email}</span> // Phone: <span className="text-white select-all">{inq.phone || "N/A"}</span>
                  </div>
                  <p className="text-slate-300 text-sm font-light leading-relaxed mt-2 p-3 bg-slate-950/40 rounded-lg border border-white/2 select-text">
                    {inq.message}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 flex-shrink-0">
                  <span className="text-[10px] text-slate-500 font-mono">{inq.date}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteInquiry(inq.id);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] tracking-wider uppercase font-semibold border border-red-500/15 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg cursor-pointer focus:outline-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default DashboardInquiries;
