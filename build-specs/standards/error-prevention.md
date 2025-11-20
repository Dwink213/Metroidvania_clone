# Error Prevention Framework

## Defensive Programming Patterns

### Input Validation
```javascript
// Always validate external inputs
function takeDamage(amount, knockback) {
    // Validate parameters
    if (typeof amount !== 'number' || amount < 0) {
        console.error('[HealthComponent] Invalid damage amount:', amount);
        return;
    }

    if (!knockback || typeof knockback.x !== 'number') {
        console.error('[HealthComponent] Invalid knockback:', knockback);
        return;
    }

    // Proceed with validated inputs
    this.health -= amount;
    this.applyKnockback(knockback);
}
```

### Null/Undefined Checks
```javascript
// Check before accessing properties
function update(delta, input) {
    if (!delta || !input) {
        console.error('[PlayerController] Missing required parameters');
        return;
    }

    if (!this.sprite || !this.sprite.body) {
        console.error('[PlayerController] Sprite not initialized');
        return;
    }

    // Safe to proceed
    const dt = delta / 1000;
    // ...
}
```

### Array Bounds Checking
```javascript
// Always check array access
function getRoom(index) {
    if (!Array.isArray(this.rooms)) {
        console.error('[MapManager] Rooms array not initialized');
        return null;
    }

    if (index < 0 || index >= this.rooms.length) {
        console.error(`[MapManager] Room index out of bounds: ${index}`);
        return null;
    }

    return this.rooms[index];
}
```

## Try/Catch Patterns

### JSON Parsing
```javascript
// Always wrap JSON operations
function loadSaveData() {
    try {
        const json = localStorage.getItem('metroidvania_save');
        if (!json) {
            console.log('[SaveManager] No save data found');
            return null;
        }

        const data = JSON.parse(json);
        return data;
    } catch (error) {
        console.error('[SaveManager] Failed to parse save data:', error);
        EventBus.emit('error:occurred', {
            system: 'SaveManager',
            method: 'loadSaveData',
            error: error.message
        });
        return null;
    }
}
```

### File Loading
```javascript
// Wrap risky fetch operations
async function loadRoomData() {
    try {
        const response = await fetch('assets/data/rooms.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[MapManager] Failed to load room data:', error);
        EventBus.emit('error:occurred', {
            system: 'MapManager',
            method: 'loadRoomData',
            error: error.message
        });
        // Return default room data
        return this.getDefaultRoomData();
    }
}
```

### Physics Operations
```javascript
// Wrap Phaser physics calls
function applyKnockback(direction, force) {
    try {
        if (!this.sprite || !this.sprite.body) {
            throw new Error('Sprite not initialized');
        }

        this.sprite.body.setVelocity(
            direction.x * force,
            direction.y * force
        );
    } catch (error) {
        console.error('[CombatController] Failed to apply knockback:', error);
        // Game continues even if knockback fails
    }
}
```

## Fail-Fast Principles

### Early Returns
```javascript
// Validate inputs immediately, return early
function unlockAbility(abilityName) {
    // Fail fast on invalid input
    if (!abilityName || typeof abilityName !== 'string') {
        console.error('[AbilityManager] Invalid ability name');
        return false;
    }

    if (!this.abilities.hasOwnProperty(abilityName)) {
        console.error(`[AbilityManager] Unknown ability: ${abilityName}`);
        return false;
    }

    if (this.abilities[abilityName]) {
        console.log(`[AbilityManager] Ability already unlocked: ${abilityName}`);
        return false;
    }

    // All validation passed, proceed
    this.abilities[abilityName] = true;
    EventBus.emit('ability:unlocked', { id: abilityName });
    return true;
}
```

### Assertions
```javascript
// Use assertions for critical invariants
function spawnEnemy(enemyData) {
    console.assert(enemyData, 'Enemy data is required');
    console.assert(enemyData.type, 'Enemy type is required');
    console.assert(enemyData.x !== undefined, 'Enemy x position required');
    console.assert(enemyData.y !== undefined, 'Enemy y position required');

    // Proceed only if assertions pass
    const enemy = this.createEnemy(enemyData);
    return enemy;
}
```

## Graceful Degradation

### Non-Critical System Failures
```javascript
// If minimap fails, game continues
function updateMinimap(roomId) {
    try {
        if (!this.minimapDisplay) {
            console.warn('[HUDController] Minimap not initialized, skipping update');
            return;  // Game continues without minimap
        }

        this.minimapDisplay.setActiveRoom(roomId);
    } catch (error) {
        console.error('[HUDController] Minimap update failed:', error);
        // Game continues, minimap just doesn't update
    }
}
```

### Fallback Values
```javascript
// Provide sensible defaults
function getPhysicsConstant(name) {
    const constants = {
        MOVE_SPEED: 200,
        JUMP_VELOCITY: -500,
        // ...
    };

    if (!constants.hasOwnProperty(name)) {
        console.warn(`[PhysicsConstants] Unknown constant: ${name}, using default`);
        return 0;  // Fallback value
    }

    return constants[name];
}
```

