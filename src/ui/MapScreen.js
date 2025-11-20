import MenuSystem from './MenuSystem.js';

/**
 * MapScreen - Full map view (M key)
 */
export default class MapScreen extends MenuSystem {
    constructor(scene) {
        super(scene);
        this.exploredRooms = new Set();
        this.currentRoom = null;
        this.createMap();
    }

    createMap() {
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2;

        // Overlay
        const overlay = this.scene.add.rectangle(
            0, 0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000, 0.9
        );
        overlay.setOrigin(0, 0);
        overlay.setScrollFactor(0);
        overlay.setDepth(1400);
        this.addElement(overlay);

        // Title
        const title = this.scene.add.text(centerX, 50, 'MAP', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        title.setOrigin(0.5, 0.5);
        title.setScrollFactor(0);
        title.setDepth(1401);
        this.addElement(title);

        // Instructions
        const instructions = this.scene.add.text(
            centerX, this.scene.cameras.main.height - 50,
            'Press M to close',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#888888'
            }
        );
        instructions.setOrigin(0.5, 0.5);
        instructions.setScrollFactor(0);
        instructions.setDepth(1401);
        this.addElement(instructions);

        // Map will be drawn here (placeholder for now)
        const mapText = this.scene.add.text(
            centerX, centerY,
            'Map visualization\n(Rooms will be displayed here)',
            {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#666666',
                align: 'center'
            }
        );
        mapText.setOrigin(0.5, 0.5);
        mapText.setScrollFactor(0);
        mapText.setDepth(1401);
        this.addElement(mapText);
    }
}
