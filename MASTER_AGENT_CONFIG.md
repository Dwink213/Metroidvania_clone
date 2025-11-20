# 🤖 METROIDVANIA MULTI-AGENT BUILD SYSTEM
## Master Agent Configuration File

---

## 📋 INSTRUCTIONS FOR CLAUDE CODE

**READ THIS FIRST:**

This file contains 8 specialized agent configurations for building a complete Metroidvania game. Your task:

1. **Extract each agent configuration** (marked with `## AGENT [NUMBER]`) into separate files
2. **Create directory structure**: `.agents/` in your git repo
3. **Save each agent** as `.agents/agent-[number]-[name].md`
4. **Commit to git**: "Agent configurations initialized"
5. **Execute agents** in the order specified in EXECUTION PLAN section
6. **Reference agent files** as needed during build (read from `.agents/` directory)

### Auto-Extraction Process

Run this process automatically:

```bash
# Create agents directory
mkdir -p .agents

# Extract and save each agent configuration
# (You'll do this programmatically by parsing this file)
```

### Agent File Structure

After extraction, you should have:
```
.agents/
├── agent-1-player-controller.md
├── agent-2-combat-system.md
├── agent-3-map-system.md
├── agent-4-ability-system.md
├── agent-5-enemy-ai.md
├── agent-6-ui-system.md
├── agent-7-integration.md
└── agent-8-testing-qa.md
```

### Execution Strategy

**PARALLEL EXECUTION (Recommended):**
- Agents 1-6 can run simultaneously (no dependencies)
- Agent 7 runs after 1-6 complete (integration)
- Agent 8 runs after 7 completes (QA)

**SEQUENTIAL EXECUTION (Alternative):**
- Run agents 1→2→3→4→5→6→7→8 in order
- Each completes fully before next starts

---

## 🎯 EXECUTION PLAN

### Phase 1: Setup (5 minutes)
1. Read this master file
2. Extract all agent configurations
3. Create `.agents/` directory structure
4. Save 8 agent markdown files
5. Commit: "Agent system initialized"

### Phase 2: Parallel Build (90-180 minutes)
Launch agents 1-6 simultaneously:
- Agent 1: Player movement system
- Agent 2: Combat and health system
- Agent 3: Map and room system
- Agent 4: Ability and progression system
- Agent 5: Enemy AI system
- Agent 6: UI and HUD system

### Phase 3: Integration (60-90 minutes)
Launch Agent 7:
- Integrate all systems from agents 1-6
- Wire up event communications
- Add visual polish
- Create main game loop

### Phase 4: Testing (30-60 minutes)
Launch Agent 8:
- Run comprehensive tests
- Fix bugs
- Performance optimization
- Final verification

### Phase 5: Completion
- Verify all success criteria met
- Output completion message
- Provide download instructions

---

## AGENT 1: PLAYER MOVEMENT CONTROLLER
### File: `.agents/agent-1-player-controller.md`

```markdown
# AGENT 1: Player Movement Controller

## Role
Core Player Movement Specialist - You are responsible for the foundational player controller that makes the game feel responsive and tight.

## Technology Stack
- Phaser.js 3.x (Arcade Physics)
- JavaScript ES6
- Event-driven architecture

## Mission
Build a complete, production-ready player movement system with:
- Smooth 8-direction movement (WASD/Arrow keys)
- Variable jump height (hold jump = higher jump)
- Wall jump mechanics
- Dash ability
- Coyote time (6 frames grace period after leaving platform)
- Jump buffering (press jump 6 frames before landing = auto-jump)
- Smooth acceleration/deceleration
- Collision detection with platforms

## Physics Specifications

### Movement
- Base speed: 200 pixels/second
- Acceleration: 1200 px/s²
- Friction: 800 px/s² (when no input)
- Max velocity: 200 px/s horizontal, 600 px/s vertical (falling)

### Jumping
- Jump velocity: -500 pixels/second
- Gravity: 800 pixels/second²
- Jump release deceleration: 0.5x (when button released)
- Coyote time: 0.1 seconds (6 frames at 60fps)
- Jump buffer: 0.1 seconds (6 frames at 60fps)

### Special Moves
- Dash speed: 400 pixels/second
- Dash duration: 0.3 seconds
- Dash cooldown: 0.5 seconds
- Wall slide friction: 0.5x gravity
- Wall jump horizontal: 300 px/s away from wall
- Wall jump vertical: -450 px/s

## File Structure

Create these files in `src/player/`:

### 1. `PhysicsConstants.js`
Export all physics values as constants for easy tuning.

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

### 2. `InputManager.js`
Abstract input handling to support multiple input sources.

```javascript
export default class InputManager {
    constructor(scene) {
        this.scene = scene;
        this.setupKeys();
    }
    
    setupKeys() {
        const { W, A, S, D, SPACE, SHIFT, ESC, UP, LEFT, DOWN, RIGHT } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            up: W, left: A, down: S, right: D,
            jump: SPACE, dash: SHIFT, pause: ESC,
            upAlt: UP, leftAlt: LEFT, downAlt: DOWN, rightAlt: RIGHT
        });
    }
    
    isUpPressed() { return this.keys.up.isDown || this.keys.upAlt.isDown; }
    isDownPressed() { return this.keys.down.isDown || this.keys.downAlt.isDown; }
    isLeftPressed() { return this.keys.left.isDown || this.keys.leftAlt.isDown; }
    isRightPressed() { return this.keys.right.isDown || this.keys.rightAlt.isDown; }
    isJumpPressed() { return this.keys.jump.isDown; }
    isJumpJustPressed() { return Phaser.Input.Keyboard.JustDown(this.keys.jump); }
    isDashPressed() { return Phaser.Input.Keyboard.JustDown(this.keys.dash); }
    isPausePressed() { return Phaser.Input.Keyboard.JustDown(this.keys.pause); }
}
```

### 3. `PlayerController.js`
Main player controller with full movement logic.

**Key Requirements:**
- Implement coyote time (can jump briefly after leaving platform)
- Implement jump buffering (pressing jump before landing = auto-jump)
- Variable jump height (release button = shorter jump)
- Wall slide when touching wall in air
- Wall jump launches away from wall
- Dash moves player at high speed, ignoring other input
- Smooth acceleration/deceleration
- State tracking: grounded, wall sliding, dashing, etc.

**Public API (for integration):**
```javascript
class PlayerController {
    constructor(scene, x, y);
    update(delta, input);              // Called every frame
    
    // State queries
    isGrounded();
    getPosition();                      // Returns {x, y}
    getVelocity();                      // Returns {x, y}
    getFacing();                        // Returns 'left' or 'right'
    
    // Ability management
    unlockAbility(abilityName);        // Enable dash, doubleJump, etc.
    
    // Combat integration
    takeDamage(amount, knockbackDir);  // Handle damage from enemies
    
    // Events emitted (via EventBus):
    // - 'player:jumped'
    // - 'player:landed'
    // - 'player:dashed'
    // - 'player:wallJumped'
}
```

### 4. `test-player-scene.js`
Standalone test scene with platforms to verify movement.

```javascript
// Create test scene with:
// - Ground platform
// - Floating platforms at various heights
// - Walls for wall jump testing
// - Visual feedback for state (color changes when dashing, etc.)
```

## Integration Points

### Inputs from Other Agents:
- **Map System** (Agent 3): Collision layer for platforms/walls
- **Ability System** (Agent 4): Ability unlock notifications

### Outputs to Other Agents:
- **Combat System** (Agent 2): Player position, facing direction
- **Map System** (Agent 3): Position for room transition detection
- **Enemy AI** (Agent 5): Player position for enemy detection
- **UI System** (Agent 6): State for HUD indicators

### Event Bus Integration:
```javascript
import EventBus from '../EventBus.js';

// Emit events:
EventBus.emit('player:jumped', { position: this.getPosition() });
EventBus.emit('player:landed', { position: this.getPosition() });
EventBus.emit('player:dashed', { position, direction });
EventBus.emit('player:wallJumped', { position, direction });

// Listen for events:
EventBus.on('ability:unlocked', (ability) => {
    this.unlockAbility(ability.id);
});
EventBus.on('player:damaged', (data) => {
    this.takeDamage(data.amount, data.knockback);
});
```

## Testing Checklist

Before marking complete, verify:
- [ ] Player moves smoothly with WASD and arrow keys
- [ ] Jump feels responsive, not floaty
- [ ] Holding jump = higher jump, tapping = short hop
- [ ] Can jump within 0.1s after leaving platform (coyote time)
- [ ] Pressing jump before landing triggers jump (buffer)
- [ ] Dash moves player quickly for exactly 0.3 seconds
- [ ] Dash has cooldown, can't spam
- [ ] Wall slide slows descent when touching wall
- [ ] Wall jump launches away from wall
- [ ] Acceleration feels smooth, not instant
- [ ] Friction stops player smoothly
- [ ] No jitter or stuttering in movement
- [ ] Unlocking abilities enables new movement options

## Deliverables

1. ✅ `src/player/PhysicsConstants.js`
2. ✅ `src/player/InputManager.js`
3. ✅ `src/player/PlayerController.js`
4. ✅ `tests/test-player.html` with visual test scene
5. ✅ README section documenting controls and physics values
6. ✅ Git commit: "Agent 1: Player controller complete"

## Success Criteria

Player movement feels **tight and responsive**. Players should have precise control and the movement should feel "good" - this is the foundation of the entire game. If movement doesn't feel right, the whole game suffers.

**Reference games for feel:** Hollow Knight, Celeste, Ori and the Blind Forest

---

**STATUS:** Ready for execution
**DEPENDENCIES:** None (can start immediately)
**ESTIMATED TIME:** 60-90 minutes
```

---

## AGENT 2: COMBAT & HEALTH SYSTEM
### File: `.agents/agent-2-combat-system.md`

```markdown
# AGENT 2: Combat & Health System

## Role
Combat System Specialist - You are responsible for satisfying, impactful combat with clear visual feedback.

## Technology Stack
- Phaser.js 3.x (Arcade Physics for hitboxes)
- JavaScript ES6
- Event-driven damage system

## Mission
Build a complete combat system with:
- Melee attack system (sword/whip style)
- Ranged attack system (projectiles)
- Damage calculation with invincibility frames
- Health management (current/max HP)
- Knockback system
- Hit detection and collision
- Damage number display
- Death and respawn logic

## Combat Specifications

### Melee Attack
- Damage: 10 HP per hit
- Range: 60 pixels in front of player
- Attack duration: 0.2 seconds (hitbox active)
- Cooldown: 0.4 seconds between attacks
- Hitbox: Rectangle 60x40 pixels

### Ranged Attack
- Damage: 5 HP per projectile
- Projectile speed: 400 pixels/second
- Projectile lifetime: 2 seconds or until collision
- Cooldown: 0.6 seconds between shots
- Visual: Simple colored rectangle/circle

### Health System
- Player starting HP: 100
- Player max HP: 100 (upgradeable to 200)
- Invincibility duration: 1.5 seconds after taking damage
- Visual feedback: Sprite flashes during invincibility
- Death triggers game over scene

### Knockback
- Horizontal force: 300 pixels/second
- Vertical force: -200 pixels/second (slight upward)
- Duration: 0.3 seconds
- Direction: Away from damage source

## File Structure

Create these files in `src/combat/`:

### 1. `CombatController.js`
Main combat system coordinator.

**Public API:**
```javascript
class CombatController {
    constructor(scene, player);
    update(delta);
    
    // Attack methods
    performMeleeAttack();              // Trigger melee attack
    performRangedAttack(direction);    // Fire projectile
    
    // Damage handling
    takeDamage(amount, source);        // Player takes damage
    dealDamage(target, amount);        // Deal damage to target
    
