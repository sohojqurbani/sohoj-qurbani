/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shareholder } from '../../types';
import { toBengaliNumber } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionShareholdersProps {
  animalType: 'cow' | 'goat' | 'camel';
  shareholders: Shareholder[];
  onUpdate: (shareholders: Shareholder[]) => void;
  onTypeUpdate: (type: 'cow' | 'goat' | 'camel') => void;
}

export const SectionShareholders: React.FC<SectionShareholdersProps> = ({
  animalType,
  shareholders,
  onUpdate,
  onTypeUpdate
}) => {
  const [error, setError] = useState<string | null>(null);
  const maxShares = animalType === 'goat' ? 1 : 7;
  const currentTotalShares = shareholders.reduce((acc, s) => acc + s.shares, 0);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const addShareholder = () => {
    if (currentTotalShares < maxShares) {
      onUpdate([...shareholders, { id: Date.now().toString(), name: '', shares: 0, mobile: '' }]);
      setError(null);
    } else {
      setError(`দুঃখিত, এই পশুর জন্য সর্বোচ্চ ${toBengaliNumber(maxShares)}টি ভাগ বরাদ্দ করা সম্ভব।`);
    }
  };

  const removeShareholder = (id: string) => {
    onUpdate(shareholders.filter(s => s.id !== id));
  };

  const updateShareholder = (id: string, field: keyof Shareholder, value: any) => {
    onUpdate(shareholders.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('01')}</div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-tight">শরিকের তথ্য ও ভাগ</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Enrollment</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-primary/5 p-4 rounded-2xl border-l-4 border-accent">
          <p className="text-sm font-medium text-primary/80 italic font-serif">👉 “কুরবানিতে অংশ গ্রহণকারী শরিকদের নাম ও ভাগের সংখ্যা লিখুন”</p>
        </div>

        <div className="bg-primary/5 border-l-4 border-accent p-4 rounded-r-3xl">
          <p className="text-sm text-primary font-medium font-serif italic leading-relaxed opacity-80">"একটি গরুতে সর্বোচ্চ ৭ জন শরিক হতে পারবেন — সহিহ মুসলিম: ১৩১৮"</p>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-3 block">পশু নির্বাচন করুন (ভাগের সীমা)</label>
          <div className="flex gap-3">
            {(['cow', 'goat', 'camel'] as const).map(type => (
              <button
                key={type}
                onClick={() => {
                  if (type === 'goat' && currentTotalShares > 1) {
                    setError('ছাগলের ক্ষেত্রে মাত্র ১টি ভাগ সম্ভব। অনুগ্রহ করে আগে ভাগ সংখ্যা কমিয়ে ১ এ আনুন।');
                  } else if (type !== 'goat' && currentTotalShares > 7) {
                    // This case is unlikely given current max7 but good for safety
                    setError('সর্বোচ্চ ৭টি ভাগ সম্ভব। অনুগ্রহ করে ভাগ সংখ্যা কমান।');
                  } else {
                    onTypeUpdate(type);
                  }
                }}
                className={`flex-1 py-4 px-2 rounded-2xl transition-all border-2 flex flex-col items-center gap-1 ${
                  animalType === type 
                    ? 'bg-primary text-white border-primary shadow-xl scale-[1.05]' 
                    : 'bg-white/50 text-primary/40 border-primary/5 hover:border-primary/20'
                }`}
              >
                <span className="text-sm font-bold">{type === 'cow' ? 'গরু' : type === 'goat' ? 'ছাগল' : 'উট'}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${animalType === type ? 'text-accent' : 'text-primary/20'}`}>
                  {type === 'goat' ? '১ ভাগ' : 'সর্বোচ্চ ৭ ভাগ'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 mb-4"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-3">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {shareholders.map((s, idx) => (
            <motion.div 
              layout
              key={s.id} 
              className={`p-4 rounded-[28px] border transition-all ${(!s.name.trim() || s.shares === 0) ? 'border-red-200 bg-red-50/20' : 'border-primary/5 bg-white shadow-sm hover:shadow-md'}`}
            >
              <div className="flex items-center gap-2">
                {/* Index */}
                <div className="bg-primary/10 text-primary w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0">
                  {toBengaliNumber(idx + 1)}
                </div>

                {/* Name */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="শরিকের নাম"
                    className={`w-full bg-surface border-b-2 ${!s.name.trim() && s.shares > 0 ? 'border-red-400' : 'border-transparent'} focus:border-accent rounded-t-xl px-3 py-2 focus:outline-none text-primary font-bold transition-all text-sm`}
                    value={s.name}
                    onChange={(e) => updateShareholder(s.id, 'name', e.target.value)}
                  />
                  {!s.name.trim() && s.shares > 0 && (
                    <span className="absolute -bottom-3.5 left-2 text-[7px] text-red-500 font-bold uppercase">নাম দিন</span>
                  )}
                </div>

                {/* Shares */}
                <div className="relative w-16 shrink-0">
                  <input
                    type="number"
                    min="1"
                    max={maxShares}
                    placeholder="ভাগ"
                    className={`w-full bg-surface border-b-2 ${s.shares === 0 ? 'border-red-400' : 'border-transparent'} focus:border-accent rounded-t-xl px-2 py-2 focus:outline-none text-primary font-bold transition-all text-center text-sm`}
                    value={s.shares === 0 ? '' : s.shares}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const otherShares = currentTotalShares - s.shares;
                      const allowedMax = maxShares - otherShares;
                      const finalVal = Math.min(allowedMax, Math.max(0, val));
                      if (val > allowedMax) {
                        setError(`আর মাত্র ${toBengaliNumber(allowedMax)}টি ভাগ অবশিষ্ট আছে।`);
                      }
                      updateShareholder(s.id, 'shares', finalVal);
                    }}
                  />
                  <span className="absolute right-0.5 top-1/2 -translate-y-1/2 text-[6px] font-bold text-primary/20 uppercase pointer-events-none">ভাগ</span>
                </div>

                {/* Remove */}
                {shareholders.length > 1 && (
                  <button 
                    onClick={() => removeShareholder(s.id)} 
                    className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold hover:bg-red-500 hover:text-white transition-all shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-3">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

              {currentTotalShares < maxShares ? (
                <button
                  onClick={addShareholder}
                  className="w-full border-2 border-dashed border-primary/20 text-primary/80 py-4 rounded-[28px] font-bold flex items-center justify-center gap-3 bg-white hover:bg-primary hover:text-white hover:border-primary transition-all group shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary text-xl font-black group-hover:scale-110 transition-transform">+</div>
                  <span>নতুন শরিক যোগ করুন</span>
                </button>
              ) : (
                <div 
                  className="w-full bg-accent/10 text-primary py-4 rounded-[28px] font-bold flex items-center justify-center gap-3 border border-accent/20 cursor-not-allowed opacity-60"
                >
                   <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-dark" fill="none" stroke="currentColor" strokeWidth="3">
                     <polyline points="20 6 9 17 4 12" />
                   </svg>
                  {toBengaliNumber(maxShares)} ভাগ সম্পূর্ণ
                </div>
              )}

        <div className="grid grid-cols-3 gap-2 pt-4">
          {[
            { label: 'মোট শরিক', val: shareholders.length },
            { label: 'মোট ভাগ', val: currentTotalShares },
            { label: 'অবশিষ্ট', val: maxShares - currentTotalShares }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/50 border border-primary/5 p-4 rounded-3xl text-center shadow-soft">
              <div className="text-[8px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-2">{item.label}</div>
              <div className="text-2xl font-serif italic text-primary">{toBengaliNumber(item.val)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
