import EventBus from '../EventBus.js';

/**
 * HealthBar - Visual health representation with smooth animations
 */
export default class HealthBar {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 20;
        this.currentHealth = 100;
        this.maxHealth = 100;

        this.createHealthBar();
        this.setupEventListeners();
    }

    createHealthBar() {
        // Background
        this.background = this.scene.add.rectangle(
            this.x, this.y,
            this.width, this.height,
            0x333333
        );
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);
        this.background.setDepth(1000);

        // Health fill
        this.fill = this.scene.add.rectangle(
            this.x + 2, this.y + 2,
            this.width - 4, this.height - 4,
            0xff0000
        );
        this.fill.setOrigin(0, 0);
        this.fill.setScrollFactor(0);
        this.fill.setDepth(1001);
    }

    setupEventListeners() {
        EventBus.on('combat:damaged', (data) => {
            if (data.entity.isEnemy) return; // Only track player health
            this.updateHealth(data.currentHealth, data.maxHealth);
        });
    }

    updateHealth(currentHealth, maxHealth) {
        this.currentHealth = currentHealth;
        this.maxHealth = maxHealth;

        const percent = currentHealth / maxHealth;
        const targetWidth = (this.width - 4) * percent;

        // Smooth animation
        this.scene.tweens.add({
            targets: this.fill,
            width: targetWidth,
            duration: 300,
            ease: 'Power2'
        });

        // Color based on health
        if (percent > 0.6) {
            this.fill.setFillStyle(0x00ff00);
        } else if (percent > 0.3) {
            this.fill.setFillStyle(0xffaa00);
        } else {
            this.fill.setFillStyle(0xff0000);
        }
    }
}
