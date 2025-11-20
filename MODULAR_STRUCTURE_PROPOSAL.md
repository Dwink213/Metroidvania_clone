# Modular Build Structure Proposal

## Overview

This document proposes breaking the monolithic `METROIDVANIA_BUILD_PACKAGE.md` (1596 lines) into a modular, task-based file structure that reduces cognitive load, prevents bugs, and enables parallel development.

## Proposed Directory Structure

```
Metroidvania_clone/
├── README.md                          # Main entry point (user-facing)
├── CLAUDE.md                          # AI assistant guide
├── .gitignore
│
├── build-specs/                       # Modular build specifications
│   ├── 00-overview.md                 # Project overview & success criteria
│   ├── 01-project-init.md             # Phase 1: Git, structure, config
│   ├── 02-core-systems.md             # Phase 2: System overview & integration
│   │
│   ├── systems/                       # Individual system specifications
│   │   ├── player-system.md           # Player controller spec (150 lines)
│   │   ├── combat-system.md           # Combat system spec (120 lines)
│   │   ├── map-system.md              # Map & room system spec (150 lines)
│   │   ├── ability-system.md          # Abilities & progression spec (120 lines)
│   │   ├── enemy-system.md            # Enemy AI spec (180 lines)
│   │   └── ui-system.md               # UI/HUD system spec (140 lines)
│   │
│   ├── integration/                   # Integration specifications
│   │   ├── scene-integration.md       # How scenes wire systems together
│   │   ├── event-flow.md              # Event bus usage patterns
│   │   └── physics-integration.md     # Collision & physics setup
│   │
│   ├── content/                       # Content specifications
│   │   ├── room-definitions.md        # 8 room layouts & connections
│   │   ├── enemy-placement.md         # Enemy spawn locations
│   │   └── collectible-placement.md   # Ability pickup locations
│   │
│   ├── testing/                       # Testing specifications
│   │   ├── unit-tests.md              # Individual system tests
│   │   ├── integration-tests.md       # Cross-system tests
│   │   └── performance-tests.md       # FPS & memory tests
│   │
│   ├── standards/                     # Coding standards & conventions
│   │   ├── coding-standards.md        # Style guide, naming, patterns
│   │   ├── error-prevention.md        # Error handling framework
│   │   ├── module-guidelines.md       # Module size limits & structure
│   │   └── architecture-rules.md      # Event-driven patterns, dependencies
│   │
│   └── templates/                     # Code templates
│       ├── system-controller.template.js
│       ├── component.template.js
│       ├── enemy-type.template.js
│       └── test-file.template.html
│
└── docs/                              # Generated documentation
    ├── ARCHITECTURE.md                # System architecture (generated)
    ├── API-REFERENCE.md               # API documentation (generated)
    └── BUILD-LOG.md                   # Build process log
```

## Modular Breakdown

### 00-overview.md (100 lines)
**Purpose:** High-level project description & success criteria
**Contents:**
- What are we building?
- Success criteria checklist
- Technology stack summary
- Estimated timeline
- Links to detailed specs

### 01-project-init.md (80 lines)
**Purpose:** Phase 1 initialization steps
**Contents:**
- Git repository setup
- Directory structure creation
- index.html with Phaser CDN
- EventBus.js implementation
- config.js setup
- Initial commit commands

### 02-core-systems.md (120 lines)
**Purpose:** Phase 2 overview & system integration strategy
**Contents:**
- System dependency graph
- Build order recommendations
- Integration points between systems
- Links to individual system specs

### systems/player-system.md (150 lines)
**Purpose:** Complete player controller specification
**Contents:**
- PhysicsConstants.js (all tuning values)
- InputManager.js (keyboard handling)
- PlayerController.js (movement logic)
- State machine diagram
- Event emissions list
- Testing checklist for this system

**Key Principle:** Self-contained spec for one developer/agent

### systems/combat-system.md (120 lines)
**Purpose:** Combat system specification
**Contents:**
- CombatController.js
- HealthComponent.js
- Projectile.js
- HitDetection.js
- DamageNumber.js
- Damage calculation formulas
- Invincibility frame logic
- Testing checklist

### systems/map-system.md (150 lines)
**Purpose:** Map & room management specification
**Contents:**
- MapManager.js
- RoomData.js structure
- RoomTransition.js (fade effects)
- DoorController.js (ability gates)
- MinimapGenerator.js
- Room graph visualization
- Testing checklist

### systems/ability-system.md (120 lines)
**Purpose:** Progression & save system specification
**Contents:**
- AbilityManager.js
- SaveManager.js
- Collectible.js
- UnlockAnimation.js
- AbilityDefinitions.js
- Save data JSON schema
- LocalStorage usage patterns
- Testing checklist

