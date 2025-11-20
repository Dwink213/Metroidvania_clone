/**
 * RoomData - Parse and provide access to room data from JSON
 */
export default class RoomData {
    constructor(roomsJson) {
        this.rooms = roomsJson;
        this.roomIds = Object.keys(roomsJson);
    }

    /**
     * Get room by ID
     */
    getRoom(roomId) {
        if (!this.rooms[roomId]) {
            console.error(`[RoomData] Room not found: ${roomId}`);
            return null;
        }
        return this.rooms[roomId];
    }

    /**
     * Get all room IDs
     */
    getAllRoomIds() {
        return this.roomIds;
    }

    /**
     * Get connections for a room
     */
    getConnections(roomId) {
        const room = this.getRoom(roomId);
        return room ? room.connections : {};
    }

    /**
     * Check if a connection exists
     */
    hasConnection(roomId, direction) {
        const connections = this.getConnections(roomId);
        return connections[direction] !== undefined;
    }

    /**
     * Get connected room ID in a direction
     */
    getConnectedRoom(roomId, direction) {
        const connections = this.getConnections(roomId);
        if (!connections[direction]) return null;
        return connections[direction].roomId;
    }

    /**
     * Validate room connections (both ways)
     */
    validateConnections() {
        const errors = [];

        for (const roomId of this.roomIds) {
            const room = this.getRoom(roomId);
            const connections = room.connections || {};

            for (const direction in connections) {
                const targetRoomId = connections[direction].roomId;
                const targetRoom = this.getRoom(targetRoomId);

                if (!targetRoom) {
                    errors.push(`${roomId} connects to non-existent room: ${targetRoomId}`);
                }
            }
        }

        return errors;
    }
}
