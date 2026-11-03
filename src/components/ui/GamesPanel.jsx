import React, { useEffect } from 'react';
import '../../styles/GamesPanel.scss';

const GamesPanel = ({ isOpen, onClose }) => {
    // Escape key listener to close panel
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <div
            className={`games-panel ${isOpen ? 'open' : ''}`}
            inert={!isOpen ? true : undefined}
            role="dialog"
            aria-label="Games"
        >
            <div className="games-card">
                {/* Header */}
                <div className="games-header">
                    <h3>GAMES</h3>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close games"
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body Content */}
                <div className="games-body">
                    {/* Hand-drawn sketch gamepad illustration */}
                    <div className="games-illustration" aria-hidden="true">
                        <svg viewBox="0 0 90 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Controller Outline (sketch wavy line) */}
                            <path
                                d="M22 10 C14 10 7 16 7 26 C7 36 12 48 18 48 C23 48 27 42 32 37 C39 34 51 34 58 37 C63 42 67 48 72 48 C78 48 83 36 83 26 C83 16 76 10 68 10 C58 9 52 14 45 14 C38 14 32 9 22 10 Z"
                                stroke="#1e293b"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="#ffffff"
                            />
                            {/* D-Pad cross */}
                            <path
                                d="M21 21 L27 21 M24 18 L24 24"
                                stroke="#1e293b"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            {/* Action Buttons */}
                            <circle cx="65" cy="19" r="2.2" fill="#ef4444" stroke="#1e293b" strokeWidth="1" />
                            <circle cx="71" cy="24" r="2.2" fill="#3b82f6" stroke="#1e293b" strokeWidth="1" />
                            <circle cx="59" cy="24" r="2.2" fill="#10b981" stroke="#1e293b" strokeWidth="1" />
                            <circle cx="65" cy="29" r="2.2" fill="#f59e0b" stroke="#1e293b" strokeWidth="1" />
                            {/* Center Thumbstick / Buttons */}
                            <ellipse cx="38" cy="27" rx="3" ry="2" stroke="#64748b" strokeWidth="1.2" fill="#f1f5f9" />
                            <ellipse cx="52" cy="27" rx="3" ry="2" stroke="#64748b" strokeWidth="1.2" fill="#f1f5f9" />
                            {/* Small sketch sparkle accents */}
                            <path d="M10 8 L12 6 M78 6 L80 8 M45 6 L45 9" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>

                    <h4 className="games-title">🎮 More Fun Coming Soon!</h4>
                    <p className="games-message">
                        "I'm working on something exciting. Stay tuned!"
                    </p>

                    <div className="games-badge">
                        <span>✨ Mini-games in development</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamesPanel;