    // State queries
    isInvincible();                    // Check if player has i-frames
    getCurrentHealth();
    getMaxHealth();
    isAttacking();                     // Currently in attack animation
    
    // Integration
    getMeleeDamage();                  // For other systems to query
    getRangedDamage();
    
    // Events emitted:
    // - 'combat:meleeAttack'
    // - 'combat:rangedAttack'
    // - 'combat:hit' (when attack connects)
    // - 'combat:damaged' (when player damaged)
    // - 'combat:died'
    // - 'combat:healthChanged'
}
```

### 2. `HealthComponent.js`
Reusable health management component.

```javascript
class HealthComponent {
    constructor(currentHP, maxHP);
    
    takeDamage(amount);                // Returns actual damage dealt
    heal(amount);                      // Returns actual healing done
    isDead();
    getHealth();
    getMaxHealth();
    setMaxHealth(newMax);              // For health upgrades
    getHealthPercentage();             // For UI bars (0-1)
}
```

### 3. `Projectile.js`
Projectile class for ranged attacks.

```javascript
class Projectile {
    constructor(scene, x, y, direction, speed, damage);
    update(delta);
    destroy();
    
    // Physics body for collision detection
    // Auto-destroys on wall hit or lifetime expiry
}
```

### 4. `HitDetection.js`
Collision and hit detection utility.

```javascript
class HitDetection {
    static checkMeleeHit(attackerPos, facing, range, targets);
    static checkProjectileHit(projectile, targets);
    static isInRange(pos1, pos2, range);
    static getKnockbackDirection(attackerPos, targetPos);
}
```

### 5. `DamageNumber.js`
Floating damage number effect.

```javascript
class DamageNumber {
    constructor(scene, x, y, damage);
    // Creates text that floats upward and fades out
    // Red for player damage, white for enemy damage
    // Lifetime: 1 second
}
```

### 6. `test-combat-scene.js`
Test scene with dummy enemies to hit.

## Integration Points

### Inputs from Other Agents:
- **Player Controller** (Agent 1): Player position, facing direction, state
- **Enemy AI** (Agent 5): Enemy positions for hit detection
- **Map System** (Agent 3): Collision for projectiles

### Outputs to Other Agents:
- **Player Controller** (Agent 1): Knockback forces
- **Enemy AI** (Agent 5): Damage events
- **UI System** (Agent 6): Health data for health bar
- **Ability System** (Agent 4): Health upgrade application

### Event Bus Integration:
```javascript
// Emit combat events:
EventBus.emit('combat:meleeAttack', { position, direction });
EventBus.emit('combat:rangedAttack', { projectile });
EventBus.emit('combat:hit', { target, damage, position });
EventBus.emit('combat:damaged', { amount, remaining, source });
EventBus.emit('combat:died', { position });
EventBus.emit('combat:healthChanged', { current, max, percentage });

// Listen for events:
EventBus.on('player:attacked', (data) => {
    if (data.type === 'melee') this.performMeleeAttack();
    if (data.type === 'ranged') this.performRangedAttack(data.direction);
});

EventBus.on('ability:healthUpgrade', (data) => {
    this.health.setMaxHealth(data.newMax);
});
```

## Visual Feedback Requirements

### On Attack
- Brief freeze frame (0.05s) on hit
- Screen shake (3 pixels for 0.2s)
- Hit flash on target (white sprite tint)
- Damage number floats up
- console.log('SFX: attack_hit')

### On Damage Taken
- Player sprite flashes (0.1s white, 0.1s normal, repeat 3x)
- Screen shake (5 pixels for 0.3s)
- Knockback movement
- Red damage number
- console.log('SFX: player_hurt')

### On Death
- Player sprite fades out (0.5s)
- Screen fade to black (1s)
- Transition to game over scene
- console.log('SFX: player_death')

## Testing Checklist

- [ ] Melee attack creates hitbox in correct position
- [ ] Melee attack hits enemies in range
- [ ] Ranged attack fires projectile in facing direction
- [ ] Projectiles travel at correct speed
- [ ] Projectiles destroy on wall/enemy hit
- [ ] Damage numbers appear and float upward
- [ ] Health decreases on damage
- [ ] Invincibility frames prevent damage
- [ ] Invincibility visual feedback (flashing) works
- [ ] Knockback pushes player away from source
- [ ] Death triggers game over
- [ ] Health bar updates match actual health
- [ ] Can't spam attacks (cooldowns work)
- [ ] Attack animations feel impactful

## Deliverables

1. ✅ `src/combat/CombatController.js`
2. ✅ `src/combat/HealthComponent.js`
3. ✅ `src/combat/Projectile.js`
4. ✅ `src/combat/HitDetection.js`
5. ✅ `src/combat/DamageNumber.js`
6. ✅ `tests/test-combat.html`
7. ✅ Git commit: "Agent 2: Combat system complete"

## Success Criteria

Combat feels **satisfying and impactful**. Hits should feel meaty with good feedback. Players should always know when they're hitting enemies and when they're taking damage.

**Reference games for combat feel:** Hollow Knight, Dead Cells, Castlevania

---

**STATUS:** Ready for execution
**DEPENDENCIES:** None (can start immediately, Player Controller integration happens in Phase 3)
**ESTIMATED TIME:** 60-90 minutes
```

---

## AGENT 3: MAP & ROOM SYSTEM
### File: `.agents/agent-3-map-system.md`

```markdown
# AGENT 3: Map & Room System

## Role
Map System Architect - You are responsible for the interconnected world structure and room transitions.

## Technology Stack
- Phaser.js 3.x (Tilemap system)
- JavaScript ES6
- JSON data structures for map layout

## Mission
Build a complete map system with:
- Tile-based room design (32x32 pixel tiles)
- Minimum 8 interconnected rooms
- Smooth room transition system (screen wipe/fade)
- Save point locations
- Minimap generation from map data
- Collision layer for platforms/walls
- Background layers for visual depth
- Door/gate system for progression
- Ability-gated doors

## Room Specifications

### Room Dimensions
- Size: 40 tiles wide × 22 tiles tall
- Pixel size: 1280×704 (at 32px per tile)
- Tile size: 32×32 pixels

### Tile Types
1. **Solid** - Blocks movement (platforms, walls)
2. **Platform** - One-way collision (can jump through from below)
3. **Hazard** - Deals damage on contact
4. **Background** - No collision, visual only
5. **Decoration** - Foreground decoration, no collision

### Door Types
1. **Open** - Free passage between rooms
2. **Locked** - Requires specific key item
3. **Ability-gated** - Requires ability (dash, double jump, etc.)

### Transition System
- Fade duration: 0.5 seconds
- Screen wipe effect (optional visual enhancement)
- Player spawns at designated entry point in new room
- Old room unloaded, new room loaded

## Map Layout Design

Create 8 interconnected rooms:

```
Layout:
      [03-Locked]
           |
[05]---[01-Start]---[02]---[04]
                      |
                    [06]
                      |
              [07]--[08-Boss]
```

### Room Descriptions:

**Room 01 - Starting Chamber**
- Safe starting area
- Basic platforms for tutorial movement
- No enemies
- Connections: East (open), North (locked - needs key), West (ability-gated - needs dash)

**Room 02 - Eastern Corridor**
- First combat encounter (2-3 Patroller enemies)
- Platforming challenges
- Contains "Dash" ability pickup
- Connections: West (to 01), East (to 04), South (ability-gated - needs double jump)

**Room 03 - Northern Vault**
- Locked room (requires key from Room 04)
- Contains "Health Upgrade" collectible
- No enemies (reward room)
- Connections: South (back to 01)

**Room 04 - Eastern Heights**
- Vertical platforming
- Contains "Key" item for Room 03
- 2 Flyer enemies
- Connections: West (to 02)

**Room 05 - Western Depths**
- Requires "Dash" ability to access
- Contains "Double Jump" ability
- 3 enemies (mix of types)
- Connections: East (to 01)

**Room 06 - Southern Cavern**
- Requires "Double Jump" to access from Room 02
- Contains "Wall Jump" ability
- Platforming gauntlet with 2 Shooters
- Connections: North (to 02), South (to 07)

**Room 07 - Lower Ruins**
- Advanced platforming requiring multiple abilities
- Save point location
- 4 mixed enemies
- Connections: North (to 06), East (to 08)

**Room 08 - Boss Chamber**
- Large room (1.5x normal size)
- Mini-boss enemy
- Locked door behind boss
- Connections: West (to 07)

## File Structure

Create these files in `src/map/`:

### 1. `RoomData.js`
Complete room definitions.

```javascript
export default {
    "room_01": {
        id: "room_01",
        name: "Starting Chamber",
        width: 1280,
        height: 704,
        tileSize: 32,
        spawnPoint: { x: 320, y: 480 },
        
        // Connections to other rooms
        connections: {
            east: {
                roomId: "room_02",
                doorType: "open",
                position: { x: 1200, y: 350 },
                spawnInNext: { x: 100, y: 350 }
            },
            north: {
                roomId: "room_03",
                doorType: "locked",
                requires: "key_01",
                position: { x: 640, y: 80 },
                spawnInNext: { x: 640, y: 600 }
            },
            west: {
                roomId: "room_05",
                doorType: "ability",
                requires: "dash",
                position: { x: 80, y: 350 },
                spawnInNext: { x: 1180, y: 350 }
            }
        },
        
        // Platform layout
        platforms: [
            { x: 0, y: 650, width: 1280, height: 54, type: "solid" },
            { x: 400, y: 500, width: 200, height: 32, type: "platform" },
            { x: 700, y: 400, width: 200, height: 32, type: "platform" }
        ],
        
        // Enemy spawn data (will be used by Enemy AI agent)
        enemies: [],
        
        // Collectible locations
        collectibles: [],
        
        // Save point
        savePoint: null
    },
    
    "room_02": {
        // ... similar structure
    }
    
    // ... all 8 rooms
};
```

### 2. `MapManager.js`
Main map system controller.

**Public API:**
```javascript
class MapManager {
    constructor(scene);
    
    loadRoom(roomId);                          // Load and display room
    getCurrentRoom();                          // Returns current room object
    getRoomConnections(roomId);                // Get door connections
    canAccessDoor(doorId);                     // Check if player can use door
    checkRoomTransition(playerPosition);       // Detect if player at door
    
    markRoomExplored(roomId);                  // For minimap
    getExploredRooms();                        // Returns array of explored IDs
    
    getSavePointLocations();                   // All save points in world
    getPlayerSpawnPosition(roomId, fromDoor);  // Spawn point for room entry
    
    // Collision layer access
    getCollisionLayer();                       // For player physics
    
    // Events emitted:
    // - 'room:loaded'
    // - 'room:changed'
    // - 'door:opened'
    // - 'savePoint:activated'
}
```

### 3. `RoomTransition.js`
Handles smooth transitions between rooms.

```javascript
class RoomTransition {
    constructor(scene);
    
    fadeOut(duration, callback);
    fadeIn(duration, callback);
    wipeTransition(direction, duration, callback);
    
    // Creates black overlay and animates it
}
```

### 4. `DoorController.js`
Door interaction and gating logic.

```javascript
class DoorController {
    constructor(scene, mapManager, abilityManager);
    
    checkDoorRequirements(door);               // Returns {canUse, reason}
    attemptDoorUse(door);                      // Try to use door
    unlockDoor(doorId);                        // Permanently unlock
    
    // Visual indicators for locked/gated doors
    showDoorRequirement(door);                 // Display "Needs Dash" etc.
}
```

### 5. `MinimapGenerator.js`
Generate minimap from room data.

```javascript
class MinimapGenerator {
    constructor(mapData);
    
    generateMinimap();                         // Create full minimap graphic
    getRoomMinimapPosition(roomId);            // Position in minimap grid
    
