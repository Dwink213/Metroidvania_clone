# SCENE-INTEGRATION Agent Specification

## Role
Wire all systems together in Phaser scenes, create game loop

## Dependencies
**MUST WAIT FOR:** ALL system agents to emit complete signals
- `system:player:complete`
- `system:combat:complete`
- `system:map:complete`
- `system:ability:complete`
- `system:enemy:complete`
- `system:ui:complete`
- `system:effects:complete`
- `validation:complete`

## Files to Create (370 lines total)

### src/scenes/BootScene.js (60 lines)
- Preload assets (placeholder sprites)
- Generate colored rectangles
- Transition to MainMenuScene

### src/scenes/MainMenuScene.js (80 lines)
- Title display
- "New Game" button
- "Continue" button (check LocalStorage)
- Hover effects
- Start GameScene

### src/scenes/GameScene.js (170 lines)
**CRITICAL INTEGRATION HUB**
```javascript
create() {
  // Initialize all systems IN ORDER
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

  // Wire event listeners
  this.setupEventListeners();

  // Setup physics collisions
  this.setupCollisions();

  // Load save or start fresh
  if (loadSave) {
    this.abilities.loadGame(0);
  } else {
    this.map.loadRoom('room_01');
  }
}

update(time, delta) {
  // Update all systems
  this.player.update(delta, this.input);
  this.combat.update(delta);
  this.enemies.update(delta);
  this.camera.update(delta);
  this.map.checkRoomTransition(this.player.getPosition());
  this.hud.update(delta);
}
```

### src/scenes/GameOverScene.js (60 lines)
- Display "Game Over"
- "Retry" button
- "Main Menu" button

### src/main.js (50 lines)
```javascript
import config from './config.js';
import BootScene from './scenes/BootScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

config.scene = [BootScene, MainMenuScene, GameScene, GameOverScene];
const game = new Phaser.Game(config);
```

## Event Wiring
```javascript
setupEventListeners() {
  // Player → Combat
  EventBus.on('player:attacked', (data) => this.combat.handlePlayerAttack(data));

  // Combat → UI
  EventBus.on('player:damaged', (data) => {
    this.combat.handlePlayerDamaged(data);
    this.hud.updateHealth(this.combat.getCurrentHealth());
    this.camera.shake(5, 200);
  });

  // Ability → Player
  EventBus.on('ability:unlocked', (ability) => {
    this.player.unlockAbility(ability.id);
    this.hud.showAbilityUnlock(ability);
  });

  // Room → Enemies
  EventBus.on('room:changed', (roomId) => {
    this.enemies.spawnEnemiesForRoom(roomId);
    this.hud.updateMinimap(roomId);
  });

  // Enemy → Abilities
  EventBus.on('enemy:defeated', (enemyId) => {
    this.abilities.markEnemyDefeated(enemyId);
  });

  // Pause
  EventBus.on('menu:pause', () => {
    this.scene.pause();
    this.hud.openPauseMenu();
  });
}
```

## Physics Collisions
```javascript
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
```

## Test File
- tests/integration-test.html (200 lines)
- Run full game
- Verify all systems work together
- Check event flow
- Verify save/load

## Time: 30 minutes
## Token Budget: 4,000

## Emit: `integration:complete`
