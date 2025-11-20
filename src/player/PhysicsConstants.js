/**
 * PhysicsConstants.js
 * All physics tuning values for player movement
 */
export default {
    // Movement
    MOVE_SPEED: 200,
    ACCELERATION: 1200,
    FRICTION: 800,

    // Jumping
    JUMP_VELOCITY: -500,
    JUMP_RELEASE_DECELERATION: 0.5,
    GRAVITY: 800,
    MAX_FALL_SPEED: 600,

    // Special moves
    DASH_SPEED: 400,
    DASH_DURATION: 0.3,
    DASH_COOLDOWN: 0.5,

    // Wall mechanics
    WALL_SLIDE_FRICTION: 0.5,
    WALL_JUMP_HORIZONTAL: 300,
    WALL_JUMP_VERTICAL: -450,

    // Grace periods (make platforming more forgiving)
    COYOTE_TIME: 0.1,    // 6 frames at 60fps
    JUMP_BUFFER: 0.1     // 6 frames at 60fps
};
