import EventBus from '../EventBus.js';

/**
 * MinimapDisplay - Shows current room and explored areas
 */
export default class MinimapDisplay {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.roomSize = 16;
        this.padding = 2;
        this.exploredRooms = new Set();
        this.currentRoom = null;
        this.roomGraphics = [];

        // Room positions (same as MinimapGenerator)
        this.roomPositions = {
            'room_01': { gridX: 1, gridY: 1 },
            'room_02': { gridX: 2, gridY: 1 },
            'room_03': { gridX: 1, gridY: 0 },
            'room_04': { gridX: 3, gridY: 1 },
            'room_05': { gridX: 0, gridY: 1 },
            'room_06': { gridX: 2, gridY: 2 },
            'room_07': { gridX: 2, gridY: 3 },
            'room_08': { gridX: 3, gridY: 3 }
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        EventBus.on('room:entered', (data) => {
            this.setCurrentRoom(data.roomId);
            this.markExplored(data.roomId);
        });
    }

    markExplored(roomId) {
        if (!this.exploredRooms.has(roomId)) {
            this.exploredRooms.add(roomId);
            this.redraw();
        }
    }

    setCurrentRoom(roomId) {
        this.currentRoom = roomId;
        this.redraw();
    }

    redraw() {
        // Clear existing
        this.roomGraphics.forEach(g => g.destroy());
        this.roomGraphics = [];

        // Draw each explored room
        for (const roomId of this.exploredRooms) {
            const pos = this.roomPositions[roomId];
            if (!pos) continue;

            const roomX = this.x + pos.gridX * (this.roomSize + this.padding);
            const roomY = this.y + pos.gridY * (this.roomSize + this.padding);

            const isCurrent = roomId === this.currentRoom;
            const color = isCurrent ? 0x00ff00 : 0x888888;

            const rect = this.scene.add.rectangle(
                roomX, roomY,
                this.roomSize, this.roomSize,
                color, 0.9
            );
            rect.setOrigin(0, 0);
            rect.setScrollFactor(0);
            rect.setDepth(1000);

            this.roomGraphics.push(rect);
        }
    }
}
