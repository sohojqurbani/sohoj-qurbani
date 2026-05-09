/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';

const GUIDE_CARDS = [
  {
    category: "সাধারণ মাসআলা",
    items: [
      {
        title: "কুরবানির নিয়ত",
        ref: "নিয়ত অন্তরের বিষয় — ফাতাওয়ায়ে শামী",
        body: "কুরবানি শুধুমাত্র আল্লাহর সন্তুষ্টির জন্য হতে হবে। মুখে উচ্চারণ জরুরি নয়।"
      },
      {
        title: "শেয়ারের বিধান",
        ref: "সহিহ মুসলিম: ১৩১৮",
        body: "গরু, মহিষ বা উটে সর্বোচ্চ ৭ জন এবং ছাগল, ভেড়া বা দুম্বায় ১ জন শরিক হতে পারবেন।"
      },
      {
        title: "পশুর বয়স",
        ref: "আবু দাউদ: ২৭৯৭",
        body: "গরু/মহিষ ২ বছর, ছাগল/ভেড়া ১ বছর, উট ৫ বছর। তবে ৬ মাসের দুম্বা যদি দেখতে ১ বছরের মতো হয়, তবে তা জায়েজ।"
      },
      {
        title: "কুরবানির সময়",
        ref: "আবু দাউদ: ২৮১২",
        body: "১০ই জিলহজ ঈদের নামাজের পর থেকে ১২ই জিলহজ সূর্যাস্ত পর্যন্ত। মোট ৩ দিন। রাতের বেলাও কুরবানি করা জায়েজ।"
      },
      {
        title: "নিসাবের পরিমাণ",
        ref: "ফাতাওয়ায়ে শামী",
        body: "সাড়ে ৭ তোলা সোনা বা সাড়ে ৫২ তোলা রুপা বা সমমূল্যের নগদ অর্থ/সম্পদ কুরবানির দিনগুলোতে মালিকানায় থাকলে কুরবানি ওয়াজিব।"
      }
    ]
  },
  {
    category: "সচরাচর জিজ্ঞাসা (FAQ)",
    items: [
      {
        title: "ঋণ থাকলে কুরবানি দেওয়া যাবে কি?",
        ref: "ফাতাওয়ায়ে শামী: ৬/৩১২",
        body: "যদি ঋণের কিস্তি পরিশোধের পর আপনার কাছে নিসাব পরিমাণ সম্পদ (কুরবানির দিনগুলোতে) অতিরিক্ত থাকে, তবে কুরবানি ওয়াজিব। অন্যথায় নফল হিসেবে দিতে পারেন, তবে আগে ঋণ পরিশোধ করা উত্তম।"
      },
      {
        title: "সন্তানদের নামে কুরবানি করার নিয়ম",
        ref: "বাদায়েউস সানায়ে: ৪/১৯৫",
        body: "সন্তান যদি নাবালগ হয় এবং তার নিজস্ব নেসাব পরিমাণ মাল না থাকে, তবে পিতার ওপর তার পক্ষ থেকে কুরবানি করা ওয়াজিব নয়। তবে পিতা চাইলে নফল হিসেবে নিজের বা সন্তানের সওয়াবের জন্য দিতে পারেন।"
      },
      {
        title: "মৃত ব্যক্তির নামে কুরবানি",
        ref: "ফাতাওয়ায়ে শামী: ৬/৩২৬",
        body: "মৃত ব্যক্তির ইাসলে সওয়াবের উদ্দেশ্যে কুরবানি করা জায়েজ এবং এটি একটি উত্তম কাজ। এতে মৃত ব্যক্তি সওয়াব পাবেন এবং কুরবানিদাতার নিজ ওয়াজিব কুরবানি আলাদাভাবে আদায় করতে হবে।"
      },
      {
        title: "অন্যের নামে কুরবানি করা",
        ref: "ফাতাওয়ায়ে আলমগিরী: ৫/২৯৩",
        body: "অন্য কারো পক্ষ থেকে কুরবানি করতে হলে তার অনুমতি প্রয়োজন। তবে পরিবারের প্রধান যদি পরিবারের সবার পক্ষ থেকে নফল কুরবানি করেন, তবে তা জায়েজ।"
      },
      {
        title: "বিদেশ থেকে দেশে কুরবানি দেওয়া",
        ref: "ফাতাওয়ায়ে শামী: ৫/২০১",
        body: "যেখানে কুরবানি দেওয়া হচ্ছে সেখানকার ঈদের নামাজের পর জবেহ করা শর্ত। বিদেশে অবস্থানকারী ব্যক্তির জন্য দেশে কুরবানি দেওয়া জায়েজ।"
      }
    ]
  },
  {
    category: "পশুর গুণাবলি ও বণ্টন",
    items: [
      {
        title: "পশুর দোষত্রুটি",
        ref: "তিরমিজি: ১৪৯৭",
        body: "অন্ধ, কানা, খুব বেশি ল্যাংড়া বা অতিদুর্বল পশু কুরবানি হবে না। দাঁতহীন বা কান কাটা পশুর ক্ষেত্রেও বিশেষ সতর্কতা প্রয়োজন।"
      },
      {
        title: "মাংস বণ্টন",
        ref: "ফাতাওয়ায়ে আলমগিরী",
        body: "মাংস ৩ ভাগ করা মুস্তাহাব: ১ ভাগ নিজের জন্য, ১ ভাগ আত্মীয়দের জন্য এবং ১ ভাগ গরিবদের জন্য।"
      },
      {
        title: "কসাইয়ের পারিশ্রমিক",
        ref: "বুখারি: ১৭১৬",
        body: "কসাইয়ের মজুরি আলাদাভাবে দিতে হবে। কুরবানির পশুর কোনো অংশ (মাংস, চামড়া) পারিশ্রমিক হিসেবে দেওয়া যাবে না।"
      },
      {
        title: "চামড়ার বিধান",
        ref: "ফাতাওয়ায়ে হিন্দিয়া",
        body: "চামড়া নিজের ব্যবহারে লাগানো যায়। তবে বিক্রি করলে তার টাকা সওয়াবের নিয়ত ছাড়া গরিবদের দান করা ওয়াজিব।"
      }
    ]
  },
  {
    category: "জরুরি নির্দেশনা ও সতর্কতা",
    items: [
      {
        title: "পরিবেশ রক্ষা",
        ref: "জরুরি বার্তা",
        body: "কুরবানির পর রক্ত ও বর্জ্য নির্দিষ্ট স্থানে ফেলুন। ব্লিচিং পাউডার বা জীবাণুনাশক ব্যবহার করে চারপাশ পরিষ্কার রাখুন।"
      },
      {
        title: "স্বাস্থ্যবিধি",
        ref: "স্বাস্থ্য টিপস",
        body: "মাংস কাটার সময় ধারালো সরঞ্জাম ব্যবহারে সতর্ক থাকুন। আঘাতপ্রাপ্ত হলে দ্রুত প্রাথমিক চিকিৎসা নিন ও ধনুষ্টঙ্কার (Tetanus) টিকা দেওয়া না থাকলে দিয়ে নিন।"
      },
      {
        title: "হালাল ত্বরিকা",
        ref: "সতর্কতা",
        body: "পশুকে জবেহ করার সময় ধারালো ছুরি ব্যবহার করুন যাতে পশুর কষ্ট কম হয়। এক পশুর সামনে অন্য পশু জবেহ করা মাকরুহ।"
      }
    ]
  },
  {
    category: "কুরবানির দোয়া (Sacrifice Duas)",
    isDua: true,
    items: [
      {
        title: "জবেহ করার দোয়া",
        ref: "সহিহ মুসলিম: ৫২০৩, আবু দাউদ: ১৭৯৫",
        arabic: "بِسْمِ اللهِ، وَاللهُ أَكْبَرُ، اللَّهُمَّ هَذَا مِنْكَ وَلَكَ، اللَّهُمَّ تَقَبَّلْ مِنِّي",
        pronunciation: "বিসমিল্লাহি ওয়াল্লাহু আকবার, আল্লাহুম্মা হাজা মিনকা ওয়া লাকা, আল্লাহুম্মা তাকাব্বাল মিন্নি।",
        body: "আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ। হে আল্লাহ, এটি আপনার পক্ষ থেকে এবং আপনারই সন্তুষ্টির জন্য। হে আল্লাহ, আমার পক্ষ থেকে কবুল করুন।"
      }
    ]
  },
  {
    category: "ঈদুল আযহা নামাজের নিয়ম",
    isStepList: true,
    items: [
      {
        title: "ঈদের নামাজের সংক্ষিপ্ত নিয়ম",
        ref: "ফাতাওয়ায়ে শামী",
        steps: [
          "নিয়ত: আমি ইমামের পিছনে ২ রাকাত ওয়াজিব নামাজ ৬ অতিরিক্ত তকবিরের সাথে আদায় করছি।",
          "প্রথম রাকাত: তকবিরে তাহরিমা বলে হাত বেঁধে ছানা পড়া। এরপর ইমামের সাথে ৩টি অতিরিক্ত তকবির বলা। ১ম ও ২য় তকবিরে হাত ছেড়ে দেওয়া, ৩য় তকবিরে হাত বাঁধা।",
          "দ্বিতীয় রাকাত: সুরা পাঠের পর রুকুর আগে অতিরিক্ত ৩টি তকবির বলা। প্রতিবার কান পর্যন্ত হাত তুলে ছেড়ে দেওয়া। ৪র্থ তকবিরে হাত না তুলে রুকুতে যাওয়া।",
          "সালাম ও খুতবা: নামাজ শেষ করে ইমামের খুতবা মনযোগ দিয়ে শোনা ওয়াজিব।"
        ]
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
                    ) : section.isStepList ? (
                      <div className="space-y-4">
                        {card.steps?.map((step, stidx) => (
                          <div key={stidx} className="flex gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center text-[10px] font-black">
                              {stidx + 1}
                            </div>
                            <p className="text-sm text-primary/70 leading-relaxed">{step}</p>
                          </div>
                        ))}
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
