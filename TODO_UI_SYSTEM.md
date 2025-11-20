# TODO: UI-SYSTEM Agent

**Agent Role:** User Interface, HUD, Menus
**Status:** ⏳ WAITING FOR PHASE 2 START
**Dependencies:** EventBus.js

---

## Tasks
- [ ] Read `agents/UI-SYSTEM.md`
- [ ] Create `src/ui/HUDController.js` (50 lines)
- [ ] Create `src/ui/HealthBar.js` (40 lines)
- [ ] Create `src/ui/MinimapDisplay.js` (50 lines)
- [ ] Create `src/ui/MenuSystem.js` (60 lines)
- [ ] Create `src/ui/PauseMenu.js` (50 lines)
- [ ] Create `src/ui/MapScreen.js` (50 lines)
- [ ] Create `src/ui/InventoryScreen.js` (50 lines)
- [ ] Create `src/ui/SettingsMenu.js` (40 lines)
- [ ] Create `src/ui/NotificationManager.js` (50 lines)
- [ ] Create `src/ui/DialogueBox.js` (50 lines)
- [ ] Create `tests/test-ui.html` (140 lines)
- [ ] Git commit: "Implement UI system"

---

## Deliverable Output
**File:** `deliverables/UI_SYSTEM_OUTPUT.json`

```json
{
  "agent": "UI-SYSTEM",
  "status": "complete",
  "timestamp": "2025-11-20T18:30:00Z",
  "duration_minutes": 30,
  "files_created": [
    {"path": "src/ui/HUDController.js", "lines": 50},
    {"path": "src/ui/HealthBar.js", "lines": 40},
    {"path": "src/ui/MinimapDisplay.js", "lines": 50},
    {"path": "src/ui/MenuSystem.js", "lines": 60},
    {"path": "src/ui/PauseMenu.js", "lines": 50},
    {"path": "src/ui/MapScreen.js", "lines": 50},
    {"path": "src/ui/InventoryScreen.js", "lines": 50},
    {"path": "src/ui/SettingsMenu.js", "lines": 40},
    {"path": "src/ui/NotificationManager.js", "lines": 50},
    {"path": "src/ui/DialogueBox.js", "lines": 50},
    {"path": "tests/test-ui.html", "lines": 140}
  ],
  "total_lines": 630,
  "events_emitted": ["menu:opened", "menu:closed", "ui:notification"],
  "events_listened": ["combat:damaged", "ability:unlocked", "room:changed"],
  "summary": "Complete UI system with HUD (health bar, minimap), pause menu (ESC), map screen (M), inventory (I), settings, notifications, and dialogue box. All menus navigable with keyboard."
}
```

---

**Status:** ⏳ WAITING
**Progress:** 0/12 tasks
