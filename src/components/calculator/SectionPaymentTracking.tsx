/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Payment, Shareholder } from '../../types';
import { toBengaliNumber } from '../../utils';
import { HandCoins, User, CreditCard, NotebookPen, Smartphone, Building, Banknote } from 'lucide-react';

interface SectionPaymentTrackingProps {
  shareholders: Shareholder[];
  totalCost: number;
  payments: Record<string, Payment>;
  onPaymentUpdate: (id: string, amount: number, method?: string, note?: string) => void;
}

const getMethodConfig = (method?: string) => {
  switch (method) {
    case 'Bkash':
      return { label: 'বিকাশ', color: 'bg-[#d12053]', textColor: 'text-white', icon: <Smartphone size={12} /> };
    case 'Nagad':
      return { label: 'নগদ', color: 'bg-[#f7941d]', textColor: 'text-white', icon: <Smartphone size={12} /> };
    case 'Bank Transfer':
      return { label: 'ব্যাংক', color: 'bg-blue-600', textColor: 'text-white', icon: <Building size={12} /> };
    case 'Mobile Banking':
      return { label: 'মোবাইল', color: 'bg-purple-600', textColor: 'text-white', icon: <Smartphone size={12} /> };
    case 'Cash':
    default:
      return { label: 'নগদ', color: 'bg-green-600', textColor: 'text-white', icon: <Banknote size={12} /> };
  }
};

export const SectionPaymentTracking: React.FC<SectionPaymentTrackingProps> = ({
  shareholders,
  totalCost,
  payments,
  onPaymentUpdate
}) => {
  const totalShares = shareholders.reduce((acc, s) => acc + (s.shares || 0), 0);
  const costPerShare = totalShares > 0 ? totalCost / totalShares : 0;

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('05')}</div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-tight">টাকা লেনদেন ট্র্যাকিং</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Payments</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-primary/5 p-4 rounded-2xl border-l-4 border-accent">
          <p className="text-sm font-medium text-primary/80 italic font-serif">👉 “কে কত টাকা দিয়েছে এবং কার কত বাকি”</p>
        </div>

        <div className="space-y-3">
          {shareholders.map((person) => {
            const personCost = (person.shares || 0) * costPerShare;
            const payment = payments[person.id] || { amount: 0, method: 'Cash' };
            const paid = payment.amount || 0;
            const due = Math.max(0, personCost - paid);
            const methodConfig = getMethodConfig(payment.method);

            return (
              <div key={person.id} className="p-5 rounded-[32px] bg-white border border-primary/5 shadow-sm transition-all hover:shadow-md hover:border-primary/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary/40">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{person.name || 'অপরিচিত শরিক'}</h4>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-primary/30">অংশ: {toBengaliNumber(person.shares)} টি • ব্যয়: {toBengaliNumber(Math.round(personCost))} ৳</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${methodConfig.color} ${methodConfig.textColor} shadow-sm transition-all duration-300`}>
                    {methodConfig.icon}
                    <span className="text-[9px] font-black uppercase tracking-wider">{methodConfig.label}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="space-y-1.5 bg-surface/50 p-3 rounded-2xl">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-primary/60">দিয়েছে</label>
                    <div className="flex items-center gap-2">
                       <input
                         type="number"
                         value={paid || ''}
                         onChange={(e) => {
                           const val = Math.max(0, parseFloat(e.target.value) || 0);
                           onPaymentUpdate(person.id, val);
                         }}
                         min="0"
                         placeholder="0"
                         className="w-full bg-transparent border-none p-0 focus:ring-0 text-lg font-black text-primary placeholder:text-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                       />
                       <span className="text-[10px] font-bold text-primary/20 uppercase">৳</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-red-50/30 p-3 rounded-2xl border border-red-100/50">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-red-400">বাকি</label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-red-500">{toBengaliNumber(Math.round(due))}</span>
                      <span className="text-[10px] font-bold text-red-200 uppercase">৳</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-hover:text-primary transition-colors">
                      <CreditCard size={14} />
                    </div>
                    <select
                      value={payment.method || 'Cash'}
                      onChange={(e) => onPaymentUpdate(person.id, paid, e.target.value)}
                      className="w-full bg-surface/50 border-none rounded-2xl py-3 pl-9 pr-3 text-[11px] font-bold text-primary focus:ring-1 focus:ring-primary/10 transition-all appearance-none cursor-pointer hover:bg-surface"
                    >
                      <option value="Cash">নগদ (Cash)</option>
                      <option value="Bkash">বিকাশ (Bkash)</option>
                      <option value="Nagad">নগদ (Nagad)</option>
                      <option value="Bank Transfer">ব্যাংক ট্রান্সফার (Bank)</option>
                      <option value="Mobile Banking">অন্যান্য মোবাইল ব্যাংকিং</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/20">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/20 group-hover:text-primary transition-colors">
                      <NotebookPen size={14} />
                    </div>
                    <input
                      type="text"
                      value={payment.note || ''}
                      onChange={(e) => onPaymentUpdate(person.id, paid, undefined, e.target.value)}
                      placeholder="পেমেন্ট নোট লিখুন..."
                      className="w-full bg-surface/50 border-none rounded-2xl py-3 pl-9 pr-3 text-[11px] font-bold text-primary focus:ring-1 focus:ring-primary/10 transition-all placeholder:text-primary/20 hover:bg-surface"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-primary/5 flex items-center justify-center gap-2 opacity-30">
          <HandCoins size={14} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">স্বচ্ছ লেনদেন বরকতের চাবিকাঠি</span>
        </div>
      </div>
    </div>
  );
};
