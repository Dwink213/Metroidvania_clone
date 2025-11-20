# TESTING-VALIDATION Agent Specification

## Role
Test all systems, verify quality, check performance

## Dependencies
**MUST WAIT FOR:** `integration:complete`

## Responsibilities

### 1. Run All Unit Tests
- Open each test file in sequence
- Verify no console errors
- Check visual output matches expected
- Report failures

### 2. Run Integration Test
- Open tests/integration-test.html
- Play through game flow:
  - Main menu loads
  - New game starts
  - Player can move (WASD)
  - Player can jump (Space)
  - Room transitions work
  - Enemies spawn and behave correctly
  - Combat works (damage dealt/received)
  - Abilities can be collected
  - Save/load works
  - All menus accessible
- Report any failures

### 3. Performance Validation
- Open Chrome DevTools
- Record 30 seconds of gameplay
- Check FPS (should be consistent 60 FPS)
- Check memory usage (should be stable, no leaks)
- Check CPU usage (should be reasonable)

### 4. Success Criteria Verification
Check ALL 29 items from build-specs/00-overview.md:

**Basic Functionality**
- [ ] index.html opens without errors
- [ ] Main menu displays
- [ ] New Game button works
- [ ] Player visible and controllable
- [ ] WASD movement smooth
- [ ] Space jump responsive
- [ ] Shift dash works (when unlocked)

**Core Systems**
- [ ] Room transitions smooth
- [ ] Enemies spawn and move
- [ ] Combat damages enemies
- [ ] Enemies damage player
- [ ] Health bar updates
- [ ] Abilities unlock
- [ ] Abilities enable movement
- [ ] Doors check requirements

**UI/UX**
- [ ] Minimap shows rooms
- [ ] Pause menu works
- [ ] Map screen shows exploration
- [ ] Inventory shows abilities

**Persistence**
- [ ] Save game works
- [ ] Load game restores state

**Polish**
- [ ] Boss fight functional
- [ ] Visual effects present
- [ ] 60 FPS performance
- [ ] No console errors
- [ ] All tests pass
- [ ] README complete
- [ ] Git history clean

## Report Format

### If All Tests Pass
```json
{
  "agent": "TESTING-VALIDATION",
  "event": "testing:complete",
  "timestamp": "2025-11-20T17:00:00Z",
  "data": {
    "unit_tests_passed": 7,
    "integration_test_passed": true,
    "performance": {
      "avg_fps": 60,
      "min_fps": 58,
      "max_fps": 61,
      "memory_stable": true
    },
    "success_criteria": {
      "total": 29,
      "passed": 29,
      "failed": 0
    },
    "status": "success"
  }
}
```

### If Tests Fail
```json
{
  "agent": "TESTING-VALIDATION",
  "event": "testing:failed",
  "data": {
    "failed_systems": ["enemy"],
    "errors": [
      {
        "system": "enemy",
        "test": "test-enemies.html",
        "error": "EnemyFlyer not spawning correctly",
        "line": "tests/test-enemies.html:45"
      }
    ],
    "success_criteria": {
      "total": 29,
      "passed": 26,
      "failed": 3,
      "failed_items": [
        "Enemies spawn and move",
        "Boss fight functional",
        "Visual effects present"
      ]
    },
    "status": "failed"
  }
}
```

## Re-Testing Protocol

If tests fail:
1. Report failures to ORCHESTRATOR
2. ORCHESTRATOR notifies relevant system agent
3. System agent fixes bugs
4. System agent re-emits complete signal
5. TESTING-VALIDATION re-runs failed tests
6. Repeat until all tests pass

## Time: 30 minutes
## Token Budget: 3,000

## Emit: `testing:complete` or `testing:failed`
