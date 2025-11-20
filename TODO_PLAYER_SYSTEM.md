# TODO: PLAYER-SYSTEM Agent

**Agent Role:** Player Movement, Input, and Physics
**Status:** ⏳ WAITING FOR PHASE 2 START
**Dependencies:** EventBus.js (created by ORCHESTRATOR Phase 1)

---

## Assignment

Implement complete player control system with smooth physics-based movement, input handling, and special abilities (dash, wall jump, double jump, glide).

---

## Tasks

### 1. Read Specifications
- [ ] Read `agents/PLAYER-SYSTEM.md` (complete agent spec)
- [ ] Read `build-specs/standards/coding-standards.md`
- [ ] Read `build-specs/standards/error-prevention.md`
- [ ] Verify `src/EventBus.js` exists

### 2. Create Physics Constants
- [ ] Create `src/player/PhysicsConstants.js` (50 lines)
  - Movement: MOVE_SPEED (200), ACCELERATION (1200), FRICTION (800)
  - Jumping: JUMP_VELOCITY (-500), MAX_FALL_SPEED (600)
  - Special: DASH_SPEED (400), DASH_DURATION (0.3), DASH_COOLDOWN (0.5)
  - Wall: WALL_SLIDE_FRICTION (0.5), WALL_JUMP_HORIZONTAL (300), WALL_JUMP_VERTICAL (-450)
  - Grace: COYOTE_TIME (0.1), JUMP_BUFFER (0.1)

### 3. Create Input Manager
- [ ] Create `src/player/InputManager.js` (100 lines max)
  - Setup WASD + Arrow keys + Space + Shift + ESC
  - Methods: isLeftPressed(), isRightPressed(), isUpPressed(), isDownPressed()
  - Methods: isJumpPressed(), isJumpJustPressed(), isDashPressed(), isPausePressed()
  - Handle both WASD and arrow keys simultaneously

### 4. Create Player Controller
- [ ] Create `src/player/PlayerController.js` (200 lines max)
  - Constructor: Initialize sprite (blue 32x32 rectangle), physics body
  - Properties: facing, abilities{}, hasDoubleJumped, coyoteTimer, jumpBufferTimer, dashTimer, dashCooldown, isDashing, isWallSliding, wallDirection
  - update(delta, input): Main game loop
    - Update timers
    - Check grounded state
    - Handle jump buffering
    - Handle dashing
    - Horizontal movement with acceleration/friction
    - Wall slide detection
    - Jump handling (coyote, double jump, wall jump)
    - Variable jump height
    - Glide
  - jump(): Execute jump, emit 'player:jumped'
  - wallJump(): Execute wall jump, emit 'player:wallJumped'
  - dash(): Execute dash, emit 'player:dashed'
  - isGrounded(): Check if on platform
  - getPosition(): Return {x, y}
  - getVelocity(): Return {x, y}
  - getFacing(): Return 'left'/'right'
  - unlockAbility(name): Unlock movement ability
  - takeDamage(amount, knockback): Handle damage, emit 'player:damaged'

### 5. Create Test File
- [ ] Create `tests/test-player.html` (150 lines)
  - Test player sprite renders
  - Test WASD/arrow movement
  - Test jump (Space)
  - Test variable jump height
  - Test coyote time (jump 0.1s after leaving platform)
  - Test jump buffer (press jump 0.1s before landing)
  - Test dash (Shift)
  - Test dash cooldown
  - Test wall slide
  - Test wall jump
  - Test double jump (when unlocked)
  - Test glide (when unlocked)
  - Test event emissions
  - Verify physics constants respected

### 6. Self-Validation
- [ ] All files under size limits (PhysicsConstants <50, InputManager <100, PlayerController <200)
- [ ] No syntax errors (run test-player.html)
- [ ] Player responds to input
- [ ] Movement feels smooth
- [ ] Events emit correctly to EventBus
- [ ] No tight coupling (only uses EventBus)
- [ ] Error handling in place
- [ ] Follows coding standards

