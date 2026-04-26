# Complete Deployment Guide

## 🌐 How to Deploy Your Portfolio Online

This guide will help you get your portfolio live on the internet for free!

## Option 1: Vercel (Recommended - Easiest & Best)

Vercel is perfect for React apps and offers:
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ Custom domain support
- ✅ SSL certificate (https://)
- ✅ Fast global CDN

### Step-by-Step:

#### 1. Create GitHub Repository

```bash
# In your portfolio folder, open terminal:

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Create repository on GitHub (go to github.com)
# Then connect it:
git remote add origin https://github.com/ASHMEET555/portfolio.git
git branch -M main
git push -u origin main
```

#### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and use GitHub to sign in
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**That's it!** Your portfolio will be live at:
`https://your-portfolio-name.vercel.app`

#### 3. Custom Domain (Optional)

If you own a domain (yourname.com):
1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Option 2: Netlify (Also Very Easy)

Netlify is another great option with similar features.

### Step-by-Step:

#### 1. Push to GitHub (Same as above)

#### 2. Deploy on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Choose your repository
5. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Your site will be live at:
`https://random-name.netlify.app`

You can change this to:
`https://ashmeet-sandhu.netlify.app`

---

## Option 3: GitHub Pages (Free Forever)

Perfect if you want a github.io URL.

### Step-by-Step:

#### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### 2. Update package.json

Add these lines to your `package.json`:

```json
{
  "homepage": "https://ASHMEET555.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 3. Update vite.config.ts

Add base path:

```typescript
export default defineConfig({
  base: '/portfolio/',
  // ... rest of config
});
```

#### 4. Deploy

```bash
npm run deploy
```

Your portfolio will be live at:
`https://ASHMEET555.github.io/portfolio`

---

## Option 4: Cloudflare Pages

Fast and free with global CDN.

### Step-by-Step:

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up and connect GitHub
3. Select your repository
4. **Build settings:**
   - Build command: `npm run build`
   - Build output: `dist`
5. Deploy!

---

## Option 5: Firebase Hosting

Google's hosting solution.

### Step-by-Step:

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login and Initialize

```bash
firebase login
firebase init hosting
```

Choose:
- Use existing project or create new
- Public directory: `dist`
- Single page app: `Yes`

#### 3. Build and Deploy

```bash
npm run build
firebase deploy
```

---

## 🎯 Which Option to Choose?

### For Beginners: **Vercel** ⭐
- Easiest setup
- Best performance
- Auto-deploys on git push
- Free SSL
- Best for React apps

### For Custom Domain: **Netlify** or **Vercel**
- Both support custom domains
- Both have free SSL
- Both auto-deploy

### For GitHub Portfolio: **GitHub Pages**
- Nice github.io URL
- Good for showcasing
- Free forever

### For Global Speed: **Cloudflare Pages**
- Fastest CDN
- Great for worldwide audience

---

## 📱 After Deployment

### Test Your Live Site

1. **Check all pages:**
   - Home section
   - About section
   - Projects (click each one)
   - Skills section
   - Contact section

2. **Test on mobile:**
   - Open on your phone
   - Check responsiveness
   - Test navigation

3. **Check performance:**
   - Open browser DevTools
   - Check Lighthouse score
   - Aim for 90+ performance

### Share Your Portfolio

Add your portfolio link to:
- ✅ Resume (add URL)
- ✅ LinkedIn (in contact info)
- ✅ GitHub profile README
- ✅ Email signature
- ✅ Business cards
- ✅ College applications
- ✅ Job applications

---

## 🔧 Common Issues & Solutions

### Build Fails

**Issue:** Build command fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading

**Issue:** Images show broken on deployed site

**Solution:**
- Check image URLs are absolute (https://...)
- Or add images to `/public` folder
- Reference as `/images/photo.jpg`

### 404 on Refresh

**Issue:** Page shows 404 when refreshed

**Solution:**
Add a redirect rule (platform-specific):

**Netlify:** Create `public/_redirects`:
```
/* /index.html 200
```

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Slow Loading

**Issue:** Site loads slowly

**Solution:**
- Images are optimized? Use smaller sizes
- Check Lighthouse report
- Enable gzip compression (automatic on Vercel/Netlify)

---

## 🎯 Automatic Deployments

Set up automatic deployments so your site updates when you push to GitHub:

### Vercel/Netlify (Automatic!)
- Just push to GitHub
- Site auto-updates
- No extra setup needed!

### GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - run: npm install
    - run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## 📊 Monitor Your Portfolio

### Analytics (Optional)

Add Google Analytics:

1. Get tracking ID from analytics.google.com
2. Add to `/index.html` in `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🌟 Optimization Tips

### Before Deploying:

1. **Test build locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check file sizes:**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

3. **Optimize images:**
   - Use WebP format
   - Compress images
   - Max size: 100-200KB each

4. **Check performance:**
   - Run Lighthouse in Chrome DevTools
   - Aim for 90+ scores

---

## 🎉 Success Checklist

Before sharing your portfolio:

- [ ] Deployed successfully
- [ ] All sections load correctly
- [ ] Projects open in modals
- [ ] Contact links work
- [ ] Responsive on mobile
- [ ] Fast loading (< 3 seconds)
- [ ] No console errors
- [ ] Images load properly
- [ ] Animations work smoothly
- [ ] Contact info is correct

---

## 📞 Deployment Support

If you face issues:

1. **Check the platform docs:**
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com)
   - [GitHub Pages Docs](https://docs.github.com/en/pages)

2. **Check build logs:**
   - Look for error messages
   - Google the specific error

3. **Common fixes:**
   ```bash
   # Clear and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Clear build cache
   rm -rf dist
   npm run build
   
   # Update dependencies
   npm update
   ```

---

## 🚀 After Your Portfolio is Live

### Update Your Resume

Add your portfolio link prominently:

```
ASHMEET SINGH SANDHU
Email: sandhuashmeet40@gmail.com
Portfolio: https://ashmeet-sandhu.vercel.app ← Add this!
GitHub: github.com/ASHMEET555
```

### Add to LinkedIn

1. Go to your LinkedIn profile
2. Edit contact info
3. Add portfolio URL in "Website" field

### Add to GitHub Profile

Create a README in your profile repository:

```markdown
# Hi, I'm Ashmeet! 👋

🔗 **Portfolio:** https://ashmeet-sandhu.vercel.app
🔬 Research Intern @ IIT Mandi
🎓 B.Tech CSE @ IIIT Una (CGPA: 8.87)
```

---

## 🎯 Final Tips

1. **Keep it updated:** Add new projects regularly
2. **Monitor performance:** Check speed monthly
3. **Track visitors:** Use analytics (optional)
4. **Get feedback:** Share with friends/mentors
5. **Iterate:** Improve based on feedback

---

## 🌐 Your Portfolio URLs

After deployment, you'll have a link like:

- Vercel: `https://ashmeet-portfolio.vercel.app`
- Netlify: `https://ashmeet-sandhu.netlify.app`
- GitHub Pages: `https://ASHMEET555.github.io/portfolio`

**Share it everywhere!** 🎉

---

**Ready to deploy?** Start with Vercel - it's the easiest! 🚀
