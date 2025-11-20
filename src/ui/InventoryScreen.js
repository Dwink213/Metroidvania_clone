import MenuSystem from './MenuSystem.js';

/**
 * InventoryScreen - Shows unlocked abilities (I key)
 */
export default class InventoryScreen extends MenuSystem {
    constructor(scene) {
        super(scene);
        this.unlockedAbilities = [];
        this.createInventory();
    }

    createInventory() {
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2;

        // Overlay
        const overlay = this.scene.add.rectangle(
            0, 0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000, 0.9
        );
        overlay.setOrigin(0, 0);
        overlay.setScrollFactor(0);
        overlay.setDepth(1400);
        this.addElement(overlay);

        // Title
        const title = this.scene.add.text(centerX, 50, 'INVENTORY - ABILITIES', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        title.setOrigin(0.5, 0.5);
        title.setScrollFactor(0);
        title.setDepth(1401);
        this.addElement(title);

        // Instructions
        const instructions = this.scene.add.text(
            centerX, this.scene.cameras.main.height - 50,
            'Press I to close',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#888888'
            }
        );
        instructions.setOrigin(0.5, 0.5);
        instructions.setScrollFactor(0);
        instructions.setDepth(1401);
        this.addElement(instructions);

        // Abilities grid (placeholder)
        const abilitiesText = this.scene.add.text(
            centerX, centerY,
            'Unlocked Abilities:\n(Dash, Double Jump, Wall Jump, etc.)',
            {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#00ff00',
                align: 'center'
            }
        );
        abilitiesText.setOrigin(0.5, 0.5);
        abilitiesText.setScrollFactor(0);
        abilitiesText.setDepth(1401);
        this.addElement(abilitiesText);
    }
}
