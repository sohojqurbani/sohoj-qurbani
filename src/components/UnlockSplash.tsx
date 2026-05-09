/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { DividerIcon } from './Icons';
import { Logo } from './Logo';

interface SplashProps {
  uid: string;
}

export const UnlockSplash: React.FC<SplashProps> = ({ uid }) => {
  return (
    <div className="fixed inset-0 z-[3000] bg-primary flex items-center justify-center p-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary-light)_0%,var(--color-primary)_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="flex flex-col items-center relative z-10"
      >
        <div className="mb-8 scale-150">
          <Logo size="lg" />
        </div>
        
        <h2 className="text-3xl font-serif text-white mb-4">কুরবানি কবুল হোক</h2>
        
        <div className="arabic text-accent text-2xl mb-4">
          تَقَبَّلَ اللَّهُ مِنَّا وَمِنكُمْ
        </div>
        
        <p className="text-lg text-white/60 mb-8 font-light italic">
          আল্লাহ আমাদের ও আপনাদের কুরবানি কবুল করুন
        </p>

        <DividerIcon className="text-accent/30 w-48 mb-8" />

        <div className="bg-accent text-primary text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
          আপনার আইডি: {uid}
        </div>
      </motion.div>
    </div>
  );
};
