/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const CowIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
    <path d="M12 7c-1.5 0-2.5.5-3.5 1.5M15.5 8.5C14.5 7.5 13.5 7 12 7" />
    <circle cx="8.5" cy="12.5" r="1" fill="currentColor" />
    <circle cx="15.5" cy="12.5" r="1" fill="currentColor" />
    <path d="M12 15s-1 .5-2 .5-2-.5-2-.5M12 15s1 .5 2 .5 2-.5 2-.5" />
    <path d="M6 5.5s-.5-1-1.5-1-2 1.5-2 1.5M18 5.5s.5-1 1.5-1 2 1.5 2 1.5" />
  </svg>
);

export const CrescentIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    <path d="M19 3v4M17 5h4" strokeWidth="1.5" />
  </svg>
);

export const ScaleIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h18" />
  </svg>
);

export const QuranIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <path d="M12 7c-1 0-2 .5-2 1s1 1 2 1 2 .5 2 1-1 1-2 1" />
    <path d="M12 3v2" />
  </svg>
);

export const MosqueIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21h18" />
    <path d="M6 21v-7a6 6 0 1 1 12 0v7" />
    <path d="M12 3v3" />
    <path d="M7 6c0-1.5 2.5-3 5-3s5 1.5 5 3" />
    <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
  </svg>
);

export const DividerIcon = ({ className = "w-32 h-6" }) => (
  <svg viewBox="0 0 200 40" fill="currentColor" className={className}>
    <rect x="0" y="19" width="80" height="2" />
    <rect x="120" y="19" width="80" height="2" />
    <path d="M100 10 L110 20 L100 30 L90 20 Z" />
    <circle cx="90" cy="20" r="2" />
    <circle cx="110" cy="20" r="2" />
  </svg>
);

export const PatternIcon = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className={className}>
    <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M10 0 L20 10 L10 20 L0 10 Z" />
      <circle cx="10" cy="10" r="1" />
    </pattern>
    <rect width="100" height="100" fill="url(#islamic-pattern)" />
  </svg>
);
