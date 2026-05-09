/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { toBengaliNumber } from '../../utils';
import { Scale } from 'lucide-react';

interface SectionMeatConversionProps {
  liveWeight: number;
  meatRate: number;
  onUpdate: (field: string, value: number) => void;
}

export const SectionMeatConversion: React.FC<SectionMeatConversionProps> = ({
  liveWeight,
  meatRate,
  onUpdate
}) => {
  const totalMeat = (liveWeight * meatRate) / 100;

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('07')}</div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-tight">লাইভ ওজন → মাংস রূপান্তর</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Converter</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-primary/5 p-4 rounded-2xl border-l-4 border-accent">
          <p className="text-xs font-medium text-primary/80 italic font-serif">👉 “গরুর ওজন থেকে আনুমানিক কত মাংস পাওয়া যাবে”</p>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-[32px] bg-white border ${liveWeight === 0 ? 'border-red-500/30' : 'border-primary/5'} shadow-sm transition-all`}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Scale size={14} className="text-accent" />
                পশুর ওজন (কেজি):
              </span>
              {liveWeight === 0 && <span className="text-red-500 font-bold">ওজন লিখুন</span>}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={liveWeight || ''}
                onChange={(e) => {
                  const val = Math.min(2000, Math.max(0, parseFloat(e.target.value) || 0));
                  onUpdate('liveWeight', val);
                }}
                min="0"
                max="2000"
                placeholder="0"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-3xl font-serif italic text-primary placeholder:text-primary/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-lg font-bold text-primary/20 uppercase">KG</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-4 block text-center">Conversion (%)</label>
            <div className="grid grid-cols-3 gap-3">
              {[50, 55, 60].map((rate) => (
                <button
                  key={rate}
                  onClick={() => onUpdate('meatRate', rate)}
                  className={`py-4 rounded-2xl font-serif italic transition-all border ${
                    meatRate === rate 
                      ? 'bg-primary text-white border-primary shadow-lg scale-105' 
                      : 'bg-white text-primary/40 border-primary/5 hover:border-accent hover:text-accent'
                  }`}
                >
                  {toBengaliNumber(rate)}%
                </button>
              ))}
            </div>
          </div>

          <div className="bg-primary p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">মোট মাংস:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-serif italic text-accent">{toBengaliNumber(totalMeat.toFixed(1))}</span>
                <span className="text-sm font-bold text-white/30 uppercase">KG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
