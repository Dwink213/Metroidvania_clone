import EventBus from '../EventBus.js';

/**
 * RoomTransition - Smooth fade transitions between rooms
 */
export default class RoomTransition {
    constructor(scene) {
        this.scene = scene;
        this.isTransitioning = false;
        this.fadeDuration = 500; // milliseconds
        this.fadeOverlay = null;
        this.createFadeOverlay();
    }

    createFadeOverlay() {
        // Create black rectangle for fade effect
        this.fadeOverlay = this.scene.add.rectangle(
            0, 0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000
        );
        this.fadeOverlay.setOrigin(0, 0);
        this.fadeOverlay.setAlpha(0);
        this.fadeOverlay.setDepth(10000); // Always on top
        this.fadeOverlay.setScrollFactor(0); // Don't scroll with camera
    }

    /**
     * Perform transition from one room to another
     * @param {function} loadRoomCallback - Called when screen is black to load new room
     */
    async transition(loadRoomCallback) {
        if (this.isTransitioning) return;

        this.isTransitioning = true;

        // Fade out
        await this.fadeOut();

        // Load new room while screen is black
        if (loadRoomCallback) {
            loadRoomCallback();
        }

        // Wait a tiny bit for room to load
        await this.wait(100);

        // Fade in
        await this.fadeIn();

        this.isTransitioning = false;
    }

    /**
     * Fade to black
     */
    fadeOut() {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: this.fadeOverlay,
                alpha: 1,
                duration: this.fadeDuration,
                ease: 'Power2',
                onComplete: () => resolve()
            });
        });
    }

    /**
     * Fade from black
     */
    fadeIn() {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: this.fadeOverlay,
                alpha: 0,
                duration: this.fadeDuration,
                ease: 'Power2',
                onComplete: () => resolve()
            });
        });
    }

    wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
