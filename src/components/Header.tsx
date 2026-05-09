/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Logo } from './Logo';

import { User } from 'firebase/auth';
import { LogOut, User as UserIcon, Calendar } from 'lucide-react';

interface HeaderProps {
  onCalculatorClick?: () => void;
  onGuidanceClick?: () => void;
  uid?: string;
  user?: User | null;
  onLogout?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onBackClick?: () => void;
  onHomeClick?: () => void;
  view?: 'home' | 'dashboard' | 'profile';
}

export const Header: React.FC<HeaderProps> = ({ 
  onCalculatorClick, 
  onGuidanceClick, 
  uid, 
  user,
  onLogout,
  onLoginClick,
  onProfileClick,
  onBackClick,
  onHomeClick,
  view
}) => {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl h-[72px] bg-white/80 backdrop-blur-xl border border-primary/15 shadow-soft z-[1000] rounded-full flex items-center px-4 md:px-8">
      <div className="flex items-center gap-2">
        {(view === 'dashboard' || view === 'profile') && onBackClick && (
          <button 
            onClick={onBackClick}
            className="p-2 rounded-full hover:bg-primary/5 text-primary transition-all group"
            title="Home"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 group-hover:-translate-x-1 transition-transform">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <button 
          onClick={onHomeClick}
          className="hover:opacity-80 transition-opacity text-left relative group/logo px-4 py-2 rounded-2xl overflow-hidden flex items-center"
        >
          {/* Thematic Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')] mix-blend-multiply" />
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-accent/10 rounded-full blur-3xl -z-10 group-hover/logo:bg-accent/20 transition-colors" />
          
          <Logo showText size="sm" className="relative z-10" />
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center gap-1 md:gap-4 ml-2 md:ml-0">
        <button 
          onClick={onCalculatorClick}
          className="text-primary/60 hover:text-primary text-[10px] md:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap bg-primary/5 px-3 md:px-5 py-2 rounded-full hover:bg-primary/10 border border-transparent hover:border-primary/10"
        >
          Calculator
        </button>
        <button 
          onClick={onGuidanceClick}
          className="text-primary/60 hover:text-primary text-[10px] md:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap bg-primary/5 px-3 md:px-5 py-2 rounded-full hover:bg-primary/10 border border-transparent hover:border-primary/10"
        >
          Islamic Guide
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={onProfileClick}
              className="group flex items-center gap-3 bg-primary/5 hover:bg-primary/10 transition-all px-2 md:px-4 py-1.5 rounded-full border border-primary/10 h-[44px]"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-white/50" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
              <div className="hidden lg:flex flex-col items-start overflow-hidden max-w-[120px] leading-tight">
                <span className="text-[10px] font-black text-primary truncate w-full">
                  {user.displayName || 'User'}
                </span>
                <span className="text-[9px] font-mono text-primary/30 truncate w-full">{user.phoneNumber}</span>
              </div>
            </button>
            <button 
              onClick={onLogout}
              className="w-[44px] h-[44px] rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-red-50 hover:text-red-500 transition-all border border-primary/5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-black transition-all shadow-md active:scale-95"
          >
            <UserIcon className="w-4 h-4" />
            Login
          </button>
        )}
      </div>
    </header>
  );
};
