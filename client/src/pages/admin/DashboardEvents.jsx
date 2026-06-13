import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, CheckCircle, Clock, CalendarCheck, AlertCircle } from "lucide-react";
import { GlassCard } from "../../components/ui";

// ── Derive live event status from schedule fields ──────────────────────────
const getEventStatus = (evt) => {
  if (evt.completed) return "past";
  if (!evt.date) return "upcoming";
  const now = new Date();
  const start = new Date(`${evt.date}T${evt.startTime || "00:00"}`);
  let end;
  if (evt.endTime) {
    end = new Date(`${evt.date}T${evt.endTime}`);
    // Handle midnight crossover (e.g. event runs 22:00 → 02:00)
    if (end <= start) end.setDate(end.getDate() + 1);
  } else {
    const durationHours = Math.max(Number(evt.duration) || 2, 0.25);
    end = new Date(start.getTime() + durationHours * 3600000);
  }
  if (now >= start && now < end) return "ongoing";
  return "upcoming";
};

const isRegistrationClosed = (evt) => {
  if (!evt.registrationDeadline) return false;
  return new Date() > new Date(evt.registrationDeadline);
};

// ── Form field components ──────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">{label}</label>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`bg-white/3 border border-white/8 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/60 transition-colors placeholder:text-slate-600 ${className}`}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`bg-white/3 border border-white/8 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/60 transition-colors placeholder:text-slate-600 resize-none ${className}`}
  />
);

// ── Status badge component ─────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  if (status === "ongoing") return (
    <span className="flex items-center gap-1.5 text-[8px] tracking-widest uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-500/25 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      Live Now
    </span>
  );
  return null;
};

// ── Modal wrapper ──────────────────────────────────────────────────────────
const Modal = ({ title, accent = "amber", onClose, onSubmit, children }) => (
  <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-16 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
    <GlassCard className="w-full max-w-2xl border border-white/10 relative text-left my-4 shadow-2xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-white hover:border-white/30 cursor-pointer focus:outline-none transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <h3 className={`text-2xl font-light mb-6 font-serif-luxury ${accent === "indigo" ? "text-indigo-300" : "text-white"}`}>
        {title}
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}
      </form>
    </GlassCard>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────
