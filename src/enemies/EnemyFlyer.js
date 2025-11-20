import EnemyBase from './EnemyBase.js';
import AIBehaviors from './AIBehaviors.js';

/**
 * EnemyFlyer - Flying enemy with sine wave pattern and swoop attacks
 */
export default class EnemyFlyer extends EnemyBase {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, {
            ...config,
            type: 'flyer',
            maxHealth: 30,
            damage: 15,
            color: 0x8844ff,
            width: 28,
            height: 28
        });

        this.flySpeed = 120; // px/s
        this.swoopSpeed = 300; // px/s
        this.swoopRange = 250; // pixels
        this.centerX = x;
        this.centerY = y;
        this.floatAmplitude = 30; // pixels up/down
        this.floatFrequency = 2; // cycles per second
        this.time = 0;
        this.isSwooping = false;
        this.swoopCooldown = 0;
        this.swoopCooldownTime = 3; // seconds between swoops

        // Disable gravity for flying
        this.sprite.body.setAllowGravity(false);
    }

    update(delta, playerPos) {
        super.update(delta, playerPos);

        if (!this.active) return;

        const dt = delta / 1000;
        this.time += dt;

        const myPos = this.getPosition();
        const distanceToPlayer = AIBehaviors.getDistance(myPos, playerPos);

        // Update cooldowns
        if (this.swoopCooldown > 0) {
            this.swoopCooldown -= dt;
        }

        // Check if should swoop
        if (!this.isSwooping && this.swoopCooldown <= 0 && distanceToPlayer <= this.swoopRange) {
            this.isSwooping = true;
            this.swoopCooldown = this.swoopCooldownTime;
        }

        if (this.isSwooping) {
            // Swoop at player
            const direction = AIBehaviors.getDirectionToTarget(myPos, playerPos);
            this.sprite.body.setVelocity(
                direction.x * this.swoopSpeed,
                direction.y * this.swoopSpeed
            );

            // End swoop after passing player or moving too far
            if (distanceToPlayer > this.swoopRange * 2) {
                this.isSwooping = false;
            }
        } else {
            // Sine wave pattern around center point
            const targetY = this.centerY + Math.sin(this.time * this.floatFrequency * Math.PI * 2) * this.floatAmplitude;
            const targetX = this.centerX + Math.cos(this.time * 0.5) * 100;

            const direction = AIBehaviors.getDirectionToTarget(myPos, { x: targetX, y: targetY });
            this.sprite.body.setVelocity(
                direction.x * this.flySpeed,
                direction.y * this.flySpeed
            );
        }
    }
}
