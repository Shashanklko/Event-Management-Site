import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardGallery = ({ gallery, addGalleryItem, deleteGalleryItem }) => {
  const [galleryForm, setGalleryForm] = useState({ title: "", category: "Corporate", url: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGalleryItem(galleryForm);
    setGalleryForm({ title: "", category: "Corporate", url: "" });
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Gallery Curator</h1>
        <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Catalog website media listings and upload assets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Curator Form */}
        <div className="lg:col-span-4">
          <GlassCard>
            <h3 className="text-lg font-light text-white mb-6 font-serif-luxury">Catalog Media</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Title Caption *</label>
                <input
                  type="text" required
                  value={galleryForm.title}
                  onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="Grand Hall Banquet Lighting"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Section Category *</label>
                <select
                  value={galleryForm.category}
                  onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="Corporate">Corporate Galas</option>
                  <option value="Weddings">Weddings</option>
                  <option value="Exhibitions">Exhibitions</option>
                  <option value="Product Launches">Product Launches</option>
                  <option value="Custom Event Planning">Custom Event Curation</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Media Image URL *</label>
                <input
                  type="url" required
                  value={galleryForm.url}
                  onChange={e => setGalleryForm({ ...galleryForm, url: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-semibold tracking-wider text-xs uppercase rounded-lg shadow-lg cursor-pointer focus:outline-none"
              >
                Publish Media Asset
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Gallery List */}
        <div className="lg:col-span-8">
          <GlassCard>
            <h3 className="text-lg font-light text-white mb-6 font-serif-luxury">Active Media Grid</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map(media => (
                <div key={media.id} className="group relative overflow-hidden rounded-xl border border-white/5 aspect-square bg-slate-950">
                  <img src={media.url} alt={media.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-4 text-left">
                    <div>
                      <div className="text-[9px] text-amber-400 uppercase tracking-widest font-semibold">{media.category}</div>
                      <div className="text-xs text-white mt-1 font-serif-luxury leading-relaxed">{media.title}</div>
                    </div>

                    <button
                      onClick={() => deleteGalleryItem(media.id)}
                      className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-[10px] tracking-wider uppercase rounded-lg flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Asset
                    </button>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full text-center py-12 text-xs text-slate-500">No media assets published in gallery.</div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardGallery;
