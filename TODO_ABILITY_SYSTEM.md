# TODO: ABILITY-SYSTEM Agent

**Agent Role:** Progression, Unlocks, Save/Load
**Status:** ⏳ WAITING FOR PHASE 2 START
**Dependencies:** EventBus.js, LocalStorage API

---

## Tasks
- [ ] Read `agents/ABILITY-SYSTEM.md`
- [ ] Create `src/abilities/AbilityManager.js` (80 lines)
- [ ] Create `src/abilities/SaveManager.js` (90 lines)
- [ ] Create `src/abilities/Collectible.js` (50 lines)
- [ ] Create `src/abilities/UnlockAnimation.js` (40 lines)
- [ ] Create `src/abilities/AbilityDefinitions.js` (60 lines)
- [ ] Create `assets/data/collectibles.json` (50 lines)
- [ ] Create `tests/test-abilities.html` (150 lines)
- [ ] Git commit: "Implement ability system"

---

## Deliverable Output
**File:** `deliverables/ABILITY_SYSTEM_OUTPUT.json`

```json
{
  "agent": "ABILITY-SYSTEM",
  "status": "complete",
  "timestamp": "2025-11-20T17:30:00Z",
  "duration_minutes": 25,
  "files_created": [
    {"path": "src/abilities/AbilityManager.js", "lines": 80},
    {"path": "src/abilities/SaveManager.js", "lines": 90},
    {"path": "src/abilities/Collectible.js", "lines": 50},
    {"path": "src/abilities/UnlockAnimation.js", "lines": 40},
    {"path": "src/abilities/AbilityDefinitions.js", "lines": 60},
    {"path": "assets/data/collectibles.json", "lines": 50},
    {"path": "tests/test-abilities.html", "lines": 150}
  ],
  "total_lines": 520,
  "abilities_defined": 8,
  "events_emitted": ["ability:unlocked", "ability:collected", "game:saved", "game:loaded"],
  "summary": "8 unlockable abilities (dash, doubleJump, wallJump, glide, groundPound, grapple, sprint, healthUp). Save/load system using LocalStorage with full game state persistence."
}
```

---

**Status:** ⏳ WAITING
**Progress:** 0/8 tasks
