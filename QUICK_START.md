# ⚡ Quick Start Guide

Get your portfolio running in 5 minutes!

## 🎯 Before You Start

You'll need:
- [ ] A computer (Windows, Mac, or Linux)
- [ ] Internet connection
- [ ] That's it!

---

## 📥 Step 1: Download (30 seconds)

In Figma Make:
1. Look for a **"Download"** or **"Export"** button
2. Click it to download all files as a ZIP
3. Extract the ZIP to a folder on your computer
4. Name the folder: `ashmeet-portfolio`

---

## 💻 Step 2: Install Node.js (2 minutes)

### Don't have Node.js?

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS version** (big green button)
3. Install it (just click Next, Next, Finish)
4. Restart your terminal/command prompt

### Check if it's installed:

Open terminal (Mac) or Command Prompt (Windows) and type:

```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

**If you see version numbers, you're good!** ✅

---

## 📦 Step 3: Install Dependencies (1 minute)

Open terminal in your `ashmeet-portfolio` folder:

### On Mac:
- Right-click folder
- Click "New Terminal at Folder"

### On Windows:
- Open folder
- Type `cmd` in address bar
- Press Enter

### Then run:

```bash
npm install
```

This installs all required packages. It might take 1-2 minutes.

**You'll see a lot of text scrolling - that's normal!**

Wait for it to finish (you'll see the command prompt again).

---

## 🚀 Step 4: Run Your Portfolio (10 seconds)

In the same terminal, type:

```bash
npm run dev
```

You'll see something like:

```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Open your portfolio:

**Click the link** or go to your browser and type:

```
http://localhost:5173
```

**🎉 Your portfolio is now running!**

---

## ✨ What You Should See

Your portfolio with:
- ✅ Your name: Ashmeet Singh Sandhu
- ✅ Cyberpunk red/black theme
- ✅ 3D background effects
- ✅ Matrix code rain
- ✅ All 4 of your AI/ML projects
- ✅ Your skills and achievements
- ✅ Contact information

### Test It:

1. Scroll through all sections
2. Click on a project card
3. See the detailed project info
4. Click Skills categories
5. Check Contact section

**Everything working? Awesome!** 🎊

---

## 🛑 Troubleshooting

### "Command not found: npm"

**Solution:** Node.js isn't installed. Go back to Step 2.

### "Port 5173 already in use"

**Solution:** Another app is using that port.

```bash
# On Mac/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Or use a different port:
npm run dev -- --port 3000
```

### "Cannot find module"

**Solution:**

```bash
# Delete node_modules and reinstall:
rm -rf node_modules package-lock.json
npm install
```

### Build errors

**Solution:**

```bash
# Clear everything and start fresh:
npm run clean  # if available
npm install
npm run dev
```

### Still stuck?

Check the detailed guides:
- `DOWNLOAD_INSTRUCTIONS.md` - Full setup guide
- `README.md` - Complete documentation
- `PORTFOLIO_GUIDE.md` - Feature reference

---

## 🎨 Quick Customizations

### Add Your Photo

1. Open `/src/app/components/HeroSection.tsx`
2. Find line ~59 (the image URL)
3. Replace with your photo URL:

```typescript
src="https://your-photo-url.com/photo.jpg"
```

### Update LinkedIn URL

1. Open `/src/app/components/ContactSection.tsx`
2. Find "linkedin.com/in/"
3. Add your LinkedIn username:

```typescript
value: "linkedin.com/in/ashmeet-sandhu"
```

### Change Project Images

1. Open `/src/app/components/ProjectsSection.tsx`
2. Find the `projects` array
3. Replace `image:` URLs with your own

---

## 🌐 Deploy Online (3 minutes)

### Option 1: Vercel (Easiest!)

1. **Create GitHub account** (if you don't have one)
   - Go to [github.com](https://github.com)
   - Sign up

2. **Push your code to GitHub:**

```bash
git init
git add .
git commit -m "My portfolio"
git remote add origin https://github.com/ASHMEET555/portfolio.git
git push -u origin main
```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign up with GitHub"
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

**Done! Your portfolio is live!** 🌐

You'll get a URL like:
`https://your-portfolio.vercel.app`

### Option 2: Netlify

Same steps as Vercel, but:
- Use [netlify.com](https://netlify.com) instead
- Build command: `npm run build`
- Publish directory: `dist`

---

## 📋 5-Minute Checklist

Complete setup in order:

1. **Download** (30s)
   - [ ] Download ZIP from Figma Make
   - [ ] Extract to folder

2. **Install Node.js** (2min)
   - [ ] Download from nodejs.org
   - [ ] Install
   - [ ] Verify with `node --version`

3. **Install Dependencies** (1min)
   - [ ] Open terminal in folder
   - [ ] Run `npm install`
   - [ ] Wait for completion

4. **Run Portfolio** (10s)
   - [ ] Run `npm run dev`
   - [ ] Open http://localhost:5173
   - [ ] Browse your portfolio!

5. **Deploy** (3min) - Optional but recommended
   - [ ] Push to GitHub
   - [ ] Deploy on Vercel
   - [ ] Share your link!

**Total time: ~7 minutes** ⏱️

---

## 🎯 Next Steps

### Now What?

1. **Browse your portfolio locally**
   - Check all sections
   - Click all projects
   - Test on your phone

2. **Customize (optional)**
   - Add your photo
   - Update LinkedIn
   - Add project images

3. **Deploy online**
   - Follow Vercel guide above
   - Get your public URL

4. **Share everywhere!**
   - Add to resume
   - Share on LinkedIn
   - Add to GitHub profile
   - Use in job applications

---

## 💡 Quick Tips

### Development Mode (Local)

```bash
# Start dev server:
npm run dev

# Stop server:
Press Ctrl+C in terminal
```

### Build for Production

```bash
# Create optimized build:
npm run build

# Preview production build:
npm run preview
```

### Update Content

All content is in `/src/app/components/`:
- `HeroSection.tsx` - Landing page
- `AboutSection.tsx` - About & experience
- `ProjectsSection.tsx` - Your projects
- `SkillsSection.tsx` - Skills
- `ContactSection.tsx` - Contact info

---

## 📚 Learn More

Want to understand more or customize?

**Read these files in order:**

1. **This file** (QUICK_START.md) - ✅ You're here!
2. `PORTFOLIO_SUMMARY.md` - What's been built
3. `PORTFOLIO_GUIDE.md` - Feature reference
4. `DEPLOYMENT_GUIDE.md` - How to deploy
5. `README.md` - Full documentation

---

## 🎉 You're All Set!

Your professional portfolio is ready to impress recruiters, colleagues, and the world!

### Your Portfolio Includes:

- ✅ Stunning cyberpunk design
- ✅ All your projects with full details
- ✅ Your skills and achievements
- ✅ Competitive programming stats
- ✅ Contact information
- ✅ Responsive design
- ✅ Fast loading
- ✅ Production ready!

### Share Your Portfolio:

Once deployed, add your portfolio URL to:
- Resume
- LinkedIn
- GitHub profile
- Email signature
- Job applications

---

## 📞 Need Help?

1. **Check troubleshooting section above** ☝️
2. **Read the detailed guides** 📖
3. **Google specific error messages** 🔍
4. **Check your email** for support ✉️

---

## 🚀 Let's Go!

**Ready to get started?**

1. Download the files ⬇️
2. Follow Steps 1-4 above ✅
3. See your portfolio running! 🎉
4. Deploy it online 🌐
5. Share with the world! 🌟

**Your AI/ML career journey starts with a great portfolio!**

Good luck! 🎯
