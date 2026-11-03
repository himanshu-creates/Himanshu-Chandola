import { useState, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import SkyChunk, { CHUNK_LENGTH, ROOM_Z } from './SkyChunk';

// Corridor clip plane (matches SkyChunk)
const MILESTONE_CORRIDOR_CLIP_Z = -8.0;

/**
 * InfiniteSkyManager Component
 * 
 * Renders:
 * 1. Infinite clouds via SkyChunk
 * 2. Opening introduction: Himanshu Chandola (UNTOUCHED)
 * 3. Three sequential floating islands:
 *    - EDUCATION (target scroll = 40)
 *    - EXPERIENCE (target scroll = 80)
 *    - MY DESIGN APPROACH (target scroll = 120, stops cleanly)
 */
const InfiniteSkyManager = ({ scrollProgressRef }) => {
    const [activeChunks, setActiveChunks] = useState([-1, 0, 1, 2, 3]);
    const worldRef = useRef();

    const getCurrentChunk = (worldZ) => {
        return Math.floor(worldZ / CHUNK_LENGTH);
    };

    useFrame(() => {
        if (!worldRef.current) return;

        const scrollProgress = scrollProgressRef?.current || 0;
        worldRef.current.position.z = scrollProgress;

        const currentChunk = getCurrentChunk(scrollProgress);
        const shouldBeActiveChunks = [
            currentChunk - 1,
            currentChunk,
            currentChunk + 1,
            currentChunk + 2,
            currentChunk + 3,
        ];

        const chunksNeedUpdate =
            shouldBeActiveChunks.some((c) => !activeChunks.includes(c)) ||
            activeChunks.some((c) => !shouldBeActiveChunks.includes(c));

        if (chunksNeedUpdate) {
            setActiveChunks(shouldBeActiveChunks);
        }
    });

    return (
        <group ref={worldRef}>
            {/* === SKY CHUNKS WITH CLOUDS === */}
            {activeChunks.map((chunkIndex) => (
                <SkyChunk
                    key={`sky-chunk-${chunkIndex}`}
                    chunkIndex={chunkIndex}
                    seed={42}
                    scrollProgressRef={scrollProgressRef}
                />
            ))}

            {/* === OPENING INTRODUCTION (UNTOUCHED) === */}
            <IntroMilestone z={-15} scrollProgressRef={scrollProgressRef} />

            {/* === 01 EDUCATION ISLAND === */}
            <IslandMilestone
                islandTexturePath="/textures/about/island_edu.webp"
                headingTexturePath="/textures/about/heading_edu.png"
                headingWidth={2.85}
                headingHeight={0.50}
                targetScroll={40}
                isLast={false}
                scrollProgressRef={scrollProgressRef}
            />

            {/* === 02 EXPERIENCE ISLAND === */}
            <IslandMilestone
                islandTexturePath="/textures/about/island_exp.webp"
                headingTexturePath="/textures/about/heading_exp.png"
                headingWidth={2.85}
                headingHeight={0.50}
                targetScroll={80}
                isLast={false}
                scrollProgressRef={scrollProgressRef}
            />

            {/* === 03 MY DESIGN APPROACH ISLAND === */}
            <IslandMilestone
                islandTexturePath="/textures/about/island_approach.webp"
                headingTexturePath="/textures/about/heading_approach.png"
                headingWidth={3.80}
                headingHeight={0.48}
                targetScroll={120}
                isLast={true}
                scrollProgressRef={scrollProgressRef}
            />
        </group>
    );
};

/**
 * INTRO Milestone
 * Personal introduction, avatar on cloud, and quote.
 * PRESERVED EXACTLY AS IS.
 */
const IntroMilestone = ({ z, scrollProgressRef }) => {
    const avatarTexture = useLoader(THREE.TextureLoader, '/textures/about/awatarnachmurce.webp');
    const groupRef = useRef();
    const titleRef = useRef();
    const roleRef = useRef();
    const avatarRef = useRef();
    const quote1Ref = useRef();
    const quote2Ref = useRef();
    const quote3Ref = useRef();

    const baseY = 2.0;
    const avatarWidth = 5.6;
    const avatarHeight = avatarWidth / (2816 / 1536);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;
        const scrollProgress = scrollProgressRef?.current || 0;
        const worldZ = ROOM_Z + scrollProgress + z;

        groupRef.current.visible = worldZ < MILESTONE_CORRIDOR_CLIP_Z;
        if (!groupRef.current.visible) return;

        const distanceZ = z + scrollProgress - 55;
        const spreadStart = -70;
        const spreadEnd = -50;
        let spreadFactor = 0;

        if (distanceZ > spreadStart && distanceZ < spreadEnd) {
            spreadFactor = (distanceZ - spreadStart) / (spreadEnd - spreadStart);
            spreadFactor = Math.min(1, Math.max(0, spreadFactor));
            spreadFactor = spreadFactor * spreadFactor;
        } else if (distanceZ >= spreadEnd) {
            spreadFactor = 1;
        }

        const maxSpread = 14;

        if (titleRef.current) {
            titleRef.current.position.x = -spreadFactor * maxSpread * 0.8;
        }
        if (roleRef.current) {
            roleRef.current.position.x = spreadFactor * maxSpread * 0.6;
        }
        if (avatarRef.current) {
            avatarRef.current.position.y = baseY + Math.sin(time * 0.8) * 0.15 + spreadFactor * 3;
            avatarRef.current.position.x = -spreadFactor * maxSpread * 0.3;
        }
        if (quote1Ref.current) {
            quote1Ref.current.position.x = spreadFactor * maxSpread * 0.7;
        }
        if (quote2Ref.current) {
            quote2Ref.current.position.x = -spreadFactor * maxSpread * 0.5;
        }
        if (quote3Ref.current) {
            quote3Ref.current.position.x = spreadFactor * maxSpread * 0.6;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, z]}>
            {/* Name */}
            <Text
                ref={titleRef}
                position={[0, 4.8, 0.1]}
                fontSize={0.85}
                color="#1a1a1a"
                anchorX="center"
                anchorY="middle"
                font="/fonts/RubikScribble-Regular.ttf"
            >
                HIMANSHU CHANDOLA
            </Text>

            {/* Role */}
            <Text
                ref={roleRef}
                position={[0, 4.0, 0.1]}
                fontSize={0.38}
                color="#333333"
                anchorX="center"
                anchorY="middle"
                font="/fonts/CabinSketch-Bold.ttf"
            >
                Product Designer | UI/UX Designer
            </Text>

            {/* Avatar on cloud */}
            <mesh ref={avatarRef} position={[0, baseY, 0]}>
                <planeGeometry args={[avatarWidth, avatarHeight]} />
                <meshBasicMaterial
                    color="#e0e0e0"
                    map={avatarTexture}
                    transparent
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Bio / Quote Line 1 */}
            <Text
                ref={quote1Ref}
                position={[0, 0.3, 0.1]}
                fontSize={0.28}
                color="#444444"
                anchorX="center"
                anchorY="middle"
                font="/fonts/CabinSketch-Regular.ttf"
            >
                "I'm Himanshu, a Product Designer and UI/UX Designer who enjoys creating
            </Text>

            {/* Bio / Quote Line 2 */}
            <Text
                ref={quote2Ref}
                position={[0, -0.15, 0.1]}
                fontSize={0.28}
                color="#444444"
                anchorX="center"
                anchorY="middle"
                font="/fonts/CabinSketch-Regular.ttf"
            >
                meaningful, intuitive and user-friendly digital experiences.
            </Text>

            {/* Bio / Quote Line 3 */}
            <Text
                ref={quote3Ref}
                position={[0, -0.6, 0.1]}
                fontSize={0.28}
                color="#444444"
                anchorX="center"
                anchorY="middle"
                font="/fonts/CabinSketch-Regular.ttf"
            >
                I love exploring ideas, solving problems and turning them into thoughtful designs."
            </Text>
        </group>
    );
};

