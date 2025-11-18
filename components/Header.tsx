
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-3.58-8-8-8.5"/><path d="M12 2v10"/><path d="m16.24 7.76 1.77-1.77"/><path d="m16.24 16.24 1.77 1.77"/></svg>
        </div>
        <h1 className="text-xl font-bold text-white">Teen Wellbeing Agent</h1>
      </div>
    </header>
  );
};

export default Header;
