import MenuSystem from './MenuSystem.js';

/**
 * SettingsMenu - Game settings
 */
export default class SettingsMenu extends MenuSystem {
    constructor(scene) {
        super(scene);
        this.createSettings();
    }

    createSettings() {
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
        const title = this.scene.add.text(centerX, 50, 'SETTINGS', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        title.setOrigin(0.5, 0.5);
        title.setScrollFactor(0);
        title.setDepth(1401);
        this.addElement(title);

        // Settings content (placeholder)
        const content = this.scene.add.text(
            centerX, centerY,
            'Controls:\nWASD/Arrows - Move\nSpace - Jump\nShift - Dash\nESC - Pause\nM - Map\nI - Inventory',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
                lineSpacing: 10
            }
        );
        content.setOrigin(0.5, 0.5);
        content.setScrollFactor(0);
        content.setDepth(1401);
        this.addElement(content);

        // Back button
        this.createButton(centerX, centerY + 150, 'Back', () => this.hide());
    }
}
