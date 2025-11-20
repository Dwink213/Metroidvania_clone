# TODO: COMBAT-SYSTEM Agent

**Agent Role:** Combat Mechanics, Health, and Damage
**Status:** ⏳ WAITING FOR PHASE 2 START
**Dependencies:** EventBus.js

---

## Assignment
Implement combat system with melee/ranged attacks, health management, damage calculation, invincibility frames, and visual feedback.

---

## Tasks
- [ ] Read `agents/COMBAT-SYSTEM.md`
- [ ] Read `build-specs/standards/*`
- [ ] Create `src/combat/CombatController.js` (80 lines)
- [ ] Create `src/combat/HealthComponent.js` (60 lines)
- [ ] Create `src/combat/Projectile.js` (50 lines)
- [ ] Create `src/combat/HitDetection.js` (40 lines)
- [ ] Create `src/combat/DamageNumber.js` (50 lines)
- [ ] Create `tests/test-combat.html` (150 lines)
- [ ] Run tests and verify
- [ ] Git commit: "Implement combat system"

---

## Deliverable Output
**File:** `deliverables/COMBAT_SYSTEM_OUTPUT.json`

```json
{
  "agent": "COMBAT-SYSTEM",
  "status": "complete",
  "timestamp": "2025-11-20T16:40:00Z",
  "duration_minutes": 20,
  "files_created": [
    {"path": "src/combat/CombatController.js", "lines": 80},
    {"path": "src/combat/HealthComponent.js", "lines": 60},
    {"path": "src/combat/Projectile.js", "lines": 50},
    {"path": "src/combat/HitDetection.js", "lines": 40},
    {"path": "src/combat/DamageNumber.js", "lines": 50},
    {"path": "tests/test-combat.html", "lines": 150}
  ],
  "total_lines": 430,
  "events_emitted": ["combat:attacked", "combat:hit", "combat:damaged", "combat:defeated"],
  "events_listened": ["player:attacked", "enemy:attacked"],
  "summary": "Complete combat system with melee (60px hitbox) and ranged attacks (400px/s projectiles). Invincibility frames (1.5s), knockback physics, and floating damage numbers. Health management for all entities."
}
```

---

**Status:** ⏳ WAITING
**Progress:** 0/9 tasks
