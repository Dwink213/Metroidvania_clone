# Agent Coordination Flow

## Overview

This document explains how the 11 agents coordinate to build the Metroidvania game from scratch.

---

## Build Flow Diagram

```
START
  ↓
┌─────────────────────────────────────────────┐
│ PHASE 1: Initialization (10 min)           │
│ ORCHESTRATOR                                 │
│ - Creates project structure                 │
│ - Creates EventBus.js, config.js           │
│ - Creates index.html                        │
│ - Output: ORCHESTRATOR_PHASE1_OUTPUT.json  │
└─────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────┐
│ PHASE 2: System Development (60-90 min)    │
│ 7 AGENTS IN PARALLEL                        │
├─────────────────────────────────────────────┤
│ PLAYER-SYSTEM (20 min)                      │
│ ├─ PlayerController.js                      │
│ ├─ InputManager.js                          │
│ ├─ PhysicsConstants.js                      │
│ └─ Output: PLAYER_SYSTEM_OUTPUT.json        │
├─────────────────────────────────────────────┤
│ COMBAT-SYSTEM (20 min)                      │
│ ├─ CombatController.js                      │
│ ├─ HealthComponent.js                       │
│ ├─ Projectile.js, HitDetection.js          │
│ └─ Output: COMBAT_SYSTEM_OUTPUT.json        │
├─────────────────────────────────────────────┤
│ MAP-SYSTEM (25 min)                         │
│ ├─ MapManager.js, RoomData.js              │
│ ├─ rooms.json (8 rooms)                    │
│ └─ Output: MAP_SYSTEM_OUTPUT.json           │
├─────────────────────────────────────────────┤
│ ABILITY-SYSTEM (25 min)                     │
│ ├─ AbilityManager.js, SaveManager.js       │
│ ├─ collectibles.json                        │
│ └─ Output: ABILITY_SYSTEM_OUTPUT.json       │
├─────────────────────────────────────────────┤
│ ENEMY-SYSTEM (30 min)                       │
│ ├─ 5 enemy types + EnemyBase               │
│ ├─ enemies.json                             │
│ └─ Output: ENEMY_SYSTEM_OUTPUT.json         │
├─────────────────────────────────────────────┤
│ UI-SYSTEM (30 min)                          │
│ ├─ HUDController + 9 UI components         │
│ └─ Output: UI_SYSTEM_OUTPUT.json            │
├─────────────────────────────────────────────┤
│ EFFECTS-SYSTEM (15 min)                     │
│ ├─ CameraController, ParticleManager       │
│ └─ Output: EFFECTS_SYSTEM_OUTPUT.json       │
└─────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────┐
│ ORCHESTRATOR: Collect all 7 outputs        │
│ - Read deliverables/*.json                  │
│ - Verify all agents report "complete"      │
│ - Signal Phase 3                            │
└─────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────┐
│ PHASE 3: Standards Validation (15 min)     │
│ STANDARDS-ENFORCEMENT                        │
│ - Check file sizes (<300 lines)            │
│ - Check for tight coupling                  │
│ - Verify error handling                     │
│ - If violations: notify agents to fix      │
│ - Output: STANDARDS_ENFORCEMENT_OUTPUT.json │
└─────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────┐
│ PHASE 4: Integration (30 min)              │
│ SCENE-INTEGRATION                           │
│ - Create BootScene, MainMenuScene          │
│ - Create GameScene (CRITICAL: wires all)   │
│ - Create GameOverScene, main.js            │
│ - Wire ALL systems together                │
│ - Setup event listeners                     │
│ - Configure physics collisions              │
│ - Output: SCENE_INTEGRATION_OUTPUT.json    │
└─────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────┐
│ PHASE 5: Testing & Validation (30 min)     │
│ TESTING-VALIDATION                          │
│ - Run all 7 unit tests                      │
│ - Run integration test                      │
│ - Verify 60 FPS performance                 │
│ - Check all 29 success criteria            │
│ - If failures: notify agents to fix        │
│ - Output: TESTING_VALIDATION_OUTPUT.json   │
└─────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────┐
│ PHASE 6: Final Assembly (15 min)           │
│ ORCHESTRATOR                                │
│ - Collect all deliverables                  │
│ - Verify all 29 success criteria           │
│ - Create README.md                          │
│ - Create docs/ files                        │
│ - Generate BUILD-LOG.md                     │
│ - Output: BUILD_COMPLETE.json               │
└─────────────────────────────────────────────┘
  ↓
BUILD COMPLETE
```

