import EventBus from '../EventBus.js';
import HealthComponent from '../combat/HealthComponent.js';

/**
 * EnemyBase - Base class for all enemy types
 */
export default class EnemyBase {
    constructor(scene, x, y, config = {}) {
        this.scene = scene;
        this.id = config.id || `enemy_${Date.now()}`;
        this.type = config.type || 'base';
        this.maxHealth = config.maxHealth || 50;
        this.damage = config.damage || 10;
        this.color = config.color || 0xff0000;
        this.width = config.width || 32;
        this.height = config.height || 32;
        this.isEnemy = true;
        this.active = true;

        // Create sprite
        this.sprite = scene.add.rectangle(x, y, this.width, this.height, this.color);
        scene.physics.add.existing(this.sprite);

        // Setup health
        this.health = new HealthComponent(this, this.maxHealth);

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        EventBus.on('combat:damaged', (data) => {
            if (data.entity === this) {
                this.onDamaged(data);
            }
        });

        EventBus.on('combat:defeated', (data) => {
            if (data.entity === this) {
                this.onDefeated();
            }
        });
    }

    /**
     * Called every frame - override in child classes
     */
    update(delta, playerPos) {
        if (!this.active) return;

        // Update health invincibility
        this.health.update(delta);

        // Flash sprite when invincible
        if (this.health.isInvincible()) {
            const alpha = Math.sin(Date.now() / 100) * 0.5 + 0.5;
            this.sprite.setAlpha(alpha);
        } else {
            this.sprite.setAlpha(1);
        }
    }

    /**
     * Take damage from attack
     */
    takeDamage(amount, source = null) {
        if (!this.active) return false;

        const damaged = this.health.takeDamage(amount, source);

        if (damaged) {
            EventBus.emit('enemy:hit', {
                enemy: this,
                damage: amount
            });
        }

        return damaged;
    }

    /**
     * Called when enemy takes damage
     */
    onDamaged(data) {
        // Override in child classes for custom behavior
    }

    /**
     * Called when enemy is defeated
     */
    onDefeated() {
        EventBus.emit('enemy:defeated', {
            enemyId: this.id,
            type: this.type
        });

        this.destroy();
    }

    /**
     * Destroy this enemy
     */
    destroy() {
        this.active = false;
        if (this.sprite) {
            this.sprite.destroy();
        }
    }

    getPosition() {
        if (!this.sprite || !this.active) return { x: 0, y: 0 };
        return { x: this.sprite.x, y: this.sprite.y };
    }

    getSprite() {
        return this.sprite;
    }

    isActive() {
        return this.active && this.health.isAlive;
    }
}
