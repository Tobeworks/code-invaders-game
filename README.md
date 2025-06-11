# 🚀 Code Invaders - Easter Egg Game

A Space Invaders-inspired browser game as an Easter Egg. Built with Vanilla JavaScript and Canvas API.

![Code Invaders Game](./resources/code-invaders%20cover.jpg)


## ✨ Features

- **🐛 Bug Invaders:** Eliminate ERROR, 404, NULL, CRASH and SPAM
- **🎯 Tobeworks Logo Bonus:** Rare logo as mega bonus (+500 points, +1 life)
- **☕ Power-ups:** Coffee, Ideas and Boosts
- **🎨 Corporate Design:** Orange color scheme matching the Tobeworks website
- **💥 Explosion Animations:** Spectacular effects when destroying bugs
- **📱 Web Component:** Easy integration as `<code-invaders>`
- **📊 Version Display:** Shows current version from package.json

## 📦 Installation

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/code-invaders-easter-egg.git
cd code-invaders-easter-egg

# Install dependencies
pnpm install

# Build
pnpm build
```

### For Your Homepage
```bash
# After building, copy the UMD file:
cp dist/code-invaders.umd.js /path/to/your/website/js/
```

## 🛠️ Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/code-invaders-easter-egg.git
cd code-invaders-easter-egg

# Install dependencies
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

## 🌐 Usage

### Option 1: Direct Script Tag
```html
<script src="./js/code-invaders.umd.js"></script>
<code-invaders width="800" height="600"></code-invaders>
```

### Option 2: ES Module (if using bundler)
```javascript
import './js/code-invaders.es.js';

// Use anywhere in your HTML
<code-invaders width="800" height="600"></code-invaders>
```

### Option 3: As Easter Egg with Trigger
```javascript
// Include the script first
<script src="./js/code-invaders.umd.js"></script>

// Konami Code trigger
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    const game = document.createElement('code-invaders');
    game.style.position = 'fixed';
    game.style.top = '50%';
    game.style.left = '50%';
    game.style.transform = 'translate(-50%, -50%)';
    game.style.zIndex = '9999';
    document.body.appendChild(game);
  }
});
```

## 🎯 Attributes

- `width`: Canvas width (default: 800)
- `height`: Canvas height (default: 600)
- `show-version`: Show version info (default: true)

```html
<code-invaders width="600" height="400" show-version="false"></code-invaders>
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
├── resources/            # Assets & Screenshots
│   └── code-invaders cover.jpg
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

### Build for Production
```bash
pnpm build
```

### Deploy to Your Website
```bash
# Copy the built file to your website
cp dist/code-invaders.umd.js /path/to/your/website/js/

# Include in your HTML
<script src="./js/code-invaders.umd.js"></script>
<code-invaders width="800" height="600"></code-invaders>
```

## 🔧 Browser Support

- **Modern Browsers:** Chrome 87+, Firefox 78+, Safari 14+, Edge 88+
- **Canvas API:** Required
- **ES Modules:** Supported

## 📄 License

MIT License - Tobias Lorsbach / Tobeworks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ and ☕ for Tobeworks**