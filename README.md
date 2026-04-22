<div align="center">
  <img src="public/vite.svg" alt="Logo" width="80" height="80">
  <h1 align="center">Pro Toolset Hub & Immersive 3D Portfolio</h1>

  <p align="center">
    An expansive, mathematics-driven ecosystem built entirely in React. Featuring 12+ functional mini-applications, a physics-based global navigation system, and a custom <a href="https://threejs.org/">Three.js</a> interactive 3D Portfolio mapped to custom zero-gravity routing algorithms. 
    <br />
    <br />
    <b>Engineered & Developed by Archit Srivastava</b>
  </p>
</div>

---

## ⚡ Technical Overview

The **Pro Toolset Hub** operates as a complete localized web operating system. The interface bypasses standard "click-to-navigate" patterns in favor of a highly tactile, gamified UX wrapped in a multi-layered glassmorphism aesthetic. 

Every single interaction—from triggering the global command palette to pulling the mechanical routing wire—has been custom coded using strict trigonometric and vector math to ensure 60 Frames-Per-Second (FPS) rendering on modern browsers.

---

## 🧠 Architectural Deep Dive: What and Where?

### 1. The Global Runtime & Theme Engine (`App.jsx` + `ThemeContext.jsx`)
* **Methodology:** The entire application is wrapped in a custom `ThemeContext`. This utilizes `useState` and `useEffect` to inject custom CSS payload variables dynamically into the root `<html data-theme="...">` DOM node. 
* **Implementation:** The user can hot-swap between 5 completely distinct palettes (`indigo`, `ocean`, `sunset`, `forest`, `berry`) alongside Dark/Light modes. Every time a theme change occurs, it is aggressively cached using standard `localStorage` serialization so that the preference persists offline between sessions.
* **The Floating Dock Navigation:** `App.jsx` houses a heavily styled macOS-mimicking Navigation bar sitting `top-6` off the screen, heavily utilizing Tailwind `backdrop-blur-2xl` for intensive background refraction.

### 2. The Gamified Router Trigger (`Home.jsx` & `<PullWire />`)
* **Methodology:** Instead of a typical "Portfolio" anchor tag, I engineered a highly mechanical "Pull-Cord" physics body.
* **Implementation:** Built using the `framer-motion` dragging API. 
  * The element dictates `drag="y"` and locks X-axis movement.
  * `dragConstraints={{ top: 0, bottom: 200 }}` creates extreme tension.
  * `onDragEnd` evaluates the delta distance. If the dragging delta vector exceeds a hard-coded mathematical threshold, it forcibly triggers `navigate('/portfolio')`.

### 3. The 3D Skill Globe (`Portfolio.jsx` & `GlobeBackground`)
* **Methodology:** React and WebGL perform notoriously poorly together if React is constantly trying to re-render 3D frames. I solved this utilizing direct DOM Ref manipulations bypassing React State entirely.
* **Implementation:** 
  * I created a `THREE.Scene()` mounting a `SphereGeometry` and custom `WireframeGeometry` mapped out at 60FPS. 
  * Orbiting rings are generated using nested `Math.PI` rotations.
  * **The 60FPS DOM Hack:** Instead of passing X/Y coordinates to React states for the textual UI labels hovering over the spinning globe, my `requestAnimationFrame` loop uses `THREE.Vector3.project(camera)` to calculate the 2D plane coordinate, then forcibly injects it directly to the HTML using `labelRefs.current[i].style.transform`. This prevents React from re-rendering the layout 60 times a second, saving the CPU.

