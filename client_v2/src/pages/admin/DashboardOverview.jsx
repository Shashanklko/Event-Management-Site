import React from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardOverview = ({
  events, inquiries, setActiveTab
}) => {
  const totalEvents = events.length;
  const upcomingEventsCount = events.filter(e => !e.completed).length;
  const completedEventsCount = events.filter(e => e.completed).length;
  const pendingInquiriesCount = inquiries.filter(i => i.status === "new").length;

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Terminal Overview</h1>
        <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Status monitoring and operations feedback.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="flex flex-col justify-between py-6">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Total Events</div>
            <div className="text-2xl font-light text-white flex items-center font-sans">
              {totalEvents}
            </div>
          </div>
          <div className="text-[9px] text-slate-400 mt-4">
            Managed database entries
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between py-6">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Upcoming Gatherings</div>
            <div className="text-2xl font-light text-amber-400 font-sans">
              {upcomingEventsCount}
            </div>
          </div>
          <div className="text-[9px] text-slate-400 mt-4">
            Active in planning pipeline
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between py-6">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Past Experiences</div>
            <div className="text-2xl font-light text-indigo-400 font-sans">
              {completedEventsCount}
            </div>
          </div>
          <div className="text-[9px] text-emerald-400 mt-4 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Archive Complete
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between py-6">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Lead Inquiries</div>
            <div className="text-2xl font-light text-white font-sans">
              {inquiries.length}
            </div>
          </div>
          <div className="text-[9px] text-slate-400 mt-4">
            New submissions: <span className="text-amber-300 font-semibold">{pendingInquiriesCount} pending</span>
          </div>
        </GlassCard>
      </div>

      {/* Quick Action Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light font-serif-luxury text-white">Upcoming Events</h3>
            <button onClick={() => setActiveTab("events")} className="text-[10px] tracking-wider text-amber-300 uppercase hover:underline cursor-pointer focus:outline-none">View All</button>
          </div>

          <div className="flex flex-col gap-4">
            {events.filter(e => !e.completed).slice(0, 3).map(evt => (
              <div
                key={evt.id}
                onClick={() => setActiveTab("events")}
                className="bg-white/2 hover:bg-white/5 border border-white/5 rounded-xl p-4 flex justify-between items-center cursor-pointer transition-all"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white">{evt.title}</h4>
                  <span className="text-[10px] text-slate-500">{evt.host}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {evt.date}
                  </div>
                </div>
              </div>
            ))}
            {events.filter(e => !e.completed).length === 0 && (
              <div className="text-center py-6 text-xs text-slate-500">No upcoming events in database.</div>
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light font-serif-luxury text-white">Recent Inquiries</h3>
            <button onClick={() => setActiveTab("inquiries")} className="text-[10px] tracking-wider text-amber-300 uppercase hover:underline cursor-pointer focus:outline-none">View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {inquiries.slice(0, 3).map(inq => (
              <div
                key={inq.id}
                onClick={() => setActiveTab("inquiries")}
                className={`border border-white/5 rounded-xl p-3 flex justify-between items-center cursor-pointer transition-all ${inq.status === "new" ? "bg-amber-400/5 border-amber-500/25" : "bg-white/2"
                  }`}
              >
                <div>
                  <h4 className="text-xs font-semibold text-white">{inq.name}</h4>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest">{inq.eventType}</span>
                </div>
                <div className="text-[9px] text-slate-500 font-mono">{inq.date}</div>
              </div>
            ))}
            {inquiries.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-500">No client inquiries.</div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default DashboardOverview;
