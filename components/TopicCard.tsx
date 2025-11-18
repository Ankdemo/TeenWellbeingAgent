
import React from 'react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onSelect: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 h-48 overflow-hidden transition-all duration-300 hover:border-slate-500/80 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500`}
    >
      <div className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-br ${topic.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${topic.color}`}>
          {React.cloneElement(topic.icon as React.ReactElement, { className: 'w-6 h-6 text-white' })}
        </div>
      </div>
      <div className="relative z-10 text-left">
        <h3 className="font-bold text-lg text-slate-100">{topic.title}</h3>
        <p className="text-sm text-slate-400 mt-1">{topic.description}</p>
      </div>
    </button>
  );
};

export default TopicCard;
