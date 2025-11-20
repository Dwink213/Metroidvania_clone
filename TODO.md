# Metroidvania Build - TODO Tracking

**Build Start:** 2025-11-20
**Target Completion:** 2.5-3 hours
**Status:** NOT STARTED

---

## Phase 1: Initialization (ORCHESTRATOR)
**Duration:** 10 minutes
**Status:** ⏳ PENDING

- [ ] Verify git repository
- [ ] Create directory structure
- [ ] Create .gitignore
- [ ] Create index.html (Phaser CDN)
- [ ] Create src/EventBus.js
- [ ] Create src/config.js
- [ ] Create placeholder directories
- [ ] Commit: "Initialize project structure"
- [ ] Broadcast: `build:phase1:complete`

---

## Phase 2: System Development (7 Agents, Parallel)
**Duration:** 60-90 minutes
**Status:** ⏳ PENDING

### PLAYER-SYSTEM Agent
**Duration:** 20 min | **Status:** ⏳ PENDING

- [ ] Read build-specs/systems/player-system.md
- [ ] Read build-specs/standards/*
- [ ] Create src/player/PhysicsConstants.js
- [ ] Create src/player/InputManager.js
- [ ] Create src/player/PlayerController.js
- [ ] Create tests/test-player.html
- [ ] Verify all tests pass
- [ ] Commit: "Implement player system"
- [ ] Emit: `system:player:complete`

### COMBAT-SYSTEM Agent
**Duration:** 20 min | **Status:** ⏳ PENDING

- [ ] Read build-specs/systems/combat-system.md
- [ ] Read build-specs/standards/*
- [ ] Create src/combat/CombatController.js
- [ ] Create src/combat/HealthComponent.js
- [ ] Create src/combat/Projectile.js
- [ ] Create src/combat/HitDetection.js
- [ ] Create src/combat/DamageNumber.js
- [ ] Create tests/test-combat.html
- [ ] Verify all tests pass
- [ ] Commit: "Implement combat system"
- [ ] Emit: `system:combat:complete`

### MAP-SYSTEM Agent
**Duration:** 25 min | **Status:** ⏳ PENDING

- [ ] Read build-specs/systems/map-system.md
- [ ] Read build-specs/standards/*
- [ ] Create src/map/MapManager.js
- [ ] Create src/map/RoomData.js
- [ ] Create src/map/RoomTransition.js
- [ ] Create src/map/DoorController.js
- [ ] Create src/map/MinimapGenerator.js
- [ ] Create assets/data/rooms.json (all 8 rooms)
- [ ] Create tests/test-map.html
- [ ] Verify all tests pass
- [ ] Commit: "Implement map system"
- [ ] Emit: `system:map:complete`

### ABILITY-SYSTEM Agent
**Duration:** 25 min | **Status:** ⏳ PENDING

- [ ] Read build-specs/systems/ability-system.md
- [ ] Read build-specs/standards/*
- [ ] Create src/abilities/AbilityManager.js
- [ ] Create src/abilities/SaveManager.js
- [ ] Create src/abilities/Collectible.js
- [ ] Create src/abilities/UnlockAnimation.js
- [ ] Create src/abilities/AbilityDefinitions.js
- [ ] Create assets/data/collectibles.json
- [ ] Create tests/test-abilities.html
- [ ] Verify save/load works
- [ ] Commit: "Implement ability system"
- [ ] Emit: `system:ability:complete`

### ENEMY-SYSTEM Agent
**Duration:** 30 min | **Status:** ⏳ PENDING

- [ ] Read build-specs/systems/enemy-system.md
- [ ] Read build-specs/standards/*
- [ ] Create src/enemies/EnemyBase.js
- [ ] Create src/enemies/EnemyPatroller.js
- [ ] Create src/enemies/EnemyFlyer.js
- [ ] Create src/enemies/EnemyShooter.js
- [ ] Create src/enemies/EnemyCharger.js
- [ ] Create src/enemies/EnemyMiniBoss.js
- [ ] Create src/enemies/EnemySpawner.js
- [ ] Create src/enemies/AIBehaviors.js
- [ ] Create assets/data/enemies.json
- [ ] Create tests/test-enemies.html
- [ ] Verify all enemy types work
- [ ] Commit: "Implement enemy system"
- [ ] Emit: `system:enemy:complete`

### UI-SYSTEM Agent
**Duration:** 30 min | **Status:** ⏳ PENDING

- [ ] Read build-specs/systems/ui-system.md
- [ ] Read build-specs/standards/*
- [ ] Create src/ui/HUDController.js
- [ ] Create src/ui/HealthBar.js
- [ ] Create src/ui/MinimapDisplay.js
- [ ] Create src/ui/MenuSystem.js
- [ ] Create src/ui/PauseMenu.js
- [ ] Create src/ui/MapScreen.js
- [ ] Create src/ui/InventoryScreen.js
- [ ] Create src/ui/SettingsMenu.js
- [ ] Create src/ui/NotificationManager.js
- [ ] Create src/ui/DialogueBox.js
- [ ] Create tests/test-ui.html
- [ ] Verify all menus work
- [ ] Commit: "Implement UI system"
- [ ] Emit: `system:ui:complete`

### EFFECTS-SYSTEM Agent
**Duration:** 15 min | **Status:** ⏳ PENDING

- [ ] Read build-specs/integration/camera-effects.md
- [ ] Read build-specs/standards/*
- [ ] Create src/effects/CameraController.js
- [ ] Create src/effects/ParticleManager.js
- [ ] Create src/effects/ScreenEffects.js
- [ ] Create tests/test-effects.html
- [ ] Verify effects work
- [ ] Commit: "Implement effects system"
- [ ] Emit: `system:effects:complete`

---

## Phase 3: Standards Validation (STANDARDS-ENFORCEMENT Agent)
**Duration:** 15 minutes
**Status:** ⏳ PENDING

- [ ] Wait for ALL system:*:complete signals
- [ ] Check all file sizes (<300 lines)
- [ ] Check function sizes (<50 lines)
- [ ] Verify naming conventions
- [ ] Check for tight coupling (should use EventBus)
- [ ] Verify error handling patterns
- [ ] Check for circular dependencies
- [ ] Report violations OR emit `validation:complete`

**If violations found:**
- [ ] Report to ORCHESTRATOR
- [ ] ORCHESTRATOR notifies relevant agents
- [ ] Agents fix violations
- [ ] Re-validate

---

## Phase 4: Integration (SCENE-INTEGRATION Agent)
**Duration:** 30 minutes
**Status:** ⏳ PENDING

- [ ] Wait for `validation:complete`
- [ ] Read build-specs/integration/*
- [ ] Create src/scenes/BootScene.js
- [ ] Create src/scenes/MainMenuScene.js
- [ ] Create src/scenes/GameScene.js (CRITICAL INTEGRATION HUB)
- [ ] Create src/scenes/GameOverScene.js
- [ ] Create src/main.js
- [ ] Wire all systems in GameScene
- [ ] Setup event listeners
- [ ] Configure physics collisions
- [ ] Create tests/integration-test.html
- [ ] Run integration test
- [ ] Commit: "Complete scene integration"
- [ ] Emit: `integration:complete`

---

## Phase 5: Testing (TESTING-VALIDATION Agent)
**Duration:** 30 minutes
**Status:** ⏳ PENDING

- [ ] Wait for `integration:complete`
- [ ] Read build-specs/testing/*
- [ ] Run tests/test-player.html
- [ ] Run tests/test-combat.html
- [ ] Run tests/test-map.html
- [ ] Run tests/test-abilities.html
- [ ] Run tests/test-enemies.html
- [ ] Run tests/test-ui.html
- [ ] Run tests/integration-test.html
- [ ] Verify 60 FPS performance (Chrome DevTools)
- [ ] Check memory usage (no leaks)
- [ ] Verify all 29 success criteria
- [ ] Report results
- [ ] Emit: `testing:complete` or `testing:failed`

**If tests fail:**
- [ ] Report failures to ORCHESTRATOR
- [ ] ORCHESTRATOR notifies relevant agents
- [ ] Agents fix bugs
- [ ] Re-run failed tests

---

## Phase 6: Final Verification (ORCHESTRATOR)
**Duration:** 15 minutes
**Status:** ⏳ PENDING

- [ ] Wait for `testing:complete`
- [ ] Verify ALL 29 success criteria (from build-specs/00-overview.md)
- [ ] Create README.md (game documentation)
- [ ] Create docs/ARCHITECTURE.md
- [ ] Create docs/CONTROLS.md
- [ ] Create docs/BUILD-LOG.md
- [ ] Run final smoke test
- [ ] Commit: "Build complete - all systems verified"
- [ ] Output success message
- [ ] Update TODO.md status to COMPLETE

---

## Success Criteria Checklist (29 Total)

### Basic Functionality (7)
- [ ] index.html opens without errors
- [ ] Main menu displays with "New Game" button
- [ ] New Game starts in room_01 with player visible
- [ ] WASD keys move player smoothly
- [ ] Space bar makes player jump
- [ ] Shift key makes player dash (if unlocked)
- [ ] Player can transition between rooms

### Core Systems (6)
- [ ] Enemies spawn and move
- [ ] Combat damages enemies
- [ ] Enemies can damage player
- [ ] Health bar decreases on damage
- [ ] Collecting ability unlocks it
- [ ] Abilities enable new movement

### Progression (4)
- [ ] Doors check ability requirements
- [ ] Minimap shows current room
- [ ] Pause menu (ESC) works
- [ ] Map screen shows explored rooms

### Persistence (3)
- [ ] Save game works (LocalStorage)
- [ ] Load game restores state
- [ ] Inventory shows unlocked abilities

### Polish (4)
- [ ] Boss fight functional
- [ ] Visual effects present (shake, particles)
- [ ] Game runs at 60 FPS
- [ ] No console errors

### Documentation (5)
- [ ] All test files pass
- [ ] README complete
- [ ] Git history clean
- [ ] ARCHITECTURE.md complete
- [ ] CONTROLS.md complete

---

## Agent Status Board

| Agent | Status | Progress | ETA |
|-------|--------|----------|-----|
| ORCHESTRATOR | ⏳ PENDING | 0% | - |
| PLAYER-SYSTEM | ⏳ PENDING | 0% | - |
| COMBAT-SYSTEM | ⏳ PENDING | 0% | - |
| MAP-SYSTEM | ⏳ PENDING | 0% | - |
| ABILITY-SYSTEM | ⏳ PENDING | 0% | - |
| ENEMY-SYSTEM | ⏳ PENDING | 0% | - |
| UI-SYSTEM | ⏳ PENDING | 0% | - |
| EFFECTS-SYSTEM | ⏳ PENDING | 0% | - |
| STANDARDS-ENFORCEMENT | ⏳ PENDING | 0% | - |
| SCENE-INTEGRATION | ⏳ PENDING | 0% | - |
| TESTING-VALIDATION | ⏳ PENDING | 0% | - |

**Legend:**
- ⏳ PENDING - Not started
- 🔄 IN PROGRESS - Currently working
- ✅ COMPLETE - Finished successfully
- ❌ FAILED - Encountered error
- ⏸️ BLOCKED - Waiting for dependency

---

## Build Progress

**Overall:** 0% complete
**Phase:** Not started
**Estimated Time Remaining:** 2.5-3 hours

---

## Notes

This TODO file is updated by agents throughout the build process.
Each agent checks off their tasks as they complete them.
ORCHESTRATOR monitors this file to track overall progress.

**To start the build:**
1. ORCHESTRATOR reads this TODO.md
2. ORCHESTRATOR begins Phase 1
3. Agents update their sections as they work
4. ORCHESTRATOR tracks progress via git commits and agent signals

---

**Last Updated:** 2025-11-20 (Initial creation)
**Updated By:** Setup (Pre-build)
