/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { toBengaliNumber } from '../utils';

const REFERENCES = [
  {
    arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
    source: `সূরা কাউসার: ${toBengaliNumber(2)}`,
    meaning: "তোমার রবের উদ্দেশ্যে নামাজ পড়ো এবং কুরবানি করো।"
  },
  {
    arabic: "لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ",
    source: `সূরা হজ্জ: ${toBengaliNumber(37)}`,
    meaning: "আল্লাহর কাছে কুরবানির গোশত বা রক্ত পৌঁছায় না, বরং পৌঁছায় তোমাদের তাকওয়া।"
  },
  {
    arabic: "وَلاَ تُعْطِ فِي جِزَارَتِهَا شَيْئًا",
    source: `বুখারি: ${toBengaliNumber(1716)}, মুসলিম: ${toBengaliNumber(1317)}`,
    meaning: "কসাইকে পারিশ্রমিক হিসেবে কুরবানির কোনো অংশ দেওয়া যাবে না।"
  },
  {
    arabic: "ضَحَّى النَّبِيُّ ﷺ بِكَبْشَيْنِ أَمْلَحَيْنِ",
    source: `বুখারি: ${toBengaliNumber(5558)}`,
    meaning: "নবী ﷺ দুটি সাদা-কালো মিশ্রিত দুম্বা দিয়ে কুরবানি করেছেন।"
  },
  {
    arabic: "مَنْ كَانَ لَهُ سَعَةٌ وَلَمْ يُضَحِّ فَلَا يَقْرَبَنَّ مُصَلَّانَا",
    source: `ইবনে মাজাহ: ${toBengaliNumber(3123)}`,
    meaning: "যার সামর্থ্য আছে অথচ কুরবানি করেনি, সে যেন আমাদের ঈদগাহে না আসে।"
  },
  {
    arabic: "فَكُلُوا وَادَّخِرُوا وَتَصَدَّقُوا",
    source: `মুসলিম: ${toBengaliNumber(1972)}`,
    meaning: "তোমরা (কুরবানির গোশত) খাও, সংরক্ষণ করো এবং সদকা করো।"
  },
  {
    arabic: "مَا عَمِلَ آدَمِیٌّ مِنْ عَمَلٍ یَوْمَ النَّحْرِ أَحَبَّ إِلَی اللَّهِ مِنْ إِهْرَاقِ الدَّمِ",
    source: `তিরমিজি: ${toBengaliNumber(1493)}`,
    meaning: "কুরবানির দিনে রক্ত প্রবাহিত করার চেয়ে (কুরবানি করা) প্রিয় কোনো আমল আল্লাহর কাছে নেই।"
  },
  {
    arabic: "وَفَدَيْنَاهُ بِذِبْحٍ عَظِيمٍ",
    source: `সূরা আস-সাফফাত: ${toBengaliNumber(107)}`,
    meaning: "আমরা এক মহান কুরবানির বিনিময়ে তাকে মুক্ত করলাম।"
  },
  {
    arabic: "الْبَقَرَةُ عَنْ سَبْعَةٍ وَالْجَزُورُ عَنْ سَبْعَةٍ",
    source: `মুসলিম: ${toBengaliNumber(1318)}`,
    meaning: "একটি গাভী সাত জনের পক্ষ থেকে এবং একটি উট সাত জনের পক্ষ থেকে কুরবানি করা যায়।"
  }
];

export const IslamicReferences: React.FC = () => {
  return (
    <section className="relative py-8 md:py-12 px-4 md:px-6 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs font-medium tracking-[0.2em] uppercase text-primary/40 mb-4"
            >
              Divine Guidance
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-primary leading-tight"
            >
              Qur'anic <span className="italic">Wisdom</span> & Hadith
            </motion.h2>
          </div>
          <motion.button 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="px-8 py-3 rounded-full bg-primary text-white text-sm font-bold group flex items-center gap-2"
          >
            See All References
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform">
               <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                 <path d="M5 12H19M19 12L12 5M19 12L12 19" />
               </svg>
            </div>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REFERENCES.map((ref, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[32px] p-7 border border-[#064e3b]/20 shadow-soft hover:shadow-xl transition-shadow group h-full flex flex-col justify-between"
            >
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 bg-primary/5 rounded-full text-primary/60">
                    {ref.source}
                  </span>
                </div>
                <div className="arabic text-primary text-2xl md:text-3xl leading-relaxed mb-4 font-medium italic group-hover:text-accent-dark transition-colors">
                  {ref.arabic}
                </div>
              </div>
              <div>
                <div className="w-10 h-[1px] bg-primary/10 mb-4" />
                <p className="text-primary-light/70 text-base leading-relaxed font-light italic">
                  "{ref.meaning}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
