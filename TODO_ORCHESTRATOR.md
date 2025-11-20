# TODO: ORCHESTRATOR Agent

**Agent Role:** Project Coordinator & Build Manager
**Status:** ⏳ READY TO START
**Dependencies:** None (starts first)

---

## Phase 1: Project Initialization
**Duration:** 10 minutes
**Status:** ⏳ PENDING

### Tasks
- [ ] Verify git repository status
- [ ] Create root directory structure
- [ ] Create index.html with Phaser CDN
- [ ] Create src/EventBus.js (central event system)
- [ ] Create src/config.js (Phaser configuration)
- [ ] Create .gitignore file
- [ ] Commit: "Initialize project structure"

### Output to Deliver
**File:** `deliverables/ORCHESTRATOR_PHASE1_OUTPUT.json`
```json
{
  "agent": "ORCHESTRATOR",
  "phase": "1-initialization",
  "status": "complete",
  "timestamp": "2025-11-20T...",
  "files_created": [
    "index.html",
    "src/EventBus.js",
    "src/config.js",
    ".gitignore"
  ],
  "directories_created": [
    "src/player",
    "src/combat",
    "src/map",
    "src/abilities",
    "src/enemies",
    "src/ui",
    "src/effects",
    "src/scenes",
    "assets/images",
    "assets/audio/music",
    "assets/audio/sfx",
    "assets/data",
    "tests",
    "docs"
  ],
  "git_commit": "1a2b3c4d",
  "ready_for_phase2": true,
  "summary": "Project structure initialized. EventBus and Phaser config created. Ready for system development."
}
```

---

## Phase 2: Dispatch System Agents (Parallel)
**Duration:** Monitor 60-90 minutes
**Status:** ⏳ PENDING

### Tasks
- [ ] Broadcast start signal to all 7 system agents
- [ ] Monitor TODO files for each agent:
  - [ ] Check TODO_PLAYER_SYSTEM.md
  - [ ] Check TODO_COMBAT_SYSTEM.md
  - [ ] Check TODO_MAP_SYSTEM.md
  - [ ] Check TODO_ABILITY_SYSTEM.md
  - [ ] Check TODO_ENEMY_SYSTEM.md
  - [ ] Check TODO_UI_SYSTEM.md
  - [ ] Check TODO_EFFECTS_SYSTEM.md
- [ ] Collect output from each agent's deliverable file
- [ ] Verify all agents report "complete"
- [ ] Signal STANDARDS-ENFORCEMENT agent

### Agents to Dispatch
```json
{
  "phase2_agents": [
    {
      "agent": "PLAYER-SYSTEM",
      "todo_file": "TODO_PLAYER_SYSTEM.md",
      "output_file": "deliverables/PLAYER_SYSTEM_OUTPUT.json",
      "estimated_time": "20 min"
    },
    {
      "agent": "COMBAT-SYSTEM",
      "todo_file": "TODO_COMBAT_SYSTEM.md",
      "output_file": "deliverables/COMBAT_SYSTEM_OUTPUT.json",
      "estimated_time": "20 min"
    },
    {
      "agent": "MAP-SYSTEM",
      "todo_file": "TODO_MAP_SYSTEM.md",
      "output_file": "deliverables/MAP_SYSTEM_OUTPUT.json",
      "estimated_time": "25 min"
    },
    {
      "agent": "ABILITY-SYSTEM",
      "todo_file": "TODO_ABILITY_SYSTEM.md",
      "output_file": "deliverables/ABILITY_SYSTEM_OUTPUT.json",
      "estimated_time": "25 min"
    },
    {
      "agent": "ENEMY-SYSTEM",
      "todo_file": "TODO_ENEMY_SYSTEM.md",
      "output_file": "deliverables/ENEMY_SYSTEM_OUTPUT.json",
      "estimated_time": "30 min"
    },
    {
      "agent": "UI-SYSTEM",
      "todo_file": "TODO_UI_SYSTEM.md",
      "output_file": "deliverables/UI_SYSTEM_OUTPUT.json",
      "estimated_time": "30 min"
    },
    {
      "agent": "EFFECTS-SYSTEM",
      "todo_file": "TODO_EFFECTS_SYSTEM.md",
      "output_file": "deliverables/EFFECTS_SYSTEM_OUTPUT.json",
      "estimated_time": "15 min"
    }
  ]
}
```

