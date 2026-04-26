# Download & Setup Instructions

## 📥 How to Download Your Portfolio

### Method 1: Download from Figma Make (Recommended)

1. **In Figma Make interface:**
   - Look for the "Download" or "Export" button
   - Click it to download all files as a ZIP

2. **Extract the ZIP file:**
   - Extract to a folder on your computer (e.g., `ashmeet-portfolio`)
   - Make sure all files are extracted properly

### Method 2: Copy Files Manually

If download isn't available, you can view and copy each file:

1. **Create a new folder** on your computer called `ashmeet-portfolio`

2. **Create the following folder structure:**
```
ashmeet-portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── advanced/
│   │   │   └── figma/
│   │   └── ui/
│   ├── imports/
│   └── styles/
├── public/
└── [config files]
```

3. **Copy each file** from the viewer to your local folder

## 🚀 Local Setup (After Download)

### Step 1: Install Node.js

If you don't have Node.js installed:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Install it on your computer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Dependencies

Open a terminal/command prompt in your portfolio folder and run:

```bash
# Using npm (comes with Node.js)
npm install

# OR using pnpm (faster, recommended)
npm install -g pnpm
pnpm install
```

This will install all required packages:
- React
- Three.js
- Motion (animations)
- Tailwind CSS
- And all other dependencies

### Step 3: Run Development Server

```bash
# Using npm
npm run dev

# OR using pnpm
pnpm dev
```

Your portfolio will open at: **http://localhost:5173**

### Step 4: Build for Production

When ready to deploy:

```bash
# Using npm
npm run build

# OR using pnpm
pnpm build
```

This creates a `dist` folder with optimized files ready for hosting.

## 🌐 Deployment Options

### Option 1: Vercel (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/ASHMEET555/portfolio
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy (automatic!)

Your portfolio will be live at: `your-name.vercel.app`

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://ashmeet555.github.io/portfolio"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Custom Hosting

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to your hosting provider:
   - Hostinger
   - GoDaddy
   - DigitalOcean
   - AWS S3
   - Any static hosting service

## 🛠️ Customization Guide

### Update Your Photo

Replace the Unsplash image URL in `/src/app/components/HeroSection.tsx` and `/src/app/components/AboutSection.tsx`:

```typescript
// Current (line ~59 in HeroSection.tsx)
src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop&crop=face"

// Replace with your photo URL
src="https://your-photo-url.com/photo.jpg"
```

### Add More Projects

Edit `/src/app/components/ProjectsSection.tsx`:

```typescript
const projects: Project[] = [
  // ... existing projects ...
  {
    id: 'new-project',
    title: 'New Project Title',
    category: 'ai-ml',
    description: 'Short description',
    longDescription: 'Full description',
    problem: 'What problem does it solve?',
    solution: 'How did you solve it?',
    setup: [
      'Step 1',
      'Step 2',
      // ...
    ],
    technologies: ['Tech1', 'Tech2'],
    image: 'https://unsplash.com/...',
    demoUrl: 'https://demo.com',
    githubUrl: 'https://github.com/...',
    status: 'completed',
    featured: true,
    metrics: {
      performance: 'Some metric',
      impact: 'Impact description',
      users: 'User count'
    },
    year: '2026'
  }
];
```

### Update Skills

Edit `/src/app/components/SkillsSection.tsx` to add/remove skills:

```typescript
const skillCategories = {
  'ai-ml': {
    title: "AI/ML & DATA SCIENCE",
    icon: "🧠",
    skills: [
      { name: "New Skill", level: 90, description: "Description" },
      // ...
    ]
  },
  // ...
};
```

### Change Colors

Edit `/src/styles/theme.css` to customize the cyberpunk theme:

```css
@theme {
  --color-cyberpunk-red: #ff0000;        /* Change this */
  --color-cyberpunk-dark: #0a0a0a;      /* Or this */
  --color-cyberpunk-text: #e0e0e0;      /* Text color */
  /* ... */
}
```

## 📱 Testing on Mobile

### Local Network Testing

1. **Find your local IP:**
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet "
   
   # On Windows
   ipconfig
   ```

2. **Access from phone:**
   - Make sure phone is on same WiFi
   - Go to: `http://YOUR-IP:5173`
   - Example: `http://192.168.1.100:5173`

### Use ngrok for Public URL

1. **Install ngrok:**
   - Download from [ngrok.com](https://ngrok.com)

2. **Run:**
   ```bash
   ngrok http 5173
   ```

3. **Share the ngrok URL** to test from anywhere

## ❓ Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
# Kill the process (Mac/Linux)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
# Check for TypeScript errors
npm run build

# Fix any errors shown in the output
```

### Images Not Loading

Make sure all image URLs are accessible or replace with local images:

1. Add images to `/public/images/`
2. Reference as `/images/your-image.jpg`

## 📞 Need Help?

- **Email**: sandhuashmeet40@gmail.com
- **GitHub**: [@ASHMEET555](https://github.com/ASHMEET555)

## 🎯 Quick Start Checklist

- [ ] Download/extract all files
- [ ] Install Node.js
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Customize content
- [ ] Build with `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Share your portfolio! 🚀

---

**Important Files to Know:**

- `/src/app/App.tsx` - Main app structure
- `/src/app/components/HeroSection.tsx` - Landing page
- `/src/app/components/ProjectsSection.tsx` - Projects showcase
- `/src/app/components/SkillsSection.tsx` - Your skills
- `/src/app/components/ContactSection.tsx` - Contact form
- `/src/styles/theme.css` - Color theme
- `/package.json` - Dependencies
- `/README.md` - Full documentation

Good luck with your portfolio! 🎉
