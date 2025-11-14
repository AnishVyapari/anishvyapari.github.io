import React from 'react';

const GeminiChatbot: React.FC = () => {
  return (
    <button
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #9d4edd, #c77dff)',
        color: 'white',
        border: 'none',
        fontSize: '28px',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(157, 78, 221, 0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title="VyapariGPT"
    >
      🤖
    </button>
  );
};

export default GeminiChatbot;
