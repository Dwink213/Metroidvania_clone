import MenuSystem from './MenuSystem.js';
import SettingsMenu from './SettingsMenu.js';

/**
 * PauseMenu - ESC to pause game
 */
export default class PauseMenu extends MenuSystem {
    constructor(scene, saveCallback, quitCallback) {
        super(scene);
        this.saveCallback = saveCallback;
        this.quitCallback = quitCallback;
        this.settingsMenu = new SettingsMenu(scene);
        this.settingsMenu.hide();
        this.createMenu();
    }

    createMenu() {
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2;

        // Overlay
        const overlay = this.scene.add.rectangle(
            0, 0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000, 0.7
        );
        overlay.setOrigin(0, 0);
        overlay.setScrollFactor(0);
        overlay.setDepth(1500);
        this.addElement(overlay);

        // Title
        const title = this.scene.add.text(centerX, centerY - 100, 'PAUSED', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        title.setOrigin(0.5, 0.5);
        title.setScrollFactor(0);
        title.setDepth(1501);
        this.addElement(title);

        // Buttons
        this.createButton(centerX, centerY - 20, 'Resume', () => this.hide());
        this.createButton(centerX, centerY + 30, 'Save Game', () => {
            if (this.saveCallback) this.saveCallback();
        });
        this.createButton(centerX, centerY + 80, 'Settings', () => {
            this.settingsMenu.show();
        });
        this.createButton(centerX, centerY + 130, 'Quit to Menu', () => {
            if (this.quitCallback) this.quitCallback();
        });

        // Set depth for all elements
        this.elements.forEach(el => {
            if (el.setScrollFactor) el.setScrollFactor(0);
            if (el.setDepth) el.setDepth(1501);
        });
    }
}
