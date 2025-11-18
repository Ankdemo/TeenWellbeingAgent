
import React, { useMemo } from 'react';
import { ChatMessage as Message } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

// Simple Markdown to JSX parser
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const parsedContent = useMemo(() => {
    // Split by newlines to handle paragraphs and lists
    const blocks = text.split(/\n\s*\n/);

    return blocks.map((block, blockIndex) => {
      // Handle unordered lists
      if (block.match(/^(\s*[-*]\s.*(?:\n\s*[-*]\s.*)*)/)) {
        const listItems = block.split(/\n/).filter(line => line.trim().startsWith('*') || line.trim().startsWith('-'));
        return (
          <ul key={blockIndex} className="list-disc list-inside space-y-1 my-2">
            {listItems.map((item, itemIndex) => {
              const content = item.replace(/^\s*[-*]\s/, '');
              return <li key={itemIndex}>{formatInlineText(content)}</li>;
            })}
          </ul>
        );
      }
      
      // Handle paragraphs
      return <p key={blockIndex}>{formatInlineText(block)}</p>;
    });
  }, [text]);

  return <>{parsedContent}</>;
};

const formatInlineText = (text: string) => {
    // Escape HTML characters to prevent XSS
    const safeText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Process markdown with a safer approach
    const elements: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    const regex = /(\*\*(.*?)\*\*|_(.*?)_|\*(.*?)\*)/g;
    
    let match;
    while ((match = regex.exec(safeText)) !== null) {
        if (match.index > lastIndex) {
            elements.push(safeText.substring(lastIndex, match.index));
        }
        
        const [fullMatch, , boldContent, italicContent1, italicContent2] = match;
        const content = boldContent || italicContent1 || italicContent2;
        
        if (boldContent) {
            elements.push(<strong key={match.index}>{content}</strong>);
        } else {
            elements.push(<em key={match.index}>{content}</em>);
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < safeText.length) {
        elements.push(safeText.substring(lastIndex));
    }
    
    return elements;
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-3 ${isModel ? '' : 'flex-row-reverse'}`}>
      {isModel && (
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-3.58-8-8-8.5"/><path d="M12 2v10"/><path d="m16.24 7.76 1.77-1.77"/><path d="m16.24 16.24 1.77 1.77"/></svg>
        </div>
      )}
      <div className={`max-w-md md:max-w-lg px-4 py-3 rounded-2xl ${isModel ? 'bg-slate-700/50 rounded-tl-none' : 'bg-blue-600 rounded-tr-none'}`}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span className="text-slate-400 animate-pulse">Thinking...</span>
          </div>
        ) : (
          <div className="prose prose-invert prose-sm text-slate-200 whitespace-pre-wrap">
            <SimpleMarkdown text={message.content} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
