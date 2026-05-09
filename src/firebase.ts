import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { AppState } from './types';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Error handle helper for Firestore
export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: any, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Logic to Save App State
export async function saveUserData(userId: string, state: AppState) {
  if (!userId) return;
  const path = `users/${userId}/data/config`;
  try {
    await setDoc(doc(db, path), {
      ...state,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, 'write', path);
  }
}

// Logic to Save Payment
export async function savePayment(userId: string, txnId: string, amount: number) {
  const path = `payments/${txnId}`;
  try {
    await setDoc(doc(db, path), {
      txnId,
      userId,
      amount,
      timestamp: serverTimestamp(),
      status: 'pending'
    });
  } catch (error) {
    handleFirestoreError(error, 'write', path);
  }
}

// Subscribe to Config Changes (to auto-restore)
export function subscribeToUserData(userId: string, onUpdate: (data: Partial<AppState>) => void) {
  const path = `users/${userId}/data/config`;
  return onSnapshot(doc(db, path), (snapshot) => {
    if (snapshot.exists()) {
      onUpdate(snapshot.data() as Partial<AppState>);
    }
  }, (error) => {
    handleFirestoreError(error, 'get', path);
  });
}
