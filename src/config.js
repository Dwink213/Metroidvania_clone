/**
 * config.js
 * Phaser game configuration
 */
export default {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false  // Set true for physics visualization
        }
    },
    scene: []  // Will be populated by main.js
};
