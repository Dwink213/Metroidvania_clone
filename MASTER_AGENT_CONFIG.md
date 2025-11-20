# MASTER AGENT CONFIGURATION

## Overview

This document defines the multi-agent system for building the Metroidvania game. Each agent is specialized for specific tasks, enabling parallel development, reduced context loss, and fewer bugs.

## Agent Architecture

### Design Principles

1. **Single Responsibility** - Each agent has ONE primary domain
2. **Parallel Execution** - Agents work simultaneously on independent systems
3. **Event-Driven Communication** - Agents coordinate via event messages
4. **Isolation** - Agent failures don't cascade to other agents
5. **Modular Context** - Each agent loads only relevant specifications

## Agent Roster

### 1. ORCHESTRATOR Agent
**Role:** Project coordination and task distribution
**Capabilities:**
- Read all specification files
- Create project structure
- Distribute tasks to specialist agents
- Monitor build progress
- Run integration tests
- Verify success criteria

**Context Load:** 100-200 lines per task
**Tools:** Read, Write, Bash, Git
**Works On:**
- build-specs/00-overview.md
- build-specs/01-project-init.md
- build-specs/integration/*
- TODO.md management

**Responsibilities:**
- Initialize git repository
- Create directory structure
- Coordinate agent handoffs
- Run final integration
- Ensure all tests pass

---

### 2. PLAYER-SYSTEM Agent
**Role:** Player movement, input, and physics
**Capabilities:**
- Implement smooth movement mechanics
- Handle keyboard input
- Tune physics constants
- Implement special moves (dash, wall jump, etc.)

**Context Load:** 150 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/systems/player-system.md
- src/player/PlayerController.js
- src/player/InputManager.js
- src/player/PhysicsConstants.js

**Responsibilities:**
- Implement PlayerController class
- Implement InputManager class
- Define all physics constants
- Handle movement state machine
- Emit player events to EventBus
- Create player unit tests

**Event Emissions:**
- `player:jumped`
- `player:landed`
- `player:dashed`
- `player:wallJumped`

**Dependencies:**
- EventBus.js (created by ORCHESTRATOR)
- Phaser engine (CDN)

---

### 3. COMBAT-SYSTEM Agent
**Role:** Combat mechanics, health, damage
**Capabilities:**
- Implement melee and ranged attacks
- Health management
- Hit detection
- Damage calculations
- Visual damage feedback

**Context Load:** 120 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/systems/combat-system.md
- src/combat/CombatController.js
- src/combat/HealthComponent.js
- src/combat/Projectile.js
- src/combat/HitDetection.js
- src/combat/DamageNumber.js

**Responsibilities:**
- Implement CombatController class
- Implement HealthComponent class
- Implement Projectile system
- Implement HitDetection logic
- Create damage number visuals
- Handle invincibility frames
- Create combat unit tests

**Event Emissions:**
- `combat:attacked`
- `combat:hit`
- `combat:damaged`
- `combat:defeated`

**Event Listeners:**
- `player:attacked` (from PlayerController)
- `enemy:attacked` (from Enemies)

**Dependencies:**
- EventBus.js
- Phaser physics

---

### 4. MAP-SYSTEM Agent
**Role:** World structure, rooms, transitions
**Capabilities:**
- Create room definitions
- Implement room transitions
- Handle door logic
- Generate minimap
- Manage platform layouts

**Context Load:** 150 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/systems/map-system.md
- build-specs/content/room-definitions.md
- src/map/MapManager.js
- src/map/RoomData.js
- src/map/RoomTransition.js
- src/map/DoorController.js
- src/map/MinimapGenerator.js
- assets/data/rooms.json

**Responsibilities:**
- Implement MapManager class
- Create all 8 room definitions in rooms.json
- Implement smooth room transitions
- Implement door ability-gating logic
- Generate minimap display
- Create map unit tests

**Event Emissions:**
- `room:changed`
- `room:entered`
- `room:exited`
- `door:locked`
- `door:unlocked`

**Event Listeners:**
- `ability:unlocked` (to unlock doors)

**Dependencies:**
- EventBus.js
- Phaser scene management

---

### 5. ABILITY-SYSTEM Agent
**Role:** Progression, unlocks, save/load
**Capabilities:**
- Manage ability unlocks
- Handle collectibles
- Save/load game state
- Track progression

**Context Load:** 120 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/systems/ability-system.md
- build-specs/content/collectible-placement.md
- src/abilities/AbilityManager.js
- src/abilities/SaveManager.js
- src/abilities/Collectible.js
- src/abilities/UnlockAnimation.js
- src/abilities/AbilityDefinitions.js
- assets/data/collectibles.json

**Responsibilities:**
- Implement AbilityManager class
- Implement SaveManager with LocalStorage
- Create collectible pickup system
- Implement unlock animations
- Define all 8 abilities
- Create ability unit tests

**Event Emissions:**
- `ability:unlocked`
- `ability:collected`
- `game:saved`
- `game:loaded`

**Event Listeners:**
- `collectible:pickedUp`

**Dependencies:**
- EventBus.js
- LocalStorage API

---

### 6. ENEMY-SYSTEM Agent
**Role:** Enemy AI, behaviors, spawning
**Capabilities:**
- Implement 5 enemy types
- Create AI behaviors
- Handle enemy spawning
- Manage enemy state machines

**Context Load:** 180 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/systems/enemy-system.md
- build-specs/content/enemy-placement.md
- src/enemies/EnemyBase.js
- src/enemies/EnemyPatroller.js
- src/enemies/EnemyFlyer.js
- src/enemies/EnemyShooter.js
- src/enemies/EnemyCharger.js
- src/enemies/EnemyMiniBoss.js
- src/enemies/EnemySpawner.js
- src/enemies/AIBehaviors.js
- assets/data/enemies.json

**Responsibilities:**
- Implement EnemyBase parent class
- Implement 5 enemy type subclasses
- Create reusable AI behavior components
- Implement enemy spawning system
- Define enemy spawn locations
- Create enemy unit tests

**Event Emissions:**
- `enemy:spawned`
- `enemy:hit`
- `enemy:defeated`
- `enemy:attacked`

**Event Listeners:**
- `room:changed` (to spawn enemies)
- `combat:hit` (to take damage)

**Dependencies:**
- EventBus.js
- Phaser physics
- CombatController

---

### 7. UI-SYSTEM Agent
**Role:** User interface, HUD, menus
**Capabilities:**
- Create all UI components
- Implement menu system
- Create HUD elements
- Handle notifications

**Context Load:** 140 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/systems/ui-system.md
- src/ui/HUDController.js
- src/ui/HealthBar.js
- src/ui/MinimapDisplay.js
- src/ui/MenuSystem.js
- src/ui/PauseMenu.js
- src/ui/MapScreen.js
- src/ui/InventoryScreen.js
- src/ui/SettingsMenu.js
- src/ui/NotificationManager.js
- src/ui/DialogueBox.js

**Responsibilities:**
- Implement HUDController class
- Create HealthBar component
- Create MinimapDisplay component
- Implement all menu screens
- Create notification system
- Create UI unit tests

**Event Emissions:**
- `menu:opened`
- `menu:closed`
- `ui:notification`

**Event Listeners:**
- `combat:damaged` (update health bar)
- `ability:unlocked` (show notification)
- `room:changed` (update minimap)

**Dependencies:**
- EventBus.js
- Phaser UI elements

---

### 8. EFFECTS-SYSTEM Agent
**Role:** Visual effects, camera, particles
**Capabilities:**
- Implement camera controls
- Create particle effects
- Handle screen effects (shake, flash)
- Polish visual feedback

**Context Load:** 100 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/integration/camera-effects.md
- src/effects/CameraController.js
- src/effects/ParticleManager.js
- src/effects/ScreenEffects.js

**Responsibilities:**
- Implement CameraController class
- Create ParticleManager system
- Implement screen shake/flash
- Add visual polish effects
- Create effects unit tests

**Event Emissions:**
- `effect:started`
- `effect:completed`

**Event Listeners:**
- `combat:hit` (screen shake)
- `player:landed` (dust particles)
- `enemy:defeated` (particle burst)

**Dependencies:**
- EventBus.js
- Phaser effects

---

### 9. SCENE-INTEGRATION Agent
**Role:** Wire all systems together in Phaser scenes
**Capabilities:**
- Create scene files
- Connect all systems
- Setup physics collisions
- Implement game loop

**Context Load:** 150 lines
**Tools:** Read, Write, Edit
**Works On:**
- build-specs/integration/scene-integration.md
- build-specs/integration/event-flow.md
- build-specs/integration/physics-integration.md
- src/scenes/BootScene.js
- src/scenes/MainMenuScene.js
- src/scenes/GameScene.js
- src/scenes/GameOverScene.js
- src/main.js
- src/config.js

**Responsibilities:**
- Implement all 4 scene classes
- Wire system integration in GameScene
- Setup event listeners
- Configure physics collisions
- Create main.js entry point
- Create integration tests

**Event Listeners:**
- ALL events (for debugging/logging)

**Dependencies:**
- ALL other systems

---

### 10. TESTING-VALIDATION Agent
**Role:** Test all systems, verify quality
**Capabilities:**
- Create unit tests
- Run integration tests
- Performance validation
- Bug detection and reporting

**Context Load:** 150 lines
**Tools:** Read, Write, Bash, Edit
**Works On:**
- build-specs/testing/*
- tests/test-player.html
- tests/test-combat.html
- tests/test-map.html
- tests/test-abilities.html
- tests/test-enemies.html
- tests/test-ui.html
- tests/integration-test.html

**Responsibilities:**
- Create all 7 test files
- Run unit tests on each system
- Run integration tests
- Verify 60 FPS performance
- Check memory usage
- Report bugs to ORCHESTRATOR
- Verify success criteria

**Dependencies:**
- ALL systems (tests them)

---

### 11. STANDARDS-ENFORCEMENT Agent
**Role:** Code quality, conventions, error prevention
**Capabilities:**
- Enforce coding standards
- Review code for errors
- Check module sizes
- Validate architecture rules

**Context Load:** 120 lines
**Tools:** Read, Grep, Bash
**Works On:**
- build-specs/standards/*
- All .js files (review)

**Responsibilities:**
- Review all code for standards compliance
- Check file sizes (<300 lines)
- Verify error handling patterns
- Check for tight coupling
- Validate event naming
- Ensure defensive programming
- Report violations

**Validation Checklist:**
- ✅ Files under 300 lines
- ✅ Functions under 50 lines
- ✅ No tight coupling
- ✅ Proper error handling
- ✅ Event-driven communication
- ✅ No circular dependencies

---

## Agent Coordination Protocol

### Phase 1: Initialization (ORCHESTRATOR)
```
ORCHESTRATOR:
1. Read build-specs/00-overview.md
2. Read build-specs/01-project-init.md
3. Initialize git repository
4. Create directory structure
5. Create EventBus.js
6. Create config.js
7. Create index.html
8. Commit "Project initialization complete"
9. Signal ready for Phase 2
```

### Phase 2: Parallel System Development
```
[ORCHESTRATOR broadcasts: "Phase 2 start - Systems"]

PLAYER-SYSTEM Agent:
1. Read build-specs/systems/player-system.md
2. Read build-specs/standards/coding-standards.md
3. Implement all player files
4. Emit: "system:player:complete"

COMBAT-SYSTEM Agent:
1. Read build-specs/systems/combat-system.md
2. Read build-specs/standards/coding-standards.md
3. Implement all combat files
4. Emit: "system:combat:complete"

MAP-SYSTEM Agent:
1. Read build-specs/systems/map-system.md
2. Read build-specs/standards/coding-standards.md
3. Implement all map files
4. Emit: "system:map:complete"

ABILITY-SYSTEM Agent:
1. Read build-specs/systems/ability-system.md
2. Read build-specs/standards/coding-standards.md
3. Implement all ability files
4. Emit: "system:ability:complete"

ENEMY-SYSTEM Agent:
1. Read build-specs/systems/enemy-system.md
2. Read build-specs/standards/coding-standards.md
3. Implement all enemy files
4. Emit: "system:enemy:complete"

UI-SYSTEM Agent:
1. Read build-specs/systems/ui-system.md
2. Read build-specs/standards/coding-standards.md
3. Implement all UI files
4. Emit: "system:ui:complete"

EFFECTS-SYSTEM Agent:
1. Read build-specs/integration/camera-effects.md
2. Read build-specs/standards/coding-standards.md
3. Implement all effects files
4. Emit: "system:effects:complete"

[ORCHESTRATOR waits for ALL "system:*:complete" signals]
```

### Phase 3: Standards Validation
```
STANDARDS-ENFORCEMENT Agent:
1. Wait for "system:*:complete" from ALL agents
2. Read build-specs/standards/*
3. Review ALL .js files
4. Check compliance
5. Report violations
6. Emit: "validation:complete" or "validation:failed"

[If validation:failed, relevant agents fix and re-emit complete]
```

### Phase 4: Integration (SCENE-INTEGRATION)
```
SCENE-INTEGRATION Agent:
1. Wait for "validation:complete"
2. Read build-specs/integration/*
3. Implement all scene files
4. Wire all systems in GameScene.js
5. Setup event listeners
6. Configure physics collisions
7. Emit: "integration:complete"
```

### Phase 5: Testing (TESTING-VALIDATION)
```
TESTING-VALIDATION Agent:
1. Wait for "integration:complete"
2. Read build-specs/testing/*
3. Create all test files
4. Run unit tests on each system
5. Run integration tests
6. Verify performance (60 FPS)
7. Report results
8. Emit: "testing:complete" or "testing:failed:system_name"

[If testing:failed, relevant agent fixes and re-emits complete]
```

### Phase 6: Final Verification (ORCHESTRATOR)
```
ORCHESTRATOR:
1. Wait for "testing:complete"
2. Read build-specs/00-overview.md (success criteria)
3. Verify ALL 29 checklist items
4. Run final integration test
5. Commit "Build complete"
6. Output success message
```

## Communication Protocol

### Event Message Format
```json
{
  "agent": "PLAYER-SYSTEM",
  "event": "system:player:complete",
  "timestamp": "2025-11-20T15:45:00Z",
  "data": {
    "files_created": [
      "src/player/PlayerController.js",
      "src/player/InputManager.js",
      "src/player/PhysicsConstants.js"
    ],
    "tests_created": ["tests/test-player.html"],
    "lines_of_code": 245,
    "status": "success"
  }
}
```

### Status Updates
Each agent emits status updates:
- `agent:started` - Agent begins work
- `agent:progress` - Progress update (every 5 minutes)
- `agent:blocked` - Waiting for dependency
- `agent:error` - Error encountered
- `agent:complete` - Task finished
- `agent:validated` - Passed standards check

## Error Handling

### Agent Failure Protocol
```
IF agent encounters error:
1. Emit "agent:error" with details
2. Attempt self-recovery (3 retries)
3. If recovery fails, emit "agent:failed"
4. ORCHESTRATOR assigns fallback agent or manual intervention
5. Other agents continue (isolation)
```

### Dependency Blocking
```
IF agent waiting for dependency:
1. Emit "agent:blocked" with dependency name
2. Enter wait state (poll every 30s)
3. Resume when dependency emits "complete"
4. Timeout after 30 minutes → emit "agent:timeout"
```

## File Locking

To prevent merge conflicts:
- Each agent works in dedicated directories
- No two agents edit the same file simultaneously
- ORCHESTRATOR owns: root files, config files
- SCENE-INTEGRATION owns: scenes/, main.js
- System agents own: their respective src/* subdirectories

## Context Management

### Token Budgets per Agent
- ORCHESTRATOR: 5,000 tokens (coordination)
- System Agents: 3,000 tokens each (focused)
- SCENE-INTEGRATION: 4,000 tokens (integration)
- TESTING-VALIDATION: 3,000 tokens (testing)
- STANDARDS-ENFORCEMENT: 2,000 tokens (review)

### Context Loading Strategy
```
1. Load ONLY relevant spec files
2. Load standards documents (all agents)
3. Load dependencies list
4. Do NOT load other system specs
5. Use git commits to share state
```

## Success Metrics

### Build Time Targets
- Phase 1 (Init): 10 minutes
- Phase 2 (Systems): 60-90 minutes (parallel)
- Phase 3 (Validation): 15 minutes
- Phase 4 (Integration): 30 minutes
- Phase 5 (Testing): 30 minutes
- Phase 6 (Verification): 15 minutes
- **Total: 2.5-3 hours** (50% faster than sequential)

### Quality Metrics
- Zero tight coupling violations
- All files under 300 lines
- 100% test coverage on critical systems
- 60 FPS sustained
- No memory leaks
- All 29 success criteria met

## Agent Assignment Summary

| Agent | Files | Lines | Time | Dependencies |
|-------|-------|-------|------|--------------|
| ORCHESTRATOR | 5 | 150 | 10m | None |
| PLAYER-SYSTEM | 3 | 245 | 20m | EventBus |
| COMBAT-SYSTEM | 5 | 280 | 20m | EventBus |
| MAP-SYSTEM | 6 | 320 | 25m | EventBus |
| ABILITY-SYSTEM | 6 | 290 | 25m | EventBus |
| ENEMY-SYSTEM | 8 | 380 | 30m | EventBus, Combat |
| UI-SYSTEM | 10 | 340 | 30m | EventBus |
| EFFECTS-SYSTEM | 3 | 180 | 15m | EventBus |
| SCENE-INTEGRATION | 5 | 320 | 30m | ALL systems |
| TESTING-VALIDATION | 7 | 400 | 30m | ALL systems |
| STANDARDS-ENFORCEMENT | 0 | 0 | 15m | ALL code |

**Total Output:** ~50 files, ~2,905 lines of code

## Deployment

### Starting the Build
```bash
# ORCHESTRATOR reads this config
# Broadcasts "build:start"
# Agents self-assign based on role
# Work proceeds in parallel
# ORCHESTRATOR monitors progress
# Reports completion when done
```

### Monitoring Progress
```bash
# Check TODO.md for status
cat TODO.md

# Check git log for commits
git log --oneline

# Check agent status (if running)
# Each agent updates TODO.md with progress
```

## Configuration Customization

To customize for your specific agents:
1. Adjust token budgets based on your agent capabilities
2. Modify time estimates based on agent speed
3. Add/remove agents based on your architecture
4. Adjust file ownership based on agent specializations
5. Configure communication protocol for your system

This configuration is designed to be adapted to your specific multi-agent setup.
