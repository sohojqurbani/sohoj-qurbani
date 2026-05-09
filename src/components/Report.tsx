/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { AppState } from '../types';
import { formatCurrency, calculateTotalCost, toBengaliNumber } from '../utils';
import { Logo } from './Logo';
import html2pdf from 'html2pdf.js';

interface ReportProps {
  state: AppState;
  onClose: () => void;
}

export const Report: React.FC<ReportProps> = ({ state, onClose }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const totalCost = calculateTotalCost(state);
  const calculatedMeat = (state.liveWeight * state.meatRate) / 100;
  const totalMeat = state.manualTotalMeat > 0 ? state.manualTotalMeat : calculatedMeat;
  const totalShares = state.shareholders.reduce((acc, s) => acc + s.shares, 0);
  const costPerShare = totalShares > 0 ? Math.ceil(totalCost / totalShares) : 0;
  const meatPerShare = totalShares > 0 ? totalMeat / totalShares : 0;
  const totalPackets = state.meatPerPacket > 0 ? totalMeat / state.meatPerPacket : 0;

  const handleDownloadPDF = async () => {
    if (!reportRef.current || isGenerating) return;

    setIsGenerating(true);
    
    // Create a clone for PDF generation to avoid layout issues on smaller screens
    const element = reportRef.current.cloneNode(true) as HTMLDivElement;
    
    // Style the clone specifically for A4 layout optimization
    element.style.width = '1024px'; // Fixed width for consistent rendering
    element.style.padding = '40px';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '0';
    element.style.backgroundColor = '#ffffff';

    // Inject PDF-specific CSS for better page breaking
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .pdf-section { page-break-inside: avoid !important; break-inside: avoid !important; }
      .pdf-page-break { page-break-before: always !important; break-before: always !important; }
      table tr { page-break-inside: avoid !important; break-inside: avoid !important; }
      .pdf-grid-item { break-inside: avoid; }
    `;
    element.appendChild(styleTag);
    
    document.body.appendChild(element);

    const opt = {
      margin: [10, 0, 10, 0] as [number, number, number, number],
      filename: `Sahaj_Qurbani_Report_${state.uid?.slice(0, 8) || 'export'}.pdf`,
      image: { type: 'jpeg' as const, quality: 1.0 },
      html2canvas: { 
        scale: 2.5, // Slightly lower scale for better compatibility and performance
        useCORS: true,
        logging: false,
        letterRendering: true,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      },
      jsPDF: { 
        unit: 'mm' as const, 
        format: 'a4' as const, 
        orientation: 'portrait' as const,
        compress: true
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.pdf-page-break',
        avoid: '.pdf-section'
      }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF Generation Error:', error);
      window.print();
    } finally {
      document.body.removeChild(element);
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2500] bg-white overflow-y-auto print:static print:overflow-visible">
      <div className="p-4 sticky top-0 bg-white z-10 flex items-center gap-4 border-b border-primary/5 print:hidden">
        <button 
          onClick={onClose} 
          className="bg-surface text-primary w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-primary/5"
          title="Back"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-lg font-serif italic text-primary">হিসাব রিপোর্ট</h2>
      </div>

      <div id="report-print-area" ref={reportRef} className="max-w-2xl lg:max-w-5xl mx-auto p-4 md:p-12 bg-white print:p-0">
        <div className="relative border-[1px] md:border-[16px] border-primary/5 p-2 md:p-6 rounded-[32px] md:rounded-[64px] bg-white overflow-hidden shadow-2xl">
          <div className="border border-primary/10 p-6 md:p-16 rounded-[28px] md:rounded-[48px] bg-white/80 backdrop-blur-sm relative overflow-hidden">
            {/* Eid Header */}
            <div className="text-center mb-16 relative">
              <div className="flex justify-center mb-12">
                <Logo size="lg" showText />
              </div>

              <div className="arabic text-primary text-[28px] md:text-[40px] mb-6 leading-relaxed">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</div>
              <h1 className="text-3xl md:text-5xl font-serif text-primary mb-4 font-bold tracking-tight">কুরবানি হিসাব রিপোর্ট</h1>
              
              <div className="inline-flex items-center gap-4 text-[10px] md:text-xs font-bold text-primary/40 uppercase tracking-[0.2em] bg-surface px-6 py-3 rounded-2xl">
                <span>{new Date().toLocaleDateString('bn-BD')}</span>
                <span className="w-1 h-1 bg-primary/20 rounded-full" />
                <span>রিপোর্ট আইডি: {toBengaliNumber(state.uid?.slice(0, 8))}</span>
              </div>
            </div>

            {/* Premium Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 relative z-10">
              <div className="bg-primary p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden pdf-grid-item">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8" />
                <div className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">মোট খরচ ও কুরবানি মূল্য</div>
                <div className="relative z-10 text-3xl font-serif italic text-accent">{formatCurrency(totalCost)}</div>
              </div>
              <div className="bg-white p-8 rounded-[32px] text-primary border-2 border-primary/5 shadow-soft relative overflow-hidden group pdf-grid-item">
                <div className="absolute bottom-0 right-0 p-4 opacity-[0.05] group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current">
                    <path d="M22 7l-7 5-7-5m14 10V7M2 17V7m20 10l-7-5-7 5m14-10l-7 5-7-5" />
                  </svg>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-3 text-center">মোট প্রাপ্ত মাংস</div>
                <div className="text-3xl font-serif italic text-primary/90 text-center">{toBengaliNumber(totalMeat.toFixed(1))}<span className="text-sm ml-1 font-sans uppercase font-bold text-primary/30">KG</span></div>
              </div>
              <div className="bg-accent text-primary p-8 rounded-[32px] shadow-xl relative overflow-hidden pdf-grid-item">
                <div className="absolute top-0 right-0 w-full h-full opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L10 10z' fill='%23000'/%3E%3C/svg%3E")` }} />
                <div className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-3">মোট শরিক সংখ্যা</div>
                <div className="relative z-10 text-3xl font-serif italic font-bold">{toBengaliNumber(state.shareholders.length)}<span className="text-sm ml-1 font-sans uppercase font-bold">জন</span></div>
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start relative z-10">
              {/* Column 1: Shareholders */}
              <div className="space-y-12">
                <section className="mb-12 lg:mb-0 pdf-section">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-6 bg-accent rounded-full" />
                    <h3 className="font-serif italic text-primary text-xl">১. অংশগ্রহণকারী ও পেমেন্ট</h3>
                  </div>
                  <div className="overflow-hidden border border-primary/10 rounded-[32px] bg-white shadow-soft">
                    <table className="w-full text-sm border-collapse">
                      <thead className="bg-primary/[0.02]">
                        <tr className="text-[10px] text-primary/40 font-black uppercase tracking-[0.2em] border-b border-primary/5">
                          <th className="px-8 py-6 text-left">অংশগ্রহণকারী</th>
                          <th className="px-8 py-6 text-right">বাকি পরিমাণ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.shareholders.map(s => {
                          const totalDue = s.shares * costPerShare;
                          const payment = state.payments[s.id] || { amount: 0 };
                          const paid = payment.amount || 0;
                          const remaining = Math.max(0, totalDue - paid);
                          return (
                            <tr key={s.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/[0.01] transition-colors">
                              <td className="px-8 py-5">
                                <div className="font-bold text-primary mb-1">{s.name || 'নামহীন শরিক'}</div>
                                <div className="flex flex-wrap gap-2">
                                  <div className="text-[9px] text-primary/30 font-bold uppercase tracking-widest bg-surface inline-block px-2 py-0.5 rounded-full">প্রাক্কলিত: {toBengaliNumber(totalDue)} ৳</div>
                                  {payment.method && paid > 0 && (
                                    <div className="text-[9px] text-accent-dark font-bold uppercase tracking-widest bg-accent/10 inline-block px-2 py-0.5 rounded-full">{payment.method}</div>
                                  )}
                                </div>
                                {payment.note && (
                                  <div className="text-[9px] text-primary/40 italic mt-1 ml-1 opacity-60">“{payment.note}”</div>
                                )}
                              </td>
                              <td className="px-8 py-5 text-right">
                                <div className={`text-lg font-serif italic ${remaining > 0 ? 'text-red-500 font-bold' : 'text-accent-dark font-bold'}`}>
                                  {remaining > 0 ? toBengaliNumber(remaining) : 'পরিশোধিত'}
                                </div>
                                {remaining > 0 && <div className="text-[9px] text-red-300 font-bold uppercase">পেমেন্ট পেন্ডিং</div>}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* Column 2: Distribution */}
              <div className="space-y-12">
                <section className="pdf-section">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-6 bg-accent rounded-full" />
                    <h3 className="font-serif italic text-primary text-xl">২. মাংস বণ্টন</h3>
                  </div>
                  <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/5 mb-10 flex items-center justify-around gap-6 text-center transform hover:scale-[1.02] transition-transform">
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-2">মোট প্যাকেট</div>
                      <div className="text-2xl font-serif italic text-primary font-bold">{toBengaliNumber(Math.ceil(totalPackets))} <span className="text-[10px] font-sans">PCS</span></div>
                    </div>
                    <div className="w-[1px] h-12 bg-primary/10" />
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-2">ওজন প্রতি প্যাকেট</div>
                      <div className="text-2xl font-serif italic text-primary font-bold">{toBengaliNumber(state.meatPerPacket)} <span className="text-[10px] font-sans uppercase">KG</span></div>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden border border-primary/10 rounded-[32px] bg-white shadow-soft">
                    <table className="w-full text-[10px] border-collapse">
                      <thead className="bg-primary/[0.02]">
                        <tr className="text-primary/40 font-bold uppercase tracking-widest border-b border-primary/5">
                          <th className="px-5 py-5 text-left font-black">শরিকের নাম</th>
                          <th className="px-4 py-5 text-center font-black">মোট কেজি</th>
                          <th className="px-4 py-5 text-center font-black">পরিবার</th>
                          <th className="px-4 py-5 font-black text-accent-dark">সদকা</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.shareholders.map(s => {
                          const shareholderTotalMeat = meatPerShare * s.shares;
                          return (
                            <tr key={s.id} className="border-b border-primary/5 last:border-0">
                              <td className="px-4 py-4 font-medium text-primary truncate max-w-[80px]">{s.name || '...'}</td>
                              <td className="px-4 py-4 text-center font-serif font-bold text-primary">{toBengaliNumber(shareholderTotalMeat.toFixed(1))}</td>
                              <td className="px-4 py-4 text-center font-serif text-primary/60">{toBengaliNumber((shareholderTotalMeat * state.distributionFamily / 100).toFixed(1))}</td>
                              <td className="px-4 py-4 text-center font-serif text-accent-dark">{toBengaliNumber((shareholderTotalMeat * state.distributionSadaqah / 100).toFixed(1))}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Manual Distribution List */}
                {state.distributionItems && state.distributionItems.some(i => i.name || i.amount > 0) && (
                  <section className="pdf-section">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-2 h-6 bg-accent rounded-full" />
                      <h3 className="font-serif italic text-primary text-xl">৩. বিশেষ তালিকা</h3>
                    </div>
                    <div className="overflow-hidden border border-primary/10 rounded-[32px] bg-white shadow-soft text-[11px]">
                      <table className="w-full border-collapse">
                        <thead className="bg-primary/[0.02]">
                          <tr className="text-[9px] text-primary/40 font-black uppercase tracking-[0.2em] border-b border-primary/5">
                            <th className="px-8 py-4 text-left">বিবরণ / খাত</th>
                            <th className="px-8 py-4 text-right">পরিমাণ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                          {state.distributionItems.filter(i => i.name || i.amount > 0).map((item, idx) => (
                            <tr key={item.id} className="hover:bg-primary/[0.01] transition-colors">
                              <td className="px-8 py-5 font-bold text-primary flex items-center gap-4">
                                <span className="bg-surface w-6 h-6 rounded-lg flex items-center justify-center text-[8px] text-primary/30 shrink-0">{toBengaliNumber((idx + 1).toString())}</span>
                                {item.name || 'নামহীন খাত'}
                              </td>
                              <td className="px-8 py-5 text-right font-serif italic text-primary text-base font-bold whitespace-nowrap">
                                {toBengaliNumber(item.amount)} <span className="text-[10px] font-sans uppercase text-primary/30">KG</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-16 text-center relative z-10 border-t border-primary/5 mt-16 pb-8">
              <div className="text-xl font-serif text-primary mb-8 opacity-60">আল্লাহ তায়ালা কবুল করুন</div>
              
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="h-[1px] w-12 bg-primary/10" />
                <Logo size="sm" />
                <div className="h-[1px] w-12 bg-primary/10" />
              </div>
              
              <p className="text-[10px] font-black text-primary/20 uppercase tracking-[0.5em]">Sahaj Qurbani — Smart Cattle Management</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-6 print:hidden">
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className={`w-full bg-primary text-white py-6 rounded-full font-bold flex items-center justify-center gap-4 shadow-xl transition-all ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black active:scale-95'}`}
        >
          {isGenerating ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          )}
          {isGenerating ? 'রিপোর্ট তৈরি হচ্ছে...' : 'PDF রিপোর্ট ডাউনলোড করুন'}
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Sahaj Qurbani Report',
                text: `Sahaj Qurbani Report - দেখুন আমাদের কুরবানি হিসাব: ${window.location.href}`,
                url: window.location.href
              }).catch(() => {});
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('রিপোর্ট লিঙ্ক কপি করা হয়েছে!');
            }
          }}
          className="w-full bg-surface text-primary py-6 rounded-full font-bold flex items-center justify-center gap-4 hover:bg-white hover:border border-primary/10 transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          রিপোর্ট শেয়ার করুন
        </button>
      </div>
    </div>
  );
};
