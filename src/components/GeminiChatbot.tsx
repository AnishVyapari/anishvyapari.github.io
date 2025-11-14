import React from 'react';
import { createPortal } from 'react-dom';

const GeminiChatbot: React.FC = () => {
  const chatbotButton = (
    <button
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'linear-gradient(135deg, #9d4edd, #c77dff)',
        color: 'white',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(157, 78, 221, 0.5)',
        transition: 'all 0.3s ease',
      }}
      title="VyapariGPT Chat"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      ✨
    </button>
  );

  return typeof document !== 'undefined'
    ? createPortal(chatbotButton, document.body)
    : null;
};

export default GeminiChatbot;
