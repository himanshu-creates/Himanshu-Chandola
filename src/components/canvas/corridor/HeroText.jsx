import { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';

// Fonts for sketch typography
const RUBIK_SCRIBBLE_URL = '/fonts/RubikScribble-Regular.ttf';
const CABIN_SKETCH_BOLD_URL = '/fonts/CabinSketch-Bold.ttf';
const CABIN_SKETCH_URL = '/fonts/CabinSketch-Regular.ttf';

/**
 * HeroText Component
 * 
 * Symmetrical 3-Column Visual Hierarchy:
 * - Left: Premium Personal Profile Showcase with TWO real photographs of Himanshu
 *         + Dedicated "TALK TO MY CLONE ↗" entry point
 * - Center: Name, Designation, Description, Action Buttons with generous vertical breathing room
 * - Right: Illustrated waving character in CorridorSegment (positioned at X = 2.3)
 * - Mobile: Adapts to vertical non-overlapping layout on narrower viewports
 */
const HeroText = ({ position = [0, -0.1, -0.5] }) => {
    const groupRef = useRef();
    const cardGroupRef = useRef();
    const { teleportTo } = useScene();
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [scale, setScale] = useState(1);
    const [activePhoto, setActivePhoto] = useState(null);

    const handleClosePhoto = useCallback(() => {
        setActivePhoto(null);
        document.body.style.cursor = 'auto';
    }, []);

    // Responsive scaling and mobile check
    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            setIsMobile(width < 850);

            const minWidth = 320;
            const maxWidth = 1200;
            const minScale = 0.52;
            const maxScale = 1.0;

            const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
            const t = (clampedWidth - minWidth) / (maxWidth - minWidth);
            setScale(minScale + t * (maxScale - minScale));
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    // Load textures
    const buttonTexture = useTexture('/textures/about/button.webp');
    const profileTexture = useTexture('/images/profile-himanshu.webp');
    const travelTexture = useTexture('/images/himanshu-travel.webp');

    useEffect(() => {
        if (buttonTexture) buttonTexture.colorSpace = THREE.SRGBColorSpace;
        if (profileTexture) profileTexture.colorSpace = THREE.SRGBColorSpace;
        if (travelTexture) travelTexture.colorSpace = THREE.SRGBColorSpace;
    }, [buttonTexture, profileTexture, travelTexture]);

    // Handle cursor on hover
    const handlePointerOver = (btnName) => {
        setHoveredBtn(btnName);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHoveredBtn(null);
        document.body.style.cursor = 'auto';
    };

    useEffect(() => {
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    // Subtle breathing animation + smooth card hover lift
    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.015;

        if (cardGroupRef.current) {
            const targetZ = isCardHovered ? 0.06 : 0.02;
            cardGroupRef.current.position.z = THREE.MathUtils.lerp(cardGroupRef.current.position.z, targetZ, 0.1);
        }
    });

    // Profile card position: on desktop comfortably to the left with ample clearance, on mobile stacked above
    const profileCardPos = isMobile ? [0, 1.25, 0.02] : [-2.55, -0.15, 0.02];
    const profileCardScale = isMobile ? 0.72 : 1.0;

    return (
        <group ref={groupRef} position={position} scale={[scale, scale, 1]}>
            {/* ============================================================== */}
            {/* 1. LEFT COLUMN: PREMIUM PROFILE CARD WITH TWO REAL PHOTOS      */}
            {/*    Placed at X = -2.55 with ample clearance from the heading   */}
            {/* ============================================================== */}
            <group
                ref={cardGroupRef}
                position={profileCardPos}
                scale={[profileCardScale, profileCardScale, 1]}
                onPointerOver={() => setIsCardHovered(true)}
                onPointerOut={() => setIsCardHovered(false)}
            >
                {/* Subtle soft drop shadow behind card */}
                <mesh position={[0.02, -0.02, -0.005]}>
                    <planeGeometry args={[1.06, 1.80]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.06} side={THREE.DoubleSide} />
                </mesh>

                {/* Hand-drawn paper card backing */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[1.04, 1.78]} />
                    <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                </mesh>
                {/* Sketch border line */}
                <mesh position={[0, 0, 0.005]}>
                    <planeGeometry args={[0.99, 1.73]} />
                    <meshBasicMaterial color="#f8fafc" side={THREE.DoubleSide} />
                </mesh>

                {/* --- DUAL PHOTO SHOWCASE (TWO REAL PERSONAL PHOTOS) --- */}
                <group position={[0, 0.44, 0.01]}>
                    {/* Primary Photo: Portrait in blue fleece (1:1 square) */}
                    <group
                        position={[-0.10, 0.02, 0.01]}
                        onPointerOver={(e) => {
                            e.stopPropagation();
                            document.body.style.cursor = 'pointer';
                        }}
                        onPointerOut={(e) => {
                            e.stopPropagation();
                            document.body.style.cursor = 'auto';
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActivePhoto({
                                src: '/images/profile-himanshu.webp',
                                alt: 'Himanshu Chandola — Product Designer | UI/UX Designer',
                            });
                        }}
                    >
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[0.58, 0.58]} />
                            <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[0, 0, 0.01]}>
                            <planeGeometry args={[0.54, 0.54]} />
                            <meshBasicMaterial map={profileTexture} side={THREE.DoubleSide} />
                        </mesh>
                    </group>

                    {/* Secondary Photo: Motorbike on mountain highway (16:10 landscape) */}
                    {/* Tastefully overlapping with artistic tilt & polaroid border */}
                    <group
                        position={[0.22, -0.14, 0.03]}
                        rotation={[0, 0, -0.07]}
                        onPointerOver={(e) => {
                            e.stopPropagation();
                            document.body.style.cursor = 'pointer';
                        }}
                        onPointerOut={(e) => {
                            e.stopPropagation();
                            document.body.style.cursor = 'auto';
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActivePhoto({
                                src: '/images/himanshu-travel.webp',
                                alt: 'Himanshu Chandola — Travel & Exploring',
                            });
                        }}
                    >
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[0.48, 0.32]} />
                            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[0, 0, 0.005]}>
                            <planeGeometry args={[0.46, 0.30]} />
                            <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[0, 0, 0.01]}>
                            <planeGeometry args={[0.43, 0.27]} />
                            <meshBasicMaterial map={travelTexture} side={THREE.DoubleSide} />
                        </mesh>
                    </group>
                </group>

                {/* --- PERSONAL DETAILS --- */}
                <Text
                    position={[0, 0.03, 0.02]}
                    fontSize={0.072}
                    font={CABIN_SKETCH_BOLD_URL}
                    color="#0f172a"
                    anchorX="center"
                    anchorY="middle"
                >
                    HIMANSHU CHANDOLA
                </Text>

                <Text
                    position={[0, -0.10, 0.02]}
                    fontSize={0.052}
                    font={CABIN_SKETCH_BOLD_URL}
                    color="#2563eb"
                    anchorX="center"
                    anchorY="middle"
                >
                    Product Designer | UI/UX Designer
                </Text>

                <Text
                    position={[0, -0.21, 0.02]}
                    fontSize={0.048}
                    font={CABIN_SKETCH_URL}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    BCA – Full Stack Development
                </Text>

                <Text
                    position={[0, -0.31, 0.02]}
                    fontSize={0.044}
                    font={CABIN_SKETCH_URL}
                    color="#475569"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={0.92}
                    textAlign="center"
                >
                    Pahadi Bhula Production – 6 Months Internship
                </Text>

                {/* --- CHATBOT ENTRY POINT ("TALK TO MY CLONE ↗") --- */}
                <group
                    position={[0, -0.58, 0.03]}
                    onPointerOver={() => handlePointerOver('clone')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Dispatch event for dedicated chatbot interface
                        window.dispatchEvent(new CustomEvent('openAIChat'));
                        console.log('TALK TO MY CLONE ↗ clicked: ready for dedicated AI chatbot implementation.');
                    }}
                >
                    {/* Button Background */}
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[0.92, 0.28]} />
                        <meshBasicMaterial
                            color={hoveredBtn === 'clone' ? '#ecfdf5' : '#ffffff'}
                            map={buttonTexture}
                            transparent
                            alphaTest={0.05}
                        />
                    </mesh>

                    {/* Button Title */}
                    <Text
                        position={[0, 0.04, 0.02]}
                        fontSize={0.062}
                        font={CABIN_SKETCH_BOLD_URL}
                        color={hoveredBtn === 'clone' ? '#059669' : '#0f172a'}
                        anchorX="center"
                        anchorY="middle"
                    >
                        TALK TO MY CLONE ↗
                    </Text>

                    {/* Button Subtitle */}
                    <Text
                        position={[0, -0.06, 0.02]}
                        fontSize={0.036}
                        font={CABIN_SKETCH_URL}
                        color={hoveredBtn === 'clone' ? '#047857' : '#64748b'}
                        anchorX="center"
                        anchorY="middle"
                    >
                        Have a conversation with my AI twin
                    </Text>
                </group>
            </group>

            {/* ============================================================== */}
            {/* 2. CENTER COLUMN: NAME, TITLE, INTRO & ACTION BUTTONS          */}
            {/*    Strict vertical hierarchy with generous breathing room      */}
            {/* ============================================================== */}
            <group position={[0, 0, 0]}>
                {/* Main Heading: HIMANSHU CHANDOLA (Centered, unclipped) */}
                <Text
                    position={[0, 0.66, 0.02]}
                    fontSize={0.28}
                    font={RUBIK_SCRIBBLE_URL}
                    color="#ffffff"
                    outlineWidth={0.012}
                    outlineColor="#0f172a"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.01}
                >
                    HIMANSHU CHANDOLA
                </Text>

                {/* Professional Title / Designation */}
                <Text
                    position={[0, 0.34, 0.02]}
                    fontSize={0.135}
                    font={CABIN_SKETCH_BOLD_URL}
                    color="#0f172a"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.03}
                >
                    PRODUCT DESIGNER | UI/UX DESIGNER
                </Text>

                {/* Short Introduction */}
                <Text
                    position={[0, 0.08, 0.02]}
                    fontSize={0.092}
                    font={CABIN_SKETCH_URL}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.90}
                    lineHeight={1.35}
                    textAlign="center"
                >
                    Crafting user-centered digital products, intuitive UX flows &amp; responsive design systems.
                </Text>

                {/* Action Buttons Row */}
                <group position={[0, -0.26, 0.02]}>
                    {/* BUTTON 1: PROJECTS */}
                    <group
                        position={[-0.66, 0, 0]}
                        onPointerOver={() => handlePointerOver('projects')}
                        onPointerOut={handlePointerOut}
                        onClick={(e) => {
                            e.stopPropagation();
                            teleportTo?.('gallery');
                        }}
                    >
                        <mesh>
                            <planeGeometry args={[0.56, 0.19]} />
                            <meshBasicMaterial
                                color={hoveredBtn === 'projects' ? '#ffffff' : '#f8fafc'}
                                map={buttonTexture}
                                transparent
                                alphaTest={0.05}
                            />
                        </mesh>
                        <Text
                            position={[0, 0, 0.02]}
                            fontSize={0.062}
                            font={CABIN_SKETCH_BOLD_URL}
                            color={hoveredBtn === 'projects' ? '#2563eb' : '#0f172a'}
                            anchorX="center"
                            anchorY="middle"
                        >
                            PROJECTS ↗
                        </Text>
                    </group>

                    {/* BUTTON 2: RESUME (PDF) */}
                    <group
                        position={[0, 0, 0]}
                        onPointerOver={() => handlePointerOver('resume')}
                        onPointerOut={handlePointerOut}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open('/resume.pdf', '_blank');
                        }}
                    >
                        <mesh>
                            <planeGeometry args={[0.62, 0.19]} />
                            <meshBasicMaterial
                                color={hoveredBtn === 'resume' ? '#ffffff' : '#f8fafc'}
                                map={buttonTexture}
                                transparent
                                alphaTest={0.05}
                            />
                        </mesh>
                        <Text
                            position={[0, 0, 0.02]}
                            fontSize={0.062}
                            font={CABIN_SKETCH_BOLD_URL}
                            color={hoveredBtn === 'resume' ? '#16a34a' : '#0f172a'}
                            anchorX="center"
                            anchorY="middle"
                        >
                            RESUME (PDF) ↗
                        </Text>
                    </group>

                    {/* BUTTON 3: CONTACT */}
                    <group
                        position={[0.66, 0, 0]}
                        onPointerOver={() => handlePointerOver('contact')}
                        onPointerOut={handlePointerOut}
                        onClick={(e) => {
                            e.stopPropagation();
                            teleportTo?.('contact');
                        }}
                    >
                        <mesh>
                            <planeGeometry args={[0.56, 0.19]} />
                            <meshBasicMaterial
                                color={hoveredBtn === 'contact' ? '#ffffff' : '#f8fafc'}
                                map={buttonTexture}
                                transparent
                                alphaTest={0.05}
                            />
                        </mesh>
                        <Text
                            position={[0, 0, 0.02]}
                            fontSize={0.062}
                            font={CABIN_SKETCH_BOLD_URL}
                            color={hoveredBtn === 'contact' ? '#d97706' : '#0f172a'}
                            anchorX="center"
                            anchorY="middle"
                        >
                            CONTACT ↗
                        </Text>
                    </group>
                </group>
            </group>

            {/* ============================================================== */}
            {/* 3. DECORATIVE ELEMENTS                                         */}
            {/* ============================================================== */}
            <SmallStar position={[-1.25, 0.82, 0.01]} scale={0.06} />
            <SmallStar position={[1.25, 0.80, 0.01]} scale={0.05} />
            <SmallStar position={[-0.95, -0.48, 0.01]} scale={0.04} />
            <SmallStar position={[0.95, -0.48, 0.01]} scale={0.04} />

            {/* ============================================================== */}
            {/* 4. LIGHTBOX MODAL (HIGH-RES ENLARGED PHOTO POPUP)              */}
            {/* ============================================================== */}
            {activePhoto && (
                <Html
                    fullscreen
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 999999,
                        pointerEvents: 'auto',
                    }}
                >
                    <PhotoLightbox photo={activePhoto} onClose={handleClosePhoto} />
                </Html>
            )}
        </group>
    );
};

