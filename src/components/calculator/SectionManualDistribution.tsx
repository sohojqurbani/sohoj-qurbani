/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DistributionItem } from '../../types';
import { generateUID, toBengaliNumber } from '../../utils';
import { Plus, Trash2 } from 'lucide-react';

interface SectionManualDistributionProps {
  items: DistributionItem[];
  onUpdate: (items: DistributionItem[]) => void;
}

export const SectionManualDistribution: React.FC<SectionManualDistributionProps> = ({
  items,
  onUpdate
}) => {
  const addItem = () => {
    onUpdate([...items, { id: generateUID(), name: '', amount: 0 }]);
  };

  const updateItem = (id: string, field: keyof DistributionItem, value: any) => {
    onUpdate(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      onUpdate(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-soft overflow-hidden border border-primary/5">
      <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#064e3b_0%,#022c22_100%)] opacity-50" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">{toBengaliNumber('09')}</div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-tight">মাংস বণ্টন তালিকা</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">Custom List</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-primary/5 p-4 rounded-2xl border-l-4 border-accent">
          <p className="text-xs font-medium text-primary/80 italic font-serif">👉 “কোথায় কত মাংস দিবেন তা লিখে রাখুন”</p>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={item.id} className="flex gap-3 items-center group">
              <div className={`flex-1 grid grid-cols-2 gap-3 p-5 rounded-3xl bg-white border ${(!item.name.trim() && item.amount > 0) ? 'border-red-500/30' : 'border-primary/5'} shadow-sm transition-all hover:shadow-md hover:border-primary/10`}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-primary/30 flex justify-between">
                    <span>নাম/স্থান</span>
                    {(!item.name.trim() && item.amount > 0) && <span className="text-red-500">অবশ্যক</span>}
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="নাম লিখুন..."
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-primary placeholder:text-primary/20"
                  />
                </div>
                <div className="space-y-2 border-l border-primary/5 pl-4">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-primary/30">মাংস (কেজি)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={item.amount || ''}
                      onChange={(e) => {
                        const val = Math.max(0, parseFloat(e.target.value) || 0);
                        updateItem(item.id, 'amount', val);
                      }}
                      min="0"
                      placeholder="0"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-primary placeholder:text-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-[10px] font-bold text-primary/20 uppercase">KG</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => removeItem(item.id)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="w-full py-4 rounded-3xl border-2 border-dashed border-primary/10 text-primary/40 text-sm font-bold flex items-center justify-center gap-2 hover:border-primary/20 hover:text-primary/60 transition-all hover:bg-white"
        >
          <Plus size={16} />
          <span>নতুন তালিকা যোগ করুন</span>
        </button>

        <div className="pt-6 border-t border-primary/5 text-center px-4">
          <p className="text-[15px] arabic text-primary/60 mb-2">فَكُلُوا مِنْهَا وَأَطْعِمُوا</p>
          <p className="text-[10px] font-serif italic text-primary/40 leading-relaxed uppercase tracking-widest">👉 সূরা الحج 22:28 (খাও এবং অন্যদের খাওয়াও)</p>
        </div>
      </div>
    </div>
  );
};
