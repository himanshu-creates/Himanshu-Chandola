import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, PositionalAudio } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useAudio } from '../../../context/AudioManager';
import { isTouchDevice } from '../../../utils/deviceDetect';

// Cloud textures from existing project
const CLOUD_TEXTURES = [
    '/textures/clouds/1131c3eb-dfae-423f-924b-ff39d8ccd6dc.webp',
    '/textures/clouds/254b8ec8-d6f7-4275-956f-7bab65b2ce2d.webp',
    '/textures/clouds/2cc88dd1-483c-466d-b07e-f8308c61ccbe.webp',
    '/textures/clouds/5606fcc0-3252-447d-a58a-7bcbac73229a.webp',
    '/textures/clouds/7882dc72-3d01-41fb-ac0e-d07b0184ebc1.webp',
    '/textures/clouds/9b2ca72f-7bd0-473b-ba6e-dd9e0eb79d35.webp',
];

/**
 * Individual Interactive Button with Hover / Touch Color Bloom
 */
const MountainButton = ({
    position,
    args,
    coloredTexturePath,
    onClick,
    label
}) => {
    const meshRef = useRef();
    const coloredMatRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const coloredTex = useTexture(coloredTexturePath);
    const isTouch = useMemo(() => isTouchDevice(), []);

    const handlePointerOver = (e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        setIsHovered(true);

        if (coloredMatRef.current) {
            gsap.to(coloredMatRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true
            });
        }
        if (meshRef.current) {
            gsap.to(meshRef.current.scale, {
                x: 1.05,
                y: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true
            });
            gsap.to(meshRef.current.position, {
                z: position[2] + 0.05,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true
            });
        }
    };

    const handlePointerOut = () => {
        document.body.style.cursor = 'auto';
        setIsHovered(false);

        if (coloredMatRef.current) {
            gsap.to(coloredMatRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: true
            });
        }
        if (meshRef.current) {
            gsap.to(meshRef.current.scale, {
                x: 1.0,
                y: 1.0,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: true
            });
            gsap.to(meshRef.current.position, {
                z: position[2],
                duration: 0.4,
                ease: 'power2.out',
                overwrite: true
            });
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (meshRef.current) {
            // Click punch animation
            gsap.timeline()
                .to(meshRef.current.scale, { x: 0.95, y: 0.95, duration: 0.1, ease: 'power2.in' })
                .to(meshRef.current.scale, { x: 1.05, y: 1.05, duration: 0.15, ease: 'power2.out' });
        }
        onClick?.();
    };

    return (
        <group
            ref={meshRef}
            position={position}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
            onPointerDown={(e) => {
                if (isTouch) handlePointerOver(e);
            }}
            onPointerUp={(e) => {
                if (isTouch) {
                    setTimeout(handlePointerOut, 600);
                }
            }}
        >
            {/* Invisible Hitbox plane */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={args} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Colored Version that fades in on hover */}
            <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={args} />
                <meshBasicMaterial
                    ref={coloredMatRef}
                    map={coloredTex}
                    transparent={true}
                    opacity={0}
                    alphaTest={0.05}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
};

/**
 * Drifting Mountain Cloud
 */
const MountainCloud = ({ initialX, y, z, speed, scale, textureIndex }) => {
    const cloudRef = useRef();
    const tex = useTexture(CLOUD_TEXTURES[textureIndex % CLOUD_TEXTURES.length]);

    useFrame((state, delta) => {
        if (!cloudRef.current) return;
        cloudRef.current.position.x += speed * delta;
        // Wrap around boundary
        if (cloudRef.current.position.x > 12) {
            cloudRef.current.position.x = -12;
        }
    });

    return (
        <mesh ref={cloudRef} position={[initialX, y, z]} scale={[scale * 2.2, scale, 1]}>
            <planeGeometry args={[2, 1]} />
            <meshBasicMaterial
                map={tex}
                transparent={true}
                opacity={0.55}
                depthWrite={false}
            />
        </mesh>
    );
};

/**
 * MountainDestination Component
 * 
 * The final destination at the end of the corridor.
 * Positioned right behind the SegmentDoors at Z = -65.
 */
