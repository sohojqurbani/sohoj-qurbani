import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Check, ShieldCheck, X } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': () => {
            console.log('Recaptcha resolved');
          }
        });
      } catch (err) {
        console.error("Recaptcha init error", err);
      }
    }
    return () => {
      // Don't clear global verifier here to avoid re-rendering issues, 
      // but in production React apps we might want to manage this better.
    };
  }, []);

  const handleSendOtp = async () => {
    const fullNumber = phoneNumber.startsWith('+') ? phoneNumber : `+88${phoneNumber}`;
    
    if (phoneNumber.length < 10) {
      setError('সঠিক মোবাইল নম্বর দিন');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPhoneNumber(auth, fullNumber, (window as any).recaptchaVerifier);
      setConfirmationResult(result);
      setStep('otp');
      setTimer(60);
    } catch (err: any) {
      setError('কোড পাঠাতে সমস্যা হয়েছে। নম্বর পরীক্ষা করুন বা কিছুক্ষণ পর চেষ্টা করুন।');
      console.error(err);
      // Reset recaptcha if it fails
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.render().then((widgetId: any) => {
          (window as any).recaptchaVerifier.reset(widgetId);
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('৬ সংখ্যার ওটিপি দিন');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      onClose();
    } catch (err: any) {
      setError('ভুল ওটিপি কোড। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[32px] md:rounded-[48px] shadow-2xl overflow-hidden w-full max-w-md border border-primary/5 relative"
      >
        <div id="recaptcha-container" />
        
        <div className="bg-primary pt-12 pb-8 px-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Logo size="lg" className="scale-125" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-2">সুরক্ষিত লগইন</h2>
            <p className="text-white/60 text-sm max-w-[240px]">আপনার কুরবানির হিসাবগুলো নিরাপদ রাখতে এগিয়ে যান।</p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-bold border border-red-100 flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div 
                key="phone-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-3 block ml-1">মোবাইল নম্বর</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-primary/10 pr-3">
                      <span className="text-primary/40 font-bold text-sm">+৮৮</span>
                    </div>
                    <input 
                      type="tel"
                      placeholder="017XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full bg-surface p-5 pl-[85px] rounded-2xl border-2 border-transparent font-bold text-primary text-lg focus:border-primary/10 focus:bg-white transition-all outline-none"
                    />
                    <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/10 group-focus-within:text-primary/30 transition-colors" />
                  </div>
                </div>
                
                <button 
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-primary text-white p-6 rounded-2xl font-black text-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                >
                  {loading ? 'প্রসেস হচ্ছে...' : 'ওটিপি পাঠান'}
                  {!loading && <Check className="w-5 h-5" />}
                </button>
                
                <p className="text-center text-[10px] text-primary/30 font-medium leading-relaxed">
                  এগিয়ে যাওয়ার মাধ্যমে আপনি আমাদের <br /> শর্তাবলীর সাথে একমত পোষণ করছেন।
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-sm text-primary/60 font-medium mb-1">যাচাইকরণ কোডটি পাঠানো হয়েছে</p>
                  <p className="text-sm font-bold text-primary">+৮৮{phoneNumber}</p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-4 block text-center">৬ সংখ্যার ওটিপি দিন</label>
                  <input 
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="------"
                    className="w-full bg-surface p-6 rounded-2xl border-2 border-transparent font-black text-primary text-3xl focus:border-primary/10 focus:bg-white transition-all outline-none text-center tracking-[0.5em]"
                    maxLength={6}
                  />
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-accent-dark text-white p-6 rounded-2xl font-black text-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-accent-dark/20"
                  >
                    {loading ? 'ভেরিফাই হচ্ছে...' : 'লগইন সম্পন্ন করুন'}
                  </button>

                  <div className="text-center">
                    {timer > 0 ? (
                      <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">
                        আবার পাঠানো যাবে {timer} সেকেন্ড পর
                      </p>
                    ) : (
                      <button 
                        onClick={handleSendOtp}
                        className="text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                      >
                        আবার ওটিপি পাঠান
                      </button>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setStep('phone');
                    setOtp('');
                  }}
                  className="w-full text-primary/20 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary/40 transition-colors"
                >
                  নম্বর সঠিক নয়? পরিবর্তন করুন
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
