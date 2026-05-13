/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';

const GUIDE_CARDS = [
  {
    category: "১. কুরবানি কার উপর ওয়াজিব?",
    items: [
      {
        title: "ওয়াজিব হওয়ার শর্তাবলি (হানাফি মাজহাব)",
        ref: "ফাতাওয়ায়ে শামী",
        body: "১. প্রাপ্তবয়স্ক, সুস্থ মস্তিষ্কের মুসলিম। ২. স্থায়ী বাসিন্দা (মুসাফির নয়)। ৩. নিসাব পরিমাণ সম্পদের মালিক (প্রয়োজনের অতিরিক্ত ≈ ৭.৫ তোলা সোনা বা ৫২.৫ তোলা রুপা বা সমমূল্যের নগদ অর্থ/সম্পদ কুরবানির দিনগুলোতে মালিকানায় থাকা)।"
      },
      {
        title: "স্বামী-স্ত্রীর কুরবানি",
        ref: "আল-মাবসুত",
        body: "স্বামী-স্ত্রী উভয়ের নিকট যদি পৃথকভাবে নিসাব পরিমাণ সম্পদ থাকে, তবে উভয়ের উপর আলাদা আলাদা কুরবানি ওয়াজিব।"
      }
    ]
  },
  {
    category: "২. গরুতে শরীকের বিধান (সর্বোচ্চ ৭ জন)",
    items: [
      {
        title: "সাতজনের শরীকানা",
        ref: "সহিহ মুসলিম",
        body: "জাবির ইবনে আব্দুল্লাহ (রা.) বলেন: “আমরা রাসূলুল্লাহ ﷺ-এর সাথে হুদায়বিয়ায় একটি উট সাতজনের পক্ষ থেকে এবং একটি গরু সাতজনের পক্ষ থেকে কুরবানি করেছি।” ৭ জনের বেশি শরীক হলে কুরবানি সহীহ হবে না। আমাদের অ্যাপটি স্বয়ংক্রিয়ভাবে সর্বোচ্চ ৭ জন পর্যন্ত অনুমতি দেয় — এটি শরীয়াহ কমপ্লায়েন্স নিশ্চিত করে।"
      }
    ]
  },
  {
    category: "৩. কুরবানির সময়",
    items: [
      {
        title: "জিলহজের দিনসমূহ",
        ref: "আবু দাউদ",
        body: "১০ই জিলহজ ঈদের নামাজের পর থেকে ১২ই জিলহজ সূর্যাস্ত পর্যন্ত কুরবানি করা জায়েজ। ১৩ই জিলহজে কেউ কেউ জায়েজ বলেন, তবে সতর্কতামূলকভাবে ১২ তারিখের মধ্যে করা উত্তম।"
      }
    ]
  },
  {
    category: "৪. পশুর শর্তসমূহ ও বয়স",
    items: [
      {
        title: "পশুর ন্যূনতম বয়স",
        ref: "শরহে বেকায়া",
        body: "গরু/মহিষ: ২ বছর পূর্ণ হতে হবে। ছাগল/ভেড়া/দুম্বা: ১ বছর। উট: ৫ বছর। তবে ৬ মাসের দুম্বা যদি দেখতে ১ বছরের মতো হয়, তবে তা জায়েজ।"
      },
      {
        title: "নিষিদ্ধ ত্রুটিসমূহ",
        ref: "তিরমিজি",
        body: "অন্ধ, কানি (এক চোখ নষ্ট), ল্যাংড়া (যা খুঁড়িয়ে হাঁটে), অতিশয় দুর্বল, কান বা লেজের অধিকাংশ কাটা, দাঁত নেই এমন পশু কুরবানি করা জায়েজ নয়।"
      }
    ]
  },
  {
    category: "৫. অন্যান্য গুরুত্বপূর্ণ নিয়ম",
    items: [
      {
        title: "নিয়ত ও জবেহ",
        ref: "সহিহ বুখারি",
        body: "কুরবানি শুধুমাত্র আল্লাহর সন্তুষ্টির জন্য হতে হবে। জবেহ করার সময় 'বিসমিল্লাহি আল্লাহু আকবার' বলা আবশ্যক।"
      },
      {
        title: "অংশ বিক্রি নিষিদ্ধ",
        ref: "বাদায়েউস সানায়ে",
        body: "কুরবানির পশুর চামড়া, মাংস, চর্বি বা হাড়—কোনো অংশই বিক্রি করা যাবে না। চামড়া নিজে ব্যবহার করা যায় অথবা সওয়াবের নিয়ত ছাড়া গরিবদের দান করতে হয়।"
      },
      {
        title: "মাংস বণ্টন",
        ref: "মুস্তাহাব",
        body: "মাংস ৩ ভাগ করা উত্তম: ১ ভাগ নিজের পরিবারের জন্য, ১ ভাগ আত্মীয়-স্বজনের জন্য এবং ১ ভাগ গরিব-মিসকিনদের জন্য।"
      }
    ]
  },
  {
    category: "কুরবানির দোয়া (Sacrifice Duas)",
    isDua: true,
    items: [
      {
        title: "জবেহ করার দোয়া",
        ref: "সহিহ মুসলিম",
        arabic: "بِسْمِ اللهِ، وَاللهُ أَكْبَرُ، اللَّهُمَّ هَذَا مِنْكَ وَلَكَ، اللَّهُمَّ تَقَبَّلْ مِنِّي",
        pronunciation: "বিসমিল্লাহি ওয়াল্লাহু আকবার, আল্লাহুম্মা হাজা মিনকা ওয়া লাকা, আল্লাহুম্মা তাকাব্বাল মিন্নি।",
        body: "আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ। হে আল্লাহ, এটি আপনার পক্ষ থেকে এবং আপনারই সন্তুষ্টির জন্য। হে আল্লাহ, আমার পক্ষ থেকে কবুল করুন।"
      }
    ]
  }
];

