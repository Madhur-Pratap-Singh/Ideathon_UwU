# UpLevel — Student Focus & Self-Improvement Platform

A gamified, mobile-first academic companion designed for university and college students. UpLevel combines deep-work timer mechanics, contextual AI coaching powered by Google's Gemini Flash, campus study circles, weekly timetable auto-planning, and student pocket UPI budgeting into a cohesive, warm academic aesthetic.

---

## Key Features

- **Onboarding Flow**:
  - Interactive multi-step diagnostic quiz assessing student goals, habit consistency, and key growth areas (Confidence, Social Skills, Fitness, and Appearance).
  - Animated plan generation loading screen.
  - Personalized plan preview breakdown and 7-day free trial paywall.

- **Zen Mode Focus Chamber**:
  - Distraction-free countdown timer (25-minute Pomodoro & Custom Durations).
  - Drift-free time calculations (handles background tab execution).
  - Gamified XP rewards: **+5 XP per 5 completed minutes** (strict anti-exploit & completion-only rewards).
  - Companion avatar presence and ambient focus state.

- **Intelligent AI Companion**:
  - Powered by Google Gemini Flash with server-side proxy middleware.
  - Multi-companion archetypes:
    - **Aiko** — Hype & Energetic
    - **Sylphie** — Mindful & Calm
    - **Kaelen** — Strict & Disciplined
    - **Nova** — Radiant & Wise
  - Context-aware dialogue analyzing current student level, streak, focus sessions, and active task progress.

- **Student Pocket Budget Tracker**:
  - UPI expense logging with quick categories: Food/Canteen, Travel, Tech/Books, Impulse/Fun.
  - Dynamic monthly spend progress bar with budget threshold warnings.
  - Earn +5 XP for conscious financial logging.

- **Smart Weekly Timetable**:
  - Visual day-by-day and full-week schedule views.
  - One-click auto-planning algorithm based on syllabus priorities.
  - Complete scheduled sessions for +20 XP.

- **Campus Study Circle & Leaderboards**:
  - Dynamic ranking ladder: Bronze, Silver, Gold, Platinum, Diamond, Grandmaster.
  - Peer study leaderboards with active streaks and levels.
  - Custom friend invite codes and challenge mechanics.

- **Learn Mode**:
  - Curated, topic-driven recommendations for YouTube video lectures, conceptual articles, and interactive courses.
  - Mark completed resources for +15 XP.

---

## Palette & Aesthetic

Designed with a warm, distraction-free academic palette:
- **Saddle Brown (`#8B4513`)**: Primary accent, CTA buttons, active state indicators.
- **Olive Khaki (`#C2B280`)**: Secondary tone, stat bars, soft borders.
- **Warm Beige (`#F5F5DC`)**: Main application background.
- **Sand (`#E0CDA9`)**: Badges, soft highlights, container accents.
- **Pure White (`#FFFFFF`)**: Crisp card surfaces.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v3, Lucide Icons, Canvas Confetti.
- **Build Tool**: Vite 5.
- **AI Integration**: Google GenAI SDK (`@google/genai`) with Gemini Flash.
- **State & Storage**: React Context + LocalStorage persistence with resilient fallbacks.

---

## Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Madhur-Pratap-Singh/Ideathon_UwU.git
cd Ideathon_UwU
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5173
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser (mobile view recommended, max 430px container).

### 4. Build for Production
```bash
npm run build
```
