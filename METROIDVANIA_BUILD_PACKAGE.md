# 🎮 METROIDVANIA GAME - AUTONOMOUS BUILD PACKAGE

## 📋 README - START HERE

### What This Is
This package contains a complete, autonomous build instruction set for Claude Code to create a fully playable Metroidvania game from scratch. No questions, no stops - just a working game at the end.

### System Requirements

**For Your PC:**
- Modern web browser (Chrome 90+, Firefox 88+, or Edge 90+)
- Internet connection (for Claude Code Web and Phaser.js CDN)
- 8GB+ RAM recommended
- That's it! No installations needed on your local machine.

**Claude Code Web will handle everything else.**

### Software/Dependencies
✅ **NONE required on your PC!**

Claude Code Web will automatically:
- Set up the project structure
- Install any needed dependencies in the cloud environment
- Create all game files
- Generate placeholder assets
- Test everything
- Give you downloadable files at the end

### Setup Instructions

#### STEP 1: Open Claude Code Web
1. Go to https://claude.ai/code (or wherever Claude Code is hosted)
2. Sign in if needed
3. Click "New Project" or open an existing repo

#### STEP 2: Paste the Master Prompt
1. Scroll down to the **"MASTER PROMPT"** section below
2. Copy the ENTIRE prompt (everything in the code block)
3. Paste it into Claude Code's chat interface
4. Hit Enter/Send

#### STEP 3: Walk Away
- Claude will build for 2-6 hours
- It will create ~50 files
- It will test everything
- No input needed from you

#### STEP 4: Download and Play
1. When complete, Claude will tell you "Build complete"
2. Download the entire project folder
3. Open `index.html` in your browser
4. Play your game!

### What You'll Get

A complete, playable Metroidvania game with:
- ✅ 8+ interconnected rooms
- ✅ Smooth player movement (run, jump, dash, wall jump)
- ✅ 5 enemy types with unique AI
- ✅ Combat system (melee + ranged)
- ✅ 8 unlockable abilities
- ✅ Ability-gated progression
- ✅ Save/load system
- ✅ Full UI (HUD, menus, map, inventory)
- ✅ Minimap that fills as you explore
- ✅ Boss battle
- ✅ Visual effects (particles, screen shake)
- ✅ 60 FPS performance

### Expected Timeline
- Project setup: 5-10 minutes
- Core systems build: 1-2 hours
- Integration: 1-2 hours
- Testing & polish: 30-60 minutes
- **Total: 2-6 hours** (depends on Claude Code speed)

### Troubleshooting

**If Claude asks questions:**
- Reply: "Make the decision yourself based on best practices. Keep building."

**If Claude stops mid-build:**
- Reply: "Continue building. Execute the full plan to completion."

**If you get errors:**
- Claude will debug and fix them automatically
- The build includes automated testing

**After download, if game won't open:**
- Make sure you're opening `index.html` (not other files)
- Try a different browser (Chrome recommended)
- Check browser console (F12) for errors
- If you see CORS errors: You need to run a local server (see below)

### Optional: Local Development Server

If you want to modify the game after download, you may need a local server (to avoid browser CORS restrictions):

**Option 1: Python (if you have it installed)**
```bash
# Navigate to game folder
cd path/to/metroidvania-game

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Open browser to: http://localhost:8000
```

**Option 2: Node.js (if you have it installed)**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to game folder
cd path/to/metroidvania-game

# Start server
http-server

# Open browser to: http://localhost:8080
```

**Option 3: VS Code Live Server Extension**
1. Install VS Code (free)
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

**Option 4: Just use Firefox**
- Firefox allows opening local HTML files directly without CORS issues
- Chrome/Edge are more strict about this

---

## 🚀 MASTER PROMPT - COPY EVERYTHING BELOW THIS LINE

```
# AUTONOMOUS METROIDVANIA BUILD - EXECUTE TO COMPLETION WITHOUT STOPPING

You are Claude Code building a complete, playable Metroidvania game from scratch. Execute this ENTIRE plan autonomously without asking ANY questions. Make all design decisions yourself based on best practices. Build everything to completion.

## 🎯 SUCCESS CRITERIA

When finished, I must be able to:
1. Download the project
2. Open index.html in a browser
3. See a main menu with "New Game" button
4. Start game and control a character (WASD + Space + Shift)
5. Explore 8+ interconnected rooms with smooth transitions
6. Fight 5 different enemy types
7. Unlock abilities that gate progression (double jump, dash, etc.)
8. Save game and reload to same position
9. See working HUD (health bar, minimap, abilities)
10. Experience smooth 60 FPS gameplay with visual polish

## 📁 PROJECT STRUCTURE

Initialize git repo and create this EXACT structure:

