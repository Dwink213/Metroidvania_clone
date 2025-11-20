import EventBus from '../EventBus.js';
import Projectile from './Projectile.js';
import HitDetection from './HitDetection.js';
import DamageNumber from './DamageNumber.js';

/**
 * CombatController - Manages all combat actions, attacks, and damage
 */
export default class CombatController {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.projectiles = [];
        this.damageNumbers = [];
        this.meleeHitboxRadius = 60; // pixels
        this.meleeDamage = 25;
        this.rangedDamage = 15;
        this.attackCooldown = 0.5; // seconds
        this.attackCooldownTimer = 0;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for attack requests
        EventBus.on('player:attack:melee', (data) => {
            this.performMeleeAttack(data.attacker, data.direction);
        });

        EventBus.on('player:attack:ranged', (data) => {
            this.performRangedAttack(data.attacker, data.direction);
        });

        EventBus.on('enemy:attack:melee', (data) => {
            this.performMeleeAttack(data.attacker, data.direction, true);
        });

        EventBus.on('enemy:attack:ranged', (data) => {
            this.performRangedAttack(data.attacker, data.direction, true);
        });

        // Listen for damage events to create damage numbers
        EventBus.on('combat:damaged', (data) => {
            this.createDamageNumber(data);
        });
    }

    /**
     * Perform melee attack (close range hitbox)
     */
    performMeleeAttack(attacker, direction = 1, isEnemy = false) {
        if (this.attackCooldownTimer > 0) return;

        this.attackCooldownTimer = this.attackCooldown;

        const attackerPos = attacker.getPosition();
        const hitboxX = attackerPos.x + (direction * this.meleeHitboxRadius);
        const hitboxY = attackerPos.y;

        EventBus.emit('combat:attacked', {
            attacker: attacker,
            type: 'melee',
            position: { x: hitboxX, y: hitboxY },
            radius: this.meleeHitboxRadius,
            damage: this.meleeDamage,
            isEnemy: isEnemy
        });

        // In a full implementation, check all enemies/player for hits
        // This will be done by the scene integration layer
    }

    /**
     * Perform ranged attack (projectile)
     */
    performRangedAttack(attacker, direction = { x: 1, y: 0 }, isEnemy = false) {
        if (this.attackCooldownTimer > 0) return;

        this.attackCooldownTimer = this.attackCooldown;

        const attackerPos = attacker.getPosition();
        const projectile = new Projectile(
            this.scene,
            attackerPos.x,
            attackerPos.y,
            direction.x,
            direction.y,
            this.rangedDamage,
            attacker
        );

        this.projectiles.push(projectile);

        EventBus.emit('combat:attacked', {
            attacker: attacker,
            type: 'ranged',
            projectile: projectile,
            isEnemy: isEnemy
        });
    }

    /**
     * Create floating damage number
     */
    createDamageNumber(data) {
        const pos = data.entity.getPosition ? data.entity.getPosition() : { x: 0, y: 0 };
        const color = data.source && data.source.isEnemy ? 0xff0000 : 0x00aaff;
        const damageNumber = new DamageNumber(this.scene, pos.x, pos.y, data.damage, color);
        this.damageNumbers.push(damageNumber);
    }

    update(delta) {
        const dt = delta / 1000;

        // Update attack cooldown
        if (this.attackCooldownTimer > 0) {
            this.attackCooldownTimer -= dt;
            if (this.attackCooldownTimer < 0) {
                this.attackCooldownTimer = 0;
            }
        }

        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(delta);

            if (!projectile.active) {
                this.projectiles.splice(i, 1);
            }
        }

        // Update damage numbers
        for (let i = this.damageNumbers.length - 1; i >= 0; i--) {
            const damageNumber = this.damageNumbers[i];
            damageNumber.update(delta);

            if (!damageNumber.active) {
                this.damageNumbers.splice(i, 1);
            }
        }
    }

    getProjectiles() {
        return this.projectiles;
    }
}
