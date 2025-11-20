import EnemyBase from './EnemyBase.js';
import AIBehaviors from './AIBehaviors.js';
import EventBus from '../EventBus.js';

/**
 * EnemyMiniBoss - 3-phase boss fight with escalating difficulty
 */
export default class EnemyMiniBoss extends EnemyBase {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y, {
            ...config,
            type: 'miniBoss',
            maxHealth: 200,
            damage: 25,
            color: 0xff00ff,
            width: 64,
            height: 64
        });

        this.phase = 1;
        this.moveSpeed = 100; // px/s
        this.dashSpeed = 400; // px/s
        this.shootInterval = 3.0; // seconds
        this.shootTimer = 0;
        this.dashCooldown = 0;
        this.dashCooldownTime = 5.0; // seconds

        // Phase thresholds
        this.phase2Threshold = 150; // HP
        this.phase3Threshold = 75; // HP

        this.sprite.body.setCollideWorldBounds(true);
    }

    update(delta, playerPos) {
        super.update(delta, playerPos);

        if (!this.active) return;

        const dt = delta / 1000;

        // Check phase transitions
        this.checkPhaseTransition();

        // Update timers
        this.shootTimer += dt;
        if (this.dashCooldown > 0) {
            this.dashCooldown -= dt;
        }

        const myPos = this.getPosition();
        const direction = AIBehaviors.getDirectionToTarget(myPos, playerPos);

        // Phase 1: Basic chase
        if (this.phase === 1) {
            AIBehaviors.updateChase(this, playerPos, this.moveSpeed);
        }

        // Phase 2: Chase + projectile attacks
        if (this.phase === 2) {
            AIBehaviors.updateChase(this, playerPos, this.moveSpeed * 1.2);

            if (this.shootTimer >= this.shootInterval) {
                this.shootProjectile(playerPos);
                this.shootTimer = 0;
            }
        }

        // Phase 3: Fast chase + frequent projectiles + dashes
        if (this.phase === 3) {
            const distanceToPlayer = AIBehaviors.getDistance(myPos, playerPos);

            // Dash attack if cooldown ready and in range
            if (this.dashCooldown <= 0 && distanceToPlayer < 400) {
                this.sprite.body.setVelocity(
                    direction.x * this.dashSpeed,
                    direction.y * this.dashSpeed
                );
                this.dashCooldown = this.dashCooldownTime;

                // Visual: trail effect
                this.sprite.setAlpha(0.7);
                this.scene.time.delayedCall(300, () => {
                    if (this.sprite) this.sprite.setAlpha(1);
                });
            } else {
                AIBehaviors.updateChase(this, playerPos, this.moveSpeed * 1.5);
            }

            // More frequent projectiles
            if (this.shootTimer >= this.shootInterval / 2) {
                this.shootProjectile(playerPos);
                this.shootTimer = 0;
            }
        }
    }

    checkPhaseTransition() {
        const currentHealth = this.health.currentHealth;
        const oldPhase = this.phase;

        if (currentHealth <= this.phase3Threshold && this.phase < 3) {
            this.phase = 3;
        } else if (currentHealth <= this.phase2Threshold && this.phase < 2) {
            this.phase = 2;
        }

        if (oldPhase !== this.phase) {
            EventBus.emit('boss:phaseChange', {
                boss: this,
                oldPhase: oldPhase,
                newPhase: this.phase,
                health: currentHealth
            });

            // Visual: flash and grow
            this.sprite.setFillStyle(0xffffff);
            this.scene.tweens.add({
                targets: this.sprite,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 300,
                yoyo: true,
                onComplete: () => {
                    if (this.sprite) {
                        this.sprite.setFillStyle(this.color);
                        this.sprite.setScale(1);
                    }
                }
            });

            console.log(`[MiniBoss] Phase ${this.phase}!`);
        }
    }

    shootProjectile(targetPos) {
        EventBus.emit('enemy:attack:ranged', {
            attacker: this,
            direction: AIBehaviors.getDirectionToTarget(this.getPosition(), targetPos),
            damage: 15
        });
    }

    onDefeated() {
        EventBus.emit('boss:defeated', {
            bossId: this.id
        });

        super.onDefeated();
    }
}
