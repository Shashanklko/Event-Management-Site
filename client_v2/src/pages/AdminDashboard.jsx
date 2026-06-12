import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Image, Users, MessageSquare,
  Shield, LogOut
} from "lucide-react";
import { useEvents } from "../context/EventContext";
import { GlowBg } from "../components/ui";

// Sub-panel imports
import DashboardOverview from "./admin/DashboardOverview";
import DashboardEvents from "./admin/DashboardEvents";
import DashboardGallery from "./admin/DashboardGallery";
import DashboardTeam from "./admin/DashboardTeam";
import DashboardInquiries from "./admin/DashboardInquiries";

const AdminDashboard = () => {
  const {
    events, gallery, team, inquiries, contactDetails, updateContactDetails,
    isAdminLoggedIn, adminLogout, addEvent, updateEvent, deleteEvent,
    markEventCompleted, addGalleryItem, deleteGalleryItem,
    addTeamMember, deleteTeamMember,
    deleteInquiry, markInquiryRead
  } = useEvents();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Secure Route check
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/");
    }
  }, [isAdminLoggedIn, navigate]);

  if (!isAdminLoggedIn) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <DashboardOverview
            events={events}
            inquiries={inquiries}
            setActiveTab={setActiveTab}
          />
        );
      case "events":
        return (
          <DashboardEvents
            events={events}
            addEvent={addEvent}
            updateEvent={updateEvent}
            deleteEvent={deleteEvent}
            markEventCompleted={markEventCompleted}
          />
        );
      case "gallery":
        return (
          <DashboardGallery
            gallery={gallery}
            addGalleryItem={addGalleryItem}
            deleteGalleryItem={deleteGalleryItem}
          />
        );
      case "team":
        return (
          <DashboardTeam
            team={team}
            addTeamMember={addTeamMember}
            deleteTeamMember={deleteTeamMember}
          />
        );
      case "inquiries":
        return (
          <DashboardInquiries
            inquiries={inquiries}
            deleteInquiry={deleteInquiry}
            markInquiryRead={markInquiryRead}
            contactDetails={contactDetails}
            updateContactDetails={updateContactDetails}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex relative overflow-hidden pt-20">
      <GlowBg />

      {/* DASHBOARD DESKTOP SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0F19]/50 backdrop-blur-md hidden lg:flex flex-col p-6 z-10 select-none">

        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
          <Shield className="w-5 h-5 text-amber-400" />
          <div className="text-left">
            <div className="text-sm font-semibold text-white uppercase tracking-wider">Elysian Admin</div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase">Workspace Management</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { id: "overview", label: "Overview Status", icon: LayoutDashboard },
            { id: "events", label: "Events Workspace", icon: Calendar },
            { id: "gallery", label: "Gallery Curator", icon: Image },
            { id: "team", label: "Team Directory", icon: Users },
            { id: "inquiries", label: "Contact Us Details", icon: MessageSquare }
          ].map((item) => {
            const Icon = item.icon;
            const count = item.id === "inquiries" ? inquiries.filter(i => i.status === "new").length : null;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-medium transition-all cursor-pointer focus:outline-none ${activeTab === item.id
                  ? "bg-amber-400/15 text-amber-300 border border-amber-500/20"
                  : "text-slate-400 hover:bg-white/3 hover:text-white border border-transparent"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </div>
                {count > 0 && (
                  <span className="bg-amber-400 text-[#0B0F19] text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/5 pt-6">
          <button
            onClick={() => {
              adminLogout();
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-medium text-red-400 hover:bg-red-500/5 hover:text-red-300 rounded-lg transition-all cursor-pointer focus:outline-none"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Panel
          </button>
        </div>
      </aside>

      {/* DASHBOARD MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-t border-white/5 grid grid-cols-6 p-2 text-center text-slate-500">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "events", label: "Events", icon: Calendar },
          { id: "gallery", label: "Gallery", icon: Image },
          { id: "team", label: "Team", icon: Users },
          { id: "inquiries", label: "Contact Us", icon: MessageSquare }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 focus:outline-none cursor-pointer ${isActive ? "text-amber-300" : "text-slate-500 hover:text-slate-300"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[8px] uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-[calc(100vh-80px)] pb-24 lg:pb-12 z-10">
        {renderActiveTab()}
      </main>

    </div>
  );
};

export default AdminDashboard;
