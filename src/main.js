import config from './config.js';
import BootScene from './scenes/BootScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

/**
 * Main entry point - Initialize Phaser game
 */
const gameConfig = {
    ...config,
    scene: [
        BootScene,
        MainMenuScene,
        GameScene,
        GameOverScene
    ]
};

// Create game instance
const game = new Phaser.Game(gameConfig);

// Global error handler
window.addEventListener('error', (event) => {
    console.error('[Game] Unhandled error:', event.error);
});

// Log game start
console.log('[Game] Metroidvania initialized');
console.log('[Game] Phaser version:', Phaser.VERSION);
console.log('[Game] Resolution:', config.width, 'x', config.height);

// Export for debugging
window.game = game;
