import EventBus from '../EventBus.js';

/**
 * Projectile - Ranged attack projectile with movement and collision
 */
export default class Projectile {
    constructor(scene, x, y, velocityX, velocityY, damage = 10, owner = null) {
        this.scene = scene;
        this.damage = damage;
        this.owner = owner; // Entity that fired this
        this.active = true;
        this.lifetime = 3.0; // seconds
        this.speed = 400; // px/s

        // Create visual
        this.sprite = scene.add.rectangle(x, y, 8, 8, 0xff0000);
        scene.physics.add.existing(this.sprite);

        // Set velocity
        const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (magnitude > 0) {
            const normalizedX = velocityX / magnitude;
            const normalizedY = velocityY / magnitude;
            this.sprite.body.setVelocity(normalizedX * this.speed, normalizedY * this.speed);
        } else {
            // Default to right if no direction given
            this.sprite.body.setVelocity(this.speed, 0);
        }

        EventBus.emit('combat:projectile:created', { projectile: this });
    }

    update(delta) {
        if (!this.active) return;

        const dt = delta / 1000;
        this.lifetime -= dt;

        // Destroy after lifetime expires
        if (this.lifetime <= 0) {
            this.destroy();
        }
    }

    onHit(target) {
        if (!this.active) return;

        EventBus.emit('combat:projectile:hit', {
            projectile: this,
            target: target,
            damage: this.damage
        });

        this.destroy();
    }

    destroy() {
        if (!this.active) return;

        this.active = false;
        if (this.sprite) {
            this.sprite.destroy();
        }
    }

    getPosition() {
        if (!this.sprite || !this.active) return { x: 0, y: 0 };
        return { x: this.sprite.x, y: this.sprite.y };
    }

    getDamage() {
        return this.damage;
    }

    getOwner() {
        return this.owner;
    }
}