/**
 * REUSABLE ISLAND MILESTONE
 * 
 * Renders each floating island milestone matching the target reference designs:
 * - Island mesh with signboard containing clean icons, typography, and badges.
 * - Section heading with radiating marks and hand-drawn green underline above the grass.
 * - Calibrated scale, smooth fade-in/fade-out through cloud layers.
 * - Drifts gently without zooming into camera.
 * - Stays stable at target scroll.
 */
const IslandMilestone = ({
    islandTexturePath,
    headingTexturePath,
    headingWidth = 2.85,
    headingHeight = 0.50,
    targetScroll,
    isLast = false,
    scrollProgressRef
}) => {
    const groupRef = useRef();
    const islandMeshRef = useRef();
    const islandMatRef = useRef();
    const headingMatRef = useRef();

    const islandTexture = useLoader(THREE.TextureLoader, islandTexturePath);
    islandTexture.colorSpace = THREE.SRGBColorSpace;

    const headingTexture = useLoader(THREE.TextureLoader, headingTexturePath);
    headingTexture.colorSpace = THREE.SRGBColorSpace;

    const islandHeight = 4.2;
    const islandAspect = 1372 / 686; // 2.0

    useFrame((state) => {
        if (!groupRef.current) return;

        const scrollProgress = scrollProgressRef?.current || 0;
        const diff = scrollProgress - targetScroll;

        // Transition ranges (scroll units)
        const fadeInStart = -20;
        const fadeInEnd = -6;
        const fadeOutStart = 6;
        const fadeOutEnd = 20;

        let opacity = 0;
        let baseY = 0.85;

        if (diff < fadeInStart) {
            opacity = 0;
        } else if (diff < fadeInEnd) {
            // Fading in & rising from clouds
            const t = (diff - fadeInStart) / (fadeInEnd - fadeInStart);
            const ease = t * t * (3 - 2 * t);
            opacity = ease;
            baseY = -1.2 + ease * 2.05;
        } else if (isLast || diff <= fadeOutStart) {
            // Stable, perfectly readable zone
            opacity = 1;
            baseY = 0.85;
        } else if (diff <= fadeOutEnd) {
            // Fading out & gently settling into clouds
            const t = (diff - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            const ease = t * t * (3 - 2 * t);
            opacity = 1 - ease;
            baseY = 0.85 - ease * 1.5;
        } else {
            opacity = 0;
        }

        groupRef.current.visible = opacity > 0.005;
        if (!groupRef.current.visible) return;

        const time = state.clock.elapsedTime;
        const phase = targetScroll * 0.1;

        // Floating animation (bobbing in clouds)
        if (islandMeshRef.current) {
            islandMeshRef.current.position.y = baseY + Math.sin(time * 0.5 + phase) * 0.1;
            islandMeshRef.current.rotation.z = Math.sin(time * 0.3 + phase) * 0.015;
        }

        // Apply opacity to both materials together
        if (islandMatRef.current) {
            islandMatRef.current.opacity = opacity;
        }
        if (headingMatRef.current) {
            headingMatRef.current.opacity = opacity;
        }

        // Drift gently backward when scrolling past so it NEVER zooms into the camera lens
        const zOffset = diff > 0 && !isLast ? -diff * 0.5 : 0;
        groupRef.current.position.z = -targetScroll + zOffset;
    });

    return (
        <group ref={groupRef} position={[0, 0, -targetScroll]}>
            <group ref={islandMeshRef} position={[0, 0.85, 0]}>
                {/* Floating Island with Signboard Illustration */}
                <mesh>
                    <planeGeometry args={[islandHeight * islandAspect, islandHeight]} />
                    <meshBasicMaterial
                        ref={islandMatRef}
                        color="#ffffff"
                        map={islandTexture}
                        transparent
                        side={THREE.DoubleSide}
                        depthWrite={false}
                    />
                </mesh>

                {/* Section Title Plane (Above Grass) */}
                <mesh position={[0, 1.48, 0.05]}>
                    <planeGeometry args={[headingWidth, headingHeight]} />
                    <meshBasicMaterial
                        ref={headingMatRef}
                        color="#ffffff"
                        map={headingTexture}
                        transparent
                        side={THREE.DoubleSide}
                        depthWrite={false}
                    />
                </mesh>
            </group>
        </group>
    );
};

export default InfiniteSkyManager;
