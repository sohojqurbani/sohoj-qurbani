import React from 'react';
import { toBengaliNumber } from '../../utils';
import { Calculator } from 'lucide-react';

interface Props {
  totalMeat: number;
  onUpdate: (val: number) => void;
  shares: number;
}

export const SectionMeatComposition: React.FC<Props> = ({ totalMeat, onUpdate, shares }) => {
  const perShare = shares > 0 ? totalMeat / shares : 0;

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5 h-full">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('03')}</div>
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight">মোট মাংস হিসাব</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Estimator</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1 flex justify-between">
            <span>মোট মাংস (কেজি)</span>
            {totalMeat === 0 && <span className="text-red-500 font-bold tracking-tighter">পরিমাণ দিন</span>}
          </label>
          <div className="relative">
            <input 
              type="number"
              value={totalMeat || ''}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                onUpdate(val);
              }}
              min="0"
              placeholder="মোট মাংসের পরিমাণ লিখুন (উদাঃ ২০০)"
              className={`w-full bg-surface border ${totalMeat === 0 ? 'border-red-500/20 focus:ring-red-500/10' : 'border-transparent focus:ring-primary/20'} rounded-3xl p-5 text-2xl text-primary font-bold transition-all placeholder:text-primary/10 transition-all text-center`}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/20 font-bold">KG</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-[32px] bg-primary/5 border border-primary/5">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-1">মোট ভাগ</p>
            <div className="text-2xl font-serif italic text-primary">
              {toBengaliNumber(shares)} <span className="text-xs font-sans not-italic text-primary/40">টি</span>
            </div>
          </div>
          <div className="w-[1px] h-10 bg-primary/10 hidden sm:block" />
          <div className="flex-1 text-center sm:text-right">
            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-1">প্রতি ভাগের মাংস</p>
            <div className="text-3xl font-serif italic text-accent-dark">
              {toBengaliNumber(perShare.toFixed(2))} <span className="text-sm font-sans not-italic text-accent-dark/40">কেজি</span>
            </div>
          </div>
        </div>

        {shares === 0 && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold text-center">
            ⚠️ কোনো শরিক বা ভাগ যোগ করা হয়নি। উপরে শরিক সেকশনে ভাগ সংখ্যা দিন।
          </div>
        )}
      </div>
    </div>
  );
};