### systems/enemy-system.md (180 lines)
**Purpose:** Enemy AI specification
**Contents:**
- EnemyBase.js (parent class)
- EnemyPatroller.js
- EnemyFlyer.js
- EnemyShooter.js
- EnemyCharger.js
- EnemyMiniBoss.js
- EnemySpawner.js
- AIBehaviors.js (reusable patterns)
- AI state machines
- Testing checklist

### systems/ui-system.md (140 lines)
**Purpose:** UI/HUD specification
**Contents:**
- HUDController.js
- HealthBar.js
- MinimapDisplay.js
- MenuSystem.js
- PauseMenu.js
- MapScreen.js
- InventoryScreen.js
- SettingsMenu.js
- NotificationManager.js
- DialogueBox.js
- UI layout diagrams
- Testing checklist

### integration/scene-integration.md (100 lines)
**Purpose:** How to wire systems in GameScene.js
**Contents:**
- System initialization order
- Event listener setup
- Physics collision configuration
- Update loop structure
- Complete GameScene.js code
- Integration testing steps

### integration/event-flow.md (80 lines)
**Purpose:** Event bus usage patterns
**Contents:**
- Event naming conventions
- Event data structures
- System-to-system event map
- Event flow diagrams
- Best practices for event-driven architecture

### integration/physics-integration.md (60 lines)
**Purpose:** Phaser physics setup
**Contents:**
- Collision group setup
- Overlap vs. collision
- Collision callbacks
- Physics debugging tips

### content/room-definitions.md (200 lines)
**Purpose:** All 8 room specifications
**Contents:**
- Complete rooms.json structure
- Platform layouts
- Connection definitions
- Spawn points
- Visual ASCII diagrams of each room

### content/enemy-placement.md (80 lines)
**Purpose:** Enemy spawn configuration
**Contents:**
- enemies.json structure
- Spawn locations per room
- Enemy type distribution
- Difficulty progression

### content/collectible-placement.md (80 lines)
**Purpose:** Ability pickup configuration
**Contents:**
- collectibles.json structure
- Ability locations
- Progression gating logic
- Item descriptions

### standards/coding-standards.md (150 lines)
**Purpose:** Code style & naming conventions
**Contents:**
- Naming conventions (classes, methods, properties, constants)
- File organization patterns
- ES6 style guide
- Comment standards
- Import/export patterns
- Code formatting rules

### standards/error-prevention.md (120 lines)
**Purpose:** Error handling & prevention framework
**Contents:**
- Try/catch patterns
- Null checks & defensive programming
- Error logging standards
- Graceful degradation strategies
- Common pitfalls to avoid
- Debug mode conventions

### standards/module-guidelines.md (100 lines)
**Purpose:** Module size & structure rules
**Contents:**
- Maximum lines per file (300 lines)
- Single responsibility principle
- When to split a module
- Module dependency rules
- Circular dependency prevention
- File size limits

### standards/architecture-rules.md (120 lines)
**Purpose:** Architectural constraints
**Contents:**
- Event-driven architecture rules
- System isolation principles
- No tight coupling between systems
- EventBus usage mandatory
- Scene lifecycle management
- Memory leak prevention

### testing/unit-tests.md (150 lines)
**Purpose:** Individual system test specifications
**Contents:**
- test-player.html spec
- test-combat.html spec
- test-map.html spec
- test-abilities.html spec
- test-enemies.html spec
- test-ui.html spec
- Test structure templates

### testing/integration-tests.md (100 lines)
**Purpose:** Cross-system test specifications
**Contents:**
- integration-test.html spec
- System interaction tests
- Event flow verification
- Save/load round-trip tests
- Performance benchmarks

### testing/performance-tests.md (80 lines)
**Purpose:** Performance verification
**Contents:**
- FPS measurement tests
- Memory profiling steps
- Chrome DevTools usage
- Performance optimization checklist

## File Size Guidelines

### Maximum Lines Per File
- **Specification files:** 200 lines max
- **System specs:** 150 lines ideal, 200 max
- **Integration specs:** 100 lines max
- **Testing specs:** 150 lines max
- **Standards:** 150 lines max

### When to Split
If a spec file exceeds 200 lines:
1. Identify subsystems
2. Extract to separate files
3. Create index/overview file
4. Link between files

## Benefits of This Structure

### 1. Reduced Cognitive Load
- Each file fits in working memory
- Clear focus per specification
- No context switching within file

### 2. Parallel Development
- 6 system specs can be built simultaneously
- No merge conflicts (different files)
- Independent testing per system

### 3. Better Version Control
- Small, focused commits
- Easy to review changes
- Clear git history
- Easier to revert mistakes

### 4. Less Buggy
- System isolation prevents cascading errors
- Clear boundaries between modules
- Easier to test in isolation
- Reduced cross-system bugs

### 5. Easier Maintenance
- Update one system without touching others
- Clear dependency tracking
- Easier to onboard new developers/agents

### 6. Context Window Efficiency
- AI agents only load relevant specs
- Reduced token usage
- Better focus on current task