```
metroidvania-game/
├── index.html                 # Main entry point with Phaser CDN
├── README.md                  # How to play, controls, credits
├── .gitignore                 # Ignore node_modules if needed
│
├── src/
│   ├── main.js               # Game initialization, creates Phaser instance
│   ├── config.js             # Phaser configuration
│   ├── EventBus.js           # Central event system for inter-system communication
│   │
│   ├── player/
│   │   ├── PlayerController.js      # Main player movement and state
│   │   ├── InputManager.js          # Keyboard input handling
│   │   └── PhysicsConstants.js      # All physics tuning values
│   │
│   ├── combat/
│   │   ├── CombatController.js      # Combat system coordinator
│   │   ├── HealthComponent.js       # Health management
│   │   ├── Projectile.js            # Ranged attack projectiles
│   │   ├── HitDetection.js          # Collision detection for attacks
│   │   └── DamageNumber.js          # Floating damage numbers effect
│   │
│   ├── map/
│   │   ├── MapManager.js            # Room loading and management
│   │   ├── RoomData.js              # Room definitions and layout
│   │   ├── RoomTransition.js        # Smooth room transition effects
│   │   ├── DoorController.js        # Door gating logic
│   │   └── MinimapGenerator.js      # Minimap rendering
│   │
│   ├── abilities/
│   │   ├── AbilityManager.js        # Ability unlock system
│   │   ├── Collectible.js           # Collectible pickup items
│   │   ├── AbilityDefinitions.js    # All ability metadata
│   │   ├── SaveManager.js           # LocalStorage save/load
│   │   └── UnlockAnimation.js       # Ability unlock visual effect
│   │
│   ├── enemies/
│   │   ├── EnemyBase.js             # Base enemy class
│   │   ├── EnemyPatroller.js        # Ground patrol enemy
│   │   ├── EnemyFlyer.js            # Flying enemy with swoop
│   │   ├── EnemyShooter.js          # Ranged stationary enemy
│   │   ├── EnemyCharger.js          # Charging enemy
│   │   ├── EnemyMiniBoss.js         # Boss with phases
│   │   ├── EnemySpawner.js          # Enemy spawn management
│   │   └── AIBehaviors.js           # Reusable AI components
│   │
│   ├── ui/
│   │   ├── HUDController.js         # HUD coordinator
│   │   ├── HealthBar.js             # Health bar component
│   │   ├── MinimapDisplay.js        # Minimap UI component
│   │   ├── MenuSystem.js            # Menu framework
│   │   ├── PauseMenu.js             # Pause menu (ESC key)
│   │   ├── MapScreen.js             # Full map view
│   │   ├── InventoryScreen.js       # Ability inventory
│   │   ├── SettingsMenu.js          # Settings screen
│   │   ├── NotificationManager.js   # Toast notifications
│   │   └── DialogueBox.js           # NPC dialogue display
│   │
│   ├── effects/
│   │   ├── ParticleManager.js       # Particle effects system
│   │   ├── ScreenEffects.js         # Screen shake, flash effects
│   │   └── CameraController.js      # Smooth camera follow
│   │
│   └── scenes/
│       ├── BootScene.js             # Asset loading scene
│       ├── MainMenuScene.js         # Title screen
│       ├── GameScene.js             # Main gameplay scene
│       └── GameOverScene.js         # Death/game over screen
│
├── assets/
│   ├── images/
│   │   ├── tileset.png              # Platform tiles (generate simple colored tiles)
│   │   ├── player-sprite.png        # Player sprite (32x32 colored square)
│   │   ├── enemy-sprites.png        # Enemy sprites (different colors)
│   │   └── ui-elements.png          # UI icons and elements
│   │
│   ├── audio/                       # Placeholder - use console.log for now
│   │   ├── music/.gitkeep
│   │   └── sfx/.gitkeep
│   │
│   └── data/
│       ├── rooms.json               # All 8 room definitions
│       ├── enemies.json             # Enemy spawn locations
│       └── collectibles.json        # Ability pickup locations
│
├── tests/
│   ├── test-player.html             # Test player movement
│   ├── test-combat.html             # Test combat system
│   ├── test-map.html                # Test room transitions
│   ├── test-abilities.html          # Test ability unlocks
│   ├── test-enemies.html            # Test enemy AI
│   ├── test-ui.html                 # Test all menus
│   └── integration-test.html        # Full game integration test
│
└── docs/
    ├── ARCHITECTURE.md              # System architecture documentation
    ├── CONTROLS.md                  # Control scheme and gameplay
    └── BUILD-LOG.md                 # Build process log
```

## 🔧 PHASE 1: PROJECT INITIALIZATION (10 minutes)

Execute these in order:

1. **Initialize git repository**
```bash
git init
git add .gitignore
git commit -m "Initial commit"
```

2. **Create .gitignore**
```
node_modules/
.DS_Store
*.log
.vscode/
```

3. **Create index.html** with Phaser 3.x CDN:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metroidvania Game</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        #game-container {
            max-width: 1280px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div id="game-container"></div>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
    <script type="module" src="src/main.js"></script>
</body>
</html>
```

4. **Create src/EventBus.js** - Central event system:
```javascript
class EventBus {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
    
    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    }
    
    clear() {
        this.events = {};
    }
}

export default new EventBus();
```

5. **Create src/config.js** - Phaser configuration:
```javascript
export default {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [] // Will populate with scenes
};
```

6. **Commit progress**
```bash
git add .
git commit -m "Project structure and initialization"
```

## 🎮 PHASE 2: CORE SYSTEMS (90-120 minutes)

Build all systems in parallel. Complete each fully before moving on.

### SYSTEM 2A: PLAYER CONTROLLER

**src/player/PhysicsConstants.js**
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
    COYOTE_TIME: 0.1,    // 6 frames at 60fps
    JUMP_BUFFER: 0.1     // 6 frames at 60fps
};
```

