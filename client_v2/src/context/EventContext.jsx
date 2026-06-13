import React, { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

// Default academic events, gallery, team, testimonials data
const initialEvents = [
  {
    id: "evt-1",
    title: "Elysian Model United Nations (EMUN)",
    host: "Global Relations Society",
    date: "2026-10-10",
    description: "The premier global youth diplomacy forum bringing together 500+ student delegates to debate international human rights and global security solutions.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
    guestLecturer: "Ambassador Sarah Sterling",
    registerLinks: ["https://emun.org/register", "https://emun.org/delegate"],
    teamAssignments: ["Elena Rostova", "Sophia Sterling"],
    completed: false
  },
  {
    id: "evt-2",
    title: "Nexus Tech & Coding Fest",
    host: "Computer Science Union",
    date: "2026-08-15",
    description: "A national student coding hackathon event featuring cybersecurity war rooms, robotic builds, and tech startup pitches to venture partners.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    guestLecturer: "Dr. Linus Torvalds",
    registerLinks: ["https://nexusfest.io/tickets"],
    teamAssignments: ["Adrian Vance"],
    completed: false
  },
  {
    id: "evt-5",
    title: "Apex Business Case Competition",
    host: "Elysian Finance & Strategy Club",
    date: "2026-11-20",
    description: "An elite global business case challenge bringing together top universities to pitch financial restructure plans and venture capital strategies to industry judges.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    guestLecturer: "Sir Richard Branson",
    registerLinks: ["https://apexcompetition.org/join"],
    teamAssignments: ["Elena Rostova", "Adrian Vance"],
    completed: false
  },
  {
    id: "evt-3",
    title: "Pulse Medical Innovations Seminar",
    venue: "Zoom Broadcast Room",
    date: "2026-05-18",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    teamAssignments: ["Elena Rostova", "Adrian Vance"],
    completed: true
  },
  {
    id: "evt-4",
    title: "Aura Cultural & Arts Fest",
    venue: "Oxford Amphitheater",
    date: "2026-04-05",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200",
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

const initialContactDetails = {
  email: "hello@elysian.org",
  address: "144 Luxury Avenue, Suite 900\nNew York, NY 10012\nUnited States",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com"
};

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
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!parsed.some(e => e.id === "evt-5")) {
        const targetEvent = initialEvents.find(e => e.id === "evt-5");
        if (targetEvent) parsed.push(targetEvent);
      }
      return parsed;
    }
    return initialEvents;
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

  const [contactDetails, setContactDetails] = useState(() => {
    const stored = localStorage.getItem("elysian_contact_details");
    return stored ? JSON.parse(stored) : initialContactDetails;
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

  useEffect(() => {
    localStorage.setItem("elysian_contact_details", JSON.stringify(contactDetails));
  }, [contactDetails]);

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

  // Event Operations
  const addEvent = (eventData) => {
    const newEvent = {
      id: `evt-${Date.now()}`,
      title: eventData.title,
      date: eventData.date,
      image: eventData.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      teamAssignments: eventData.teamAssignments || [],
      completed: eventData.completed || false,
      ongoing: false
    };

    if (newEvent.completed) {
      // Past event fields
      newEvent.venue = eventData.venue || "";
      newEvent.host = eventData.host || "";
      newEvent.description = eventData.description || "";
      newEvent.guestLecturer = eventData.guestLecturer || "";
    } else {
      // Upcoming event fields
      newEvent.startTime = eventData.startTime || "09:00";
      newEvent.endTime = eventData.endTime || "";
      newEvent.duration = eventData.duration || "2";
      newEvent.registrationDeadline = eventData.registrationDeadline || "";
      newEvent.host = eventData.host || "";
      newEvent.description = eventData.description || "";
      newEvent.guestLecturer = eventData.guestLecturer || "";
      newEvent.registerLinks = eventData.registerLinks || [];
    }

    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id, updatedFields) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        return { ...evt, ...updatedFields };
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
        return { ...evt, completed: true };
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
        eventType: inq.eventType || "Contact Submission",
        message: inq.message || inq.inquiry || "",
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

  const updateContactDetails = (newDetails) => {
    setContactDetails(prev => ({ ...prev, ...newDetails }));
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
        toggleTheme,
        contactDetails,
        updateContactDetails
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
