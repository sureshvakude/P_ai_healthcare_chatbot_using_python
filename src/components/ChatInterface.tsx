import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ALLOWED_TOPICS = [
  'abrasions', 'cuts', 'stings', 'splinter', 'sprains', 'strains',
  'fever', 'nasal congestion', 'cough', 'sore throat', 'gastrointestinal problems',
  'skin problems', 'abdominal pain', 'bruises', 'broken toe', 'choking',
  'wound', 'diarrhea', 'headache', 'cold', 'rash', 'snake bite',
  'animal bite', 'drowning', 'cpr', 'fracture'
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. I can provide information about first aid and basic care for:\n\n" +
        ALLOWED_TOPICS.map(topic => `• ${topic.charAt(0).toUpperCase() + topic.slice(1)}`).join('\n') +
        "\n\nPlease ask about any of these health concerns.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isHealthRelatedQuestion = (question: string): boolean => {
    const lowerQuestion = question.toLowerCase();
    return ALLOWED_TOPICS.some(topic => lowerQuestion.includes(topic));
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      try {

        if (!isHealthRelatedQuestion(inputValue)) {
          setMessages(prev => [...prev, {
            id: messages.length + 2,
            text: "I'm sorry, but I can only provide information about first aid and basic care for specific health concerns like:\n\n" +
              ALLOWED_TOPICS.map(topic => `• ${topic.charAt(0).toUpperCase() + topic.slice(1)}`).join('\n') +
              "\n\nPlease ask about one of these topics.",
            sender: 'bot',
            timestamp: new Date()
          }]);
          setIsTyping(false);
          return;
        }

        const response = await fetch('https://ai-healthcare-chatbot-using-python.onrender.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: inputValue })
        });

        const data = await response.json();
        const botMessage: Message = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages(prev => [...prev, {
          id: messages.length + 2,
          text: "Sorry, I'm having trouble responding right now. Please try again later.",
          sender: 'bot',
          timestamp: new Date()
        }]);
      } finally {
        setIsTyping(false);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-xl font-semibold">AI Health Assistant</h2>
        <p className="text-blue-100 text-sm">
          Ask me any health-related questions
        </p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? (
                  <Bot className="h-4 w-4 mr-1" />
                ) : (
                  <User className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs opacity-75">
                  {message.sender === 'user' ? 'You' : 'HealthAssist AI'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none max-w-[80%] px-4 py-2">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-1" />
                <span className="text-xs opacity-75">HealthAssist AI</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your health question..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === '' || isTyping}
            className={`px-4 py-2 bg-blue-600 text-white rounded-r-lg ${inputValue.trim() === '' || isTyping
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
              }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Note: This AI assistant provides general health information only and is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
};