const DashboardEvents = ({ events, addEvent, updateEvent, deleteEvent, markEventCompleted }) => {
  const [showAddUpcoming, setShowAddUpcoming] = useState(false);
  const [showAddPast, setShowAddPast] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [tick, setTick] = useState(0); // force re-render for live status

  // Refresh status badges every 60 seconds automatically
  useEffect(() => {
    const interval = setInterval(() => setTick(n => n + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Form states ──────────────────────────────────────────────────────────
  const initialUpcoming = {
    title: "", date: "", startTime: "09:00", endTime: "", duration: "2",
    registrationDeadline: "", host: "", guestLecturer: "",
    description: "", registerLinks: "", teamAssignments: "", image: ""
  };
  const initialPast = {
    title: "", date: "", venue: "", host: "", guestLecturer: "",
    description: "", teamAssignments: "", image: ""
  };

  const [upcomingForm, setUpcomingForm] = useState(initialUpcoming);
  const [pastForm, setPastForm] = useState(initialPast);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleAddUpcoming = (e) => {
    e.preventDefault();
    addEvent({
      ...upcomingForm,
      completed: false,
      teamAssignments: upcomingForm.teamAssignments.split(",").map(s => s.trim()).filter(Boolean),
      registerLinks: upcomingForm.registerLinks.split(",").map(s => s.trim()).filter(Boolean)
    });
    setShowAddUpcoming(false);
    setUpcomingForm(initialUpcoming);
  };

  const handleAddPast = (e) => {
    e.preventDefault();
    addEvent({
      ...pastForm,
      completed: true,
      teamAssignments: pastForm.teamAssignments.split(",").map(s => s.trim()).filter(Boolean)
    });
    setShowAddPast(false);
    setPastForm(initialPast);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateEvent(editingEvent.id, {
      ...editingEvent,
      teamAssignments: typeof editingEvent.teamAssignments === "string"
        ? editingEvent.teamAssignments.split(",").map(s => s.trim()).filter(Boolean)
        : editingEvent.teamAssignments,
      registerLinks: typeof editingEvent.registerLinks === "string"
        ? editingEvent.registerLinks.split(",").map(s => s.trim()).filter(Boolean)
        : editingEvent.registerLinks ?? []
    });
    setEditingEvent(null);
  };

  const openEditModal = (evt) => {
    setEditingEvent({
      ...evt,
      teamAssignments: Array.isArray(evt.teamAssignments) ? evt.teamAssignments.join(", ") : "",
      registerLinks: Array.isArray(evt.registerLinks) ? evt.registerLinks.join(", ") : ""
    });
  };

  const upcomingEvents = events.filter(e => !e.completed);
  const pastEvents = events.filter(e => e.completed);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-8 text-left">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Events Workspace</h1>
          <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Manage upcoming gatherings and archive past experiences.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddPast(true)}
            className="flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all cursor-pointer focus:outline-none"
          >
            <Plus className="w-3.5 h-3.5" />
            Log Past Event
          </button>
          <button
            onClick={() => setShowAddUpcoming(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all cursor-pointer focus:outline-none shadow-[0_4px_12px_rgba(245,158,11,0.25)]"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Upcoming Event
          </button>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ── UPCOMING GATHERINGS ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-serif-luxury text-amber-400">Upcoming Gatherings</h2>
            {upcomingEvents.length > 0 && (
              <span className="text-[9px] bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                {upcomingEvents.length}
              </span>
            )}
          </div>

          {upcomingEvents.map(evt => {
            const status = getEventStatus(evt);
            const regClosed = isRegistrationClosed(evt);

            return (
              <GlassCard key={evt.id} className={`transition-all duration-300 ${status === "ongoing" ? "border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.08)]" : "hover:border-amber-500/20"}`}>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">

                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">{evt.date}</span>
                      {evt.startTime && (
                        <span className="text-[9px] text-slate-600 font-mono">
                          {evt.startTime}{evt.endTime ? ` → ${evt.endTime}` : ""}
                        </span>
                      )}
                      <StatusBadge status={status} />
                      {regClosed && status !== "ongoing" && (
                        <span className="text-[8px] tracking-wider uppercase font-semibold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                          Reg. Closed
                        </span>
                      )}
                      {!regClosed && evt.registrationDeadline && (
                        <span className="text-[8px] tracking-wider uppercase font-semibold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                          Open
                        </span>
                      )}
                    </div>

                    <h3 className="text-base text-white font-light font-serif-luxury truncate">{evt.title}</h3>

                    {evt.host && (
                      <div className="text-[10px] text-slate-400 mt-0.5">{evt.host}</div>
                    )}

                    {/* Time range + Registration deadline info */}
                    <div className="flex flex-wrap gap-3 mt-2">
                      {!evt.endTime && evt.duration && (
                        <span className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                          <Clock className="w-2.5 h-2.5" />
                          {evt.duration}h duration
                        </span>
                      )}
                      {evt.registrationDeadline && (
                        <span className={`flex items-center gap-1 text-[9px] font-mono ${regClosed ? "text-rose-500" : "text-sky-400"}`}>
                          <CalendarCheck className="w-2.5 h-2.5" />
                          Reg. by {new Date(evt.registrationDeadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons — 4 options */}
                  <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
                    <div className="flex items-center gap-1">
                      {/* Mark Done */}
                      <button
                        onClick={() => markEventCompleted(evt.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all cursor-pointer focus:outline-none"
                        title="Mark as Completed"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(evt)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all cursor-pointer focus:outline-none"
                        title="Edit Event"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer focus:outline-none"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}

          {upcomingEvents.length === 0 && (
            <div className="text-slate-600 text-sm font-light tracking-wide py-8 text-center border border-dashed border-white/5 rounded-xl">
              No upcoming events scheduled.
            </div>
          )}
        </div>

        {/* ── PAST EXPERIENCES ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-serif-luxury text-indigo-400">Past Experiences</h2>
            {pastEvents.length > 0 && (
              <span className="text-[9px] bg-indigo-400/10 text-indigo-400 border border-indigo-400/20 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                {pastEvents.length}
              </span>
            )}
          </div>

          {pastEvents.map(evt => (
            <GlassCard key={evt.id} className="hover:border-indigo-500/20 transition-colors">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mb-1">
                    {new Date(evt.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                  <h3 className="text-base text-white font-light font-serif-luxury truncate">{evt.title}</h3>
                  {evt.venue && <div className="text-[10px] text-slate-400 mt-0.5">{evt.venue}</div>}
                  {evt.host && !evt.venue && <div className="text-[10px] text-slate-400 mt-0.5">{evt.host}</div>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => openEditModal(evt)} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all cursor-pointer focus:outline-none" title="Edit">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteEvent(evt.id)} className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer focus:outline-none" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}

          {pastEvents.length === 0 && (
            <div className="text-slate-600 text-sm font-light tracking-wide py-8 text-center border border-dashed border-white/5 rounded-xl">
              No past events archived.
            </div>
          )}
        </div>
      </div>


      {/* ── ADD UPCOMING EVENT MODAL ── */}
      {showAddUpcoming && (
        <Modal
          title="Schedule Upcoming Gathering"
          accent="amber"
          onClose={() => setShowAddUpcoming(false)}
          onSubmit={handleAddUpcoming}
        >
          {/* Row 1: Title */}
          <Field label="Event Title *">
            <Input required value={upcomingForm.title} onChange={e => setUpcomingForm({ ...upcomingForm, title: e.target.value })} placeholder="Elysian MUN 2026" />
          </Field>

          {/* Row 2: Date + Start/End Time */}
          <div className="grid grid-cols-3 gap-4">
            <Field label="Event Date *">
              <Input type="date" required value={upcomingForm.date} onChange={e => setUpcomingForm({ ...upcomingForm, date: e.target.value })} />
            </Field>
            <Field label="Start Time *">
              <Input type="time" required value={upcomingForm.startTime} onChange={e => setUpcomingForm({ ...upcomingForm, startTime: e.target.value })} />
            </Field>
            <Field label="End Time">
              <Input type="time" value={upcomingForm.endTime} onChange={e => setUpcomingForm({ ...upcomingForm, endTime: e.target.value })} />
            </Field>
          </div>

          {/* Row 3: Duration (shown only if no end time) + Registration Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration (hours, used if no end time)">
              <Input type="number" min="0.5" max="72" step="0.5" value={upcomingForm.duration} onChange={e => setUpcomingForm({ ...upcomingForm, duration: e.target.value })} placeholder="2" />
            </Field>
            <Field label="Registration Deadline">
              <Input type="datetime-local" value={upcomingForm.registrationDeadline} onChange={e => setUpcomingForm({ ...upcomingForm, registrationDeadline: e.target.value })} />
            </Field>
          </div>

          {/* Row 4: Host + Guest */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Host Organization">
              <Input value={upcomingForm.host} onChange={e => setUpcomingForm({ ...upcomingForm, host: e.target.value })} placeholder="Global Relations Society" />
            </Field>
            <Field label="Guest Speaker">
              <Input value={upcomingForm.guestLecturer} onChange={e => setUpcomingForm({ ...upcomingForm, guestLecturer: e.target.value })} placeholder="Ambassador Sarah Sterling" />
            </Field>
          </div>

          {/* Row 5: Description */}
          <Field label="Event Description *">
            <Textarea required rows={3} value={upcomingForm.description} onChange={e => setUpcomingForm({ ...upcomingForm, description: e.target.value })} placeholder="Describe the event..." />
          </Field>

          {/* Row 6: Register Links */}
          <Field label="Registration Links (comma separated)">
            <Input value={upcomingForm.registerLinks} onChange={e => setUpcomingForm({ ...upcomingForm, registerLinks: e.target.value })} placeholder="https://link1.com, https://link2.com" />
          </Field>

          {/* Row 7: Team + Image */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Team Members (comma separated)">
              <Input value={upcomingForm.teamAssignments} onChange={e => setUpcomingForm({ ...upcomingForm, teamAssignments: e.target.value })} placeholder="Jane Doe, John Smith" />
            </Field>
            <Field label="Cover Image URL">
              <Input value={upcomingForm.image} onChange={e => setUpcomingForm({ ...upcomingForm, image: e.target.value })} placeholder="https://..." />
            </Field>
          </div>

          <div className="pt-2 border-t border-white/5 mt-2">
            <p className="text-[9px] text-slate-500 tracking-wider mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              Event shows as <span className="text-emerald-400 font-semibold">Live Now</span> between start and end time. End time takes priority over duration.
            </p>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-bold uppercase tracking-wider rounded-lg cursor-pointer focus:outline-none transition-all">
              Schedule Event
            </button>
          </div>
        </Modal>
      )}


      {/* ── ADD PAST EVENT MODAL ── */}
      {showAddPast && (
        <Modal
          title="Log Past Experience"
          accent="indigo"
          onClose={() => setShowAddPast(false)}
          onSubmit={handleAddPast}
        >
          {/* Title + Date */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Event Title *">
              <Input required value={pastForm.title} onChange={e => setPastForm({ ...pastForm, title: e.target.value })} placeholder="Annual Tech Summit" />
            </Field>
            <Field label="Event Date *">
              <Input type="date" required value={pastForm.date} onChange={e => setPastForm({ ...pastForm, date: e.target.value })} />
            </Field>
          </div>

          {/* Venue */}
          <Field label="Venue *">
            <Input required value={pastForm.venue} onChange={e => setPastForm({ ...pastForm, venue: e.target.value })} placeholder="Oxford Amphitheater, London" />
          </Field>

          {/* Host + Guest */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Host Organization">
              <Input value={pastForm.host} onChange={e => setPastForm({ ...pastForm, host: e.target.value })} placeholder="Elysian Finance Club" />
            </Field>
            <Field label="Guest Speaker">
              <Input value={pastForm.guestLecturer} onChange={e => setPastForm({ ...pastForm, guestLecturer: e.target.value })} placeholder="Sir Richard Branson" />
            </Field>
          </div>

          {/* Description */}
          <Field label="Event Description">
            <Textarea rows={3} value={pastForm.description} onChange={e => setPastForm({ ...pastForm, description: e.target.value })} placeholder="What was this event about..." />
          </Field>

          {/* Team + Image */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Team Members (comma separated)">
              <Input value={pastForm.teamAssignments} onChange={e => setPastForm({ ...pastForm, teamAssignments: e.target.value })} placeholder="Elena Rostova, Adrian Vance" />
            </Field>
            <Field label="Cover Image URL">
              <Input value={pastForm.image} onChange={e => setPastForm({ ...pastForm, image: e.target.value })} placeholder="https://..." />
            </Field>
          </div>

          <div className="pt-2 border-t border-white/5 mt-2">
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold uppercase tracking-wider rounded-lg cursor-pointer focus:outline-none transition-all">
              Archive Event
            </button>
          </div>
        </Modal>
      )}


      {/* ── EDIT EVENT MODAL ── */}
      {editingEvent && (
        <Modal
          title={editingEvent.completed ? "Edit Past Experience" : "Edit Upcoming Event"}
          accent={editingEvent.completed ? "indigo" : "amber"}
          onClose={() => setEditingEvent(null)}
          onSubmit={handleEditSubmit}
        >
          {editingEvent.completed ? (
            /* Past event edit fields */
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Event Title *">
                  <Input required value={editingEvent.title} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} />
                </Field>
                <Field label="Event Date *">
                  <Input type="date" required value={editingEvent.date} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                </Field>
              </div>
              <Field label="Venue">
                <Input value={editingEvent.venue || ""} onChange={e => setEditingEvent({ ...editingEvent, venue: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Host Organization">
                  <Input value={editingEvent.host || ""} onChange={e => setEditingEvent({ ...editingEvent, host: e.target.value })} />
                </Field>
                <Field label="Guest Speaker">
                  <Input value={editingEvent.guestLecturer || ""} onChange={e => setEditingEvent({ ...editingEvent, guestLecturer: e.target.value })} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea rows={3} value={editingEvent.description || ""} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Team Members">
                  <Input value={editingEvent.teamAssignments || ""} onChange={e => setEditingEvent({ ...editingEvent, teamAssignments: e.target.value })} />
                </Field>
                <Field label="Image URL">
                  <Input value={editingEvent.image || ""} onChange={e => setEditingEvent({ ...editingEvent, image: e.target.value })} />
                </Field>
              </div>
            </>
          ) : (
            /* Upcoming event edit fields */
            <>
              <Field label="Event Title *">
                <Input required value={editingEvent.title} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Event Date *">
                  <Input type="date" required value={editingEvent.date} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                </Field>
                <Field label="Start Time *">
                  <Input type="time" required value={editingEvent.startTime || "09:00"} onChange={e => setEditingEvent({ ...editingEvent, startTime: e.target.value })} />
                </Field>
                <Field label="End Time">
                  <Input type="time" value={editingEvent.endTime || ""} onChange={e => setEditingEvent({ ...editingEvent, endTime: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Duration (hours, if no end time)">
                  <Input type="number" min="0.5" step="0.5" value={editingEvent.duration || "2"} onChange={e => setEditingEvent({ ...editingEvent, duration: e.target.value })} />
                </Field>
                <Field label="Registration Deadline">
                  <Input type="datetime-local" value={editingEvent.registrationDeadline || ""} onChange={e => setEditingEvent({ ...editingEvent, registrationDeadline: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Host Organization">
                  <Input value={editingEvent.host || ""} onChange={e => setEditingEvent({ ...editingEvent, host: e.target.value })} />
                </Field>
                <Field label="Guest Speaker">
                  <Input value={editingEvent.guestLecturer || ""} onChange={e => setEditingEvent({ ...editingEvent, guestLecturer: e.target.value })} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea rows={3} value={editingEvent.description || ""} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} />
              </Field>
              <Field label="Registration Links (comma separated)">
                <Input value={editingEvent.registerLinks || ""} onChange={e => setEditingEvent({ ...editingEvent, registerLinks: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Team Members">
                  <Input value={editingEvent.teamAssignments || ""} onChange={e => setEditingEvent({ ...editingEvent, teamAssignments: e.target.value })} />
                </Field>
                <Field label="Image URL">
                  <Input value={editingEvent.image || ""} onChange={e => setEditingEvent({ ...editingEvent, image: e.target.value })} />
                </Field>
              </div>
            </>
          )}

          <div className="pt-2 border-t border-white/5 mt-2">
            <button
              type="submit"
              className={`w-full py-3 font-bold uppercase tracking-wider rounded-lg cursor-pointer focus:outline-none transition-all text-white ${editingEvent.completed
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600"
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19]"
              }`}
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default DashboardEvents;