    // Each room = 16×16 pixel square on minimap
    // Explored = colored, unexplored = dark/gray
}
```

### 6. Create simple `tileset.png`
Generate placeholder tileset with colored tiles:
- Brown/gray solid tiles (ground, walls)
- Darker background tiles
- Hazard tiles (red/orange)
- Platform tiles (one-way, different color)

### 7. `test-map-scene.js`
Test scene showing room transitions.

## Integration Points

### Inputs from Other Agents:
- **Player Controller** (Agent 1): Position for transition detection
- **Ability System** (Agent 4): Check if player has required abilities
- **Enemy AI** (Agent 5): Enemy spawn locations from room data

### Outputs to Other Agents:
- **Player Controller** (Agent 1): Collision layer for physics
- **Player Controller** (Agent 1): Spawn position on room entry
- **Enemy AI** (Agent 5): Room change notifications for spawning
- **UI System** (Agent 6): Minimap data, room names
- **Ability System** (Agent 4): Collectible locations

### Event Bus Integration:
```javascript
// Emit map events:
EventBus.emit('room:loaded', { roomId, roomData });
EventBus.emit('room:changed', { fromRoom, toRoom, direction });
EventBus.emit('door:opened', { doorId, roomId });
EventBus.emit('savePoint:activated', { roomId, position });

// Listen for events:
EventBus.on('player:position', (pos) => {
    this.checkRoomTransition(pos);
});

EventBus.on('ability:unlocked', (ability) => {
    this.checkLockedDoors(); // May open new paths
});
```

## Visual Requirements

### Tilemap Rendering
- Use Phaser's tilemap system
- Multiple layers: background, collision, foreground
- Parallax scrolling for background (optional enhancement)

### Door Indicators
- Open doors: Green/blue outline
- Locked doors: Red/locked icon
- Ability doors: Show required ability icon

### Room Transitions
- 0.5 second fade to black
- Load new room during black screen
- Fade in from black
- Seamless transition (no visible pop-in)

## Testing Checklist

- [ ] All 8 rooms load without errors
- [ ] Player can move between connected rooms
- [ ] Room transitions are smooth (no stuttering)
- [ ] Spawn points place player correctly in new room
- [ ] Collision works in all rooms
- [ ] Locked doors prevent passage until requirement met
- [ ] Ability-gated doors check abilities correctly
- [ ] Minimap shows current room highlighted
- [ ] Explored rooms tracked correctly
- [ ] Save points visible and interactable
- [ ] Tileset renders properly (no gaps or overlaps)

## Deliverables

1. ✅ `src/map/RoomData.js` with all 8 rooms defined
2. ✅ `src/map/MapManager.js`
3. ✅ `src/map/RoomTransition.js`
4. ✅ `src/map/DoorController.js`
5. ✅ `src/map/MinimapGenerator.js`
6. ✅ `assets/images/tileset.png`
7. ✅ `tests/test-map.html`
8. ✅ Git commit: "Agent 3: Map system complete"

## Success Criteria

Map layout teaches **natural Metroidvania progression**. Early areas should be accessible, with clear visual indicators of gated areas. Room transitions should be smooth and satisfying. Players should always know where they are and where they can go.

**Reference games for map design:** Hollow Knight, Super Metroid, Ori

---

**STATUS:** Ready for execution
**DEPENDENCIES:** None (can start immediately)
**ESTIMATED TIME:** 90-120 minutes
```

---

## AGENT 4: ABILITY SYSTEM & PROGRESSION
### File: `.agents/agent-4-ability-system.md`

```markdown
# AGENT 4: Ability System & Progression

## Role
Progression System Specialist - You manage the core Metroidvania progression through ability unlocks and save system.

## Technology Stack
- Phaser.js 3.x
- JavaScript ES6
- LocalStorage for persistent saves
- Event-driven unlock system

## Mission
Build a complete ability progression system with:
- 8 collectible power-ups
- Ability unlock management
- Gated area checking (can player access this?)
- Ability UI indicators
- Complete save/load system
- Collectible placement in world
- Visual ability unlock animations
- Tutorial prompts when gaining abilities

## Ability Roster

Define these 8 abilities:

### 1. Dash
- **Function:** Quick horizontal burst of speed
- **Key:** Shift key
- **Location:** Room 02 (Eastern Corridor)
- **Gates:** Access to Room 05 (Western Depths)
- **Tutorial:** "Press SHIFT to dash!"

### 2. Double Jump
- **Function:** Jump again in mid-air
- **Key:** Space (press again while airborne)
- **Location:** Room 05 (Western Depths)
- **Gates:** Access to Room 06 from Room 02
- **Tutorial:** "Press SPACE again in mid-air to double jump!"

### 3. Wall Jump
- **Function:** Jump off walls
- **Key:** Space (while wall sliding)
- **Location:** Room 06 (Southern Cavern)
- **Gates:** Advanced platforming sections
- **Tutorial:** "Slide down walls and press SPACE to wall jump!"

### 4. Glide
- **Function:** Hold jump to slow fall
- **Key:** Hold Space while falling
- **Location:** Room 07 (Lower Ruins)
- **Gates:** Access to hidden areas
- **Tutorial:** "Hold SPACE while falling to glide!"

### 5. Ground Pound
- **Function:** Slam down to break floors
- **Key:** Down + Space in air
- **Location:** Room 04 (Eastern Heights)
- **Gates:** Secret areas with breakable floors
- **Tutorial:** "Press DOWN + SPACE in air to ground pound!"

### 6. Grappling Hook
- **Function:** Swing from grapple points
- **Key:** G key near grapple point
- **Location:** Room 03 (Northern Vault - unlocked with key)
- **Gates:** Large gaps, vertical sections
- **Tutorial:** "Press G near blue orbs to grapple!"

### 7. Sprint
- **Function:** Increased ground speed
- **Key:** Hold Shift while moving (passive after unlock)
- **Location:** Room 07 (Lower Ruins)
- **Gates:** Speed-required sections
- **Tutorial:** "Hold SHIFT while moving to sprint!"

### 8. Health Upgrade
- **Function:** Increase max HP by 20
- **Key:** Passive (auto-applies)
- **Location:** Room 03 (Northern Vault)
- **Gates:** N/A (survivability upgrade)
- **Tutorial:** "Maximum health increased!"

## File Structure

Create these files in `src/abilities/`:

### 1. `AbilityDefinitions.js`
All ability metadata.

```javascript
export default {
    dash: {
        id: 'dash',
        name: 'Dash',
        description: 'Quick burst of speed',
        icon: 'dash_icon', // Sprite key
        tutorial: 'Press SHIFT to dash!',
        unlockRoom: 'room_02',
        position: { x: 640, y: 350 }
    },
    doubleJump: {
        id: 'doubleJump',
        name: 'Double Jump',
        description: 'Jump again in mid-air',
        icon: 'double_jump_icon',
        tutorial: 'Press SPACE again in mid-air!',
        unlockRoom: 'room_05',
        position: { x: 500, y: 300 }
    }
    // ... all 8 abilities
};
```

### 2. `AbilityManager.js`
Core ability management system.

**Public API:**
```javascript
class AbilityManager {
    constructor(scene);
    
    // Ability checking
    hasAbility(abilityId);                     // Returns boolean
    getUnlockedAbilities();                    // Returns array of IDs
    canAccessArea(requiredAbilities);          // Check array of requirements
    
    // Unlocking
    unlockAbility(abilityId);                  // Grant ability
    
    // Progression tracking
    getCompletionPercentage();                 // 0-100
    getAbilityCount();                         // X of 8 abilities
    
    // Save/Load
    saveGame(slotNumber);                      // 0-2 (3 save slots)
    loadGame(slotNumber);
    deleteSave(slotNumber);
    getSaveData(slotNumber);                   // Preview save info
    
    // Events emitted:
    // - 'ability:unlocked'
    // - 'ability:collected'
    // - 'game:saved'
    // - 'game:loaded'
    // - 'progress:updated'
}
```

### 3. `Collectible.js`
Pickup item class.

```javascript
class Collectible {
    constructor(scene, x, y, type, abilityId);
    
    // Visual: Floating sprite with glow effect
    // Rotates slowly
    // Emits particles
    // Collision: Player overlap triggers collection
    
    collect(player);                           // Called on pickup
    destroy();
}
```

### 4. `SaveManager.js`
LocalStorage persistence.

```javascript
class SaveManager {
    static save(slotNumber, gameState);
    static load(slotNumber);
    static delete(slotNumber);
    static exists(slotNumber);
    static getAll();                           // All save slots info
    
    static SAVE_KEY = 'metroidvania_save_';
    static MAX_SLOTS = 3;
}
```

**Save Data Structure:**
```javascript
{
    version: "1.0.0",
    timestamp: "2025-01-15T10:30:00.000Z",
    playTime: 3600,  // seconds
    
    // Player state
    playerHealth: 80,
    playerMaxHealth: 120,
    currentRoom: "room_03",
    playerPosition: { x: 400, y: 300 },
    
    // Progression
    abilities: ["dash", "doubleJump", "wallJump"],
    exploredRooms: ["room_01", "room_02", "room_03", "room_05"],
    defeatedEnemies: ["enemy_001", "enemy_002", "enemy_005"],
    collectedItems: ["key_01"],
    unlockedDoors: ["room_03_south"],
    
    // Stats
    deaths: 3,
    completionPercentage: 37.5
}
```

### 5. `UnlockAnimation.js`
Visual unlock sequence.

```javascript
class UnlockAnimation {
    constructor(scene, ability);
    
    play();
    
    // Sequence:
    // 1. Freeze game (2 seconds)
    // 2. Dim screen (overlay)
    // 3. Show ability icon (large, center screen)
    // 4. Show ability name
    // 5. Show tutorial text
    // 6. Fade out
    // 7. Resume game
}
```

### 6. `ProgressionTracker.js`
Track completion percentage.

```javascript
class ProgressionTracker {
    constructor();
    
    calculateCompletion(gameState);            // Returns 0-100
    
    // Completion factors:
    // - Abilities collected: 8 × 10% = 80%
    // - Rooms explored: 8 × 1.25% = 10%
    // - Boss defeated: 10%
}
```

### 7. `test-ability-scene.js`
Test scene with all collectibles.

## Integration Points

### Inputs from Other Agents:
- **Player Controller** (Agent 1): Apply abilities to movement
- **Map System** (Agent 3): Check door requirements
- **Combat System** (Agent 2): Health upgrade application
- **Enemy AI** (Agent 5): Defeated enemy tracking

### Outputs to Other Agents:
- **Player Controller** (Agent 1): Ability unlock notifications
- **Map System** (Agent 3): Ability status for door checking
- **UI System** (Agent 6): Ability data for inventory display
- **Combat System** (Agent 2): Max health changes

### Event Bus Integration:
```javascript
// Emit ability events:
EventBus.emit('ability:unlocked', { 
    id: 'dash',
    name: 'Dash',
    description: '...',
    tutorial: '...'
});
EventBus.emit('ability:collected', { abilityId, position });
EventBus.emit('game:saved', { slot, timestamp });
EventBus.emit('game:loaded', { slot, gameState });
EventBus.emit('progress:updated', { percentage, abilities, rooms });

// Listen for events:
EventBus.on('collectible:touched', (data) => {
    if (data.type === 'ability') {
        this.unlockAbility(data.abilityId);
    }
});

