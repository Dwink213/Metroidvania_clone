import EventBus from '../EventBus.js';

/**
 * NotificationManager - Toast messages for game events
 */
export default class NotificationManager {
    constructor(scene) {
        this.scene = scene;
        this.activeNotifications = [];
        this.yOffset = 100; // Top of screen
        this.spacing = 60;

        this.setupEventListeners();
    }

    setupEventListeners() {
        EventBus.on('ability:unlocked', (data) => {
            this.showNotification(`Ability Unlocked: ${data.ability.name}`, 0x00ff00);
        });

        EventBus.on('door:locked', (data) => {
            this.showNotification(`Door Locked: ${data.requires} required`, 0xff0000);
        });

        EventBus.on('game:saved', () => {
            this.showNotification('Game Saved', 0x00aaff);
        });

        EventBus.on('ui:notification', (data) => {
            this.showNotification(data.message, data.color || 0xffffff);
        });
    }

    showNotification(message, color = 0xffffff) {
        const y = this.yOffset + (this.activeNotifications.length * this.spacing);

        const notification = {
            text: null,
            background: null,
            lifetime: 3.0 // seconds
        };

        // Background
        notification.background = this.scene.add.rectangle(
            this.scene.cameras.main.width / 2, y,
            400, 50,
            0x000000, 0.8
        );
        notification.background.setOrigin(0.5, 0.5);
        notification.background.setScrollFactor(0);
        notification.background.setDepth(2000);
        notification.background.setAlpha(0);

        // Text
        notification.text = this.scene.add.text(
            this.scene.cameras.main.width / 2, y,
            message,
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: `#${color.toString(16).padStart(6, '0')}`,
                align: 'center'
            }
        );
        notification.text.setOrigin(0.5, 0.5);
        notification.text.setScrollFactor(0);
        notification.text.setDepth(2001);
        notification.text.setAlpha(0);

        this.activeNotifications.push(notification);

        // Fade in
        this.scene.tweens.add({
            targets: [notification.background, notification.text],
            alpha: 1,
            duration: 300,
            ease: 'Power2'
        });

        // Fade out after lifetime
        this.scene.time.delayedCall(notification.lifetime * 1000, () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        const index = this.activeNotifications.indexOf(notification);
        if (index === -1) return;

        // Fade out
        this.scene.tweens.add({
            targets: [notification.background, notification.text],
            alpha: 0,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                notification.background.destroy();
                notification.text.destroy();
            }
        });

        this.activeNotifications.splice(index, 1);

        // Shift remaining notifications up
        this.repositionNotifications();
    }

    repositionNotifications() {
        this.activeNotifications.forEach((notif, index) => {
            const targetY = this.yOffset + (index * this.spacing);
            this.scene.tweens.add({
                targets: [notif.background, notif.text],
                y: targetY,
                duration: 300,
                ease: 'Power2'
            });
        });
    }
}
