# TODO: MAP-SYSTEM Agent

**Agent Role:** World Structure, Rooms, Transitions
**Status:** ⏳ WAITING FOR PHASE 2 START
**Dependencies:** EventBus.js

---

## Tasks
- [ ] Read `agents/MAP-SYSTEM.md`
- [ ] Create `src/map/MapManager.js` (100 lines)
- [ ] Create `src/map/RoomData.js` (60 lines)
- [ ] Create `src/map/RoomTransition.js` (60 lines)
- [ ] Create `src/map/DoorController.js` (70 lines)
- [ ] Create `src/map/MinimapGenerator.js` (80 lines)
- [ ] Create `assets/data/rooms.json` (200 lines) - ALL 8 rooms
- [ ] Create `tests/test-map.html` (150 lines)
- [ ] Git commit: "Implement map system"

---

## Room Graph to Implement
```
      [03-Locked]
           |
[05]---[01-Start]---[02]---[04]
                      |
                    [06]
                      |
              [07]--[08-Boss]
```

---

## Deliverable Output
**File:** `deliverables/MAP_SYSTEM_OUTPUT.json`

```json
{
  "agent": "MAP-SYSTEM",
  "status": "complete",
  "timestamp": "2025-11-20T17:05:00Z",
  "duration_minutes": 25,
  "files_created": [
    {"path": "src/map/MapManager.js", "lines": 100},
    {"path": "src/map/RoomData.js", "lines": 60},
    {"path": "src/map/RoomTransition.js", "lines": 60},
    {"path": "src/map/DoorController.js", "lines": 70},
    {"path": "src/map/MinimapGenerator.js", "lines": 80},
    {"path": "assets/data/rooms.json", "lines": 200},
    {"path": "tests/test-map.html", "lines": 150}
  ],
  "total_lines": 720,
  "rooms_created": 8,
  "events_emitted": ["room:changed", "room:entered", "room:exited", "door:locked", "door:unlocked"],
  "events_listened": ["ability:unlocked"],
  "summary": "8 interconnected rooms with smooth 0.5s fade transitions. Ability-gated doors, minimap generation, and room connection graph. Room 01 is starting chamber, Room 08 is boss room."
}
```

---

**Status:** ⏳ WAITING
**Progress:** 0/8 tasks
