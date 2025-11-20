# PLAYER-SYSTEM Agent Specification

## Role
Implement player movement, input handling, and physics

## Primary Responsibilities

1. Read `build-specs/systems/player-system.md`
2. Read `build-specs/standards/coding-standards.md`
3. Read `build-specs/standards/error-prevention.md`
4. Implement all player system files
5. Create unit test for player system
6. Commit: "Player system complete"
7. Emit: `system:player:complete`

## Files to Create

### src/player/PhysicsConstants.js (50 lines)
```javascript
export default {
    // Movement
    MOVE_SPEED: 200,
    ACCELERATION: 1200,
    FRICTION: 800,

    // Jumping
    JUMP_VELOCITY: -500,
    JUMP_RELEASE_DECELERATION: 0.5,
    GRAVITY: 800,
    MAX_FALL_SPEED: 600,

    // Special moves
    DASH_SPEED: 400,
    DASH_DURATION: 0.3,
    DASH_COOLDOWN: 0.5,

    // Wall mechanics
    WALL_SLIDE_FRICTION: 0.5,
    WALL_JUMP_HORIZONTAL: 300,
    WALL_JUMP_VERTICAL: -450,

    // Grace periods
    COYOTE_TIME: 0.1,
    JUMP_BUFFER: 0.1
};
```

### src/player/InputManager.js (100 lines)
**Purpose:** Handle keyboard input
**Methods:**
- `setupKeys()` - Register WASD + Arrow keys + Space + Shift
- `isUpPressed()` - Check up input
- `isDownPressed()` - Check down input
- `isLeftPressed()` - Check left input
- `isRightPressed()` - Check right input
- `isJumpPressed()` - Check jump held
- `isJumpJustPressed()` - Check jump just pressed
- `isDashPressed()` - Check dash just pressed
- `isPausePressed()` - Check ESC just pressed

**Key Mappings:**
- Movement: WASD or Arrow keys
- Jump: Space
- Dash: Shift
- Pause: ESC

### src/player/PlayerController.js (200 lines max)
**Purpose:** Main player logic and movement
**Properties:**
- `sprite` - Phaser sprite (blue rectangle 32x32)
- `facing` - 'left' or 'right'
- `abilities` - Object tracking unlocked abilities
- `hasDoubleJumped` - Boolean
- `coyoteTimer` - Float
- `jumpBufferTimer` - Float
- `dashTimer` - Float
- `dashCooldown` - Float
- `isDashing` - Boolean
- `isWallSliding` - Boolean
- `wallDirection` - -1, 0, or 1

**Methods:**
- `constructor(scene, x, y)` - Initialize player
- `update(delta, input)` - Main update loop (called every frame)
- `jump()` - Execute jump
- `wallJump()` - Execute wall jump
- `dash()` - Execute dash
- `isGrounded()` - Check if on platform
- `getPosition()` - Return {x, y}
- `getVelocity()` - Return {x, y}
- `getFacing()` - Return 'left' or 'right'
- `unlockAbility(abilityName)` - Unlock movement ability
- `takeDamage(amount, knockbackDirection)` - Handle damage

**Event Emissions:**
- `player:jumped` - When jump executed
- `player:landed` - When touching ground after falling
- `player:dashed` - When dash executed
- `player:wallJumped` - When wall jump executed
- `player:damaged` - When taking damage

**Update Loop Logic:**
```
1. Update timers (coyote, jumpBuffer, dash, dashCooldown)
2. Check grounded state
3. Handle jump buffering
4. If dashing: skip other movement, return
5. Handle horizontal movement with acceleration/friction
6. Detect wall sliding
7. Apply wall slide physics
8. Handle jump (coyote, double jump, wall jump)
9. Variable jump height (release early)
10. Glide if ability unlocked
11. Dash if ability unlocked and input pressed
```

**State Machine:**
```
Grounded ──jump──> Jumping
         ──dash──> Dashing

Jumping ──land──> Grounded
        ──doubleJump──> Jumping (in air)
        ──wallContact + wallJump ability──> WallSliding

WallSliding ──jump──> WallJumping
            ──leave wall──> Falling

Dashing ──timer expire──> previous state

Falling ──land──> Grounded
        ──glide ability + hold jump──> Gliding
```

## Context Requirements

### Files to Read
- `build-specs/systems/player-system.md` (150 lines)
- `build-specs/standards/coding-standards.md` (150 lines)
- `build-specs/standards/error-prevention.md` (120 lines)
- `src/EventBus.js` (created by ORCHESTRATOR)

### Token Budget
3,000 tokens

## Dependencies

