/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScaleIcon, CowIcon } from './Icons';
import { toBengaliNumber } from '../utils';

interface LiveWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveWeightModal: React.FC<LiveWeightModalProps> = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState<number>(0);
  const [rate, setRate] = useState<number>(42);

  const meatWeight = (weight * rate) / 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-primary/20 backdrop-blur-md z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="bg-surface w-full max-w-lg rounded-t-[40px] sm:rounded-[48px] px-8 pt-10 pb-12 shadow-2xl relative overflow-hidden h-[90vh] sm:h-auto overflow-y-auto"
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-primary/5 flex justify-center">
            <div className="w-12 h-1.5 bg-primary/20 rounded-full mt-3" />
          </div>
          
          <div className="flex items-center gap-4 mb-10">
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary/40 hover:text-primary shadow-soft transition-all shrink-0"
              title="Back"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                <ScaleIcon className="w-5 h-5 text-accent-dark" />
              </div>
              লাইভ ওজন ক্যালকুলেটর
            </h2>
          </div>

          <div className="space-y-10">
            <div className="p-10 rounded-[40px] bg-white border border-primary/5 shadow-soft text-center group transition-all hover:shadow-xl">
              <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary/30 mb-4 italic">
                পশুর জীবন্ত ওজন (কেজি)
              </label>
              <input
                type="number"
                className="w-full bg-transparent border-none p-0 text-5xl font-serif italic text-primary text-center focus:outline-none"
                value={weight || ''}
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value));
                  setWeight(val);
                }}
                min="0"
                placeholder="০"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">মাংসের হার</label>
                <div className="bg-primary text-accent px-5 py-2 rounded-full text-xs font-bold shadow-lg">
                  হার: {toBengaliNumber(rate)}%
                </div>
              </div>
              <input
                type="range"
                min="38"
                max="48"
                step="1"
                className="w-full h-2 bg-primary/5 rounded-lg appearance-none cursor-pointer accent-accent"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-primary/30 font-bold mt-4 px-1 tracking-wider uppercase">
                <span>{toBengaliNumber(38)}%</span>
                <span>{toBengaliNumber(48)}%</span>
              </div>
            </div>

            <div className="bg-primary p-10 rounded-[40px] text-center shadow-xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
              <div className="relative z-10 text-xs font-bold text-white/50 uppercase tracking-[0.3em] mb-3 italic">আনুমানিক মাংস</div>
              <div className="relative z-10 text-5xl font-serif italic text-white">{toBengaliNumber(meatWeight.toFixed(1))} <span className="text-lg not-italic text-accent ml-2 uppercase tracking-wide">কেজি</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '৭ ভাগে প্রতি ভাগ', val: meatWeight / 7 },
                { label: '৪ ভাগে প্রতি ভাগ', val: meatWeight / 4 }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/50 border border-primary/5 p-6 rounded-[32px] text-center shadow-soft">
                  <div className="text-[10px] text-primary/30 font-bold uppercase tracking-widest mb-2">{item.label}</div>
                  <div className="text-xl font-serif italic text-primary">{toBengaliNumber(item.val.toFixed(1))} কেজি</div>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full bg-primary text-white font-bold py-5 rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]"
            >
              হিসাবটি ব্যবহার করুন
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
