import HealthBar from './HealthBar.js';
import MinimapDisplay from './MinimapDisplay.js';

/**
 * HUDController - Coordinates all HUD elements
 */
export default class HUDController {
    constructor(scene) {
        this.scene = scene;
        this.createHUD();
    }

    createHUD() {
        // Health bar (top left)
        this.healthBar = new HealthBar(this.scene, 20, 20);

        // Minimap (top right)
        this.minimap = new MinimapDisplay(
            this.scene,
            this.scene.cameras.main.width - 100,
            20
        );

        // Ability icons placeholder
        this.createAbilityIcons();
    }

    createAbilityIcons() {
        const startX = 20;
        const startY = 60;
        const iconSize = 32;
        const spacing = 40;

        // Placeholder for ability icons
        for (let i = 0; i < 5; i++) {
            const icon = this.scene.add.rectangle(
                startX + i * spacing,
                startY,
                iconSize,
                iconSize,
                0x333333,
                0.7
            );
            icon.setOrigin(0, 0);
            icon.setScrollFactor(0);
            icon.setDepth(1000);
        }
    }

    update(delta) {
        // HUD updates happen via events
    }
}
