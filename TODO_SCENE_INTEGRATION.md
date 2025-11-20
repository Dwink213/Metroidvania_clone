# TODO: SCENE-INTEGRATION Agent

**Agent Role:** Wire All Systems Together
**Status:** ⏳ WAITING FOR PHASE 4 START
**Dependencies:** ALL Phase 2 agents + STANDARDS-ENFORCEMENT pass

---

## Assignment
CRITICAL: This is the integration hub that wires ALL systems together in Phaser scenes. GameScene.js is the heart of the game.

---

## Tasks
- [ ] Wait for validation to pass
- [ ] Read `agents/SCENE-INTEGRATION.md`
- [ ] Read `build-specs/integration/*`
- [ ] Create `src/scenes/BootScene.js` (60 lines)
- [ ] Create `src/scenes/MainMenuScene.js` (80 lines)
- [ ] Create `src/scenes/GameScene.js` (170 lines) - **CRITICAL FILE**
- [ ] Create `src/scenes/GameOverScene.js` (60 lines)
- [ ] Create `src/main.js` (50 lines)
- [ ] Wire all systems in GameScene.create()
- [ ] Setup event listeners in GameScene.setupEventListeners()
- [ ] Configure physics collisions in GameScene.setupCollisions()
- [ ] Implement update loop in GameScene.update()
- [ ] Create `tests/integration-test.html` (200 lines)
- [ ] Test game loads and runs
- [ ] Git commit: "Complete scene integration"

---

## GameScene.js Structure (CRITICAL)
```javascript
create() {
  // Initialize systems IN ORDER
  this.eventBus = EventBus;
  this.input = new InputManager(this);
  this.map = new MapManager(this);
  this.player = new PlayerController(this, 400, 300);
  this.combat = new CombatController(this, this.player);
  this.abilities = new AbilityManager(this);
  this.enemies = new EnemySpawner(this);
  this.hud = new HUDController(this);
  this.camera = new CameraController(this, this.player);
  this.particles = new ParticleManager(this);

  this.setupEventListeners();
  this.setupCollisions();

  // Load save or start fresh
  if (this.loadSave) {
    this.abilities.loadGame(0);
  } else {
    this.map.loadRoom('room_01');
  }
}

update(time, delta) {
  this.player.update(delta, this.input);
  this.combat.update(delta);
  this.enemies.update(delta);
  this.camera.update(delta);
  this.map.checkRoomTransition(this.player.getPosition());
  this.hud.update(delta);
}
```

---

## Deliverable Output
**File:** `deliverables/SCENE_INTEGRATION_OUTPUT.json`

```json
{
  "agent": "SCENE-INTEGRATION",
  "status": "complete",
  "timestamp": "2025-11-20T19:30:00Z",
  "duration_minutes": 30,
  "files_created": [
    {"path": "src/scenes/BootScene.js", "lines": 60},
    {"path": "src/scenes/MainMenuScene.js", "lines": 80},
    {"path": "src/scenes/GameScene.js", "lines": 170},
    {"path": "src/scenes/GameOverScene.js", "lines": 60},
    {"path": "src/main.js", "lines": 50},
    {"path": "tests/integration-test.html", "lines": 200}
  ],
  "total_lines": 620,
  "systems_integrated": 9,
  "event_listeners_wired": 15,
  "collision_groups_setup": 3,
  "summary": "All 9 systems successfully wired together in GameScene. Event flow established between systems. Physics collisions configured. Main menu loads, new game starts, player moves, enemies spawn, combat works, rooms transition. Integration test passes."
}
```

---

**Status:** ⏳ WAITING FOR PHASE 4
**Progress:** 0/14 tasks
