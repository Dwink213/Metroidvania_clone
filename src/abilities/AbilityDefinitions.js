/**
 * AbilityDefinitions - Complete definitions for all unlockable abilities
 */
export default {
    dash: {
        id: 'dash',
        name: 'Dash',
        description: 'Quick burst of speed in any direction',
        icon: '→',
        color: 0x00aaff,
        category: 'movement'
    },
    doubleJump: {
        id: 'doubleJump',
        name: 'Double Jump',
        description: 'Jump again while in mid-air',
        icon: '↑↑',
        color: 0x88ff00,
        category: 'movement'
    },
    wallJump: {
        id: 'wallJump',
        name: 'Wall Jump',
        description: 'Jump off walls to reach higher areas',
        icon: '⟨↑',
        color: 0xff8800,
        category: 'movement'
    },
    glide: {
        id: 'glide',
        name: 'Glide',
        description: 'Hold jump to slow your fall',
        icon: '~',
        color: 0xaaffff,
        category: 'movement'
    },
    groundPound: {
        id: 'groundPound',
        name: 'Ground Pound',
        description: 'Smash downward to break obstacles',
        icon: '↓!',
        color: 0xffaa00,
        category: 'combat'
    },
    grapple: {
        id: 'grapple',
        name: 'Grappling Hook',
        description: 'Swing from grapple points',
        icon: '⟍⟋',
        color: 0xffff00,
        category: 'movement'
    },
    sprint: {
        id: 'sprint',
        name: 'Sprint',
        description: 'Increased movement speed',
        icon: '⇉',
        color: 0xff00ff,
        category: 'movement'
    },
    healthUp: {
        id: 'healthUp',
        name: 'Health Upgrade',
        description: 'Permanently increases maximum health by 20',
        icon: '❤+',
        color: 0xff0000,
        category: 'upgrade'
    },
    key_01: {
        id: 'key_01',
        name: 'Ancient Key',
        description: 'Unlocks the sealed treasury',
        icon: '🗝',
        color: 0xffaa00,
        category: 'key'
    }
};