### 4. Zero-Gravity Physics Drop (`Portfolio.jsx` & `<Reveal />`)
* **Methodology:** When the user enters the Portfolio page, the UI does not just casually "fade in." It literally explodes outward into a zero-gravity vacuum and then settles into the CSS grid.
* **Implementation:** 
  * I utilized the `useMemo` hook to run a massive randomization algorithm returning vectors (`x`, `y`, `rotate`, `scale`).
  * Example: `x: (Math.random() - 0.5) * 600`.
  * `framer-motion` maps these initial coordinates. The components "hang" dynamically using an artificial `hangTime: 1.2 + random()` delay. Then, aggressive numerical spring constants (`stiffness: 45`, `damping: 10`) forcefully drag the components mechanically back to `x:0, y:0, rotate: 0` to form the layout.

### 5. Vector-Driven Mini-Games (`SnakeGame.jsx`)
* **Methodology:** The Neon Snake Arena avoids standard D-Pad logic, relying purely on mouse-chasing trigonometry on an HTML5 `<canvas>`.
* **Implementation:** 
  * We obtain the target angle utilizing `Math.atan2(mouseY - headY, mouseX - headX)`.
  * A frame-delta smoothing factor constantly updates the snake's actual angular rotation toward the target angle. Every segment of the tail calculates its exact distance to the segment proceeding it and linearly interpolates exactly 8px behind, creating fluid organic curves that snap smoothly.

### 6. The Global Command Palette (`AppContent.jsx`)
* **Methodology:** A full fuzzy-search hub identical to Spotlight on MacOS or Vercel's global web router.
* **Implementation:** 
  * A global `useEffect` intercepts `window.addEventListener('keydown')` specifically targeting `Ctrl+K`. 
  * It mounts a modal containing a text `<input>`. 
  * A `useMemo` payload takes the `12+` raw tool paths, parses the current string via `.toLowerCase().includes()`, and instantly filters the visible navigation routes dynamically without dropping frames. Hit `Enter` and React Router swaps the active view.

---

## 📁 Page-by-Page Component Architecture Matrix

Below is an exhaustive technical mapping of every page within the `src/pages/` directory, detailing the specific HTML/React tags, Core Hooks/Functions, and architectural methodology implemented in each:

### 1. `Home.jsx`
- **React/HTML Tags:** `motion.div`, `input`, `button`, `<PullWire />`, data-driven stat cards, Lucide Icons.
- **Functions & Hooks:** `useNavigate()`, `useAnimation()`, `framer-motion` `onDragEnd(event, info)`, `localStorage` parsing.
- **Methodology:** Serves as the localized desktop hub. The navigation bypasses traditional `<a>` anchoring; instead, `x/y` tension matrices are mathematically calculated via Framer drag hooks. Features a dynamic **Stats Row** that live-updates with pending tasks and local weather telemetry.

### 2. `Portfolio.jsx`
- **React/HTML Tags:** WebGL `<canvas>` container, HTML `<div ref>` arrays for floating labels, `<motion.section>`.
- **Functions & Hooks:** `useRef()`, `useEffect()`, `useMemo()`, `useInView()`, `requestAnimationFrame()`.
- **Methodology:** The most mathematically complex environment. `useMemo` randomly seeds Zero-Gravity vectors. `THREE.Vector3.project(camera)` performs real-time 3D-to-2D matrix translation to directly manipulate HTML DOM refs via `.style.transform`—intentionally bypassing React state to achieve 60 FPS synchronicity.

### 3. `SnakeGame.jsx`
- **React/HTML Tags:** HTML5 `<canvas>`, absolutely positioned CSS metric score overlays.
- **Functions & Hooks:** `useEffect()`, native JS `requestAnimationFrame()`, `localStorage.setItem()`.
- **Methodology:** Subverts standard React declarative rendering. Uses raw JS mutable objects (`useRef`) to track point vectors. Trigonometry `Math.atan2(dy, dx)` calculates dynamic trajectory radians to update glowing tail segment curves across the Canvas 2D API.

