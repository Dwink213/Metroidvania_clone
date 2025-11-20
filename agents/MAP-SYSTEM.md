# MAP-SYSTEM Agent Specification

## Role
Implement world structure, rooms, transitions, and minimap

## Files to Create (470 lines total)

### src/map/MapManager.js (100 lines)
- Load room data from JSON
- Switch between rooms
- Trigger room transitions
- Track current room
- Event: `room:changed`, `room:entered`, `room:exited`

### src/map/RoomData.js (60 lines)
- Parse rooms.json
- Provide room access methods
- Validate room connections

### src/map/RoomTransition.js (60 lines)
- Fade out effect (0.5s)
- Load new room
- Fade in effect (0.5s)
- Smooth camera transition

### src/map/DoorController.js (70 lines)
- Check door ability requirements
- Lock/unlock doors
- Show visual feedback
- Event: `door:locked`, `door:unlocked`
- Listen: `ability:unlocked`

### src/map/MinimapGenerator.js (80 lines)
- Generate minimap display
- Update explored rooms
- Show current room indicator
- Render connections between rooms

### assets/data/rooms.json (200 lines)
```json
{
  "room_01": {
    "id": "room_01",
    "name": "Starting Chamber",
    "width": 1280,
    "height": 704,
    "spawnPoint": { "x": 320, "y": 480 },
    "connections": {
      "east": { "roomId": "room_02", "doorType": "open" },
      "west": { "roomId": "room_05", "doorType": "ability", "requires": "dash" }
    },
    "platforms": [
      { "x": 0, "y": 650, "width": 1280, "height": 54 }
    ]
  }
  // ... 7 more rooms
}
```

Room Graph:
```
      [03-Locked]
           |
[05]---[01-Start]---[02]---[04]
                      |
                    [06]
                      |
              [07]--[08-Boss]
```

## Test File
- tests/test-map.html (150 lines)
- Verify room loading
- Verify transitions work
- Verify door gating logic
- Verify minimap updates

## Dependencies
- EventBus.js
- AbilityManager (for door unlocking)

## Time: 25 minutes
## Token Budget: 3,000

## Emit: `system:map:complete`
