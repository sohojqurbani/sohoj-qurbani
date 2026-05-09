import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toBengaliNumber } from '../utils';
import { DollarSign, Scale, Users, LayoutDashboard, GripVertical, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface FloatingSummaryProps {
  totalCost: number;
  totalMeat: number;
  shareholdersCount: number;
  meatPerShare: number;
  costPerShare: number;
  totalPaid: number;
  distributedMeat: number;
}

export const FloatingSummary: React.FC<FloatingSummaryProps> = ({
  totalCost,
  totalMeat,
  shareholdersCount,
  meatPerShare,
  costPerShare,
  totalPaid,
  distributedMeat
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [size, setSize] = useState({ width: 224, height: 380 }); // 56 * 4 = 224px
  
  const paymentProgress = totalCost > 0 ? (totalPaid / totalCost) * 100 : 0;
  const distributionProgress = totalMeat > 0 ? (distributedMeat / totalMeat) * 100 : 0;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleResize = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const newWidth = Math.max(200, startWidth + (currentX - startX));
      const newHeight = Math.max(150, startHeight + (currentY - startY));
      
      setSize({ width: newWidth, height: newHeight });
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.8, x: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: 0,
        width: isMinimized ? 224 : size.width,
        height: isMinimized ? 'auto' : size.height
      }}
      className="fixed top-32 right-6 z-[100] bg-primary/95 backdrop-blur-2xl p-5 rounded-[2.5rem] border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing select-none hidden md:block group"
    >
      <div className="flex flex-col h-full relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
              <LayoutDashboard className="w-3 h-3 text-accent" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">লাইভ সামারি</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              {isMinimized ? <ChevronDown className="w-3 h-3 text-white/40" /> : <ChevronUp className="w-3 h-3 text-white/40" />}
            </button>
            <GripVertical className="w-3 h-3 text-white/10" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isMinimized ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex-1"
            >
              {/* Financial Status */}
              <button 
                onClick={() => scrollToSection('section-payments')}
                className="w-full space-y-2 text-left group/item"
              >
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover/item:text-accent transition-colors">মোট খরচ</div>
                    <div className="text-xl font-serif italic text-white line-clamp-1">৳{toBengaliNumber(totalCost)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-accent/60 uppercase">আদায়কৃত</div>
                    <div className="text-[10px] font-serif text-accent">{Math.round(paymentProgress)}%</div>
                  </div>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${paymentProgress}%` }}
                    className="h-full bg-accent"
                  />
                </div>
              </button>

              {/* Meat Status */}
              <button 
                onClick={() => scrollToSection('section-distribution')}
                className="w-full space-y-2 text-left group/item"
              >
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover/item:text-white transition-colors">মোট মাংস</div>
                    <div className="text-xl font-serif italic text-accent line-clamp-1">{toBengaliNumber(totalMeat.toFixed(1))}কেজি</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-white/40 uppercase">বণ্টন কাজ</div>
                    <div className="text-[10px] font-serif text-white/80">{Math.round(distributionProgress)}%</div>
                  </div>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${distributionProgress}%` }}
                    className="h-full bg-white/40"
                  />
                </div>
              </button>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
                <button 
                  onClick={() => scrollToSection('section-shareholders')}
                  className="space-y-1 text-left group/item"
                >
                  <div className="text-[8px] font-bold uppercase tracking-tighter text-white/30 group-hover/item:text-white/60">অংশীদার</div>
                  <div className="text-sm font-serif text-white/90">{toBengaliNumber(shareholdersCount)}জন</div>
                </button>
                <button 
                  onClick={() => scrollToSection('section-costs')}
                  className="space-y-1 text-right group/item"
                >
                  <div className="text-[8px] font-bold uppercase tracking-tighter text-white/30 group-hover/item:text-accent">ভাগ খরচ</div>
                  <div className="text-sm font-serif text-accent">৳{toBengaliNumber(Math.ceil(costPerShare))}</div>
                </button>
              </div>

              {/* Extra Info */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter italic">অবশিষ্ট মাংস</span>
                  <span className="text-[11px] font-serif text-white/60">{toBengaliNumber((totalMeat - distributedMeat).toFixed(1))} কেজি</span>
                </div>
                {distributionProgress >= 100 && paymentProgress >= 100 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 justify-center py-2 bg-accent/10 rounded-2xl border border-accent/20"
                  >
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    <span className="text-[9px] font-bold text-accent uppercase">সব ঠিক আছে</span>
                  </motion.div>
                ) : (
                  <div className="text-[8px] text-center text-white/20 uppercase tracking-widest font-bold">
                    ডেটা আপডেট হচ্ছে...
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="minimized"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-between items-center px-1"
            >
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-serif text-white">৳{toBengaliNumber(totalCost)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="text-xs font-serif text-accent">{toBengaliNumber(totalMeat.toFixed(1))}kg</span>
                </div>
              </div>
              <div className="text-[10px] font-bold text-white/20">{toBengaliNumber(shareholdersCount)} জন</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resize Handle */}
        {!isMinimized && (
          <div 
            onMouseDown={handleResize}
            onTouchStart={handleResize}
            className="absolute bottom-[-10px] right-[-10px] w-6 h-6 flex items-center justify-center cursor-nwse-resize active:scale-125 transition-transform"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 border border-white/10" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
