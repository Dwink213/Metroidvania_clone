import EventBus from '../EventBus.js';
import AbilityDefinitions from './AbilityDefinitions.js';

/**
 * Collectible - Pickup item that grants an ability
 */
export default class Collectible {
    constructor(scene, x, y, collectibleData) {
        this.scene = scene;
        this.id = collectibleData.id;
        this.type = collectibleData.type;
        this.collected = false;

        const definition = AbilityDefinitions[this.type];
        const color = definition ? definition.color : 0xffff00;

        // Create visual (colored square with pulsing effect)
        this.sprite = scene.add.rectangle(x, y, 24, 24, color);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setAllowGravity(false); // Float in air
        this.sprite.body.setImmovable(true);

        // Pulsing animation
        scene.tweens.add({
            targets: this.sprite,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Floating animation
        scene.tweens.add({
            targets: this.sprite,
            y: y - 10,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    /**
     * Handle collection by player
     */
    collect() {
        if (this.collected) return;

        this.collected = true;

        // Play collection animation
        this.scene.tweens.add({
            targets: this.sprite,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                this.destroy();
            }
        });

        EventBus.emit('collectible:collected', {
            collectibleId: this.id,
            abilityType: this.type
        });
    }

    destroy() {
        if (this.sprite) {
            this.sprite.destroy();
        }
    }

    getSprite() {
        return this.sprite;
    }
}
