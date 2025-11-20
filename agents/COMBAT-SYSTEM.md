# COMBAT-SYSTEM Agent Specification

## Role
Implement combat mechanics, health management, and damage system

## Files to Create (280 lines total)

### src/combat/CombatController.js (80 lines)
- Coordinate combat actions
- Create attack hitboxes (60px radius)
- Handle invincibility frames (1.5s)
- Manage attack cooldowns
- Event: `combat:attacked`, `combat:hit`

### src/combat/HealthComponent.js (60 lines)
- Track current/max HP
- Handle damage/healing
- Check if defeated
- Event: `combat:damaged`, `combat:defeated`

### src/combat/Projectile.js (50 lines)
- Ranged attack bullets (400 px/s)
- Move towards target
- Destroy on impact
- Handle lifetime (3 seconds)

### src/combat/HitDetection.js (40 lines)
- Check hitbox overlaps
- Calculate damage
- Apply knockback
- Filter invincible targets

### src/combat/DamageNumber.js (50 lines)
- Floating damage text effect
- Rise and fade animation
- Color by damage type (red=enemy, blue=player)

## Test File
- tests/test-combat.html (150 lines)
- Verify melee attacks work
- Verify ranged attacks work
- Verify damage calculation
- Verify invincibility frames
- Verify knockback physics

## Dependencies
- EventBus.js
- Phaser physics

## Time: 20 minutes
## Token Budget: 3,000

## Emit: `system:combat:complete`
