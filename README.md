# Resume Quest - Interactive Resume Game

An engaging 2D platformer that transforms Isaiah Sam SD. Pascual's professional resume into an interactive gaming experience. Built with React, TypeScript, and HTML5 Canvas.

## About

Resume Quest is a production-ready web game featuring a story-driven tutorial, 6 unique levels, customizable cosmetics, and a final boss interview challenge. Players explore Isaiah's professional journey through engaging gameplay while collecting coins, unlocking achievements, and customizing their character.

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

## New Features (v2.0)

### Story & Tutorial
- **Intro Sequence**: Engaging story introduction with Guide NPC
- **Interactive Tutorial (Level 0)**: Learn controls through guided gameplay
  - Movement tutorial
  - Jump mechanics
  - Collectibles
  - NPC interactions
  - Pause and menu navigation

### Cosmetics System
- **Skins**: 6 color palettes for your character
- **Hats**: 8 hats including unlockable achievement rewards
- **Trails**: 4 particle trail effects
- **Shop**: Purchase cosmetics with earned coins
- **Unlockables**: Special items from completing levels and boss fight
  - Lab Goggles (Thesis Lab)
  - Scanner Visor (Shopee City)
  - QA Cape (Asurion QA Towers)
  - Leadership Crown (Leadership Castle)
  - Stethoscope Charm (NurseLink)
  - Golden Champion Skin (Beat Boss)

### Enhanced Controls
- **Fixed Jump Bug**: Jump now works reliably on keyboard (Space/W/Up) and touch
- **Pause System**: Working pause via ESC key or PAUSE button in HUD
- **Menu Button**: Always-accessible menu button with confirmation
- **Touch Controls**: Improved pointer event handling for mobile

### UI Improvements
- **Proper Z-Indexing**: UI elements no longer blocked by canvas
- **HUD Buttons**: Clickable PAUSE and MENU buttons
- **Better Touch Support**: Pointer capture prevents stuck inputs

## Game Features

### 7 Levels (Tutorial + 6 Main Levels)

0. **Tutorial Island** - Learn the controls and mechanics
1. **Education Plains** - De La Salle University journey
2. **Thesis Lab (GRASP)** - ML authentication system project
3. **Shopee City: Fraud Patrol** - Fraud detection internship
4. **Asurion QA Towers** - Test automation experience
5. **Leadership Castle** - Leadership roles
6. **NurseLink Network Docks** - Full-stack development

### Boss Fight: The Interview Dragon

A multi-phase nonviolent challenge featuring:
- **System Design** - Architectural decision-making
- **Debugging** - Code review and issue identification
- **Behavioral Questions** - Professional scenario responses

Earn badges: Impact, Scale, Reliability, Leadership

### Resume Summary

After completing all levels and the boss fight, view a comprehensive resume summary with:
- Full professional experience
- Technical skills overview
- Download PDF resume option
- Contact information
- Share link generation

## Controls

### Keyboard

- **Arrow Keys** or **A/D** - Move left/right
- **Space**, **W**, or **Up Arrow** - Jump
- **E** or **F** - Interact with NPCs, advance dialog
- **ESC** or **P** - Pause/Unpause game
- **Enter** - Select menu options

### Touch/Mobile

- **Left/Right Arrows** (bottom-left) - Movement
- **JUMP Button** (bottom-right) - Jump
- **TALK Button** (bottom-right) - Interact with NPCs
- **PAUSE Button** (top-right in HUD) - Pause game
- **MENU Button** (top-right in HUD) - Return to menu

## Pause System

The pause system now works correctly:

- **Keyboard**: Press ESC or P to pause/unpause
- **UI**: Click the PAUSE button in the HUD
- **When Paused**:
  - Game physics and updates freeze
  - Scene remains visible (static render)
  - Pause menu overlay appears
  - Can resume, adjust sound, copy share link, or quit to menu

## URL State Sharing

The game supports sharing progress via URL parameters. Progress is automatically encoded when you use the "Copy Share Link" feature.

### URL Format

```
https://your-domain.com/?lvl=6&xp=450&coins=275&completed=0,1,2,3,4,5,6&badges=Impact,Scale&skin=skin-default&hat=hat-crown&trail=trail-sparkle&intro=1&boss=1
```

### Parameters

