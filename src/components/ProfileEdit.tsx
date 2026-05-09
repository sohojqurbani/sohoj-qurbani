import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, updateProfile } from 'firebase/auth';
import { Camera, Save, RotateCcw, Check, ChevronLeft, X } from 'lucide-react';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface ProfileEditProps {
  user: User;
  onBack: () => void;
  onUpdate: () => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({ user, onBack, onUpdate }) => {
  const [name, setName] = useState(user.displayName || '');
  const [photo, setPhoto] = useState<string | null>(user.photoURL);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 400, height: 400 } 
      });
      setStream(s);
      setIsCapturing(true);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      
      let errorMessage = "ক্যামেরা চালু করা সম্ভব হয়নি।";
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = "ক্যামেরা ব্যবহারের অনুমতি দেওয়া হয়নি। আপনার ব্রাউজার সেটিংস থেকে ক্যামেরা পারমিশন 'Allow' করে দিন এবং পৃষ্ঠাটি রিফ্রেশ করুন।";
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = "আপনার ডিভাইসে কোনো ক্যামেরা খুঁজে পাওয়া যায়নি। দয়া করে ক্যামেরা সংযুক্ত করুন।";
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = "ক্যামেরাটি অন্য কোনো অ্যাপ্লিকেশন বা ট্যাব বর্তমানে ব্যবহার করছে। সেটি বন্ধ করে আবার চেষ্টা করুন।";
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = "আপনার ক্যামেরার রেজোলিউশন আমাদের সিস্টেমের সাথে মিলছে না।";
      } else if (err.name === 'SecurityError') {
        errorMessage = "নিরাপত্তাজনিত কারণে (Insecure Context) আপনার ব্রাউজারে ক্যামেরা ব্যবহারের সুবিধা বন্ধ রয়েছে। অনুগ্রহ করে HTTPS ব্যবহার করুন।";
      } else if (err.name === 'AbortError') {
        errorMessage = "ক্যামেরা খোলার প্রক্রিয়াটি ব্যাহত হয়েছে। দয়া করে আবার চেষ্টা করুন।";
      } else if (err instanceof TypeError) {
        errorMessage = "আপনার ব্রাউজারটি আধুনিক ক্যামেরা সাপোর্ট করছে না অথবা আপনি একটি অনিরাপদ (Non-HTTPS) সংযোগ ব্যবহার করছেন।";
      }

      setError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("আপনার নাম লিখুন");
      return;
    }
    setError(null);
    setIsSaving(true);
    try {
      // Update Auth Profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photo
      });

      // Update Firestore User Profile (optional but good for persistence)
      const userRef = doc(db, 'users', user.uid, 'profile', 'info');
      await setDoc(userRef, {
        displayName: name,
        photoURL: photo,
        phoneNumber: user.phoneNumber,
        updatedAt: serverTimestamp()
      }, { merge: true });

      onUpdate();
      onBack();
    } catch (err) {
      console.error("Save error:", err);
      setError("তথ্য সেভ করতে সমস্যা হয়েছে।");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-soft border border-primary/5 p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-surface rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-primary/40" />
          </button>
          <h2 className="text-2xl font-serif font-bold text-primary">প্রোফাইল এডিট</h2>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent/20 bg-surface flex items-center justify-center relative">
              {photo ? (
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-primary/20 text-4xl">📸</div>
              )}
              
              {isCapturing && (
                <div className="absolute inset-0 z-20">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {!isCapturing ? (
              <button 
                onClick={startCamera}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                <Camera className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex gap-2 absolute -bottom-6 left-1/2 -translate-x-1/2">
                <button 
                  onClick={capturePhoto}
                  className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <Check className="w-6 h-6" />
                </button>
                <button 
                  onClick={stopCamera}
                  className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-bold mt-4">
            প্রোফাইল ছবি পরিবর্তন
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-2 block ml-1">আপনার নাম</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="নাম লিখুন"
              className="w-full bg-surface p-4 rounded-2xl border-none font-bold text-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] mb-2 block ml-1">মোবাইল নম্বর</label>
            <div className="w-full bg-surface p-4 rounded-2xl font-mono font-bold text-primary/40 border-none">
              {user.phoneNumber}
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          <button 
            onClick={handleSave}
            disabled={isSaving || isCapturing}
            className="w-full bg-primary text-white p-5 rounded-2xl font-black text-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
          >
            {isSaving ? "সেভ হচ্ছে..." : "তথ্য সেভ করুন"}
            {!isSaving && <Save className="w-5 h-5" />}
          </button>

          {photo && (
            <button 
              onClick={() => setPhoto(user.photoURL)}
              className="w-full py-2 text-primary/30 text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3 h-3" />
              ছবি বাতিল করুন
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
