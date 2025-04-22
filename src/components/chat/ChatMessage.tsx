
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "chat-message animate-bounce-in",
      isUser ? "chat-message-user" : "chat-message-bot"
    )}>
      <div className="flex flex-col">
        <div className="text-sm mb-1">
          {isUser ? 'You' : 'AskLegal'} • {timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;