### Must Exist Before Starting
- `src/EventBus.js` (created by ORCHESTRATOR)
- Phaser engine (loaded via CDN in index.html)

### No Dependencies On
- Other system agents (works in parallel)

## Testing

### Create: tests/test-player.html (150 lines)
**Test Cases:**
1. Player sprite renders at spawn position
2. WASD keys move player left/right
3. Space bar makes player jump
4. Jump has variable height (release early = shorter jump)
5. Coyote time allows jump 0.1s after leaving platform
6. Jump buffer queues jump input 0.1s before landing
7. Dash moves player horizontally at DASH_SPEED
8. Dash has cooldown (can't spam)
9. Wall slide slows fall when touching wall
10. Wall jump pushes away from wall
11. Double jump works when ability unlocked
12. Glide slows fall when ability unlocked
13. Player can't move during dash
14. Player emits correct events
15. Physics constants are respected

## Code Quality Standards

### Module Size
- PlayerController.js: MAX 200 lines
- InputManager.js: MAX 100 lines
- PhysicsConstants.js: MAX 50 lines
- If exceeding, extract helper functions

### Error Handling
```javascript
// Example: Defensive programming
update(delta, input) {
    if (!delta || !input) {
        console.error('[PlayerController] Invalid update parameters');
        return;
    }

    try {
        const dt = delta / 1000;
        // ... movement logic
    } catch (error) {
        console.error('[PlayerController] Error in update:', error);
        EventBus.emit('error:occurred', {
            system: 'PlayerController',
            method: 'update',
            error: error.message
        });
    }
}
```

### Naming Compliance
- ✅ Classes: PascalCase (PlayerController, InputManager)
- ✅ Methods: camelCase (getPosition, isGrounded)
- ✅ Properties: camelCase (isDashing, coyoteTimer)
- ✅ Constants: UPPER_SNAKE_CASE (MOVE_SPEED, JUMP_VELOCITY)
- ✅ Events: entity:action (player:jumped, player:landed)

## Physics Tuning Notes

### Feel Guidelines
- **Responsive:** Input to action should feel instant
- **Smooth:** Use acceleration, not instant velocity changes
- **Forgiving:** Coyote time and jump buffer make platforming easier
- **Weighty:** Gravity should feel substantial but not floaty
- **Snappy:** Dash should feel quick and powerful

### Common Pitfalls
- ❌ Don't set velocity directly (use acceleration)
- ❌ Don't ignore delta time (game speed will vary with FPS)
- ❌ Don't hardcode values (use PhysicsConstants)
- ❌ Don't forget to emit events (other systems depend on them)
- ❌ Don't allow double jump spam (check hasDoubleJumped flag)

## Time Estimate
20 minutes (focused implementation)

## Git Workflow
```bash
git add src/player/
git add tests/test-player.html
git commit -m "$(cat <<'EOF'
Implement player system

- PlayerController with smooth movement physics
- InputManager for keyboard handling
- PhysicsConstants for tuning values
- Support for dash, wall jump, double jump, glide
- Coyote time and jump buffer for better feel
- Complete unit test suite

Files created:
- src/player/PlayerController.js (195 lines)
- src/player/InputManager.js (98 lines)
- src/player/PhysicsConstants.js (48 lines)
- tests/test-player.html (145 lines)

Total: 486 lines
EOF
)"
```

## Success Criteria

Before emitting `system:player:complete`:
- [ ] All 3 files created in src/player/
- [ ] test-player.html created
- [ ] All files under size limits
- [ ] No syntax errors (run test-player.html)
- [ ] Player sprite visible and responds to input
- [ ] Events emit correctly to EventBus
- [ ] Committed to git
- [ ] No tight coupling to other systems

## Communication

### Emit When Complete
```javascript
{
  "agent": "PLAYER-SYSTEM",
  "event": "system:player:complete",
  "timestamp": "2025-11-20T16:05:00Z",
  "data": {
    "files_created": [
      "src/player/PlayerController.js",
      "src/player/InputManager.js",
      "src/player/PhysicsConstants.js"
    ],
    "tests_created": ["tests/test-player.html"],
    "lines_of_code": 486,
    "status": "success",
    "validation": {
      "syntax_errors": 0,
      "size_violations": 0,
      "coupling_violations": 0
    }
  }
}
```

## Notes

- Player system is INDEPENDENT - can be built in parallel with other systems
- Uses ONLY EventBus for communication (no direct system calls)
- All movement logic is self-contained
- Abilities are gated by boolean flags (set by ABILITY-SYSTEM agent later)
- Visual representation is placeholder (blue rectangle) - can be upgraded to sprites later
