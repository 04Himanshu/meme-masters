# Meme Masters - Guess the Famous Memes

An interactive, responsive, frontend-only quiz application built with vanilla **HTML5, CSS3, and JavaScript**. Designed for live Indian meme trivia competitions (on projectors, Discord screenshares, college fests, team events) and standalone contestant play.

Featuring iconic **Bollywood, Indian Cinema, OTT Web Series**, and **Indian Social Media / Viral Memes** within a **60-second timer challenge**!

---

## 🚀 Deploy to Vercel in 60 Seconds

This project is structured for zero-configuration, production-grade deployment on **Vercel**.

### Option A: Via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Meme Masters Quiz"
   git branch -M main
   git remote add origin https://github.com/<your-username>/meme-quiz.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository `meme-quiz`.
4. Leave all build settings as default (Framework Preset: **Other** / Static Site).
5. Click **Deploy**. Your quiz is live globally!

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy directly from workspace
vercel --prod
```

### Option C: Run Locally
- Simply open [index.html](index.html) directly in any browser.
- Or start a lightweight local web server:
  ```bash
  npm start
  ```
- Run production validation test suite:
  ```bash
  npm test
  ```

---

## 🌟 Key Features

- **20 Iconic Indian Memes**: Authentic Bollywood moments (*Hera Pheri*, *Phir Hera Pheri*, *Welcome*, *Gangs of Wasseypur*, *3 Idiots*, *Golmaal*, *KGF 2*, *Pushpa*) and viral social media moments (*Shark Tank India*, *Mirzapur*, *Sacred Games*, *Slayy Point Binod*, *Vipin Sahu*, *Rasode Mein Kaun Tha*).
- **Zero Page Scrolling**: Custom `100vh` viewport layout engineered to display media and controls on a single screen without vertical scrollbars.
- **Hero Meme Height**: Maximized image canvas with `object-fit: contain` and dark backdrop for aspect ratio fidelity.
- **60-Second Countdown Timer**: Animated SVG circular progress ring, tabular numerals, audio tick cues at $\le 10$s, urgent pulse at $\le 5$s, and time-up buzzer.
- **Single-Row Controls**: `[ 00:60 ] [ Start ] [ Reset ] [ +10s ] [ -10s ]` in an inline toolbar.
- **Streamlined Single Hint**: A clean `💡 Reveal Hint` clue box toggled via button or <kbd>H</kbd>.
- **Focused Reveal Answer**: Host mode displays strictly the correct answer in a high-contrast card with zero clutter.
- **Modern Clean Theme**: Polished SaaS white theme with crisp borders, tactile solid buttons (no transparent hover bugs), and WCAG-compliant typography.
- **Contestant Mode**: Interactive 4-choice grid with immediate audio/visual feedback and automated score tracking.
- **Custom Meme Creator**: Add your own local images/videos, hints, and custom questions stored persistently in `localStorage`.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Start / Pause 60s Timer |
| <kbd>R</kbd> | Reset Timer to 60s |
| <kbd>→</kbd> or <kbd>N</kbd> | Next Meme Question |
| <kbd>←</kbd> or <kbd>P</kbd> | Previous Meme Question |
| <kbd>Enter</kbd> or <kbd>A</kbd> | Reveal Answer (Host Mode) |
| <kbd>H</kbd> | Reveal Hint |
| <kbd>F</kbd> | Toggle Fullscreen (TV / Projector Mode) |
| <kbd>M</kbd> | Toggle Sound Effects (Mute / Unmute) |
| <kbd>?</kbd> | Open Shortcuts Cheat Sheet |
| <kbd>Esc</kbd> | Close Any Open Modal |

---

## 📁 Production Project Structure

```
meme-quiz/
├── css/
│   └── style.css            # Clean modern light theme & fixed 100vh layout
├── js/
│   ├── app.js               # Application coordinator & state management
│   ├── audio.js             # Web Audio API procedural sound synthesizer
│   ├── data.js              # 20 curated Indian & Bollywood memes database
│   └── timer.js             # High-precision countdown timer engine
├── test/
│   ├── validate.js          # Pre-deployment data, DOM & unit test suite
│   └── http-check.js        # HTTP server & asset delivery verification test
├── .gitignore               # Ignored cache, logs, and OS files
├── favicon.svg              # Vector SVG app icon
├── index.html               # Main application entry point with SEO/OG tags
├── manifest.json            # Web App Manifest (PWA support)
├── package.json             # Project metadata and test/run scripts
├── README.md                # Documentation & deployment guide
├── robots.txt               # Search engine crawling rules
└── vercel.json              # Vercel security headers and caching configuration
```

---

## 🔒 Vercel Production Configuration (`vercel.json`)

Includes production security and caching headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Long-term caching for immutable JS/CSS static assets (`Cache-Control: public, max-age=31536000, immutable`).
