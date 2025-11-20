import EventBus from '../EventBus.js';
import AbilityDefinitions from './AbilityDefinitions.js';

/**
 * AbilityManager - Manages ability unlocking and progression tracking
 */
export default class AbilityManager {
    constructor(scene) {
        this.scene = scene;
        this.unlockedAbilities = new Map(); // abilityId -> timestamp
        this.collectedItems = new Set(); // collectibleId
    }

    /**
     * Unlock an ability
     */
    unlockAbility(abilityId) {
        if (this.hasAbility(abilityId)) {
            console.log(`[AbilityManager] Ability already unlocked: ${abilityId}`);
            return false;
        }

        const definition = AbilityDefinitions[abilityId];
        if (!definition) {
            console.error(`[AbilityManager] Unknown ability: ${abilityId}`);
            return false;
        }

        this.unlockedAbilities.set(abilityId, Date.now());

        EventBus.emit('ability:unlocked', {
            abilityId: abilityId,
            ability: definition
        });

        console.log(`[AbilityManager] Unlocked: ${definition.name}`);
        return true;
    }

    /**
     * Check if player has an ability
     */
    hasAbility(abilityId) {
        return this.unlockedAbilities.has(abilityId);
    }

    /**
     * Get all unlocked abilities
     */
    getUnlockedAbilities() {
        return Array.from(this.unlockedAbilities.keys());
    }

    /**
     * Collect a collectible item
     */
    collectItem(collectibleId, abilityType) {
        if (this.collectedItems.has(collectibleId)) {
            return false; // Already collected
        }

        this.collectedItems.add(collectibleId);

        EventBus.emit('ability:collected', {
            collectibleId: collectibleId,
            abilityType: abilityType
        });

        // Unlock the corresponding ability
        this.unlockAbility(abilityType);

        return true;
    }

    /**
     * Get ability definition
     */
    getAbilityDefinition(abilityId) {
        return AbilityDefinitions[abilityId];
    }

    /**
     * Get all ability definitions
     */
    getAllAbilityDefinitions() {
        return AbilityDefinitions;
    }

    /**
     * Get unlock progress (for UI)
     */
    getUnlockProgress() {
        const total = Object.keys(AbilityDefinitions).length;
        const unlocked = this.unlockedAbilities.size;
        return {
            unlocked: unlocked,
            total: total,
            percentage: (unlocked / total) * 100
        };
    }

    /**
     * Export state for saving
     */
    exportState() {
        return {
            unlockedAbilities: Array.from(this.unlockedAbilities.keys()),
            collectedItems: Array.from(this.collectedItems)
        };
    }

    /**
     * Import state from save
     */
    importState(state) {
        if (state.unlockedAbilities) {
            this.unlockedAbilities.clear();
            state.unlockedAbilities.forEach(abilityId => {
                this.unlockedAbilities.set(abilityId, Date.now());
            });
        }

        if (state.collectedItems) {
            this.collectedItems.clear();
            state.collectedItems.forEach(itemId => {
                this.collectedItems.add(itemId);
            });
        }
    }
}
