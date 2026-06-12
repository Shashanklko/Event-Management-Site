import React, { useState } from "react";
import {
  Plus, Edit, Trash2, CheckCircle, CheckSquare,
  DollarSign, X, Clock, Square, Check
} from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardEvents = ({
  events, addEvent, updateEvent, deleteEvent, markEventCompleted
}) => {
  // Local state managers
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [trackingEventId, setTrackingEventId] = useState(null);

  // Forms state
  const [eventForm, setEventForm] = useState({
    title: "", category: "Corporate", date: "", venue: "",
    description: "", image: "", budgetTotal: 0, budgetSpent: 0
  });

  const activeTrackingEvent = events.find(e => e.id === trackingEventId);

  const handleTaskToggle = (eventId, taskId) => {
    const evt = events.find(e => e.id === eventId);
    if (!evt) return;

    const updatedTasks = evt.tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });

    updateEvent(eventId, { tasks: updatedTasks });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addEvent(eventForm);
    setShowAddEvent(false);
    setEventForm({ title: "", category: "Corporate", date: "", venue: "", description: "", image: "", budgetTotal: 0, budgetSpent: 0 });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateEvent(editingEvent.id, {
      title: editingEvent.title,
      category: editingEvent.category,
      date: editingEvent.date,
      venue: editingEvent.venue,
      description: editingEvent.description,
      image: editingEvent.image,
      budgetTotal: editingEvent.budget.total,
      budgetSpent: editingEvent.budget.spent
    });
    setEditingEvent(null);
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Events Workspace</h1>
          <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Edit, monitor, update and analyze case studies.</p>
        </div>

        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-lg shadow-[0_4px_15px_rgba(212,175,55,0.2)] transition-all cursor-pointer focus:outline-none"
        >
          <Plus className="w-4 h-4" />
          Add Event Pipeline
        </button>
      </div>

      {/* DETAILED TRACKER BOARD */}
      {activeTrackingEvent ? (
        <GlassCard className="border-amber-400/25 bg-[#0B0F19]/80">
          <div className="flex justify-between items-start mb-6">
            <div>
              <button
                onClick={() => setTrackingEventId(null)}
                className="text-[10px] tracking-wider text-slate-400 uppercase hover:text-white mb-2 flex items-center gap-1 focus:outline-none cursor-pointer"
              >
                ← Back to events list
              </button>
              <h2 className="text-2xl font-light text-white font-serif-luxury">{activeTrackingEvent.title}</h2>
              <span className="text-xs text-slate-500 mt-1 block">{activeTrackingEvent.venue}</span>
            </div>

            <div className="text-right">
              <div className="text-3xl font-light text-amber-300 font-mono">{activeTrackingEvent.completionPercentage}%</div>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold block">Recalculated Progress</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-500" style={{ width: `${activeTrackingEvent.completionPercentage}%` }} />
          </div>

          {/* Tracking statuses flags */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Planning", status: activeTrackingEvent.planningStatus },
              { label: "Venue Booked", status: activeTrackingEvent.venueStatus },
              { label: "Vendors Confirmed", status: activeTrackingEvent.vendorStatus },
              { label: "Marketing Active", status: activeTrackingEvent.marketingStatus },
              { label: "Execution Stage", status: activeTrackingEvent.executionStatus }
            ].map((flag, idx) => (
              <div key={idx} className={`border p-3 rounded-lg text-center ${flag.status ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-slate-900 border-white/5 text-slate-500"
                }`}>
                <div className="text-[9px] uppercase tracking-widest font-semibold mb-1">{flag.label}</div>
                <div className="text-xs font-semibold">{flag.status ? "✓ ACTIVE" : "• PENDING"}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Task checklist */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <h3 className="text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">Milestone Checklist Tasks</h3>

              {activeTrackingEvent.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleTaskToggle(activeTrackingEvent.id, task.id)}
                  className="bg-white/2 hover:bg-white/4 border border-white/5 rounded-xl p-4 flex items-center gap-4 cursor-pointer select-none transition-all"
                >
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${task.completed ? "text-slate-400 line-through font-light" : "text-slate-200"}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Operational Telemetry */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">Operational Telemetry</h3>

              <GlassCard className="p-6 flex flex-col gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Financial Budget Health</div>
                  <div className="text-lg text-white font-medium flex items-center gap-1 font-sans">
                    <DollarSign className="w-4.5 h-4.5 text-amber-400" />
                    {activeTrackingEvent.budget.spent.toLocaleString()} / {activeTrackingEvent.budget.total.toLocaleString()}
                  </div>
                  <span className={`text-[9px] uppercase tracking-widest font-semibold ${activeTrackingEvent.budget.status === "Over Budget" ? "text-red-400" : "text-emerald-400"
                    }`}>
                    {activeTrackingEvent.budget.status}
                  </span>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">Assigned Staff</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTrackingEvent.teamAssignments.length > 0 ? (
                      activeTrackingEvent.teamAssignments.map((name, idx) => (
                        <span key={idx} className="bg-slate-900 border border-white/5 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-slate-300">
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No assigned staff</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <button
                    onClick={() => markEventCompleted(activeTrackingEvent.id)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold tracking-wider text-xs uppercase rounded-lg transition-all focus:outline-none cursor-pointer"
                  >
                    Mark Stage Complete (100%)
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </GlassCard>
      ) : (
        /* MAIN LIST */
        <div className="grid grid-cols-1 gap-6">
          {events.map((evt) => (
            <GlassCard key={evt.id} className="hover:border-white/10">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/5 bg-slate-900 hidden sm:block">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest mb-1.5 font-semibold">
                      <span className="text-amber-400">{evt.category}</span>
                      <span>•</span>
                      <span>{evt.date}</span>
                    </div>
                    <h3 className="text-xl font-light text-white font-serif-luxury">{evt.title}</h3>
                    <span className="text-xs text-slate-400 font-light mt-0.5 block">{evt.venue}</span>
                  </div>
                </div>

                {/* Status indicator array */}
                <div className="grid grid-cols-5 gap-2 border-y lg:border-y-0 lg:border-x border-white/5 px-0 lg:px-6 py-4 lg:py-0 w-full lg:w-auto">
                  {[
                    { label: "Plan", active: evt.planningStatus },
                    { label: "Venue", active: evt.venueStatus },
                    { label: "Vendor", active: evt.vendorStatus },
                    { label: "Promo", active: evt.marketingStatus },
                    { label: "Exec", active: evt.executionStatus }
                  ].map((flg, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-[8px] uppercase tracking-widest font-semibold mb-1 ${flg.active ? "text-amber-300" : "text-slate-600"
                        }`}>{flg.label}</div>
                      <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${flg.active ? "bg-amber-400/10 text-amber-300 border border-amber-400/20" : "bg-slate-950 text-slate-700 border border-white/2"
                        }`}>{flg.active ? "✓" : "•"}</div>
                    </div>
                  ))}
                </div>

                {/* Budget and Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto">
                  <div className="text-left lg:text-right">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-0.5">Completion</div>
                    <div className="text-sm text-white font-semibold font-mono">{evt.completionPercentage}%</div>
                    <div className="w-16 bg-slate-800 h-1 rounded-full overflow-hidden mt-1 lg:ml-auto">
                      <div className="bg-amber-400 h-full" style={{ width: `${evt.completionPercentage}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTrackingEventId(evt.id)}
                      className="p-2.5 rounded-lg border border-white/5 bg-white/3 hover:bg-white/5 text-amber-400 hover:text-amber-300 cursor-pointer focus:outline-none"
                      title="Monitor Progress"
                    >
                      <CheckSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingEvent(evt)}
                      className="p-2.5 rounded-lg border border-white/5 bg-white/3 hover:bg-white/5 text-slate-300 hover:text-white cursor-pointer focus:outline-none"
                      title="Edit Event"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteEvent(evt.id)}
                      className="p-2.5 rounded-lg border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 cursor-pointer focus:outline-none"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </GlassCard>
          ))}
          {events.length === 0 && (
            <div className="text-center py-12 text-slate-500">No events registered in system pipeline.</div>
          )}
        </div>
      )}

      {/* ==================== FORM MODALS ==================== */}

      {/* 1. ADD EVENT MODAL */}
      {showAddEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <GlassCard className="w-full max-w-2xl border border-white/10 relative text-left">
            <button
              onClick={() => setShowAddEvent(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-white hover:border-amber-400 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-light text-white mb-6 font-serif-luxury">Launch Event Pipeline</h3>

            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Event Title *</label>
                  <input
                    type="text" required
                    value={eventForm.title}
                    onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    placeholder="Grand Symphony Gala"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Category *</label>
                  <select
                    value={eventForm.category}
                    onChange={e => setEventForm({ ...eventForm, category: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="Corporate">Corporate Galas & Summits</option>
                    <option value="Wedding">Bespoke Weddings</option>
                    <option value="Conferences">Conferences</option>
                    <option value="Exhibitions">Art & Media Exhibitions</option>
                    <option value="Product Launches">Cinematic Brand Releases</option>
                    <option value="Award Ceremonies">Award Ceremonies</option>
                    <option value="Custom Event Planning">Custom Event Curation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Execution Date *</label>
                  <input
                    type="date" required
                    value={eventForm.date}
                    onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Luxury Venue *</label>
                  <input
                    type="text" required
                    value={eventForm.venue}
                    onChange={e => setEventForm({ ...eventForm, venue: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    placeholder="Palazzo Pisani Moretta, Venice"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Total Financial Budget ($) *</label>
                  <input
                    type="number" required
                    value={eventForm.budgetTotal}
                    onChange={e => setEventForm({ ...eventForm, budgetTotal: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Spent Budget ($)</label>
                  <input
                    type="number"
                    value={eventForm.budgetSpent}
                    onChange={e => setEventForm({ ...eventForm, budgetSpent: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Image Case-Study Cover URL</label>
                <input
                  type="url"
                  value={eventForm.image}
                  onChange={e => setEventForm({ ...eventForm, image: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Conceptual Synopsis *</label>
                <textarea
                  required rows={3}
                  value={eventForm.description}
                  onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none resize-none"
                  placeholder="Describe the aesthetic direction, layout limits and key guest experience profiles..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-bold tracking-wider text-xs uppercase rounded-lg shadow-lg cursor-pointer focus:outline-none"
              >
                Launch Pipeline Track
              </button>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 2. EDIT EVENT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <GlassCard className="w-full max-w-2xl border border-white/10 relative text-left">
            <button
              onClick={() => setEditingEvent(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-white hover:border-amber-400 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-light text-white mb-6 font-serif-luxury">Update Event Case Study</h3>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Event Title *</label>
                  <input
                    type="text" required
                    value={editingEvent.title}
                    onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Category *</label>
                  <select
                    value={editingEvent.category}
                    onChange={e => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="Corporate">Corporate Galas & Summits</option>
                    <option value="Wedding">Bespoke Weddings</option>
                    <option value="Conferences">Conferences</option>
                    <option value="Exhibitions">Art & Media Exhibitions</option>
                    <option value="Product Launches">Cinematic Brand Releases</option>
                    <option value="Award Ceremonies">Award Ceremonies</option>
                    <option value="Custom Event Planning">Custom Event Curation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Execution Date *</label>
                  <input
                    type="date" required
                    value={editingEvent.date}
                    onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Luxury Venue *</label>
                  <input
                    type="text" required
                    value={editingEvent.venue}
                    onChange={e => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Total Financial Budget ($) *</label>
                  <input
                    type="number" required
                    value={editingEvent.budget.total}
                    onChange={e => setEditingEvent({
                      ...editingEvent,
                      budget: { ...editingEvent.budget, total: Number(e.target.value) }
                    })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Spent Budget ($)</label>
                  <input
                    type="number"
                    value={editingEvent.budget.spent}
                    onChange={e => setEditingEvent({
                      ...editingEvent,
                      budget: { ...editingEvent.budget, spent: Number(e.target.value) }
                    })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Image Case-Study Cover URL</label>
                <input
                  type="url"
                  value={editingEvent.image}
                  onChange={e => setEditingEvent({ ...editingEvent, image: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Conceptual Synopsis *</label>
                <textarea
                  required rows={3}
                  value={editingEvent.description}
                  onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-bold tracking-wider text-xs uppercase rounded-lg shadow-lg cursor-pointer focus:outline-none"
              >
                Update Case Study
              </button>
            </form>
          </GlassCard>
        </div>
      )}

    </div>
  );
};

export default DashboardEvents;
