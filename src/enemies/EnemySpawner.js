import EventBus from '../EventBus.js';
import EnemyPatroller from './EnemyPatroller.js';
import EnemyFlyer from './EnemyFlyer.js';
import EnemyShooter from './EnemyShooter.js';
import EnemyCharger from './EnemyCharger.js';
import EnemyMiniBoss from './EnemyMiniBoss.js';

/**
 * EnemySpawner - Manages enemy spawning based on room changes
 */
export default class EnemySpawner {
    constructor(scene, enemiesData) {
        this.scene = scene;
        this.enemiesData = enemiesData;
        this.activeEnemies = [];
        this.defeatedEnemies = new Set(); // Track defeated enemies

        this.setupEventListeners();
    }

    setupEventListeners() {
        EventBus.on('room:entered', (data) => {
            this.spawnEnemiesForRoom(data.roomId);
        });

        EventBus.on('enemy:defeated', (data) => {
            this.onEnemyDefeated(data.enemyId);
        });
    }

    /**
     * Spawn all enemies for a room
     */
    spawnEnemiesForRoom(roomId) {
        // Clear previous enemies
        this.despawnAllEnemies();

        const roomEnemies = this.enemiesData[roomId];
        if (!roomEnemies) {
            return; // No enemies in this room
        }

        for (const enemyData of roomEnemies) {
            // Skip if already defeated
            if (this.defeatedEnemies.has(enemyData.id)) {
                continue;
            }

            const enemy = this.createEnemy(enemyData);
            if (enemy) {
                this.activeEnemies.push(enemy);

                EventBus.emit('enemy:spawned', {
                    enemy: enemy,
                    roomId: roomId
                });
            }
        }

        console.log(`[EnemySpawner] Spawned ${this.activeEnemies.length} enemies in ${roomId}`);
    }

    /**
     * Create enemy instance based on type
     */
    createEnemy(enemyData) {
        const { type, x, y, id } = enemyData;

        let enemy = null;

        switch (type) {
            case 'patroller':
                enemy = new EnemyPatroller(this.scene, x, y, { id });
                break;
            case 'flyer':
                enemy = new EnemyFlyer(this.scene, x, y, { id });
                break;
            case 'shooter':
                enemy = new EnemyShooter(this.scene, x, y, { id });
                break;
            case 'charger':
                enemy = new EnemyCharger(this.scene, x, y, { id });
                break;
            case 'miniBoss':
                enemy = new EnemyMiniBoss(this.scene, x, y, { id });
                break;
            default:
                console.error(`[EnemySpawner] Unknown enemy type: ${type}`);
        }

        return enemy;
    }

    /**
     * Update all active enemies
     */
    update(delta, playerPos) {
        for (let i = this.activeEnemies.length - 1; i >= 0; i--) {
            const enemy = this.activeEnemies[i];

            if (!enemy.isActive()) {
                this.activeEnemies.splice(i, 1);
                continue;
            }

            enemy.update(delta, playerPos);
        }
    }

    /**
     * Called when enemy is defeated
     */
    onEnemyDefeated(enemyId) {
        this.defeatedEnemies.add(enemyId);
    }

    /**
     * Despawn all active enemies
     */
    despawnAllEnemies() {
        for (const enemy of this.activeEnemies) {
            enemy.destroy();
        }
        this.activeEnemies = [];
    }

    /**
     * Get all active enemies
     */
    getActiveEnemies() {
        return this.activeEnemies;
    }

    /**
     * Export state for saving
     */
    exportState() {
        return {
            defeatedEnemies: Array.from(this.defeatedEnemies)
        };
    }

    /**
     * Import state from save
     */
    importState(state) {
        if (state.defeatedEnemies) {
            this.defeatedEnemies = new Set(state.defeatedEnemies);
        }
    }
}
