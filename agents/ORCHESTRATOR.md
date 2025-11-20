# ORCHESTRATOR Agent Specification

## Role
Project coordination, task distribution, and build orchestration

## Primary Responsibilities

### Phase 1: Project Initialization
1. Read `build-specs/00-overview.md`
2. Read `build-specs/01-project-init.md`
3. Initialize git repository (if not already done)
4. Create complete directory structure
5. Create core infrastructure files:
   - `src/EventBus.js` (central event system)
   - `src/config.js` (Phaser configuration)
   - `index.html` (main entry point with Phaser CDN)
   - `.gitignore` (standard ignores)
6. Commit: "Project initialization complete"
7. Broadcast: `build:phase1:complete`

### Phase 2: Coordination
1. Broadcast: `build:phase2:start` to all system agents
2. Monitor progress from all agents
3. Track completion signals:
   - `system:player:complete`
   - `system:combat:complete`
   - `system:map:complete`
   - `system:ability:complete`
   - `system:enemy:complete`
   - `system:ui:complete`
   - `system:effects:complete`
4. Wait for ALL system agents to complete
5. Trigger STANDARDS-ENFORCEMENT agent
6. Broadcast: `build:phase2:complete`

### Phase 3: Integration Coordination
1. Wait for `validation:complete` from STANDARDS-ENFORCEMENT
2. Signal SCENE-INTEGRATION agent to begin
3. Wait for `integration:complete`
4. Signal TESTING-VALIDATION agent to begin
5. Monitor test results

### Phase 4: Final Verification
1. Wait for `testing:complete`
2. Read `build-specs/00-overview.md` (success criteria section)
3. Verify ALL 29 success criteria items
4. Run final smoke test
5. Generate BUILD-LOG.md with complete build history
6. Commit: "Build complete - all systems verified"
7. Output success message

## Context Requirements

### Files to Read
- `build-specs/00-overview.md` (100 lines)
- `build-specs/01-project-init.md` (80 lines)
- `MASTER_AGENT_CONFIG.md` (for coordination protocol)
- `TODO.md` (for tracking progress)

### Token Budget
5,000 tokens (coordination overhead)

## Output Files

### Created by ORCHESTRATOR
```
/
├── index.html (80 lines)
├── .gitignore (10 lines)
├── src/
│   ├── EventBus.js (40 lines)
│   └── config.js (20 lines)
└── docs/
    └── BUILD-LOG.md (generated at end)
```

## Communication Protocol

### Broadcasts (to all agents)
```javascript
{
  "agent": "ORCHESTRATOR",
  "event": "build:phase2:start",
  "timestamp": "2025-11-20T15:45:00Z",
  "data": {
    "systems_to_build": ["player", "combat", "map", "ability", "enemy", "ui", "effects"],
    "estimated_time": "60-90 minutes",
    "parallel": true
  }
}
```

### Status Monitoring
```javascript
{
  "agent": "ORCHESTRATOR",
  "event": "orchestrator:monitoring",
  "data": {
    "phase": "2",
    "systems_complete": ["player", "combat"],
    "systems_in_progress": ["map", "ability", "enemy", "ui", "effects"],
    "percentage": 28.5,
    "estimated_completion": "2025-11-20T16:30:00Z"
  }
}
```

## Error Handling

### Agent Failure
```
IF system agent emits "agent:failed":
1. Log error details
2. Attempt automatic recovery (re-assign task)
3. If recovery fails after 3 attempts:
   - Mark task as "manual_intervention_required"
   - Update TODO.md with error details
   - Continue with other tasks
   - Report at end of build
```

### Dependency Blocking
```
IF integration agent blocked on dependency:
1. Identify missing system
2. Check if system agent completed
3. If completed but files missing:
   - Re-run system agent
4. If system agent failed:
   - Attempt recovery
5. Update TODO.md with blocking status
```

## Success Criteria Checklist

ORCHESTRATOR verifies these at the end:

### Basic Functionality
- [ ] `index.html` opens without errors
- [ ] Main menu displays with "New Game" button
- [ ] New Game starts in room_01 with player visible
- [ ] WASD keys move player smoothly
- [ ] Space bar makes player jump
- [ ] Shift key makes player dash (if ability unlocked)

### Core Systems
- [ ] Player can transition between rooms
- [ ] Enemies spawn and move
- [ ] Combat damages enemies
- [ ] Enemies can damage player
- [ ] Health bar decreases on damage
- [ ] Collecting ability unlocks it

### Progression
- [ ] Abilities enable new movement
- [ ] Doors check ability requirements
- [ ] Minimap shows current room
- [ ] Pause menu (ESC) works
- [ ] Map screen shows explored rooms

### Persistence
- [ ] Save game works (LocalStorage)
- [ ] Load game restores state
- [ ] Inventory shows unlocked abilities

### Polish
- [ ] Boss fight functional
- [ ] Visual effects present (shake, particles)
- [ ] Game runs at 60 FPS
- [ ] No console errors

### Testing
- [ ] All test files pass
- [ ] README is complete
- [ ] Git history shows progress

## Time Estimates

| Phase | Task | Time |
|-------|------|------|
| 1 | Initialization | 10 min |
| 2 | Monitor systems | 60-90 min |
| 3 | Coordinate integration | 30 min |
| 4 | Monitor testing | 30 min |
| 5 | Final verification | 15 min |
| **Total** | **2.5-3 hours** | **(parallel)** |

## Git Workflow

### Commits by ORCHESTRATOR
```bash
git commit -m "Initialize project structure"
git commit -m "Add core infrastructure files (EventBus, config)"
git commit -m "Phase 1 complete - ready for system development"
# ... monitors other agent commits ...
git commit -m "Build complete - all systems verified"
```

### Branch Management
- Works on: current branch (claude/claude-md-mi7l65t6sp17e46z-01LkRwXJ8GtGhbBcDnRzKHJv)
- Creates no feature branches
- All agents commit to same branch (file isolation prevents conflicts)

## Dependencies

### Must Exist Before Starting
- `build-specs/` directory with all specs
- `MASTER_AGENT_CONFIG.md`
- Git repository initialized

### Creates for Others
- `src/EventBus.js` (required by ALL system agents)
- `src/config.js` (required by SCENE-INTEGRATION)
- Directory structure (required by ALL agents)

## Validation

Before signaling phase complete:
- [ ] All required files created
- [ ] Files contain no syntax errors
- [ ] Git commits successful
- [ ] No duplicate file creations

## Notes

- ORCHESTRATOR does NOT implement game systems
- ORCHESTRATOR delegates to specialist agents
- ORCHESTRATOR focuses on coordination and verification
- ORCHESTRATOR is the ONLY agent that sees the complete picture
- All other agents work in isolation on their specific domain
