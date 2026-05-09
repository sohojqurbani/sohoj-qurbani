/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionNiyyahProps {
  confirmed: boolean;
  onUpdate: (confirmed: boolean) => void;
}

export const SectionNiyyah: React.FC<SectionNiyyahProps> = ({
  confirmed,
  onUpdate
}) => {
  return (
    <div className={`p-4 rounded-[32px] transition-all border-2 mb-4 ${confirmed ? 'bg-accent/5 border-accent/20' : 'bg-red-50/50 border-red-100 animate-pulse'}`}>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center shrink-0">
          <input 
            type="checkbox" 
            id="niyyah-top"
            className="w-8 h-8 rounded-full accent-primary cursor-pointer border-2 border-primary/10"
            checked={confirmed}
            onChange={(e) => onUpdate(e.target.checked)}
          />
        </div>
        <label htmlFor="niyyah-top" className={`text-base font-serif italic cursor-pointer select-none leading-tight ${confirmed ? 'text-primary' : 'text-red-500/70'}`}>
          আমি নিশ্চিত করছি যে এই কুরবানী একমাত্র আল্লাহ তা'আলার সন্তুষ্টির জন্য
        </label>
      </div>
    </div>
  );
};
