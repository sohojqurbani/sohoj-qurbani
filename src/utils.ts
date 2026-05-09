/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shareholder } from './types';

export function generateUID(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const BENGALI_NUMBERS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  return num
    .toString()
    .split('')
    .map(digit => {
      const d = parseInt(digit, 10);
      return isNaN(d) ? digit : BENGALI_NUMBERS[d];
    })
    .join('');
}

export function formatCurrency(amount: number): string {
  const formatted = amount.toLocaleString('en-IN');
  return `৳${toBengaliNumber(formatted)}`;
}

export function formatWeight(weight: number): string {
  const formatted = weight.toFixed(1);
  return `${toBengaliNumber(formatted)} কেজি`;
}

export function calculateTotalCost(state: {
  animalPrice: number;
  butcherCost: number;
  transportCost: number;
  packagingCost: number;
  otherCost: number;
  shareholders: Shareholder[];
}): number {
  return (
    state.animalPrice +
    state.butcherCost +
    state.transportCost +
    state.packagingCost +
    state.otherCost
  );
}

export function calculateMeatVolume(liveWeight: number, meatRate: number): number {
  return (liveWeight * meatRate) / 100;
}
