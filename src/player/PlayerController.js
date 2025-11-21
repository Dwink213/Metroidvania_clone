/**
 * PlayerController.js
 * Main player movement logic and state management
 */
import EventBus from '../EventBus.js';
import PhysicsConstants from './PhysicsConstants.js';
import HealthComponent from '../combat/HealthComponent.js';

export default class PlayerController {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create player sprite with character appearance
        this.sprite = this.createPlayerSprite(scene, x, y);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);
        this.sprite.body.setMaxVelocity(PhysicsConstants.MOVE_SPEED, PhysicsConstants.MAX_FALL_SPEED);

        // Initialize health component
        this.health = new HealthComponent(this, 100);

        // State
        this.facing = 'right';
        this.abilities = {
            dash: false,
            doubleJump: false,
            wallJump: false,
            glide: false
        };

        // Movement state
        this.hasDoubleJumped = false;
        this.coyoteTimer = 0;
        this.jumpBufferTimer = 0;
        this.dashTimer = 0;
        this.dashCooldown = 0;
        this.isDashing = false;
        this.isWallSliding = false;
        this.wallDirection = 0;
    }

    update(delta, input) {
        if (!delta || !input) {
            console.error('[PlayerController] Invalid update parameters');
            return;
        }

        const dt = delta / 1000;

        // Update health component (invincibility frames)
        this.health.update(delta);

        // Update timers
        this.coyoteTimer -= dt;
        this.jumpBufferTimer -= dt;
        this.dashTimer -= dt;
        this.dashCooldown -= dt;

        // Check grounded state
        const wasGrounded = this.isGrounded();
        const grounded = this.sprite.body.blocked.down;

        if (grounded && !wasGrounded) {
            EventBus.emit('player:landed', { position: this.getPosition() });
            this.hasDoubleJumped = false;
            console.log('SFX: land');
        }

        if (grounded) {
            this.coyoteTimer = PhysicsConstants.COYOTE_TIME;
        }

        // Jump buffering
        if (input.isJumpJustPressed()) {
            this.jumpBufferTimer = PhysicsConstants.JUMP_BUFFER;
        }

        // Dash handling
        if (this.isDashing) {
            if (this.dashTimer <= 0) {
                this.isDashing = false;
            }
            return; // Skip other movement during dash
        }

        // Horizontal movement
        let targetVelocityX = 0;
        if (input.isLeftPressed()) {
            targetVelocityX = -PhysicsConstants.MOVE_SPEED;
            this.facing = 'left';
            this.sprite.scaleX = -1; // Flip sprite left
        } else if (input.isRightPressed()) {
            targetVelocityX = PhysicsConstants.MOVE_SPEED;
            this.facing = 'right';
            this.sprite.scaleX = 1; // Flip sprite right
        }

        // Apply acceleration/friction
        const currentVelX = this.sprite.body.velocity.x;
        const accel = PhysicsConstants.ACCELERATION * dt;
        const friction = PhysicsConstants.FRICTION * dt;

        if (targetVelocityX !== 0) {
            if (Math.abs(currentVelX) < Math.abs(targetVelocityX)) {
                this.sprite.body.setVelocityX(
                    Phaser.Math.Clamp(
                        currentVelX + Math.sign(targetVelocityX) * accel,
                        -PhysicsConstants.MOVE_SPEED,
                        PhysicsConstants.MOVE_SPEED
                    )
                );
            } else {
                this.sprite.body.setVelocityX(targetVelocityX);
            }
        } else {
            // Apply friction
            if (Math.abs(currentVelX) < friction) {
                this.sprite.body.setVelocityX(0);
            } else {
                this.sprite.body.setVelocityX(currentVelX - Math.sign(currentVelX) * friction);
            }
        }

        // Wall slide detection
        this.isWallSliding = false;
        this.wallDirection = 0;
        if (!grounded && this.abilities.wallJump) {
            if (this.sprite.body.blocked.left) {
                this.isWallSliding = true;
                this.wallDirection = -1;
            } else if (this.sprite.body.blocked.right) {
                this.isWallSliding = true;
                this.wallDirection = 1;
            }
        }

        // Wall slide physics
        if (this.isWallSliding && this.sprite.body.velocity.y > 0) {
            this.sprite.body.setVelocityY(
                this.sprite.body.velocity.y * PhysicsConstants.WALL_SLIDE_FRICTION
            );
        }

        // Jump handling
        const canCoyoteJump = this.coyoteTimer > 0;
        const canDoubleJump = this.abilities.doubleJump && !grounded && !this.hasDoubleJumped;
        const canWallJump = this.abilities.wallJump && this.isWallSliding;
        const wantsToJump = this.jumpBufferTimer > 0;

        if (wantsToJump) {
            if (canCoyoteJump) {
                this.jump();
                this.jumpBufferTimer = 0;
                this.coyoteTimer = 0;
            } else if (canWallJump) {
                this.wallJump();
                this.jumpBufferTimer = 0;
            } else if (canDoubleJump) {
                this.jump();
                this.hasDoubleJumped = true;
                this.jumpBufferTimer = 0;
                console.log('SFX: doubleJump');
            }
        }

        // Variable jump height
        if (!input.isJumpPressed() && this.sprite.body.velocity.y < 0) {
            this.sprite.body.setVelocityY(
                this.sprite.body.velocity.y * PhysicsConstants.JUMP_RELEASE_DECELERATION
            );
        }

        // Glide
        if (this.abilities.glide && input.isJumpPressed() && this.sprite.body.velocity.y > 0 && !grounded) {
            this.sprite.body.setVelocityY(Math.min(this.sprite.body.velocity.y, 100));
        }

        // Dash
        if (this.abilities.dash && input.isDashPressed() && this.dashCooldown <= 0) {
            this.dash();
        }
    }

    jump() {
        this.sprite.body.setVelocityY(PhysicsConstants.JUMP_VELOCITY);
        EventBus.emit('player:jumped', { position: this.getPosition() });
        console.log('SFX: jump');
    }

    wallJump() {
        this.sprite.body.setVelocityY(PhysicsConstants.WALL_JUMP_VERTICAL);
        this.sprite.body.setVelocityX(-this.wallDirection * PhysicsConstants.WALL_JUMP_HORIZONTAL);
        this.isWallSliding = false;
        EventBus.emit('player:wallJumped', { position: this.getPosition(), direction: -this.wallDirection });
        console.log('SFX: wallJump');
    }

    dash() {
        this.isDashing = true;
        this.dashTimer = PhysicsConstants.DASH_DURATION;
        this.dashCooldown = PhysicsConstants.DASH_COOLDOWN;

        const dashDirection = this.facing === 'right' ? 1 : -1;
        this.sprite.body.setVelocity(dashDirection * PhysicsConstants.DASH_SPEED, 0);

        EventBus.emit('player:dashed', { position: this.getPosition(), direction: dashDirection });
        console.log('SFX: dash');
    }

    createPlayerSprite(scene, x, y) {
        // Create container for player character
        const container = scene.add.container(x, y);

        // Body (rounded rectangle)
        const body = scene.add.graphics();
        body.fillStyle(0x4488ff, 1);
        body.fillRoundedRect(-12, -8, 24, 24, 4);

        // Head (circle)
        const head = scene.add.graphics();
        head.fillStyle(0xffcc99, 1);
        head.fillCircle(0, -18, 8);

        // Eyes
        const eyes = scene.add.graphics();
        eyes.fillStyle(0x000000, 1);
        eyes.fillCircle(-3, -18, 2);
        eyes.fillCircle(3, -18, 2);

        // Visor/helmet detail
        const visor = scene.add.graphics();
        visor.lineStyle(2, 0x3366cc, 1);
        visor.strokeRect(-10, -6, 20, 10);

        // Arms
        const arms = scene.add.graphics();
        arms.fillStyle(0x3366cc, 1);
        arms.fillRect(-14, -2, 4, 12);
        arms.fillRect(10, -2, 4, 12);

        // Legs
        const legs = scene.add.graphics();
        legs.fillStyle(0x2255aa, 1);
        legs.fillRect(-8, 16, 6, 10);
        legs.fillRect(2, 16, 6, 10);

        // Add all parts to container
        container.add([body, head, eyes, visor, arms, legs]);

        // Store graphics references for animation
        container.bodyGraphics = body;
        container.headGraphics = head;
        container.armsGraphics = arms;
        container.legsGraphics = legs;

        return container;
    }

    isGrounded() {
        return this.sprite.body.blocked.down;
    }

    getPosition() {
        return { x: this.sprite.x, y: this.sprite.y };
    }

    getVelocity() {
        return { x: this.sprite.body.velocity.x, y: this.sprite.body.velocity.y };
    }

    getFacing() {
        return this.facing;
    }

    unlockAbility(abilityName) {
        if (this.abilities.hasOwnProperty(abilityName)) {
            this.abilities[abilityName] = true;
            console.log(`[PlayerController] Ability unlocked: ${abilityName}`);
        }
    }

    takeDamage(amount, source) {
        // Health component handles damage, invincibility, and emits events
        this.health.takeDamage(amount, source);
    }

    getSprite() {
        return this.sprite;
    }

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
    }
}
