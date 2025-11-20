# Coding Standards

## File Organization

### Directory Structure
- Each system has its own directory: `src/player/`, `src/combat/`, etc.
- Related files grouped together
- Tests mirror source structure: `tests/test-player.html`

### Module Size Limits
- **Maximum lines per .js file:** 300 lines
- **Maximum lines per function:** 50 lines
- **Maximum function parameters:** 5 parameters
- **If exceeding limits:** Extract helper functions or create component classes

## Naming Conventions

### Classes
```javascript
// PascalCase
class PlayerController { }
class EnemyBase { }
class MapManager { }
```

### Functions/Methods
```javascript
// camelCase
function getPosition() { }
function isGrounded() { }
function unlockAbility(name) { }
```

### Variables/Properties
```javascript
// camelCase
let currentRoom = 'room_01';
let playerHealth = 100;
this.isDashing = false;
```

### Constants
```javascript
// UPPER_SNAKE_CASE
const MOVE_SPEED = 200;
const JUMP_VELOCITY = -500;
const MAX_FALL_SPEED = 600;
```

### Boolean Properties
```javascript
// Prefix with is/has/can
isGrounded()
hasAbility()
canJump()
isDashing
hasDoubleJumped
```

### Event Names
```javascript
// Format: entity:action
'player:jumped'
'player:landed'
'enemy:defeated'
'ability:unlocked'
'room:changed'
```

## Code Style

### ES6 Syntax
```javascript
// ✅ Use const/let
const speed = 200;
let velocity = 0;

// ❌ No var
var speed = 200;  // FORBIDDEN

// ✅ Arrow functions
const add = (a, b) => a + b;

// ✅ Template literals
console.log(`Player at position ${x}, ${y}`);

// ✅ Destructuring
const { x, y } = player.getPosition();

// ✅ Default parameters
function move(speed = 200) { }
```

### Imports/Exports
```javascript
// ✅ ES6 modules
import EventBus from '../EventBus.js';
import PhysicsConstants from './PhysicsConstants.js';

export default class PlayerController { }

// ❌ No CommonJS
const EventBus = require('../EventBus.js');  // FORBIDDEN
module.exports = PlayerController;  // FORBIDDEN
```

### Classes
```javascript
// ✅ ES6 class syntax
class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
    }

    update(delta) {
        // ...
    }
}

// ❌ No prototype
function Player(scene, x, y) { }  // FORBIDDEN
Player.prototype.update = function() { }  // FORBIDDEN
```

## Comments

### File Headers
```javascript
/**
 * PlayerController.js
 * Handles all player movement, input, and state management
 */
```

### Function Comments
```javascript
/**
 * Calculate jump velocity with variable height
 * @param {boolean} isJumpHeld - Whether jump button is held
 * @returns {number} Modified velocity
 */
function calculateJumpVelocity(isJumpHeld) {
    // Implementation
}
```

### Inline Comments
```javascript
// Use sparingly, only for complex logic
// Good:
// Apply coyote time: allow jump for 0.1s after leaving platform
if (this.coyoteTimer > 0) {
    this.jump();
}

// Bad:
// Increment x
x++;  // Too obvious
```

### No Commented-Out Code
```javascript
// ❌ Remove before committing
// oldFunction();
// console.log('debug');
```

## Error Handling

### Defensive Programming
```javascript
// ✅ Null checks
if (!player || !input) {
    console.error('[GameScene] Invalid parameters');
    return;
}

// ✅ Boundary checks
if (index < 0 || index >= array.length) {
    console.error('[System] Index out of bounds');
    return;
}

// ✅ Type validation
if (typeof speed !== 'number') {
    console.error('[Physics] Speed must be a number');
    return;
}
```

