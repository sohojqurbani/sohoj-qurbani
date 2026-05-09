/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { toBengaliNumber } from '../../utils';

interface SectionPackingProps {
  totalMeat: number;
  family: number;
  relative: number;
  sadaqah: number;
  weightPerPacket: number;
  onUpdate: (val: number) => void;
}

export const SectionPacking: React.FC<SectionPackingProps> = ({
  totalMeat,
  family,
  relative,
  sadaqah,
  weightPerPacket,
  onUpdate
}) => {
  const totalPackets = totalMeat / (weightPerPacket || 1);
  
  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('06')}</div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-tight">প্যাকেট হিসাব</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Packing List</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-primary/5 p-4 rounded-2xl border-l-4 border-accent">
          <p className="text-xs font-medium text-primary/80 italic font-serif">👉 “মোট মাংস থেকে নির্দিষ্ট সংখ্যক প্যাকেট করলে প্রতি প্যাকেটে কত কেজি হবে”</p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-4 block flex justify-between">
            <span>প্রতি প্যাকেটে ওজন (কেজি)</span>
            {!weightPerPacket && <span className="text-red-500 font-bold">একটি ওজন বাছুন</span>}
          </label>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {[0.5, 1, 1.5, 2].map(w => (
              <button
                key={w}
                onClick={() => onUpdate(w)}
                className={`py-4 rounded-xl text-xs font-bold border-2 transition-all ${
                  weightPerPacket === w 
                    ? 'bg-primary text-white border-primary shadow-xl scale-[1.05]' 
                    : 'bg-white/50 text-primary/40 border-primary/5 hover:border-primary/20'
                }`}
              >
                {toBengaliNumber(w)} কেজি
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {[
            { label: 'মোট প্যাকেট', val: totalPackets, highlighted: true },
            { label: 'পরিবার', val: totalPackets * family / 100 },
            { label: 'আত্মীয়', val: totalPackets * relative / 100 },
            { label: 'সদকা', val: totalPackets * sadaqah / 100 }
          ].map((item, idx) => (
            <div key={idx} className={`${item.highlighted ? 'bg-primary text-white shadow-xl' : 'bg-white/50 border-primary/5'} p-6 rounded-[32px] text-center border shadow-soft transition-all hover:bg-white`}>
              <div className={`text-[10px] ${item.highlighted ? 'text-white/60' : 'text-primary/30'} font-bold uppercase tracking-widest mb-2`}>{item.label}</div>
              <div className={`text-2xl font-serif italic ${item.highlighted ? 'text-white' : 'text-primary'}`}>{toBengaliNumber(Math.ceil(item.val))} <span className="text-[10px] not-italic opacity-40 font-sans">টি</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
