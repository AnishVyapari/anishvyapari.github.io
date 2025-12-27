# 🧠 NeuralOS - Portfolio OS Simulation

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://anishvyapari.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-AnishVyapari-blue)](https://github.com/AnishVyapari)

A cutting-edge portfolio website designed as an interactive OS simulation with glassmorphism UI, CRT boot effects, and fully functional desktop environment.

![NeuralOS Preview](https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop)

## ✨ Features

### 🖥️ Desktop Environment
- macOS-inspired window manager with draggable windows
- Minimize, maximize, and close controls
- Floating taskbar with active window indicators
- Custom cursor with hover effects
- Smooth animations and glassmorphism design

### 📱 Built-in Applications
- **Terminal** - Fully functional with custom commands
- **Browser** - Embedded portfolio browser with navigation
- **VS Code** - Syntax-highlighted code editor with file explorer
- **Neural Bot** - AI chat powered by Mistral AI (with image generation)
- **File Explorer** - Browse portfolio files and projects
- **System Monitor** - Real-time CPU, memory, and network graphs
- **Game Arena** - Multiple games (Snake, Tic-Tac-Toe, Memory Match, RPS)

### 🎮 Interactive Games
- Snake (1v1 AI Battle)
- Tic-Tac-Toe (vs Minimax AI)
- Memory Card Match (Hard Mode AI)
- Rock Paper Scissors (vs AI)
- Click Challenge

### 🎨 Design Highlights
- CRT boot animation with realistic system logs
- Custom sound engine with audio feedback
- Glassmorphism UI with backdrop blur
- Scanline effects and noise overlay
- Dynamic content (age, quotes, system uptime)
- Responsive notifications system

## 🚀 Tech Stack

- **Pure Vanilla JS** - No frameworks, just raw JavaScript
- **HTML5 + CSS3** - Modern web standards
- **Font Awesome** - Icon library
- **Google Fonts** - JetBrains Mono + Inter
- **Web Audio API** - Custom sound engine
- **Mistral AI** - Chatbot functionality
- **Pollinations AI** - Image generation

## 📦 Setup

1. Clone the repository:
```bash
git clone https://github.com/AnishVyapari/anishvyapari.github.io.git
cd anishvyapari.github.io
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve
```

3. Visit `http://localhost:8000`

## 🎯 Terminal Commands

Try these commands in the built-in terminal:

```bash
help        # Show all available commands
whoami      # Display bio information
ls          # List all files
cat <file>  # Read file contents
clear       # Clear terminal
neofetch    # System information
date        # Show current date/time
uptime      # System uptime
github      # Open GitHub profile
```

## 🔧 Configuration

### API Keys
To enable chatbot and image generation features, add your API keys:

```javascript
const MISTRAL_API_KEY = "your_mistral_api_key_here";
```

### Discord Webhooks
Activity logging via Discord webhooks is built-in. Configure in the code:

```javascript
const DISCORD_WEBHOOK = "your_webhook_url";
```

## 🎨 Customization

### Color Scheme
Edit CSS variables in `:root`:

```css
--accent-color: #1793d1;
--accent-green: #2ecc71;
--accent-red: #e74c3c;
--accent-yellow: #f1c40f;
```

### Background
Change the background image URL in the CSS:

```css
background: url('your-image-url') no-repeat center center fixed;
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Anish Vyapari**
- GitHub: [@AnishVyapari](https://github.com/AnishVyapari)
- Instagram: [@anish_vyapari](https://instagram.com/anish_vyapari)
- Discord: anish_vyapari

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

<p align="center">Built with ❤️ by Anish Vyapari</p>
