import React from 'react';

const GeminiChatbot: React.FC = () => {
  return (
    <button
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)',
        color: 'white',
        border: 'none',
        fontSize: '32px',
        cursor: 'pointer',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        boxShadow: '0 6px 20px rgba(157, 78, 221, 0.6)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        padding: '0',
      }}
      title="VyapariGPT Chatbot"
      aria-label="Open AI Chatbot"
      onClick={() => {
        console.log('Chatbot button clicked!');
        // Chat functionality will be added here
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.transform = 'scale(1.15) translateY(-5px)';
        btn.style.boxShadow = '0 10px 30px rgba(157, 78, 221, 0.8)';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.transform = 'scale(1) translateY(0)';
        btn.style.boxShadow = '0 6px 20px rgba(157, 78, 221, 0.6)';
      }}
    >
      ✨
    </button>
  );
};

export default GeminiChatbot;
