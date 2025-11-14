import React, { useState, useRef, useEffect } from 'react';
import '../styles/GeminiChatbot.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hey! I'm VyapariGPT, Anish's AI assistant. I know everything about him - his projects, skills, education at RAIT Nerul, and his journey in AI/ML. Ask me anything!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = 'AIzaSyDulj2vD33XOetUYroTo6EvelSvafXuB8w'; // Replace with your actual Gemini API key
      

      // System prompt with all your context
      const systemPrompt = `You are VyapariGPT, the AI assistant for Anish Vyapari's portfolio website. Your job is to answer questions about Anish in a friendly, engaging way.

KEY INFORMATION ABOUT ANISH VYAPARI:

BASICS:
- Full Name: Anish Vyapari
- Age: 19 years old
- Title: AI/ML Engineer
- Education: BTech CSE - AI & ML at RAIT Nerul (Ramrao Adik Institute of Technology)
- Location: Navi Mumbai, India (19.0176°N, 73.0073°E)
- Currently: 1st Year (Started Sept 2025, Expected Graduation: 2029)
- Discord Username: @shaboings
- Email: anishvyaparionline@gmail.com
- Instagram: @anish_vyapari
- UPI: 8422936009@mbk

EDUCATION DETAILS:
- Institution: RAIT (Ramrao Adik Institute of Technology), Nerul, Navi Mumbai
- Program: BTech CSE specializing in Artificial Intelligence & Machine Learning
- Academic Timeline:
  * 1st Year: Sept 2025 - Dec 2025 (Current)
  * 2nd Year: Jan 2026 - Dec 2026
  * 3rd Year: Jan 2027 - Dec 2027
  * 4th Year: Jan 2028 - Dec 2028
  * Graduation: 2029
- Focus Areas: Deep Learning, Computer Vision
- Interests: Robotics & Automation, Edge AI & MLOps

SKILLS & TECHNOLOGIES:
- Programming: Python (primary), JavaScript, TypeScript
- AI/ML: Machine Learning, Deep Learning, TensorFlow, PyTorch, Scikit-learn, Keras, Computer Vision, NLP, Neural Networks, Transformers
- Web Development: React, Node.js, FastAPI, Flask
- Data Science: Pandas, NumPy, OpenCV
- Databases: SQL, MongoDB
- DevOps & Cloud: Git, Docker, AWS

NOTABLE PROJECTS:
1. YOLOv8 Autonomous Drone - Autonomous drone with YOLOv8 object detection for real-time aerial surveillance
2. ShadowRAT - Discord-based Remote Administration Tool for educational and security research
3. Custom LLM - GPT-style Large Language Model built from scratch using PyTorch
4. AI Network Security IDS - AI-powered network intrusion detection system
5. Autonomous SLAM Robot ROS2 - Robot with simultaneous localization and mapping
6. LectureVault - Discord bot for automated lecture recording with screen capture
7. DiscordSetupbot (ZeroLAG) - Discord server automation bot

PERSONALITY & INTERESTS:
- Tagline: "I code"
- Passionate about creating intelligent solutions that shape the future
- Active on GitHub (9 repositories, 1 follower)
- Content creator with YouTube channel 'HyperSKED'
- Hobbies: 3D printing/CAD design, Gaming (favorite game: Apex Legends)
- Entertainment: One Piece anime, Gaming
- HypeSquad: Bravery
- Available for: Collaborations and opportunities

DISCORD COMMUNITY:
- Has active Discord server: https://discord.gg/dzsKgWMgjJ
- Server focused on tech, AI/ML discussions, and collaborations

WORK STYLE:
- Hands-on approach to learning and implementation
- Strong focus on GitHub portfolio building
- Continuous deployment and testing cycles
- Heavy into troubleshooting and debugging
- Uses AI assistants for code generation and automation

INSTRUCTIONS:
- Answer questions about Anish warmly and enthusiastically
- If asked about his projects, highlight the technical skills involved
- Encourage visitors to check out his GitHub, Discord, or Instagram
- If someone wants to collaborate or support him, mention his UPI for donations
- Keep responses concise but informative (2-4 sentences max)
- Use emojis occasionally to be friendly
- If you don't know something specific, be honest and suggest checking his GitHub or Discord
- Stay in character as VyapariGPT - you're his AI assistant, not him";

      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const requestBody = {
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'Understood! I am VyapariGPT, ready to answer questions about Anish Vyapari.' }] },
          ...conversationHistory,
          { role: 'user', parts: [{ text: userMessage.content }] }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.candidates[0].content.parts[0].text;

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: botMessage }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Oops! Something went wrong. Try again or check out Anish\'s GitHub directly!'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="vyapari-gpt-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle VyapariGPT"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="vyapari-gpt-container">
          <div className="vyapari-gpt-header">
            <div className="vyapari-gpt-title">
              <span className="vyapari-gpt-icon">🤖</span>
              <div>
                <h3>VyapariGPT</h3>
                <p>Ask me about Anish!</p>
              </div>
            </div>
            <button
              className="vyapari-gpt-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="vyapari-gpt-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`vyapari-gpt-message vyapari-gpt-message-${msg.role}`}
              >
                {msg.role === 'assistant' && (
                  <span className="vyapari-gpt-avatar">🤖</span>
                )}
                <div className="vyapari-gpt-message-content">
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <span className="vyapari-gpt-avatar">👤</span>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="vyapari-gpt-message vyapari-gpt-message-assistant">
                <span className="vyapari-gpt-avatar">🤖</span>
                <div className="vyapari-gpt-message-content vyapari-gpt-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="vyapari-gpt-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
              placeholder="Ask about Anish's projects, skills..."
              className="vyapari-gpt-input"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="vyapari-gpt-send"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiChatbot;
