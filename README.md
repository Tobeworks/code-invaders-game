# 🚀 Code Invaders -  Easter Egg Game

A Space Invaders-inspired browser game as an Easter Egg. Built with Vanilla JavaScript and Canvas API.

## ✨ Features

- **🐛 Bug Invaders:** Eliminate ERROR, 404, NULL, CRASH and SPAM
- **🎯 Tobeworks Logo Bonus:** Rare logo as mega bonus (+500 points, +1 life)
- **☕ Power-ups:** Coffee, Ideas and Boosts
- **🎨 Corporate Design:** Orange color scheme matching the Tobeworks website
- **💥 Explosion Animations:** Spectacular effects when destroying bugs
- **📱 Web Component:** Easy integration as `<code-invaders>`

## 🛠️ Setup & Development

```bash
# Installation
pnpm install

# Development Server
pnpm dev

# Build for Production
pnpm build

# Preview Build
pnpm preview
```

## 🎮 Controls

- **Arrow Keys:** Move spaceship
- **Spacebar:** Shoot
- **Goal:** Eliminate all bugs before they reach the ground

## 🌐 Homepage Integration

### Option 1: Direct Integration
```html
<script src="./dist/code-invaders.umd.js"></script>
<code-invaders width="800" height="600"></code-invaders>
```

### Option 2: As Easter Egg with Trigger
```javascript
// Konami Code or other triggers
document.addEventListener('keydown', (e) => {
  if (konamiCode) {
    const game = document.createElement('code-invaders');
    document.body.appendChild(game);
  }
});
```

### Option 3: ES Module
```javascript
import { CodeInvadersElement } from './dist/code-invaders.es.js';
```

## 🎯 Attributes

- `width`: Canvas width (default: 800)
- `height`: Canvas height (default: 600)

```html
<code-invaders width="600" height="400"></code-invaders>
```

## 🏗️ Project Structure

```
code-invaders-easter-egg/
├── src/
│   ├── index.js          # Web Component Entry Point
│   └── code-invaders.js  # Game Logic Class
├── dist/                 # Build Output
│   ├── code-invaders.umd.js    # UMD Bundle
│   └── code-invaders.es.js     # ES Module
├── index.html           # Development Demo
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

The game uses the Tobeworks color scheme:
- **Primary:** `#ff8c42` (Orange)
- **Secondary:** `#ffb380` (Light Orange)  
- **Background:** `#000000` (Black)

## 🚀 Deployment

After `pnpm build`:
1. Copy `dist/code-invaders.umd.js` to your server
2. Include the script in your HTML page
3. Use `<code-invaders>` wherever you want

## 📄 License

MIT License - Tobias Lorsbach / Tobeworks

---