import EventBus from '../EventBus.js';

/**
 * SaveManager - Handle game state persistence using LocalStorage
 */
export default class SaveManager {
    constructor() {
        this.saveKey = 'metroidvania_save';
        this.version = '1.0.0';
        this.autoSaveInterval = 60000; // Auto-save every 60 seconds
        this.autoSaveTimer = null;
    }

    /**
     * Save game state to LocalStorage
     * @param {object} gameState - Complete game state to save
     */
    saveGame(gameState) {
        try {
            const saveData = {
                version: this.version,
                timestamp: new Date().toISOString(),
                playerHealth: gameState.playerHealth || 100,
                playerMaxHealth: gameState.playerMaxHealth || 100,
                currentRoom: gameState.currentRoom || 'room_01',
                playerPosition: gameState.playerPosition || { x: 320, y: 480 },
                abilities: gameState.abilities || [],
                collectedItems: gameState.collectedItems || [],
                exploredRooms: gameState.exploredRooms || [],
                defeatedEnemies: gameState.defeatedEnemies || [],
                playTime: gameState.playTime || 0
            };

            const serialized = JSON.stringify(saveData);
            localStorage.setItem(this.saveKey, serialized);

            EventBus.emit('game:saved', {
                timestamp: saveData.timestamp,
                success: true
            });

            console.log('[SaveManager] Game saved successfully');
            return true;

        } catch (error) {
            console.error('[SaveManager] Failed to save game:', error);
            EventBus.emit('game:save:failed', {
                error: error.message
            });
            return false;
        }
    }

    /**
     * Load game state from LocalStorage
     * @returns {object|null} - Loaded game state or null if no save exists
     */
    loadGame() {
        try {
            const serialized = localStorage.getItem(this.saveKey);
            if (!serialized) {
                console.log('[SaveManager] No save data found');
                return null;
            }

            const saveData = JSON.parse(serialized);

            // Version check
            if (saveData.version !== this.version) {
                console.warn(`[SaveManager] Save version mismatch: ${saveData.version} vs ${this.version}`);
                // Could implement migration logic here
            }

            EventBus.emit('game:loaded', {
                timestamp: saveData.timestamp,
                success: true
            });

            console.log('[SaveManager] Game loaded successfully');
            return saveData;

        } catch (error) {
            console.error('[SaveManager] Failed to load game:', error);
            EventBus.emit('game:load:failed', {
                error: error.message
            });
            return null;
        }
    }

    /**
     * Check if save data exists
     */
    hasSaveData() {
        return localStorage.getItem(this.saveKey) !== null;
    }

    /**
     * Delete save data
     */
    deleteSave() {
        try {
            localStorage.removeItem(this.saveKey);
            console.log('[SaveManager] Save data deleted');
            return true;
        } catch (error) {
            console.error('[SaveManager] Failed to delete save:', error);
            return false;
        }
    }

    /**
     * Enable auto-save
     */
    enableAutoSave(getGameStateFn) {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
        }

        this.autoSaveTimer = setInterval(() => {
            const gameState = getGameStateFn();
            this.saveGame(gameState);
        }, this.autoSaveInterval);

        console.log('[SaveManager] Auto-save enabled');
    }

    /**
     * Disable auto-save
     */
    disableAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
            console.log('[SaveManager] Auto-save disabled');
        }
    }
}
