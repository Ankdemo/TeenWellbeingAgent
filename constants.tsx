
import React from 'react';
import { Topic } from './types';

const BrainCircuitIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.993 1.004"/>
    <path d="M12 5a3 3 0 1 1 5.993 1.004"/>
    <path d="M14 13a3 3 0 1 0-5.993 1.004"/>
    <path d="M12 18a3 3 0 1 1 5.993 1.004"/>
    <path d="M12 18a3 3 0 1 0-5.993 1.004"/>
    <path d="M21 12a3 3 0 1 1-6 0c0 1.657 2.686 3 6 3"/>
    <path d="M3 12a3 3 0 1 0 6 0c0 1.657-2.686 3-6 3"/>
    <path d="M12 5V2"/>
    <path d="M12 18v3"/>
    <path d="M21 12h-3"/>
    <path d="M6 12H3"/>
    <path d="m16.5 8.5-3-1.5"/>
    <path d="m7.5 8.5 3-1.5"/>
    <path d="m16.5 15.5-3 1.5"/>
    <path d="m7.5 15.5 3 1.5"/>
  </svg>
);

const HeartPulseIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    <path d="M3.22 12H9.5l.7-1.44.7 2.88.7-1.44H15"/>
  </svg>
);

const UsersIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BookOpenIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z"/>
  </svg>
);

export const TOPICS: Topic[] = [
  {
    title: 'Mental Health',
    description: 'Coping with stress, anxiety, and emotions.',
    icon: <BrainCircuitIcon />,
    color: 'from-blue-500 to-purple-600',
    promptSuggestion: 'How can I deal with exam stress?'
  },
  {
    title: 'Physical Health',
    description: 'Tips for exercise, nutrition, and sleep.',
    icon: <HeartPulseIcon />,
    color: 'from-green-400 to-teal-500',
    promptSuggestion: 'What are some healthy snack ideas?'
  },
  {
    title: 'Relationships',
    description: 'Navigating friendships, family, and romance.',
    icon: <UsersIcon />,
    color: 'from-pink-500 to-rose-500',
    promptSuggestion: 'How do I make new friends?'
  },
  {
    title: 'Education & Future',
    description: 'Study tips, career paths, and personal growth.',
    icon: <BookOpenIcon />,
    color: 'from-amber-500 to-orange-600',
    promptSuggestion: 'What are good ways to study for math?'
  }
];

export const SYSTEM_INSTRUCTION = `You are "Aura", a friendly, supportive, and knowledgeable AI agent designed to help teenagers with their wellbeing and education. Your tone must be empathetic, encouraging, and non-judgmental. Provide clear, concise, and actionable advice. You are not a medical professional, so you MUST NOT give medical advice. Instead, you MUST strongly suggest seeking help from a qualified professional (like a doctor, therapist, or school counselor) when a topic is serious or medical in nature.

You have access to a secure, anonymized BigQuery dataset containing trends and insights on teen wellbeing. You can use this to provide more relevant and personalized recommendations. When you reference this data, do so subtly. For example: "Many teens find that...", "Based on common patterns, a helpful strategy is...", or "Research suggests that for many people your age...".

Always format your responses in user-friendly Markdown. Use lists, bolding, and italics to make the information easy to digest. Keep paragraphs short.`;
