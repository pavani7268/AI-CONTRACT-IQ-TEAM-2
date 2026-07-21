import React, { useState, useRef, useEffect } from 'react';
import { HiChat, HiPaperAirplane, HiTrash, HiDocumentText, HiUser } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import { sendChatMessage } from '../services/api';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your AI contract assistant. Upload a contract and ask me anything about it!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [contractId, setContractId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      if (contractId) {
        const response = await sendChatMessage(contractId, userMessage.text);
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: response.data.reply || response.data.message || 'I\'ve analyzed your query regarding the contract.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Simulated response for demo
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            type: 'bot',
            text: 'I understand you\'re asking about the contract. To provide accurate insights, please upload a contract first using the Upload page, then I can analyze it and answer your specific questions.',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
        }, 1000);
      }
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        text: 'Chat cleared. How can I help you with your contracts?',
        timestamp: new Date(),
      },
    ]);
    toast.success('Chat cleared');
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">AI Chat Assistant</h1>
            <p className="text-secondary-400">Ask questions about your contracts</p>
          </div>
          <Button variant="ghost" size="sm" icon={HiTrash} onClick={clearChat}>
            Clear Chat
          </Button>
        </div>

        {/* Chat Container */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'bg-secondary-700/50 text-secondary-300'
                  }`}
                >
                  {message.type === 'user' ? (
                    <HiUser className="h-4 w-4" />
                  ) : (
                    <HiDocumentText className="h-4 w-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] ${
                    message.type === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary-500/20 border border-primary-500/30 text-white'
                        : 'bg-secondary-800/50 border border-secondary-700/30 text-secondary-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <span className="text-xs text-secondary-500 mt-1 block px-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-secondary-700/50 flex items-center justify-center">
                  <HiDocumentText className="h-4 w-4 text-secondary-300" />
                </div>
                <div className="bg-secondary-800/50 border border-secondary-700/30 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="typing-dot w-2 h-2 bg-secondary-400 rounded-full" />
                    <span className="typing-dot w-2 h-2 bg-secondary-400 rounded-full" />
                    <span className="typing-dot w-2 h-2 bg-secondary-400 rounded-full" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/5 p-4">
            <div className="flex items-center gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about your contract..."
                className="flex-1 bg-secondary-800/50 border border-secondary-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 resize-none transition-all"
                rows={1}
              />
              <Button
                variant="primary"
                size="md"
                icon={HiPaperAirplane}
                onClick={handleSend}
                disabled={!input.trim() || loading}
              >
                Send
              </Button>
            </div>
            <p className="text-xs text-secondary-500 mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

