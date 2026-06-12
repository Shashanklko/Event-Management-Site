# Elysian — Luxury Event & Academic Management System

Elysian is a premium, state-of-the-art event management system built with React and Vite. It is divided into two iterations: a prototype version (`client`) and a refined, fully-featured version (`client_v2`).

---

## 📂 Project Structure

This repository contains two main front-end client directories:

1. **`client/` (Version 1 - Prototype)**
   - The initial version of the Elysian Event Management app.
   - Displays hardcoded sections and basic form elements.

2. **`client_v2/` (Version 2 - Premium Production Build)**
   - The modern, highly interactive iteration of the Elysian portal.
   - Features rich animations (Framer Motion), absolute glassmorphic design aesthetics, high-contrast light/dark modes, and a robust admin dashboard interface.

---

## 🚀 Key Features (Version 2)

### 🖥️ Public Website (`client_v2`)
- **Chapters Narrative Layout:** A beautiful, story-driven single-page landing layout containing:
  - **Chapter 1 (Welcome):** Full-bleed cinematic video background and welcoming copy.
  - **Chapter 2 (About):** Luxury branding introduction.
  - **Chapter 8 (Gallery):** Interactive gallery with categories and full-screen lightbox media viewer.
  - **Chapter 6/7 (Events):** Categorized listings of Upcoming Gatherings and Past Experiences (with RSVP seating request forms).
  - **Chapter 4 (Team):** Team directory cards.
  - **Chapter 9 (Contact):** Inquiry submission form with dynamic details.
- **Auto-Gmail Compose Integration:** When visitors submit a query, the form registers the entry in the admin portal and automatically opens a Gmail window pre-filled with the inquiry details.
- **Active Light & Dark Themes:** Custom styled high-contrast themes, featuring custom vignette overlays, blur-blobs, scrollbars, and inputs designed for readability in both modes.

### 🔐 Secure Operations Terminal (Admin Portal)
Access the secure terminal directly by clicking the **Settings Gear** icon in the navbar.
- **Credentials:**
  - **Username:** `admin`
  - **Password:** `elysian2026`
- **Real-Time Overview Stats:** View stats of Total Events, Active Gatherings, Archived Experiences, and Pending Inquiries.
- **Events Workspace:** Create, edit, complete, or delete past and upcoming events.
- **Gallery Curator:** Add and remove media items shown in the public showcase gallery.
- **Team Directory:** Manage staff members, positions, handling experience, and bio details.
- **Contact Us Details Management:** Update public email, office address, and social links (LinkedIn, Twitter, Instagram) instantly.
- **Gmail Reply Action:** Reply to visitor inquiries in one click directly from the Admin Inbox using the built-in Gmail integration.

---

## 🛠️ Technology Stack

- **Framework:** React 19 (Hooks, Context Provider)
- **Bundler:** Vite
- **Styling:** CSS + Tailwind CSS (including custom HSL utility configurations)
- **Animations:** Framer Motion (ScrollReveal, AnimatePresence, customized luxury ease curves)
- **Icons:** Lucide React & React Icons (FontAwesome 6)
- **Database/Persistence:** LocalStorage (zero external database configuration required)

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0.0 or later)
- [npm](https://www.npmjs.com/) (v8.0.0 or later)

### Installation & Local Development

1. Navigate to the desired client directory:
   ```bash
   cd client_v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Spin up the local Vite hot-reloading dev server:
   ```bash
   npm run dev
   ```

4. Open the displayed URL (usually `http://localhost:5173/`) in your browser.

---

## 🏗️ Production Build

To compile the production-ready assets (minified and optimized bundles):
```bash
npm run build
```
The compiled build output will be placed in the `/dist` folder and is ready for static web deployment.
