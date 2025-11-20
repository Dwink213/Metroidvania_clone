import EventBus from '../EventBus.js';

/**
 * HealthComponent - Manages health for any entity (player, enemy, boss)
 * Handles damage, healing, death detection, and invincibility frames
 */
export default class HealthComponent {
    constructor(entity, maxHealth = 100) {
        this.entity = entity;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.isAlive = true;
        this.invincible = false;
        this.invincibilityTimer = 0;
        this.invincibilityDuration = 1.5; // seconds
    }

    /**
     * Apply damage to this entity
     * @param {number} amount - Damage amount
     * @param {object} source - Source of damage (for knockback direction)
     * @returns {boolean} - True if damage was applied
     */
    takeDamage(amount, source = null) {
        if (!this.isAlive || this.invincible) {
            return false;
        }

        this.currentHealth -= amount;
        this.currentHealth = Math.max(0, this.currentHealth);

        // Enable invincibility frames
        this.invincible = true;
        this.invincibilityTimer = this.invincibilityDuration;

        // Emit damage event
        EventBus.emit('combat:damaged', {
            entity: this.entity,
            damage: amount,
            currentHealth: this.currentHealth,
            maxHealth: this.maxHealth,
            source: source
        });

        // Check for death
        if (this.currentHealth <= 0) {
            this.isAlive = false;
            EventBus.emit('combat:defeated', {
                entity: this.entity
            });
        }

        return true;
    }

    /**
     * Heal this entity
     */
    heal(amount) {
        if (!this.isAlive) return;

        this.currentHealth += amount;
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth);
    }

    /**
     * Update invincibility timer
     */
    update(delta) {
        const dt = delta / 1000;

        if (this.invincible) {
            this.invincibilityTimer -= dt;
            if (this.invincibilityTimer <= 0) {
                this.invincible = false;
                this.invincibilityTimer = 0;
            }
        }
    }

    getHealthPercent() {
        return this.currentHealth / this.maxHealth;
    }

    isInvincible() {
        return this.invincible;
    }
}
