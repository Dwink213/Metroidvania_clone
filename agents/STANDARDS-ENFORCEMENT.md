# STANDARDS-ENFORCEMENT Agent Specification

## Role
Enforce coding standards, check module sizes, validate architecture

## Dependencies
**MUST WAIT FOR:** ALL system complete signals

## Responsibilities

### 1. File Size Validation
Check ALL .js files:
```bash
find src/ -name "*.js" -exec wc -l {} \;
```
- MAX 300 lines per file
- Report violations

### 2. Function Size Check
For each .js file, check functions:
- MAX 50 lines per function
- Use regex or manual inspection
- Report violations

### 3. Naming Convention Check
- Classes: PascalCase ✓
- Methods: camelCase ✓
- Properties: camelCase ✓
- Constants: UPPER_SNAKE_CASE ✓
- Events: entity:action ✓

### 4. Architecture Validation
- [ ] No tight coupling (no direct system calls)
- [ ] All communication via EventBus
- [ ] No circular dependencies
- [ ] Proper file organization
- [ ] Single responsibility per module

### 5. Error Handling Check
Each .js file should have:
- Try/catch on risky operations
- Null checks on external inputs
- EventBus error emissions
- Console.error logging

### 6. Code Quality
- [ ] No console.log (except for audio placeholders)
- [ ] No commented-out code
- [ ] No TODO comments left
- [ ] Consistent indentation
- [ ] ES6 syntax (no var)

## Validation Checklist

Run these checks:
```bash
# Check file sizes
find src/ -name "*.js" -exec sh -c 'lines=$(wc -l < "$1"); if [ $lines -gt 300 ]; then echo "$1: $lines lines (VIOLATION)"; fi' _ {} \;

# Check for tight coupling (grep for direct imports)
grep -r "import.*from.*'\.\./(?!EventBus)" src/

# Check for var usage
grep -r "var " src/

# Check for console.log (except in specific cases)
grep -r "console\.log" src/ | grep -v "SFX:"

# Check event naming
grep -r "EventBus.emit" src/ | grep -v ":[a-z]"
```

## Report Format

### If All Checks Pass
```json
{
  "agent": "STANDARDS-ENFORCEMENT",
  "event": "validation:complete",
  "timestamp": "2025-11-20T16:45:00Z",
  "data": {
    "files_checked": 35,
    "violations": {
      "file_size": 0,
      "function_size": 0,
      "naming": 0,
      "coupling": 0,
      "error_handling": 0
    },
    "status": "success"
  }
}
```

### If Violations Found
```json
{
  "agent": "STANDARDS-ENFORCEMENT",
  "event": "validation:failed",
  "data": {
    "violations": [
      {
        "type": "file_size",
        "file": "src/enemies/EnemyMiniBoss.js",
        "issue": "350 lines (max 300)",
        "severity": "high"
      },
      {
        "type": "coupling",
        "file": "src/ui/HUDController.js",
        "issue": "Direct import of CombatController",
        "severity": "high"
      },
      {
        "type": "error_handling",
        "file": "src/map/MapManager.js",
        "issue": "No try/catch in loadRoom() method",
        "severity": "medium"
      }
    ],
    "status": "failed"
  }
}
```

## Re-Validation Protocol

If validation fails:
1. Report violations to ORCHESTRATOR
2. ORCHESTRATOR notifies violating system agents
3. System agents fix violations
4. System agents re-emit complete signal
5. STANDARDS-ENFORCEMENT re-validates
6. Repeat until all checks pass

## Time: 15 minutes
## Token Budget: 2,000

## Emit: `validation:complete` or `validation:failed`
