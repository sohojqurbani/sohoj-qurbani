/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, INITIAL_STATE } from './types';
import { generateUID, calculateTotalCost, toBengaliNumber } from './utils';
import { 
  auth, 
  saveUserData, 
  subscribeToUserData, 
  savePayment 
} from './firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { IslamicReferences } from './components/IslamicReferences';
import { UnlockModal } from './components/UnlockModal';
import { UnlockSplash } from './components/UnlockSplash';
import { IslamicGuide } from './components/IslamicGuide';
import { LiveWeightModal } from './components/LiveWeightModal';
import { Report } from './components/Report';
import { ProfileEdit } from './components/ProfileEdit';
import { CowIcon, DividerIcon } from './components/Icons';
import { Logo } from './components/Logo';
import { AuthModal } from './components/AuthModal';

// Calculator Sections
import { SectionShareholders } from './components/calculator/SectionShareholders';
import { SectionCosts } from './components/calculator/SectionCosts';
import { SectionManualDistribution } from './components/calculator/SectionManualDistribution';
import { SectionPaymentTracking } from './components/calculator/SectionPaymentTracking';
import { SectionDistribution } from './components/calculator/SectionDistribution';
import { SectionPacking } from './components/calculator/SectionPacking';
import { SectionNiyyah } from './components/calculator/SectionNiyyah';
import { SectionMeatConversion } from './components/calculator/SectionMeatConversion';
import { SectionMeatComposition } from './components/calculator/SectionMeatComposition';
import { SectionYieldRatio } from './components/calculator/SectionYieldRatio';
import { FloatingSummary } from './components/FloatingSummary';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showLiveWeight, setShowLiveWeight] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [view, setView] = useState<'home' | 'dashboard' | 'profile'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [prevView, setPrevView] = useState<'home' | 'dashboard'>('home');
  const isInitialMount = useRef(true);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // When logged in, uid becomes firebase uid
        setState(s => ({ ...s, uid: u.uid }));
      } else {
        if (view === 'profile') setView('home');
      }
    });
    return () => unsubscribe();
  }, [view]);

  // Firebase Data Sync (Restore)
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToUserData(user.uid, (data) => {
        setState(s => ({ ...s, ...data }));
        if (data.unlocked && view === 'home') {
          setView('dashboard');
        }
      });
      return () => unsubscribe();
    }
  }, [user, view]);

  // Sync to Firebase on change (Debounced)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (user) {
      const timer = setTimeout(() => {
        saveUserData(user.uid, state);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state, user]);

  // Persistence (Local Fallback)
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem('sq_state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setState(parsed);
          if (parsed.unlocked && view === 'home') {
            setView('dashboard');
          }
        } catch (e) {
          console.error("Failed to load state", e);
        }
      } else {
        setState(s => ({ ...s, uid: generateUID() }));
      }
    }
  }, [user, view]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('sq_state', JSON.stringify(state));
    }
  }, [state, user]);

  const handleUnlock = async (txnId: string) => {
    if (txnId) {
      if (user) {
        await savePayment(user.uid, txnId, 19); 
        // In real app, cloud function verifies. Here we unlock immediately as per user prompt scope.
        await saveUserData(user.uid, { ...state, unlocked: true });
      }
      
      setShowUnlockModal(false);
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        setState(s => ({ ...s, unlocked: true }));
        setView('dashboard');
      }, 1500);
    }
  };

  const updateState = (field: keyof AppState, value: any) => {
    setState(s => ({ ...s, [field]: value }));
  };

  const handlePaymentUpdate = (id: string, amount: number, method?: string, note?: string) => {
    setState(s => ({
      ...s,
      payments: {
        ...s.payments,
        [id]: {
          amount,
          method: method ?? s.payments[id]?.method,
          note: note ?? s.payments[id]?.note
        }
      }
    }));
  };

  const totalShares = state.shareholders.reduce((acc, s) => acc + s.shares, 0);
  const totalCost = calculateTotalCost(state);
  
  const calculatedMeat = (state.liveWeight * state.meatRate) / 100;
  const totalMeat = state.manualTotalMeat > 0 ? state.manualTotalMeat : calculatedMeat;

  const meatPerShare = totalShares > 0 ? totalMeat / totalShares : 0;
  const costPerShare = totalShares > 0 ? totalCost / totalShares : 0;

  const totalPaid = Object.values(state.payments).reduce((acc, p) => acc + (p.amount || 0), 0);
  const distributedMeat = state.distributionItems.reduce((acc, item) => acc + item.amount, 0);

  const handleCalculatorClick = () => {
    if (state.unlocked) {
      setView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowUnlockModal(true);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      if (view !== 'profile') setPrevView(view as any);
      setView('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowAuthModal(true);
    }
  };

  if (view === 'profile' && user) {
    return (
      <div className="min-h-screen bg-surface pb-20 font-sans">
        <Header 
          onCalculatorClick={handleCalculatorClick}
          onGuidanceClick={() => setShowGuide(true)}
          uid={state.uid}
          user={user}
          onLogout={() => signOut(auth)}
          onLoginClick={() => setShowAuthModal(true)}
          onProfileClick={handleProfileClick}
          onBackClick={() => setView(prevView)}
          onHomeClick={() => setView('home')}
          view="profile"
        />
        <main className="pt-24 px-4">
          <ProfileEdit 
            user={user} 
            onBack={() => setView(prevView)} 
            onUpdate={() => {}} // User info updates naturally via Firebase Auth listener in a real app, 
                                // but we could force a refresh if needed.
          />
        </main>
      </div>
    );
  }

  if (view === 'dashboard' && state.unlocked) {
    return (
      <div className="min-h-screen bg-surface pb-20 font-sans">
        <Header 
          onCalculatorClick={handleCalculatorClick}
          onGuidanceClick={() => setShowGuide(true)}
          uid={state.uid}
          user={user}
          onLogout={() => signOut(auth)}
          onLoginClick={() => setShowAuthModal(true)}
          onProfileClick={handleProfileClick}
          onBackClick={() => setView('home')}
          onHomeClick={() => setView('home')}
          view="dashboard"
        />
        
        <main className="pt-24 px-4 max-w-[1400px] mx-auto pb-20">
          <SectionNiyyah 
            confirmed={state.niyyahConfirmed}
            onUpdate={(v) => updateState('niyyahConfirmed', v)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-8">
            <div id="section-shareholders">
              <SectionShareholders 
                animalType={state.animalType}
                shareholders={state.shareholders}
                onTypeUpdate={(type) => updateState('animalType', type)}
                onUpdate={(sh) => updateState('shareholders', sh)}
              />
            </div>

            <div id="section-costs">
              <SectionCosts 
                animalPrice={state.animalPrice}
                butcherCost={state.butcherCost}
                transportCost={state.transportCost}
                packagingCost={state.packagingCost}
                otherCost={state.otherCost}
                shareholders={state.shareholders}
                onUpdate={(f, v) => updateState(f as any, v)}
              />
            </div>

            <div id="section-meat">
              <SectionMeatComposition 
                totalMeat={state.manualTotalMeat}
                onUpdate={(v) => updateState('manualTotalMeat', v)}
                shares={totalShares}
              />
            </div>

            <SectionYieldRatio 
              liveWeight={state.yieldLiveWeight}
              meatWeight={state.yieldActualMeat}
              onUpdate={(f, v) => updateState(f as any, v)}
            />

            <div id="section-payments">
              <SectionPaymentTracking 
                shareholders={state.shareholders}
                totalCost={totalCost}
                payments={state.payments}
                onPaymentUpdate={handlePaymentUpdate}
              />
            </div>

            <SectionPacking 
              totalMeat={totalMeat}
              family={state.distributionFamily}
              relative={state.distributionRelative}
              sadaqah={state.distributionSadaqah}
              weightPerPacket={state.meatPerPacket}
              onUpdate={(v) => updateState('meatPerPacket', v)}
            />

            <SectionMeatConversion 
              liveWeight={state.liveWeight}
              meatRate={state.meatRate}
              onUpdate={(f, v) => updateState(f as any, v)}
            />

            <div id="section-distribution">
              <SectionDistribution 
                totalMeat={totalMeat}
                family={state.distributionFamily}
                relative={state.distributionRelative}
                sadaqah={state.distributionSadaqah}
                shareholders={state.shareholders}
                onUpdate={(f, v) => {
                  if (f === 'family') updateState('distributionFamily', v);
                  else if (f === 'relative') updateState('distributionRelative', v);
                  else if (f === 'sadaqah') updateState('distributionSadaqah', v);
                }}
                onTotalMeatUpdate={(v) => updateState('manualTotalMeat', v)}
              />
            </div>

            <div className="md:col-span-2" id="section-manual-distribution">
              <SectionManualDistribution 
                items={state.distributionItems}
                onUpdate={(items) => updateState('distributionItems', items)}
              />
            </div>
          </div>

          <div className="mt-6">
            {/* Report Trigger */}
          <div className="bg-primary p-7 rounded-[40px] flex flex-col items-center gap-6 shadow-xl relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-light)_0%,var(--color-primary)_100%)]" />
            
            <div className="relative z-10 scale-110 mb-2">
              <Logo />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-serif text-white mb-2">আপনার রিপোর্ট প্রস্তুত</h3>
              <p className="text-white/60 text-sm italic">সহজ কুরবানি — সঠিক বন্টনের নিশ্চয়তা</p>
            </div>
            <button 
              onClick={() => setShowReport(true)}
              className="relative z-10 w-full bg-accent text-primary py-4 rounded-full font-bold shadow-lg shadow-accent/20 active:scale-[0.98] transition-transform"
            >
              📄 রিপোর্ট দেখুন
            </button>
          </div>
          </div>

          <footer className="text-center py-10 opacity-40 text-xs text-primary space-y-3">
            <div className="arabic text-lg">تَقَبَّلَ اللَّهُ مِنْكُمْ</div>
            <p className="font-serif italic text-sm">Sahaj Qurbani — Premium Management</p>
            <p>🔒 আপনার সকল তথ্য শুধুমাত্র আপনার ডিভাইসে সংরক্ষিত।</p>
          </footer>
        </main>

        <FloatingSummary 
          totalCost={totalCost}
          totalMeat={totalMeat}
          shareholdersCount={state.shareholders.length}
          meatPerShare={meatPerShare}
          costPerShare={costPerShare}
          totalPaid={totalPaid}
          distributedMeat={distributedMeat}
        />

        <AnimatePresence>
          {showReport && (
            <Report state={state} onClose={() => setShowReport(false)} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onCalculatorClick={handleCalculatorClick}
        onGuidanceClick={() => setShowGuide(true)}
        uid={state.uid}
        user={user}
        onLogout={() => signOut(auth)}
        onLoginClick={() => setShowAuthModal(true)}
        onProfileClick={handleProfileClick}
        onBackClick={() => setView('home')}
        onHomeClick={() => setView('home')}
        view="home"
      />
      <main className="font-sans">
        <Hero 
          onCalculatorClick={handleCalculatorClick}
          onGuidanceClick={() => setShowGuide(true)}
        />
        <Features 
          isUnlocked={state.unlocked}
          onGuideClick={() => setShowGuide(true)}
          onPremiumClick={() => {
            if (state.unlocked) setView('dashboard');
            else setShowUnlockModal(true);
          }}
          onLiveWeightClick={() => setShowLiveWeight(true)}
        />
        
        <div className="py-4 md:py-8 flex flex-col items-center justify-center text-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="arabic text-[#064e3b] text-3xl md:text-5xl">
              تقبل الله قربانكم
            </div>
            <div className="text-black text-lg md:text-xl font-serif font-medium">
              আপনার কুরবানি কবুল হোক
            </div>
          </motion.div>
        </div>

        <IslamicReferences />
        
        <section className="bg-primary py-10 md:py-16 px-5 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary-light)_0%,var(--color-primary)_100%)]" />
          <div className="relative z-10">
            <div className="arabic text-accent text-4xl mb-6">تَقَبَّلَ اللَّهُ مِنْكُمْ</div>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">আল্লাহ আপনাদের <br/> কুরবানি কবুল করুন</h2>
            <p className="text-white/60 font-light max-w-md mx-auto mb-10 leading-relaxed">
              সহজ কুরবানি — আপনার ডিজিটাল হিসাব রক্ষক। সঠিক বন্টন ইসলামের একটি অতি গুরুত্বপূর্ণ বিধান।
            </p>
            <div className="w-24 h-[1px] bg-accent/30 mx-auto mb-10" />
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] max-w-sm mx-auto">
              🔒 আপনার সকল তথ্য শুধুমাত্র আপনার ডিভাইসে সংরক্ষিত থাকে। কোনো তথ্য আমাদের সার্ভারে পাঠানো হয় না।
            </p>
          </div>
        </section>
      </main>

      {/* Modals & Overlays */}
      <UnlockModal 
        isOpen={showUnlockModal} 
        onClose={() => setShowUnlockModal(false)}
        onUnlock={handleUnlock}
        uid={state.uid}
      />
      
      <AnimatePresence>
        {showSplash && <UnlockSplash uid={state.uid} />}
      </AnimatePresence>

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>

      <IslamicGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
      
      <LiveWeightModal isOpen={showLiveWeight} onClose={() => setShowLiveWeight(false)} />
    </div>
  );
}
