/**
 * BootScene - Asset loading and initialization
 */
export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '20px monospace',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.add.text(width / 2, height / 2, '0%', {
            font: '18px monospace',
            fill: '#ffffff'
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // AGGRESSIVE cache-busting: timestamp + random
        const cacheBust = `?v=${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        console.log('[BootScene] Loading with cache-bust:', cacheBust);

        this.load.json('rooms', `assets/data/rooms.json${cacheBust}`);
        this.load.json('enemies', `assets/data/enemies.json${cacheBust}`);
        this.load.json('collectibles', `assets/data/collectibles.json${cacheBust}`);
    }

    create() {
        console.log('[BootScene] Boot complete, starting main menu');
        this.scene.start('MainMenuScene');
    }
}
