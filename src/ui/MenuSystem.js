import EventBus from '../EventBus.js';

/**
 * MenuSystem - Base class for all menu screens
 */
export default class MenuSystem {
    constructor(scene) {
        this.scene = scene;
        this.visible = false;
        this.elements = [];
    }

    show() {
        if (this.visible) return;

        this.visible = true;
        this.elements.forEach(el => {
            if (el && el.setVisible) {
                el.setVisible(true);
            }
        });

        EventBus.emit('menu:opened', {
            menu: this.constructor.name
        });
    }

    hide() {
        if (!this.visible) return;

        this.visible = false;
        this.elements.forEach(el => {
            if (el && el.setVisible) {
                el.setVisible(false);
            }
        });

        EventBus.emit('menu:closed', {
            menu: this.constructor.name
        });
    }

    toggle() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    isVisible() {
        return this.visible;
    }

    addElement(element) {
        this.elements.push(element);
        if (!this.visible && element.setVisible) {
            element.setVisible(false);
        }
    }

    createButton(x, y, text, callback) {
        const button = {
            background: null,
            text: null,
            callback: callback,
            hovered: false
        };

        button.background = this.scene.add.rectangle(x, y, 200, 40, 0x333333);
        button.background.setInteractive();
        button.background.on('pointerover', () => {
            button.background.setFillStyle(0x555555);
            button.hovered = true;
        });
        button.background.on('pointerout', () => {
            button.background.setFillStyle(0x333333);
            button.hovered = false;
        });
        button.background.on('pointerdown', () => {
            if (callback) callback();
        });

        button.text = this.scene.add.text(x, y, text, {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff'
        });
        button.text.setOrigin(0.5, 0.5);

        this.addElement(button.background);
        this.addElement(button.text);

        return button;
    }
}
