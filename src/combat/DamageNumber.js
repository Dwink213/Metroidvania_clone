/**
 * DamageNumber - Floating damage text effect that rises and fades
 */
export default class DamageNumber {
    constructor(scene, x, y, damage, color = 0xff0000) {
        this.scene = scene;
        this.active = true;
        this.lifetime = 1.0; // seconds
        this.riseSpeed = 50; // px/s upward

        // Create text
        this.text = scene.add.text(x, y, `-${Math.floor(damage)}`, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: `#${color.toString(16).padStart(6, '0')}`,
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.text.setOrigin(0.5, 0.5);
        this.text.setDepth(1000); // Always on top

        this.startY = y;
    }

    update(delta) {
        if (!this.active) return;

        const dt = delta / 1000;
        this.lifetime -= dt;

        // Rise upward
        this.text.y -= this.riseSpeed * dt;

        // Fade out
        const alpha = this.lifetime / 1.0; // Start at 1.0, fade to 0
        this.text.setAlpha(alpha);

        // Destroy when lifetime expires
        if (this.lifetime <= 0) {
            this.destroy();
        }
    }

    destroy() {
        if (!this.active) return;

        this.active = false;
        if (this.text) {
            this.text.destroy();
        }
    }
}
