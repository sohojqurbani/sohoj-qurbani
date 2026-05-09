/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "w-12 h-12", 
  showText = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: "h-10",
    md: "h-12",
    lg: "h-16",
    xl: "h-32"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${
        size === 'xl' ? 'w-32 h-32' : 
        size === 'lg' ? 'w-14 h-14' : 
        size === 'md' ? 'w-12 h-12' : 
        'w-10 h-10'
      } flex-shrink-0 bg-white/10 rounded-3xl flex items-center justify-center overflow-hidden group`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <svg viewBox="0 0 40 40" className={`${size === 'xl' ? 'w-full h-full p-4' : 'w-4/5 h-4/5'} relative z-10 fill-current`} xmlns="http://www.w3.org/2000/svg">
          {/* Mosque Dome and Minarets Icon */}
          <path d="M20 12C14.4772 12 10 16.4772 10 22V28H30V22C30 16.4772 25.5228 12 20 12Z" />
          <path d="M20 10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Left Minaret */}
          <rect x="6" y="18" width="2" height="10" rx="1" />
          <path d="M7 16L5 18H9L7 16Z" />
          {/* Right Minaret */}
          <rect x="32" y="18" width="2" height="10" rx="1" />
          <path d="M33 16L31 18H35L33 16Z" />
          {/* Door */}
          <path d="M18 28V24C18 22.8954 18.8954 22 20 22C21.1046 22 22 22.8954 22 24V28H18Z" fill="white" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col -ml-1">
          <div className={`${
            size === 'xl' ? 'text-4xl md:text-6xl' :
            size === 'lg' ? 'text-2xl md:text-4xl' : 
            size === 'md' ? 'text-xl md:text-2xl' : 
            'text-base md:text-lg'
          } font-serif font-bold leading-[0.9] tracking-tight whitespace-nowrap flex flex-col`}>
            <span>Sahaj</span>
            <span className="italic text-accent-dark">Qurbani</span>
          </div>
          <span className={`${size === 'xl' ? 'text-sm' : size === 'lg' ? 'text-xs' : 'text-[9px]'} hidden md:block tracking-tight opacity-40 font-bold mt-1 whitespace-nowrap`}>
            Your Digital Accountant
          </span>
        </div>
      )}
    </div>
  );
};
