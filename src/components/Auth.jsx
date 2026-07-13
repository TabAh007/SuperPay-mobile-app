import React, { useState } from 'react';
import { Fingerprint, Lock, ChevronLeft, Delete } from 'lucide-react';

export default function Auth({ onAuthSuccess }) {
  const [pin, setPin] = useState('');
  const [step, setStep] = useState('create-pin'); // 'create-pin' | 'confirm-pin' | 'biometrics'
  const [createdPin, setCreatedPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [bioScanning, setBioScanning] = useState(false);
  const [bioSuccess, setBioSuccess] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg('');

      if (newPin.length === 4) {
        setTimeout(() => {
          if (step === 'create-pin') {
            setCreatedPin(newPin);
            setPin('');
            setStep('confirm-pin');
          } else if (step === 'confirm-pin') {
            if (newPin === createdPin) {
              setPin('');
              setStep('biometrics');
            } else {
              setPin('');
              setErrorMsg('PIN codes do not match. Try again.');
            }
          }
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleBioStart = () => {
    setBioScanning(true);
    setBioSuccess(false);

    setTimeout(() => {
      setBioScanning(false);
      setBioSuccess(true);
      setTimeout(() => {
        onAuthSuccess(createdPin);
      }, 800);
    }, 2000);
  };

  const goBack = () => {
    if (step === 'confirm-pin') {
      setStep('create-pin');
      setPin('');
    } else if (step === 'biometrics') {
      setStep('confirm-pin');
      setPin('');
    }
  };

  return (
    <div className="phone-viewport d-flex flex-col justify-between h-full p-6 animate-fade-in">
      {/* Top Header */}
      <div className="d-flex align-center h-8" style={{ minHeight: '32px' }}>
        {(step === 'confirm-pin' || step === 'biometrics') ? (
          <button onClick={goBack} className="btn-icon clickable" style={{ border: 'none', width: '32px', height: '32px' }}>
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div style={{ width: '32px' }} />
        )}
        <span className="flex-1 text-center font-bold text-base text-slate-800 dark:text-white" style={{ fontSize: '16px', fontWeight: '800' }}>Security Setup</span>
        <div style={{ width: '32px' }} />
      </div>

      {step !== 'biometrics' ? (
        <>
          {/* PIN Setup Info */}
          <div className="text-center" style={{ margin: 'auto 0' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '18px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Lock size={26} className="text-primary" />
            </div>
            
            <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              {step === 'create-pin' ? 'Create a Secure PIN' : 'Confirm Your PIN'}
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '0 16px', lineHeight: '1.6', marginBottom: '32px' }}>
              {step === 'create-pin' 
                ? 'Choose a 4-digit PIN passcode to lock and secure your wallet account.' 
                : 'Please enter the same 4-digit passcode to verify.'}
            </p>

            {/* PIN Dots indicators */}
            <div className="d-flex justify-center align-center gap-5 mb-2">
              {[0, 1, 2, 3].map((idx) => (
                <div 
                  key={idx}
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '9999px', 
                    border: '2px solid var(--border-focus)',
                    backgroundColor: idx < pin.length ? 'var(--primary)' : 'transparent',
                    transform: idx < pin.length ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            {errorMsg && (
              <p className="animate-pulse-custom" style={{ color: 'var(--error)', fontSize: '11px', fontWeight: '600', marginTop: '12px' }}>
                {errorMsg}
              </p>
            )}
          </div>

          {/* Numeric Keypad */}
          <div className="pin-grid mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                className="keypad-btn-circle clickable"
              >
                {num}
              </button>
            ))}
            
            <div style={{ width: '64px' }} />
            
            <button
              onClick={() => handleKeyPress('0')}
              className="keypad-btn-circle clickable"
            >
              0
            </button>
            
            <button
              onClick={handleBackspace}
              className="clickable"
              style={{ border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
            >
              <Delete size={22} />
            </button>
          </div>
        </>
      ) : (
        /* Fingerprint setup */
        <div className="flex-1 d-flex flex-col justify-between" style={{ margin: 'auto 0', padding: '24px 0' }}>
          <div className="text-center">
            <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              Enable Biometrics
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '0 16px', lineHeight: '1.6' }}>
              Use fingerprint recognition for faster, more secure access to your e-wallet.
            </p>
          </div>

          {/* Biometrics pad */}
          <div className="d-flex flex-col align-center justify-center" style={{ margin: '32px 0' }}>
            <button
              onMouseDown={handleBioStart}
              onTouchStart={handleBioStart}
              className="clickable"
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid ' + (bioSuccess ? 'var(--success)' : bioScanning ? 'var(--primary)' : 'var(--border-color)'),
                backgroundColor: bioSuccess ? 'var(--success-light)' : bioScanning ? 'rgba(36,107,253,0.08)' : 'var(--bg-surface)',
                color: bioSuccess ? 'var(--success)' : bioScanning ? 'var(--primary)' : 'var(--text-tertiary)',
                position: 'relative',
                transition: 'all 0.3s'
              }}
            >
              {bioScanning && (
                <div 
                  className="absolute"
                  style={{
                    inset: '6px',
                    border: '2px dashed var(--primary)',
                    borderRadius: '9999px',
                    animation: 'spin 4s linear infinite'
                  }}
                />
              )}
              <Fingerprint size={60} style={{ transform: bioScanning ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.3s' }} />
            </button>
            
            <p style={{ marginTop: '24px', fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {bioSuccess 
                ? 'Authentication Successful!' 
                : bioScanning 
                  ? 'Scanning... Hold your finger' 
                  : 'Press and Hold to authenticate'}
            </p>
          </div>

          {/* Skip */}
          <button 
            onClick={() => onAuthSuccess(createdPin)}
            className="clickable"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '13px'
            }}
          >
            Skip for Now
          </button>
        </div>
      )}
    </div>
  );
}
