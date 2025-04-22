
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const welcomeMessages = [
  "Hello! Welcome to ChatBot Portal. How can I help you today?",
  "You can explore news, play games, or learn new things after you log in!"
];

const Index = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Display welcome message on component mount
    const timer = setTimeout(() => {
      addBotMessage(welcomeMessages[0]);
      
      setTimeout(() => {
        addBotMessage(welcomeMessages[1]);
      }, 1500);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        content,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        content,
        isUser: true,
        timestamp: new Date()
      }
    ]);
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = "I'm sorry, I can only provide more information after you log in.";
      
      if (user) {
        if (content.toLowerCase().includes('news')) {
          botResponse = "Check out our News page for the latest updates!";
        } else if (content.toLowerCase().includes('play') || content.toLowerCase().includes('game')) {
          botResponse = "You can play fun MCQ games on our Play page!";
        } else if (content.toLowerCase().includes('learn')) {
          botResponse = "Our Learn section has great resources for you to explore!";
        } else {
          botResponse = "I'm here to help! You can ask about news, games, or learning resources.";
        }
      }
      
      addBotMessage(botResponse);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Welcome to ChatBot Portal</h1>
        <p className="text-lg text-muted-foreground mb-6">Your interactive learning and gaming platform</p>
        
        {!user && (
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>

      <Card className="shadow-lg border-2 border-accent/50">
        <CardHeader>
          <CardTitle>Chat with our Bot</CardTitle>
          <CardDescription>
            Ask questions or get help navigating the portal
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[50vh] overflow-y-auto flex flex-col">
          <div className="flex-grow">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                content={msg.content}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
            {isTyping && (
              <div className="chat-message chat-message-bot animate-pulse">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-current animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter>
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Stay updated with the latest news and updates.</p>
          </CardContent>
          <CardFooter>
            {user ? (
              <Link to="/news" className="w-full">
                <Button variant="outline" className="w-full">Explore News</Button>
              </Link>
            ) : (
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">Login to Access</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Play Games</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Test your knowledge with fun MCQ games.</p>
          </CardContent>
          <CardFooter>
            {user ? (
              <Link to="/play" className="w-full">
                <Button variant="outline" className="w-full">Play Now</Button>
              </Link>
            ) : (
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">Login to Access</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore our learning resources and tutorials.</p>
          </CardContent>
          <CardFooter>
            {user ? (
              <Link to="/learn" className="w-full">
                <Button variant="outline" className="w-full">Start Learning</Button>
              </Link>
            ) : (
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">Login to Access</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
