
import React, { useState, useRef, useEffect } from 'react';
import { Topic, ChatMessage as Message } from '../types';
import ChatMessage from './ChatMessage';
import LoadingSpinner from './LoadingSpinner';

interface ChatInterfaceProps {
  topic: Topic;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (input: string) => void;
  onGoBack: () => void;
  error: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ topic, messages, isLoading, onSendMessage, onGoBack, error }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  const handleSuggestionClick = () => {
    setInput(topic.promptSuggestion);
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-lg">
      <div className="flex items-center p-4 border-b border-slate-700/50">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${topic.color} mr-3`}>
          {React.cloneElement(topic.icon as React.ReactElement, { className: 'w-5 h-5 text-white' })}
        </div>
        <h2 className="text-xl font-bold">{topic.title}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <ChatMessage message={{ role: 'model', content: '' }} isLoading={true} />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-700/50">
        {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
        {messages.length <= 1 && !isLoading && (
            <div className="mb-3 text-center">
                 <button 
                    onClick={handleSuggestionClick}
                    className="px-4 py-2 text-sm bg-slate-700/50 border border-slate-600 rounded-full hover:bg-slate-700 transition-colors"
                  >
                    Try: "{topic.promptSuggestion}"
                 </button>
            </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-full p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent focus:outline-none px-4 text-slate-200 placeholder-slate-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center transition-opacity disabled:opacity-50 hover:opacity-90"
          >
            {isLoading ? <LoadingSpinner /> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