**src/player/InputManager.js** - Handle all input:
```javascript
export default class InputManager {
    constructor(scene) {
        this.scene = scene;
        this.keys = {};
        this.setupKeys();
    }
    
    setupKeys() {
        const { W, A, S, D, SPACE, SHIFT, ESC } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            up: W,
            left: A,
            down: S,
            right: D,
            jump: SPACE,
            dash: SHIFT,
            pause: ESC,
            // Arrow key alternatives
            upAlt: Phaser.Input.Keyboard.KeyCodes.UP,
            leftAlt: Phaser.Input.Keyboard.KeyCodes.LEFT,
            downAlt: Phaser.Input.Keyboard.KeyCodes.DOWN,
            rightAlt: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });
    }
    
    isUpPressed() {
        return this.keys.up.isDown || this.keys.upAlt.isDown;
    }
    
    isDownPressed() {
        return this.keys.down.isDown || this.keys.downAlt.isDown;
    }
    
    isLeftPressed() {
        return this.keys.left.isDown || this.keys.leftAlt.isDown;
    }
    
    isRightPressed() {
        return this.keys.right.isDown || this.keys.rightAlt.isDown;
    }
    
    isJumpPressed() {
        return this.keys.jump.isDown;
    }
    
    isJumpJustPressed() {
        return Phaser.Input.Keyboard.JustDown(this.keys.jump);
    }
    
    isDashPressed() {
        return Phaser.Input.Keyboard.JustDown(this.keys.dash);
    }
    
    isPausePressed() {
        return Phaser.Input.Keyboard.JustDown(this.keys.pause);
    }
}
```

**src/player/PlayerController.js** - Complete player movement:
```javascript
import EventBus from '../EventBus.js';
import PhysicsConstants from './PhysicsConstants.js';

export default class PlayerController {
    constructor(scene, x, y) {
        this.scene = scene;
        
        // Create sprite (placeholder colored rectangle for now)
        this.sprite = scene.add.rectangle(x, y, 32, 32, 0x4488ff);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);
        this.sprite.body.setMaxVelocity(PhysicsConstants.MOVE_SPEED, PhysicsConstants.MAX_FALL_SPEED);
        
        // State
        this.facing = 'right';
        this.abilities = {
            dash: false,
            doubleJump: false,
            wallJump: false,
            glide: false
        };
        
        // Movement state
        this.hasDoubleJumped = false;
        this.coyoteTimer = 0;
        this.jumpBufferTimer = 0;
        this.dashTimer = 0;
        this.dashCooldown = 0;
        this.isDashing = false;
        this.isWallSliding = false;
        this.wallDirection = 0;
    }
    
    update(delta, input) {
        const dt = delta / 1000; // Convert to seconds
        
        // Update timers
        this.coyoteTimer -= dt;
        this.jumpBufferTimer -= dt;
        this.dashTimer -= dt;
        this.dashCooldown -= dt;
        
        // Check grounded state
        const wasGrounded = this.isGrounded();
        const grounded = this.sprite.body.blocked.down;
        
        if (grounded && !wasGrounded) {
            EventBus.emit('player:landed', { position: this.getPosition() });
            this.hasDoubleJumped = false;
            console.log('SFX: land');
        }
        
        if (grounded) {
            this.coyoteTimer = PhysicsConstants.COYOTE_TIME;
        }
        
        // Jump buffering
        if (input.isJumpJustPressed()) {
            this.jumpBufferTimer = PhysicsConstants.JUMP_BUFFER;
        }
        
        // Dash handling
        if (this.isDashing) {
            if (this.dashTimer <= 0) {
                this.isDashing = false;
            }
            return; // Skip other movement during dash
        }
        
        // Horizontal movement
        let targetVelocityX = 0;
        if (input.isLeftPressed()) {
            targetVelocityX = -PhysicsConstants.MOVE_SPEED;
            this.facing = 'left';
        } else if (input.isRightPressed()) {
            targetVelocityX = PhysicsConstants.MOVE_SPEED;
            this.facing = 'right';
        }
        
        // Apply acceleration/friction
        const currentVelX = this.sprite.body.velocity.x;
        const accel = PhysicsConstants.ACCELERATION * dt;
        const friction = PhysicsConstants.FRICTION * dt;
        
        if (targetVelocityX !== 0) {
            if (Math.abs(currentVelX) < Math.abs(targetVelocityX)) {
                this.sprite.body.setVelocityX(
                    Phaser.Math.Clamp(
                        currentVelX + Math.sign(targetVelocityX) * accel,
                        -PhysicsConstants.MOVE_SPEED,
                        PhysicsConstants.MOVE_SPEED
                    )
                );
            } else {
                this.sprite.body.setVelocityX(targetVelocityX);
            }
        } else {
            // Apply friction
            if (Math.abs(currentVelX) < friction) {
                this.sprite.body.setVelocityX(0);
            } else {
                this.sprite.body.setVelocityX(currentVelX - Math.sign(currentVelX) * friction);
            }
        }
        
        // Wall slide detection
        this.isWallSliding = false;
        this.wallDirection = 0;
        if (!grounded && this.abilities.wallJump) {
            if (this.sprite.body.blocked.left) {
                this.isWallSliding = true;
                this.wallDirection = -1;
            } else if (this.sprite.body.blocked.right) {
                this.isWallSliding = true;
                this.wallDirection = 1;
            }
        }
        
        // Wall slide physics
        if (this.isWallSliding && this.sprite.body.velocity.y > 0) {
            this.sprite.body.setVelocityY(
                this.sprite.body.velocity.y * PhysicsConstants.WALL_SLIDE_FRICTION
            );
        }
        
        // Jump handling
        const canCoyoteJump = this.coyoteTimer > 0;
        const canDoubleJump = this.abilities.doubleJump && !grounded && !this.hasDoubleJumped;
        const canWallJump = this.abilities.wallJump && this.isWallSliding;
        const wantsToJump = this.jumpBufferTimer > 0;
        
        if (wantsToJump) {
            if (canCoyoteJump) {
                this.jump();
                this.jumpBufferTimer = 0;
                this.coyoteTimer = 0;
            } else if (canWallJump) {
                this.wallJump();
                this.jumpBufferTimer = 0;
            } else if (canDoubleJump) {
                this.jump();
                this.hasDoubleJumped = true;
                this.jumpBufferTimer = 0;
                console.log('SFX: doubleJump');
            }
        }
        
        // Variable jump height
        if (!input.isJumpPressed() && this.sprite.body.velocity.y < 0) {
            this.sprite.body.setVelocityY(
                this.sprite.body.velocity.y * PhysicsConstants.JUMP_RELEASE_DECELERATION
            );
        }
        
        // Glide
        if (this.abilities.glide && input.isJumpPressed() && this.sprite.body.velocity.y > 0 && !grounded) {
            this.sprite.body.setVelocityY(Math.min(this.sprite.body.velocity.y, 100));
        }
        
        // Dash
        if (this.abilities.dash && input.isDashPressed() && this.dashCooldown <= 0) {
            this.dash();
        }
    }
    
    jump() {
        this.sprite.body.setVelocityY(PhysicsConstants.JUMP_VELOCITY);
        EventBus.emit('player:jumped', { position: this.getPosition() });
        console.log('SFX: jump');
    }
    
    wallJump() {
        this.sprite.body.setVelocityY(PhysicsConstants.WALL_JUMP_VERTICAL);
        this.sprite.body.setVelocityX(-this.wallDirection * PhysicsConstants.WALL_JUMP_HORIZONTAL);
        this.isWallSliding = false;
        EventBus.emit('player:wallJumped', { position: this.getPosition(), direction: -this.wallDirection });
        console.log('SFX: wallJump');
    }
    
    dash() {
        this.isDashing = true;
        this.dashTimer = PhysicsConstants.DASH_DURATION;
        this.dashCooldown = PhysicsConstants.DASH_COOLDOWN;
        
        const dashDirection = this.facing === 'right' ? 1 : -1;
        this.sprite.body.setVelocity(dashDirection * PhysicsConstants.DASH_SPEED, 0);
        
        EventBus.emit('player:dashed', { position: this.getPosition(), direction: dashDirection });
        console.log('SFX: dash');
    }
    
    isGrounded() {
        return this.sprite.body.blocked.down;
    }
    
    getPosition() {
        return { x: this.sprite.x, y: this.sprite.y };
    }
    
    getVelocity() {
        return { x: this.sprite.body.velocity.x, y: this.sprite.body.velocity.y };
    }
    
    getFacing() {
        return this.facing;
    }
    
    unlockAbility(abilityName) {
        if (this.abilities.hasOwnProperty(abilityName)) {
            this.abilities[abilityName] = true;
            console.log(`Ability unlocked: ${abilityName}`);
        }
    }
    
    takeDamage(amount, knockbackDirection) {
        EventBus.emit('player:damaged', { amount, knockbackDirection });
        // Knockback implementation would go here
    }
}
```

