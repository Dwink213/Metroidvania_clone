import AbilityDefinitions from './AbilityDefinitions.js';

/**
 * UnlockAnimation - Visual effect when an ability is unlocked
 */
export default class UnlockAnimation {
    constructor(scene, x, y, abilityId) {
        this.scene = scene;
        this.active = true;
        this.duration = 2.0; // seconds

        const definition = AbilityDefinitions[abilityId];
        const color = definition ? definition.color : 0xffff00;
        const name = definition ? definition.name : 'Unknown';

        // Create flash circle
        this.flash = scene.add.circle(x, y, 50, color, 0.8);
        this.flash.setDepth(1000);

        // Flash animation
        scene.tweens.add({
            targets: this.flash,
            scaleX: 3,
            scaleY: 3,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                this.flash.destroy();
            }
        });

        // Create text
        this.text = scene.add.text(x, y - 50, `ABILITY UNLOCKED!\n${name}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.text.setOrigin(0.5, 0.5);
        this.text.setDepth(1001);
        this.text.setAlpha(0);

        // Text fade in, hold, fade out
        scene.tweens.add({
            targets: this.text,
            alpha: 1,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                scene.time.delayedCall(1200, () => {
                    scene.tweens.add({
                        targets: this.text,
                        alpha: 0,
                        y: y - 80,
                        duration: 400,
                        ease: 'Power2',
                        onComplete: () => {
                            this.text.destroy();
                            this.active = false;
                        }
                    });
                });
            }
        });
    }
}
