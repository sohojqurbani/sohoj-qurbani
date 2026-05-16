const handleUnlockClick = () => {
  if (!txnId || txnId.length < 6) {
    setError('সঠিক ট্রানজেকশন আইডি দিন (কমপক্ষে ৬ অক্ষর)');
    return;
  }
  setError('');
  setIsProcessing(true);
  
  // Save to localStorage for manual verification
  const pendingPayments = JSON.parse(
    localStorage.getItem('sq_pending_payments') || '[]'
  );
  pendingPayments.push({
    txnId: txnId,
    uid: uid || 'unknown',
    timestamp: new Date().toISOString(),
    amount: 19,
    status: 'pending'
  });
  localStorage.setItem(
    'sq_pending_payments', 
    JSON.stringify(pendingPayments)
  );

  setTimeout(() => {
    setIsProcessing(false);
    // Show waiting message instead of unlocking
    setError('');
    setStep('benefits');
    alert(
      'আপনার পেমেন্ট রিকোয়েস্ট পাঠানো হয়েছে! ✅\n\n' +
      '২-৫ মিনিটের মধ্যে আনলক হবে।\n' +
      'সমস্যায়: +8801339959591'
    );
    onClose();
  }, 1500);
};