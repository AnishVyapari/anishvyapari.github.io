# ⚡ Quick Start Guide

Get your portfolio live in 5 minutes!

## 🚀 Super Fast Deployment

### 1. Update Your Info (2 minutes)

Open these files and replace with your info:

**`/App.tsx` - Line 76**
```typescript
fetch("https://api.github.com/users/YOUR_USERNAME")
```

**`/components/EnhancedLanyardDiscord.tsx` - Line 82**
```typescript
const discordUserId = "YOUR_DISCORD_ID";
```

### 2. Push to GitHub (1 minute)

```bash
git init
git add .
git commit -m "My awesome portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3. Enable GitHub Pages (1 minute)

1. Go to your repo → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Wait 2-3 minutes ⏱️

### 4. Done! 🎉

Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## 🎨 Optional Enhancements

### Add Discord Status
1. Discord → Settings → Advanced → Developer Mode ON
2. Right-click profile → Copy ID
3. Paste in `/components/EnhancedLanyardDiscord.tsx`

### Add Real Instagram Posts
1. Get token from [developers.facebook.com](https://developers.facebook.com/)
2. Update `/components/EnhancedInstagramFeed.tsx`
3. Replace `YOUR_INSTAGRAM_ACCESS_TOKEN_HERE`

### Customize Colors
Edit `/styles/globals.css` CSS variables

---

## 📝 Need More Help?

- **Full guide**: See `DEPLOYMENT_GUIDE.md`
- **Features**: See `README.md`
- **Issues**: Check GitHub Actions tab

**That's it! Your portfolio is live! 🚀**
