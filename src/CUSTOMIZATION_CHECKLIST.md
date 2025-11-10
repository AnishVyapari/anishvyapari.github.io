# 📝 Customization Checklist

Use this checklist to personalize your portfolio with your information.

## ✅ Personal Information

### `/App.tsx`
- [ ] Line 75, 77: Change `AnishVyapari` to your GitHub username
- [ ] Line 106: Update birthdate `new Date(2006, 4, 23)` to your birthdate
- [ ] Line 362-363: Update age and college info
- [ ] Line 149-154: Update navigation items if needed
- [ ] Line 119-146: Update skills array with your skills

### `/components/AcademicTimeline.tsx`
- [ ] Update all education entries with your academic history
- [ ] Change dates, institutions, and descriptions
- [ ] Add/remove timeline items as needed

### `/components/GitHubActivity.tsx`  
- [ ] Line 27: Change `AnishVyapari` to your GitHub username

### `/components/LanyardDiscord.tsx`
- [ ] Line 36: Replace `1265981186283409571` with your Discord user ID
  - Get it by: Settings → Advanced → Developer Mode → Right-click your name → Copy ID

### `/components/SocialLinks.tsx`
- [ ] Update GitHub URL
- [ ] Update Instagram URL  
- [ ] Update Discord invite link
- [ ] Update email address
- [ ] Add/remove social links as needed

### `/components/SupportSection.tsx`
- [ ] Line with UPI: Change `8422936009@mbk` to your UPI ID
- [ ] Update payment descriptions if needed

### `/index.html`
- [ ] Line 10: Update meta description with your info
- [ ] Line 11: Update keywords
- [ ] Line 12: Update author name
- [ ] Line 16: Update Open Graph title
- [ ] Line 17: Update Open Graph description
- [ ] Line 18: Update Open Graph URL to your site
- [ ] Line 22-23: Update Twitter meta tags
- [ ] Line 28: Update page title

### `/README.md`
- [ ] Update title with your name
- [ ] Update description
- [ ] Update contact section at bottom
- [ ] Update repository URLs

## 🎨 Styling (Optional)

### `/styles/globals.css`
Want to change colors?
- [ ] Lines 11, 51: `--primary` color (main purple)
- [ ] Lines 17, 57: `--accent` color (secondary purple)
- [ ] Lines 3, 45: `--background` color (dark background)
- [ ] Lines 6, 46: `--foreground` color (text color)

### Color Scheme Quick Reference
Current: Space Purple Theme
- Primary: `#8b5cf6` (purple)
- Accent: `#c084fc` (light purple)
- Background: `#0a0118` (dark purple/black)

## 🖼️ Images & Media

### Profile Picture
- [ ] Your GitHub avatar is automatically loaded
- [ ] Make sure your GitHub profile has a good profile picture

### Instagram Integration
If you want real Instagram posts:
- [ ] Set up Instagram Basic Display API
- [ ] Get access token
- [ ] Update `/components/InstagramFeed.tsx` with real API calls

### Background Images
- [ ] The hero section uses Unsplash images by default
- [ ] To change: Update image URL in `/App.tsx` line 254

## 🔗 Links to Update

Make sure to update these URLs throughout:

| What | Where | Current Value | Your Value |
|------|-------|---------------|------------|
| GitHub | Multiple files | AnishVyapari | _____________ |
| Instagram | Multiple files | anish_vyapari | _____________ |
| Discord ID | LanyardDiscord.tsx | 1265981186283409571 | _____________ |
| Discord Server | Multiple files | discord.gg/dzsKgWMgjJ | _____________ |
| UPI ID | SupportSection.tsx | 8422936009@mbk | _____________ |
| Email | SocialLinks.tsx | (from GitHub) | _____________ |

## 🎯 Content Updates

### Bio & Description
- [ ] `/App.tsx` - The bio is pulled from your GitHub profile
- [ ] Make sure your GitHub profile bio is up to date
- [ ] It will automatically appear on your portfolio

### Skills Section
- [ ] `/App.tsx` lines 119-146
- [ ] Add your actual skills
- [ ] Remove skills you don't have
- [ ] Order them by proficiency

### Projects
- [ ] Projects are automatically loaded from your GitHub
- [ ] Make sure your GitHub repos have:
  - Good descriptions
  - Topics/tags
  - Stars (ask friends to star!)
- [ ] Hide repos by adding them to the filter in `/App.tsx` line 88

## 🚀 Advanced Customization

### Add New Sections
Want to add a blog, testimonials, or certifications section?
- [ ] Create a new component in `/components/`
- [ ] Import it in `/App.tsx`
- [ ] Add it to the page layout
- [ ] Update navigation in `/App.tsx` lines 148-155

### Animations
Want more or different animations?
- [ ] Check `/components/` for animation components
- [ ] Modify Motion parameters in component files
- [ ] Adjust timing, easing, and delays

### Mobile Experience  
- [ ] Test on mobile devices
- [ ] Adjust breakpoints if needed (currently using Tailwind's `md:` and `lg:`)
- [ ] Check that all animations work smoothly on mobile

## ✨ Final Touches

Before going live:
- [ ] Test all links (especially external ones)
- [ ] Check that all animations work
- [ ] Verify GitHub data loads correctly
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Check loading times
- [ ] Proofread all text content
- [ ] Make sure there are no console errors

## 🎊 You're Done!

Once everything is checked off:
1. Commit your changes
2. Push to GitHub
3. Wait for deployment
4. Share your awesome portfolio! 🚀

---

**Pro Tips:**
- Keep your GitHub profile updated - it's your portfolio's data source
- Commit regularly to show activity on GitHub
- Add good descriptions to all your projects
- Star interesting repos to show your interests
- Join the Lanyard Discord for live status updates
