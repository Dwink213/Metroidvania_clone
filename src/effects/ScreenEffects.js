import EventBus from '../EventBus.js';

/**
 * ScreenEffects - Flash, hit pause, and other full-screen effects
 */
export default class ScreenEffects {
    constructor(scene) {
        this.scene = scene;
        this.flashOverlay = null;
        this.hitPauseActive = false;
        this.createFlashOverlay();
        this.setupEventListeners();
    }

    createFlashOverlay() {
        this.flashOverlay = this.scene.add.rectangle(
            0, 0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0xffffff,
            0
        );
        this.flashOverlay.setOrigin(0, 0);
        this.flashOverlay.setScrollFactor(0);
        this.flashOverlay.setDepth(5000); // Very high depth
    }

    setupEventListeners() {
        EventBus.on('combat:hit', (data) => {
            this.flash(0xffffff, 0.3, 0.1);
            this.hitPause(0.05);
        });

        EventBus.on('player:damaged', (data) => {
            this.flash(0xff0000, 0.5, 0.15);
            this.hitPause(0.08);
        });

        EventBus.on('enemy:defeated', (data) => {
            this.flash(0xffaa00, 0.4, 0.2);
        });

        EventBus.on('boss:defeated', (data) => {
            this.flash(0xffff00, 0.8, 0.5);
            this.hitPause(0.3);
        });
    }

    /**
     * Flash the screen with a color
     * @param {number} color - Color hex (e.g., 0xffffff)
     * @param {number} alpha - Max alpha (0-1)
     * @param {number} duration - Flash duration in seconds
     */
    flash(color, alpha = 0.5, duration = 0.2) {
        this.flashOverlay.setFillStyle(color);
        this.flashOverlay.setAlpha(alpha);

        // Fade out
        this.scene.tweens.add({
            targets: this.flashOverlay,
            alpha: 0,
            duration: duration * 1000,
            ease: 'Power2'
        });

        EventBus.emit('effect:started', {
            type: 'flash',
            color: color,
            duration: duration
        });
    }

    /**
     * Freeze the game briefly (hit pause effect)
     * @param {number} duration - Pause duration in seconds
     */
    hitPause(duration) {
        if (this.hitPauseActive) return;

        this.hitPauseActive = true;

        // Pause physics
        this.scene.physics.world.pause();

        // Resume after duration
        this.scene.time.delayedCall(duration * 1000, () => {
            this.scene.physics.world.resume();
            this.hitPauseActive = false;

            EventBus.emit('effect:completed', {
                type: 'hitPause'
            });
        });

        EventBus.emit('effect:started', {
            type: 'hitPause',
            duration: duration
        });
    }

    /**
     * Fade to black (for scene transitions)
     * @param {number} duration - Fade duration in seconds
     * @returns {Promise} - Resolves when fade completes
     */
    fadeToBlack(duration = 0.5) {
        return new Promise((resolve) => {
            const fadeRect = this.scene.add.rectangle(
                0, 0,
                this.scene.cameras.main.width,
                this.scene.cameras.main.height,
                0x000000,
                0
            );
            fadeRect.setOrigin(0, 0);
            fadeRect.setScrollFactor(0);
            fadeRect.setDepth(5001);

            this.scene.tweens.add({
                targets: fadeRect,
                alpha: 1,
                duration: duration * 1000,
                ease: 'Power2',
                onComplete: () => {
                    resolve(fadeRect);
                }
            });
        });
    }

    /**
     * Fade from black
     * @param {number} duration - Fade duration in seconds
     */
    fadeFromBlack(fadeRect, duration = 0.5) {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: fadeRect,
                alpha: 0,
                duration: duration * 1000,
                ease: 'Power2',
                onComplete: () => {
                    fadeRect.destroy();
                    resolve();
                }
            });
        });
    }
}