EventBus.on('savePoint:activated', (data) => {
    // Prompt player to save
    this.showSavePrompt();
});
```

## Visual Requirements

### Collectible Appearance
- Floating sprite (bob up and down)
- Glow effect (pulsing)
- Rotating slowly (360° over 3 seconds)
- Particle effects (sparkles)
- Color-coded by ability type

### Unlock Animation
- Full-screen overlay (semi-transparent black)
- Large ability icon (128×128 pixels)
- Ability name in large font
- Tutorial text below
- Fade-in, hold 2s, fade-out
- Sound effect placeholder: console.log('SFX: ability_unlocked')

### UI Integration
- Ability icons in HUD (show unlocked abilities)
- Inventory screen shows all abilities with descriptions
- Grayed-out icons for locked abilities

## Testing Checklist

- [ ] All 8 abilities defined with complete data
- [ ] Collectibles spawn at correct positions
- [ ] Collecting ability triggers unlock animation
- [ ] Abilities actually enable new gameplay
- [ ] hasAbility() returns correct boolean
- [ ] Save game stores all data correctly
- [ ] Load game restores all state
- [ ] LocalStorage data persists after refresh
- [ ] Multiple save slots work independently
- [ ] Completion percentage calculates correctly
- [ ] Ability icons appear in HUD after unlock
- [ ] Tutorial text displays clearly
- [ ] Can't collect same ability twice

## Deliverables

1. ✅ `src/abilities/AbilityDefinitions.js`
2. ✅ `src/abilities/AbilityManager.js`
3. ✅ `src/abilities/Collectible.js`
4. ✅ `src/abilities/SaveManager.js`
5. ✅ `src/abilities/UnlockAnimation.js`
6. ✅ `src/abilities/ProgressionTracker.js`
7. ✅ `assets/data/collectibles.json` (placement data)
8. ✅ `tests/test-abilities.html`
9. ✅ Git commit: "Agent 4: Ability system complete"

## Success Criteria

Ability unlocks feel **rewarding and impactful**. Players should immediately understand what new ability does and want to try it. Save/load must be bulletproof - never lose player progress.

**Reference games:** Hollow Knight (charms), Metroid (power-ups), Ori (abilities)

---

**STATUS:** Ready for execution
**DEPENDENCIES:** None (can start immediately)
**ESTIMATED TIME:** 60-90 minutes
```

---

## AGENT 5: ENEMY AI SYSTEM
### File: `.agents/agent-5-enemy-ai.md`

```markdown
# AGENT 5: Enemy AI System

## Role
Enemy AI Specialist - You create distinct, readable enemy behaviors that challenge players fairly.

## Technology Stack
- Phaser.js 3.x (Arcade Physics)
- JavaScript ES6
- State machine or behavior tree for AI
- Event-driven damage system

## Mission
Build a complete enemy system with:
- 5 unique enemy types with distinct behaviors
- Patrol, chase, attack AI patterns
- Aggro range detection
- Line-of-sight checking
- Attack patterns (melee, ranged, area)
- Health and damage system per enemy
- Death animations and loot drops
- Enemy spawn management per room
- Mini-boss battle framework

## Enemy Type Specifications

### Enemy 1: Patroller (Basic Ground Enemy)
**Stats:**
- Health: 30 HP
- Damage: 5 HP (contact)
- Speed: 80 px/s
- Aggro range: 300 pixels
- De-aggro range: 500 pixels

**Behavior:**
- Walks back and forth on platforms (patrol)
- Turns around at platform edges or walls
- Detects player within 300px
- Chases player when detected
- Returns to patrol when player escapes

**Visual:** Red rectangle (32×32)

### Enemy 2: Flyer (Aerial Enemy)
**Stats:**
- Health: 20 HP
- Damage: 8 HP (contact)
- Speed: 120 px/s
- Aggro range: 250 pixels

**Behavior:**
- Flies in sine wave pattern (ambient movement)
- Not affected by gravity
- Detects player within 250px
- Swoops toward player in diving attack
- Returns to sine wave after swoop
- Can't be hit by melee from below easily

**Visual:** Purple circle (24×24)

### Enemy 3: Shooter (Ranged Stationary)
**Stats:**
- Health: 40 HP
- Damage: 10 HP (projectile)
- Speed: 0 px/s (stationary)
- Aggro range: 400 pixels
- Fire rate: Every 2 seconds

**Behavior:**
- Stays on platform (doesn't move)
- Detects player within 400px
- Checks line-of-sight (no shooting through walls)
- Fires projectile at player position
- Continues firing while player in range
- Aims slightly ahead if player moving

**Visual:** Green triangle (32×32), projectiles are small green circles

### Enemy 4: Charger (Aggressive Melee)
**Stats:**
- Health: 50 HP
- Damage: 15 HP (charge contact)
- Speed: 100 px/s (normal), 350 px/s (charging)
- Aggro range: 350 pixels
- Charge windup: 1 second
- Charge duration: 2 seconds

**Behavior:**
- Patrols slowly when idle
- Detects player within 350px
- Winds up charge (visual indicator, 1 second)
- Charges at high speed toward player
- Bounces off walls, continues charge
- Exhausted for 1 second after charge ends
- Can be dodged with dash

**Visual:** Yellow rectangle (40×32), changes to orange when charging

### Enemy 5: Mini-Boss (Multi-Phase Boss)
**Stats:**
- Health: 200 HP (Phase 1: 200-100, Phase 2: 100-50, Phase 3: 50-0)
- Damage: Varies by attack (10-20 HP)
- Speed: 150 px/s
- Size: 96×96 pixels

**Behavior:**
**Phase 1 (200-100 HP):**
- Jumps around arena
- Slam attack (ground pound)
- Simple charge attack
- Attack interval: 3 seconds

**Phase 2 (100-50 HP):**
- Faster movement (200 px/s)
- Adds projectile attack (3-shot spread)
- Still uses slam and charge
- Attack interval: 2 seconds

**Phase 3 (50-0 HP):**
- Maximum speed (250 px/s)
- All previous attacks
- Adds area-of-effect explosion
- Berserk mode (more aggressive)
- Attack interval: 1.5 seconds

**Visual:** Orange large square, gets redder as health drops

## File Structure

Create these files in `src/enemies/`:

### 1. `EnemyBase.js`
Base enemy class with common logic.

```javascript
class EnemyBase {
    constructor(scene, x, y, config);
    
    update(delta);
    
    // Common methods
    takeDamage(amount);
    die();
    detectPlayer();                            // Check if player in aggro range
    lineOfSight(target);                       // Check if can see target
    moveToward(target, speed);
    
    // State
    isInvincible();                            // I-frames after damage
    isDead();
    getHealth();
    getHealthPercentage();
    
    // Events emitted:
    // - 'enemy:damaged'
    // - 'enemy:died'
    // - 'enemy:aggroed'
    // - 'enemy:deaggroed'
}
```

### 2-6. Individual Enemy Classes
- `EnemyPatroller.js`
- `EnemyFlyer.js`
- `EnemyShooter.js`
- `EnemyCharger.js`
- `EnemyMiniBoss.js`

Each extends EnemyBase and implements unique behavior.

### 7. `EnemySpawner.js`
Manage enemy spawning per room.

```javascript
class EnemySpawner {
    constructor(scene);
    
    spawnEnemiesForRoom(roomId);               // Spawn based on room data
    clearRoom(roomId);                         // Remove all enemies
    getEnemiesInRoom(roomId);
    removeEnemy(enemyId);
    markEnemyDefeated(enemyId);                // For persistence
    
    // Physics group for collision detection
    this.group = scene.physics.add.group();
}
```

### 8. `AIBehaviors.js`
Reusable AI behavior components.

```javascript
export class AIBehaviors {
    static patrol(enemy, leftBound, rightBound);
    static chase(enemy, target, speed);
    static flee(enemy, target, speed);
    static circleStrafe(enemy, target, radius, speed);
    static lineOfSight(enemy, target, obstacles);
    static predictiveAim(enemy, target, projectileSpeed);
}
```

### 9. `test-enemy-scene.js`
Test scene with all enemy types.

## Enemy Spawn Data

Add to room definitions in RoomData.js:

```javascript
"room_02": {
    // ... other room data
    enemies: [
        {
            id: "enemy_001",
            type: "patroller",
            x: 400,
            y: 450,
            patrol: { left: 300, right: 500 }
        },
        {
            id: "enemy_002",
            type: "flyer",
            x: 800,
            y: 300,
            pattern: "sine"
        }
    ]
}
```

## Integration Points

### Inputs from Other Agents:
- **Player Controller** (Agent 1): Player position for detection
- **Combat System** (Agent 2): Damage events
- **Map System** (Agent 3): Room change notifications, collision layer

### Outputs to Other Agents:
- **Combat System** (Agent 2): Deal damage to player
- **Ability System** (Agent 4): Enemy defeated tracking
- **UI System** (Agent 6): Boss health bar data

### Event Bus Integration:
```javascript
// Emit enemy events:
EventBus.emit('enemy:spawned', { enemy, roomId });
EventBus.emit('enemy:damaged', { enemyId, damage, remaining });
EventBus.emit('enemy:died', { enemyId, position, type });
EventBus.emit('enemy:aggroed', { enemyId, targetId });
EventBus.emit('enemy:attackStarted', { enemyId, attackType });
EventBus.emit('boss:phaseChanged', { phase, health });
EventBus.emit('loot:dropped', { type, position });

// Listen for events:
EventBus.on('combat:hit', (data) => {
    if (data.target.isEnemy) {
        data.target.takeDamage(data.damage);
    }
});

EventBus.on('room:changed', (roomId) => {
    this.spawner.spawnEnemiesForRoom(roomId);
});
```

## AI Implementation Guidelines

### State Machine Pattern

Each enemy should have clear states:

```javascript
const EnemyStates = {
    IDLE: 'idle',
    PATROL: 'patrol',
    CHASE: 'chase',
    ATTACK: 'attack',
    HURT: 'hurt',
    DEAD: 'dead'
};

class Enemy {
    constructor() {
        this.state = EnemyStates.PATROL;
        this.stateTimer = 0;
    }
    
    update(delta) {
        switch(this.state) {
            case EnemyStates.PATROL:
                this.updatePatrol(delta);
                break;
            case EnemyStates.CHASE:
                this.updateChase(delta);
                break;
            // ... etc
        }
    }
}
```

### Detection Systems

**Aggro Range:** Simple distance check
```javascript
detectPlayer() {
    const distance = Phaser.Math.Distance.Between(
        this.sprite.x, this.sprite.y,
        player.x, player.y
    );
    return distance < this.aggroRange;
}
```

**Line of Sight:** Raycast to check obstacles
```javascript
lineOfSight(target) {
    const ray = new Phaser.Geom.Line(
        this.sprite.x, this.sprite.y,
        target.x, target.y
    );
    // Check if ray intersects collision tiles
    return !this.scene.map.collisionLayer.getTilesWithinShape(ray).length;
}
```

## Visual Feedback

### On Damage Taken
- Flash white for 0.1 seconds
- Knockback effect (small push)
- Damage number floats up
- console.log('SFX: enemy_hit')

### On Death
- Sprite fades out over 0.5 seconds
- Particle burst effect
- Loot drop (if applicable)
- Remove from physics
- console.log('SFX: enemy_death')

### Boss Phases
- Screen shake on phase change
- Boss flashes red briefly
- Visual intensity increases each phase
- console.log('SFX: boss_phase_change')

## Loot Drop System

```javascript
class LootDrop {
    // 30% chance: Health pickup (+10 HP)
    // 10% chance: Energy pickup (restore abilities)
    // Boss: Always drops key item
    