**Create test-player.html** for testing movement in isolation.

### SYSTEM 2B: COMBAT SYSTEM

Build CombatController.js, HealthComponent.js, Projectile.js, HitDetection.js, DamageNumber.js following the same pattern as player controller. Include:
- Melee attack with 60px hitbox
- Ranged projectiles at 400px/s
- Invincibility frames (1.5s)
- Knockback physics
- Visual damage numbers

### SYSTEM 2C: MAP SYSTEM

Build MapManager.js, RoomData.js with 8 rooms, RoomTransition.js, DoorController.js, MinimapGenerator.js.

**Key room layout:**
```
      [03-Locked]
           |
[05]---[01-Start]---[02]---[04]
                      |
                    [06]
                      |
              [07]--[08-Boss]
```

Rooms 05,06,07 require abilities. Room 03 requires key. Room 08 is boss.

### SYSTEM 2D: ABILITY SYSTEM

Build AbilityManager.js, SaveManager.js with LocalStorage, Collectible.js, UnlockAnimation.js.

**Save data structure:**
```json
{
  "version": "1.0.0",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "playerHealth": 100,
  "currentRoom": "room_01",
  "abilities": ["dash", "doubleJump"],
  "exploredRooms": ["room_01", "room_02"],
  "defeatedEnemies": ["enemy_001", "enemy_002"],
  "collectibles": ["health_upgrade_01"]
}
```

### SYSTEM 2E: ENEMY SYSTEM

Build all 5 enemy classes with distinct behaviors:
1. **Patroller**: Basic left-right movement, chases player within 300px
2. **Flyer**: Sine wave flight pattern, swoops at player
3. **Shooter**: Stationary, fires projectiles every 2s
4. **Charger**: Wind-up charge attack
5. **MiniBoss**: 3-phase fight, 200 HP

Each enemy emits events for damage taken/dealt.

### SYSTEM 2F: UI SYSTEM

Build complete UI with:
- HUD (health bar top-left, minimap top-right)
- Pause menu (ESC key)
- Map screen (full view of explored rooms)
- Inventory screen (abilities list)
- Settings menu (placeholder volume sliders)

**Commit after each system is complete:**
```bash
git add src/player/
git commit -m "Player controller complete"
# ... repeat for each system
```

## 🔗 PHASE 3: INTEGRATION (90-120 minutes)

### 3.1: Create Scene Files

