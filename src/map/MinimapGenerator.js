import EventBus from '../EventBus.js';

/**
 * MinimapGenerator - Generate and update minimap display
 */
export default class MinimapGenerator {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.roomSize = 24; // pixels per room on minimap
        this.padding = 4;
        this.exploredRooms = new Set();
        this.currentRoomId = null;
        this.roomGraphics = {};

        // Room positions in grid (hand-mapped based on room graph)
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

    /**
     * Mark a room as explored
     */
    markExplored(roomId) {
        if (!this.exploredRooms.has(roomId)) {
            this.exploredRooms.add(roomId);
            this.redraw();
        }
    }

    /**
     * Set current room (highlight on minimap)
     */
    setCurrentRoom(roomId) {
        this.currentRoomId = roomId;
        this.redraw();
    }

    /**
     * Redraw entire minimap
     */
    redraw() {
        // Clear existing graphics
        Object.values(this.roomGraphics).forEach(g => g.destroy());
        this.roomGraphics = {};

        // Draw each explored room
        for (const roomId of this.exploredRooms) {
            const pos = this.roomPositions[roomId];
            if (!pos) continue;

            const roomX = this.x + pos.gridX * (this.roomSize + this.padding);
            const roomY = this.y + pos.gridY * (this.roomSize + this.padding);

            const isCurrent = roomId === this.currentRoomId;
            const color = isCurrent ? 0x00ff00 : 0x888888;

            const rect = this.scene.add.rectangle(
                roomX, roomY,
                this.roomSize, this.roomSize,
                color, 0.8
            );
            rect.setOrigin(0, 0);
            rect.setScrollFactor(0); // Fixed to screen
            rect.setDepth(900);

            this.roomGraphics[roomId] = rect;
        }
    }

    /**
     * Get explored percentage
     */
    getExploredPercent() {
        const totalRooms = Object.keys(this.roomPositions).length;
        return (this.exploredRooms.size / totalRooms) * 100;
    }

    /**
     * For testing - reveal all rooms
     */
    revealAll() {
        Object.keys(this.roomPositions).forEach(roomId => {
            this.markExplored(roomId);
        });
    }
}
