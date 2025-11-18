
import React, { useState, useEffect, useCallback } from 'react';
import { Topic, ChatMessage } from './types';
import { TOPICS } from './constants';
import { getWellbeingResponse } from './services/geminiService';
import Header from './components/Header';
import TopicCard from './components/TopicCard';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectTopic = useCallback((topic: Topic) => {
    setSelectedTopic(topic);
    setMessages([]);
    setError(null);
    setIsLoading(true);

    // Generate an initial greeting message from the AI for the selected topic
    const greetingPrompt = `Generate a warm, friendly, and short (2-3 sentences) welcome message for a teenager who wants to learn about or discuss "${topic.title}".`;
    
    getWellbeingResponse(greetingPrompt, topic.title)
      .then(response => {
        setMessages([{ role: 'model', content: response }]);
      })
      .catch(err => {
        console.error("Error fetching initial message:", err);
        setError("Sorry, I couldn't start the conversation. Please try again.");
        setMessages([{ role: 'model', content: "I'm having a little trouble connecting right now. Please check back later." }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim() || !selectedTopic) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getWellbeingResponse(userInput, selectedTopic.title);
      setMessages([...newMessages, { role: 'model', content: response }]);
    } catch (err) {
      console.error("Error fetching Gemini response:", err);
      const errorMessage = "Oops! I'm having trouble thinking of a response right now. Please try asking again in a moment.";
      setError(errorMessage);
      setMessages([...newMessages, { role: 'model', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setSelectedTopic(null);
    setMessages([]);
    setError(null);
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col p-4 md:p-8">
        {!selectedTopic ? (
          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-100">How can I help you today?</h2>
            <p className="text-center text-slate-400 mb-8">Select a topic to start our conversation.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOPICS.map((topic) => (
                <TopicCard key={topic.title} topic={topic} onSelect={() => handleSelectTopic(topic)} />
              ))}
            </div>
          </div>
        ) : (
          <ChatInterface
            topic={selectedTopic}
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onGoBack={handleGoBack}
            error={error}
          />
        )}
      </main>
    </div>
  );
};

export default App;