### Try/Catch
```javascript
// ✅ Use for risky operations
try {
    const data = JSON.parse(localStorage.getItem('save'));
    this.loadGame(data);
} catch (error) {
    console.error('[SaveManager] Failed to load save:', error);
    EventBus.emit('error:occurred', {
        system: 'SaveManager',
        method: 'loadGame',
        error: error.message
    });
    // Graceful fallback
    this.startNewGame();
}
```

## Architecture Rules

### Event-Driven Communication
```javascript
// ✅ Use EventBus
import EventBus from '../EventBus.js';

class PlayerController {
    jump() {
        // ...
        EventBus.emit('player:jumped', { position: this.getPosition() });
    }
}

// ❌ No direct system calls
class PlayerController {
    jump() {
        this.hud.updateJumpCounter();  // TIGHT COUPLING - FORBIDDEN
    }
}
```

### Single Responsibility
```javascript
// ✅ One class, one purpose
class PlayerController {
    // ONLY handles player movement and state
}

class CombatController {
    // ONLY handles combat mechanics
}

// ❌ Mixed responsibilities
class PlayerController {
    // Player movement
    // AND combat logic
    // AND UI updates  // FORBIDDEN
}
```

### No Circular Dependencies
```javascript
// ❌ FORBIDDEN
// PlayerController.js
import CombatController from '../combat/CombatController.js';

// CombatController.js
import PlayerController from '../player/PlayerController.js';
```

## Logging

### Use Console Appropriately
```javascript
// ✅ Error logging
console.error('[SystemName] Error description:', error);

// ✅ Debug logging (with flag)
const DEBUG = false;
if (DEBUG) {
    console.log('[PlayerController] Jump executed:', data);
}

// ✅ Audio placeholders
console.log('SFX: jump');
console.log('SFX: dash');

// ❌ Regular console.log in production
console.log('test');  // Remove before committing
```

## Phaser-Specific

### Delta Time
```javascript
// ✅ Always use delta for time-based logic
update(delta) {
    const dt = delta / 1000;  // Convert ms to seconds
    this.timer -= dt;
}

// ❌ Frame-based logic
update() {
    this.timer -= 1;  // Will vary with FPS
}
```

### Physics
```javascript
// ✅ Use Phaser physics
this.sprite.body.setVelocityX(speed);
this.physics.add.collider(player, ground);

// ✅ Check body state
if (this.sprite.body.blocked.down) {
    // On ground
}
```

## Formatting

### Indentation
- **2 spaces** (not tabs)
- Consistent throughout file

### Line Length
- **Maximum 100 characters per line**
- Break long lines appropriately

### Spacing
```javascript
// ✅ Space after keywords
if (condition) { }
for (let i = 0; i < 10; i++) { }

// ✅ Space around operators
const sum = a + b;
const result = x * y + z;

// ✅ No space before function parentheses
function myFunction() { }
const arrow = () => { };
```

### Braces
```javascript
// ✅ Opening brace on same line
if (condition) {
    // code
}

class MyClass {
    method() {
        // code
    }
}
```

## Testing

### Test File Naming
```
tests/test-player.html
tests/test-combat.html
tests/integration-test.html
```

### Test Structure
```html
<!DOCTYPE html>
<html>
<head>
    <title>Player System Test</title>
</head>
<body>
    <h1>Player System Test</h1>
    <div id="game"></div>
    <div id="test-results"></div>

    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
    <script type="module">
        // Test implementation
        console.log('✓ Test passed');
        console.error('✗ Test failed');
    </script>
</body>
</html>
```

## Checklist

Before committing any code:
- [ ] File is under 300 lines
- [ ] Functions are under 50 lines
- [ ] Naming conventions followed
- [ ] No `var` usage
- [ ] ES6 syntax used throughout
- [ ] No tight coupling (uses EventBus)
- [ ] Error handling in place
- [ ] No commented-out code
- [ ] No console.log (except audio/debug)
- [ ] Comments on complex logic only
- [ ] Proper indentation (2 spaces)
- [ ] No circular dependencies
