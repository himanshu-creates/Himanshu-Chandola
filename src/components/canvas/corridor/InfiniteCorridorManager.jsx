import { useState, useCallback, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import CorridorSegment, { SEGMENT_LENGTH } from './CorridorSegment';
import MountainDestination from './MountainDestination';

/**
 * Wrapper to toggle segment visibility based on camera position.
 * Massively reduces Draw Calls by hiding segments fully behind the camera.
 */
const SegmentVisibilityWrapper = ({ children, segmentIndex }) => {
    const groupRef = useRef();
    const { camera } = useThree();

    // Z bounds for this segment
    // Segment 0: Z=10 to Z=-70
    // Segment -1: Z=90 to Z=10
    const startZ = 10 - (segmentIndex * SEGMENT_LENGTH);
    const endZ = startZ - SEGMENT_LENGTH;

    useFrame(() => {
        if (!groupRef.current) return;
        const isBehindCamera = camera.position.z < endZ - 5;
        const isFarAhead = camera.position.z > startZ + 30;

        const isVisible = !(isBehindCamera || isFarAhead);

        if (groupRef.current.visible !== isVisible) {
            groupRef.current.visible = isVisible;
        }
    });

    return (
        <group ref={groupRef}>
            {children}
        </group>
    );
};

/**
 * InfiniteCorridorManager Component
 * 
 * Manages dynamic generation/removal of corridor segments.
 * Clamped at segment 0 so the final gate exits into the MountainDestination.
 */
const InfiniteCorridorManager = ({
    onDoorEnter,
    onBackToMainGate,
    hideDoorsForSegments = [], // Segments that should hide their SegmentDoors
    clipSegmentNeg1 = false, // Whether to clip segment -1 at EntranceDoors
    setCameraOverride // Function to take over camera control
}) => {
    const { camera } = useThree();
    // Segment 0 is the primary portfolio segment; segment -1 mounts dynamically for entrance buffer.
    // Segment >= 1 is disabled so the final gate at Z = -65 leads to the mountain destination.
    const [activeSegments, setActiveSegments] = useState([0]);

    // Calculate which segment the camera is in
    const getSegmentFromZ = useCallback((z) => {
        return Math.floor((10 - z) / SEGMENT_LENGTH);
    }, []);

    // Update active segments based on camera position (clamped to <= 0)
    useFrame(() => {
        const currentSegment = getSegmentFromZ(camera.position.z);

        // Render previous and current segment, never segment > 0
        const shouldBeActive = [
            currentSegment - 1,
            currentSegment,
            currentSegment + 1
        ].filter(seg => seg <= 0);

        // Check if we need to update
        const needsUpdate = shouldBeActive.some(seg => !activeSegments.includes(seg)) ||
            activeSegments.some(seg => !shouldBeActive.includes(seg));

        if (needsUpdate) {
            setActiveSegments(shouldBeActive);
        }
    });

    return (
        <group>
            {activeSegments.map((segmentIndex) => (
                <SegmentVisibilityWrapper key={`seg-wrap-${segmentIndex}`} segmentIndex={segmentIndex}>
                    <CorridorSegment
                        key={`segment-${segmentIndex}`}
                        segmentIndex={segmentIndex}
                        onDoorEnter={onDoorEnter}
                        hideSegmentDoors={hideDoorsForSegments.includes(segmentIndex)}
                        zClip={clipSegmentNeg1 && segmentIndex === -1 ? 22 : 100000}
                        setCameraOverride={setCameraOverride}
                    />
                </SegmentVisibilityWrapper>
            ))}

            {/* === FINAL EXIT DESTINATION: UTTARAKHAND MOUNTAIN ENVIRONMENT === */}
            <MountainDestination onBackToMainGate={onBackToMainGate} />
        </group>
    );
};

export default InfiniteCorridorManager;