### 7. Git Commit
- [ ] Stage files: `git add src/player/ tests/test-player.html`
- [ ] Commit with message:
```bash
git commit -m "Implement player system

- PlayerController with smooth acceleration-based movement
- InputManager for WASD + Arrow + Space + Shift input
- PhysicsConstants for all tuning values
- Support for dash, wall jump, double jump, glide
- Coyote time (0.1s) and jump buffer (0.1s) for better feel
- Complete unit test suite with 13 test cases

Files created:
- src/player/PlayerController.js (195 lines)
- src/player/InputManager.js (98 lines)
- src/player/PhysicsConstants.js (48 lines)
- tests/test-player.html (145 lines)

Total: 486 lines
Events: player:jumped, player:landed, player:dashed, player:wallJumped, player:damaged
"
```

---

## Deliverable Output

**File to Create:** `deliverables/PLAYER_SYSTEM_OUTPUT.json`

```json
{
  "agent": "PLAYER-SYSTEM",
  "status": "complete",
  "timestamp": "2025-11-20T16:20:00Z",
  "duration_minutes": 20,
  "files_created": [
    {
      "path": "src/player/PlayerController.js",
      "lines": 195,
      "purpose": "Main player movement logic with state machine"
    },
    {
      "path": "src/player/InputManager.js",
      "lines": 98,
      "purpose": "Keyboard input handling for WASD, arrows, jump, dash"
    },
    {
      "path": "src/player/PhysicsConstants.js",
      "lines": 48,
      "purpose": "All movement tuning values centralized"
    },
    {
      "path": "tests/test-player.html",
      "lines": 145,
      "purpose": "Unit test suite with 13 test cases"
    }
  ],
  "total_lines": 486,
  "git_commit": "abc123def",
  "tests": {
    "total": 13,
    "passed": 13,
    "failed": 0
  },
  "events_emitted": [
    "player:jumped",
    "player:landed",
    "player:dashed",
    "player:wallJumped",
    "player:damaged"
  ],
  "events_listened": [],
  "dependencies": {
    "required": ["EventBus.js", "Phaser 3.70.0"],
    "provides_to": ["All systems via EventBus"]
  },
  "validation": {
    "size_check": "pass",
    "syntax_check": "pass",
    "coupling_check": "pass",
    "error_handling": "pass"
  },
  "summary": "Complete player movement system with smooth acceleration-based physics. Implements dash (400px/s), wall jump, double jump, and glide abilities. Includes coyote time (0.1s) and jump buffer (0.1s) for responsive platforming feel. All movement tuning centralized in PhysicsConstants for easy adjustment. Events emitted for all major actions to decouple from other systems.",
  "usage_instructions": "Instantiate in GameScene: `this.player = new PlayerController(this, x, y);` Call `update(delta, input)` every frame with InputManager instance. Listen to player events via EventBus for integration with other systems. Unlock abilities with `unlockAbility('dash')` to enable special moves."
}
```

---

## Communication with ORCHESTRATOR

### When Complete
1. Update this TODO file status to "✅ COMPLETE"
2. Write `deliverables/PLAYER_SYSTEM_OUTPUT.json`
3. ORCHESTRATOR will read output and verify

### If Blocked
1. Update status to "⏸️ BLOCKED"
2. Write error to output JSON with status: "blocked"
3. ORCHESTRATOR will attempt resolution

### If Failed
1. Update status to "❌ FAILED"
2. Write error details to output JSON
3. ORCHESTRATOR will retry or escalate

---

## Current Status
**Status:** ⏳ WAITING FOR PHASE 2 START
**Progress:** 0/7 tasks complete
**Next Action:** Wait for ORCHESTRATOR to signal Phase 2 start

---

**Last Updated:** 2025-11-20 (Initial creation)
