# GitHub Pages Deployment Guide 🚀

This guide will help you deploy your portfolio to GitHub Pages.

## Prerequisites

- Git installed on your computer
- A GitHub account
- Node.js 18+ installed

## Quick Start

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `yourusername.github.io` (replace `yourusername` with your GitHub username)
3. Make it **public**
4. Don't initialize with README (we have files already)

### 2. Configure Your Portfolio

Before deploying, update these files with your information:

#### `/App.tsx`
- Line 75-77: Change `AnishVyapari` to your GitHub username

#### `/components/GitHubActivity.tsx`
- Line 27: Change `AnishVyapari` to your GitHub username

#### `/components/LanyardDiscord.tsx`
- Line 36: Change the Discord ID to yours ([How to get Discord ID](https://support.discord.com/hc/en-us/articles/206346498))

#### `/components/AcademicTimeline.tsx`
- Update with your education details

#### `/components/SupportSection.tsx`
- Update UPI ID if you want to accept payments

#### `/components/SocialLinks.tsx`
- Update all social media links

### 3. Initialize Git and Push to GitHub

Open terminal in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. The site will automatically build and deploy!

### 5. Wait for Deployment

- Go to the **Actions** tab in your repository
- Wait for the workflow to complete (usually 2-3 minutes)
- Once complete, your site will be live at `https://yourusername.github.io`

## Updating Your Site

Whenever you want to update your portfolio:

```bash
# Make your changes, then:
git add .
git commit -m "Description of your changes"
git push
```

The site will automatically rebuild and deploy!

## Custom Domain (Optional)

Want to use your own domain like `yourname.com`?

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc.)
2. Add a file named `CNAME` to your repository with your domain:
   ```
   yourdomain.com
   ```
3. In your domain registrar's DNS settings, add:
   - Type: `A` Record
   - Host: `@`
   - Value: These four IPs (add all 4):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Type: `CNAME` Record (if using www)
   - Host: `www`
   - Value: `yourusername.github.io`

4. Wait 24-48 hours for DNS propagation

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Check for type errors
npm run type-check
```

### GitHub Activity Shows 0 Commits

- Make sure you have recent public activity on GitHub
- Check that your username is correct in the code
- GitHub API has rate limits (60 requests/hour without auth)

### Discord Status Not Working

- Verify your Discord user ID is correct
- Join a server that has the Lanyard bot
- Visit https://discord.gg/lanyard to add Lanyard

### Site Not Updating

- Check the Actions tab for build errors
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for changes to propagate

### 404 Page Not Found

- Ensure the repository is public
- Check that GitHub Pages is enabled in Settings
- Verify the source is set to "GitHub Actions"

## Performance Tips

### Optimize Images
- Use compressed images (PNG/JPEG)
- Consider WebP format for better compression
- Keep images under 500KB each

### Reduce Bundle Size
The build process automatically:
- Minifies code
- Tree-shakes unused dependencies
- Splits code into chunks
- Compresses assets

### Enable HTTPS
GitHub Pages automatically enables HTTPS. Ensure:
1. Go to Settings → Pages
2. Check "Enforce HTTPS"

## Analytics (Optional)

Want to track visitors? Add Google Analytics:

1. Get a Google Analytics tracking ID
2. Add to `index.html`:
```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_TRACKING_ID');
  </script>
</head>
```

## Security

- Never commit API keys or secrets
- Use environment variables for sensitive data
- GitHub Pages is public - don't include private information

## Support

If you encounter issues:

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Look for solutions in [GitHub Discussions](https://github.com/orgs/community/discussions/categories/pages)
3. Review the error messages in the Actions tab

## Next Steps

After deployment:
- Share your portfolio link
- Add it to your GitHub profile README
- Include it in your resume and social media
- Keep it updated with new projects!

---

Congratulations! Your portfolio is now live! 🎉
