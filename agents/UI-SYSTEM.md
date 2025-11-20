# UI-SYSTEM Agent Specification

## Role
Implement all UI components: HUD, menus, notifications

## Files to Create (490 lines total)

### src/ui/HUDController.js (50 lines)
- Coordinate all HUD elements
- Update health bar, minimap, ability icons
- Layer management

### src/ui/HealthBar.js (40 lines)
- Visual health representation
- Smooth depleting animation
- Max HP: 100

### src/ui/MinimapDisplay.js (50 lines)
- Show current room
- Show explored rooms
- Player position indicator

### src/ui/MenuSystem.js (60 lines)
- Base menu framework
- Navigation, input handling
- Show/hide transitions

### src/ui/PauseMenu.js (50 lines)
- ESC key to pause
- Resume, Save, Settings, Quit options
- Pause game scene

### src/ui/MapScreen.js (50 lines)
- Full map view (M key)
- All explored rooms
- Connection lines

### src/ui/InventoryScreen.js (50 lines)
- Show unlocked abilities (I key)
- Ability icons and descriptions
- Grid layout

### src/ui/SettingsMenu.js (40 lines)
- Volume sliders (placeholder)
- Controls display
- Back button

### src/ui/NotificationManager.js (50 lines)
- Toast messages
- Ability unlock notifications
- Fade in/out animations

### src/ui/DialogueBox.js (50 lines)
- Text display for NPCs
- Typewriter effect (optional)
- Continue prompt

## Test File
- tests/test-ui.html (140 lines)
- Verify HUD displays correctly
- Verify all menus work
- Verify navigation
- Verify notifications

## Dependencies
- EventBus.js
- Listen: `combat:damaged`, `ability:unlocked`, `room:changed`

## Time: 30 minutes
## Token Budget: 3,000

## Emit: `system:ui:complete`