**src/scenes/BootScene.js** - Asset loading:
```javascript
export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    
    preload() {
        // Load placeholder assets
        // For now, we'll generate simple colored shapes
        this.load.on('complete', () => {
            console.log('Assets loaded');
        });
    }
    
    create() {
        // Generate placeholder graphics
        this.generatePlaceholderAssets();
        this.scene.start('MainMenuScene');
    }
    
    generatePlaceholderAssets() {
        // Create simple colored rectangles as placeholders
        // This will be replaced with actual sprites later
        console.log('Generated placeholder assets');
    }
}
```

**src/scenes/MainMenuScene.js** - Title screen:
```javascript
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }
    
    create() {
        const { width, height } = this.cameras.main;
        
        // Title
        this.add.text(width/2, height/3, 'METROIDVANIA', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // New Game button
        const newGameBtn = this.add.text(width/2, height/2, 'NEW GAME', {
            fontSize: '32px',
            color: '#4488ff'
        }).setOrigin(0.5).setInteractive();
        
        newGameBtn.on('pointerdown', () => {
            console.log('SFX: menuSelect');
            this.scene.start('GameScene');
        });
        
        // Continue button
        const continueBtn = this.add.text(width/2, height/2 + 60, 'CONTINUE', {
            fontSize: '32px',
            color: '#4488ff'
        }).setOrigin(0.5).setInteractive();
        
        continueBtn.on('pointerdown', () => {
            console.log('SFX: menuSelect');
            // Check if save exists
            if (localStorage.getItem('metroidvania_save')) {
                this.scene.start('GameScene', { loadSave: true });
            } else {
                this.showNoSaveMessage();
            }
        });
        
        // Hover effects
        [newGameBtn, continueBtn].forEach(btn => {
            btn.on('pointerover', () => btn.setColor('#88ccff'));
            btn.on('pointerout', () => btn.setColor('#4488ff'));
        });
    }
    
    showNoSaveMessage() {
        const msg = this.add.text(
            this.cameras.main.width/2,
            this.cameras.main.height - 100,
            'No save data found!',
            { fontSize: '24px', color: '#ff4444' }
        ).setOrigin(0.5);
        
        this.time.delayedCall(2000, () => msg.destroy());
    }
}
```

**src/scenes/GameScene.js** - Main gameplay scene (CRITICAL - this wires everything together):
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

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    
    init(data) {
        this.loadSave = data.loadSave || false;
    }
    
    create() {
        console.log('GameScene: Initializing all systems...');
        
        // Initialize systems in order
        this.eventBus = EventBus;
        this.input = new InputManager(this);
        this.map = new MapManager(this);
        this.player = new PlayerController(this, 400, 300);
        this.combat = new CombatController(this, this.player);
        this.abilities = new AbilityManager(this);
        this.enemies = new EnemySpawner(this);
        this.hud = new HUDController(this);
        this.camera = new CameraController(this, this.player);
        this.particles = new ParticleManager(this);
        
        // Wire up event listeners
        this.setupEventListeners();
        
        // Load save if requested
        if (this.loadSave) {
            this.abilities.loadGame(0);
        } else {
            // Start fresh
            this.map.loadRoom('room_01');
        }
        
        // Setup physics collisions
        this.setupCollisions();
        
        console.log('GameScene: All systems initialized');
    }
    
    setupEventListeners() {
        // Player events → Combat
        this.eventBus.on('player:attacked', (data) => {
            this.combat.handlePlayerAttack(data);
        });
        
        // Combat events → Health → UI
        this.eventBus.on('player:damaged', (data) => {
            this.combat.handlePlayerDamaged(data);
            this.hud.updateHealth(this.combat.getCurrentHealth(), this.combat.getMaxHealth());
            this.camera.shake(5, 200);
        });
        
        // Ability unlocks → Player
        this.eventBus.on('ability:unlocked', (ability) => {
            this.player.unlockAbility(ability.id);
            this.hud.showAbilityUnlock(ability);
        });
        
        // Room changes → All systems
        this.eventBus.on('room:changed', (roomId) => {
            this.enemies.spawnEnemiesForRoom(roomId);
            this.hud.updateMinimap(roomId, this.player.getPosition());
        });
        
        // Enemy defeated → Abilities (for save tracking)
        this.eventBus.on('enemy:defeated', (enemyId) => {
            this.abilities.markEnemyDefeated(enemyId);
        });
        
        // Pause menu
        this.eventBus.on('menu:pause', () => {
            this.scene.pause();
            this.hud.openPauseMenu();
        });
    }
    
    setupCollisions() {
        // Player vs Map
        this.physics.add.collider(this.player.sprite, this.map.collisionLayer);
        
        // Player vs Enemies
        this.physics.add.overlap(
            this.player.sprite,
            this.enemies.group,
            this.handlePlayerEnemyCollision,
            null,
            this
        );
        
        // Player attacks vs Enemies
        this.physics.add.overlap(
            this.combat.attackHitbox,
            this.enemies.group,
            this.handleAttackHitEnemy,
            null,
            this
        );
    }
    
    handlePlayerEnemyCollision(playerSprite, enemySprite) {
        // Enemy damages player
        if (!this.combat.isInvincible()) {
            const knockback = {
                x: Math.sign(playerSprite.x - enemySprite.x),
                y: -1
            };
            this.eventBus.emit('player:damaged', {
                amount: enemySprite.getData('contactDamage'),
                knockback: knockback
            });
        }
    }
    
    handleAttackHitEnemy(attackHitbox, enemySprite) {
        const enemy = enemySprite.getData('controller');
        if (enemy && !enemy.isInvincible()) {
            enemy.takeDamage(this.combat.getMeleeDamage());
            this.eventBus.emit('enemy:hit', { enemy: enemy });
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
            this.enemies.update(delta);
        }
        
        if (this.camera) {
            this.camera.update(delta);
        }
        
        if (this.map) {
            this.map.checkRoomTransition(this.player.getPosition());
        }
        
        // Check for pause input
        if (this.input.isPausePressed()) {
            this.eventBus.emit('menu:pause');
        }
        
        // Update HUD
        if (this.hud) {
            this.hud.update(delta);
        }
    }
}
```

**src/scenes/GameOverScene.js** - Death screen

### 3.2: Create Visual Effects

**src/effects/CameraController.js**:
```javascript
export default class CameraController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.camera = scene.cameras.main;
        
        // Setup camera follow with dead zone
        this.camera.startFollow(player.sprite, true, 0.1, 0.1);
        this.camera.setDeadzone(80, 60);
        this.camera.setBounds(0, 0, 2000, 1500); // Will be set by map
        
        this.shakeTimer = 0;
    }
    
    shake(intensity, duration) {
        this.camera.shake(duration, intensity * 0.01);
        this.shakeTimer = duration / 1000;
    }
    
    update(delta) {
        const dt = delta / 1000;
        this.shakeTimer = Math.max(0, this.shakeTimer - dt);
    }
    
    setRoomBounds(width, height) {
        this.camera.setBounds(0, 0, width, height);
    }
}
```

**src/effects/ParticleManager.js** - Particle effects for impacts, jumps, etc.

**src/effects/ScreenEffects.js** - Flash, freeze frames, etc.

### 3.3: Wire Main Entry Point

**src/main.js**:
```javascript
import config from './config.js';
import BootScene from './scenes/BootScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

