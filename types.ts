
import React from 'react';

export interface Topic {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  promptSuggestion: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
