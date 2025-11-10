# 🔧 Troubleshooting Guide

Common issues and how to fix them.

## 🐛 GitHub Activity Shows 0 Commits

### Symptom
The GitHub Activity section shows "0 commits" or appears empty even though you have commits on GitHub.

### Possible Causes & Solutions

#### 1. Recent Activity Required
**Problem:** GitHub's public events API only shows the last 90 days of activity.

**Solution:**
- Make a commit to any public repository
- Push some code changes
- Create a new repository
- Star some repositories
- Open a pull request

#### 2. Username Incorrect
**Problem:** The GitHub username in the code doesn't match your actual username.

**Solution:**
```javascript
// In /App.tsx (lines 75, 77)
fetch("https://api.github.com/users/YOUR_ACTUAL_USERNAME")

// In /components/GitHubActivity.tsx (line 27)
fetch("https://api.github.com/users/YOUR_ACTUAL_USERNAME/events/public")
```

#### 3. Rate Limiting
**Problem:** GitHub API limits unauthenticated requests to 60 per hour.

**Solution:**
- Wait an hour and try again
- Check browser console for error messages
- For production, create a GitHub Personal Access Token:
  1. GitHub Settings → Developer Settings → Personal Access Tokens
  2. Generate new token (classic)
  3. Select `public_repo` scope
  4. Add to your requests:
  ```javascript
  fetch("https://api.github.com/users/username", {
    headers: {
      'Authorization': 'token YOUR_TOKEN_HERE'
    }
  })
  ```

#### 4. Private Repositories Only
**Problem:** All your recent activity is on private repositories.

**Solution:**
- Make some repositories public
- Or contribute to public open-source projects

#### 5. No Recent Public Activity
**Problem:** You haven't had any public activity recently.

**Solution:** Create some activity:
- Make a commit to any public repo
- Comment on an issue
- Create a pull request
- Star some repositories

### Quick Test
Open browser console and run:
```javascript
fetch('https://api.github.com/users/YOUR_USERNAME/events/public')
  .then(res => res.json())
  .then(data => console.log(data))
```

## 🎮 Discord Status Not Showing

### Symptom
Discord section shows "Discord status unavailable" or loading forever.

### Solutions

#### 1. Wrong Discord ID
**Problem:** The Discord user ID is incorrect.

**Solution:**
1. Enable Developer Mode: Discord Settings → Advanced → Developer Mode
2. Right-click your name → Copy ID
3. Update `/components/LanyardDiscord.tsx` line 36

#### 2. Not in Lanyard Discord
**Problem:** You need to be in a server with the Lanyard bot.

**Solution:**
1. Join https://discord.gg/lanyard
2. Wait a few minutes for it to register
3. Refresh your portfolio

#### 3. Privacy Settings
**Problem:** Your Discord activity isn't being shared.

**Solution:**
1. Discord Settings → Privacy & Safety
2. Enable "Display current activity as a status message"

### Quick Test
Check if Lanyard can see you:
```
https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID
```
Visit this URL in your browser - you should see JSON data.

## 📷 Instagram Feed Issues

### Symptom
Instagram section not showing posts or showing errors.

### Solution
The Instagram component currently uses mock data. For real Instagram posts:

1. Set up Instagram Basic Display API:
   - Go to https://developers.facebook.com/
   - Create an app
   - Add Instagram Basic Display product
   - Generate access token

2. Update `/components/InstagramFeed.tsx`:
```javascript
const response = await fetch(
  `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=YOUR_TOKEN`
);
```

## 🚫 Build Failures

### Symptom
GitHub Actions fails to build, or `npm run build` shows errors.

### Solutions

#### Type Errors
```bash
# Check what's wrong
npm run type-check

# Common fixes:
npm install --save-dev @types/react @types/react-dom
```

#### Missing Dependencies
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Outdated Dependencies
```bash
# Update dependencies
npm update
```

## 🌐 Site Not Loading

### Symptom
Portfolio site shows 404 or doesn't load.

### Solutions

#### 1. GitHub Pages Not Enabled
- Repository Settings → Pages
- Source should be "GitHub Actions"
- Branch should be deployed

#### 2. Repository Name Wrong
For username.github.io:
- Repo must be named exactly `yourusername.github.io`
- Username must match exactly (case-sensitive)

For project site:
- Any name works
- Will be at `yourusername.github.io/repo-name`
- Update `base` in `vite.config.ts`:
```javascript
base: '/repo-name/'
```

#### 3. Build Not Complete
- Check GitHub Actions tab
- Wait for green checkmark
- Can take 2-5 minutes

#### 4. Browser Cache
```
Hard refresh:
- Chrome/Firefox: Ctrl + Shift + R (Cmd + Shift + R on Mac)
- Safari: Cmd + Option + R
```

## 🎨 Styling Issues

### Symptom
Colors wrong, layout broken, animations not working.

### Solutions

#### Tailwind Not Loading
```bash
# Check globals.css is imported
# Should be in /src/main.tsx
```

#### Animations Janky
```javascript
// In component, check motion import:
import { motion } from "motion/react";

// Not:
import { motion } from "framer-motion"; // Old package
```

## 📱 Mobile Issues

### Symptom
Site looks broken on mobile.

### Solutions

#### Viewport Not Set
Check `/index.html` has:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

#### Horizontal Scroll
```css
/* Add to component if needed */
className="overflow-x-hidden"
```

## 🐌 Slow Loading

### Solutions

#### Optimize Images
- Compress images before uploading
- Use WebP format
- Keep under 500KB each

#### Check Bundle Size
```bash
npm run build

# Check dist/ folder size
# Should be under 5MB total
```

#### Lazy Load Components
```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

## 🔍 Debugging Tips

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Check Network tab for failed requests

### Common Console Errors

#### "Failed to fetch"
- Check internet connection
- API might be down
- CORS issue (use proxy if needed)

#### "Cannot read property of undefined"
- Data not loaded yet
- Add null checks:
```javascript
{data?.property && <div>{data.property}</div>}
```

### Test API Endpoints

#### GitHub API
```bash
curl https://api.github.com/users/YOUR_USERNAME
```

#### GitHub Events
```bash
curl https://api.github.com/users/YOUR_USERNAME/events/public
```

#### Lanyard
```bash
curl https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID
```

## 📞 Still Having Issues?

1. **Check GitHub Actions Tab**
   - See detailed build logs
   - Look for error messages

2. **Search GitHub Issues**
   - Someone might have had the same problem
   - Check closed issues too

3. **Browser Console**
   - Always check for JavaScript errors
   - Network tab shows API failures

4. **Test Locally First**
   ```bash
   npm run dev
   # Fix all issues locally before deploying
   ```

## ✅ Prevention Checklist

Before pushing to GitHub:
- [ ] Test locally with `npm run dev`
- [ ] Run `npm run build` successfully
- [ ] Check browser console for errors
- [ ] Test all links
- [ ] Verify API endpoints work
- [ ] Check on mobile device

---

**Remember:** Most issues are caused by:
1. Incorrect usernames/IDs
2. Missing recent activity
3. API rate limits
4. Typos in code

Double-check these first! 🔍
