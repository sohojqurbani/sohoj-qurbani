/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Shareholder {
  id: string;
  name: string;
  shares: number;
  mobile: string;
}

export interface DistributionItem {
  id: string;
  name: string;
  amount: number;
}

export interface Payment {
  amount: number;
  method?: string;
  note?: string;
}

export interface AppState {
  unlocked: boolean;
  uid: string;
  niyyahConfirmed: boolean;
  animalType: 'cow' | 'goat' | 'camel';
  shareholders: Shareholder[];
  animalPrice: number;
  butcherCost: number;
  transportCost: number;
  packagingCost: number;
  otherCost: number;
  liveWeight: number;
  meatRate: number;
  distributionFamily: number;
  distributionRelative: number;
  distributionSadaqah: number;
  meatPerPacket: number;
  manualTotalMeat: number;
  yieldLiveWeight: number;
  yieldActualMeat: number;
  distributionItems: DistributionItem[];
  payments: Record<string, Payment>;
}

export const INITIAL_STATE: AppState = {
  unlocked: false,
  uid: '',
  niyyahConfirmed: false,
  animalType: 'cow',
  shareholders: [{ id: '1', name: '', shares: 0, mobile: '' }],
  animalPrice: 0,
  butcherCost: 0,
  transportCost: 0,
  packagingCost: 0,
  otherCost: 0,
  liveWeight: 0,
  meatRate: 42,
  distributionFamily: 0,
  distributionRelative: 0,
  distributionSadaqah: 0,
  meatPerPacket: 0,
  manualTotalMeat: 0,
  yieldLiveWeight: 0,
  yieldActualMeat: 0,
  distributionItems: [{ id: '1', name: '', amount: 0 }],
  payments: {},
};

export const COLORS = {
  primary: '#6366f1',
  darkGreen: '#4f46e5',
  mediumGreen: '#818cf8',
  lightGreenBg: '#f8fafc',
  gold: '#f472b6',
  goldLight: '#fdf2f8',
  goldDark: '#db2777',
  premiumPurple: '#a855f7',
  errorRed: '#ef4444',
  amberWarning: '#f59e0b',
};
