import SettingsMenu from '../ui/SettingsMenu.js';

/**
 * MainMenuScene - Main menu with New Game, Continue, Settings
 */
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        // Initialize settings menu
        this.settingsMenu = new SettingsMenu(this);
        this.settingsMenu.hide();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background
        this.add.rectangle(0, 0, width, height, 0x1a1a2a).setOrigin(0, 0);

        // Title
        const title = this.add.text(width / 2, height / 3, 'METROIDVANIA', {
            font: 'bold 64px monospace',
            fill: '#00ff00',
            stroke: '#004400',
            strokeThickness: 4
        });
        title.setOrigin(0.5, 0.5);

        // New Game button
        const newGameButton = this.createButton(width / 2, height / 2, 'New Game', () => {
            this.scene.start('GameScene', { loadSave: false });
        });

        // Continue button (check if save exists)
        const hasSave = localStorage.getItem('metroidvania_save') !== null;
        const continueButton = this.createButton(width / 2, height / 2 + 60, 'Continue', () => {
            this.scene.start('GameScene', { loadSave: true });
        });

        if (!hasSave) {
            continueButton.text.setAlpha(0.3);
            continueButton.bg.setInteractive(false);
        }

        // Settings button
        this.createButton(width / 2, height / 2 + 120, 'Settings', () => {
            this.settingsMenu.show();
        });

        // Instructions
        const instructions = this.add.text(width / 2, height - 50, 'WASD/Arrows: Move | Space: Jump | Shift: Dash | ESC: Pause', {
            font: '16px monospace',
            fill: '#888888'
        });
        instructions.setOrigin(0.5, 0.5);
    }

    createButton(x, y, text, callback) {
        const bg = this.add.rectangle(x, y, 300, 50, 0x333333);
        bg.setStrokeStyle(2, 0x00ff00);

        const buttonText = this.add.text(x, y, text, {
            font: 'bold 24px monospace',
            fill: '#ffffff'
        });
        buttonText.setOrigin(0.5, 0.5);

        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerover', () => {
            bg.setFillStyle(0x00ff00);
            buttonText.setColor('#000000');
        });
        bg.on('pointerout', () => {
            bg.setFillStyle(0x333333);
            buttonText.setColor('#ffffff');
        });
        bg.on('pointerdown', callback);

        return { bg, text: buttonText };
    }
}
