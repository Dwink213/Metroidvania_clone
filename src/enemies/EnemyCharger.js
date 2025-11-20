import EnemyBase from './EnemyBase.js';
import AIBehaviors from './AIBehaviors.js';

/**
 * EnemyCharger - Wind-up attack then charges at player
 */
export default class EnemyCharger extends EnemyBase {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, {
            ...config,
            type: 'charger',
            maxHealth: 50,
            damage: 20,
            color: 0xff8844,
            width: 34,
            height: 34
        });

        this.detectionRange = 350; // pixels
        this.chargeSpeed = 500; // px/s
        this.windupTime = 1.0; // seconds
        this.chargeDuration = 1.5; // seconds
        this.cooldownTime = 3.0; // seconds

        this.state = 'idle'; // idle, windup, charging, cooldown
        this.stateTimer = 0;
        this.chargeDirection = { x: 0, y: 0 };

        this.sprite.body.setCollideWorldBounds(true);
    }

    update(delta, playerPos) {
        super.update(delta, playerPos);

        if (!this.active) return;

        const dt = delta / 1000;
        this.stateTimer -= dt;

        const myPos = this.getPosition();
        const distanceToPlayer = AIBehaviors.getDistance(myPos, playerPos);

        switch (this.state) {
            case 'idle':
                this.sprite.body.setVelocity(0, 0);

                // Check if player in range
                if (distanceToPlayer <= this.detectionRange) {
                    this.state = 'windup';
                    this.stateTimer = this.windupTime;

                    // Visual: shake and change color
                    this.sprite.setFillStyle(0xffff00);
                }
                break;

            case 'windup':
                // Stay still while winding up
                this.sprite.body.setVelocity(0, 0);

                // Shake effect
                const shakeAmount = 5;
                this.sprite.x += (Math.random() - 0.5) * shakeAmount;

                if (this.stateTimer <= 0) {
                    // Start charge
                    this.state = 'charging';
                    this.stateTimer = this.chargeDuration;
                    this.chargeDirection = AIBehaviors.getDirectionToTarget(myPos, playerPos);
                    this.sprite.setFillStyle(0xff0000);
                }
                break;

            case 'charging':
                // Charge in locked direction
                this.sprite.body.setVelocity(
                    this.chargeDirection.x * this.chargeSpeed,
                    this.chargeDirection.y * this.chargeSpeed
                );

                if (this.stateTimer <= 0) {
                    this.state = 'cooldown';
                    this.stateTimer = this.cooldownTime;
                    this.sprite.setFillStyle(this.color);
                }
                break;

            case 'cooldown':
                this.sprite.body.setVelocity(0, 0);

                if (this.stateTimer <= 0) {
                    this.state = 'idle';
                }
                break;
        }
    }
}
