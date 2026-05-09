/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { formatCurrency, toBengaliNumber } from '../../utils';
import { Shareholder } from '../../types';
import { CowIcon } from '../Icons';

interface SectionCostsProps {
  animalPrice: number;
  butcherCost: number;
  transportCost: number;
  packagingCost: number;
  otherCost: number;
  shareholders: Shareholder[];
  onUpdate: (field: string, value: number) => void;
}

export const SectionCosts: React.FC<SectionCostsProps> = ({
  animalPrice,
  butcherCost,
  transportCost,
  packagingCost,
  otherCost,
  shareholders,
  onUpdate
}) => {
  const totalShares = shareholders.reduce((acc, s) => acc + s.shares, 0);
  const totalExpenses = animalPrice + butcherCost + transportCost + packagingCost + otherCost;
  const costPerShare = totalShares > 0 ? Math.ceil(totalExpenses / totalShares) : 0;

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('02')}</div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-tight">পশুর মূল্য ও খরচ</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Ledger</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4 relative">
        <div className="bg-primary/5 p-4 rounded-2xl border-l-4 border-accent mb-4">
          <p className="text-sm font-medium text-primary/80 italic font-serif">👉 “পশুর মূল্য এবং আনুসাঙ্গিক সকল খরচের হিসাব দিন”</p>
        </div>

        <div className="space-y-4">
          <div className={`p-5 rounded-[32px] bg-white/50 border ${animalPrice === 0 ? 'border-red-500/30 ring-1 ring-red-500/5' : 'border-primary/5 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10'} shadow-sm group hover:bg-white hover:shadow-xl transition-all`}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CowIcon className="w-4 h-4 text-accent-dark" />
                পশুর ক্রয়মূল্য (৳)
              </span>
              {animalPrice === 0 && <span className="text-red-500 font-bold uppercase text-[8px] tracking-tight">মূল্য দিতে হবে</span>}
            </label>
            <input
              type="number"
              className="w-full bg-transparent border-none p-0 text-3xl font-serif text-primary focus:outline-none placeholder:text-primary/10"
              value={animalPrice || ''}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                onUpdate('animalPrice', val);
              }}
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'কসাই খরচ (ঐচ্ছিক)', field: 'butcherCost', val: butcherCost },
              { label: 'পরিবহন (ঐচ্ছিক)', field: 'transportCost', val: transportCost },
              { label: 'প্যাকেজিং (ঐচ্ছিক)', field: 'packagingCost', val: packagingCost },
              { label: 'অন্যান্য (ঐচ্ছিক)', field: 'otherCost', val: otherCost },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-3xl bg-white/50 border border-primary/5 shadow-sm hover:bg-white hover:shadow-md transition-all focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary/30 mb-2 flex justify-between">
                  <span>{item.label}</span>
                  {item.val >= 1000000 && <span className="text-red-400">সীমা ছাড়িয়েছে</span>}
                </label>
                <input
                  type="number"
                  className="w-full bg-transparent border-none p-0 text-lg font-bold text-primary focus:outline-none"
                  value={item.val || ''}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    onUpdate(item.field, val);
                  }}
                  min="0"
                  placeholder="০"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 border-l-4 border-accent p-4 rounded-r-3xl">
          <p className="text-sm text-primary font-medium font-serif italic leading-relaxed opacity-80">"কসাইকে মাংস দিয়ে মজুরি দেওয়া যাবে না — বুখারি: ১৭১৬"</p>
        </div>

        <div className="space-y-3">
          {[
            { label: 'মোট খরচ', value: totalExpenses, primary: true },
            { label: 'প্রতি ভাগ খরচ', value: costPerShare, primary: false },
          ].map((item, idx) => (
            <div key={idx} className={`${item.primary ? 'bg-primary text-white shadow-xl py-5' : 'bg-white/50 text-primary py-3'} px-6 rounded-[32px] flex items-center justify-between group overflow-hidden relative`}>
              {item.primary && <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />}
              <div className={`relative z-10 ${item.primary ? 'text-white/60' : 'text-primary/40'} text-[10px] font-bold uppercase tracking-[0.2em]`}>{item.label}</div>
              <div className={`relative z-10 ${item.primary ? 'text-3xl' : 'text-2xl'} font-serif italic`}>{formatCurrency(item.value)}</div>
            </div>
          ))}
        </div>

        {/* Payment Status */}
        <div className="mt-6 border border-primary/5 rounded-[32px] overflow-hidden bg-white/50 shadow-soft">
          <div className="bg-white/30 p-5 text-primary font-serif font-bold text-lg border-b border-primary/5 flex items-center justify-between">
             <span>পেমেন্ট স্ট্যাটাস</span>
             <span className="text-xs font-sans tracking-widest uppercase text-primary/40">Details</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-primary/30 uppercase tracking-widest border-b border-primary/5">
                  <th className="px-6 py-4">শরিক</th>
                  <th className="px-6 py-4 text-right">মোট ভাগ</th>
                  <th className="px-6 py-4 text-right font-bold text-primary/60">মোট দেয় (৳)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {shareholders.map((s, idx) => {
                  const totalDue = s.shares * costPerShare;
                  return (
                    <tr key={s.id} className="border-b border-primary/5 last:border-0 hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary flex items-center gap-3">
                         {s.name || '...'}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-primary/40">{toBengaliNumber(s.shares)}</td>
                      <td className="px-6 py-4 text-right font-bold text-primary/60">{toBengaliNumber(totalDue)}</td>
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
