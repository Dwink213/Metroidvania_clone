# Metroidvania Game - Build Overview

## What We're Building

A complete, playable Metroidvania game built with Phaser.js featuring:
- Browser-based (no installation required)
- 8 interconnected rooms
- Smooth player movement with special abilities
- Combat system (melee + ranged)
- 5 enemy types with unique AI
- Progression through ability unlocks
- Save/load system
- Complete UI/HUD
- Boss battle

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Game Engine | Phaser | 3.70.0 (CDN) |
| Language | JavaScript (ES6 modules) | Modern |
| Physics | Arcade Physics | Built-in |
| Display | HTML5 Canvas | 1280×720 |
| Storage | LocalStorage | Browser native |
| Target FPS | 60 FPS | Consistent |

## Success Criteria

When finished, the game must meet ALL these requirements:

### Basic Functionality
- [ ] `index.html` opens without errors
- [ ] Main menu displays with "New Game" button
- [ ] New Game starts in room_01 with player visible
- [ ] WASD keys move player smoothly
- [ ] Space bar makes player jump
- [ ] Shift key makes player dash (if ability unlocked)

### Core Systems
- [ ] Player can transition between rooms
- [ ] Enemies spawn and move
- [ ] Combat damages enemies
- [ ] Enemies can damage player
- [ ] Health bar decreases on damage
- [ ] Collecting ability unlocks it

### Progression
- [ ] Abilities enable new movement
- [ ] Doors check ability requirements
- [ ] Minimap shows current room
- [ ] Pause menu (ESC) works
- [ ] Map screen shows explored rooms

### Persistence
- [ ] Save game works (LocalStorage)
- [ ] Load game restores state
- [ ] Inventory shows unlocked abilities

### Polish
- [ ] Boss fight functional
- [ ] Visual effects present (shake, particles)
- [ ] Game runs at 60 FPS
- [ ] No console errors

### Documentation
- [ ] All test files pass
- [ ] README is complete
- [ ] Git history shows progress

**Total: 29 success criteria**

## Project Structure (To Be Created)

```
metroidvania-game/
├── index.html
├── README.md
├── .gitignore
├── src/
│   ├── main.js
│   ├── config.js
│   ├── EventBus.js
│   ├── player/       # 3 files
│   ├── combat/       # 5 files
│   ├── map/          # 5 files
│   ├── abilities/    # 5 files
│   ├── enemies/      # 8 files
│   ├── ui/           # 10 files
│   ├── effects/      # 3 files
│   └── scenes/       # 4 files
├── assets/
│   ├── images/       # Placeholder sprites
│   ├── audio/        # Console.log placeholders
│   └── data/         # JSON files (rooms, enemies, collectibles)
├── tests/            # 7 test files
└── docs/             # 3 documentation files
```

**Total Output:** ~50 files, ~2,900 lines of code

## Build Timeline

| Phase | Duration | Agent(s) |
|-------|----------|----------|
| 1. Initialization | 10 min | ORCHESTRATOR |
| 2. System Development | 60-90 min | 7 agents (parallel) |
| 3. Standards Validation | 15 min | STANDARDS-ENFORCEMENT |
| 4. Integration | 30 min | SCENE-INTEGRATION |
| 5. Testing | 30 min | TESTING-VALIDATION |
| 6. Verification | 15 min | ORCHESTRATOR |
| **Total** | **2.5-3 hours** | **11 agents** |

## Agent Coordination

See `MASTER_AGENT_CONFIG.md` for complete agent specifications.

### Build Flow
```
ORCHESTRATOR (init)
    ↓
7 System Agents (parallel)
    ↓
STANDARDS-ENFORCEMENT (validation)
    ↓
SCENE-INTEGRATION (wire systems)
    ↓
TESTING-VALIDATION (verify quality)
    ↓
ORCHESTRATOR (final verification)
```

## Core Architecture Principle

**Event-Driven Design:**
- All systems communicate via EventBus
- No tight coupling between systems
- Systems can be built in parallel
- Each system is independently testable

## Quality Metrics

- ✅ Zero tight coupling violations
- ✅ All files under 300 lines
- ✅ 100% test coverage on critical systems
- ✅ 60 FPS sustained
- ✅ No memory leaks
- ✅ All 29 success criteria met

## Next Steps

1. **ORCHESTRATOR** reads `01-project-init.md`
2. Initializes project structure
3. Broadcasts start signal to system agents
4. Monitors progress
5. Coordinates final verification