---

## Agent Communication Protocol

### 1. Task Assignment
**ORCHESTRATOR → Agent**
- Updates agent's TODO_*.md file with status "START"
- Agent monitors their TODO file for status changes

### 2. Work in Progress
**Agent → ORCHESTRATOR**
- Agent updates TODO_*.md with progress
- ORCHESTRATOR monitors TODO files every 5 minutes

### 3. Work Complete
**Agent → ORCHESTRATOR**
- Agent updates TODO_*.md status to "COMPLETE"
- Agent writes deliverable JSON to `deliverables/AGENT_OUTPUT.json`
- ORCHESTRATOR reads JSON file for verification

### 4. Error Handling
**Agent → ORCHESTRATOR (if blocked/failed)**
- Agent writes error to deliverable JSON with status "failed" or "blocked"
- ORCHESTRATOR reads error details
- ORCHESTRATOR attempts recovery:
  - Re-dispatch agent with fixed parameters (up to 3 retries)
  - Dispatch helper agent if needed
  - Request manual intervention if all retries fail

---

## File Structure for Coordination

```
Metroidvania_clone/
├── TODO_ORCHESTRATOR.md         ← ORCHESTRATOR's task list
├── TODO_PLAYER_SYSTEM.md        ← PLAYER-SYSTEM's task list
├── TODO_COMBAT_SYSTEM.md        ← COMBAT-SYSTEM's task list
├── TODO_MAP_SYSTEM.md           ← MAP-SYSTEM's task list
├── TODO_ABILITY_SYSTEM.md       ← ABILITY-SYSTEM's task list
├── TODO_ENEMY_SYSTEM.md         ← ENEMY-SYSTEM's task list
├── TODO_UI_SYSTEM.md            ← UI-SYSTEM's task list
├── TODO_EFFECTS_SYSTEM.md       ← EFFECTS-SYSTEM's task list
├── TODO_STANDARDS_ENFORCEMENT.md ← STANDARDS-ENFORCEMENT's task list
├── TODO_SCENE_INTEGRATION.md    ← SCENE-INTEGRATION's task list
├── TODO_TESTING_VALIDATION.md   ← TESTING-VALIDATION's task list
│
├── deliverables/                ← Agent outputs (JSON)
│   ├── ORCHESTRATOR_PHASE1_OUTPUT.json
│   ├── PLAYER_SYSTEM_OUTPUT.json
│   ├── COMBAT_SYSTEM_OUTPUT.json
│   ├── MAP_SYSTEM_OUTPUT.json
│   ├── ABILITY_SYSTEM_OUTPUT.json
│   ├── ENEMY_SYSTEM_OUTPUT.json
│   ├── UI_SYSTEM_OUTPUT.json
│   ├── EFFECTS_SYSTEM_OUTPUT.json
│   ├── STANDARDS_ENFORCEMENT_OUTPUT.json
│   ├── SCENE_INTEGRATION_OUTPUT.json
│   ├── TESTING_VALIDATION_OUTPUT.json
│   └── BUILD_COMPLETE.json
│
└── BUILD_STATUS.json            ← Current build state (updated by ORCHESTRATOR)
```

---

## Deliverable JSON Format

Each agent produces a JSON file with this structure:

```json
{
  "agent": "AGENT-NAME",
  "status": "complete|failed|blocked",
  "timestamp": "ISO-8601",
  "duration_minutes": 20,
  "files_created": [
    {"path": "src/...", "lines": 100, "purpose": "..."}
  ],
  "total_lines": 486,
  "git_commit": "abc123",
  "tests": {"total": 13, "passed": 13, "failed": 0},
  "events_emitted": ["event:name", ...],
  "events_listened": ["event:name", ...],
  "dependencies": {
    "required": ["EventBus.js"],
    "provides_to": ["Other systems"]
  },
  "validation": {
    "size_check": "pass",
    "syntax_check": "pass",
    "coupling_check": "pass"
  },
  "summary": "Brief description of what was built",
  "usage_instructions": "How to use this system"
}
```

---

## ORCHESTRATOR Monitoring

### Every 5 Minutes:
```bash
# Check agent progress
for todo in TODO_*_SYSTEM.md; do
  agent=$(basename $todo .md | sed 's/TODO_//')
  status=$(grep "Status:" $todo | head -1)
  progress=$(grep "Progress:" $todo | head -1)
  echo "$agent: $status | $progress"
done

# Check for completed deliverables
ls -lh deliverables/*.json
```