### 4. `CodeBreaker.jsx` (Mastermind Protocol)
- **React/HTML Tags:** Dynamic grid containers, semantic `<form>`, custom QWERTY & Numeric keyboards, Lucide `<Terminal />`.
- **Functions & Hooks:** Array manipulations (`map`, `filter`), `useState()`, `addToast()` notification triggers.
- **Methodology:** Features an expanded **40-word cryptographic database**. Uses complex state matrices to manage diffing between target and guess. Implements a high-risk hint system where "System Hints" incur a -2 attempt penalty, tracked via a visual penalty state in the history log.

### 5. `Weather.jsx`
- **React/HTML Tags:** Flexible CSS grids, inline conditionally-colored DOM text, `<Lucide>` animated UI SVGs.
- **Functions & Hooks:** Async `fetch()`, `Promises`, `parseInt()` data normalization.
- **Methodology:** Powered by high-precision telemetry. Queries `wttr.in/{city}?format=j1` and maps raw `FeelsLikeC` data (replacing estimated logic) to ensure medical-grade weather accuracy. Features a live data sync state with conditional blur-loading transitions.

### 6. `MapView.jsx`
- **React/HTML Tags:** Native `<iframe title="map">`, custom interactable history `<button>` lists.
- **Functions & Hooks:** `useEffect()`, `Array.prototype.slice()`, array deduplication.
- **Methodology:** Orchestrates dynamic URL string building based on React state (Zoom/Type). Employs intensive browser caching interceptors—dynamically checking for redundant map locations, trimming the local `history.length` to five entries max, and serializing immediately to LocalStorage.

### 7. `Notes.jsx` & `TodoList.jsx`
- **React/HTML Tags:** Content-editable textareas, custom `<Download />` export nodes, visual sync status lights.
- **Functions & Hooks:** `URL.createObjectURL()` for blob exports, `Math.ceil()` word-speed algorithms.
- **Methodology:** `Notes.jsx` now features **Professional Document Export** capability to `.txt` files. It includes a real-time **Reading Time Estimator** and a multi-state "Sync Light" that visually differentiates between Local and Cloud-simulated save states.

### 8. `StudentInfo.jsx` & `Auth.jsx`
- **React/HTML Tags:** Structured `<form>`, `<input type="password">` masking wrappers, tabular `<fieldset>`.
- **Functions & Hooks:** `e.preventDefault()`, controlled component binding algorithms.
- **Methodology:** Demonstrates isolated guard-routing capabilities and sanitized data entry mapping across nested state payload structures. 

### 9. `Themes.jsx`
- **React/HTML Tags:** Premium visual swatch grid, `<button>` layout, gradient preview nodes.
- **Functions & Hooks:** `setColorTheme()`, `useTheme()` context bridge, array `.map()` for previews.
- **Methodology:** Upgraded from a standard HTML select menu to a **Visual Palette Studio**. Users select from high-definition previews of Indigo, Ocean, Sunset, Forest, and Berry gradients with real-time feedback and active-state checkmark validation.

## 🧩 External NPM Dependencies Architecture Map

This project operates with a minimal but extremely powerful external library footprint installed within `package.json`. Here is exactly what external technologies are used, **where** they are used, and **why** they are necessary:

### 1. `three` (Three.js)
- **Where is it used?** Exclusively inside `src/pages/Portfolio.jsx` (`<GlobeBackground />`).
- **For what purpose?** To generate the interactive, 60-FPS WebGL wireframe skill globe. Without `three.js`, calculating 3D matrices, camera projections, orbital rings, and satellite vectors natively on an HTML canvas would be mathematically devastating to system memory.

### 2. `framer-motion`
- **Where is it used?** `App.jsx` (Global navigation), `components/PageWrapper.jsx` (Page changes), `Home.jsx` (`<PullWire />`), and `Portfolio.jsx` (`<Reveal />`).
- **For what purpose?** This drives the entire physics engine of the UI. It powers the physical `<PullWire>` drag-and-drop tension constraints. It detects structural route changes to orchestrate the "Zero-Gravity" explosion/settle animations. Without it, the UI would lack tactical, mechanical heft.