    static drop(enemy) {
        const roll = Math.random();
        if (roll < 0.3) return 'health';
        if (roll < 0.4) return 'energy';
        return null;
    }
}
```

## Testing Checklist

- [ ] All 5 enemy types spawn correctly
- [ ] Patroller walks back and forth, turns at edges
- [ ] Flyer follows sine wave pattern
- [ ] Shooter only fires when line-of-sight clear
- [ ] Charger wind-up and charge work correctly
- [ ] Mini-boss transitions through 3 phases
- [ ] Enemies detect player at correct range
- [ ] Enemies chase player when aggroed
- [ ] Enemies return to idle when player escapes
- [ ] Damage numbers appear when enemies hit
- [ ] Enemies flash white when taking damage
- [ ] Death animation plays completely
- [ ] Loot drops spawn correctly
- [ ] No enemies spawn in wrong rooms
- [ ] Boss health bar appears during boss fight
- [ ] Enemies don't overlap each other excessively

## Deliverables

1. ✅ `src/enemies/EnemyBase.js`
2. ✅ `src/enemies/EnemyPatroller.js`
3. ✅ `src/enemies/EnemyFlyer.js`
4. ✅ `src/enemies/EnemyShooter.js`
5. ✅ `src/enemies/EnemyCharger.js`
6. ✅ `src/enemies/EnemyMiniBoss.js`
7. ✅ `src/enemies/EnemySpawner.js`
8. ✅ `src/enemies/AIBehaviors.js`
9. ✅ `assets/data/enemies.json` (spawn data)
10. ✅ `tests/test-enemies.html`
11. ✅ Git commit: "Agent 5: Enemy AI complete"

## Success Criteria

Enemy behaviors are **distinct and readable**. Players should recognize enemy types by their movement patterns alone. AI should feel fair - no cheap hits. Boss fight should feel climactic and challenging but beatable.

**Reference games:** Hollow Knight (enemy design), Castlevania (patterns), Mega Man (telegraphed attacks)

---

**STATUS:** Ready for execution
**DEPENDENCIES:** None (can start immediately)
**ESTIMATED TIME:** 90-120 minutes
```

---

## AGENT 6: UI & HUD SYSTEM
### File: `.agents/agent-6-ui-system.md`

```markdown
# AGENT 6: UI & HUD System

## Role
UI/UX Specialist - You create clear, functional interfaces that keep players informed without cluttering the screen.

## Technology Stack
- Phaser.js 3.x (Scene UI layer, DOM elements)
- JavaScript ES6
- CSS for styled menus
- HTML5 Canvas for HUD overlays

## Mission
Build a complete UI system with:
- In-game HUD (health, abilities, minimap)
- Pause menu with navigation
- Inventory screen (ability list)
- Map screen (full map view)
- Main menu (new game, continue, settings)
- Settings menu (volume, controls)
- Game over / death screen
- Ability unlock notifications
- Dialogue box system for NPCs
- Toast notifications

## HUD Layout

### Top-Left Corner (Player Info)
- **Health Bar:** Visual hearts or bar showing current/max HP
  - Updates smoothly (not instant jump)
  - Flashes red when taking damage
  - Position: 20px from left, 20px from top
  
- **Energy Bar:** (Optional) For special abilities
  - Below health bar
  - Blue color
  - Position: 20px from left, 60px from top

- **Ability Icons:** Show 4 active abilities
  - 32×32 pixel icons
  - Grayed out if not unlocked
  - Cooldown indicator overlay
  - Position: 20px from left, 100px from top

### Top-Right Corner (World Info)
- **Minimap:** 128×128 pixel window
  - Shows current room (highlighted)
  - Connected rooms (explored = visible, unexplored = dark)
  - Player position (dot)
  - Save points (star icon)
  - Position: 20px from right, 20px from top

- **Room Name:** Text label
  - Fades in on room change
  - Position: Above minimap

- **Item Counter:** Keys, special items
  - Small icons with numbers
  - Position: Below minimap

### Center Screen
- **Damage Numbers:** Float up when damage dealt/taken
  - Red for player damage
  - White for enemy damage
  - Fade out over 1 second

- **Ability Unlock Notifications:** Centered overlay
  - Large ability icon
  - Ability name
  - Tutorial text
  - Fades after 3 seconds

- **Boss Health Bar:** Appears only during boss fights
  - Top-center of screen
  - Shows boss name
  - Segmented for phases
  - Position: Center-top, 50px from top

### Bottom Screen
- **Interaction Prompts:** Context-sensitive
  - "Press E to interact"
  - "Press Space to save"
  - Fades in when near interactive
  - Position: Center-bottom, 50px from bottom

## Menu Systems

### 1. Main Menu Scene
**Layout:**
```
         METROIDVANIA
         [Game Title]

        [NEW GAME]
        [CONTINUE]
        [SETTINGS]
        [CREDITS]
        [EXIT]
```

**Functionality:**
- New Game → Start fresh playthrough
- Continue → Show save slot selection (0-2)
- Settings → Open settings menu
- Credits → Show credits (optional)
- Exit → Close game (browser context)

### 2. Pause Menu (ESC key)
**Layout:**
```
        PAUSED

        [RESUME]
        [MAP]
        [INVENTORY]
        [SETTINGS]
        [QUIT TO MENU]
```

**Functionality:**
- Semi-transparent overlay
- Freezes game
- Navigate with keyboard or mouse
- ESC again closes menu

### 3. Map Screen
**Layout:**
```
    [Full minimap view - larger]
    
    Legend:
    □ Unexplored
    ■ Explored
    ● Player
    ★ Save Point
    ◆ Boss
```

**Functionality:**
- Shows all explored rooms
- Zoom in/out with mouse wheel (optional)
- Click room to see name
- Shows connections between rooms
- Back button or M key to close

### 4. Inventory Screen
**Layout:**
```
    ABILITIES UNLOCKED: 5/8

    [Icon] Dash          [Unlocked]
    [Icon] Double Jump   [Unlocked]
    [Icon] Wall Jump     [Unlocked]
    [Icon] Glide         [Locked]
    [Icon] Ground Pound  [Unlocked]
    [Icon] Grapple       [Locked]
    [Icon] Sprint        [Unlocked]
    [Icon] Health Up     [Unlocked]

    Completion: 62.5%
    Play Time: 01:23:45
    Deaths: 12
```

**Functionality:**
- Shows all abilities (locked and unlocked)
- Displays completion percentage
- Shows stats (time, deaths)
- Hover for ability descriptions

### 5. Settings Menu
**Layout:**
```
    SETTINGS

    Master Volume:  [====|----] 40%
    SFX Volume:     [=======|--] 70%
    Music Volume:   [=====|----] 50%

    [Control Remapping]
    [Graphics Quality]
    [Reset Progress]

    [APPLY]  [CANCEL]
```

**Functionality:**
- Volume sliders (save to LocalStorage)
- Control remapping interface
- Apply saves settings
- Cancel reverts changes

### 6. Game Over Screen
**Layout:**
```
    YOU DIED

    Deaths: 13
    Time: 01:25:32

    [RESPAWN]
    [QUIT TO MENU]
```

**Functionality:**
- Appears after death
- Auto-respawn after 3 seconds (or press button)
- Shows death count
- Respawn at last save point

## File Structure

Create these files in `src/ui/`:

### 1. `HUDController.js`
Main HUD management.

**Public API:**
```javascript
class HUDController {
    constructor(scene);
    update(delta);
    
    // Health
    updateHealth(current, max);
    flashHealth();                             // Red flash on damage
    
    // Minimap
    updateMinimap(roomId, playerPos);
    addExploredRoom(roomId);
    
    // Abilities
    updateAbilityIcons(abilities);
    showAbilityCooldown(abilityId, duration);
    
    // Notifications
    showNotification(message, duration);
    showAbilityUnlock(ability);
    showDamageNumber(x, y, damage, isPlayer);
    
    // Boss
    showBossHealth(name, health, maxHealth);
    hideBossHealth();
    updateBossHealth(health, maxHealth);
    
    // Prompts
    showInteractPrompt(message);
    hideInteractPrompt();
}
```

### 2. `HealthBar.js`
Health bar component.

```javascript
class HealthBar {
    constructor(scene, x, y, maxHealth);
    
    update(currentHealth);
    flash();                                   // Red flash effect
    
    // Can be hearts or bar style
    // Smooth animation when health changes
}
```

### 3. `MinimapDisplay.js`
Minimap rendering component.

```javascript
class MinimapDisplay {
    constructor(scene, x, y, mapData);
    
    update(currentRoom, playerPos);
    addExploredRoom(roomId);
    render();
    
    // Each room = 16×16 pixel square
    // Current room highlighted
}
```

### 4. `MenuSystem.js`
Base menu framework.

```javascript
class MenuSystem {
    constructor(scene);
    
    createButton(text, x, y, callback);
    createSlider(label, x, y, min, max, initial, onChange);
    createPanel(x, y, width, height);
    
    // Keyboard navigation
    navigateUp();
    navigateDown();
    selectCurrent();
}
```

### 5. `PauseMenu.js`
Pause menu implementation.

```javascript
class PauseMenu extends MenuSystem {
    constructor(scene);
    
    open();
    close();
    
    // Buttons: Resume, Map, Inventory, Settings, Quit
}
```

### 6. `MapScreen.js`
Full map view screen.

```javascript
class MapScreen {
    constructor(scene, mapData);
    
    open();
    close();
    render();
    
    // Shows all explored rooms
    // Legend for symbols
}
```

### 7. `InventoryScreen.js`
Ability inventory display.

```javascript
class InventoryScreen {
    constructor(scene, abilityManager);
    
    open();
    close();
    render();
    
    // Shows all abilities
    // Completion stats
}
```

### 8. `SettingsMenu.js`
Settings configuration.

```javascript
class SettingsMenu extends MenuSystem {
    constructor(scene);
    
    open();
    close();
    apply();                                   // Save settings
    cancel();                                  // Revert changes
    
    // Volume sliders
    // Control remapping
}
```

### 9. `NotificationManager.js`
Toast notifications and popups.

```javascript
class NotificationManager {
    constructor(scene);
    
    showToast(message, duration);              // Small notification
    showAbilityUnlock(ability);                // Full-screen unlock
    showAchievement(name, description);        // Achievement popup
    
    // Queue system for multiple notifications
}
```

### 10. `DialogueBox.js`
NPC dialogue display.

```javascript
class DialogueBox {
    constructor(scene);
    
    show(text, characterName);
    hide();
    nextLine();                                // For multi-line dialogue
    
    // Typewriter effect (optional)
    // Portrait image (optional)
}
```

### 11. `ui-styles.css`
CSS styling for DOM-based UI elements.

## Integration Points

### Inputs from Other Agents:
- **Combat System** (Agent 2): Health updates, damage numbers
- **Map System** (Agent 3): Room data, minimap updates
- **Ability System** (Agent 4): Ability data, unlock notifications
- **Enemy AI** (Agent 5): Boss health data
- **Player Controller** (Agent 1): Player state for prompts

### Outputs to Other Agents:
- **Game Scene:** Pause/resume game
- **Ability System** (Agent 4): Save game requests
- **Main Menu:** Scene transitions

### Event Bus Integration:
```javascript
// Listen for events:
EventBus.on('combat:healthChanged', (data) => {
    this.hud.updateHealth(data.current, data.max);
});

EventBus.on('combat:damaged', (data) => {
    this.hud.flashHealth();
    this.hud.showDamageNumber(playerPos.x, playerPos.y, data.amount, true);
});

EventBus.on('ability:unlocked', (ability) => {
    this.notifications.showAbilityUnlock(ability);
    this.hud.updateAbilityIcons(this.abilities.getUnlockedAbilities());
});

EventBus.on('room:changed', (data) => {
    this.hud.updateMinimap(data.toRoom, playerPos);
});

EventBus.on('boss:spawned', (boss) => {
    this.hud.showBossHealth(boss.name, boss.health, boss.maxHealth);
});

EventBus.on('boss:defeated', () => {
    this.hud.hideBossHealth();
});

