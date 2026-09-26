# FitLog — Gym & Workout Companion

FitLog is a modern, dark-themed workout companion built with Next.js and React. It helps users discover exercises, build their daily routine capped at 5 lifts, save workouts for later, and track workout metrics like total duration and estimated calories burned.

---

## 🔗 Project Links

- **Live URL**: [Add your deployed Vercel / Netlify link here]
- **GitHub Repository**: [Add your GitHub repository link here]

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Feather Icons)
- **Notifications**: React-Toastify
- **Storage**: Browser LocalStorage for persistence

---

## ⚡ 5 Key Features

### 1. Dynamic Workout Library with Pagination
The library fetches 12 workouts from an external API, complete with loading spinners and error handling with a retry button. Workouts are displayed in clean cards showing target muscle groups, difficulty, equipment, duration, and calories. To keep the page tidy, workouts are split into easy-to-browse pages (6 lifts per page) with numbered page buttons and next/previous controls.

### 2. Real-Time Search and Sorting (Challenge C1)
Users can quickly find any workout by typing its name, target muscle group (e.g., chest, legs, back), or equipment in the search bar. The library also includes a dropdown to sort exercises dynamically by duration, calories burned, or rating.

### 3. Dedicated Workout Details Page
Each workout has its own page accessible by user-friendly URL slugs (for example `/workout/barbell-bench-press`). It provides a breakdown of the exercise including equipment, difficulty, calories, target muscle groups, description, step-by-step instructions, and safety benefits.

### 4. Today's Plan & Saved Lists with LocalStorage
Users can build their daily workout routine ("Today's Plan") or bookmark exercises ("Saved Lifts"). The app enforces a realistic 5-lift cap for the daily routine to prevent overtraining. Both the plan and saved lists are stored in `localStorage`, so workouts stay intact even after refreshing the browser or closing the tab.

### 5. Progress Tracking with Completion & Metrics (Challenge C3)
The My Plan page calculates total planned exercises, total workout time in minutes, and total estimated calorie burn. Users can mark exercises as completed using the "Mark as Done" button, remove lifts from their plan, and receive instant toast feedback for every action.

---

## 🚀 Running the Project Locally

Follow these steps to run FitLog on your computer:

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd fitlog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Open [http://localhost:3000](http://localhost:3000) to view the app.

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📱 Responsive Design

FitLog is fully responsive and tested across all screen sizes:
- **Mobile (< 768px)**: Compact header with smooth slide-out drawer menu, single-column workout cards, and touch-friendly buttons.
- **Tablet (768px - 1024px)**: Two-column grid layout with tablet-optimized navigation bar and metric cards.
- **Desktop (> 1024px)**: Full multi-column dashboard layout with quick-action counters and expanded stat views.

---

## 📄 Custom 404 Page

If a user visits any invalid or non-existent route, FitLog displays a custom dark-themed 404 error page with quick navigation back to the home page or workout library.