// Add scenes to config
config.scene = [BootScene, MainMenuScene, GameScene, GameOverScene];

// Create game instance
const game = new Phaser.Game(config);

console.log('Metroidvania game initialized');
```

**Commit integration:**
```bash
git add src/scenes/ src/effects/ src/main.js
git commit -m "Full game integration complete"
```

## 📦 PHASE 4: CONTENT & DATA (60 minutes)

### 4.1: Create Room Data

**assets/data/rooms.json**:
```json
{
  "room_01": {
    "id": "room_01",
    "name": "Starting Chamber",
    "width": 1280,
    "height": 704,
    "spawnPoint": { "x": 320, "y": 480 },
    "connections": {
      "east": { "roomId": "room_02", "doorType": "open", "position": { "x": 1200, "y": 350 } },
      "west": { "roomId": "room_05", "doorType": "ability", "requires": "dash", "position": { "x": 80, "y": 350 } },
      "north": { "roomId": "room_03", "doorType": "locked", "requires": "key_01", "position": { "x": 640, "y": 80 } }
    },
    "platforms": [
      { "x": 0, "y": 650, "width": 1280, "height": 54 },
      { "x": 400, "y": 500, "width": 200, "height": 32 },
      { "x": 700, "y": 400, "width": 200, "height": 32 }
    ],
    "enemies": [],
    "collectibles": []
  },
  "room_02": {
    "id": "room_02",
    "name": "Eastern Corridor",
    "width": 1280,
    "height": 704,
    "spawnPoint": { "x": 200, "y": 480 },
    "connections": {
      "west": { "roomId": "room_01", "doorType": "open", "position": { "x": 80, "y": 350 } },
      "east": { "roomId": "room_04", "doorType": "open", "position": { "x": 1200, "y": 350 } },
      "south": { "roomId": "room_06", "doorType": "ability", "requires": "doubleJump", "position": { "x": 640, "y": 650 } }
    },
    "platforms": [
      { "x": 0, "y": 650, "width": 1280, "height": 54 },
      { "x": 200, "y": 500, "width": 300, "height": 32 },
      { "x": 600, "y": 400, "width": 300, "height": 32 }
    ],
    "enemies": [
      { "type": "patroller", "x": 400, "y": 450, "id": "enemy_001" },
      { "type": "flyer", "x": 800, "y": 300, "id": "enemy_002" }
    ],
    "collectibles": [
      { "type": "dash", "x": 640, "y": 350 }
    ]
  }
  // Continue for all 8 rooms...
}
```

### 4.2: Generate Placeholder Assets

Create simple colored PNG files:
- **tileset.png**: 32x32 tiles (ground=brown, wall=gray, background=dark gray)
- **player-sprite.png**: 32x32 blue rectangle
- **enemy-sprites.png**: 32x32 rectangles (red, purple, green, yellow, orange for each enemy type)
- **ui-elements.png**: Simple icons for abilities, health hearts

Use code to generate these or create minimal PNGs.

### 4.3: Create Test Files

**tests/integration-test.html** - Full game test:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Integration Test</title>
</head>
<body>
    <h1>Integration Test Suite</h1>
    <div id="test-results"></div>
    
    <script>
        const tests = [
            { name: 'Player Movement', test: testPlayerMovement },
            { name: 'Combat System', test: testCombat },
            { name: 'Room Transitions', test: testRoomTransitions },
            { name: 'Ability Unlocks', test: testAbilities },
            { name: 'Save/Load', test: testSaveLoad }
        ];
        
        function runTests() {
            const results = document.getElementById('test-results');
            tests.forEach(({ name, test }) => {
                try {
                    test();
                    results.innerHTML += `<p style="color:green">✓ ${name} PASSED</p>`;
                } catch (e) {
                    results.innerHTML += `<p style="color:red">✗ ${name} FAILED: ${e.message}</p>`;
                }
            });
        }
        
        function testPlayerMovement() {
            // Test implementation
            console.log('Testing player movement...');
        }
        
        function testCombat() {
            console.log('Testing combat...');
        }
        
        function testRoomTransitions() {
            console.log('Testing room transitions...');
        }
        
        function testAbilities() {
            console.log('Testing abilities...');
        }
        
        function testSaveLoad() {
            console.log('Testing save/load...');
        }
        
        window.onload = runTests;
    </script>
</body>
</html>
```