// Emit UI events:
EventBus.emit('ui:pauseOpened');
EventBus.emit('ui:pauseClosed');
EventBus.emit('ui:settingChanged', { setting: 'volume', value: 0.5 });
EventBus.emit('ui:quitToMenu');
```

## Visual Design Guidelines

### Color Scheme
- **Primary:** Blue (#4488ff)
- **Secondary:** White (#ffffff)
- **Health:** Red (#ff4444)
- **Energy:** Cyan (#44ffff)
- **Background:** Dark gray (#2d2d2d)
- **Text:** White with black outline for readability

### Typography
- **Headers:** 32px bold
- **Body:** 18px regular
- **HUD:** 16px bold
- **Damage numbers:** 24px bold

### Spacing
- Consistent 20px margins
- 10px padding in panels
- 40px button heights
- 10px between UI elements

### Animations
- Fade transitions: 0.3 seconds
- Button hover: Scale 1.1x
- Health bar: Smooth lerp over 0.2s
- Damage numbers: Float up 50px over 1s

## Accessibility

- High contrast (white text on dark background)
- Clear visual hierarchy
- Keyboard navigation support
- Visual feedback on all interactions
- Distinct colors for different info types
- No flashing faster than 3Hz (epilepsy safety)

## Testing Checklist

- [ ] Health bar updates correctly on damage/heal
- [ ] Health bar animation is smooth
- [ ] Minimap shows current room highlighted
- [ ] Minimap fills as rooms explored
- [ ] Ability icons gray out when locked
- [ ] Ability cooldowns show visual timer
- [ ] Damage numbers appear at correct position
- [ ] Damage numbers fade out smoothly
- [ ] Boss health bar appears during boss fight
- [ ] Boss health bar updates correctly
- [ ] Pause menu opens with ESC
- [ ] Pause menu freezes game
- [ ] Resume button closes pause menu
- [ ] Map screen shows all explored rooms
- [ ] Inventory shows correct abilities
- [ ] Settings menu sliders work
- [ ] Settings persist after close
- [ ] Game over screen appears on death
- [ ] Respawn works correctly
- [ ] All menus have keyboard navigation
- [ ] Buttons have hover effects
- [ ] No UI overlaps or clipping

## Deliverables

1. ✅ `src/ui/HUDController.js`
2. ✅ `src/ui/HealthBar.js`
3. ✅ `src/ui/MinimapDisplay.js`
4. ✅ `src/ui/MenuSystem.js`
5. ✅ `src/ui/PauseMenu.js`
6. ✅ `src/ui/MapScreen.js`
7. ✅ `src/ui/InventoryScreen.js`
8. ✅ `src/ui/SettingsMenu.js`
9. ✅ `src/ui/NotificationManager.js`
10. ✅ `src/ui/DialogueBox.js`
11. ✅ `src/ui/ui-styles.css`
12. ✅ `tests/test-ui.html`
13. ✅ Git commit: "Agent 6: UI system complete"

## Success Criteria

UI is **clear, functional, and unobtrusive**. Players should always know their health, location, and available abilities at a glance. Menus should be easy to navigate. No critical info hidden or hard to find.

**Reference games:** Hollow Knight (minimalist HUD), Dead Cells (clear feedback), Celeste (accessibility)

---

**STATUS:** Ready for execution
**DEPENDENCIES:** None (can start immediately)
**ESTIMATED TIME:** 90-120 minutes
```

---

## AGENT 7: INTEGRATION & POLISH
### File: `.agents/agent-7-integration.md`

```markdown
# AGENT 7: Integration & Polish

## Role
Integration Engineer - You combine all systems into a cohesive game and add the "juice" that makes it feel polished.

## Prerequisites
⚠️ **LAUNCH THIS AGENT ONLY AFTER AGENTS 1-6 ARE COMPLETE**

You will need completed outputs from:
- Agent 1: Player Controller
- Agent 2: Combat System
- Agent 3: Map System
- Agent 4: Ability System
- Agent 5: Enemy AI
- Agent 6: UI System

## Technology Stack
- Phaser.js 3.x
- JavaScript ES6 modules
- Event-driven architecture

## Mission
Create a unified, polished game by:
1. Wiring all systems together via EventBus
2. Creating main game scenes (Boot, Menu, Game, GameOver)
3. Implementing visual effects (particles, screen shake, juice)
4. Adding camera system with smooth follow
5. Performance optimization
6. Integration testing
7. Final polish pass

## Integration Architecture

### Event Bus Structure

All systems communicate through centralized EventBus:

```
Player ←→ EventBus ←→ Combat
   ↑          ↓          ↑
   └── Map ←─┴── Ability ──┘
        ↓          ↓
     Enemy ←─── UI
```

### Event Flow Examples

**Player Takes Damage:**
```
Enemy collision detected
  ↓
Combat emits 'combat:damaged'
  ↓
Player receives knockback
  ↓
UI updates health bar
  ↓
Camera shakes
  ↓
Particles spawn
```

**Ability Unlocked:**
```
Player collects ability
  ↓
Ability emits 'ability:unlocked'
  ↓
Player enables new movement
  ↓
Map checks if new doors open
  ↓
UI shows unlock animation
  ↓
