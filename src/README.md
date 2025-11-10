# Anish Vyapari - Animated Portfolio Website 🚀

A stunning, space-purple themed portfolio website with advanced animations, real-time GitHub integration, Discord status, Instagram feed, and interactive comments section.

## ✨ Features

### 🎨 Design & Animations
- **Space Purple Theme** with glassmorphism elements
- **20+ Advanced Animations** including:
  - 3D skill badge rotations
  - Magnetic button effects
  - Tilt effects on project cards
  - Floating gradient orbs
  - Matrix rain background
  - Star field animation
  - Particle effects
  - Cursor glow
  - Smooth parallax scrolling

### 🔗 Integrations
- **GitHub API** - Real-time repository sync and activity feed
- **Discord Lanyard** - Live Discord status with profile, activities, and Spotify
- **Instagram Feed** - Ready for Instagram Basic Display API integration
- **Comments System** - LocalStorage-based commenting with delete functionality

### 📱 Sections
1. **Hero** - Animated introduction with profile picture
2. **About** - Live status widgets (Discord, GitHub, Instagram, Academic timeline)
3. **Projects** - Auto-synced GitHub repositories
4. **Skills & Technologies** - Interactive skill badges
5. **Comments** - Visitor comments section
6. **Support** - UPI payment integration
7. **Contact** - Multiple contact methods

## 🚀 Quick Deployment to GitHub Pages

### Option 1: Automated GitHub Actions (Recommended)

1. **Fork or clone this repository**
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
3. **Push to main branch** - GitHub Actions will automatically build and deploy!

The workflow is already configured in `.github/workflows/deploy.yml`

### Option 2: Manual Deployment

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## ⚙️ Configuration

### 1. GitHub Username
Update your GitHub username in `/App.tsx`:
```typescript
fetch("https://api.github.com/users/YOUR_USERNAME")
```

### 2. Discord User ID
Update your Discord ID in `/components/EnhancedLanyardDiscord.tsx`:
```typescript
const discordUserId = "YOUR_DISCORD_USER_ID";
```

**How to get your Discord ID:**
1. Enable Developer Mode in Discord Settings → Advanced
2. Right-click your profile → Copy ID

### 3. Instagram API (Optional but Recommended)
To show real Instagram content in `/components/EnhancedInstagramFeed.tsx`:

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display API
4. Generate an access token
5. Update the token in the component:
```typescript
const ACCESS_TOKEN = "YOUR_INSTAGRAM_ACCESS_TOKEN_HERE";
```

**Instagram shows demo content until you add your token!**

### 4. Personal Information
Update in `/App.tsx`:
- Name: "Anish Vyapari"
- Birth date: May 23, 2006
- Institution: RAIT Nerul
- UPI ID: 8422936009@mbk (in `/components/SupportSection.tsx`)
- Discord Server: https://discord.gg/dzsKgWMgjJ
- Instagram: @anish_vyapari

## 📦 Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Advanced animations
- **Lucide React** - Icons
- **Vite** - Build tool

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/
├── components/           # React components
│   ├── ui/              # ShadCN UI components
│   ├── figma/           # Figma-related utilities
│   ├── EnhancedLanyardDiscord.tsx
│   ├── EnhancedInstagramFeed.tsx
│   ├── CommentsSection.tsx
│   ├── GitHubActivity.tsx
│   └── ... (other components)
├── styles/
│   └── globals.css      # Global styles & theme
├── App.tsx              # Main application
├── main.tsx            # Entry point
└── index.html          # HTML template
```

## 🎯 Features Breakdown

### Real-time GitHub Integration
- Fetches all public repositories
- Shows commit activity
- Updates every 5 minutes
- Displays stars, forks, and languages

### Enhanced Discord Lanyard
- Live online/offline status
- Custom status with emojis
- Currently playing games/apps
- Spotify integration with album art
- Profile badges (HypeSquad, Early Supporter, etc.)
- Profile decorations and effects

### Instagram Feed Widget
- Grid layout for posts
- Video and carousel indicators
- Hover effects with captions
- Engagement metrics
- Direct links to Instagram
- Auto-refresh every 5 minutes

### Interactive Comments
- Leave and view comments
- Delete functionality
- LocalStorage persistence
- Beautiful animations
- Time formatting (e.g., "2h ago")
- Character limits (500 chars)

## 🎨 Customization

### Colors
Update the CSS variables in `/styles/globals.css`:
```css
:root {
  --background: #0a0118;
  --primary: #8b5cf6;
  --accent: #c084fc;
  /* ... more colors */
}
```

### Animations
Motion animations can be customized in individual components. Look for `motion.*` elements and adjust the `animate`, `transition`, and `whileHover` props.

## 📝 Comments System Note

The comments system currently uses **localStorage**, which means:
- ✅ No backend required
- ✅ Works offline
- ❌ Comments are local to each browser
- ❌ Comments don't sync across devices

For a production comments system, consider integrating:
- Supabase
- Firebase
- A custom backend API

## 🐛 Troubleshooting

### GitHub Pages not showing correctly
- Make sure `base` in `vite.config.ts` matches your repo name
- Check that GitHub Actions completed successfully
- Verify GitHub Pages is enabled in repository settings

### Instagram showing demo content
- Add your Instagram access token as described in Configuration
- Ensure the token has required permissions
- Check browser console for API errors

### Discord status not showing
- Verify your Discord ID is correct
- Check that you're using Discord (status will show as offline otherwise)
- Ensure Lanyard API is accessible

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

Created by **Anish Vyapari**
- GitHub: [@AnishVyapari](https://github.com/AnishVyapari)
- Instagram: [@anish_vyapari](https://www.instagram.com/anish_vyapari/)
- Discord: [Join Server](https://discord.gg/dzsKgWMgjJ)

Built with ❤️ using React, Motion, and lots of ✨

---

**⭐ If you like this project, give it a star on GitHub!**
