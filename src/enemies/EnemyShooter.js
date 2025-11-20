import EnemyBase from './EnemyBase.js';
import AIBehaviors from './AIBehaviors.js';
import EventBus from '../EventBus.js';

/**
 * EnemyShooter - Stationary enemy that fires projectiles
 */
export default class EnemyShooter extends EnemyBase {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, {
            ...config,
            type: 'shooter',
            maxHealth: 35,
            damage: 12,
            color: 0x44ff44,
            width: 30,
            height: 30
        });

        this.shootRange = 500; // pixels
        this.shootInterval = 2.0; // seconds
        this.shootTimer = 0;
        this.projectileDamage = 12;

        // Make stationary
        this.sprite.body.setAllowGravity(false);
        this.sprite.body.setImmovable(true);
    }

    update(delta, playerPos) {
        super.update(delta, playerPos);

        if (!this.active) return;

        const dt = delta / 1000;
        this.shootTimer += dt;

        const myPos = this.getPosition();
        const distanceToPlayer = AIBehaviors.getDistance(myPos, playerPos);

        // Shoot if player in range and timer ready
        if (distanceToPlayer <= this.shootRange && this.shootTimer >= this.shootInterval) {
            this.shoot(playerPos);
            this.shootTimer = 0;
        }
    }

    shoot(targetPos) {
        const myPos = this.getPosition();
        const direction = AIBehaviors.getDirectionToTarget(myPos, targetPos);

        // Emit attack event for CombatController to create projectile
        EventBus.emit('enemy:attack:ranged', {
            attacker: this,
            direction: direction,
            damage: this.projectileDamage
        });

        // Visual feedback: flash
        this.scene.tweens.add({
            targets: this.sprite,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true
        });
    }
}
