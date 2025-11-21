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
        for (let i = 0; i < 8; i++) {
            const graphics = this.scene.add.graphics();
            const size = 3 + Math.random() * 4;
            graphics.fillStyle(0xdddddd, 0.8);
            graphics.fillCircle(0, 0, size);

            graphics.x = x + (Math.random() - 0.5) * 30;
            graphics.y = y + 10;

            const particle = {
                sprite: graphics,
                velocityX: (Math.random() - 0.5) * 100,
                velocityY: -Math.random() * 80 - 20,
                lifetime: 0.6 + Math.random() * 0.3,
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
        // Create glowing trail effect
        const graphics = this.scene.add.graphics();

        // Outer glow
        graphics.fillStyle(0x00aaff, 0.3);
        graphics.fillCircle(0, 0, 18);

        // Inner glow
        graphics.fillStyle(0x44ccff, 0.6);
        graphics.fillCircle(0, 0, 12);

        // Core
        graphics.fillStyle(0xffffff, 0.8);
        graphics.fillCircle(0, 0, 6);

        graphics.x = x;
        graphics.y = y;

        const particle = {
            sprite: graphics,
            velocityX: 0,
            velocityY: 0,
            lifetime: 0.4,
            age: 0,
            initialScale: 1
        };

        particle.sprite.setDepth(400);
        this.activeParticles.push(particle);
    }

    /**
     * Create explosion burst on enemy defeat
     */
    createExplosionBurst(x, y, color = 0xff0000) {
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.3;
            const speed = 100 + Math.random() * 80;

            const graphics = this.scene.add.graphics();
            const size = 4 + Math.random() * 6;

            // Draw star-like shape
            graphics.fillStyle(color, 1);
            graphics.fillCircle(0, 0, size);
            graphics.fillStyle(0xffff00, 0.6);
            graphics.fillCircle(0, 0, size * 0.6);

            graphics.x = x;
            graphics.y = y;

            const particle = {
                sprite: graphics,
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                lifetime: 0.9 + Math.random() * 0.3,
                age: 0,
                rotation: Math.random() * Math.PI * 2
            };

            particle.sprite.setDepth(500);
            this.activeParticles.push(particle);
        }
    }

    /**
     * Create sparkles for ability unlock
     */
    createSparkles(x, y, color = 0xffff00) {
        for (let i = 0; i < 25; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 120;

            const graphics = this.scene.add.graphics();
            const size = 2 + Math.random() * 4;

            // Draw sparkle (cross/star shape)
            graphics.fillStyle(color, 1);
            graphics.fillRect(-size, -size/3, size * 2, size * 2/3);
            graphics.fillRect(-size/3, -size, size * 2/3, size * 2);

            // Add glow
            graphics.fillStyle(0xffffff, 0.8);
            graphics.fillCircle(0, 0, size * 0.5);

            graphics.x = x;
            graphics.y = y;

            const particle = {
                sprite: graphics,
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                lifetime: 1.2 + Math.random() * 0.5,
                age: 0,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 10
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

            // Update rotation if applicable
            if (particle.rotationSpeed !== undefined) {
                particle.rotation += particle.rotationSpeed * dt;
                particle.sprite.setRotation(particle.rotation);
            }

            // Scale effect for dash trails
            if (particle.initialScale !== undefined) {
                const lifePercent = particle.age / particle.lifetime;
                particle.sprite.setScale(particle.initialScale * (1 - lifePercent));
            }

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