### Save Failure Handling
```javascript
// If save fails, notify but continue playing
function saveGame() {
    try {
        const saveData = this.generateSaveData();
        const json = JSON.stringify(saveData);
        localStorage.setItem('metroidvania_save', json);
        console.log('[SaveManager] Game saved successfully');
        EventBus.emit('game:saved', { success: true });
    } catch (error) {
        console.error('[SaveManager] Failed to save game:', error);
        EventBus.emit('game:saved', { success: false, error: error.message });
        // Show notification to user, but game continues
        EventBus.emit('ui:notification', {
            message: 'Failed to save game. Please check browser storage.',
            type: 'error'
        });
    }
}
```

## Event Error Handling

### Emit with Error Catching
```javascript
// EventBus already wraps callbacks in try/catch
// But still emit errors for logging
function handleEvent(data) {
    try {
        // Event handling logic
        this.processData(data);
    } catch (error) {
        console.error('[SystemName] Error handling event:', error);
        EventBus.emit('error:occurred', {
            system: 'SystemName',
            event: 'eventName',
            error: error.message,
            data: data
        });
    }
}
```

### Listener Validation
```javascript
// Validate event listeners
EventBus.on('player:jumped', (data) => {
    if (!data || !data.position) {
        console.error('[CombatController] Invalid player:jumped data');
        return;
    }

    // Safe to use data
    this.spawnDustParticles(data.position);
});
```

## Memory Leak Prevention

### Event Cleanup
```javascript
class GameScene extends Phaser.Scene {
    create() {
        // Store references for cleanup
        this.eventHandlers = {
            playerJumped: (data) => this.handlePlayerJumped(data),
            enemyDefeated: (data) => this.handleEnemyDefeated(data)
        };

        EventBus.on('player:jumped', this.eventHandlers.playerJumped);
        EventBus.on('enemy:defeated', this.eventHandlers.enemyDefeated);
    }

    shutdown() {
        // Clean up event listeners
        EventBus.off('player:jumped', this.eventHandlers.playerJumped);
        EventBus.off('enemy:defeated', this.eventHandlers.enemyDefeated);

        // Clear references
        this.eventHandlers = null;
    }
}
```

### Sprite Cleanup
```javascript
// Destroy sprites when done
function removeEnemy(enemy) {
    if (enemy.sprite) {
        enemy.sprite.destroy();  // Phaser cleanup
        enemy.sprite = null;
    }
    // Remove from tracking array
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
        this.enemies.splice(index, 1);
    }
}
```

## Debug Mode

### Conditional Logging
```javascript
const DEBUG = false;  // Set true during development

class PlayerController {
    update(delta, input) {
        if (DEBUG) {
            console.log('[PlayerController] Update:', {
                position: this.getPosition(),
                velocity: this.getVelocity(),
                grounded: this.isGrounded(),
                abilities: this.abilities
            });
        }

        // Normal update logic
        // ...
    }
}
```

### Debug Visualization
```javascript
// Enable physics debug mode
export default {
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: DEBUG  // Shows hitboxes when true
        }
    }
};
```

## Common Pitfalls to Avoid

### 1. Forgetting Delta Time
```javascript
// ❌ BAD: Frame-dependent
update() {
    this.x += 5;  // Speed varies with FPS
}

// ✅ GOOD: Frame-independent
update(delta) {
    const dt = delta / 1000;
    this.x += this.speed * dt;  // Consistent speed
}
```

### 2. Mutating Shared State
```javascript
// ❌ BAD: Modifying shared object
function modifyPosition(pos) {
    pos.x += 10;  // Mutates original
}

// ✅ GOOD: Return new object
function modifyPosition(pos) {
    return { x: pos.x + 10, y: pos.y };
}
```

### 3. Ignoring Async Errors
```javascript
// ❌ BAD: Unhandled promise
fetch('data.json').then(res => res.json());

// ✅ GOOD: Handle errors
fetch('data.json')
    .then(res => res.json())
    .catch(error => console.error('Failed to load data:', error));
```

### 4. Tight Coupling
```javascript
// ❌ BAD: Direct system reference
class PlayerController {
    jump() {
        this.ui.updateJumpCounter();  // Tight coupling
    }
}

// ✅ GOOD: Event-driven
class PlayerController {
    jump() {
        EventBus.emit('player:jumped', { position: this.getPosition() });
    }
}
```

### 5. Magic Numbers
```javascript
// ❌ BAD: Unexplained numbers
if (velocity > 600) { }

// ✅ GOOD: Named constants
const MAX_FALL_SPEED = 600;
if (velocity > MAX_FALL_SPEED) { }
```

## Error Checklist

Before committing:
- [ ] All external inputs validated
- [ ] Null/undefined checks on risky operations
- [ ] Try/catch on JSON parsing
- [ ] Try/catch on file loading
- [ ] Graceful degradation for non-critical failures
- [ ] Event listeners cleaned up properly
- [ ] No memory leaks (sprites destroyed)
- [ ] Debug logging behind DEBUG flag
- [ ] Error events emitted to EventBus
- [ ] Fallback values for missing data
