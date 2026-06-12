import React, { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardEvents = ({ events, addEvent, updateEvent, deleteEvent }) => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const initialFormState = {
    title: "", date: "", image: "", teamAssignments: "",
    completed: false, venue: "", host: "", description: "",
    guestLecturer: "", registerLinks: ""
  };

  const [eventForm, setEventForm] = useState(initialFormState);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addEvent({
      ...eventForm,
      teamAssignments: eventForm.teamAssignments.split(",").map(s => s.trim()).filter(Boolean),
      registerLinks: eventForm.registerLinks.split(",").map(s => s.trim()).filter(Boolean)
    });
    setShowAddEvent(false);
    setEventForm(initialFormState);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateEvent(editingEvent.id, {
      ...editingEvent,
      teamAssignments: typeof editingEvent.teamAssignments === 'string' 
        ? editingEvent.teamAssignments.split(",").map(s => s.trim()).filter(Boolean)
        : editingEvent.teamAssignments,
      registerLinks: typeof editingEvent.registerLinks === 'string'
        ? editingEvent.registerLinks.split(",").map(s => s.trim()).filter(Boolean)
        : editingEvent.registerLinks
    });
    setEditingEvent(null);
  };

  const openEditModal = (evt) => {
    setEditingEvent({
      ...evt,
      teamAssignments: evt.teamAssignments ? evt.teamAssignments.join(", ") : "",
      registerLinks: evt.registerLinks ? evt.registerLinks.join(", ") : "",
      venue: evt.venue || "",
      host: evt.host || "",
      description: evt.description || "",
      guestLecturer: evt.guestLecturer || ""
    });
  };

  const upcomingEvents = events.filter(e => !e.completed);
  const pastEvents = events.filter(e => e.completed);

  // Common Form Fields renderer to avoid duplication
  const renderFormFields = (formState, setFormState) => (
    <>
      <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
        <input 
          type="checkbox" 
          id="isCompleted"
          checked={formState.completed}
          onChange={e => setFormState({ ...formState, completed: e.target.checked })}
          className="w-4 h-4 accent-amber-500 cursor-pointer"
        />
        <label htmlFor="isCompleted" className="text-xs font-semibold text-amber-400 uppercase tracking-widest cursor-pointer">
          Event is Past / Completed
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Event Title *</label>
          <input type="text" required value={formState.title} onChange={e => setFormState({ ...formState, title: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Date *</label>
          <input type="date" required value={formState.date} onChange={e => setFormState({ ...formState, date: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Team Members (comma separated)</label>
        <input type="text" value={formState.teamAssignments} onChange={e => setFormState({ ...formState, teamAssignments: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none" placeholder="John Doe, Jane Smith" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Image URL</label>
        <input type="url" value={formState.image} onChange={e => setFormState({ ...formState, image: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none" placeholder="https://..." />
      </div>

      {formState.completed ? (
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Venue (Past Events) *</label>
          <input type="text" required value={formState.venue} onChange={e => setFormState({ ...formState, venue: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none" placeholder="Oxford Amphitheater" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Host Organization</label>
              <input type="text" value={formState.host} onChange={e => setFormState({ ...formState, host: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Guest Lecturer</label>
              <input type="text" value={formState.guestLecturer} onChange={e => setFormState({ ...formState, guestLecturer: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none" />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Registration Links (comma separated)</label>
            <input type="text" value={formState.registerLinks} onChange={e => setFormState({ ...formState, registerLinks: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none" placeholder="https://link1.com, https://link2.com" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Event Description *</label>
            <textarea required rows={3} value={formState.description} onChange={e => setFormState({ ...formState, description: e.target.value })} className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none resize-none" />
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Events Workspace</h1>
          <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Manage Upcoming and Past events.</p>
        </div>

        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-lg transition-all cursor-pointer focus:outline-none"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* UPCOMING EVENTS */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-serif-luxury text-amber-400">Upcoming Gatherings</h2>
          {upcomingEvents.map(evt => (
            <GlassCard key={evt.id} className="hover:border-amber-500/30 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{evt.date}</div>
                  <h3 className="text-lg text-white font-light font-serif-luxury">{evt.title}</h3>
                  <div className="text-xs text-slate-400 mt-1">{evt.host}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(evt)} className="p-2 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => deleteEvent(evt.id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </GlassCard>
          ))}
          {upcomingEvents.length === 0 && <div className="text-slate-500 text-sm">No upcoming events.</div>}
        </div>

        {/* PAST EVENTS */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-serif-luxury text-indigo-400">Past Experiences</h2>
          {pastEvents.map(evt => (
            <GlassCard key={evt.id} className="hover:border-indigo-500/30 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{evt.date}</div>
                  <h3 className="text-lg text-white font-light font-serif-luxury">{evt.title}</h3>
                  <div className="text-xs text-slate-400 mt-1">{evt.venue}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(evt)} className="p-2 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => deleteEvent(evt.id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </GlassCard>
          ))}
          {pastEvents.length === 0 && <div className="text-slate-500 text-sm">No past events.</div>}
        </div>
      </div>

      {/* ADD EVENT MODAL */}
      {showAddEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <GlassCard className="w-full max-w-2xl border border-white/10 relative text-left">
            <button onClick={() => setShowAddEvent(false)} className="absolute top-4 right-4 z-20 p-2 text-white hover:text-amber-400">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-2xl font-light text-white mb-6 font-serif-luxury">Create Event</h3>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              {renderFormFields(eventForm, setEventForm)}
              <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B0F19] font-bold uppercase rounded-lg">Save Event</button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* EDIT EVENT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <GlassCard className="w-full max-w-2xl border border-white/10 relative text-left">
            <button onClick={() => setEditingEvent(null)} className="absolute top-4 right-4 z-20 p-2 text-white hover:text-amber-400">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-2xl font-light text-white mb-6 font-serif-luxury">Edit Event</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              {renderFormFields(editingEvent, setEditingEvent)}
              <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B0F19] font-bold uppercase rounded-lg">Update Event</button>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default DashboardEvents;