### Monitoring Process
```bash
# Check agent progress every 5 minutes
while true; do
  echo "=== Agent Status Check ==="
  for todo in TODO_*_SYSTEM.md; do
    agent=$(basename $todo .md | sed 's/TODO_//')
    status=$(grep "Status:" $todo | head -1)
    echo "$agent: $status"
  done
  sleep 300  # 5 minutes
done
```

### Expected Collected Outputs
All 7 agent output JSON files in `deliverables/` directory

---

## Phase 3: Dispatch Standards Enforcement
**Duration:** 15 minutes
**Status:** ⏳ PENDING

### Tasks
- [ ] Wait for ALL Phase 2 agents to complete
- [ ] Signal STANDARDS-ENFORCEMENT agent
- [ ] Monitor TODO_STANDARDS_ENFORCEMENT.md
- [ ] Collect validation output
- [ ] If violations found:
  - [ ] Identify violating agents
  - [ ] Re-dispatch agents to fix issues
  - [ ] Re-run standards enforcement
- [ ] Verify validation passes

### Agent to Dispatch
```json
{
  "agent": "STANDARDS-ENFORCEMENT",
  "todo_file": "TODO_STANDARDS_ENFORCEMENT.md",
  "output_file": "deliverables/STANDARDS_ENFORCEMENT_OUTPUT.json",
  "dependencies": ["ALL Phase 2 agents"]
}
```

---

## Phase 4: Dispatch Scene Integration
**Duration:** 30 minutes
**Status:** ⏳ PENDING

### Tasks
- [ ] Wait for standards validation to pass
- [ ] Signal SCENE-INTEGRATION agent
- [ ] Monitor TODO_SCENE_INTEGRATION.md
- [ ] Collect integration output
- [ ] Verify all systems wired together
- [ ] Test that index.html opens without errors

### Agent to Dispatch
```json
{
  "agent": "SCENE-INTEGRATION",
  "todo_file": "TODO_SCENE_INTEGRATION.md",
  "output_file": "deliverables/SCENE_INTEGRATION_OUTPUT.json",
  "dependencies": ["ALL Phase 2 agents", "STANDARDS-ENFORCEMENT"]
}
```

---

## Phase 5: Dispatch Testing & Validation
**Duration:** 30 minutes
**Status:** ⏳ PENDING

### Tasks
- [ ] Wait for scene integration to complete
- [ ] Signal TESTING-VALIDATION agent
- [ ] Monitor TODO_TESTING_VALIDATION.md
- [ ] Collect test results
- [ ] If tests fail:
  - [ ] Identify failing systems
  - [ ] Re-dispatch relevant agents to fix bugs
  - [ ] Re-run failed tests
- [ ] Verify all 29 success criteria pass

### Agent to Dispatch
```json
{
  "agent": "TESTING-VALIDATION",
  "todo_file": "TODO_TESTING_VALIDATION.md",
  "output_file": "deliverables/TESTING_VALIDATION_OUTPUT.json",
  "dependencies": ["SCENE-INTEGRATION"]
}
```

---

## Phase 6: Final Assembly & Documentation
**Duration:** 15 minutes
**Status:** ⏳ PENDING

### Tasks
- [ ] Collect all agent deliverables
- [ ] Verify all 29 success criteria from build-specs/00-overview.md
- [ ] Create README.md for game
- [ ] Create docs/ARCHITECTURE.md
- [ ] Create docs/CONTROLS.md
- [ ] Create docs/BUILD-LOG.md (summary of entire build)
- [ ] Run final smoke test
- [ ] Generate build report
- [ ] Commit: "Build complete - all systems verified"

