# TODO: ENEMY-SYSTEM Agent

**Agent Role:** Enemy AI, Behaviors, Spawning
**Status:** ⏳ WAITING FOR PHASE 2 START
**Dependencies:** EventBus.js, CombatController

---

## Tasks
- [ ] Read `agents/ENEMY-SYSTEM.md`
- [ ] Create `src/enemies/EnemyBase.js` (80 lines)
- [ ] Create `src/enemies/EnemyPatroller.js` (60 lines)
- [ ] Create `src/enemies/EnemyFlyer.js` (70 lines)
- [ ] Create `src/enemies/EnemyShooter.js` (60 lines)
- [ ] Create `src/enemies/EnemyCharger.js` (70 lines)
- [ ] Create `src/enemies/EnemyMiniBoss.js` (100 lines) - 3 phases
- [ ] Create `src/enemies/EnemySpawner.js` (70 lines)
- [ ] Create `src/enemies/AIBehaviors.js` (50 lines)
- [ ] Create `assets/data/enemies.json` (100 lines)
- [ ] Create `tests/test-enemies.html` (180 lines)
- [ ] Git commit: "Implement enemy system"

---

## Deliverable Output
**File:** `deliverables/ENEMY_SYSTEM_OUTPUT.json`

```json
{
  "agent": "ENEMY-SYSTEM",
  "status": "complete",
  "timestamp": "2025-11-20T18:00:00Z",
  "duration_minutes": 30,
  "files_created": [
    {"path": "src/enemies/EnemyBase.js", "lines": 80},
    {"path": "src/enemies/EnemyPatroller.js", "lines": 60},
    {"path": "src/enemies/EnemyFlyer.js", "lines": 70},
    {"path": "src/enemies/EnemyShooter.js", "lines": 60},
    {"path": "src/enemies/EnemyCharger.js", "lines": 70},
    {"path": "src/enemies/EnemyMiniBoss.js", "lines": 100},
    {"path": "src/enemies/EnemySpawner.js", "lines": 70},
    {"path": "src/enemies/AIBehaviors.js", "lines": 50},
    {"path": "assets/data/enemies.json", "lines": 100},
    {"path": "tests/test-enemies.html", "lines": 180}
  ],
  "total_lines": 840,
  "enemy_types": 5,
  "events_emitted": ["enemy:spawned", "enemy:hit", "enemy:defeated", "enemy:attacked", "boss:phaseChange"],
  "events_listened": ["room:changed", "combat:hit"],
  "summary": "5 enemy types with unique AI: Patroller (chase 300px), Flyer (sine wave + swoop), Shooter (2s interval), Charger (wind-up rush), MiniBoss (3 phases, 200 HP). Room-based spawning system with defeated enemy tracking."
}
```

---

**Status:** ⏳ WAITING
**Progress:** 0/11 tasks
