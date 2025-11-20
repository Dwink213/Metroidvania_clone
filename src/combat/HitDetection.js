/**
 * HitDetection - Utility for checking hitbox overlaps and calculating damage
 */
export default class HitDetection {
    /**
     * Check if two entities overlap (circular hitboxes)
     * @param {object} pos1 - {x, y} position of entity 1
     * @param {number} radius1 - Hitbox radius of entity 1
     * @param {object} pos2 - {x, y} position of entity 2
     * @param {number} radius2 - Hitbox radius of entity 2
     * @returns {boolean} - True if overlapping
     */
    static checkCircleOverlap(pos1, radius1, pos2, radius2) {
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (radius1 + radius2);
    }

    /**
     * Calculate knockback vector from attacker to target
     * @param {object} attackerPos - {x, y} position of attacker
     * @param {object} targetPos - {x, y} position of target
     * @param {number} force - Knockback force magnitude
     * @returns {object} - {x, y} knockback velocity
     */
    static calculateKnockback(attackerPos, targetPos, force = 300) {
        const dx = targetPos.x - attackerPos.x;
        const dy = targetPos.y - attackerPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) {
            return { x: force, y: 0 }; // Default to right
        }

        const normalizedX = dx / distance;
        const normalizedY = dy / distance;

        return {
            x: normalizedX * force,
            y: normalizedY * force * 0.5 // Less vertical knockback
        };
    }

    /**
     * Apply damage with knockback
     */
    static applyDamage(target, damage, knockback) {
        if (target.health && target.health.takeDamage) {
            target.health.takeDamage(damage);
        }

        if (target.sprite && target.sprite.body && knockback) {
            target.sprite.body.setVelocity(knockback.x, knockback.y);
        }
    }
}
