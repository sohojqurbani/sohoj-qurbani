/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { QuranIcon, CowIcon, ScaleIcon } from './Icons';
import { Users, Calculator, PieChart, Receipt, FileText, LayoutGrid, Lock, Scale, Package, Database, Wallet, TrendingUp } from 'lucide-react';
import { toBengaliNumber } from '../utils';

interface FeaturesProps {
  onGuideClick: () => void;
  onPremiumClick: () => void;
  onLiveWeightClick: () => void;
  isUnlocked?: boolean;
}

export const Features: React.FC<FeaturesProps> = ({ onGuideClick, onPremiumClick, onLiveWeightClick, isUnlocked }) => {
  return (
    <section className="bg-white pt-4 md:pt-8 pb-6 md:pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 md:mb-5 bg-[#064e3b] p-3 md:p-5 rounded-[24px] md:rounded-[32px] border border-accent/20 shadow-2xl relative overflow-hidden min-h-[120px] md:min-h-[160px] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-40 mix-blend-soft-light">
              <img 
                src="https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=2000&auto=format&fit=crop" 
                alt="Festive Architecture" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-[#064e3b]/90 to-accent/20" />
            
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="festivePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="white" fillOpacity="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#festivePattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 blur-[80px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 blur-[80px] rounded-full" />
          </div>
          
          <div className="relative z-10 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 border-b border-white/10 pb-2 mb-2 relative">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="px-2.5 py-1 bg-white/10 rounded-full flex items-center gap-2 border border-white/10"
                  >
                    <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                    <span className="text-[8px] md:text-[10px] font-bold text-accent uppercase tracking-widest">
                      Digital Qurbani Calculator
                    </span>
                  </motion.div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[10px] md:text-xs text-accent/60 font-bold font-bengali"
                  >
                    (০৯টি ফিচার)
                  </motion.span>
                </div>
              </div>
              {!isUnlocked && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-0 right-0 md:relative md:top-auto md:right-auto flex items-center gap-2 px-3 py-1.5 bg-accent text-primary rounded-xl cursor-pointer hover:bg-white transition-all group shadow-xl shadow-accent/10 whitespace-nowrap z-20"
                  onClick={onPremiumClick}
                >
                  <Lock className="w-3 h-3 text-primary group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[7px] uppercase font-black tracking-widest opacity-60">Lifetime</span>
                    <span className="text-[10px] font-black font-bengali">মাত্র <span className="font-bengali-alt">{toBengaliNumber(19)}</span> টাকায়</span>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1 md:gap-2">
              {[
                { icon: <Users className="w-4 h-4" />, text: "শরিক" },
                { icon: <Calculator className="w-4 h-4" />, text: "খরচ" },
                { icon: <Database className="w-4 h-4" />, text: "অংশ" },
                { icon: <TrendingUp className="w-4 h-4" />, text: "রেশিও" },
                { icon: <Wallet className="w-4 h-4" />, text: "কালেকশন" },
                { icon: <Package className="w-4 h-4" />, text: "প্যাকিং" },
                { icon: <Scale className="w-4 h-4" />, text: "পরিমাপ" },
                { icon: <PieChart className="w-4 h-4" />, text: "বণ্টন" },
                { icon: <LayoutGrid className="w-4 h-4" />, text: "ম্যানুয়াল" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={onPremiumClick}
                  className="flex flex-col items-center text-center p-1.5 md:p-2 rounded-xl bg-white/5 hover:bg-white/12 border border-white/5 transition-all group cursor-pointer active:scale-95"
                >
                  <div className="mb-1 text-accent group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-[8px] md:text-[9px] font-bold text-white/80 leading-tight">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-8">
          <div className="md:col-span-12 lg:col-span-7">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-sm font-medium tracking-[0.2em] uppercase text-primary-light mb-4 mt-4"
            >
              Our Mission
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-primary leading-tight"
            >
              সবার জন্য <span className="italic text-accent">সহজ কুরবানি</span>
            </motion.h2>
          </div>
          <div className="md:col-span-12 lg:col-span-5">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary-light/60 text-lg leading-relaxed lg:max-w-md"
            >
              কুরবানি শুধু একটি পশু কোরবানি নয়, এটি তাকওয়ার বহিঃপ্রকাশ। সঠিক হিসাব ও বণ্টনের মাধ্যমে আপনার কুরবানিকে স্বচ্ছ ও সুন্দর করার লক্ষ্যেই আমাদের এই পথচলা।
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Main Action Card (First) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={onPremiumClick}
            className="md:col-span-1 bg-primary rounded-[40px] pt-8 px-8 pb-12 text-white relative overflow-hidden group cursor-pointer border border-[#064e3b]/30 h-full"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)]" />
            <div className="relative z-10 h-full flex flex-col gap-8">
              <div>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary mb-4 group-hover:rotate-45 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <h3 className="text-3xl font-serif mb-3">সকল হিসাব <span className="italic text-accent">এক ক্লিকে</span></h3>
                <p className="text-white/60 text-sm mb-2">সব শরিকের হিসাব, মাংস বণ্টন ও ব্যয়ের স্বচ্ছ হিসাব রাখুন মাত্র <span className="font-bengali-alt">{toBengaliNumber(19)}</span> টাকায়।</p>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-serif text-accent flex items-center gap-1">
                  <span>৳</span>
                  <span className="font-bengali-alt">{toBengaliNumber(19)}</span>
                </div>
                <button className="w-full py-3 rounded-full bg-accent text-primary text-sm font-bold shadow-lg shadow-accent/20">
                  {isUnlocked ? 'ড্যাশবোর্ড দেখুন' : 'প্রিমিয়াম আনলক করুন'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Left Bento Column (Principles & Weight) - Now Second */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onGuideClick}
              className="flex-1 bg-surface hover:bg-white transition-colors rounded-[32px] p-8 cursor-pointer group border border-[#064e3b]/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-primary">
                    <QuranIcon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-primary/40 uppercase group-hover:text-primary transition-colors">Guide</div>
                </div>
                <h4 className="text-2xl font-serif text-primary">ইসলামিক নীতিমালা</h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onLiveWeightClick}
              className="bg-surface hover:bg-white transition-colors rounded-[32px] p-6 cursor-pointer group border border-[#064e3b]/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <ScaleIcon className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-primary/40 uppercase group-hover:text-primary transition-colors">Utility</div>
              </div>
              <h4 className="text-xl font-serif text-primary">লাইভ ওয়েট ক্যালকুলেটর</h4>
            </motion.div>
          </div>

          {/* Stats Card (Right/Bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="md:col-span-1 bg-surface rounded-[40px] flex flex-col overflow-hidden group border border-[#064e3b]/20 shadow-soft h-full"
          >
            <div className="p-8 pb-4">
              <h3 className="text-4xl font-serif text-primary mb-1">{toBengaliNumber(5000)}+</h3>
              <p className="text-primary-light/60 text-sm font-bold">সন্তুষ্ট ব্যবহারকারী</p>
              <p className="text-primary-light/40 text-[10px] font-medium mt-1">কুরবানির সকল হিসাব করুন সঠিক নিয়মে।</p>
            </div>
            <div className="px-3 pb-3 mt-auto">
              <div className="aspect-[16/10] rounded-[32px] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500 relative">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                <Logo size="xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