UI updates ability icons
```

## File Structure

Create these files:

### Integration Core

1. **`src/main.js`** - Entry point
2. **`src/config.js`** - Phaser configuration
3. **`src/EventBus.js`** - Central event system (if not created)

### Scenes

4. **`src/scenes/BootScene.js`** - Asset loading
5. **`src/scenes/MainMenuScene.js`** - Title screen
6. **`src/scenes/GameScene.js`** - Main gameplay (CRITICAL)
7. **`src/scenes/GameOverScene.js`** - Death screen

### Visual Effects

8. **`src/effects/CameraController.js`** - Smooth camera follow
9. **`src/effects/ParticleManager.js`** - Particle systems
10. **`src/effects/ScreenEffects.js`** - Screen shake, flash, freeze

## CRITICAL FILE: GameScene.js

This is the heart of integration. Complete implementation:

```javascript
import EventBus from '../EventBus.js';
import InputManager from '../player/InputManager.js';
import PlayerController from '../player/PlayerController.js';
import MapManager from '../map/MapManager.js';
import CombatController from '../combat/CombatController.js';
import AbilityManager from '../abilities/AbilityManager.js';
import EnemySpawner from '../enemies/EnemySpawner.js';
import HUDController from '../ui/HUDController.js';
import CameraController from '../effects/CameraController.js';
import ParticleManager from '../effects/ParticleManager.js';
import ScreenEffects from '../effects/ScreenEffects.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    init(data) {
        this.loadSave = data.loadSave || false;
        this.saveSlot = data.saveSlot || 0;
    }
    
    create() {
        console.log('GameScene: Initializing...');
        
        // 1. Initialize EventBus (clear any old listeners)
        EventBus.clear();
        
        // 2. Initialize systems in dependency order
        this.initializeSystems();
        
        // 3. Wire up event listeners
        this.setupEventListeners();
        
        // 4. Setup physics collisions
        this.setupCollisions();
        
        // 5. Load game state
        if (this.loadSave) {
            this.loadGameState();
        } else {
            this.startNewGame();
        }
        
        console.log('GameScene: Ready!');
    }
    
    initializeSystems() {
        // Order matters! Some systems depend on others
        
        // Core
        this.input = new InputManager(this);
        
        // World
        this.map = new MapManager(this);
        
        // Player
        this.player = new PlayerController(this, 400, 300);
        
        // Combat
        this.combat = new CombatController(this, this.player);
        
        // Progression
        this.abilities = new AbilityManager(this);
        
        // Enemies
        this.enemies = new EnemySpawner(this);
        
        // UI
        this.hud = new HUDController(this);
        
        // Effects
        this.camera = new CameraController(this, this.player);
        this.particles = new ParticleManager(this);
        this.effects = new ScreenEffects(this);
    }
    
    setupEventListeners() {
        // PLAYER EVENTS
        
        EventBus.on('player:jumped', (data) => {
            this.particles.createDust(data.position.x, data.position.y);
            console.log('SFX: jump');
        });
        
        EventBus.on('player:landed', (data) => {
            this.particles.createDust(data.position.x, data.position.y);
            this.effects.shake(2, 100);
            console.log('SFX: land');
        });
        
        EventBus.on('player:dashed', (data) => {
            this.particles.createTrail(this.player.sprite);
            console.log('SFX: dash');
        });
        
        // COMBAT EVENTS
        
        EventBus.on('combat:meleeAttack', (data) => {
            this.checkMeleeHits(data);
            console.log('SFX: attack_swing');
        });
        
        EventBus.on('combat:hit', (data) => {
            this.particles.createSparks(data.position.x, data.position.y);
            this.effects.freeze(50); // 50ms hit pause
            this.effects.shake(3, 200);
            this.hud.showDamageNumber(data.position.x, data.position.y, data.damage, false);
            console.log('SFX: attack_hit');
        });
        
        EventBus.on('combat:damaged', (data) => {
            this.hud.updateHealth(data.remaining, data.max);
            this.hud.flashHealth();
            this.effects.shake(5, 300);
            this.hud.showDamageNumber(
                this.player.sprite.x,
                this.player.sprite.y,
                data.amount,
                true
            );
            console.log('SFX: player_hurt');
        });
        
        EventBus.on('combat:died', () => {
            this.handlePlayerDeath();
        });
        
        EventBus.on('combat:healthChanged', (data) => {
            this.hud.updateHealth(data.current, data.max);
        });
        
        // ABILITY EVENTS
        
        EventBus.on('ability:unlocked', (ability) => {
            this.player.unlockAbility(ability.id);
            this.hud.showAbilityUnlock(ability);
            this.hud.updateAbilityIcons(this.abilities.getUnlockedAbilities());
            this.map.checkLockedDoors(); // May open new paths
            console.log('SFX: ability_unlocked');
        });
        
        EventBus.on('game:saved', (data) => {
            this.hud.showNotification('Game Saved', 2);
            console.log('Game saved to slot', data.slot);
        });
        
        // MAP EVENTS
        
        EventBus.on('room:changed', (data) => {
            this.handleRoomTransition(data);
        });
        
        EventBus.on('room:loaded', (data) => {
            this.camera.setRoomBounds(data.width, data.height);
            this.hud.updateMinimap(data.roomId, this.player.getPosition());
        });
        
        EventBus.on('savePoint:activated', (data) => {
            this.showSavePrompt();
        });
        
        // ENEMY EVENTS
        
        EventBus.on('enemy:died', (data) => {
            this.particles.createExplosion(data.position.x, data.position.y);
            this.abilities.markEnemyDefeated(data.enemyId);
            this.handleLootDrop(data);
            console.log('SFX: enemy_death');
        });
        
        EventBus.on('boss:spawned', (boss) => {
            this.hud.showBossHealth(boss.name, boss.health, boss.maxHealth);
        });
        
        EventBus.on('boss:phaseChanged', (data) => {
            this.effects.shake(10, 500);
            this.particles.createExplosion(data.position.x, data.position.y);
            console.log('SFX: boss_phase_change');
        });
        
        EventBus.on('boss:defeated', () => {
            this.hud.hideBossHealth();
            this.hud.showNotification('Boss Defeated!', 3);
            console.log('SFX: boss_defeated');
        });
        
        // UI EVENTS
        
        EventBus.on('ui:pauseOpened', () => {
            this.scene.pause();
        });
        
        EventBus.on('ui:pauseClosed', () => {
            this.scene.resume();
        });
        
        EventBus.on('ui:quitToMenu', () => {
            this.scene.start('MainMenuScene');
        });
    }
    
    setupCollisions() {
        // Player vs Map collision
        this.physics.add.collider(
            this.player.sprite,
            this.map.getCollisionLayer()
        );
        
        // Player vs Enemies (damage on contact)
        this.physics.add.overlap(
            this.player.sprite,
            this.enemies.group,
            this.handlePlayerEnemyCollision,
            null,
            this
        );
        
        // Player attacks vs Enemies
        if (this.combat.getMeleeHitbox()) {
            this.physics.add.overlap(
                this.combat.getMeleeHitbox(),
                this.enemies.group,
                this.handleAttackHitEnemy,
                null,
                this
            );
        }
        
        // Projectiles vs Enemies
        this.physics.add.overlap(
            this.combat.getProjectileGroup(),
            this.enemies.group,
            this.handleProjectileHitEnemy,
            null,
            this
        );
        
        // Projectiles vs Map (destroy on wall hit)
        this.physics.add.collider(
            this.combat.getProjectileGroup(),
            this.map.getCollisionLayer(),
            (projectile) => projectile.destroy()
        );
        
        // Enemy projectiles vs Player
        this.physics.add.overlap(
            this.player.sprite,
            this.enemies.getProjectileGroup(),
            this.handleEnemyProjectileHitPlayer,
            null,
            this
        );
    }
    
    handlePlayerEnemyCollision(playerSprite, enemySprite) {
        const enemy = enemySprite.getData('controller');
        
        if (this.combat.isInvincible()) return;
        
        const knockback = {
            x: Math.sign(playerSprite.x - enemySprite.x),
            y: -0.5
        };
        
        EventBus.emit('combat:damaged', {
            amount: enemy.contactDamage,
            knockback: knockback,
            source: enemy
        });
    }
    
    handleAttackHitEnemy(hitbox, enemySprite) {
        const enemy = enemySprite.getData('controller');
        
        if (!enemy || enemy.isInvincible() || enemy.isDead()) return;
        
        const damage = this.combat.getMeleeDamage();
        enemy.takeDamage(damage);
        
        EventBus.emit('combat:hit', {
            target: enemy,
            damage: damage,
            position: { x: enemySprite.x, y: enemySprite.y }
        });
    }
    
    handleProjectileHitEnemy(projectile, enemySprite) {
        const enemy = enemySprite.getData('controller');
        const projectileData = projectile.getData('controller');
        
        if (!enemy || enemy.isDead()) return;
        
        enemy.takeDamage(projectileData.damage);
        projectile.destroy();
        
        EventBus.emit('combat:hit', {
            target: enemy,
            damage: projectileData.damage,
            position: { x: enemySprite.x, y: enemySprite.y }
        });
    }
    
    handleEnemyProjectileHitPlayer(playerSprite, projectile) {
        if (this.combat.isInvincible()) return;
        
        const projectileData = projectile.getData('controller');
        projectile.destroy();
        
        EventBus.emit('combat:damaged', {
            amount: projectileData.damage,
            knockback: projectileData.knockback,
            source: 'enemy_projectile'
        });
    }
    
    checkMeleeHits(attackData) {
        // Already handled by collision system
        // This is for additional effects
    }
    
    handleRoomTransition(data) {
        this.enemies.clearRoom(data.fromRoom);
        this.map.loadRoom(data.toRoom);
        this.enemies.spawnEnemiesForRoom(data.toRoom);
        
        // Move player to spawn point
        const spawnPos = this.map.getPlayerSpawnPosition(data.toRoom, data.fromDoor);
        this.player.sprite.setPosition(spawnPos.x, spawnPos.y);
    }
    
    handleLootDrop(enemyData) {
        // 30% health, 10% energy
        const roll = Math.random();
        if (roll < 0.3) {
            this.spawnHealthPickup(enemyData.position);
        } else if (roll < 0.4) {
            this.spawnEnergyPickup(enemyData.position);
        }
    }
    
    spawnHealthPickup(position) {
        // Create health pickup collectible
        const pickup = this.add.circle(position.x, position.y, 8, 0xff4444);
        this.physics.add.existing(pickup);
        
        this.physics.add.overlap(
            this.player.sprite,
            pickup,
            () => {
                this.combat.heal(10);
                pickup.destroy();
                console.log('SFX: health_pickup');
            }
        );
    }
    
    spawnEnergyPickup(position) {
        // Create energy pickup collectible
        const pickup = this.add.circle(position.x, position.y, 8, 0x44ffff);
        this.physics.add.existing(pickup);
        
        this.physics.add.overlap(
            this.player.sprite,
            pickup,
            () => {
                // Restore ability energy
                pickup.destroy();
                console.log('SFX: energy_pickup');
            }
        );
    }
    
    handlePlayerDeath() {
        console.log('Player died');
        
        // Fade out
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('GameOverScene', {
                deaths: this.abilities.getDeathCount(),
                playTime: this.abilities.getPlayTime()
            });
        });
    }
    
    showSavePrompt() {
        // Show save UI
        this.hud.showNotification('Press S to Save', 3);
        
        // Listen for S key
        const saveKey = this.input.keys.keyboard.addKey('S');
        saveKey.once('down', () => {
            this.abilities.saveGame(this.saveSlot);
        });
    }
    
    startNewGame() {
        this.map.loadRoom('room_01');
        this.player.sprite.setPosition(320, 480);
        this.combat.setHealth(100, 100);
        this.hud.updateHealth(100, 100);
    }
    
    loadGameState() {
        const saveData = this.abilities.loadGame(this.saveSlot);
        
        if (saveData) {
            this.map.loadRoom(saveData.currentRoom);
            this.player.sprite.setPosition(
                saveData.playerPosition.x,
                saveData.playerPosition.y
            );
            this.combat.setHealth(
                saveData.playerHealth,
                saveData.playerMaxHealth
            );
            this.hud.updateHealth(saveData.playerHealth, saveData.playerMaxHealth);
            
            // Restore abilities
            saveData.abilities.forEach(abilityId => {
                this.player.unlockAbility(abilityId);
            });
            
            // Restore explored rooms
            saveData.exploredRooms.forEach(roomId => {
                this.map.markRoomExplored(roomId);
            });
        } else {
            console.error('Failed to load save');
            this.startNewGame();
        }
    }
    
    update(time, delta) {
        // Update all systems
        
        if (this.player) {
            this.player.update(delta, this.input);
        }
        
        if (this.combat) {
            this.combat.update(delta);
        }
        
        if (this.enemies) {
            this.enemies.update(delta, this.player.getPosition());
        }
        
        if (this.camera) {
            this.camera.update(delta);
        }
        
        if (this.map) {
            this.map.checkRoomTransition(this.player.getPosition());
        }
        
        if (this.hud) {
            this.hud.update(delta);
        }
        
        if (this.effects) {
            this.effects.update(delta);
        }
        
        // Check for pause
        if (this.input.isPausePressed()) {
            EventBus.emit('ui:pauseOpened');
        }
    }
}
```

## Visual Effects Implementation

### CameraController.js
```javascript
export default class CameraController {
    constructor(scene, target) {
        this.scene = scene;
        this.camera = scene.cameras.main;
        this.target = target;
        
        // Setup smooth follow
        this.camera.startFollow(target.sprite, true, 0.1, 0.1);
        this.camera.setDeadzone(80, 60);
        
        this.shakeTimer = 0;
    }
    
    shake(intensity, duration) {
        this.camera.shake(duration, intensity * 0.01);
        this.shakeTimer = duration / 1000;
    }
    
    setRoomBounds(width, height) {
        this.camera.setBounds(0, 0, width, height);
    }
    
    update(delta) {
        const dt = delta / 1000;
        this.shakeTimer = Math.max(0, this.shakeTimer - dt);
    }
}
```

### ParticleManager.js
```javascript
export default class ParticleManager {
    constructor(scene) {
        this.scene = scene;
    }
    
    createDust(x, y) {
        // Simple particle burst
        const particles = this.scene.add.particles(x, y, 'particle', {
            speed: { min: 50, max: 100 },
            angle: { min: -120, max: -60 },
            scale: { start: 1, end: 0 },
            lifespan: 500,
            quantity: 5,
            blendMode: 'ADD'
        });
        
        this.scene.time.delayedCall(500, () => particles.destroy());
    }
    
    createSparks(x, y) {
        // Hit sparks
        const particles = this.scene.add.particles(x, y, 'particle', {
            speed: { min: 100, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.8, end: 0 },
            lifespan: 300,
            quantity: 10,
            blendMode: 'ADD',
            tint: 0xffff00
        });
        
        this.scene.time.delayedCall(300, () => particles.destroy());
    }
    
    createExplosion(x, y) {
        // Enemy death explosion
        const particles = this.scene.add.particles(x, y, 'particle', {
            speed: { min: 150, max: 300 },
            angle: { min: 0, max: 360 },
            scale: { start: 1.5, end: 0 },
            lifespan: 600,
            quantity: 20,
            blendMode: 'ADD',
            tint: 0xff8800
        });
        
        this.scene.time.delayedCall(600, () => particles.destroy());
    }
    
    createTrail(sprite) {
        // Dash trail effect
        // Implementation here
    }
}
```

### ScreenEffects.js
```javascript
export default class ScreenEffects {
    constructor(scene) {
        this.scene = scene;
        this.freezeTimer = 0;
        this.originalTimeScale = 1;
    }
    
    shake(intensity, duration) {
        this.scene.cameras.main.shake(duration, intensity * 0.01);
    }
    
    freeze(duration) {
        // Hit pause effect
        this.freezeTimer = duration;
        this.originalTimeScale = this.scene.time.timeScale;
        this.scene.time.timeScale = 0;
    }
    
    flash(color, duration) {
        this.scene.cameras.main.flash(duration, color);
    }
    
    update(delta) {
        if (this.freezeTimer > 0) {
            this.freezeTimer -= delta;
            if (this.freezeTimer <= 0) {
                this.scene.time.timeScale = this.originalTimeScale;
            }
        }
    }
}
```

## Main Entry Point

### main.js
```javascript
import config from './config.js';
import BootScene from './scenes/BootScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

// Add all scenes
config.scene = [
    BootScene,
    MainMenuScene,
    GameScene,
    GameOverScene
];

// Create game instance
const game = new Phaser.Game(config);

// Global reference (for debugging)
window.game = game;

