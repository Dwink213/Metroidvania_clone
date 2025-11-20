import EnemyBase from './EnemyBase.js';
import AIBehaviors from './AIBehaviors.js';

/**
 * EnemyPatroller - Ground enemy that patrols and chases player
 */
export default class EnemyPatroller extends EnemyBase {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, {
            ...config,
            type: 'patroller',
            maxHealth: 40,
            damage: 10,
            color: 0xff4444,
            width: 32,
            height: 32
        });

        this.patrolSpeed = 80; // px/s
        this.chaseSpeed = 150; // px/s
        this.chaseRange = 300; // pixels
        this.patrolStartX = x;
        this.patrolRange = 200; // pixels to patrol
        this.patrolDirection = 1;
        this.isChasing = false;

        // Enable physics
        this.sprite.body.setCollideWorldBounds(true);
    }

    update(delta, playerPos) {
        super.update(delta, playerPos);

        if (!this.active) return;

        const myPos = this.getPosition();
        const distanceToPlayer = AIBehaviors.getDistance(myPos, playerPos);

        // Check if player is in chase range
        if (distanceToPlayer <= this.chaseRange) {
            // Chase mode
            this.isChasing = true;
            AIBehaviors.updateChase(this, playerPos, this.chaseSpeed);
        } else {
            // Patrol mode
            this.isChasing = false;
            const leftBound = this.patrolStartX - this.patrolRange;
            const rightBound = this.patrolStartX + this.patrolRange;
            AIBehaviors.updatePatrol(this, this.patrolSpeed, leftBound, rightBound);
        }
    }

    onDamaged(data) {
        // Flash red and apply knockback
        if (data.source) {
            const knockback = data.source.x < this.sprite.x ? 200 : -200;
            this.sprite.body.setVelocityX(knockback);
        }
    }
}
