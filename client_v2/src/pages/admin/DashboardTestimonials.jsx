import React, { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardTestimonials = ({ testimonials, addTestimonial, deleteTestimonial }) => {
  const [testimonialForm, setTestimonialForm] = useState({ clientName: "", company: "", feedback: "", rating: 5, image: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTestimonial(testimonialForm);
    setTestimonialForm({ clientName: "", company: "", feedback: "", rating: 5, image: "" });
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Testimonials Desk</h1>
        <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Review feedback quotes and add verified client recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-4">
          <GlassCard>
            <h3 className="text-lg font-light text-white mb-6 font-serif-luxury">Log Review Quote</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Client Name *</label>
                <input
                  type="text" required
                  value={testimonialForm.clientName}
                  onChange={e => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="Countess Jacqueline"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Client Company / Title</label>
                <input
                  type="text"
                  value={testimonialForm.company}
                  onChange={e => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="Private Client"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Rating Score (1-5)</label>
                <input
                  type="number" min="1" max="5"
                  value={testimonialForm.rating}
                  onChange={e => setTestimonialForm({ ...testimonialForm, rating: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Client Photo URL</label>
                <input
                  type="url"
                  value={testimonialForm.image}
                  onChange={e => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Review Quote Message *</label>
                <textarea
                  required rows={3}
                  value={testimonialForm.feedback}
                  onChange={e => setTestimonialForm({ ...testimonialForm, feedback: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Type client quote description here..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-semibold tracking-wider text-xs uppercase rounded-lg shadow-lg cursor-pointer focus:outline-none"
              >
                Publish Review Quote
              </button>
            </form>
          </GlassCard>
        </div>

        {/* List */}
        <div className="lg:col-span-8">
          <GlassCard>
            <h3 className="text-lg font-light text-white mb-6 font-serif-luxury">Active Quotes</h3>

            <div className="flex flex-col gap-4">
              {testimonials.map(t => (
                <div key={t.id} className="bg-white/2 border border-white/5 rounded-xl p-4 flex gap-4 items-start justify-between">
                  <div className="flex gap-4">
                    <img src={t.image} alt={t.clientName} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{t.clientName}</h4>
                        <span className="text-[10px] text-slate-500">{t.company}</span>
                      </div>
                      <div className="flex gap-0.5 my-1.5">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs font-light text-slate-400 leading-relaxed italic">“{t.feedback}”</p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-2 border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg cursor-pointer focus:outline-none"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {testimonials.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">No client testimonials reviews logged.</div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardTestimonials;