### 3. `react-router-dom`
- **Where is it used?** `App.jsx` (`<BrowserRouter />`, `<Routes>`, `<Route>`).
- **For what purpose?** Essential for local application routing. This library allows the Command Palette (`Ctrl+K`) and clicking navigation buttons to instantaneously swap out the active tool UI (e.g., swapping Weather for Calculator) without forcing the browser to perform a hard refresh.

### 4. `lucide-react`
- **Where is it used?** Globally across 90% of the project's components.
- **For what purpose?** Injects pristine, highly scalable, and stylable SVG icons natively as React components. It provides visual UI cues (e.g., the `Code2` icon, `Terminal`, `Search` icons in the global search bar).

### 5. `tailwindcss` & `@tailwindcss/vite`
- **Where is it used?** The entire structural footprint uses inline Tailwind utilities.
- **For what purpose?** Compiles utility CSS classes tightly into the Vite pipeline. It is responsible for the heavily utilized `backdrop-blur` glassmorphism effect and the lightning-fast Dark/Light mode color switching.

---

## 🧰 Integrated Core Setup

You are essentially running a micro-web-OS comprised of 12 distinct algorithms:
1. **Neon Snake Arena:** Trigonometry canvas.
2. **Cortex Cracker:** Complex Mastermind state arrays utilizing Green/Yellow/Red validations.
3. **Weather Hub:** Asynchronous fetch processing from `wttr.in`.
4. **Geo-Map Engine:** Auto-caching locations with deep `useEffect` history tracking.
5. **Interactive Toolkit Contexts:** Task Management, Currency Math APIs, Student Databases, Notes caching.

---

## ⚙️ Step-by-Step Installation Guide (For Friends & Reviewers)

To run this massive ecosystem on your own local computer (Windows, Mac, or Linux), follow these exact steps. It takes less than 2 minutes!

### 🛑 Prerequisites
Before downloading the code, you must have these two completely free tools installed on your computer:
1. **Node.js**: The engine that runs React. Download the "LTS" version from [nodejs.org](https://nodejs.org/).
2. **Git**: To download the code. Download from [git-scm.com](https://git-scm.com/).

*(To verify, open your terminal/command prompt and type `node -v` and `npm -v`. If numbers pop up, you are ready!)*

---

### 📥 1. Download the Project
Open your Terminal or Command Prompt (search `cmd` on Windows) and run this command to download the code to your computer:
```bash
git clone https://github.com/architcoder1234/2400100100104-s4-B-Python.git
```

### 📂 2. Enter the Project Folder
Navigate into the newly created folder:
```bash
cd 2400100100104-s4-B-Python
```

### 📦 3. Install the Engine Dependencies
This project relies on high-end mathematical libraries (like `three.js` for 3D physics and `framer-motion` for zero-g gravity). 

**Do I need to install these separately?** 
No! These libraries are already hardcoded into the project's `package.json` file. Simply tell Node to download all of them automatically by running:
```bash
npm install
```
*(Wait 15-30 seconds for a `node_modules` folder to be generated. Do not interrupt this process!)*

### 🚀 4. Boot the Vite Development Server
Once installation is complete, start the application by running:
```bash
npm run dev
```

### 🌐 5. Open in your Browser
Your terminal will output a localized web address (usually `http://localhost:5173/`). 
* Hold `CTRL` and click the link in your terminal, or manually copy and paste it into Chrome/Firefox.
* The Pro Toolset Hub is now fully operational locally on your machine!

---

### 🐛 Troubleshooting
- **"npm is not recognized as an internal or external command"**: This means you didn't install Node.js (or need to restart your computer so your system recognizes it).
- **White Screen on Load**: Make sure you let `npm install` finish completely. If it broke, run `npm install` again.

---

<div align="center">
  <sub>Built with ❤️ by Archit Srivastava</sub>
</div>
