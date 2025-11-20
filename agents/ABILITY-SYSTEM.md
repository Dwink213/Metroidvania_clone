# ABILITY-SYSTEM Agent Specification

## Role
Implement progression system, unlockable abilities, and save/load

## Files to Create (370 lines total)

### src/abilities/AbilityManager.js (80 lines)
- Track unlocked abilities
- Handle ability collection
- Check ability requirements
- Event: `ability:unlocked`, `ability:collected`

### src/abilities/SaveManager.js (90 lines)
- Save game state to LocalStorage
- Load game state from LocalStorage
- Key: `metroidvania_save`
- Format: JSON with version, timestamp, playerHealth, currentRoom, abilities, exploredRooms, defeatedEnemies, collectibles
- Event: `game:saved`, `game:loaded`

### src/abilities/Collectible.js (50 lines)
- Collectible pickup items
- Visual representation
- Trigger collection on player overlap
- Play pickup animation

### src/abilities/UnlockAnimation.js (40 lines)
- Visual effect when ability unlocked
- Flash effect, particle burst
- Display ability name

### src/abilities/AbilityDefinitions.js (60 lines)
```javascript
export default {
  dash: { name: "Dash", description: "Quick burst of speed" },
  doubleJump: { name: "Double Jump", description: "Jump again in mid-air" },
  wallJump: { name: "Wall Jump", description: "Jump off walls" },
  glide: { name: "Glide", description: "Hold jump to slow fall" },
  groundPound: { name: "Ground Pound", description: "Smash downward" },
  grapple: { name: "Grappling Hook", description: "Swing from points" },
  sprint: { name: "Sprint", description: "Increased move speed" },
  healthUp: { name: "Health Upgrade", description: "+20 max HP" }
};
```

### assets/data/collectibles.json (50 lines)
```json
{
  "collectibles": [
    { "id": "dash_01", "type": "dash", "room": "room_02", "x": 640, "y": 350 },
    { "id": "doubleJump_01", "type": "doubleJump", "room": "room_04", "x": 800, "y": 300 }
    // ... 6 more abilities
  ]
}
```

## Test File
- tests/test-abilities.html (150 lines)
- Verify ability unlocking
- Verify save/load works
- Verify LocalStorage persistence
- Verify collectible pickup

## Dependencies
- EventBus.js
- PlayerController (to unlock abilities)
- LocalStorage API

## Time: 25 minutes
## Token Budget: 3,000

## Emit: `system:ability:complete`