### Final Deliverable
**File:** `BUILD_COMPLETE.json`
```json
{
  "build_status": "complete",
  "timestamp": "2025-11-20T...",
  "duration": "2h 45m",
  "success_criteria": {
    "total": 29,
    "passed": 29,
    "failed": 0
  },
  "agents_used": 11,
  "files_created": 52,
  "total_lines_of_code": 2905,
  "commits": 12,
  "phases_completed": 6,
  "agent_reports": [
    "deliverables/PLAYER_SYSTEM_OUTPUT.json",
    "deliverables/COMBAT_SYSTEM_OUTPUT.json",
    "deliverables/MAP_SYSTEM_OUTPUT.json",
    "deliverables/ABILITY_SYSTEM_OUTPUT.json",
    "deliverables/ENEMY_SYSTEM_OUTPUT.json",
    "deliverables/UI_SYSTEM_OUTPUT.json",
    "deliverables/EFFECTS_SYSTEM_OUTPUT.json",
    "deliverables/STANDARDS_ENFORCEMENT_OUTPUT.json",
    "deliverables/SCENE_INTEGRATION_OUTPUT.json",
    "deliverables/TESTING_VALIDATION_OUTPUT.json"
  ],
  "summary": "Complete Metroidvania game built successfully with 11 agents in parallel. All systems functional, tests passing, 60 FPS achieved. Game ready to play."
}
```

---

## Success Criteria Verification

### Must Verify ALL 29 Items:
- [ ] index.html opens without errors
- [ ] Main menu displays
- [ ] New Game button works
- [ ] Player visible and moves (WASD)
- [ ] Space bar jump works
- [ ] Shift dash works (when unlocked)
- [ ] Room transitions smooth
- [ ] Enemies spawn and move
- [ ] Combat works (damage dealt/received)
- [ ] Health bar updates
- [ ] Abilities unlock
- [ ] Abilities enable new movement
- [ ] Doors check requirements
- [ ] Minimap shows rooms
- [ ] Pause menu (ESC) works
- [ ] Map screen shows exploration
- [ ] Inventory shows abilities
- [ ] Save game works
- [ ] Load game restores state
- [ ] Boss fight functional
- [ ] Visual effects present
- [ ] 60 FPS performance
- [ ] No console errors
- [ ] All tests pass
- [ ] README complete
- [ ] ARCHITECTURE.md complete
- [ ] CONTROLS.md complete
- [ ] BUILD-LOG.md complete
- [ ] Git history clean

---

## Coordination Protocol

### Starting a Phase
1. Read relevant agent TODO file
2. Check agent dependencies are met
3. Signal agent to start (update TODO file status)
4. Monitor progress

### Receiving Agent Output
1. Agent updates their TODO file to "COMPLETE"
2. Agent writes deliverable JSON to `deliverables/` directory
3. ORCHESTRATOR reads output JSON
4. ORCHESTRATOR validates output format
5. ORCHESTRATOR updates BUILD_STATUS.json

### Handling Failures
1. Agent reports failure in output JSON
2. ORCHESTRATOR logs error
3. ORCHESTRATOR attempts recovery:
   - Re-dispatch agent with fixed parameters
   - Dispatch helper agent if needed
   - Manual intervention request if 3 retries fail
4. Update BUILD_STATUS.json with issue

### Communication Files
- `BUILD_STATUS.json` - Current build state (updated by ORCHESTRATOR)
- `deliverables/*.json` - Agent outputs (written by agents, read by ORCHESTRATOR)
- `TODO_*.md` - Agent task lists (read/write by agents, monitored by ORCHESTRATOR)

---

## Output Summary to Generate

When ORCHESTRATOR completes, generate:

**BUILD-LOG.md** containing:
- Build timeline
- All agent reports
- Issues encountered and resolved
- Performance metrics
- Final verification results

**Example:**
```markdown
# Build Log - Metroidvania Game

## Build Summary
- **Start Time:** 2025-11-20 15:00:00
- **End Time:** 2025-11-20 17:45:00
- **Duration:** 2h 45m
- **Status:** ✅ SUCCESS

## Agent Reports

### PLAYER-SYSTEM (20 min)
- Created 3 files (486 lines)
- All tests passed
- Summary: Smooth player movement with dash, wall jump, double jump, glide

### COMBAT-SYSTEM (20 min)
- Created 5 files (280 lines)
- All tests passed
- Summary: Melee/ranged combat with invincibility frames and knockback

[... etc for all agents ...]

## Issues & Resolutions
- None

## Performance Metrics
- 60 FPS sustained
- Memory stable (no leaks)
- Load time: <2 seconds

## Success Criteria: 29/29 ✅
```

---

## Current Status
**Phase:** Not started
**Progress:** 0%
**Next Action:** Execute Phase 1 initialization

---

**Last Updated:** 2025-11-20 (Initial creation)
