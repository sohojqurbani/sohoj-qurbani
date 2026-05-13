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
    <header className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] xs:w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl h-[56px] sm:h-[72px] bg-white/95 backdrop-blur-xl border border-primary/15 shadow-soft z-[1000] rounded-full flex items-center pl-1.5 pr-3 xs:pl-2 xs:pr-4 sm:px-4 md:px-8 transition-all duration-300">
      <div className="flex items-center gap-0.5 sm:gap-2">
        {(view === 'dashboard' || view === 'profile') && onBackClick && (
          <button 
            onClick={onBackClick}
            className="p-1.5 sm:p-2 rounded-full hover:bg-primary/5 text-primary transition-all group"
            title="Home"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-2 group-hover:-translate-x-1 transition-transform">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <button 
          onClick={onHomeClick}
          className="hover:opacity-80 transition-opacity text-left relative group/logo px-1.5 xs:px-2 sm:px-4 py-1 sm:py-2 rounded-2xl overflow-hidden flex items-center"
        >
          {/* Thematic Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')] mix-blend-multiply" />
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-16 sm:w-24 h-16 sm:h-24 bg-accent/10 rounded-full blur-2xl sm:blur-3xl -z-10 group-hover/logo:bg-accent/20 transition-colors" />
          
          <Logo showText size="sm" className="relative z-10" />
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-start gap-1.5 sm:gap-2 md:gap-4 ml-1.5 sm:ml-4 md:ml-0 overflow-hidden">
        <button 
          onClick={onCalculatorClick}
          className="text-primary/60 hover:text-primary text-[11px] xs:text-[12px] sm:text-[13px] md:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap bg-primary/5 px-2.5 xs:px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full hover:bg-primary/10 border border-transparent hover:border-primary/10"
        >
          হিসাব
        </button>
        <button 
          onClick={onGuidanceClick}
          className="text-primary/60 hover:text-primary text-[11px] xs:text-[12px] sm:text-[13px] md:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap bg-primary/5 px-2.5 xs:px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full hover:bg-primary/10 border border-transparent hover:border-primary/10"
        >
          গাইডলাইন
        </button>
      </div>
      
      <div className="flex items-center gap-0.5 sm:gap-3 mr-1 xs:mr-2 sm:mr-0">
        {user ? (
          <div className="flex items-center gap-0.5 sm:gap-2">
            <button 
              onClick={onProfileClick}
              className="group flex items-center gap-1 sm:gap-3 bg-primary/5 hover:bg-primary/10 transition-all px-1 xs:px-2 md:px-4 py-1 sm:py-1.5 rounded-full border border-primary/10 h-[32px] sm:h-[44px]"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-5 h-5 sm:w-8 sm:h-8 rounded-full object-cover border border-white/50" />
              ) : (
                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary/40 group-hover:text-primary transition-colors">
                  <UserIcon className="w-3 h-3 sm:w-4 h-4" />
                </div>
              )}
              <div className="hidden xs:flex lg:flex flex-col items-start overflow-hidden max-w-[40px] xs:max-w-[80px] lg:max-w-[120px] leading-tight text-left">
                <span className="text-[7px] sm:text-[10px] font-black text-primary truncate w-full">
                  {user.displayName?.split(' ')[0] || 'User'}
                </span>
              </div>
            </button>
            <button 
              onClick={onLogout}
              className="w-[32px] h-[32px] sm:w-[44px] sm:h-[44px] rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-red-50 hover:text-red-500 transition-all border border-primary/5"
              title="Logout"
            >
              <LogOut className="w-3 h-3 sm:w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-1 sm:gap-2 bg-primary text-white px-2 xs:px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[9px] xs:text-[10px] sm:text-xs font-bold hover:bg-black transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <UserIcon className="w-3 h-3 sm:w-4 h-4" />
            <span className="">লগইন</span>
          </button>
        )}
      </div>
    </header>
  );
};
