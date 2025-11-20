import EventBus from '../EventBus.js';

/**
 * ParticleManager - Creates and manages particle effects
 */
export default class ParticleManager {
    constructor(scene) {
        this.scene = scene;
        this.activeParticles = [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        EventBus.on('player:landed', (data) => {
            this.createDustParticles(data.position.x, data.position.y);
        });

        EventBus.on('player:dashed', (data) => {
            this.createDashTrail(data.position.x, data.position.y);
        });

        EventBus.on('enemy:defeated', (data) => {
            const pos = data.enemy.getPosition();
            this.createExplosionBurst(pos.x, pos.y, 0xff0000);
        });

        EventBus.on('ability:unlocked', (data) => {
            const color = data.ability.color || 0x00ff00;
            // Position would come from collectible - placeholder for now
            this.createSparkles(640, 350, color);
        });

        EventBus.on('combat:hit', (data) => {
            const pos = data.entity.getPosition ? data.entity.getPosition() : { x: 0, y: 0 };
            this.createImpactEffect(pos.x, pos.y);
        });
    }

    /**
     * Create dust particles on landing
     */
    createDustParticles(x, y) {
        for (let i = 0; i < 5; i++) {
            const particle = {
                sprite: this.scene.add.rectangle(
                    x + (Math.random() - 0.5) * 20,
                    y,
                    4,
                    4,
                    0xcccccc
                ),
                velocityX: (Math.random() - 0.5) * 50,
                velocityY: -Math.random() * 30,
                lifetime: 0.5,
                age: 0
            };

            particle.sprite.setDepth(500);
            this.activeParticles.push(particle);
        }
    }

    /**
     * Create trail effect for dash
     */
    createDashTrail(x, y) {
        const particle = {
            sprite: this.scene.add.rectangle(x, y, 20, 20, 0x00aaff, 0.5),
            velocityX: 0,
            velocityY: 0,
            lifetime: 0.3,
            age: 0
        };

        particle.sprite.setDepth(400);
        this.activeParticles.push(particle);
    }

    /**
     * Create explosion burst on enemy defeat
     */
    createExplosionBurst(x, y, color = 0xff0000) {
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const speed = 100 + Math.random() * 50;

            const particle = {
                sprite: this.scene.add.rectangle(x, y, 6, 6, color),
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                lifetime: 0.8,
                age: 0
            };

            particle.sprite.setDepth(500);
            this.activeParticles.push(particle);
        }
    }

    /**
     * Create sparkles for ability unlock
     */
    createSparkles(x, y, color = 0xffff00) {
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 100;

            const particle = {
                sprite: this.scene.add.rectangle(x, y, 4, 4, color),
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                lifetime: 1.0,
                age: 0
            };

            particle.sprite.setDepth(1500);
            this.activeParticles.push(particle);
        }
    }

    /**
     * Create impact effect for combat
     */
    createImpactEffect(x, y) {
        for (let i = 0; i < 6; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 80;

            const particle = {
                sprite: this.scene.add.rectangle(x, y, 5, 5, 0xffffff),
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                lifetime: 0.3,
                age: 0
            };

            particle.sprite.setDepth(500);
            this.activeParticles.push(particle);
        }
    }

    update(delta) {
        const dt = delta / 1000;

        for (let i = this.activeParticles.length - 1; i >= 0; i--) {
            const particle = this.activeParticles[i];

            particle.age += dt;

            // Update position
            particle.sprite.x += particle.velocityX * dt;
            particle.sprite.y += particle.velocityY * dt;

            // Apply gravity (optional)
            particle.velocityY += 200 * dt;

            // Fade out over lifetime
            const lifePercent = particle.age / particle.lifetime;
            particle.sprite.setAlpha(1 - lifePercent);

            // Remove dead particles
            if (particle.age >= particle.lifetime) {
                particle.sprite.destroy();
                this.activeParticles.splice(i, 1);
            }
        }
    }

    /**
     * Clear all particles
     */
    clearAll() {
        for (const particle of this.activeParticles) {
            if (particle.sprite) {
                particle.sprite.destroy();
            }
        }
        this.activeParticles = [];
    }
}
