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

  if (!isOpen) return null;

  const handleUnlockClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUnlock('AUTO_PAY_' + Math.random().toString(36).substring(7).toUpperCase());
    }, 1000);
  };

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

          <div className="relative z-10 px-6 md:px-10 pt-10 pb-12 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <button 
                onClick={onClose}
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

            {/* Framed Tagline */}
            <div className="mb-10 text-center">
              <div className="relative inline-block px-8 py-6">
                {/* Decorative Frame Corner - Top Left */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/40 rounded-tl-xl" />
                {/* Decorative Frame Corner - Top Right */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr-xl" />
                {/* Decorative Frame Corner - Bottom Left */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent/40 rounded-bl-xl" />
                {/* Decorative Frame Corner - Bottom Right */}
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/40 rounded-br-xl" />
                
                <h2 className="text-xl md:text-2xl font-black text-white font-bengali leading-relaxed">
                  কুরবানির সকল হিসাব করুন <br />
                  <span className="text-accent italic font-sans text-3xl md:text-4xl">এক জায়গায়, Digitally!</span>
                </h2>
              </div>
              
              {uid && (
                <div className="mt-6 inline-flex items-center gap-2 text-[10px] text-accent/60 font-mono tracking-widest uppercase bg-accent/5 px-4 py-1.5 rounded-full border border-accent/10">
                  <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                  Your ID: {uid}
                </div>
              )}
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

            <div className="space-y-6">
              <button
                disabled={isProcessing}
                onClick={handleUnlockClick}
                className="w-full bg-gradient-to-br from-accent to-accent-dark hover:brightness-110 text-primary !py-6 rounded-[28px] shadow-2xl transition-all active:scale-95 flex flex-col items-center justify-center gap-1 group disabled:opacity-70 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {isProcessing ? (
                  <div className="flex items-center gap-3 relative z-10 transition-all">
                    <div className="w-5 h-5 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="font-bold">প্রসেসিং হচ্ছে...</span>
                  </div>
                ) : (
                  <div className="relative z-10 text-center">
                    <div className="text-xl md:text-2xl font-black uppercase tracking-tight">
                      আনলক করুন
                    </div>
                    <div className="text-xs md:text-sm font-bold opacity-80 mt-0.5">
                      এককালীন মাত্র <span className="font-sans text-lg">১৯</span> টাকা
                    </div>
                  </div>
                )}
              </button>
              
              <div className="text-center">
                <button 
                  onClick={onClose}
                  className="text-white/30 hover:text-white/60 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  পরে আনলক করব
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
