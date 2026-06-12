import React, { useState, useEffect } from "react";
import { Trash2, Mail, Check } from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardInquiries = ({
  inquiries,
  deleteInquiry,
  markInquiryRead,
  contactDetails = {},
  updateContactDetails
}) => {
  const [form, setForm] = useState({
    email: "",
    address: "",
    linkedin: "",
    twitter: "",
    instagram: ""
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (contactDetails) {
      setForm({
        email: contactDetails.email || "",
        address: contactDetails.address || "",
        linkedin: contactDetails.linkedin || "",
        twitter: contactDetails.twitter || "",
        instagram: contactDetails.instagram || ""
      });
    }
  }, [contactDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContactDetails(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Contact Us Details</h1>
        <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Review contact form submissions, registration applications and client RSVPs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Manage Details Form (5 cols on lg) */}
        <div className="lg:col-span-5 w-full">
          <GlassCard className="flex flex-col gap-5 border border-white/10 p-6 md:p-8">
            <div>
              <h3 className="text-lg font-light text-white font-serif-luxury">Update Public Info</h3>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-1">Change details rendered on the live website</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Contact Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="hello@elysian.org"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Postal Address</label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  placeholder="144 Luxury Avenue..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">LinkedIn Handle URL</label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={e => setForm({ ...form, linkedin: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Twitter Handle URL</label>
                <input
                  type="url"
                  value={form.twitter}
                  onChange={e => setForm({ ...form, twitter: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Instagram Handle URL</label>
                <input
                  type="url"
                  value={form.instagram}
                  onChange={e => setForm({ ...form, instagram: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-bold tracking-wider text-[10px] uppercase rounded-lg shadow-md transition-all cursor-pointer focus:outline-none flex items-center justify-center gap-2 font-mono"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Details Dispatched
                  </>
                ) : (
                  "Update Details"
                )}
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Right Column: Inbox list (7 cols on lg) */}
        <div className="lg:col-span-7 w-full">
          <GlassCard className="border border-white/10 p-6 md:p-8">
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

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 flex-shrink-0">
                      <span className="text-[10px] text-slate-500 font-mono">{inq.date}</span>
                      <div className="flex gap-2 sm:flex-col w-full">
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${inq.email}&su=${encodeURIComponent(`Re: Elysian Contact Inquiry`)}&body=${encodeURIComponent(`Dear ${inq.name},\n\n`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] tracking-wider uppercase font-semibold border border-amber-500/15 bg-amber-400/5 hover:bg-amber-400/10 text-amber-300 hover:text-amber-200 rounded-lg cursor-pointer focus:outline-none text-center"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Reply
                        </a>
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
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardInquiries;
