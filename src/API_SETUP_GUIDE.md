# 🔌 API Setup Guide

Complete guide to setting up all API integrations for your portfolio.

## 📋 Overview

Your portfolio connects to:
1. ✅ **GitHub API** - Works out of the box (no key needed!)
2. ✅ **Discord Lanyard API** - Works out of the box (just need your ID!)
3. ⚠️ **Instagram API** - Requires setup (optional)

## 1. GitHub API Setup ✅

### Status: **No Setup Required!**

The GitHub API works without authentication for public data.

**What to configure:**
- Just update your GitHub username in `/App.tsx` line 76

```typescript
fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME")
```

### Rate Limits
- **Without auth**: 60 requests/hour per IP
- **With auth**: 5,000 requests/hour

### Optional: Add GitHub Token (For Higher Limits)

If you want higher rate limits:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` only
4. Copy the token
5. Add to `.env.local`:
```
VITE_GITHUB_TOKEN=ghp_your_token_here
```
6. Update fetch in App.tsx:
```typescript
fetch("https://api.github.com/users/YOUR_USERNAME", {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
})
```

## 2. Discord Lanyard Setup ✅

### Status: **Easy Setup (2 minutes)**

Lanyard shows your real-time Discord status without any API keys!

### Step 1: Get Your Discord User ID

1. Open Discord
2. Go to Settings → Advanced
3. Enable "Developer Mode"
4. Right-click your profile anywhere
5. Click "Copy ID"
6. You'll get something like: `1265981186283409571`

### Step 2: Join Lanyard Discord Server

1. Visit: [discord.gg/lanyard](https://discord.gg/lanyard)
2. Join the server
3. That's it! Lanyard will start tracking your status

### Step 3: Update Your Portfolio

Edit `/components/EnhancedLanyardDiscord.tsx` line 82:
```typescript
const discordUserId = "YOUR_DISCORD_ID_HERE";
```

### Features You'll Get
- ✅ Online/Offline/Idle/DND status
- ✅ Custom status with emojis
- ✅ Current activity (games, apps)
- ✅ Spotify now playing
- ✅ Profile badges
- ✅ Avatar decorations

### Optional: Custom Bio with KV

Add a custom bio that shows in your portfolio:

1. Go to [discord.gg/lanyard](https://discord.gg/lanyard)
2. Use the bot command:
```
!setbio Your custom bio here
```
3. It will automatically appear in your portfolio!

### Troubleshooting
- **Status shows offline**: Make sure you joined the Lanyard server
- **Not updating**: Wait a few minutes after joining
- **Wrong status**: Verify your Discord ID is correct

## 3. Instagram API Setup ⚠️

### Status: **Optional (More Complex)**

Instagram requires Facebook Developer account and app creation.

### Why is it complex?
- Instagram deprecated their simple API
- Now requires Facebook Business account
- Needs app review for some features
- Access tokens expire

### Do You Need It?
**Your portfolio works perfectly without it!** It shows beautiful demo content until you set it up.

### If You Want Real Instagram Posts:

#### Step 1: Create Facebook App (15 minutes)

1. Go to [developers.facebook.com](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Consumer" type
4. Enter app name (e.g., "My Portfolio")
5. Add your email
6. Create app

#### Step 2: Add Instagram Basic Display

1. In your app dashboard
2. Click "Add Product"
3. Find "Instagram Basic Display"
4. Click "Set Up"
5. Click "Create New App"
6. Enter display name
7. Save

#### Step 3: Configure Instagram App

1. Go to Basic Display → Settings
2. Add OAuth Redirect URI:
   - For testing: `https://localhost:3000/`
   - For production: `https://yourusername.github.io/your-repo/`
3. Add Deauthorize Callback: (same URL)
4. Add Data Deletion Request: (same URL)
5. Save changes

#### Step 4: Add Instagram Test User

1. Go to "Roles" → "Instagram Testers"
2. Click "Add Instagram Testers"
3. Enter your Instagram username
4. Go to your Instagram app
5. Settings → Apps and Websites → Tester Invites
6. Accept the invite

#### Step 5: Generate Access Token

