# Resume Quest - Interactive Resume Game

An engaging 2D platformer that transforms Isaiah Sam SD. Pascual's professional resume into an interactive gaming experience. Built with React, TypeScript, and HTML5 Canvas.

## About

Resume Quest is a production-ready web game where players journey through 6 levels and a final boss fight, each representing different aspects of Isaiah's professional experience, education, and skills. The game features URL-based progress sharing, responsive design, touch controls, and accessibility features.

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Game Features

### 6 Unique Levels

1. **Education Plains** - Journey through Isaiah's academic background at De La Salle University
2. **Thesis Lab (GRASP)** - Experience the machine learning authentication system project
3. **Shopee City: Fraud Patrol** - Explore fraud detection and data processing achievements
4. **Asurion QA Towers** - Climb through test automation and quality assurance milestones
5. **Leadership Castle** - Navigate leadership roles and team management experiences
6. **NurseLink Network Docks** - Complete the full-stack development journey

### Boss Fight: The Interview Dragon

A multi-phase challenge featuring:
- **System Design** - Architectural decision-making
- **Debugging** - Code review and issue identification
- **Behavioral Questions** - Professional scenario responses

Earn badges: Impact, Scale, Reliability, Leadership

### Resume Summary

After completing all levels and the boss fight, view a comprehensive resume summary with:
- Full professional experience breakdown
- Technical skills overview
- Download PDF resume option
- Contact information
- Share link generation

## Controls

### Keyboard

- **Arrow Keys** or **WASD** - Move left/right, navigate menus
- **Space** - Jump
- **E** or **F** - Interact with NPCs, advance dialog
- **ESC** or **P** - Pause game
- **Enter** - Select menu options

### Touch (Mobile/Tablet)

- **D-Pad** (bottom-left) - Movement controls
- **Jump Button** (bottom-right) - Jump
- **E Button** (bottom-right) - Interact
- **Pause Button** (top-right) - Pause

## URL State Sharing

The game supports sharing progress via URL parameters. Progress is automatically encoded when you use the "Copy Share Link" feature.

### URL Format

```
https://your-domain.com/?lvl=6&xp=450&coins=275&completed=1,2,3,4,5,6&badges=Impact,Scale&powers=TypeScript,React
```

### Parameters

- `lvl` - Highest level reached
- `xp` - Total experience points
- `coins` - Total coins collected
- `completed` - Comma-separated list of completed level IDs
- `badges` - Comma-separated list of earned badges
- `powers` - Comma-separated list of unlocked power-ups

### Example Share Links

**Just started:**
```
?lvl=1&xp=50&coins=50&completed=1
```

**Mid-game:**
```
?lvl=3&xp=175&coins=150&completed=1,2,3&powers=TypeScript
```

**Complete:**
```
?lvl=6&xp=450&coins=300&completed=1,2,3,4,5,6&badges=Impact,Scale,Reliability,Leadership&powers=TypeScript,React,Python
```

When someone opens a URL with game state:
1. They'll see a prompt asking if they want to load the shared progress
2. They can choose to load it or use their local save
3. The loaded progress will sync to their localStorage

## Customizing Resume Content

All resume content is centralized in `src/data/resume.ts`. To update with your own information:

1. Open `src/data/resume.ts`
2. Update the following sections:
   - `PERSONAL_INFO` - Name, location, email, phone
   - `EDUCATION` - University, degree, GPA, dates
   - `THESIS` - Research project details
   - `WORK_EXPERIENCE` - Internships and jobs
   - `LEADERSHIP_EXPERIENCE` - Leadership roles
   - `PROJECT_EXPERIENCE` - Personal projects
   - `SKILLS` - Technical skills by category

The game automatically pulls from this single source of truth for all in-game content, NPC dialogs, collectibles, and the final resume summary.

## Deployment

### Vercel

```bash
npm run build
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

Or use the Netlify CLI or drag-and-drop the `dist` folder.

### GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Ensure `base` in `vite.config.ts` matches your repo name if needed

## Project Structure

```
resume-game/
├── public/
│   └── Resume.pdf              # PDF version of resume
├── src/
│   ├── data/
│   │   └── resume.ts           # Single source of truth for resume content
│   ├── game/
│   │   ├── engine/
│   │   │   ├── types.ts        # TypeScript type definitions
│   │   │   ├── physics.ts      # Physics engine
│   │   │   ├── collision.ts    # Collision detection
│   │   │   ├── input.ts        # Input management
│   │   │   ├── audio.ts        # Sound effects
│   │   │   └── camera.ts       # Camera follow system
│   │   ├── entities/
│   │   │   ├── Player.ts       # Player entity
│   │   │   ├── NPC.ts          # NPC interactions
│   │   │   ├── Collectible.ts  # Collectibles
│   │   │   └── Platform.ts     # Platforms and backgrounds
│   │   ├── levels/
│   │   │   └── levelData.ts    # All 6 level configurations
│   │   ├── scenes/
│   │   │   ├── MainMenu.tsx    # Main menu
│   │   │   ├── LevelSelect.tsx # Level selection
│   │   │   ├── GameLevel.tsx   # Core gameplay
│   │   │   ├── BossFight.tsx   # Boss encounter
│   │   │   └── ResumeSummary.tsx # Final summary
│   │   ├── components/
│   │   │   ├── HUD.tsx         # Heads-up display
│   │   │   ├── Dialog.tsx      # Dialog system
│   │   │   ├── TouchControls.tsx # Mobile controls
│   │   │   └── PauseMenu.tsx   # Pause menu
│   │   └── utils/
│   │       └── saveSystem.ts   # Save/load and URL state
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Technical Details

### Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **HTML5 Canvas** - Rendering
- **WebAudio API** - Sound effects

### Performance

- Targets 60 FPS on modern browsers
- Optimized canvas rendering
- Efficient collision detection
- Minimal bundle size (no heavy dependencies)

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Keyboard navigation throughout
- Remappable controls (via input manager)
- High contrast UI elements
- Sound can be toggled off
- Touch-friendly controls for mobile

## Credits

**Developer:** Isaiah Sam SD. Pascual

**Technologies:** React, TypeScript, Vite, HTML5 Canvas, WebAudio API

**Game Design:** Original 2D platformer mechanics with resume integration

**Assets:** All original programmatic art (no copyrighted assets)

## License

This project is a personal resume/portfolio piece. Feel free to use the code structure as inspiration for your own interactive resume projects.

## Contact

- **Email:** isaiah_sam_pascual@dlsu.edu.ph
- **Phone:** + 63 976 407 6762
- **Location:** Quezon City, Philippines

---

Built with care to showcase professional experience in an engaging, interactive format.