/**
 * Small decorative sketch star
 */
const SmallStar = ({ position, scale = 0.1 }) => {
    return (
        <group position={position} scale={scale}>
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
                    <planeGeometry args={[1, 0.12]} />
                    <meshBasicMaterial color="#334155" transparent opacity={0.6} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    );
};

/**
 * Lightbox Modal for displaying high-resolution personal photos in a centered popup
 */
const PhotoLightbox = ({ photo, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!photo) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(10, 15, 26, 0.82)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '24px',
                animation: 'photoLightboxFadeIn 0.22s ease-out forwards',
                userSelect: 'none',
            }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        >
            <style>{`
                @keyframes photoLightboxFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes photoLightboxZoomIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>

            {/* Centered Image Card Frame */}
            <div
                style={{
                    position: 'relative',
                    maxWidth: 'min(92vw, 920px)',
                    maxHeight: 'min(86vh, 840px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    padding: '14px 14px 18px 14px',
                    borderRadius: '16px',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                    animation: 'photoLightboxZoomIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    cursor: 'default',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Clearly visible Close (X) button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close enlarged photo"
                    style={{
                        position: 'absolute',
                        top: '-14px',
                        right: '-14px',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        border: '2.5px solid #ffffff',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        lineHeight: 1,
                        transition: 'transform 0.15s ease, background-color 0.15s ease',
                        zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.12)';
                        e.currentTarget.style.backgroundColor = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = '#0f172a';
                    }}
                >
                    ✕
                </button>

                {/* High-Resolution Centered Image */}
                <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{
                        maxWidth: 'min(88vw, 880px)',
                        maxHeight: 'min(76vh, 740px)',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        display: 'block',
                    }}
                />

                {/* Subtitle / Caption */}
                {photo.alt && (
                    <div
                        style={{
                            marginTop: '12px',
                            fontFamily: '"Cabin Sketch", cursive, sans-serif',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#1e293b',
                            textAlign: 'center',
                            letterSpacing: '0.5px',
                        }}
                    >
                        {photo.alt}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroText;