console.log('Metroidvania game initialized');
```

## Testing & Verification

### Integration Test Checklist

Run through this complete playthrough:

1. **Start Game**
   - [ ] Main menu appears
   - [ ] Click New Game starts GameScene
   - [ ] Player spawns in room_01

2. **Movement**
   - [ ] WASD moves player
   - [ ] Space jumps
   - [ ] Collision with platforms works
   - [ ] No stuck in walls

3. **Combat**
   - [ ] Move to room_02
   - [ ] Attack key hits enemies
   - [ ] Enemies take damage
   - [ ] Damage numbers appear
   - [ ] Health bar updates

4. **Progression**
   - [ ] Collect Dash ability in room_02
   - [ ] Unlock animation plays
   - [ ] Dash now works
   - [ ] Can access room_05

5. **Room Transitions**
   - [ ] Walk to room edge
   - [ ] Transition is smooth
   - [ ] Spawn in correct position
   - [ ] Enemies spawn in new room

6. **Save/Load**
   - [ ] Activate save point
   - [ ] Save game
   - [ ] Quit to menu
   - [ ] Continue game
   - [ ] State restored correctly

7. **Boss Fight**
   - [ ] Navigate to room_08
   - [ ] Boss health bar appears
   - [ ] Boss phases work
   - [ ] Defeat boss
   - [ ] Victory!

### Performance Verification

- [ ] Open Chrome DevTools → Performance
- [ ] Record 30 seconds of gameplay
- [ ] Check FPS: Should be consistent 60 FPS
- [ ] Check memory: Should not grow unbounded
- [ ] No frame drops during combat
- [ ] No stuttering during room transitions

## Polish Checklist

- [ ] Screen shake on all impacts
- [ ] Particle effects on landing, attacks, deaths
- [ ] Hit pause on heavy hits (0.05s freeze)
- [ ] Smooth camera follow (no jitter)
- [ ] Health bar animates smoothly
- [ ] Damage numbers float and fade nicely
- [ ] All transitions are smooth (0.3-0.5s)
- [ ] Visual feedback on all interactions
- [ ] Sound effect placeholders in console
- [ ] No visible pop-in or pop-out
- [ ] UI elements scale correctly
- [ ] Game feels responsive

## Deliverables

1. ✅ `src/main.js`
2. ✅ `src/config.js`
3. ✅ `src/EventBus.js`
4. ✅ `src/scenes/BootScene.js`
5. ✅ `src/scenes/MainMenuScene.js`
6. ✅ `src/scenes/GameScene.js` (CRITICAL)
7. ✅ `src/scenes/GameOverScene.js`
8. ✅ `src/effects/CameraController.js`
9. ✅ `src/effects/ParticleManager.js`
10. ✅ `src/effects/ScreenEffects.js`
11. ✅ `tests/integration-test.html`
12. ✅ Complete playthrough test passed
13. ✅ Performance verified
14. ✅ Git commit: "Agent 7: Integration complete - GAME PLAYABLE"

## Success Criteria

Game feels **cohesive and polished**. All systems work together seamlessly. Visual effects make the game feel alive. No rough edges or obvious bugs. A stranger could pick it up and play without instructions.

---

**STATUS:** Ready for execution AFTER agents 1-6 complete
**DEPENDENCIES:** Agents 1, 2, 3, 4, 5, 6 MUST be complete
**ESTIMATED TIME:** 90-120 minutes
```

---

## AGENT 8: TESTING & QA
### File: `.agents/agent-8-testing-qa.md`

```markdown
# AGENT 8: Testing & QA Specialist

## Role
QA Engineer - You verify the game works correctly, identify bugs, and recommend improvements.

## Prerequisites
⚠️ **LAUNCH THIS AGENT ONLY AFTER AGENT 7 COMPLETES INTEGRATION**

You need a fully integrated, playable game from Agent 7.

## Mission
Comprehensive testing and quality assurance:
1. Manual test execution (full playthrough)
2. Bug identification and reporting
3. Performance benchmarking
4. Gameplay balance analysis
5. Accessibility audit
6. Final recommendations

## Testing Areas

### 1. Core Gameplay Loop (30 min session)

**Test:**
- Start new game
- Play through first 3 rooms
- Collect at least 2 abilities
- Defeat 10+ enemies
- Save and reload
- Continue from save
- Die intentionally
- Respawn and continue

**Verify:**
- Movement feels responsive
- Combat is satisfying
- Progression is clear
- No game-breaking bugs

### 2. System-by-System Testing

#### Player Controller (15 min)
- [ ] Move in all 8 directions smoothly
- [ ] Jump height varies with button hold
- [ ] Coyote time allows late jumps
- [ ] Jump buffering works (press early)
- [ ] Dash moves player quickly
- [ ] Dash has cooldown
- [ ] Wall slide slows descent
- [ ] Wall jump works correctly
- [ ] No clipping through walls
- [ ] No getting stuck in geometry

#### Combat System (15 min)
- [ ] Melee attack hits enemies in range
- [ ] Ranged attack fires projectiles
- [ ] Projectiles travel correctly
- [ ] Damage numbers appear and fade
- [ ] Health bar updates on damage
- [ ] Invincibility frames work
- [ ] Can't take damage during i-frames
- [ ] Visual flash during invincibility
- [ ] Knockback pushes player correctly
- [ ] Death triggers game over

#### Map System (20 min)
- [ ] All 8 rooms load without errors
- [ ] Room transitions are smooth
- [ ] No stuttering during transitions
- [ ] Player spawns correctly in new rooms
- [ ] Collision works in all rooms
- [ ] Locked doors stay locked
- [ ] Ability-gated doors check correctly
- [ ] Doors open when requirements met
- [ ] Minimap shows current room
- [ ] Minimap fills as rooms explored

#### Ability System (20 min)
- [ ] All 8 abilities defined
- [ ] Collectibles spawn correctly
- [ ] Collection triggers animation
- [ ] Abilities unlock gameplay features
- [ ] hasAbility() returns correctly
- [ ] Save stores all data
- [ ] Load restores all state
- [ ] LocalStorage persists after refresh
- [ ] Multiple save slots work
- [ ] Completion percentage correct

#### Enemy AI (20 min)
- [ ] Patroller walks back and forth
- [ ] Patroller chases when player near
- [ ] Flyer follows sine wave
- [ ] Flyer swoops at player
- [ ] Shooter only fires with line-of-sight
- [ ] Shooter projectiles hit player
- [ ] Charger winds up before charge
- [ ] Charger charges at high speed
- [ ] Mini-boss has 3 distinct phases
- [ ] All enemies take damage correctly
- [ ] Death animation plays fully
- [ ] Loot drops spawn

#### UI System (15 min)
- [ ] Health bar visible and updates
- [ ] Minimap shows explored rooms
- [ ] Ability icons appear when unlocked
- [ ] Pause menu opens with ESC
- [ ] Pause freezes game
- [ ] Map screen shows all rooms
- [ ] Inventory shows abilities
- [ ] Settings menu sliders work
- [ ] Game over appears on death
- [ ] All menus navigable

### 3. Edge Cases (30 min)

Test unusual scenarios:

- [ ] Take damage during room transition
- [ ] Save while in mid-air
- [ ] Unlock ability while in combat
- [ ] Multiple enemies attack simultaneously
- [ ] Spam attack button rapidly
- [ ] Spam dash button rapidly
- [ ] Try to exit level bounds
- [ ] Pause during damage animation
- [ ] Quit and reload during boss fight
- [ ] Collect ability twice (shouldn't be possible)
- [ ] Use locked door without ability
- [ ] Fall into pit (if any)
- [ ] Attack while dashing
- [ ] Jump while attacking

### 4. Performance Testing

#### FPS Monitoring (10 min)
1. Open Chrome DevTools → Performance
2. Start recording
3. Play for 5 minutes (combat heavy)
4. Stop recording

**Check:**
- [ ] Average FPS: 60 (or close)
- [ ] Min FPS: Above 45
- [ ] No sustained drops below 30
- [ ] Frame times consistent

#### Memory Testing (15 min)
1. Open DevTools → Memory
2. Take heap snapshot
3. Play for 30 minutes
4. Take another snapshot
5. Compare

**Check:**
- [ ] Memory usage stable (not growing infinitely)
- [ ] No obvious leaks
- [ ] Total memory under 200MB

#### Load Time Testing (5 min)
- [ ] Initial load under 3 seconds
- [ ] Room transitions under 0.5 seconds
- [ ] No visible pop-in
- [ ] Assets load smoothly

### 5. Gameplay Balance Analysis (30 min)

Play through and evaluate:

**Difficulty Curve:**
- [ ] Early rooms are easy (tutorial-level)
- [ ] Difficulty increases gradually
- [ ] No difficulty spikes
- [ ] Boss is challenging but fair

**Combat Balance:**
- [ ] Player damage feels impactful
- [ ] Enemy health not too high or low
- [ ] No enemies feel unfair
- [ ] Invincibility frames are sufficient
- [ ] Player health pool appropriate

**Progression Pacing:**
- [ ] Abilities unlock at good rate
- [ ] Not too fast or slow
- [ ] Each ability opens new areas
- [ ] Backtracking is rewarding
- [ ] Map size feels right (not too big/small)

**Recommendations:**
(Fill in based on playtesting)

### 6. Accessibility Audit

**Visual:**
- [ ] High contrast UI
- [ ] Text is readable
- [ ] Important info not color-coded only
- [ ] No flashing faster than 3Hz

**Controls:**
- [ ] Keyboard controls work
- [ ] All actions have key bindings
- [ ] No rapid button mashing required
- [ ] Input buffering helps timing

**Difficulty:**
- [ ] Game can be completed
- [ ] Deaths don't feel punishing
- [ ] Clear indication of what to do
- [ ] No softlock scenarios

## Bug Report Template

Use this format for each bug found:

```
BUG #[number]
Severity: [Critical/High/Medium/Low]
Title: [Short description]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Result:
[What should happen]

Actual Result:
[What actually happens]

Additional Info:
- Browser: [Chrome/Firefox/etc]
- Console errors: [Yes/No - paste if yes]
- Screenshot: [If applicable]
```

## Deliverables

Create these files:

1. **`tests/test-report.md`** - Complete test execution results
2. **`tests/bug-list.md`** - All bugs found with severity
3. **`tests/performance-report.md`** - FPS, memory, load times
4. **`tests/balance-recommendations.md`** - Gameplay tuning suggestions
5. **`tests/accessibility-audit.md`** - Accessibility findings
6. **`tests/final-qa-summary.md`** - Overall assessment

## Final Verification Checklist

Before declaring game "complete":

**Functionality:**
- [ ] Can start new game
- [ ] Can explore all 8 rooms
- [ ] Can unlock all abilities
- [ ] Can defeat all enemy types
- [ ] Can defeat boss
- [ ] Can save and load
- [ ] Can pause and resume
- [ ] All menus work

**Quality:**
- [ ] No game-breaking bugs
- [ ] Runs at 60 FPS
- [ ] No memory leaks
- [ ] Visual effects present
- [ ] Sound placeholders in console
- [ ] UI is clear and readable
- [ ] Controls are responsive

**Polish:**
- [ ] Game feels good to play
- [ ] Combat is satisfying
- [ ] Movement is smooth
- [ ] Progression is rewarding
- [ ] No obvious rough edges

## Success Criteria

Game is **release-ready** (for prototype standards). No critical bugs. Performance is acceptable. Gameplay is enjoyable. Ready for playtesting by others.

---

**STATUS:** Ready for execution AFTER Agent 7 completes
**DEPENDENCIES:** Agent 7 MUST be complete
**ESTIMATED TIME:** 2-3 hours
```

---

## 🎯 FINAL INTEGRATION INSTRUCTIONS

After all agents complete, verify:

1. ✅ All 50+ files created
2. ✅ Git history shows agent commits
3. ✅ index.html opens in browser
4. ✅ Game is playable start to finish
5. ✅ No critical bugs
6. ✅ Performance is acceptable

Then output success message:

```
═══════════════════════════════════════════════════════════
🎮 METROIDVANIA MULTI-AGENT BUILD COMPLETE! 🎮
═══════════════════════════════════════════════════════════

✅ Agent 1: Player Controller - COMPLETE
✅ Agent 2: Combat System - COMPLETE
✅ Agent 3: Map System - COMPLETE
✅ Agent 4: Ability System - COMPLETE
✅ Agent 5: Enemy AI - COMPLETE
✅ Agent 6: UI System - COMPLETE
✅ Agent 7: Integration - COMPLETE
✅ Agent 8: Testing & QA - COMPLETE

📊 Build Statistics:
- Total Files: [X]
- Lines of Code: ~[X]
- Build Time: [X] hours
- Commit Count: [X]

🎮 Game Features:
✅ 8 interconnected rooms
✅ 5 enemy types with unique AI
✅ 8 unlockable abilities
✅ Full combat system
✅ Save/load functionality
✅ Complete UI and menus
✅ Boss battle
✅ Visual effects
✅ 60 FPS performance

📥 Next Steps:
1. Download project folder
2. Open index.html
3. Play game!

═══════════════════════════════════════════════════════════
Ready for playtesting! 🚀
═══════════════════════════════════════════════════════════
```

---

END OF MASTER AGENT CONFIGURATION FILE