1. Go to Basic Display → User Token Generator
2. Click "Generate Token" next to your test user
3. Authorize the app
4. Copy the access token (starts with `IGQV...`)

#### Step 6: Add Token to Your Portfolio

**Option A: Environment Variable (Recommended)**

1. Create `.env.local`:
```
VITE_INSTAGRAM_ACCESS_TOKEN=IGQV...your_token...
```

2. Update `/components/EnhancedInstagramFeed.tsx` line 31:
```typescript
const ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || "YOUR_INSTAGRAM_ACCESS_TOKEN_HERE";
```

**Option B: Direct (Not Recommended for Public Repos)**

Update `/components/EnhancedInstagramFeed.tsx` line 31:
```typescript
const ACCESS_TOKEN = "IGQV...your_token...";
```

⚠️ **Never commit access tokens to public repositories!**

#### Step 7: Refresh Tokens (Important!)

Instagram tokens expire after 60 days. You need to refresh them:

1. Use this endpoint before expiry:
```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_TOKEN
```

2. Or set up automatic refresh in your app

### Alternative: Instagram Embed

Instead of the API, you can use Instagram's embed:

```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/POST_ID/">
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

### What You'll Get With Instagram API
- ✅ Your latest posts automatically
- ✅ Reels display
- ✅ Carousel albums
- ✅ Post captions
- ✅ Media URLs
- ✅ Timestamps
- ✅ Auto-refresh every 5 minutes

## 🔒 Security Best Practices

### ✅ DO:
- Use environment variables for tokens
- Add `.env.local` to `.gitignore`
- Use GitHub Secrets for deployment
- Rotate tokens regularly
- Use minimum required permissions

### ❌ DON'T:
- Commit tokens to Git
- Share tokens publicly
- Use tokens in client-side code (if possible)
- Use production tokens in development
- Give more permissions than needed

## 🚀 Testing Your APIs

### GitHub API Test
```bash
curl https://api.github.com/users/YOUR_USERNAME
```

Expected: JSON with your profile data

### Discord Lanyard Test
```bash
curl https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID
```

Expected: JSON with your Discord status

### Instagram API Test
```bash
curl "https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=YOUR_TOKEN"
```

Expected: JSON with your posts

## 📊 API Limits & Costs

| API | Rate Limit | Cost | Setup Time |
|-----|-----------|------|------------|
| GitHub | 60/hour (unauth) | Free | 0 min ✅ |
| Discord Lanyard | Unlimited | Free | 2 min ✅ |
| Instagram | 200/hour | Free | 15 min ⚠️ |

## 🆘 Troubleshooting

### GitHub Not Loading
```javascript
// Check browser console
console.log("Checking GitHub API...");
fetch("https://api.github.com/users/YOUR_USERNAME")
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Discord Status Not Showing
1. Verify you joined [discord.gg/lanyard](https://discord.gg/lanyard)
2. Wait 5 minutes after joining
3. Check API: `https://api.lanyard.rest/v1/users/YOUR_ID`
4. Verify ID is correct

### Instagram Errors
- **Token Invalid**: Regenerate token
- **Token Expired**: Refresh token (60 days limit)
- **No Permissions**: Check app permissions
- **Wrong User**: Verify Instagram account is test user

## 📞 Need Help?

### Resources
- **GitHub API**: [docs.github.com/rest](https://docs.github.com/rest)
- **Lanyard**: [github.com/Phineas/lanyard](https://github.com/Phineas/lanyard)
- **Instagram**: [developers.facebook.com/docs/instagram-basic-display-api](https://developers.facebook.com/docs/instagram-basic-display-api)

### Common Issues
- Check browser console for errors
- Verify API keys are correct
- Check rate limits
- Test APIs with curl/Postman first
- Read error messages carefully

## ✅ Recommended Setup

For best results:

1. ✅ **GitHub** - Just update username (works immediately)
2. ✅ **Discord** - Takes 2 minutes (huge visual impact)
3. ⏸️ **Instagram** - Skip for now (demo content looks great)

You can always add Instagram later!

---

**Your portfolio works beautifully without all APIs!** Start simple and add more later. 🚀
