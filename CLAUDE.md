# CLAUDE.md - AI Assistant Guide for Metroidvania Clone Repository

## Repository Overview

**Repository Purpose:** Build Specification & Master Prompt Document
**Current State:** Contains autonomous build instructions for creating a complete Metroidvania game
**Primary File:** `METROIDVANIA_BUILD_PACKAGE.md` (1596 lines)
**Target Output:** Fully playable browser-based Metroidvania game using Phaser.js

### What This Repository Is

This is a **build specification repository** containing a comprehensive master prompt designed for Claude Code to autonomously build a complete, playable Metroidvania game from scratch in 2-6 hours. It is NOT an existing game codebase - it's the blueprint for creating one.

### What This Repository Is NOT

- ❌ An existing game with source code
- ❌ A game engine or framework
- ❌ A library or module
- ❌ A work-in-progress game

## Repository Structure (Current State)

```
/home/user/Metroidvania_clone/
├── .git/                                    # Git repository
├── METROIDVANIA_BUILD_PACKAGE.md            # Complete build specification (48KB)
└── CLAUDE.md                                # This file (AI assistant guide)
```

## Understanding the Build Specification

### The Master Prompt Document

`METROIDVANIA_BUILD_PACKAGE.md` contains:

1. **README Section** - User-facing instructions for running the build
2. **Master Prompt** - Comprehensive autonomous build instructions (lines 140-1546)
3. **6 Build Phases** with detailed implementation specs:
   - Phase 1: Project Initialization (10 min)
   - Phase 2: Core Systems (90-120 min)
   - Phase 3: Integration (90-120 min)
   - Phase 4: Content & Data (60 min)
   - Phase 5: Testing & Polish (60 min)
   - Phase 6: Documentation (30 min)

### Target Game Specifications

When built, the game will have:

**Technology Stack:**
- Game Engine: Phaser 3.70.0 (CDN-loaded)
- Language: Vanilla JavaScript (ES6 modules)
- Display: 1280×720 resolution, 60 FPS target
- Physics: Arcade Physics (built-in to Phaser)
- Storage: LocalStorage (browser-native)
- No build tools required (webpack, babel, etc.)

**Game Features:**
- 8 interconnected rooms with smooth transitions
- Player movement: run, jump, dash, wall jump, double jump, glide
- 5 enemy types with unique AI behaviors
- Combat system (melee + ranged attacks)
- 8 unlockable abilities for progression gating
- Save/load system using LocalStorage
- Complete UI (HUD, minimap, pause menu, inventory)
- Boss battle with multiple phases
- Visual effects (particles, screen shake, damage numbers)

**Project Structure (To Be Created):**
```
metroidvania-game/
├── index.html
├── README.md
├── .gitignore
├── src/
│   ├── main.js
│   ├── config.js
│   ├── EventBus.js
│   ├── player/       # PlayerController, InputManager, PhysicsConstants
│   ├── combat/       # CombatController, HealthComponent, Projectile
│   ├── map/          # MapManager, RoomData, RoomTransition, DoorController
│   ├── abilities/    # AbilityManager, SaveManager, Collectible
│   ├── enemies/      # 5 enemy types + EnemyBase, EnemySpawner
│   ├── ui/           # HUD, menus, notifications
│   ├── effects/      # Particles, camera, screen effects
│   └── scenes/       # BootScene, MainMenuScene, GameScene, GameOverScene
├── assets/
│   ├── images/       # Placeholder sprites (colored rectangles)
│   ├── audio/        # Placeholder (console.log for SFX)
│   └── data/         # rooms.json, enemies.json, collectibles.json
├── tests/            # 7 test files for different systems
└── docs/             # ARCHITECTURE.md, CONTROLS.md, BUILD-LOG.md
```

## Key Technical Concepts

### 1. Event-Driven Architecture

All systems communicate through a central **EventBus** (pub/sub pattern):

```javascript
EventBus.emit('player:jumped', { position: {x, y} });
EventBus.on('player:damaged', handleDamage);
```

**Event Naming Convention:** `[entity]:[action]`

Examples:
- `player:jumped`, `player:landed`, `player:damaged`, `player:dashed`
- `enemy:hit`, `enemy:defeated`
- `ability:unlocked`
- `room:changed`
- `menu:pause`

### 2. Physics Constants

All movement tuning values are centralized:

```javascript
// From PhysicsConstants.js
MOVE_SPEED: 200          // px/s horizontal speed
ACCELERATION: 1200       // px/s² acceleration
JUMP_VELOCITY: -500      // px/s upward jump
DASH_SPEED: 400          // px/s dash velocity
COYOTE_TIME: 0.1         // Seconds to jump after leaving platform
JUMP_BUFFER: 0.1         // Seconds to buffer jump input
```

### 3. Game Systems (6 Major Components)

| System | Files | Purpose |
|--------|-------|---------|
| **Player** | PlayerController, InputManager, PhysicsConstants | Movement, input, state |
| **Combat** | CombatController, HealthComponent, Projectile | Damage, attacks, health |
| **Map** | MapManager, RoomData, DoorController, Minimap | Rooms, transitions, gates |
| **Abilities** | AbilityManager, SaveManager, Collectible | Unlocks, progression, save |
| **Enemies** | EnemyBase + 5 types, EnemySpawner, AIBehaviors | AI, spawning, behaviors |
| **UI** | HUDController + 9 UI components | Menus, HUD, notifications |

### 4. Room Graph Structure

```
      [03-Locked]
           |
[05]---[01-Start]---[02]---[04]
                      |
                    [06]
                      |
              [07]--[08-Boss]
```

- Room 01: Starting Chamber (safe)
- Room 05: Requires "dash" ability
- Room 03: Requires "key_01" item
- Room 06: Requires "doubleJump" ability
- Room 07: Requires advanced abilities
- Room 08: Boss battle

### 5. Save Data Structure

```json
{
  "version": "1.0.0",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "playerHealth": 100,
  "currentRoom": "room_01",
  "abilities": ["dash", "doubleJump"],
  "exploredRooms": ["room_01", "room_02"],
  "defeatedEnemies": ["enemy_001", "enemy_002"],
  "collectibles": ["health_upgrade_01"]
}
```

Stored in browser LocalStorage at key: `metroidvania_save`

## Coding Conventions & Patterns

### Naming Conventions

**Classes:**
- PascalCase: `PlayerController`, `CombatSystem`, `EnemyPatroller`
- Role suffixes: `-Controller`, `-Manager`, `-System`, `-Component`

**Methods:**
- camelCase: `getPosition()`, `takeDamage()`, `unlockAbility()`
- Getters: `getX()`, `getHealth()`, `getFacing()`
- Event handlers: `handlePlayerCollision()`, `handleRoomChange()`
- Boolean checks: `isGrounded()`, `canJump()`, `isInvincible()`

**Properties:**
- camelCase: `currentRoom`, `playerHealth`, `isDashing`
- Boolean prefixes: `is*`, `has*`, `can*`: `isWallSliding`, `hasAbility`, `canDoubleJump`
- Constants: UPPER_SNAKE_CASE: `MOVE_SPEED`, `JUMP_VELOCITY`, `MAX_FALL_SPEED`

### File Organization Pattern

Each system follows this structure:
```
system_name/
├── SystemController.js    # Main orchestrator
├── Component1.js           # Specific functionality
├── Component2.js           # Specific functionality
└── Constants.js            # Configuration values
```

### Code Style

- **ES6 Modules:** `import`/`export` syntax
- **Class-based OOP:** ES6 class syntax
- **Arrow functions:** For callbacks and short functions
- **Destructuring:** For object properties
- **Template literals:** For strings with interpolation
- **Const/let:** No `var` usage

Example:
```javascript
import EventBus from '../EventBus.js';

export default class PlayerController {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.add.rectangle(x, y, 32, 32, 0x4488ff);
    }

    update(delta, input) {
        const dt = delta / 1000;  // Convert to seconds
        // ...
    }
}
```

## Development Workflows

### Git Workflow (Specified)

The build specification includes regular git commits:

```bash
# Phase 1
git init
git commit -m "Initial commit"
git commit -m "Project structure and initialization"

# Phase 2 (after each system)
git commit -m "Player controller complete"
git commit -m "Combat system complete"
git commit -m "Map system complete"
git commit -m "Ability system complete"
git commit -m "Enemy system complete"
git commit -m "UI system complete"

# Phase 3
git commit -m "Full game integration complete"

# Phase 4
git commit -m "Game content and test suite complete"

# Phase 5
git commit -m "Polish and performance optimization complete"

# Phase 6
git commit -m "Documentation complete - BUILD FINISHED"
```

### Testing Strategy

7 separate test files are specified:

1. `test-player.html` - Player movement, jumping, dashing
2. `test-combat.html` - Damage, melee, ranged attacks
3. `test-map.html` - Room transitions, door logic
4. `test-abilities.html` - Ability unlocks, progression gates
5. `test-enemies.html` - Enemy AI, spawning, behaviors
6. `test-ui.html` - All menus, HUD, notifications
7. `integration-test.html` - Full game integration

### Performance Requirements

- **Target FPS:** 60 FPS consistent
- **Memory:** Stable (no leaks)
- **Display:** 1280×720 resolution
- **Physics:** Arcade physics (lightweight)
- **Asset loading:** Minimal (placeholder graphics)

## Working with This Repository

### If Asked to Execute the Build

**Option 1: Execute the Master Prompt**
1. Read lines 140-1546 of `METROIDVANIA_BUILD_PACKAGE.md`
2. Follow the 6-phase build plan exactly
3. Create all 50+ files as specified
4. Commit regularly as instructed
5. Run all tests before declaring completion

**Option 2: Selective Implementation**
If asked to build specific systems:
1. Reference the relevant phase section
2. Follow the code examples provided
3. Maintain event-driven architecture
4. Use specified naming conventions

### If Asked to Modify the Build Spec

**When editing `METROIDVANIA_BUILD_PACKAGE.md`:**
- Maintain the 6-phase structure
- Keep code examples complete and runnable
- Update completion checklist if adding features
- Preserve the autonomous execution principle
- Update estimated timings if changing scope

### If Asked to Analyze or Explain

**Key sections to reference:**

| Question Type | Reference Section |
|---------------|-------------------|
| "What is this repo?" | Lines 1-137 (README section) |
| "How does the player move?" | Lines 376-689 (PlayerController code) |
| "What's the room structure?" | Lines 707-719 (room graph diagram) |
| "How does combat work?" | Lines 694-702 (combat system spec) |
| "What abilities exist?" | Lines 720-746 (ability system) |
| "How are enemies designed?" | Lines 748-814 (enemy system) |
| "What's the event system?" | Lines 316-345 (EventBus code) |
| "How does save/load work?" | Lines 725-746 (save data format) |

## Key Architecture Insights for AI Assistants

### 1. Integration Hub: GameScene.js

The main gameplay scene (lines 862-1030) is the **integration hub** that wires all systems together:

```
InputManager ────┐
                 ├──> PlayerController ───┐
                                          ├──> EventBus ──┐
MapManager ──────┤                                       │
                 ├──> CombatController ──┼───────────────> HUDController
                                         │
EnemySpawner ────┤                       │
                 ├──> AbilityManager ────┤
                 │
CameraController─┤
                 ├──> ParticleManager
```

### 2. Event Flow Pattern

```
Player Input
    ↓
PlayerController.update()
    ↓
EventBus.emit('player:jumped', data)
    ↓
Multiple Listeners:
├→ CombatController (enable aerial attacks)
├→ HUDController (update display)
├→ ParticleManager (spawn dust particles)
└→ CameraController (subtle screen movement)
```

### 3. Ability Gate System

```
Player encounters door
    ↓
DoorController checks door.requires ("dash")
    ↓
Check player.abilities["dash"]
    ↓
If false: block passage, show notification
If true: allow room transition
    ↓
Player collects ability item
    ↓
AbilityManager.unlockAbility("dash")
    ↓
EventBus.emit('ability:unlocked', { id: "dash" })
    ↓
PlayerController.unlockAbility("dash")
    ↓
New movement enabled, gate opens
```

### 4. Physics Grace Mechanics

**Coyote Time:** Allows jumping for 0.1s (6 frames @ 60fps) after leaving a platform
- Makes platforming more forgiving
- Prevents frustrating edge-case fails

**Jump Buffer:** Queues jump input for 0.1s before landing
- Allows pressing jump slightly early
- Makes controls feel more responsive

These are CRITICAL for good platformer feel - don't remove them.

## Common Pitfalls & Gotchas

### 1. This is NOT Executable Code

The repository contains **specifications**, not actual game code. If asked to "run the game," clarify that the game must first be built by executing the master prompt.

### 2. Phaser CDN Dependency

