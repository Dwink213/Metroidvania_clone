# TODO: STANDARDS-ENFORCEMENT Agent

**Agent Role:** Code Quality Validation
**Status:** ⏳ WAITING FOR PHASE 3 START
**Dependencies:** ALL Phase 2 agents must complete

---

## Tasks
- [ ] Wait for ALL system agents to complete
- [ ] Read `agents/STANDARDS-ENFORCEMENT.md`
- [ ] Check all file sizes (<300 lines)
- [ ] Check function sizes (<50 lines)
- [ ] Verify naming conventions
- [ ] Check for tight coupling (must use EventBus)
- [ ] Verify error handling patterns
- [ ] Check for circular dependencies
- [ ] Check for `var` usage (forbidden)
- [ ] Check for console.log (except audio/debug)
- [ ] Generate validation report

---

## Validation Commands
```bash
# File sizes
find src/ -name "*.js" -exec sh -c 'lines=$(wc -l < "$1"); if [ $lines -gt 300 ]; then echo "$1: $lines VIOLATION"; fi' _ {} \;

# Tight coupling check
grep -r "import.*from.*'\.\./(?!EventBus)" src/

# var usage
grep -r "var " src/

# console.log (except SFX:)
grep -r "console\.log" src/ | grep -v "SFX:"
```

---

## Deliverable Output
**File:** `deliverables/STANDARDS_ENFORCEMENT_OUTPUT.json`

**If ALL checks pass:**
```json
{
  "agent": "STANDARDS-ENFORCEMENT",
  "status": "complete",
  "timestamp": "2025-11-20T19:00:00Z",
  "duration_minutes": 15,
  "files_checked": 42,
  "violations": {
    "file_size": 0,
    "function_size": 0,
    "naming": 0,
    "coupling": 0,
    "error_handling": 0,
    "var_usage": 0,
    "console_log": 0
  },
  "validation_passed": true,
  "summary": "All 42 source files passed standards validation. Zero violations found. Code quality excellent."
}
```

**If violations found:**
```json
{
  "agent": "STANDARDS-ENFORCEMENT",
  "status": "failed",
  "timestamp": "2025-11-20T19:00:00Z",
  "violations": [
    {
      "type": "file_size",
      "file": "src/enemies/EnemyMiniBoss.js",
      "issue": "350 lines (max 300)",
      "severity": "high",
      "fix_agent": "ENEMY-SYSTEM"
    },
    {
      "type": "coupling",
      "file": "src/ui/HUDController.js",
      "issue": "Direct import of CombatController",
      "severity": "high",
      "fix_agent": "UI-SYSTEM"
    }
  ],
  "summary": "2 violations found. Agents notified for fixes."
}
```

---

**Status:** ⏳ WAITING FOR PHASE 3
**Progress:** 0/10 tasks
