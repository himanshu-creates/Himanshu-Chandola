/**
 * Studio Content Data - Beyond Design / Personal Interests
 * 
 * Contains exactly the 4 personal interests & hobbies:
 * 01 — BGMI / GAMING
 * 02 — CRICKET
 * 03 — DRAWING
 * 04 — MOUNTAINS
 */

export const PLATFORM_CONFIG = {
    bgmi: {
        color: '#f59e0b',
        accentColor: '#d97706',
        icon: '🎮',
        label: 'Gaming & BGMI',
        shape: 'phone',
    },
    cricket: {
        color: '#ef4444',
        accentColor: '#b91c1c',
        icon: '🏏',
        label: 'Cricket',
        shape: 'monitor',
    },
    drawing: {
        color: '#6366f1',
        accentColor: '#4f46e5',
        icon: '✏️',
        label: 'Drawing & Sketching',
        shape: 'monitor',
    },
    mountains: {
        color: '#10b981',
        accentColor: '#059669',
        icon: '🏔️',
        label: 'Mountains & Nature',
        shape: 'tv',
    },
};

export const RAW_CONTENT_DATA = [
    {
        id: 'hobby-001',
        platform: 'bgmi',
        category: 'BEYOND DESIGN',
        layout: 'hobby_details',
        device: 'phone',
        title: '01 — BGMI / GAMING',
        subtitle: 'Battlegrounds • Strategy • Reflexes',
        description: 'I enjoy playing BGMI.',
        tags: ['BGMI', 'Mobile Gaming', 'Battle Royale', 'Tactics'],
        frontTexture: '/textures/studio/hobby_bgmi_sketch.webp',
        paintedFrontTexture: '/textures/studio/hobby_bgmi_painted.webp',
        date: 'Personal Interest',
    },
    {
        id: 'hobby-002',
        platform: 'cricket',
        category: 'BEYOND DESIGN',
        layout: 'hobby_details',
        device: 'monitor',
        title: '02 — CRICKET',
        subtitle: 'Strategy • Teamwork • Athletic Spirit',
        description: 'Cricket is one of my favorite sports.',
        tags: ['Cricket', 'Sports', 'Teamwork', 'Focus'],
        frontTexture: '/textures/studio/hobby_cricket_sketch.webp',
        paintedFrontTexture: '/textures/studio/hobby_cricket_painted.webp',
        date: 'Personal Passion',
    },
    {
        id: 'hobby-003',
        platform: 'drawing',
        category: 'BEYOND DESIGN',
        layout: 'hobby_details',
        device: 'monitor',
        title: '03 — DRAWING',
        subtitle: 'Observational Sketches • Form • Ideation',
        description: 'I enjoy drawing and sketching.',
        tags: ['Sketching', 'Hand-drawn', 'Art', 'Visual Studies'],
        frontTexture: '/textures/studio/hobby_drawing_sketch.webp',
        paintedFrontTexture: '/textures/studio/hobby_drawing_painted.webp',
        date: 'Creative Practice',
    },
    {
        id: 'hobby-004',
        platform: 'mountains',
        category: 'BEYOND DESIGN',
        layout: 'hobby_details',
        device: 'tv',
        title: '04 — MOUNTAINS',
        subtitle: 'Himalayan Peace • Alpine Forests • Serenity',
        description: 'I love mountains, nature and the peaceful mountain atmosphere.',
        tags: ['Himalayas', 'Uttarakhand', 'Pine Trails', 'Nature'],
        frontTexture: '/textures/studio/hobby_mountains_sketch.webp',
        paintedFrontTexture: '/textures/studio/hobby_mountains_painted.webp',
        date: 'Life in Uttarakhand',
    },
];

export const CONTENT_DATA = RAW_CONTENT_DATA;

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content
export const getLatestContent = () => {
    return CONTENT_DATA[0];
};
