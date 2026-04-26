# Ashmeet Singh Sandhu - AI Engineer Portfolio

A futuristic cyberpunk-themed portfolio website showcasing AI/ML projects, research, and skills.

## 🚀 Features

- **Cyberpunk Aesthetic**: Red and black color scheme with holographic effects
- **Advanced Animations**: Smooth scroll animations, Three.js backgrounds, and interactive elements
- **AI/ML Project Showcase**: Detailed project pages with problem statements, solutions, and setup instructions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation, screen reader support, and performance optimizations
- **Performance Optimized**: Lazy loading, code splitting, and reduced motion support

## 📋 Projects Included

1. **MediNodus - Medical AI**: Privacy-first medical assistant with 4B-parameter vision-language model
2. **FlashPoint**: Real-time intelligence platform with Live RAG system
3. **ChainAudit AI**: Blockchain-based fraud detection with on-chain audit trails
4. **Emergency Triage**: Risk stratification system for emergency departments

## 🛠️ Technologies Used

### Frontend
- React 18.3.1
- Motion (Framer Motion) 12.23.24
- Three.js for 3D effects
- Tailwind CSS 4.1.12
- TypeScript

### Libraries & Tools
- Lucide React (icons)
- Radix UI components
- React Router for navigation
- Vite for building

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or newer
- npm or pnpm package manager

### Installation

1. **Download all files from Figma Make**
   - Click the download button in Figma Make
   - Save all files to a local directory

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## 📁 Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx         # Landing section
│   │   │   ├── AboutSection.tsx        # About & experience
│   │   │   ├── ProjectsSection.tsx     # AI/ML projects
│   │   │   ├── SkillsSection.tsx       # Technical skills
│   │   │   ├── ContactSection.tsx      # Contact form
│   │   │   ├── Navigation.tsx          # Navigation bar
│   │   │   ├── ThreeDBackground.tsx    # Three.js effects
│   │   │   └── advanced/
│   │   │       ├── CodeRain.tsx        # Matrix rain effect
│   │   │       ├── HolographicCard.tsx # Card component
│   │   │       └── ...
│   │   └── App.tsx                     # Main app component
│   ├── imports/                        # Images & assets
│   └── styles/
│       ├── theme.css                   # Cyberpunk theme
│       └── fonts.css                   # Font imports
├── package.json
└── README.md
```

## 🎨 Customization

### Update Personal Information

All personal information is already updated from your resume:

- **Name**: Ashmeet Singh Sandhu
- **Email**: sandhuashmeet40@gmail.com
- **Phone**: +91 7357124419
- **GitHub**: github.com/ASHMEET555
- **LinkedIn**: linkedin.com/in/

### Add New Projects

Edit `/src/app/components/ProjectsSection.tsx` and add to the `projects` array:

```typescript
{
  id: 'your-project-id',
  title: 'Project Title',
  category: 'ai-ml',
  description: 'Short description',
  longDescription: 'Detailed description',
  problem: 'Problem statement',
  solution: 'Your solution',
  setup: ['Step 1', 'Step 2', ...],
  technologies: ['Tech1', 'Tech2', ...],
  image: 'https://...',
  demoUrl: 'https://...',
  githubUrl: 'https://...',
  status: 'completed',
  featured: true,
  metrics: { ... },
  year: '2026'
}
```

### Update Skills

Edit `/src/app/components/SkillsSection.tsx` in the `skillCategories` object.

### Change Theme Colors

Edit `/src/styles/theme.css` to customize the cyberpunk color scheme.

## 🎯 Key Features

### Project Detail Modal
Click any project card to see:
- Complete project overview
- Problem statement
- Solution approach
- Setup instructions (step-by-step)
- Technologies used
- Performance metrics
- Demo and GitHub links

### Accessibility
- Keyboard shortcuts: `Alt + Shift + [H/A/P/S/C]` for quick navigation
- Screen reader support
- Reduced motion support
- Focus indicators

### Performance
- Code splitting and lazy loading
- Optimized images
- Minimal JavaScript bundle
- Fast initial load time

## 📱 Contact Information

- **Email**: sandhuashmeet40@gmail.com
- **Phone**: +91 7357124419
- **GitHub**: [github.com/ASHMEET555](https://github.com/ASHMEET555)
- **LinkedIn**: [linkedin.com/in/](https://linkedin.com/in/)

## 📝 Resume Highlights

- **Education**: B.Tech CSE @ IIIT Una (CGPA: 8.87)
- **Experience**: Research Intern @ IIT Mandi
- **Competitive Programming**: 
  - 4-Star CodeChef
  - Codeforces Specialist (1472)
  - 800+ problems solved
  - AIR 720 ICPC
  - TechOlympics 2025 Global Rank 11 (India Rank 1)

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist` folder to your hosting provider

## 🔧 Environment Variables

No environment variables required for basic functionality. The portfolio works completely offline.

## 🤝 Support

For questions or issues, contact:
- Email: sandhuashmeet40@gmail.com
- GitHub: [@ASHMEET555](https://github.com/ASHMEET555)

## 📄 License

All rights reserved © 2026 Ashmeet Singh Sandhu

---

Built with ❤️ using React, Three.js, and modern web technologies
