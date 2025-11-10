# 🚀 Complete GitHub Pages Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages in minutes!

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js installed (v18 or higher)

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Name it: `your-username.github.io` (recommended) or any name
   - Make it public
   - Don't initialize with README (we already have one)

2. **Connect your local project to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Anish Vyapari Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Source: **GitHub Actions**
5. Click **Save**

### Step 3: Configure Your Information

Before deploying, update these files with your information:

#### A. GitHub Username (`/App.tsx`)
```typescript
// Line 76-79
fetch("https://api.github.com/users/AnishVyapari")
// Change to:
fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME")
```

#### B. Discord User ID (`/components/EnhancedLanyardDiscord.tsx`)
```typescript
// Line 82
const discordUserId = "1265981186283409571";
// Change to your Discord ID
```

**To get your Discord ID:**
1. Open Discord → Settings → Advanced → Enable Developer Mode
2. Right-click your profile → Copy ID
3. Paste the ID in the code

#### C. Instagram API (Optional - shows demo content until configured)
`/components/EnhancedInstagramFeed.tsx`:
```typescript
// Line 31
const ACCESS_TOKEN = "YOUR_INSTAGRAM_ACCESS_TOKEN_HERE";
```

**To get Instagram token:**
1. Visit [developers.facebook.com](https://developers.facebook.com/)
2. Create an app
3. Add Instagram Basic Display
4. Generate User Token
5. Replace the ACCESS_TOKEN value

#### D. Personal Details
Update these in `/App.tsx` and other components:
- Name
- Birth date (line 107)
- Institution
- Email
- Social links

#### E. UPI Payment (`/components/SupportSection.tsx`)
```typescript
// Update your UPI ID
const upiId = "8422936009@mbk"; // Change to yours
```

### Step 4: Deploy! 🎉

#### Option A: Automatic Deployment (Recommended)

Simply push to main branch:
```bash
git add .
git commit -m "Configure personal information"
git push origin main
```

GitHub Actions will automatically:
1. Build your site
2. Deploy to GitHub Pages
3. Make it live!

**Check deployment status:**
- Go to your repo → Actions tab
- Watch the "Deploy to GitHub Pages" workflow
- It takes 2-3 minutes

**Your site will be live at:**
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- Or `https://YOUR_USERNAME.github.io/` if repo name is `your-username.github.io`

#### Option B: Manual Deployment

```bash
# Install dependencies
npm install

# Build
npm run build

# The dist/ folder contains your website
# You can manually upload this to any hosting service
```

### Step 5: Verify Deployment

1. Visit your GitHub Pages URL
2. Check that all sections load correctly
3. Test the animations and interactions
4. Verify GitHub repos are loading
5. Check Discord status (if configured)

## 🔧 Common Issues & Fixes

### Issue: Page shows 404 error
**Fix:** 
- Check that GitHub Pages is enabled
- Verify the workflow completed successfully
- Wait 2-3 minutes after deployment
- Check if `base` in `vite.config.ts` is correct

### Issue: Styles not loading
**Fix:**
- Clear browser cache
- Check browser console for errors
- Verify the build completed without errors

### Issue: GitHub repos not showing
**Fix:**
- Check GitHub username is correct in `/App.tsx`
- Open browser console to see API errors
- GitHub API has rate limits (60 requests/hour without auth)

### Issue: Discord status shows offline
**Fix:**
- Verify Discord ID is correct
- Make sure you're actually online on Discord
- Check Lanyard API status

### Issue: Instagram shows demo content
**Fix:**
- This is normal! Add your Instagram access token to show real content
- Follow instructions in Step 3C above

## 🎨 Customization After Deployment

### Update Content
1. Edit files locally
2. Commit and push to GitHub
3. GitHub Actions will auto-deploy updates

### Add New Projects
They'll automatically appear as you create repos on GitHub!

### Modify Colors
Edit `/styles/globals.css` and customize CSS variables

## 🔒 Security Best Practices

### Instagram Access Token
- **Never commit access tokens to public repos!**
- Consider using GitHub Secrets:
  1. Repo Settings → Secrets → Actions
  2. Add `INSTAGRAM_TOKEN`
  3. Update code to use `process.env.INSTAGRAM_TOKEN`

### UPI ID
- Only use UPI for donations, never for personal transactions
- Consider using payment gateway for real transactions

### Comments System
- Current implementation uses localStorage (local only)
- For production, consider adding:
  - Supabase for backend
  - Comment moderation
  - Spam protection

## 📊 Monitor Your Site

### GitHub Pages Status
- Repo → Settings → Pages shows deployment URL
- Repo → Actions shows deployment history

### Analytics (Optional)
Add Google Analytics by adding to `/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

## 🆘 Need Help?

### Resources
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Documentation](https://react.dev/)

### Troubleshooting
1. Check GitHub Actions logs for build errors
2. Use browser DevTools console to debug
3. Verify all configuration is correct

## 🎯 Optimization Tips

### Performance
- Images are already optimized with ImageWithFallback
- Code splitting is configured in `vite.config.ts`
- Motion animations use GPU acceleration

### SEO
Add to `/index.html`:
```html
<meta name="description" content="Anish Vyapari - AI/ML Engineer Portfolio">
<meta name="keywords" content="AI, Machine Learning, Developer, Portfolio">
<meta property="og:title" content="Anish Vyapari - Portfolio">
<meta property="og:description" content="AI/ML Engineer & Full Stack Developer">
<meta property="og:image" content="URL_TO_YOUR_PREVIEW_IMAGE">
```

### Custom Domain (Optional)
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. Add DNS records pointing to GitHub Pages
3. Add custom domain in repo Settings → Pages
4. Update `vite.config.ts`:
```typescript
base: '/', // For custom domain
```

## ✅ Deployment Checklist

- [ ] Repository created on GitHub
- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] Personal information updated in all files
- [ ] Discord ID configured (optional)
- [ ] Instagram token added (optional)
- [ ] UPI ID updated (optional)
- [ ] Code committed and pushed to main
- [ ] GitHub Actions workflow completed successfully
- [ ] Website is live and accessible
- [ ] All sections load correctly
- [ ] GitHub repos are showing
- [ ] Animations are working
- [ ] Comments section works
- [ ] Mobile responsive layout verified

## 🎉 Congratulations!

Your portfolio is now live on the internet! 🚀

**Share your portfolio:**
- Add link to GitHub profile
- Share on social media
- Include in resume/CV
- Show to potential employers

---

**Questions?** Check the main README.md or open an issue on GitHub!
