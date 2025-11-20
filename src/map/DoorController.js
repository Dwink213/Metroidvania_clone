import EventBus from '../EventBus.js';

/**
 * DoorController - Manages door locking/unlocking based on ability requirements
 */
export default class DoorController {
    constructor(scene) {
        this.scene = scene;
        this.unlockedAbilities = new Set();
        this.doors = {}; // doorId -> door sprite

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for ability unlocks
        EventBus.on('ability:unlocked', (data) => {
            this.unlockAbility(data.abilityId);
        });
    }

    /**
     * Check if player can pass through a door
     * @param {object} connection - Connection object from rooms.json
     * @returns {boolean} - True if door can be opened
     */
    canPassDoor(connection) {
        if (!connection) return false;

        const doorType = connection.doorType;

        // Open doors always passable
        if (doorType === 'open') {
            return true;
        }

        // Ability-gated doors
        if (doorType === 'ability') {
            const required = connection.requires;
            return this.unlockedAbilities.has(required);
        }

        // Locked doors (need items)
        if (doorType === 'locked') {
            const required = connection.requires;
            return this.unlockedAbilities.has(required); // Items treated like abilities
        }

        // Boss doors (special case)
        if (doorType === 'boss') {
            return true; // Always passable (boss handles locking)
        }

        return false;
    }

    /**
     * Unlock an ability or item
     */
    unlockAbility(abilityId) {
        if (this.unlockedAbilities.has(abilityId)) return;

        this.unlockedAbilities.add(abilityId);

        EventBus.emit('door:unlocked', {
            abilityId: abilityId
        });

        console.log(`[DoorController] Unlocked ability: ${abilityId}`);
    }

    /**
     * Get visual feedback for locked door
     */
    getDoorFeedback(connection) {
        if (!connection) return 'No door';

        const doorType = connection.doorType;

        if (doorType === 'open') {
            return 'Open';
        }

        if (doorType === 'ability' || doorType === 'locked') {
            const required = connection.requires;
            const hasAbility = this.unlockedAbilities.has(required);
            return hasAbility ? 'Unlocked' : `Locked (Need: ${required})`;
        }

        if (doorType === 'boss') {
            return 'Boss Door';
        }

        return 'Unknown';
    }

    /**
     * For testing/debugging - unlock all abilities
     */
    unlockAll() {
        const allAbilities = ['dash', 'doubleJump', 'wallJump', 'glide', 'key_01'];
        allAbilities.forEach(id => this.unlockAbility(id));
    }
}
