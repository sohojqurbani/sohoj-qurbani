import React from 'react';
import { toBengaliNumber } from '../../utils';
import { Percent } from 'lucide-react';

interface Props {
  liveWeight: number;
  meatWeight: number;
  onUpdate: (field: string, val: number) => void;
}

export const SectionYieldRatio: React.FC<Props> = ({ liveWeight, meatWeight, onUpdate }) => {
  const percentage = liveWeight > 0 ? (meatWeight / liveWeight) * 100 : 0;

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-accent-dark p-6 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('04')}</div>
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight">মাংসের হার হিসাব</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Yield Percentage Estimator</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1 flex justify-between">
              <span>মোট গরুর ওজন (কেজি)</span>
              {liveWeight === 0 && <span className="text-red-500 font-bold">?</span>}
            </label>
            <input 
              type="number"
              value={liveWeight || ''}
              onChange={(e) => {
                const val = Math.min(2000, Math.max(0, Number(e.target.value)));
                onUpdate('yieldLiveWeight', val);
              }}
              min="0"
              max="2000"
              placeholder="০"
              className={`w-full bg-surface border ${liveWeight === 0 ? 'border-red-500/20' : 'border-transparent'} rounded-2xl p-4 text-primary font-bold focus:ring-2 focus:ring-accent-dark/20 transition-all placeholder:text-primary/10`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1 flex justify-between">
              <span>প্রাপ্ত মাংসের পরিমাণ (কেজি)</span>
              {meatWeight === 0 && <span className="text-red-500 font-bold">?</span>}
            </label>
            <input 
              type="number"
              value={meatWeight || ''}
              onChange={(e) => {
                const val = Math.min(liveWeight || 2000, Math.max(0, Number(e.target.value)));
                onUpdate('yieldActualMeat', val);
              }}
              min="0"
              placeholder="০"
              className={`w-full bg-surface border ${meatWeight === 0 ? 'border-red-500/20' : 'border-transparent'} rounded-2xl p-4 text-primary font-bold focus:ring-2 focus:ring-accent-dark/20 transition-all placeholder:text-primary/10`}
            />
          </div>
        </div>

        <div className="p-6 rounded-[32px] bg-accent-dark/5 border border-accent-dark/5 text-center">
          <p className="text-[10px] font-bold text-accent-dark/60 uppercase tracking-widest mb-1">প্রাপ্ত হার (পার্সেন্টেজ)</p>
          <div className="text-4xl font-serif italic text-accent-dark">
            {toBengaliNumber(percentage.toFixed(2))}<span className="text-2xl font-sans not-italic text-accent-dark/40 ml-1">%</span>
          </div>
          <p className="mt-2 text-[10px] text-accent-dark/40 font-medium">প্রতি ১০০ কেজিতে {toBengaliNumber(percentage.toFixed(1))} কেজি মাংস</p>
        </div>
      </div>
    </div>
  );
};
