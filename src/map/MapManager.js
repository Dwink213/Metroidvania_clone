import EventBus from '../EventBus.js';
import RoomData from './RoomData.js';
import RoomTransition from './RoomTransition.js';
import DoorController from './DoorController.js';

/**
 * MapManager - Main orchestrator for room loading, transitions, and world structure
 */
export default class MapManager {
    constructor(scene, roomsJsonData) {
        this.scene = scene;
        this.roomData = new RoomData(roomsJsonData);
        this.transition = new RoomTransition(scene);
        this.doorController = new DoorController(scene);

        this.currentRoomId = null;
        this.currentRoomObjects = {
            platforms: [],
            walls: [],
            collectibles: [],
            enemies: []
        };

        // Validate room connections
        const errors = this.roomData.validateConnections();
        if (errors.length > 0) {
            console.error('[MapManager] Room connection errors:', errors);
        }
    }

    /**
     * Load a room by ID
     */
    async loadRoom(roomId, useTransition = false) {
        const room = this.roomData.getRoom(roomId);
        if (!room) {
            console.error(`[MapManager] Cannot load room: ${roomId}`);
            return;
        }

        if (useTransition) {
            await this.transition.transition(() => {
                this.performRoomLoad(room);
            });
        } else {
            this.performRoomLoad(room);
        }
    }

    /**
     * Actually load room data (called during transition or directly)
     */
    performRoomLoad(room) {
        // Emit room exited for previous room
        if (this.currentRoomId) {
            EventBus.emit('room:exited', {
                roomId: this.currentRoomId
            });
        }

        // Clear previous room
        this.clearCurrentRoom();

        // Set current room
        this.currentRoomId = room.id;

        // Set camera bounds
        this.scene.cameras.main.setBounds(0, 0, room.width, room.height);

        // Set world bounds for physics
        this.scene.physics.world.setBounds(0, 0, room.width, room.height);

        // Set background color
        this.scene.cameras.main.setBackgroundColor(room.backgroundColor || 0x2a2a2a);

        // Create platforms with enhanced visuals
        if (room.platforms) {
            room.platforms.forEach(platform => {
                const container = this.scene.add.container(
                    platform.x + platform.width / 2,
                    platform.y + platform.height / 2
                );

                const graphics = this.scene.add.graphics();

                // Shadow/depth
                graphics.fillStyle(0x4a3a2a, 1);
                graphics.fillRect(-platform.width / 2 + 2, -platform.height / 2 + 2, platform.width, platform.height);

                // Main platform body (stone texture)
                graphics.fillStyle(0x8b7355, 1);
                graphics.fillRect(-platform.width / 2, -platform.height / 2, platform.width, platform.height);

                // Highlight edge
                graphics.fillStyle(0xa08566, 1);
                graphics.fillRect(-platform.width / 2, -platform.height / 2, platform.width, 3);

                // Texture details (random cracks/stones)
                for (let i = 0; i < platform.width / 40; i++) {
                    const x = -platform.width / 2 + Math.random() * platform.width;
                    const y = -platform.height / 2 + Math.random() * platform.height;
                    graphics.fillStyle(0x6a5545, 0.5);
                    graphics.fillRect(x, y, 6 + Math.random() * 8, 4 + Math.random() * 6);
                }

                container.add(graphics);

                this.scene.physics.add.existing(container, true);
                // Fix physics body size after adding to container
                container.body.setSize(platform.width, platform.height);
                container.body.setOffset(-platform.width / 2, -platform.height / 2);

                this.currentRoomObjects.platforms.push(container);
            });
        }

        // Create walls with enhanced visuals
        if (room.walls) {
            room.walls.forEach(wall => {
                const container = this.scene.add.container(
                    wall.x + wall.width / 2,
                    wall.y + wall.height / 2
                );

                const graphics = this.scene.add.graphics();

                // Shadow
                graphics.fillStyle(0x333333, 1);
                graphics.fillRect(-wall.width / 2 + 1, -wall.height / 2 + 1, wall.width, wall.height);

                // Main wall body (darker stone)
                graphics.fillStyle(0x555555, 1);
                graphics.fillRect(-wall.width / 2, -wall.height / 2, wall.width, wall.height);

                // Edge highlights
                graphics.lineStyle(2, 0x666666, 1);
                graphics.strokeRect(-wall.width / 2, -wall.height / 2, wall.width, wall.height);

                // Brick texture
                for (let y = 0; y < wall.height; y += 20) {
                    graphics.lineStyle(1, 0x444444, 0.7);
                    graphics.lineBetween(
                        -wall.width / 2,
                        -wall.height / 2 + y,
                        wall.width / 2,
                        -wall.height / 2 + y
                    );
                }

                container.add(graphics);

                this.scene.physics.add.existing(container, true);
                container.body.setSize(wall.width, wall.height);
                container.body.setOffset(-wall.width / 2, -wall.height / 2);

                this.currentRoomObjects.walls.push(container);
            });
        }

        // Emit room entered
        EventBus.emit('room:entered', {
            roomId: room.id,
            roomName: room.name,
            spawnPoint: room.spawnPoint,
            room: room
        });

        EventBus.emit('room:changed', {
            roomId: room.id,
            previousRoomId: this.currentRoomId
        });
    }

    /**
     * Clear all objects from current room
     */
    clearCurrentRoom() {
        Object.values(this.currentRoomObjects).forEach(objArray => {
            objArray.forEach(obj => {
                if (obj && obj.destroy) {
                    obj.destroy();
                }
            });
        });

        this.currentRoomObjects = {
            platforms: [],
            walls: [],
            collectibles: [],
            enemies: []
        };
    }

    /**
     * Check if player is near a door and attempt transition
     */
    checkRoomTransition(playerPos) {
        const room = this.roomData.getRoom(this.currentRoomId);
        if (!room || !room.connections) return;

        const threshold = 50; // pixels from edge to trigger transition

        for (const direction in room.connections) {
            const connection = room.connections[direction];
            let shouldTransition = false;

            // Check if player is near the edge in this direction
            if (direction === 'north' && playerPos.y < threshold) {
                shouldTransition = true;
            } else if (direction === 'south' && playerPos.y > room.height - threshold) {
                shouldTransition = true;
            } else if (direction === 'west' && playerPos.x < threshold) {
                shouldTransition = true;
            } else if (direction === 'east' && playerPos.x > room.width - threshold) {
                shouldTransition = true;
            }

            if (shouldTransition) {
                // Check if door is unlocked
                if (this.doorController.canPassDoor(connection)) {
                    this.loadRoom(connection.roomId, true);
                    return; // Only one transition at a time
                } else {
                    // Show locked message
                    const feedback = this.doorController.getDoorFeedback(connection);
                    EventBus.emit('door:locked', {
                        direction: direction,
                        feedback: feedback,
                        requires: connection.requires
                    });
                }
            }
        }
    }

    getCurrentRoom() {
        return this.roomData.getRoom(this.currentRoomId);
    }

    getPlatforms() {
        return this.currentRoomObjects.platforms;
    }

    getWalls() {
        return this.currentRoomObjects.walls;
    }
}