**Commit content:**
```bash
git add assets/ tests/
git commit -m "Game content and test suite complete"
```

## 🧪 PHASE 5: TESTING & POLISH (60 minutes)

### 5.1: Run All Tests

Open each test file and verify:
- [ ] Player moves smoothly with WASD/arrows
- [ ] Jump feels responsive with variable height
- [ ] Dash and wall jump work when abilities unlocked
- [ ] Combat hits enemies and shows damage numbers
- [ ] Health bar updates on damage
- [ ] Room transitions are smooth (0.5s fade)
- [ ] Doors check ability requirements correctly
- [ ] Minimap fills as rooms are explored
- [ ] Save/load preserves all state
- [ ] Enemies patrol and chase player
- [ ] All menus navigate correctly
- [ ] Game runs at 60 FPS

### 5.2: Add Polish

- Screen shake on impacts (5px for 200ms)
- Particle bursts on enemy death
- Dust particles on player landing
- Damage flash (sprite flickers white)
- Hit pause (0.05s freeze on heavy hits)
- Smooth camera interpolation
- Sound effect console.log triggers

### 5.3: Performance Check

Open Chrome DevTools:
1. Performance tab → Record 30 seconds of gameplay
2. Verify consistent 60 FPS
3. Check memory usage (should be stable)
4. Profile any frame drops

**Commit polish:**
```bash
git add .
git commit -m "Polish and performance optimization complete"
```

## 📚 PHASE 6: DOCUMENTATION (30 minutes)

### 6.1: Create README.md

```markdown
# 🎮 Metroidvania Game

A complete, browser-based Metroidvania game built with Phaser.js featuring interconnected rooms, ability-gated progression, combat, and exploration.

## 🎯 Features

- ✅ Smooth player movement (run, jump, dash, wall jump)
- ✅ 8+ interconnected rooms with ability-gated progression
- ✅ 5 unique enemy types with distinct AI behaviors
- ✅ Combat system with melee and ranged attacks
- ✅ 8 unlockable abilities (double jump, dash, glide, etc.)
- ✅ Full save/load system using LocalStorage
- ✅ Complete UI (HUD, minimap, menus, inventory)
- ✅ Boss battle with multiple phases
- ✅ Visual effects (particles, screen shake, hit flashes)
- ✅ 60 FPS performance

## 🕹️ Controls

**Movement:**
- WASD or Arrow Keys: Move
- Space: Jump (hold for higher jump)
- Shift: Dash (unlockable)

**Combat:**
- Z or J: Melee attack
- X or K: Ranged attack

**Menu:**
- ESC: Pause menu
- M: Full map view
- I: Inventory

## 🚀 How to Play

### Option 1: Direct File (Simple)
1. Open `index.html` in Firefox (recommended)
2. Start playing!

### Option 2: Local Server (Better)
If using Chrome/Edge, you'll need a local server:

**With Python:**
```bash
python -m http.server 8000
# Open browser to http://localhost:8000
```

**With Node.js:**
```bash
npx http-server
# Open browser to http://localhost:8080
```

## 🗺️ Game World

The game features 8 interconnected rooms:

1. **Starting Chamber** - Safe starting area
2. **Eastern Corridor** - First enemies encounter
3. **Northern Vault** - Locked with key
4. **Eastern Heights** - Platforming challenges
5. **Western Depths** - Requires dash ability
6. **Southern Cavern** - Requires double jump
7. **Lower Ruins** - Advanced platforming
8. **Boss Chamber** - Final challenge

## 💾 Save System

Your game progress automatically saves:
- Current room and position
- Unlocked abilities
- Explored rooms
- Defeated enemies
- Health and stats

Access save menu from pause menu (ESC).

## 🎮 Abilities

Collect these abilities to access new areas:

1. **Dash** - Quick horizontal burst
2. **Double Jump** - Jump again in mid-air
3. **Wall Jump** - Jump off walls
4. **Glide** - Hold jump to slow fall
5. **Ground Pound** - Break certain floors
6. **Grappling Hook** - Swing from points
7. **Sprint** - Increased move speed
8. **Health Upgrade** - +20 max HP

## 🏗️ Technical Details

**Built With:**
- Phaser 3.70.0 (game engine)
- Vanilla JavaScript (ES6 modules)
- HTML5 Canvas
- LocalStorage (save data)

**Architecture:**
- Event-driven system communication
- Modular component design
- Scene-based state management
- Arcade physics engine

## 📁 Project Structure

```
metroidvania-game/
├── index.html          # Entry point
├── src/                # All game code
│   ├── player/         # Player controller
│   ├── combat/         # Combat system
│   ├── map/            # World and rooms
│   ├── abilities/      # Progression system
│   ├── enemies/        # Enemy AI
│   ├── ui/             # Menus and HUD
│   ├── effects/        # Visual effects
│   └── scenes/         # Game scenes
├── assets/             # Images and data
└── tests/              # Test suite
```

## 🐛 Known Issues

None! If you find bugs, they're features. 😄

## 🎵 Future Enhancements

- Add music and sound effects
- Create custom pixel art sprites
- Add more enemy types
- Implement speedrun timer
- Add achievements system
- Create multiple difficulty modes

## 👏 Credits

**Built by:** Claude Code (Autonomous AI Build System)
**Engine:** Phaser.js
**Genre:** Metroidvania / Action-Platformer
**Year:** 2025

## 📜 License

This is a demonstration project. Feel free to use, modify, and learn from the code!

---

**Enjoy exploring! 🗺️**
```