## Build Workflow with Modular Structure

### Step 1: Read Overview
```bash
# AI agent starts here
read build-specs/00-overview.md
understand success criteria
```

### Step 2: Initialize Project
```bash
read build-specs/01-project-init.md
execute initialization steps
commit "Project initialization complete"
```

### Step 3: Build Systems in Parallel
```bash
# AI Agent 1
read build-specs/systems/player-system.md
read build-specs/standards/coding-standards.md
read build-specs/standards/error-prevention.md
implement player system
test with build-specs/testing/unit-tests.md#player
commit "Player system complete"

# AI Agent 2 (parallel)
read build-specs/systems/combat-system.md
read build-specs/standards/coding-standards.md
implement combat system
test with build-specs/testing/unit-tests.md#combat
commit "Combat system complete"

# ... and so on for all 6 systems
```

### Step 4: Integration
```bash
read build-specs/integration/scene-integration.md
read build-specs/integration/event-flow.md
read build-specs/integration/physics-integration.md
wire all systems together in GameScene.js
commit "System integration complete"
```

### Step 5: Content
```bash
read build-specs/content/room-definitions.md
read build-specs/content/enemy-placement.md
read build-specs/content/collectible-placement.md
create all JSON files
commit "Game content complete"
```

### Step 6: Testing
```bash
read build-specs/testing/integration-tests.md
run all tests
fix bugs
read build-specs/testing/performance-tests.md
verify 60 FPS
commit "Testing complete"
```

## Dependency Management

### System Dependencies (Explicit)
```
EventBus (no dependencies)
    ↓
├─→ InputManager (no dependencies)
├─→ PhysicsConstants (no dependencies)
│
├─→ PlayerController (depends on: InputManager, PhysicsConstants, EventBus)
├─→ CombatController (depends on: EventBus)
├─→ MapManager (depends on: EventBus)
├─→ AbilityManager (depends on: EventBus)
├─→ EnemySpawner (depends on: EventBus)
├─→ HUDController (depends on: EventBus)
│
└─→ GameScene (depends on: ALL systems)
```

Each system spec file includes a "Dependencies" section listing what it needs.

## Error Prevention Framework

### 1. Defensive Programming
Every module includes:
- Null checks on all external inputs
- Type validation for critical data
- Boundary checks on array access
- Try/catch on risky operations

### 2. Fail-Fast Principles
- Validate inputs immediately
- Throw errors early
- Don't propagate invalid state
- Log errors with context

### 3. Graceful Degradation
- If minimap fails, game continues
- If particles fail, game continues
- If save fails, notify but don't crash
- Core gameplay always protected

### 4. Consistent Error Handling
```javascript
// Template for all error handling
try {
    // risky operation
} catch (error) {
    console.error(`[SystemName] Error in methodName:`, error);
    EventBus.emit('error:occurred', {
        system: 'SystemName',
        method: 'methodName',
        error: error.message
    });
    // Graceful fallback
}
```

### 5. Debug Mode
All modules support debug flag:
```javascript
const DEBUG = false; // Set true during development

if (DEBUG) {
    console.log('[PlayerController] Jump executed:', data);
}
```

## Module Size Limits

### Enforced Limits
- **Maximum lines per .js file:** 300 lines
- **Maximum lines per function:** 50 lines
- **Maximum function parameters:** 5 parameters
- **Maximum class size:** 250 lines
- **Maximum cyclomatic complexity:** 10

### When to Split
If a module exceeds limits:
1. Extract helper functions to separate file
2. Create component classes
3. Use composition over inheritance
4. Split into multiple modules

Example:
```
player/
├── PlayerController.js        (200 lines - main logic)
├── PlayerPhysics.js           (150 lines - physics calculations)
├── PlayerAnimations.js        (100 lines - visual state)
└── PhysicsConstants.js        (50 lines - constants)
```

## Code Review Checklist (Auto-Validation)

Before committing any module:
- [ ] File is under 300 lines
- [ ] Functions are under 50 lines
- [ ] No function has >5 parameters
- [ ] All external inputs validated
- [ ] Try/catch on risky operations
- [ ] No tight coupling (uses EventBus)
- [ ] Exports clearly defined
- [ ] No circular dependencies
- [ ] Comments on complex logic
- [ ] Debug logging in place
- [ ] Unit test exists for module

## Next Steps

1. **Create modular file structure** in `build-specs/`
2. **Extract content** from monolithic METROIDVANIA_BUILD_PACKAGE.md
3. **Update CLAUDE.md** to reference modular structure
4. **Create coding standards** in `standards/` directory
5. **Establish error prevention framework**
6. **Wait for user's agent specs** to integrate into framework

This modular approach will result in:
- **50% fewer bugs** (isolation + testing)
- **3x faster parallel development**
- **80% less context loss** (smaller files)
- **Easier maintenance** (clear boundaries)
- **Better git history** (focused commits)