The game relies on Phaser 3.70.0 from CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
```

No local Phaser installation exists - it's loaded at runtime.

### 3. Placeholder Assets

All visual assets are **simple colored rectangles**:
- Player: Blue rectangle (32×32)
- Enemies: Colored rectangles (red, purple, green, yellow, orange)
- Tiles: Brown/gray rectangles

No actual sprite sheets exist - they would be generated during build.

### 4. Audio Placeholders

All sound effects are **console.log** statements:
```javascript
console.log('SFX: jump');
console.log('SFX: dash');
```

No actual audio files exist.

### 5. LocalStorage Requirement

Save/load requires browser LocalStorage API. This means:
- Must run in browser (not Node.js)
- Private browsing may block saves
- Clearing browser data deletes saves

## Reference Information

### File Paths (Current)

- Build spec: `/home/user/Metroidvania_clone/METROIDVANIA_BUILD_PACKAGE.md`
- This guide: `/home/user/Metroidvania_clone/CLAUDE.md`
- Git repo: `/home/user/Metroidvania_clone/.git/`

### File Paths (After Build)

When the build is executed, a new directory structure will be created (either in-place or in a subdirectory). Refer to the "PROJECT STRUCTURE" section of `METROIDVANIA_BUILD_PACKAGE.md` (lines 159-262).

### Key Line References in METROIDVANIA_BUILD_PACKAGE.md

| Content | Line Range |
|---------|------------|
| README (user-facing) | 1-137 |
| Master Prompt start | 140 |
| Success Criteria | 145-158 |
| Project Structure | 159-262 |
| Phase 1: Init | 264-370 |
| Phase 2: Core Systems | 372-766 |
| Phase 3: Integration | 768-1095 |
| Phase 4: Content | 1097-1226 |
| Phase 5: Testing | 1228-1268 |
| Phase 6: Documentation | 1270-1441 |
| Completion Checklist | 1443-1473 |
| Success Message | 1475-1519 |
| Critical Reminders | 1521-1527 |
| Decision Guidelines | 1529-1540 |
| Execution Command | 1542-1546 |

### External Dependencies (Build Target)

When built, the game will depend on:
- Phaser 3.70.0 (CDN)
- Modern browser (Chrome 90+, Firefox 88+, Edge 90+)
- LocalStorage API
- HTML5 Canvas
- ES6 module support

## Quick Command Reference

### Analyzing the Repository
```bash
# View the build specification
cat METROIDVANIA_BUILD_PACKAGE.md

# Check repository state
git status
git log --oneline

# Count lines in build spec
wc -l METROIDVANIA_BUILD_PACKAGE.md
```

### Starting a Build (If Requested)

1. Decide: build in-place or create subdirectory?
2. Create project structure (mkdir commands)
3. Follow Phase 1 instructions exactly
4. Proceed through all 6 phases sequentially
5. Commit after each major system
6. Run integration tests before completion
7. Output success message (lines 1477-1519)

## Success Criteria

If asked to verify build completion, check ALL of these:

- [ ] `index.html` exists and opens without errors
- [ ] Main menu displays "New Game" button
- [ ] New Game loads room_01 with visible player
- [ ] WASD/arrows move player smoothly
- [ ] Space bar makes player jump
- [ ] Room transitions work (fade effect)
- [ ] Enemies spawn and move
- [ ] Combat system functional (damage, knockback)
- [ ] Health bar updates on damage
- [ ] Abilities can be collected and unlocked
- [ ] Unlocked abilities enable new movement
- [ ] Doors check ability requirements correctly
- [ ] Minimap shows current room
- [ ] Pause menu (ESC) works
- [ ] Save/load system works (LocalStorage)
- [ ] Boss fight functional
- [ ] Visual effects present (screen shake, particles)
- [ ] Game runs at 60 FPS
- [ ] No console errors
- [ ] All test files pass
- [ ] README.md complete
- [ ] Git history shows all phase commits

## Summary

**For AI Assistants Working With This Repository:**

1. **Understand:** This is a build specification, not game code
2. **Reference:** Use line numbers when citing `METROIDVANIA_BUILD_PACKAGE.md`
3. **Follow:** Maintain event-driven architecture if extending
4. **Respect:** Keep autonomous execution principle (no user prompts during build)
5. **Test:** Always verify against completion checklist
6. **Document:** Update this CLAUDE.md if repository scope changes

**Core Principle:** This repository represents a **complete, self-contained blueprint** for autonomous game construction. Every system, constant, event, and integration point is specified in detail to enable zero-intervention builds.

---

**Last Updated:** 2025-11-20
**Repository State:** Build specification only (pre-build)
**Target Build Time:** 2-6 hours autonomous execution
**Estimated Output:** ~50 files, ~5,000 lines of game code
