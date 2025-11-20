/**
 * AIBehaviors - Reusable AI components for enemy behaviors
 */
export default class AIBehaviors {
    /**
     * Calculate distance between two positions
     */
    static getDistance(pos1, pos2) {
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Check if target is within range
     */
    static isInRange(enemyPos, targetPos, range) {
        return this.getDistance(enemyPos, targetPos) <= range;
    }

    /**
     * Get direction vector toward target
     * @returns {object} - Normalized {x, y} direction
     */
    static getDirectionToTarget(enemyPos, targetPos) {
        const dx = targetPos.x - enemyPos.x;
        const dy = targetPos.y - enemyPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) {
            return { x: 0, y: 0 };
        }

        return {
            x: dx / distance,
            y: dy / distance
        };
    }

    /**
     * Patrol behavior - move back and forth between two points
     */
    static updatePatrol(enemy, speed, leftBound, rightBound) {
        const { x } = enemy.sprite;

        if (enemy.patrolDirection === undefined) {
            enemy.patrolDirection = 1; // Start moving right
        }

        // Check bounds and reverse direction
        if (x >= rightBound) {
            enemy.patrolDirection = -1;
        } else if (x <= leftBound) {
            enemy.patrolDirection = 1;
        }

        enemy.sprite.body.setVelocityX(speed * enemy.patrolDirection);
    }

    /**
     * Chase behavior - move toward target
     */
    static updateChase(enemy, targetPos, speed) {
        const direction = this.getDirectionToTarget(
            { x: enemy.sprite.x, y: enemy.sprite.y },
            targetPos
        );

        enemy.sprite.body.setVelocityX(direction.x * speed);
    }
}
