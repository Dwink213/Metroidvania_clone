/**
 * DialogueBox - Text display for NPCs and story moments
 */
export default class DialogueBox {
    constructor(scene) {
        this.scene = scene;
        this.visible = false;
        this.currentText = '';
        this.isTyping = false;

        this.createDialogueBox();
    }

    createDialogueBox() {
        const width = 800;
        const height = 150;
        const x = this.scene.cameras.main.width / 2;
        const y = this.scene.cameras.main.height - 100;

        // Background
        this.background = this.scene.add.rectangle(x, y, width, height, 0x000000, 0.9);
        this.background.setOrigin(0.5, 0.5);
        this.background.setScrollFactor(0);
        this.background.setDepth(3000);
        this.background.setVisible(false);

        // Border
        this.border = this.scene.add.rectangle(x, y, width + 4, height + 4, 0xffffff, 1);
        this.border.setOrigin(0.5, 0.5);
        this.border.setScrollFactor(0);
        this.border.setDepth(2999);
        this.border.setVisible(false);
        this.border.setStrokeStyle(2, 0xffffff);

        // Text
        this.text = this.scene.add.text(x, y, '', {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: width - 40 }
        });
        this.text.setOrigin(0.5, 0.5);
        this.text.setScrollFactor(0);
        this.text.setDepth(3001);
        this.text.setVisible(false);

        // Continue prompt
        this.continuePrompt = this.scene.add.text(
            x + width / 2 - 50, y + height / 2 - 20,
            '[SPACE]',
            {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#888888'
            }
        );
        this.continuePrompt.setOrigin(1, 1);
        this.continuePrompt.setScrollFactor(0);
        this.continuePrompt.setDepth(3001);
        this.continuePrompt.setVisible(false);
    }

    show(text) {
        this.currentText = text;
        this.visible = true;
        this.isTyping = true;

        this.background.setVisible(true);
        this.border.setVisible(true);
        this.text.setVisible(true);
        this.text.setText('');

        // Typewriter effect (simplified - instant for now)
        this.text.setText(text);
        this.isTyping = false;
        this.continuePrompt.setVisible(true);
    }

    hide() {
        this.visible = false;
        this.background.setVisible(false);
        this.border.setVisible(false);
        this.text.setVisible(false);
        this.continuePrompt.setVisible(false);
    }

    isVisible() {
        return this.visible;
    }
}
