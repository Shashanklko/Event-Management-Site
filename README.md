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