- `lvl` - Highest level reached
- `xp` - Total experience points
- `coins` - Total coins collected
- `completed` - Comma-separated list of completed level IDs (0-6)
- `badges` - Comma-separated list of earned badges
- `powers` - Comma-separated list of unlocked power-ups
- `cosmetics` - Comma-separated list of owned cosmetics
- `skin` - Equipped skin ID
- `hat` - Equipped hat ID
- `trail` - Equipped trail ID
- `intro` - 1 if intro has been seen
- `boss` - 1 if boss is complete

### Example Share Links

**Fresh Start (Tutorial Complete):**
```
?lvl=1&xp=30&coins=30&completed=0&skin=skin-default&intro=1
```

**Mid-Game:**
```
?lvl=3&xp=175&coins=150&completed=0,1,2,3&cosmetics=skin-default,hat-goggles,trail-sparkle&skin=skin-default&hat=hat-goggles
```

**Complete:**
```
?lvl=6&xp=500&coins=300&completed=0,1,2,3,4,5,6&badges=Impact,Scale,Reliability,Leadership&cosmetics=skin-gold&skin=skin-gold&hat=hat-crown&boss=1
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

## Customizing Cosmetics

Cosmetics are defined in `src/data/cosmetics.ts`. To add new cosmetics:

1. Open `src/data/cosmetics.ts`
2. Add new entries to the `COSMETICS` array
3. Specify type (`skin`, `hat`, `trail`, `emote`)
4. Set cost in coins
5. Optionally add unlock requirements (level completion, boss, etc.)

Example:
```typescript
{
  id: "skin-custom",
  name: "My Custom Skin",
  type: "skin",
  cost: 100,
  colors: { primary: "#FF0000", secondary: "#00FF00" },
  description: "A unique look!",
}
```

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
│   │   ├── resume.ts           # Single source of truth for resume
│   │   └── cosmetics.ts        # Cosmetics definitions
│   ├── game/
│   │   ├── engine/
│   │   │   ├── types.ts        # TypeScript type definitions
│   │   │   ├── physics.ts      # Physics engine
│   │   │   ├── collision.ts    # Collision detection
│   │   │   ├── input.ts        # Input management (FIXED)
│   │   │   ├── audio.ts        # Sound effects
│   │   │   └── camera.ts       # Camera follow system
│   │   ├── entities/
│   │   │   ├── Player.ts       # Player entity
│   │   │   ├── NPC.ts          # NPC interactions
│   │   │   ├── Collectible.ts  # Collectibles
│   │   │   └── Platform.ts     # Platforms and backgrounds
│   │   ├── levels/
│   │   │   └── levelData.ts    # Tutorial + 6 level configurations
│   │   ├── scenes/
│   │   │   ├── Intro.tsx       # Story introduction (NEW)
│   │   │   ├── MainMenu.tsx    # Main menu
│   │   │   ├── Cosmetics.tsx   # Cosmetics shop (NEW)
│   │   │   ├── LevelSelect.tsx # Level selection
│   │   │   ├── GameLevel.tsx   # Core gameplay (FIXED)
│   │   │   ├── BossFight.tsx   # Boss encounter
│   │   │   └── ResumeSummary.tsx # Final summary
│   │   ├── components/
│   │   │   ├── HUD.tsx         # Heads-up display (FIXED)
│   │   │   ├── Dialog.tsx      # Dialog system
│   │   │   ├── TouchControls.tsx # Mobile controls (FIXED)
│   │   │   └── PauseMenu.tsx   # Pause menu
│   │   └── utils/
│   │       └── saveSystem.ts   # Save/load and URL state
│   ├── App.tsx                 # Main app component (UPDATED)
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles (FIXED z-index)
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
- Minimal bundle size (~215KB gzipped)

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Keyboard navigation throughout
- Working pause system (ESC or button)
- High contrast UI elements
- Sound can be toggled off
- Touch-friendly controls for mobile
- Clear visual feedback for interactions

## Bug Fixes (v2.0)

### Critical Fixes
1. **Jump Button Fixed**: Now works reliably on both keyboard and touch
   - Fixed edge-triggered input detection
   - Proper pointer event handling
   - No more stuck inputs

2. **Pause System Working**: Fully functional pause/unpause
   - ESC key toggles pause
   - PAUSE button in HUD
   - Game freezes correctly when paused
   - Menu remains interactive

3. **UI Layering Fixed**: Buttons are now clickable
   - Canvas set to `pointer-events: none`
   - Proper z-indexing
   - HUD and dialogs above canvas

4. **Menu Button Added**: Return to menu anytime
   - Confirmation dialog
   - Prevents accidental quits
   - Works in paused and unpaused states

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

**Version 2.0** - Now with working controls, cosmetics system, and story mode!
