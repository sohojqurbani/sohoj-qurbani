/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface HeroProps {
  onCalculatorClick?: () => void;
  onGuidanceClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCalculatorClick, onGuidanceClick }) => {
  return (
    <section className="relative pt-[100px] md:pt-[120px] pb-6 md:pb-8 px-4 md:px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] md:rounded-[64px] overflow-hidden min-h-[450px] md:min-h-[650px] flex flex-col items-center justify-center text-center px-6 pb-12 md:pb-16"
        >
          {/* Base Background Gradient - Deep Emerald */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] via-[#043427] to-[#01241b] z-0" />
          
          {/* Subtle Arabesque Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px'
            }}
          />

          {/* Hanging Golden Lanterns */}
          <div className="absolute inset-x-0 top-0 h-64 z-0 flex justify-around pointer-events-none opacity-60">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                className="relative"
                style={{ height: 'fit-content', marginTop: i % 2 === 0 ? '0' : '30px' }}
              >
                <div className="w-[0.5px] h-32 bg-gradient-to-b from-transparent via-accent/30 to-accent/60 mx-auto" />
                <svg width="36" height="54" viewBox="0 0 40 60" className="drop-shadow-[0_0_8px_rgba(212,255,63,0.3)]">
                  <path d="M20 0 L25 5 H15 L20 0 Z" fill="#D4FF3F" />
                  <rect x="10" y="5" width="20" height="40" rx="4" fill="#D4FF3F" fillOpacity="0.15" stroke="#D4FF3F" strokeWidth="0.5" />
                  <circle cx="20" cy="25" r="5" fill="#D4FF3F" className="animate-pulse" />
                  <path d="M10 45 L5 55 H35 L30 45 Z" fill="#D4FF3F" fillOpacity="0.7" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Floating Crescent and Stars */}
          <div className="absolute top-16 right-16 md:top-24 md:right-24 z-0 opacity-30 pointer-events-none">
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path d="M50 10 A40 40 0 1 0 90 50 A30 30 0 1 1 50 10" fill="#D4FF3F" />
            </svg>
          </div>
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.1, 0.6, 0.1], scale: [0.7, 1.1, 0.7] }}
                transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
                className="absolute"
                style={{ top: `${Math.random() * 60}%`, left: `${Math.random() * 100}%` }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#D4FF3F" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Environmental Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,255,63,0.1)_0%,transparent_70%)] z-0" />
          
          {/* Mosque Skyline Silhouette at the bottom */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0 opacity-25">
            <svg viewBox="0 0 1000 150" className="w-full h-auto" preserveAspectRatio="none">
              <path 
                d="M0 150 V130 L50 130 L60 80 L70 130 L150 130 Q175 130 175 100 Q175 70 200 70 Q225 70 225 100 Q225 130 250 130 L350 130 L360 50 L370 130 L400 130 Q450 130 450 90 Q450 40 500 40 Q550 40 550 90 Q550 130 600 130 L630 130 L640 50 L650 130 L750 130 Q775 130 775 100 Q775 70 800 70 Q825 70 825 100 Q825 130 850 130 L940 130 L950 80 L960 130 L1000 130 V150 Z" 
                fill="#001511" 
              />
            </svg>
          </div>

          {/* Content Container with Glassmorphism */}
          <div className="relative z-10 max-w-3xl mx-auto bg-black/10 backdrop-blur-xl rounded-[32px] md:rounded-[64px] p-8 md:p-12 border border-white/5 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 md:mb-8"
            >
              <div className="text-accent text-3xl md:text-4xl font-serif mb-1">
                بسم الله الرحمن الرحيم
              </div>
              <div className="text-white/40 text-xs md:text-sm tracking-[0.2em] font-light">
                বিসমিল্লাহির রাহমানির রাহিম
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl xs:text-5xl md:text-8xl font-serif text-white leading-[1] mb-8"
            >
              সহজ <span className="italic text-accent">কুরবানি</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-xl mx-auto leading-relaxed"
            >
              সহজ কুরবানি — আপনার কুরবানির পূর্ণাঙ্গ গাইড ও নির্ভুল হিসাব রক্ষক। সঠিক বন্টন ও স্বচ্ছতা নিশ্চিত করুন।
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button 
                onClick={onCalculatorClick}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-accent text-primary font-bold hover:bg-accent-dark transition-all scale-100 hover:scale-105 active:scale-95 shadow-lg shadow-accent/10"
              >
                হিসাব শুরু করুন
              </button>
              <button 
                onClick={onGuidanceClick}
                className="w-full sm:border-accent/30 sm:w-auto px-10 py-5 rounded-full bg-white/5 text-white border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                ইসলামিক নীতিমালা
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
