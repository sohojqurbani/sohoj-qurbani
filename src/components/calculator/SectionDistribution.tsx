/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shareholder } from '../../types';
import { toBengaliNumber } from '../../utils';

interface SectionDistributionProps {
  totalMeat: number;
  family: number;
  relative: number;
  sadaqah: number;
  shareholders: Shareholder[];
  onUpdate: (field: string, value: number) => void;
  onTotalMeatUpdate: (value: number) => void;
}

export const SectionDistribution: React.FC<SectionDistributionProps> = ({
  totalMeat,
  family,
  relative,
  sadaqah,
  shareholders,
  onUpdate,
  onTotalMeatUpdate
}) => {
  const totalShares = shareholders.reduce((acc, s) => acc + s.shares, 0);
  const meatPerShare = totalShares > 0 ? totalMeat / totalShares : 0;

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('08')}</div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-tight">মাংস বণ্টন হিসাব</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Analytics</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-primary/5 p-4 rounded-2xl border-l-4 border-accent">
          <p className="text-sm font-medium text-primary/80 italic font-serif">👉 “মোট মাংসের পরিমাণ দিলে তা ৩টি ভাগে বণ্টন হবে”</p>
        </div>

        <div className={`p-5 rounded-[32px] bg-white border ${totalMeat === 0 ? 'border-red-500/30' : 'border-primary/5'} shadow-sm transition-all`}>
          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-2 flex justify-between">
            <span>মাংসের মোট পরিমাণ (কেজি)</span>
            {totalMeat === 0 && <span className="text-red-500 font-bold">মাংসের পরিমাণ জরুরি</span>}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={totalMeat || ''}
              onChange={(e) => onTotalMeatUpdate(parseFloat(e.target.value) || 0)}
              placeholder="০"
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-3xl font-serif italic text-primary placeholder:text-primary/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-lg font-bold text-primary/20 uppercase">KG</span>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 mt-2 pt-4 border-t border-primary/5 px-2">
          {[
            { label: 'পরিবার', factor: 1/3, color: 'bg-primary' },
            { label: 'আত্মীয়', factor: 1/3, color: 'bg-primary/60' },
            { label: 'সদকা', factor: 1/3, color: 'bg-accent-dark' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${item.color} shadow-sm mb-0.5`} title={item.label} />
              <div className="text-lg font-serif italic text-primary">{toBengaliNumber((totalMeat * item.factor).toFixed(1))} <span className="text-[10px] font-sans text-primary/30 not-italic uppercase">KG</span></div>
            </div>
          ))}
        </div>

        <div className="mt-4 border border-primary/5 rounded-[32px] overflow-hidden bg-white shadow-soft">
          <div className="bg-primary/5 p-5 flex items-center justify-between border-b border-primary/5">
            <h4 className="text-primary font-serif font-bold text-lg">শরিকওয়াইজ বণ্টন</h4>
            <div className="bg-primary text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {toBengaliNumber(shareholders.length)} জন শরিক
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-primary/30 uppercase tracking-widest bg-surface/50">
                  <th className="px-6 py-4">শরিক ও ভাগ</th>
                  <th className="px-4 py-4 text-center">মোট মাংস</th>
                  <th className="px-4 py-4 text-center">পরিবার</th>
                  <th className="px-4 py-4 text-center">আত্মীয়</th>
                  <th className="px-4 py-4 text-center">সদকা</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {shareholders.map((s) => {
                  const shareholderTotalMeat = meatPerShare * s.shares;
                  return (
                    <tr key={s.id} className="border-t border-primary/5 hover:bg-primary/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-primary">{s.name || 'নামহীন শরিক'}</div>
                        <div className="text-[10px] text-primary/40 font-medium">ভাগ: {toBengaliNumber(s.shares)} টি</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="font-serif italic text-primary text-lg">{toBengaliNumber(shareholderTotalMeat.toFixed(1))}</div>
                        <div className="text-[9px] text-primary/30 font-sans uppercase">KG</div>
                      </td>
                      <td className="px-4 py-4 text-center text-primary/60">{toBengaliNumber((shareholderTotalMeat * (1/3)).toFixed(1))}</td>
                      <td className="px-4 py-4 text-center text-primary/60">{toBengaliNumber((shareholderTotalMeat * (1/3)).toFixed(1))}</td>
                      <td className="px-4 py-4 text-center text-accent-dark">{toBengaliNumber((shareholderTotalMeat * (1/3)).toFixed(1))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