const MountainDestination = ({ onBackToMainGate }) => {
    const { camera, viewport } = useThree();
    const { globalVolume, isMuted } = useAudio();
    const breezeAudioRef = useRef();

    // Responsive scaling based on viewport aspect ratio
    const responsiveScale = useMemo(() => {
        if (viewport.aspect < 1.0) {
            // Mobile portrait: scale comfortably to fit screen width
            return 0.85;
        } else if (viewport.aspect < 1.45) {
            // Laptops / tablets / 4:3
            return 0.95;
        }
        return 1.0;
    }, [viewport.aspect]);

    // Load master artwork
    const mountainTex = useTexture('/textures/mountain/mountain_destination.webp');

    // Cloud configuration
    const clouds = useMemo(() => [
        { id: 1, initialX: -6.5, y: 3.8, z: -76.8, speed: 0.12, scale: 0.9, textureIndex: 0 },
        { id: 2, initialX: -1.0, y: 4.2, z: -77.0, speed: 0.08, scale: 1.1, textureIndex: 2 },
        { id: 3, initialX: 4.8, y: 3.5, z: -76.5, speed: 0.15, scale: 0.8, textureIndex: 4 },
        { id: 4, initialX: 8.5, y: 4.0, z: -76.9, speed: 0.10, scale: 1.0, textureIndex: 1 },
    ], []);

    // Ambient mountain wind sound as camera approaches
    useFrame(() => {
        if (!breezeAudioRef.current) return;
        const camZ = camera.position.z;
        // Fade in sound when camera is near or through the gate (Z <= -62)
        if (camZ <= -62) {
            const proximity = THREE.MathUtils.clamp((-62 - camZ) / 8, 0, 1);
            const targetVol = isMuted ? 0 : 0.4 * globalVolume * proximity;
            breezeAudioRef.current.setVolume(targetVol);
            if (!breezeAudioRef.current.isPlaying && targetVol > 0.01) {
                breezeAudioRef.current.play();
            }
        } else {
            if (breezeAudioRef.current.isPlaying) {
                breezeAudioRef.current.setVolume(0);
            }
        }
    });

    // Contact actions
    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/himanshu-chandola-1b80a3292/', '_blank', 'noopener,noreferrer');
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/918171182424', '_blank', 'noopener,noreferrer');
    };

    const handleEmail = () => {
        window.location.href = 'mailto:himanshuchandola.design@gmail.com';
    };

    return (
        <group position={[0, 0, 0]} scale={[responsiveScale, responsiveScale, 1]}>
            {/* === MASTER MOUNTAIN LANDSCAPE BACKDROP === */}
            {/* Placed at Z = -77.5, Y = 1.2 to lift billboard into optimal viewport center. Size: 16 x 9 */}
            <mesh position={[0, 1.2, -77.5]}>
                <planeGeometry args={[16, 9]} />
                <meshBasicMaterial
                    map={mountainTex}
                    color="#ffffff"
                    toneMapped={false}
                />
            </mesh>

            {/* === DRIFTING CLOUDS IN MOUNTAIN SKY === */}
            {clouds.map(c => (
                <MountainCloud key={c.id} {...c} />
            ))}

            {/* === INTERACTIVE CONTACT BUTTONS === */}
            {/* 1. LinkedIn */}
            <MountainButton
                position={[-2.125, -0.08, -77.46]}
                args={[1.906, 1.094]}
                coloredTexturePath="/textures/mountain/btn_linkedin_colored.webp"
                onClick={handleLinkedIn}
                label="LinkedIn"
            />

            {/* 2. WhatsApp */}
            <MountainButton
                position={[-0.015, -0.08, -77.46]}
                args={[1.906, 1.094]}
                coloredTexturePath="/textures/mountain/btn_whatsapp_colored.webp"
                onClick={handleWhatsApp}
                label="WhatsApp"
            />

            {/* 3. Email */}
            <MountainButton
                position={[2.109, -0.08, -77.46]}
                args={[1.844, 1.094]}
                coloredTexturePath="/textures/mountain/btn_email_colored.webp"
                onClick={handleEmail}
                label="Email"
            />

            {/* 4. Back to Main Gate (clearly visible with generous clearance below) */}
            <MountainButton
                position={[-0.125, -1.33, -77.46]}
                args={[3.938, 0.938]}
                coloredTexturePath="/textures/mountain/btn_back_to_gate_colored.webp"
                onClick={onBackToMainGate}
                label="Back to Main Gate"
            />

            {/* Ambient Mountain Breeze Sound */}
            <PositionalAudio
                ref={breezeAudioRef}
                url="/sounds/szumwiatru.mp3"
                distanceModel="exponential"
                rolloffFactor={1.2}
                refDistance={6}
                loop={true}
            />
        </group>
    );
};

export default MountainDestination;