### When Agent Completes:
```bash
# Read agent output
agent_output=$(cat deliverables/PLAYER_SYSTEM_OUTPUT.json)

# Verify status
status=$(echo $agent_output | jq -r '.status')

if [ "$status" == "complete" ]; then
  echo "✅ PLAYER-SYSTEM complete"
  # Update BUILD_STATUS.json
else
  echo "❌ PLAYER-SYSTEM failed"
  # Handle error
fi
```

---

## Parallel Execution Strategy

### Phase 2 Parallelization
All 7 system agents run simultaneously because:
- ✅ No file conflicts (each agent works in separate directories)
- ✅ No dependencies (all use EventBus, no direct imports)
- ✅ Independent testing (each has own test file)
- ✅ Isolated git commits (separate src/ subdirectories)

### Estimated Time Savings
- **Sequential:** 20+20+25+25+30+30+15 = 165 minutes (2h 45m)
- **Parallel:** max(20,20,25,25,30,30,15) = 30 minutes
- **Savings:** 135 minutes (2h 15m) → **82% faster!**

---

## Error Recovery Protocol

### Scenario 1: Agent Reports Failure
```
1. ORCHESTRATOR reads error from deliverable JSON
2. Identify failure type:
   - Syntax error → Re-dispatch with error details
   - Logic error → Re-dispatch with fix instructions
   - Missing dependency → Create dependency first
3. Retry up to 3 times
4. If still failing → Manual intervention
```

### Scenario 2: Agent Timeout (No Response in 45 min)
```
1. ORCHESTRATOR detects no progress for 45 minutes
2. Check TODO file for last update
3. Check deliverable JSON (if exists)
4. Options:
   - Re-dispatch agent (fresh start)
   - Dispatch helper agent to complete
   - Manual investigation
```

### Scenario 3: Standards Validation Fails
```
1. STANDARDS-ENFORCEMENT reports violations
2. ORCHESTRATOR identifies violating agents
3. Re-dispatch specific agents with fix instructions
4. Agents fix code and re-commit
5. Re-run STANDARDS-ENFORCEMENT
6. Repeat until pass
```

### Scenario 4: Tests Fail
```
1. TESTING-VALIDATION reports failures
2. ORCHESTRATOR identifies failing systems
3. Re-dispatch relevant agents to fix bugs
4. Agents fix and re-commit
5. Re-run failed tests only
6. Repeat until all pass
```

---

## Success Metrics

### Build Complete When:
- ✅ All 11 agents report "complete"
- ✅ All 29 success criteria pass
- ✅ All tests pass (7 unit + 1 integration)
- ✅ 60 FPS performance sustained
- ✅ No console errors
- ✅ BUILD_COMPLETE.json generated

### Output Artifacts:
- 🎮 Playable game (index.html + src/ + assets/)
- 📄 README.md (how to play)
- 📄 docs/ARCHITECTURE.md (system design)
- 📄 docs/CONTROLS.md (controls guide)
- 📄 docs/BUILD-LOG.md (build history)
- 📄 BUILD_COMPLETE.json (final report)

---

## Quick Reference

### Start a Build
```bash
# ORCHESTRATOR begins
# Phase 1: Execute TODO_ORCHESTRATOR.md Phase 1 tasks
# Output: deliverables/ORCHESTRATOR_PHASE1_OUTPUT.json

# Phase 2: Signal all 7 system agents
# They work in parallel
# Wait for all deliverables/*.json files

# Phase 3-6: Continue sequentially
```

### Check Build Status
```bash
# View ORCHESTRATOR's tracking
cat TODO_ORCHESTRATOR.md

# View agent statuses
grep "Status:" TODO_*_SYSTEM.md

# View progress
grep "Progress:" TODO_*.md

# View outputs
cat deliverables/*.json | jq '.summary'
```

### Resume After Interrupt
```bash
# Check BUILD_STATUS.json for current phase
# Check which agents completed (deliverables/*.json)
# Re-dispatch incomplete agents
# Continue from last completed phase
```

---

**This coordination system ensures:**
- 🚀 Maximum parallelization (82% faster)
- 🔍 Clear visibility into progress
- 🛡️ Error recovery at every stage
- 📊 Complete audit trail (all JSON outputs)
- 🎯 Guaranteed quality (validation + testing)
