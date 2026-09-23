# ⚡ Guess the Quantity (Live College SI Unit Trivia)

A real-time multiplayer SI Unit & Physical Quantity trivia web application designed for college events, science fests, and hackathons. Up to 50+ students can play simultaneously on their own mobile or desktop devices through one shared URL with a live, real-time shared leaderboard.

---

## 🎮 Game Mechanics

- **10 Rounds:** Guess the mystery SI unit or physical quantity.
- **Progressive 4-Clue System (Difficulty sequence):**
  1. **Clue 1 (100 pts):** Math & Dimensional Formula (revealed automatically on load).
  2. **Clue 2 (75 pts):** Visual & behavioral description (revealed on click).
  3. **Clue 3 (50 pts):** Real-world everyday example & rating (revealed on click).
  4. **Clue 4 (25 pts):** Historical story naming the famous scientist (revealed on click).
- **Free-Text Guessing:** Checked case-insensitively against unit name, symbol, plural, and quantity name.
- **Auto-Advance:** Correct guesses trigger an instant celebration modal with unit details, auto-advancing after 1.5s.
- **Skip Button:** If stumped, players can skip to the next question for 0 points.
- **Reverse Detective Bonus Round:** Host checklist tool to evaluate contestants naming the scientist, quantity, and real-world example for **Volt (V)**.

---

## 🚀 Quick Start (Local)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
The game will be available at **`http://localhost:3000`**.

---

## 🌐 Public Deployment Options

### Option A: Cloudflare Quick Tunnel (Instant Public HTTPS URL)
No signup or account required. Gives an instant public HTTPS link with WebSocket support:
```bash
# In another terminal window:
cloudflared tunnel --url http://localhost:3000
```
This prints a live public link like: `https://xxxxxx.trycloudflare.com` which you can share with all 50 attendees.

### Option B: ngrok Fallback
```bash
npx ngrok http 3000
```
or if ngrok is installed:
```bash
ngrok http 3000
```

### Option C: 1-Click Free Hosting on Render
1. Push this repository to GitHub.
2. Go to [Render.com](https://render.com) and click **New Web Service**.
3. Connect your repository. Render will automatically detect `render.yaml` or use:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Click **Create Web Service**. You will get a permanent public link like `https://guess-the-quantity.onrender.com`.

### Option D: Railway / Glitch / Replit
- **Railway:** Connect GitHub repo, Railway auto-detects `Procfile` and Node.js.
- **Glitch:** Create a new Node project, upload files, or import from GitHub.
- **Replit:** Import repo and hit "Run".

---

## 🛠️ Architecture

- **Backend:** Node.js + Express + Socket.io.
- **State:** In-memory leaderboard sorted by score descending, with completion time tie-breaker.
- **Frontend:** Vanilla HTML5, CSS3, and JavaScript (no framework required; fast mobile rendering).
- **Real-Time:** WebSockets broadcast instantaneous leaderboard updates across all connected devices.
