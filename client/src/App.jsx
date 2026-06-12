import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import Navbar from "./components/Navbar";
import PublicStory from "./pages/PublicStory";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [activeChapter, setActiveChapter] = useState(0);

  const handleChapterChange = (chapterId) => {
    setActiveChapter(chapterId);
  };

  return (
    <EventProvider>
      <Router>
        <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans antialiased overflow-x-hidden">
          {/* Global Navbar */}
          <Navbar 
            activeChapter={activeChapter} 
            onChapterChange={handleChapterChange} 
          />

          {/* Master Viewport Routing */}
          <Routes>
            <Route 
              path="/" 
              element={
                <PublicStory 
                  activeChapter={activeChapter} 
                  setActiveChapter={setActiveChapter} 
                />
              } 
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
