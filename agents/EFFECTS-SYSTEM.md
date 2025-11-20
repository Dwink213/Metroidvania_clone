# EFFECTS-SYSTEM Agent Specification

## Role
Implement visual effects: camera, particles, screen effects

## Files to Create (280 lines total)

### src/effects/CameraController.js (100 lines)
- Follow player sprite
- Dead zone (80x60 pixels)
- Smooth interpolation (0.1 lerp)
- Screen shake effect
- Room bounds

### src/effects/ParticleManager.js (100 lines)
- Dust particles on landing
- Particle burst on enemy defeat
- Trail effects for dash
- Impact effects

### src/effects/ScreenEffects.js (80 lines)
- Screen shake (intensity, duration)
- Flash effect (color, duration)
- Hit pause (0.05s freeze)
- Fade transitions

## Test File
- tests/test-effects.html (100 lines)
- Verify camera follows player
- Verify screen shake works
- Verify particles spawn
- Verify effects don't crash game

## Dependencies
- EventBus.js
- PlayerController (for camera follow)
- Listen: `combat:hit`, `player:landed`, `enemy:defeated`

## Time: 15 minutes
## Token Budget: 3,000

## Emit: `system:effects:complete`
