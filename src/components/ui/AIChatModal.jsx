import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const INITIAL_GREETING = {
  role: 'assistant',
  content: "Hey there! 👋 I'm Himanshu's AI clone. Ask me anything about my product design work, UX case studies (PahadGrow & Maa Dunagiri Rental), experience at Pahadi Bhula Production, or how to get in touch!"
};

const SUGGESTIONS = [
  'Tell me about your design experience',
  'What is PahadGrow?',
  'Can I see your resume?',
  'What is your design approach?',
  'How can I get in touch?'
];

// Helper to render markdown-like links as clickable anchor tags
const renderFormattedText = (text) => {
  if (!text) return null;

  // URL regex (including relative paths like /resume.pdf)
  const urlRegex = /(https?:\/\/[^\s)]+|\/resume\.pdf)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      let label = part;
      if (part.includes('resume.pdf')) label = 'Download Resume (PDF) ↗';
      else if (part.includes('linkedin.com')) label = 'LinkedIn Profile ↗';
      else if (part.includes('wa.me')) label = 'Chat on WhatsApp ↗';
      else if (part.includes('pahad-grow')) label = 'PahadGrow ↗';
      else if (part.includes('maadunagiri')) label = 'Maa Dunagiri Rental ↗';

      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: part.includes('resume.pdf') ? 'inline-block' : 'inline',
            margin: part.includes('resume.pdf') ? '4px 0' : '0',
            padding: part.includes('resume.pdf') ? '4px 10px' : '0',
            backgroundColor: part.includes('resume.pdf') ? '#f0fdf4' : 'transparent',
            borderRadius: part.includes('resume.pdf') ? '6px' : '0',
            border: part.includes('resume.pdf') ? '1px solid #86efac' : 'none',
            color: part.includes('resume.pdf') ? '#15803d' : '#2563eb',
            textDecoration: part.includes('resume.pdf') ? 'none' : 'underline',
            fontWeight: 600,
            wordBreak: 'break-all'
          }}
        >
          {label}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default function AIChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Listen to openAIChat custom event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setErrorMsg(null);
    };

    window.addEventListener('openAIChat', handleOpen);
    return () => window.removeEventListener('openAIChat', handleOpen);
  }, []);

  // Listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt || isLoading) return;

    setInputValue('');
    setErrorMsg(null);

    const userMessage = { role: 'user', content: prompt };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setErrorMsg(err.message || 'Unable to connect to AI clone backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    // If the last message was a user message, retry it
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.content);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Talk to Himanshu's AI Clone"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: '16px',
        animation: 'chatFadeIn 0.22s ease-out forwards',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
      onClick={() => setIsOpen(false)}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <style>{`
        @keyframes chatFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatDotBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Main Chat Modal Container */}
      <div
        style={{
          position: 'relative',
          width: 'min(520px, 94vw)',
          height: 'min(640px, 86vh)',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'chatSlideUp 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          cursor: 'default'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- HEADER --- */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid #f1f5f9',
            backgroundColor: '#fafaf9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative', width: '42px', height: '42px' }}>
              <img
                src="/images/profile-himanshu.webp"
                alt="Himanshu Chandola"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #059669'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  border: '2px solid #ffffff'
                }}
                title="Active"
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>
                  Himanshu Chandola
                </span>
                <span
                  style={{
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: '10px',
                    border: '1px solid #a7f3d0'
                  }}
                >
                  AI Clone
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Product Designer | UI/UX Designer
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: 'none',
              color: '#475569',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e2e8f0';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.color = '#475569';
            }}
          >
            ✕
          </button>
        </div>

        {/* --- CHAT MESSAGES SCROLL AREA --- */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            backgroundColor: '#ffffff'
          }}
        >
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  width: '100%'
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '11px 15px',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: isUser ? '#0f172a' : '#f8fafc',
                    color: isUser ? '#ffffff' : '#1e293b',
                    border: isUser ? 'none' : '1px solid #e2e8f0',
                    fontSize: '14px',
                    lineHeight: '1.55',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {renderFormattedText(msg.content)}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '10px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                    display: 'inline-block',
                    animation: 'chatDotBounce 1.2s infinite ease-in-out',
                    animationDelay: '0s'
                  }}
                />
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                    display: 'inline-block',
                    animation: 'chatDotBounce 1.2s infinite ease-in-out',
                    animationDelay: '0.2s'
                  }}
                />
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                    display: 'inline-block',
                    animation: 'chatDotBounce 1.2s infinite ease-in-out',
                    animationDelay: '0.4s'
                  }}
                />
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>
                  Himanshu is thinking...
                </span>
              </div>
            </div>
          )}

          {/* Error Message + Retry */}
          {errorMsg && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '13px',
                color: '#991b1b',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div>⚠️ {errorMsg}</div>
              <button
                type="button"
                onClick={handleRetry}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🔄 Retry Message
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* --- QUICK SUGGESTIONS (CHIPS) --- */}
        {messages.length <= 2 && (
          <div
            style={{
              padding: '6px 14px 10px 14px',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#fafaf9'
            }}
          >
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(item)}
                style={{
                  whiteSpace: 'nowrap',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '5px 11px',
                  fontSize: '12px',
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#059669';
                  e.currentTarget.style.color = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.color = '#334155';
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* --- INPUT BAR --- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{
            padding: '12px 14px',
            borderTop: '1px solid #f1f5f9',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Himanshu anything..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '11px 14px',
              borderRadius: '24px',
              border: '1.5px solid #cbd5e1',
              outline: 'none',
              fontSize: '14px',
              color: '#0f172a',
              transition: 'border-color 0.15s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#059669')}
            onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: !inputValue.trim() || isLoading ? '#94a3b8' : '#059669',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: !inputValue.trim() || isLoading ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              transition: 'background-color 0.15s ease'
            }}
            title="Send"
          >
            ➤
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

