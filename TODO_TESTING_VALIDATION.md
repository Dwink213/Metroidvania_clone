# TODO: TESTING-VALIDATION Agent

**Agent Role:** Quality Assurance & Performance Verification
**Status:** ⏳ WAITING FOR PHASE 5 START
**Dependencies:** SCENE-INTEGRATION must complete

---

## Assignment
Test ALL systems, verify performance (60 FPS), check all 29 success criteria, report any failures to ORCHESTRATOR.

---

## Tasks

### Unit Tests
- [ ] Run `tests/test-player.html` - Verify all player tests pass
- [ ] Run `tests/test-combat.html` - Verify combat tests pass
- [ ] Run `tests/test-map.html` - Verify room/transition tests pass
- [ ] Run `tests/test-abilities.html` - Verify save/load works
- [ ] Run `tests/test-enemies.html` - Verify all enemy types work
- [ ] Run `tests/test-ui.html` - Verify all menus work
- [ ] Run `tests/test-effects.html` - Verify visual effects work

### Integration Test
- [ ] Run `tests/integration-test.html`
- [ ] Verify game loads without errors
- [ ] Test full gameplay loop
- [ ] Test all 29 success criteria

### Performance Tests
- [ ] Open Chrome DevTools
- [ ] Record 30 seconds of gameplay
- [ ] Check FPS (target: 60 FPS sustained)
- [ ] Check memory (target: stable, no leaks)
- [ ] Check CPU usage (target: reasonable)

### Success Criteria (29 Total)
- [ ] 1. index.html opens without errors
- [ ] 2. Main menu displays
- [ ] 3. New Game button works
- [ ] 4. Player visible and moves (WASD)
- [ ] 5. Space bar jump works
- [ ] 6. Shift dash works (when unlocked)
- [ ] 7. Room transitions smooth
- [ ] 8. Enemies spawn and move
- [ ] 9. Combat works
- [ ] 10. Health bar updates
- [ ] 11. Abilities unlock
- [ ] 12. Abilities enable movement
- [ ] 13. Doors check requirements
- [ ] 14. Minimap shows rooms
- [ ] 15. Pause menu (ESC) works
- [ ] 16. Map screen shows exploration
- [ ] 17. Inventory shows abilities
- [ ] 18. Save game works
- [ ] 19. Load game restores state
- [ ] 20. Boss fight functional
- [ ] 21. Visual effects present
- [ ] 22. 60 FPS performance
- [ ] 23. No console errors
- [ ] 24. All unit tests pass
- [ ] 25. Integration test passes
- [ ] 26. README exists
- [ ] 27. ARCHITECTURE.md exists
- [ ] 28. CONTROLS.md exists
- [ ] 29. Git history clean

---

## Deliverable Output
**File:** `deliverables/TESTING_VALIDATION_OUTPUT.json`

**If ALL tests pass:**
```json
{
  "agent": "TESTING-VALIDATION",
  "status": "complete",
  "timestamp": "2025-11-20T20:00:00Z",
  "duration_minutes": 30,
  "unit_tests": {
    "total": 7,
    "passed": 7,
    "failed": 0
  },
  "integration_test": {
    "status": "passed",
    "errors": 0
  },
  "performance": {
    "avg_fps": 60,
    "min_fps": 58,
    "max_fps": 61,
    "memory_stable": true,
    "memory_usage_mb": 85,
    "cpu_usage_percent": 12
  },
  "success_criteria": {
    "total": 29,
    "passed": 29,
    "failed": 0,
    "percentage": 100
  },
  "summary": "All tests passed. Game fully functional with 60 FPS sustained performance. No bugs detected. Ready for final assembly."
}
```

**If tests fail:**
```json
{
  "agent": "TESTING-VALIDATION",
  "status": "failed",
  "timestamp": "2025-11-20T20:00:00Z",
  "failed_tests": [
    {
      "test": "test-enemies.html",
      "system": "ENEMY-SYSTEM",
      "error": "EnemyFlyer not spawning correctly",
      "line": "tests/test-enemies.html:45"
    }
  ],
  "success_criteria": {
    "total": 29,
    "passed": 26,
    "failed": 3,
    "failed_items": [8, 20, 21]
  },
  "summary": "3 tests failed. Agents need to fix bugs and re-test."
}
```

---

**Status:** ⏳ WAITING FOR PHASE 5
**Progress:** 0/33 tasks
