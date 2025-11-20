# ENEMY-SYSTEM Agent Specification

## Role
Implement 5 enemy types with unique AI, spawning system, and behaviors

## Files to Create (560 lines total)

### src/enemies/EnemyBase.js (80 lines)
- Parent class for all enemies
- Health management
- Damage handling
- Event emissions
- Common methods: update(), takeDamage(), isInvincible()

### src/enemies/EnemyPatroller.js (60 lines)
- Left-right patrol movement
- Chase player within 300px
- Simple ground movement

### src/enemies/EnemyFlyer.js (70 lines)
- Sine wave flight pattern
- Swoop attacks at player
- Aerial movement

### src/enemies/EnemyShooter.js (60 lines)
- Stationary position
- Fire projectiles every 2 seconds
- Range detection (500px)

### src/enemies/EnemyCharger.js (70 lines)
- Wind-up animation (1s)
- Charge attack (fast movement)
- Collision damage

### src/enemies/EnemyMiniBoss.js (100 lines)
- 3-phase fight (200 HP total)
- Phase 1 (200-150 HP): Basic attacks
- Phase 2 (150-75 HP): Add projectiles
- Phase 3 (75-0 HP): Faster, more aggressive
- Event: `boss:phaseChange`

### src/enemies/EnemySpawner.js (70 lines)
- Spawn enemies for each room
- Read from enemies.json
- Track spawned enemies
- Prevent respawning defeated enemies
- Event: `enemy:spawned`
- Listen: `room:changed`

### src/enemies/AIBehaviors.js (50 lines)
- Reusable AI components
- Chase behavior
- Patrol behavior
- Range detection
- Line of sight checks

### assets/data/enemies.json (100 lines)
```json
{
  "room_02": [
    { "id": "enemy_001", "type": "patroller", "x": 400, "y": 450 },
    { "id": "enemy_002", "type": "flyer", "x": 800, "y": 300 }
  ],
  // ... enemies for all rooms
  "room_08": [
    { "id": "boss_001", "type": "miniBoss", "x": 640, "y": 400 }
  ]
}
```

## Test File
- tests/test-enemies.html (180 lines)
- Verify each enemy type works
- Verify AI behaviors
- Verify spawning logic
- Verify boss phases

## Dependencies
- EventBus.js
- CombatController (for damage)
- MapManager (for room-based spawning)

## Time: 30 minutes
## Token Budget: 3,000

## Emit: `system:enemy:complete`
