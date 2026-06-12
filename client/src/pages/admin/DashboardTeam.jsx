import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { GlassCard } from "../../components/ui";

const DashboardTeam = ({ team, addTeamMember, deleteTeamMember }) => {
  const [teamForm, setTeamForm] = useState({ name: "", position: "", image: "", bio: "", experience: 0, projectsHandled: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeamMember(teamForm);
    setTeamForm({ name: "", position: "", image: "", bio: "", experience: 0, projectsHandled: 0 });
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-4xl font-light text-white font-serif-luxury tracking-wide">Team Directory</h1>
        <p className="text-slate-400 text-xs font-light tracking-wide mt-1">Manage project directors, assign tasks and update bios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Add Crew Form */}
        <div className="lg:col-span-4">
          <GlassCard>
            <h3 className="text-lg font-light text-white mb-6 font-serif-luxury">Add Crew Director</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Staff Name *</label>
                <input
                  type="text" required
                  value={teamForm.name}
                  onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="Julian Vance"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Position Title *</label>
                <input
                  type="text" required
                  value={teamForm.position}
                  onChange={e => setTeamForm({ ...teamForm, position: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="Logistics Director"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Profile Photo URL</label>
                <input
                  type="url"
                  value={teamForm.image}
                  onChange={e => setTeamForm({ ...teamForm, image: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Years Experience</label>
                  <input
                    type="number"
                    value={teamForm.experience}
                    onChange={e => setTeamForm({ ...teamForm, experience: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Projects Cured</label>
                  <input
                    type="number"
                    value={teamForm.projectsHandled}
                    onChange={e => setTeamForm({ ...teamForm, projectsHandled: e.target.value })}
                    className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Director Bio Summary *</label>
                <textarea
                  required rows={3}
                  value={teamForm.bio}
                  onChange={e => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="bg-white/3 border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Brief experience summary and credentials..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B0F19] font-semibold tracking-wider text-xs uppercase rounded-lg shadow-lg cursor-pointer focus:outline-none"
              >
                Onboard Staff Member
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Roster list */}
        <div className="lg:col-span-8">
          <GlassCard>
            <h3 className="text-lg font-light text-white mb-6 font-serif-luxury">Active Crew Roster</h3>

            <div className="flex flex-col gap-4">
              {team.map(member => (
                <div key={member.id} className="bg-white/2 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex items-center gap-4">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                    <div>
                      <h4 className="text-base font-semibold text-white">{member.name}</h4>
                      <span className="text-[10px] text-amber-300 uppercase tracking-widest font-semibold block">{member.position}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-xs text-slate-500 font-light">
                      <span className="text-white font-semibold">{member.experience} yrs</span> exp // <span className="text-white font-semibold">{member.projectsHandled}</span> events
                    </div>
                    <button
                      onClick={() => deleteTeamMember(member.id)}
                      className="p-2 border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg cursor-pointer focus:outline-none"
                      title="Dismiss Crew Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {team.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">No staff crew members onboarded.</div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeam;
