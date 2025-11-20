/**
 * GameOverScene - Game over screen
 */
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background
        this.add.rectangle(0, 0, width, height, 0x1a0a0a).setOrigin(0, 0);

        // Game Over text
        const gameOverText = this.add.text(width / 2, height / 3, 'GAME OVER', {
            font: 'bold 72px monospace',
            fill: '#ff0000',
            stroke: '#440000',
            strokeThickness: 6
        });
        gameOverText.setOrigin(0.5, 0.5);

        // Pulsing effect
        this.tweens.add({
            targets: gameOverText,
            alpha: 0.5,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // Retry button
        this.createButton(width / 2, height / 2 + 50, 'Retry', () => {
            this.scene.start('GameScene', { loadSave: false });
        });

        // Main Menu button
        this.createButton(width / 2, height / 2 + 120, 'Main Menu', () => {
            this.scene.start('MainMenuScene');
        });

        // Tip text
        const tip = this.add.text(width / 2, height - 100, 'TIP: Collect abilities to unlock new areas', {
            font: '18px monospace',
            fill: '#888888'
        });
        tip.setOrigin(0.5, 0.5);
    }

    createButton(x, y, text, callback) {
        const bg = this.add.rectangle(x, y, 300, 50, 0x333333);
        bg.setStrokeStyle(2, 0xff0000);

        const buttonText = this.add.text(x, y, text, {
            font: 'bold 24px monospace',
            fill: '#ffffff'
        });
        buttonText.setOrigin(0.5, 0.5);

        bg.setInteractive({ useHandCursor: true });
        bg.on('pointerover', () => {
            bg.setFillStyle(0xff0000);
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
