import EventBus from '../EventBus.js';

/**
 * CameraController - Smooth camera following with dead zone and screen shake
 */
export default class CameraController {
    constructor(scene, target) {
        this.scene = scene;
        this.camera = scene.cameras.main;
        this.target = target; // Usually the player

        // Dead zone configuration
        this.deadZoneWidth = 80;
        this.deadZoneHeight = 60;

        // Smooth follow
        this.lerpFactor = 0.1;

        // Screen shake
        this.isShaking = false;
        this.shakeIntensity = 0;
        this.shakeDuration = 0;
        this.shakeTimer = 0;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;

        this.setupCamera();
        this.setupEventListeners();
    }

    setupCamera() {
        // Set dead zone for smooth following
        this.camera.setDeadzone(this.deadZoneWidth, this.deadZoneHeight);
        this.camera.startFollow(this.target.getSprite(), false, this.lerpFactor, this.lerpFactor);
    }

    setupEventListeners() {
        EventBus.on('combat:hit', (data) => {
            this.shake(5, 0.2); // Intensity 5, 0.2s duration
        });

        EventBus.on('enemy:defeated', (data) => {
            this.shake(10, 0.3); // Stronger shake
        });

        EventBus.on('player:landed', (data) => {
            this.shake(2, 0.1); // Subtle shake
        });

        EventBus.on('boss:phaseChange', (data) => {
            this.shake(15, 0.5); // Very strong shake
        });
    }

    /**
     * Trigger screen shake effect
     * @param {number} intensity - Shake strength (pixels)
     * @param {number} duration - Shake duration (seconds)
     */
    shake(intensity, duration) {
        this.isShaking = true;
        this.shakeIntensity = intensity;
        this.shakeDuration = duration;
        this.shakeTimer = duration;
    }

    update(delta) {
        const dt = delta / 1000;

        if (this.isShaking) {
            this.shakeTimer -= dt;

            if (this.shakeTimer <= 0) {
                // End shake
                this.isShaking = false;
                this.shakeOffsetX = 0;
                this.shakeOffsetY = 0;
                this.camera.setScroll(this.camera.scrollX, this.camera.scrollY);
            } else {
                // Apply shake
                const progress = this.shakeTimer / this.shakeDuration;
                const currentIntensity = this.shakeIntensity * progress;

                this.shakeOffsetX = (Math.random() - 0.5) * currentIntensity * 2;
                this.shakeOffsetY = (Math.random() - 0.5) * currentIntensity * 2;

                // Apply offset to camera
                const baseScrollX = this.camera.scrollX;
                const baseScrollY = this.camera.scrollY;
                this.camera.setScroll(
                    baseScrollX + this.shakeOffsetX,
                    baseScrollY + this.shakeOffsetY
                );
            }
        }
    }

    /**
     * Set camera bounds (usually to match room size)
     */
    setBounds(x, y, width, height) {
        this.camera.setBounds(x, y, width, height);
    }

    /**
     * Change camera target
     */
    setTarget(target) {
        this.target = target;
        this.camera.startFollow(target.getSprite(), false, this.lerpFactor, this.lerpFactor);
    }

    /**
     * Instant snap to target (no smooth follow)
     */
    snapToTarget() {
        if (this.target) {
            const pos = this.target.getPosition();
            this.camera.centerOn(pos.x, pos.y);
        }
    }
}
