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
          {/* Base Background Gradient */}
          <div className="absolute inset-0 bg-[#064e3b] z-0" />
          
          {/* Festive Background Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1596193810451-641846ef3209?q=80&w=2000&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Environmental Overlay for Vibrancy */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/80 z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(6,78,59,0.5)_100%)] z-0" />
          <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] z-0" />

          {/* Morning Sunlight "God Rays" */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute -top-20 -right-20 w-[1000px] h-[1000px] bg-[conic-gradient(from_220deg_at_top_right,rgba(212,255,63,0.15)_0%,transparent_20%,rgba(212,255,63,0.05)_40%,transparent_60%)] blur-3xl opacity-60"
            />
          </div>

          {/* 2026 Watermark */}
          <div className="absolute bottom-10 right-12 opacity-[0.03] select-none pointer-events-none z-0">
            <span className="text-8xl md:text-[12rem] font-serif font-black text-white italic tracking-tighter">
              2026
            </span>
          </div>

          {/* Large Background Typography (Subtle) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.015 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          >
            <span className="text-[30vw] font-serif font-bold whitespace-nowrap text-white select-none tracking-tight leading-none">
              EID·UL·AZHA
            </span>
          </motion.div>

          {/* Mosque Silhouettes at the bottom */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0 opacity-20 transform translate-y-1">
            <svg viewBox="0 0 1000 120" className="w-full h-auto fill-primary/40 preserve-3d">
              <path d="M0 120 V100 C50 100 80 80 100 80 C120 80 150 100 200 100 H300 C320 100 340 60 400 60 C460 60 480 100 500 100 C520 100 540 60 600 60 C660 60 680 100 700 100 H800 C850 100 880 80 900 80 C920 80 950 100 1000 100 V120 H0Z" />
              {/* Central Dome Silhouette */}
              <path d="M450 100 A50 50 0 0 1 550 100 Z" className="fill-primary/60" />
              <path d="M495 50 V45 H505 V50 Z" className="fill-accent/20" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
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
              className="text-5xl md:text-8xl font-serif text-white leading-[1] mb-8"
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
