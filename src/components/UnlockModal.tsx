/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Logo } from './Logo';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (txnId: string) => void;
  uid?: string;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({ isOpen, onClose, onUnlock, uid }) => {
  const [txnId, setTxnId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'benefits' | 'payment'>('benefits');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleNext = () => setStep('payment');

  const handleUnlockClick = () => {
    if (!txnId || txnId.length < 6) {
      setError('সঠিক ট্রানজেকশন আইডি দিন');
      return;
    }
    setError('');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUnlock(txnId);
    }, 1500);
  };

  const paymentNumber = "+8801339959591";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[#022c22] w-full max-w-lg rounded-[40px] relative overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Premium Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -ml-32 -mb-32" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          </div>

          <div className="relative z-10 px-6 md:px-10 pt-10 pb-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <button 
                onClick={step === 'payment' ? () => setStep('benefits') : onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                title="Back"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <Logo size="sm" showText className="text-white" />
              
              <div className="w-10" /> {/* Balancer */}
            </div>

            {step === 'benefits' ? (
              <>
                {/* Framed Tagline */}
                <div className="mb-10 text-center">
                  <div className="relative inline-block px-8 py-6">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/40 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent/40 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/40 rounded-br-xl" />
                    
                    <h2 className="text-xl md:text-2xl font-black text-white font-bengali leading-relaxed">
                      কুরবানির সকল হিসাব করুন <br />
                      <span className="text-accent italic font-sans text-3xl md:text-4xl">এক জায়গায়, Digitally!</span>
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mb-8">
                  {[
                    { text: 'শরীকদের নাম ও ভাগের সঠিক হিসাব', icon: '👥' },
                    { text: 'গরু কেনা ও কসাই খরচের হিসাব', icon: '💰' },
                    { text: 'জ্যান্ত গরু থেকে মাংসের সঠিক মাপ', icon: '⚖️' },
                    { text: 'কে কয় টাকা দিল তার পেমেন্ট লিস্ট', icon: '📋' },
                    { text: 'শরীযত অনুযায়ী অটো ৩ ভাগে বণ্টন', icon: '🕌' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all group"
                    >
                      <div className="text-xl">{item.icon}</div>
                      <span className="font-bold text-[13px] text-white/80 leading-tight group-hover:text-white">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-br from-accent to-accent-dark hover:brightness-110 text-primary !py-6 rounded-[28px] shadow-2xl transition-all active:scale-95 flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 text-center">
                    <div className="text-xl md:text-2xl font-black uppercase tracking-tight">
                      প্রিমিয়াম আনলক করুন
                    </div>
                    <div className="text-xs md:text-sm font-bold opacity-80 mt-0.5">
                      এককালীন মাত্র <span className="font-sans text-lg">১৯</span> টাকা
                    </div>
                  </div>
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">পেমেন্ট করুন</h3>
                  <p className="text-white/60 text-sm">নিচের যেকোনো মাধ্যমে ১৯ টাকা সেন্ড মানি করুন</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: 'bKash', color: 'bg-[#d12053]', icon: 'https://seeklogo.com/images/B/bkash-logo-0C1572FBB4-seeklogo.com.png' },
                    { name: 'Nagad', color: 'bg-[#f7941d]', icon: 'https://seeklogo.com/images/N/nagad-logo-7A70BBDA73-seeklogo.com.png' },
                    { name: 'Rocket', color: 'bg-[#8c3494]', icon: 'https://seeklogo.com/images/R/rocket-logo-87770E8B24-seeklogo.com.png' }
                  ].map((m) => (
                    <div key={m.name} className={`${m.color} rounded-2xl p-4 flex items-center justify-between shadow-lg`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                          <img src={m.icon} alt={m.name} className="w-8 h-8 object-contain brightness-0 invert" />
                        </div>
                        <div>
                          <div className="text-[10px] text-white/60 uppercase font-black tracking-widest">{m.name} Personal</div>
                          <div className="text-white font-mono font-bold text-lg">{paymentNumber}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(paymentNumber);
                          alert('নাম্বারটি কপি করা হয়েছে');
                        }}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-xl text-white transition-all"
                      >
                        <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
                          <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div>
                    <label className="text-[10px] text-accent/60 uppercase font-black tracking-widest mb-2 block">Transaction ID (TxnID)</label>
                    <input 
                      type="text" 
                      value={txnId}
                      onChange={(e) => setTxnId(e.target.value.toUpperCase())}
                      placeholder="যেমন: A1B2C3D4"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-lg focus:outline-none focus:border-accent/40 transition-all placeholder:text-white/10"
                    />
                    {error && <p className="text-red-400 text-xs mt-2 font-bold">{error}</p>}
                  </div>

                  <button
                    disabled={isProcessing}
                    onClick={handleUnlockClick}
                    className="w-full bg-accent hover:brightness-110 text-primary py-5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <span className="font-black">যাচাই করা হচ্ছে...</span>
                      </>
                    ) : (
                      <span className="font-black text-lg">আনলক নিশ্চিত করুন</span>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-white/30 text-center italic">
                  পেমেন্ট করার ২-৫ মিনিটের মধ্যে আপনার অ্যাপটি আনলক হয়ে যাবে। <br />
                  কোনো সমস্যায় কল করুন: {paymentNumber}
                </p>
              </motion.div>
            )}

            <div className="text-center mt-8">
              <button 
                onClick={onClose}
                className="text-white/30 hover:text-white/60 transition-colors text-xs font-bold uppercase tracking-widest"
              >
                পরে আনলক করব
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
