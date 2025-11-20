/**
 * InputManager.js
 * Handle all keyboard input for the player
 */
export default class InputManager {
    constructor(scene) {
        this.scene = scene;
        this.keys = {};
        this.setupKeys();
    }

    setupKeys() {
        const { W, A, S, D, SPACE, SHIFT, ESC, UP, LEFT, DOWN, RIGHT } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            up: W,
            left: A,
            down: S,
            right: D,
            jump: SPACE,
            dash: SHIFT,
            pause: ESC,
            upAlt: UP,
            leftAlt: LEFT,
            downAlt: DOWN,
            rightAlt: RIGHT
        });
    }

    isUpPressed() {
        return this.keys.up.isDown || this.keys.upAlt.isDown;
    }

    isDownPressed() {
        return this.keys.down.isDown || this.keys.downAlt.isDown;
    }

    isLeftPressed() {
        return this.keys.left.isDown || this.keys.leftAlt.isDown;
    }

    isRightPressed() {
        return this.keys.right.isDown || this.keys.rightAlt.isDown;
    }

    isJumpPressed() {
        return this.keys.jump.isDown;
    }

    isJumpJustPressed() {
        return Phaser.Input.Keyboard.JustDown(this.keys.jump);
    }

    isDashPressed() {
        return Phaser.Input.Keyboard.JustDown(this.keys.dash);
    }

    isPausePressed() {
        return Phaser.Input.Keyboard.JustDown(this.keys.pause);
    }
}
