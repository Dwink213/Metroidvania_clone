import EventBus from '../EventBus.js';
import InputManager from '../player/InputManager.js';
import PlayerController from '../player/PlayerController.js';
import MapManager from '../map/MapManager.js';
import CombatController from '../combat/CombatController.js';
import AbilityManager from '../abilities/AbilityManager.js';
import SaveManager from '../abilities/SaveManager.js';
import EnemySpawner from '../enemies/EnemySpawner.js';
import HUDController from '../ui/HUDController.js';
import PauseMenu from '../ui/PauseMenu.js';
import NotificationManager from '../ui/NotificationManager.js';
import CameraController from '../effects/CameraController.js';
import ParticleManager from '../effects/ParticleManager.js';
import ScreenEffects from '../effects/ScreenEffects.js';

/**
 * GameScene - Main gameplay scene where all systems are integrated
 */
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.loadSave = data.loadSave || false;
    }

    create() {
        console.log('[GameScene] Initializing all systems...');

        // Load game data
        const roomsData = this.cache.json.get('rooms');
        const enemiesData = this.cache.json.get('enemies');

        // Initialize core systems
        this.inputManager = new InputManager(this);
        this.map = new MapManager(this, roomsData);
        this.player = new PlayerController(this, 400, 300);
        this.combat = new CombatController(this, this.player);
        this.abilities = new AbilityManager(this);
        this.saveManager = new SaveManager();
        this.enemies = new EnemySpawner(this, enemiesData);

        // Initialize UI
        this.hud = new HUDController(this);
        this.notifications = new NotificationManager(this);
        this.pauseMenu = new PauseMenu(
            this,
            () => this.handleSave(),
            () => this.handleQuit()
        );

        // Initialize effects
        this.camera = new CameraController(this, this.player);
        this.particles = new ParticleManager(this);
        this.screenEffects = new ScreenEffects(this);

        // Setup event listeners and input
        this.setupEventListeners();
        this.setupInput();
        // Note: setupCollisions() will be called after room loads

        // Load save or start fresh
        if (this.loadSave) {
            this.loadGame();
        } else {
            this.startNewGame();
        }

        console.log('[GameScene] All systems initialized successfully');
    }

    setupEventListeners() {
        // Room transition events
        EventBus.on('room:entered', (data) => {
            if (data.spawnPoint) {
                this.player.setPosition(data.spawnPoint.x, data.spawnPoint.y);
            }
            this.camera.snapToTarget();
            // Setup collisions after room loads
            this.setupCollisions();
        });

        // Combat events for player health updates
        EventBus.on('player:damaged', () => {
            // HUD automatically updates via event
        });

        // Ability unlock events
        EventBus.on('ability:unlocked', (data) => {
            this.player.unlockAbility(data.abilityId);
        });

        // Game over condition
        EventBus.on('combat:defeated', (data) => {
            if (data.entity === this.player) {
                this.handleGameOver();
            }
        });
    }

    setupCollisions() {
        // Player vs Platforms
        const platforms = this.map.getPlatforms();
        platforms.forEach(platform => {
            this.physics.add.collider(this.player.getSprite(), platform);
        });

        // Player vs Walls
        const walls = this.map.getWalls();
        walls.forEach(wall => {
            this.physics.add.collider(this.player.getSprite(), wall);
        });

        // Player vs Enemies (damage collision)
        // This will be handled by overlap checks in update()
    }

    setupInput() {
        // ESC for pause menu (access Phaser's input system directly)
        this.input.keyboard.on('keydown-ESC', () => {
            if (this.pauseMenu) {
                this.pauseMenu.toggle();
            }
        });

        // M for map (placeholder)
        this.input.keyboard.on('keydown-M', () => {
            console.log('[GameScene] Map screen (not yet implemented)');
        });

        // I for inventory (placeholder)
        this.input.keyboard.on('keydown-I', () => {
            console.log('[GameScene] Inventory screen (not yet implemented)');
        });
    }

    update(time, delta) {
        // Don't update if paused
        if (this.pauseMenu.isVisible()) {
            return;
        }

        // Update all systems in order
        this.player.update(delta, this.inputManager);
        this.combat.update(delta);
        this.camera.update(delta);
        this.particles.update(delta);

        // Update enemies with player position
        const playerPos = this.player.getPosition();
        this.enemies.update(delta, playerPos);

        // Check room transitions
        this.map.checkRoomTransition(playerPos);

        // Check combat collisions
        this.checkCombatCollisions();
    }

    checkCombatCollisions() {
        const playerSprite = this.player.getSprite();
        const activeEnemies = this.enemies.getActiveEnemies();

        // Player vs Enemy collision (damage)
        activeEnemies.forEach(enemy => {
            const enemySprite = enemy.getSprite();

            if (this.physics.overlap(playerSprite, enemySprite)) {
                // Damage player
                if (this.player.health && !this.player.health.isInvincible()) {
                    this.player.health.takeDamage(enemy.damage, enemy);
                }
            }
        });

        // Projectiles vs Enemies
        const projectiles = this.combat.getProjectiles();
        projectiles.forEach(projectile => {
            activeEnemies.forEach(enemy => {
                const projectileSprite = projectile.getSprite ? projectile.getSprite() : projectile.sprite;
                const enemySprite = enemy.getSprite();

                if (this.physics.overlap(projectileSprite, enemySprite)) {
                    if (projectile.getOwner && projectile.getOwner() !== enemy) {
                        enemy.takeDamage(projectile.getDamage(), projectile);
                        projectile.onHit(enemy);
                    }
                }
            });
        });
    }

    startNewGame() {
        console.log('[GameScene] Starting new game');
        this.map.loadRoom('room_01');
    }

    loadGame() {
        console.log('[GameScene] Loading saved game');
        const saveData = this.saveManager.loadGame();

        if (saveData) {
            // Restore player state
            if (saveData.playerHealth) {
                this.player.health.currentHealth = saveData.playerHealth;
            }

            // Restore abilities
            if (saveData.abilities) {
                this.abilities.importState({ unlockedAbilities: saveData.abilities });
            }

            // Load room
            const roomId = saveData.currentRoom || 'room_01';
            this.map.loadRoom(roomId);
        } else {
            console.log('[GameScene] No save found, starting new game');
            this.startNewGame();
        }
    }

    handleSave() {
        const gameState = {
            playerHealth: this.player.health.currentHealth,
            playerMaxHealth: this.player.health.maxHealth,
            currentRoom: this.map.getCurrentRoom()?.id || 'room_01',
            abilities: this.abilities.getUnlockedAbilities(),
            defeatedEnemies: this.enemies.exportState().defeatedEnemies,
            playTime: 0 // Placeholder
        };

        this.saveManager.saveGame(gameState);
    }

    handleQuit() {
        console.log('[GameScene] Quitting to main menu');
        this.scene.start('MainMenuScene');
    }

    handleGameOver() {
        console.log('[GameScene] Game over!');
        this.scene.start('GameOverScene');
    }
}
