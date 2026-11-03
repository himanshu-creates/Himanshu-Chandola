import { useRef, useState, useCallback, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import './ContactIslandForm.css';

// SVG Icons matching the hand-drawn sketch style of Image 2
const UserIcon = () => (
    <svg className="contact-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const MailIcon = () => (
    <svg className="contact-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const TagIcon = () => (
    <svg className="contact-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <circle cx="7" cy="7" r="1.5" />
    </svg>
);

const ChatIcon = () => (
    <svg className="contact-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="16" cy="10" r="1" fill="currentColor" />
    </svg>
);

const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

// Target recipient email
const RECIPIENT_EMAIL = 'himanshuchandola.design@gmail.com';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

const ContactIslandForm = ({ position = [4.5, 0.65, -7.5], isMobile = false }) => {
    const groupRef = useRef();
    const meshRef = useRef();

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // Status states
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: string }

    // Texture
    const texture = useTexture('/textures/contact/contact_island_scroll.webp');
    texture.colorSpace = THREE.SRGBColorSpace;

    // Aspect: 840 / 1080 = 0.7778
    const islandHeight = isMobile ? 4.2 : 4.9;
    const islandWidth = islandHeight * (840 / 1080);

    // Floating bobbing motion on the ocean waves
    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        const bob = Math.sin(time * 0.75 + 1.2) * 0.08;
        const tilt = Math.sin(time * 0.5 + 0.8) * 0.012;
        groupRef.current.position.y = position[1] + bob;
        groupRef.current.rotation.z = tilt;
    });

    const validate = () => {
        const errs = {};
        if (!name.trim()) errs.name = 'Name required';
        if (!email.trim()) {
            errs.email = 'Email required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errs.email = 'Invalid email';
        }
        if (!subject.trim()) errs.subject = 'Subject required';
        if (!message.trim()) errs.message = 'Message required';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setStatusMessage(null);

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            if (WEB3FORMS_KEY) {
                // Background email submission via Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_KEY,
                        from_name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                });

                const result = await response.json();
                if (result.success) {
                    setStatusMessage({ type: 'success', text: '✓ Message sent! Thank you.' });
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    setErrors({});
                } else {
                    throw new Error(result.message || 'Failed to send');
                }
            } else {
                // Graceful client-side mailto fallback if no API key is yet configured
                const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `Hi Himanshu,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                )}`;
                window.open(mailtoUrl, '_blank');
                setStatusMessage({
                    type: 'success',
                    text: '✓ Opening email client to send to ' + RECIPIENT_EMAIL
                });
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
                setErrors({});
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: 'Failed to send. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }, [name, email, subject, message]);

    return (
        <group ref={groupRef} position={position}>
            {/* 3D Island & Scroll Illustration */}
            <mesh ref={meshRef}>
                <planeGeometry args={[islandWidth, islandHeight]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Interactive HTML Form Layer */}
            <Html
                transform
                position={[0, -0.06, 0.03]}
                distanceFactor={5.9}
                style={{
                    pointerEvents: 'auto',
                    userSelect: 'text'
                }}
            >
                <form className="contact-island-form-container" onSubmit={handleSubmit}>
                    {/* 1. Name */}
                    <div className={`contact-field-group ${errors.name ? 'has-error' : ''}`}>
                        <UserIcon />
                        <input
                            type="text"
                            className="contact-field-input"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                            }}
                        />
                    </div>

                    {/* 2. Email Address */}
                    <div className={`contact-field-group ${errors.email ? 'has-error' : ''}`}>
                        <MailIcon />
                        <input
                            type="email"
                            className="contact-field-input"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                            }}
                        />
                    </div>

                    {/* 3. Subject */}
                    <div className={`contact-field-group ${errors.subject ? 'has-error' : ''}`}>
                        <TagIcon />
                        <input
                            type="text"
                            className="contact-field-input"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                                if (errors.subject) setErrors(prev => ({ ...prev, subject: null }));
                            }}
                        />
                    </div>

                    {/* 4. Message */}
                    <div className={`contact-field-group contact-textarea-group ${errors.message ? 'has-error' : ''}`}>
                        <ChatIcon />
                        <textarea
                            className="contact-field-textarea"
                            placeholder="Your Message..."
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                if (errors.message) setErrors(prev => ({ ...prev, message: null }));
                            }}
                        />
                    </div>

                    {/* 5. Send Message Button */}
                    <div className="contact-send-btn-wrap">
                        <span className="contact-btn-ray">\\</span>
                        <button
                            type="submit"
                            className="contact-send-btn"
                            disabled={isSubmitting}
                        >
                            <SendIcon />
                            <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                        </button>
                        <span className="contact-btn-ray">/</span>
                    </div>

                    {/* Status Feedback */}
                    {statusMessage && (
                        <div className={`contact-status-msg ${statusMessage.type}`}>
                            {statusMessage.text}
                        </div>
                    )}
                </form>
            </Html>
        </group>
    );
};

export default ContactIslandForm;

