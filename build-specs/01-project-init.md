# Phase 1: Project Initialization

**Agent:** ORCHESTRATOR
**Duration:** 10 minutes

## Steps

### 1. Verify Git Repository
```bash
git status
# If not initialized:
# git init
# git add .
# git commit -m "Initial commit"
```

### 2. Create Directory Structure
```bash
mkdir -p src/{player,combat,map,abilities,enemies,ui,effects,scenes}
mkdir -p assets/{images,audio/{music,sfx},data}
mkdir -p tests
mkdir -p docs
```

### 3. Create .gitignore
```
node_modules/
.DS_Store
*.log
.vscode/
dist/
.env
```

### 4. Create index.html (80 lines)
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
            font-family: 'Courier New', monospace;
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

### 5. Create src/EventBus.js (40 lines)
```javascript
/**
 * Central event system for inter-system communication
 * All systems communicate through this EventBus (no tight coupling)
 */
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
        this.events[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`[EventBus] Error in event '${event}':`, error);
            }
        });
    }

    clear() {
        this.events = {};
    }
}

export default new EventBus();
```

### 6. Create src/config.js (20 lines)
```javascript
/**
 * Phaser game configuration
 */
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
            debug: false  // Set true for physics visualization
        }
    },
    scene: []  // Will be populated by main.js
};
```

### 7. Create Placeholder Directories
```bash
# Audio placeholders
touch assets/audio/music/.gitkeep
touch assets/audio/sfx/.gitkeep

# Images will be generated as colored rectangles in code
# Data JSONs will be created by system agents
```

### 8. Commit Progress
```bash
git add .
git commit -m "$(cat <<'EOF'
Initialize project structure

- Create directory structure for all systems
- Add index.html with Phaser 3.70.0 CDN
- Add EventBus for system communication
- Add Phaser configuration
- Add .gitignore

Ready for Phase 2: System development
EOF
)"
```

### 9. Broadcast Ready Signal
```javascript
{
  "agent": "ORCHESTRATOR",
  "event": "build:phase1:complete",
  "timestamp": "2025-11-20T15:40:00Z",
  "data": {
    "directories_created": 15,
    "files_created": 5,
    "status": "success"
  }
}
```

## Verification

Before proceeding to Phase 2, verify:
- [ ] Directory structure exists
- [ ] index.html exists and is valid HTML
- [ ] EventBus.js exists and exports singleton
- [ ] config.js exists and exports Phaser config
- [ ] .gitignore exists
- [ ] Git commit successful
- [ ] No syntax errors in created files

## What's Next

ORCHESTRATOR broadcasts `build:phase2:start` to system agents:
- PLAYER-SYSTEM
- COMBAT-SYSTEM
- MAP-SYSTEM
- ABILITY-SYSTEM
- ENEMY-SYSTEM
- UI-SYSTEM
- EFFECTS-SYSTEM

All agents work in parallel on their respective systems.