interface IslamicGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IslamicGuide: React.FC<IslamicGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2100] bg-white overflow-y-auto">
      <div className="bg-gradient-to-r from-primary to-primary-dark p-4 sticky top-0 z-10 flex items-center gap-4 shadow-md">
        <button 
          onClick={onClose} 
          className="text-white bg-white/10 w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-white/20 transition-all"
          title="Back"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white font-sans">ইসলামিক পূর্ণ গাইড</h2>
      </div>

      <div className="p-5 space-y-8 pb-10">
        {GUIDE_CARDS.map((section, sidx) => (
          <div key={sidx} className="space-y-4">
            <h3 className="text-lg font-black text-primary border-l-4 border-accent pl-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {section.category}
            </h3>
            
            <div className="grid gap-4">
              {section.items.map((card, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (sidx * 0.1) + (index * 0.05) }}
                  className="bg-white border border-primary/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-base font-bold text-primary font-sans">{card.title}</h4>
                      <div className="bg-primary/5 text-primary/40 text-[9px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider whitespace-nowrap ml-2">
                        {card.ref}
                      </div>
                    </div>

                    {section.isDua ? (
                      <div className="space-y-4">
                        <div className="arabic text-right text-2xl leading-loose text-primary bg-primary/5 p-4 rounded-2xl">
                          {card.arabic}
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">উচ্চারণ</p>
                          <p className="text-sm font-medium text-primary leading-relaxed">{card.pronunciation}</p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-primary/5">
                          <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">অর্থ</p>
                          <p className="text-sm text-primary/70 leading-relaxed font-sans">{card.body}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-primary/70 leading-relaxed font-sans">
                        {card.body}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 text-center bg-primary/5 border-t border-primary/5">
        <div className="arabic text-primary text-2xl mb-3">تَقَبَّلَ اللَّهُ مِنَّا وَمِنكُمْ</div>
        <p className="text-xs text-primary/30 font-bold uppercase tracking-[0.3em] font-sans">Sahaj Qurbani Guide</p>
      </div>
    </div>
  );
};