### 6.2: Create ARCHITECTURE.md

Document the system architecture, event flow, and integration points.

### 6.3: Create CONTROLS.md

Detailed control scheme and gameplay mechanics guide.

**Final commit:**
```bash
git add docs/ README.md
git commit -m "Documentation complete - BUILD FINISHED"
git log --oneline  # Show build history
```

## ✅ COMPLETION CHECKLIST

Before declaring success, verify ALL of these:

- [ ] `index.html` opens without errors
- [ ] Main menu displays with "New Game" button
- [ ] New Game starts in room_01 with player visible
- [ ] WASD keys move player smoothly
- [ ] Space bar makes player jump
- [ ] Shift key makes player dash (if ability unlocked)
- [ ] Player can transition between rooms
- [ ] Enemies spawn and move
- [ ] Combat damages enemies
- [ ] Enemies can damage player
- [ ] Health bar decreases on damage
- [ ] Collecting ability unlocks it
- [ ] Abilities enable new movement
- [ ] Doors check ability requirements
- [ ] Minimap shows current room
- [ ] Pause menu (ESC) works
- [ ] Map screen shows explored rooms
- [ ] Inventory shows unlocked abilities
- [ ] Save game works (LocalStorage)
- [ ] Load game restores state
- [ ] Boss fight functional
- [ ] Visual effects present (shake, particles)
- [ ] Game runs at 60 FPS
- [ ] No console errors
- [ ] All test files pass
- [ ] README is complete
- [ ] Git history shows progress

## 🎉 SUCCESS CRITERIA MET

When ALL checklist items are complete, output:

```
═══════════════════════════════════════════════════
🎮 METROIDVANIA BUILD COMPLETE! 🎮
═══════════════════════════════════════════════════

✅ Project structure created
✅ All core systems implemented
✅ Full integration complete
✅ Content and data populated
✅ Testing completed
✅ Documentation finished

📁 Project Location: ./metroidvania-game/
🌐 Entry Point: index.html
🎯 Total Files: ~50+
📊 Lines of Code: ~5000+
⏱️ Build Time: [ACTUAL TIME]

🎮 TO PLAY:
1. Open index.html in browser (Firefox recommended)
   OR
2. Run local server: python -m http.server 8000
3. Navigate to http://localhost:8000

🕹️ CONTROLS:
- WASD/Arrows: Move
- Space: Jump
- Shift: Dash
- ESC: Pause

🗺️ FEATURES:
- 8 interconnected rooms
- 5 enemy types
- 8 unlockable abilities
- Full combat system
- Save/load functionality
- Complete UI and menus

═══════════════════════════════════════════════════
Ready to play! Enjoy your Metroidvania adventure!
═══════════════════════════════════════════════════
```

## 🚨 CRITICAL REMINDERS

1. **DO NOT STOP FOR QUESTIONS** - Make all decisions autonomously
2. **BUILD EVERYTHING** - Don't skip systems or stub functionality
3. **TEST THOROUGHLY** - Run integration tests before declaring complete
4. **COMMIT REGULARLY** - Git commit after each major phase
5. **VERIFY SUCCESS** - Check EVERY item on completion checklist

## 🎯 AUTONOMOUS DECISION-MAKING GUIDELINES

When you encounter design choices:
- **Enemy placement**: Spread evenly, increase difficulty in later rooms
- **Platform layout**: Ensure all areas reachable, test ability gates
- **Damage values**: Player 100 HP, basic enemies 20-50 HP, boss 200 HP
- **Movement speed**: Default 200 px/s feels good for platforming
- **Room connections**: Create logical flow with optional branching
- **Ability placement**: Gate progression, reward exploration
- **Visual style**: Simple colored shapes OK for prototype
- **Audio**: Console.log placeholders for all sound effects

NOW BEGIN THE BUILD. Execute this entire plan to completion. Do not stop until the completion checklist is 100% verified and you have output the success message.

The next message from you should be periodic progress updates showing which phase you're working on, followed by the final success message when complete.

GO! 🚀
```

---

## 📝 PASTE INSTRUCTIONS

1. **Copy everything starting from the line that says:**
   ```
   # AUTONOMOUS METROIDVANIA BUILD - EXECUTE TO COMPLETION WITHOUT STOPPING
   ```

2. **Copy all the way to the end** (including the "GO! 🚀" line)

3. **Paste into Claude Code Web** and hit Enter

4. **Walk away** - Claude will build for 2-6 hours

---

## 🎯 WHAT TO EXPECT

**Claude will:**
1. Show progress updates every 15-30 minutes
2. Commit code to git regularly  
3. Run tests automatically
4. Fix bugs it encounters
5. Generate placeholder assets
6. Create all ~50 files
7. Verify everything works
8. Output final success message

**You don't need to:**
- Answer questions (it won't ask)
- Make decisions (it decides)
- Fix errors (it self-corrects)
- Install anything (all browser-based)

---

## 📥 AFTER COMPLETION

1. Download the entire project folder
2. Open `index.html` in your browser (Firefox works without local server)
3. Click "New Game"
4. Play your Metroidvania!

**If using Chrome/Edge:** You may need a local server (see README in the downloaded files for instructions).

---

**That's it! Completely turnkey. Just paste and wait. 🎮✨**
