import React, { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

// Default academic events, gallery, team, testimonials data
const initialEvents = [
  {
    id: "evt-1",
    title: "Elysian Model United Nations (EMUN)",
    category: "MUN",
    date: "2026-10-10",
    venue: "Harvard Conference Hall & Hybrid",
    description: "The premier global youth diplomacy forum bringing together 500+ student delegates to debate international human rights and global security solutions.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
    budget: { total: 15000, spent: 12000, status: "Under Budget" },
    planningStatus: true,
    venueStatus: true,
    vendorStatus: true,
    marketingStatus: true,
    executionStatus: false,
    completionPercentage: 80,
    tasks: [
      { id: "t1", text: "Finalize country committee allocations", completed: true },
      { id: "t2", text: "Reserve Harvard Conference Hall room arrays", completed: true },
      { id: "t3", text: "Onboard dais and guest speakers", completed: true },
      { id: "t4", text: "Distribute research booklets and study guides", completed: true },
      { id: "t5", text: "Day-of hybrid video teleconferencing setup", completed: false }
    ],
    teamAssignments: ["Elena Rostova", "Sophia Sterling"],
    completed: false
  },
  {
    id: "evt-2",
    title: "Nexus Tech & Coding Fest",
    category: "Fest",
    date: "2026-08-15",
    venue: "Stanford Science Park & Online",
    description: "A national student coding hackathon event featuring cybersecurity war rooms, robotic builds, and tech startup pitches to venture partners.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    budget: { total: 8000, spent: 8000, status: "On Target" },
    planningStatus: true,
    venueStatus: true,
    vendorStatus: true,
    marketingStatus: false,
    executionStatus: false,
    completionPercentage: 60,
    tasks: [
      { id: "t1", text: "Confirm cybersecurity platform licensing", completed: true },
      { id: "t2", text: "Acquire hardware development board sets", completed: true },
      { id: "t3", text: "Finalize tech startup review panels", completed: true },
      { id: "t4", text: "Open registrations for global coding delegates", completed: false },
      { id: "t5", text: "Arrange virtual workspace servers", completed: false }
    ],
    teamAssignments: ["Adrian Vance"],
    completed: false
  },
  {
    id: "evt-3",
    title: "Pulse Medical Innovations Seminar",
    category: "Webinar",
    date: "2026-05-18",
    venue: "Zoom Broadcast Room",
    description: "A speech conference webinar presenting genomics panels, robotic surgery research, and diagnostics telemetry systems, hosting speakers from Johns Hopkins.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    budget: { total: 1200, spent: 1200, status: "On Target" },
    planningStatus: true,
    venueStatus: true,
    vendorStatus: true,
    marketingStatus: true,
    executionStatus: true,
    completionPercentage: 100,
    tasks: [
      { id: "t1", text: "Confirm Johns Hopkins medical panel", completed: true },
      { id: "t2", text: "Distribute access codes to medical scholars", completed: true },
      { id: "t3", text: "Test Zoom telemetry and screen layout feeds", completed: true },
      { id: "t4", text: "Setup digital feedback logging sheets", completed: true },
      { id: "t5", text: "Execute speech webinar stream", completed: true }
    ],
    teamAssignments: ["Elena Rostova", "Adrian Vance"],
    completed: true
  },
  {
    id: "evt-4",
    title: "Aura Cultural & Arts Fest",
    category: "Fest",
    date: "2026-04-05",
    venue: "Oxford Amphitheater",
    description: "A dynamic collegiate fest showcasing acoustic panels, visual arts galas, theater play competitions, and creative writing seminars.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200",
    budget: { total: 10000, spent: 9500, status: "Under Budget" },
    planningStatus: true,
    venueStatus: true,
    vendorStatus: true,
    marketingStatus: true,
    executionStatus: true,
    completionPercentage: 100,
    tasks: [
      { id: "t1", text: "Select acoustic band schedules", completed: true },
      { id: "t2", text: "Reserve Oxford Amphitheater rooms", completed: true },
      { id: "t3", text: "Purchase student theater props", completed: true },
      { id: "t4", text: "Onboard creative writing workshop panel", completed: true },
      { id: "t5", text: "Verify sound mix and podium equipment", completed: true }
    ],
    teamAssignments: ["Sophia Sterling"],
    completed: true
  }
];

const initialGallery = [
  { id: "g1", title: "Committee Assembly Room", type: "image", category: "MUN", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" },
  { id: "g2", title: "Cybersecurity Hackathon Staging", type: "image", category: "Fests", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800" },
  { id: "g3", title: "Genomics Telemetry Webinar Screen", type: "image", category: "Webinars", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" },
  { id: "g4", title: "Delegate Speech Award Ceremony", type: "image", category: "Summits", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" },
  { id: "g5", title: "Acoustic Band Performance", type: "image", category: "Fests", url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800" },
  { id: "g6", title: "Global Delegate Meetup Group", type: "image", category: "Summits", url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800" }
];

const initialTeam = [
  { id: "tm-1", name: "Elena Rostova", position: "Secretary-General & Committee Chair", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500", bio: "Elena leads committee allocations and MUN delegate onboarding. Academic scholar in International Law.", experience: 4, projectsHandled: 12 },
  { id: "tm-2", name: "Adrian Vance", position: "Technical Operations Chief", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500", bio: "Adrian directs broadcast telemetry, zoom webinar stages, hackathon networking, and server logistics.", experience: 3, projectsHandled: 15 },
  { id: "tm-3", name: "Sophia Sterling", position: "Outreach & Public Relations Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500", bio: "Sophia coordinates with university delegate societies, panel speakers, and cultural sponsors globally.", experience: 3, projectsHandled: 10 }
];

const initialTestimonials = [
  { id: "test-1", clientName: "Liam Sterling", company: "Delegate, Oxford MUN Society", feedback: "Elysian's MUN logistics were flawless. The digital allocation dashboard and committee research booklets were incredibly detailed and professional.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
  { id: "test-2", clientName: "Dr. Aris Thorne", company: "Speaker, Stanford Medicine Webinar", feedback: "The webinar telemetry and speaker audio panels were pristine. I was able to present my genomics slide decks to over 2,000 global delegates without a hitch.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" }
];

const initialInquiries = [
  { id: "inq-1", name: "Professor Charles Xavier", email: "xavier@oxford.edu", phone: "+44 207 987 6543", eventType: "Webinar", message: "Interested in organizing a hybrid Speech Conference Webinar on Neuro-genetics next semester. We want to onboard international delegates.", date: "2026-06-11", status: "new" }
];

export const EventProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem("elysian_theme") === "light";
  });

  useEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.add("light");
      localStorage.setItem("elysian_theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("elysian_theme", "dark");
    }
  }, [isLightTheme]);

  const toggleTheme = () => setIsLightTheme(prev => !prev);

  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("elysian_academic_events");
    return stored ? JSON.parse(stored) : initialEvents;
  });

  const [gallery, setGallery] = useState(() => {
    const stored = localStorage.getItem("elysian_academic_gallery");
    return stored ? JSON.parse(stored) : initialGallery;
  });

  const [team, setTeam] = useState(() => {
    const stored = localStorage.getItem("elysian_academic_team");
    return stored ? JSON.parse(stored) : initialTeam;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const stored = localStorage.getItem("elysian_academic_testimonials");
    return stored ? JSON.parse(stored) : initialTestimonials;
  });

  const [inquiries, setInquiries] = useState(() => {
    const stored = localStorage.getItem("elysian_academic_inquiries");
    return stored ? JSON.parse(stored) : initialInquiries;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("elysian_admin_session") === "true";
  });

  useEffect(() => {
    localStorage.setItem("elysian_academic_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("elysian_academic_gallery", JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem("elysian_academic_team", JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem("elysian_academic_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem("elysian_academic_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Auth Operations
  const adminLogin = (username, password) => {
    if (username === "admin" && password === "elysian2026") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("elysian_admin_session", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("elysian_admin_session");
  };

  // Helper function to recalculate completion percentage from checklist tasks
  const recalculateCompletion = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  // Helper to sync primary status checkboxes with the state array
  const checkStatusFlags = (tasks) => {
    // We map: Planning (task 1), Venue (task 2), Vendor (task 3), Marketing (task 4), Execution (task 5)
    return {
      planningStatus: tasks[0] ? tasks[0].completed : false,
      venueStatus: tasks[1] ? tasks[1].completed : false,
      vendorStatus: tasks[2] ? tasks[2].completed : false,
      marketingStatus: tasks[3] ? tasks[3].completed : false,
      executionStatus: tasks[4] ? tasks[4].completed : false,
    };
  };

  // Event Operations
  const addEvent = (eventData) => {
    const defaultTasks = [
      { id: "t1", text: "Define conceptual design & theme mapping", completed: false },
      { id: "t2", text: "Reserve luxury venue and permits", completed: false },
      { id: "t3", text: "Confirm high-end catering and decor vendors", completed: false },
      { id: "t4", text: "Deploy promotional campaigns and guest RSVPs", completed: false },
      { id: "t5", text: "On-site setup coordination & execution rehearsals", completed: false }
    ];
    
    const newEvent = {
      id: `evt-${Date.now()}`,
      title: eventData.title,
      category: eventData.category || "Custom Event Planning",
      date: eventData.date,
      venue: eventData.venue,
      description: eventData.description,
      image: eventData.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      budget: {
        total: Number(eventData.budgetTotal) || 0,
        spent: Number(eventData.budgetSpent) || 0,
        status: Number(eventData.budgetSpent) > Number(eventData.budgetTotal) ? "Over Budget" : "Under Budget"
      },
      tasks: eventData.tasks || defaultTasks,
      teamAssignments: eventData.teamAssignments || [],
      completed: false
    };

    // Calculate completions
    const finalComp = recalculateCompletion(newEvent.tasks);
    const flags = checkStatusFlags(newEvent.tasks);

    setEvents(prev => [
      ...prev,
      {
        ...newEvent,
        ...flags,
        completionPercentage: finalComp,
        completed: finalComp === 100
      }
    ]);
  };

  const updateEvent = (id, updatedFields) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        const mergedTasks = updatedFields.tasks || evt.tasks;
        const compPct = recalculateCompletion(mergedTasks);
        const flags = checkStatusFlags(mergedTasks);
        
        let budgetData = evt.budget;
        if (updatedFields.budgetTotal !== undefined || updatedFields.budgetSpent !== undefined) {
          const total = Number(updatedFields.budgetTotal ?? evt.budget.total);
          const spent = Number(updatedFields.budgetSpent ?? evt.budget.spent);
          budgetData = {
            total,
            spent,
            status: spent > total ? "Over Budget" : (spent === total ? "On Target" : "Under Budget")
          };
        }

        return {
          ...evt,
          ...updatedFields,
          budget: budgetData,
          tasks: mergedTasks,
          ...flags,
          completionPercentage: compPct,
          completed: compPct === 100
        };
      }
      return evt;
    }));
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(evt => evt.id !== id));
  };

  const markEventCompleted = (id) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        const completedTasks = evt.tasks.map(t => ({ ...t, completed: true }));
        return {
          ...evt,
          tasks: completedTasks,
          planningStatus: true,
          venueStatus: true,
          vendorStatus: true,
          marketingStatus: true,
          executionStatus: true,
          completionPercentage: 100,
          completed: true
        };
      }
      return evt;
    }));
  };

  // Gallery Operations
  const addGalleryItem = (item) => {
    setGallery(prev => [
      ...prev,
      {
        id: `g-${Date.now()}`,
        title: item.title,
        type: item.type || "image",
        category: item.category || "Exhibitions",
        url: item.url || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
      }
    ]);
  };

  const deleteGalleryItem = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Team Operations
  const addTeamMember = (member) => {
    setTeam(prev => [
      ...prev,
      {
        id: `tm-${Date.now()}`,
        name: member.name,
        position: member.position,
        image: member.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500",
        bio: member.bio,
        experience: Number(member.experience) || 0,
        projectsHandled: Number(member.projectsHandled) || 0
      }
    ]);
  };

  const deleteTeamMember = (id) => {
    setTeam(prev => prev.filter(tm => tm.id !== id));
  };

  // Testimonial Operations
  const addTestimonial = (test) => {
    setTestimonials(prev => [
      ...prev,
      {
        id: `test-${Date.now()}`,
        clientName: test.clientName,
        company: test.company || "Private Client",
        feedback: test.feedback,
        rating: Number(test.rating) || 5,
        image: test.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
      }
    ]);
  };

  const deleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Inquiry Operations
  const submitInquiry = (inq) => {
    setInquiries(prev => [
      ...prev,
      {
        id: `inq-${Date.now()}`,
        name: inq.name,
        email: inq.email,
        phone: inq.phone || "",
        eventType: inq.eventType || "Custom Event Planning",
        message: inq.message,
        date: new Date().toISOString().split("T")[0],
        status: "new"
      }
    ]);
  };

  const deleteInquiry = (id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  const markInquiryRead = (id) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: "read" } : inq));
  };

  return (
    <EventContext.Provider
      value={{
        events,
        gallery,
        team,
        testimonials,
        inquiries,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        addEvent,
        updateEvent,
        deleteEvent,
        markEventCompleted,
        addGalleryItem,
        deleteGalleryItem,
        addTeamMember,
        deleteTeamMember,
        addTestimonial,
        deleteTestimonial,
        submitInquiry,
        deleteInquiry,
        markInquiryRead,
        isLightTheme,
        toggleTheme
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
