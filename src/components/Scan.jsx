import React, { useState, useEffect } from 'react';
import { ChevronLeft, Zap, Image, CheckCircle2 } from 'lucide-react';

export default function Scan({ balance, onBack, onScanComplete }) {
  const [step, setStep] = useState('scanning'); // 'scanning' | 'confirm' | 'success'
  const [flashOn, setFlashOn] = useState(false);
  const [scannedMerchant] = useState('Starbucks Coffee');
  const [scannedAmount] = useState(6.80);

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => {
        setStep('confirm');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handlePayConfirm = () => {
    if (balance >= scannedAmount) {
      onScanComplete(scannedMerchant, scannedAmount);
      setStep('success');
    } else {
      alert('Insufficient funds to complete this payment.');
      setStep('scanning');
    }
  };

  return (
    <div className="phone-viewport d-flex flex-col justify-between h-full text-white" style={{ backgroundColor: '#0f172a' }}>
      {/* Header */}
      <div className="d-flex justify-between align-center p-5" style={{ zIndex: 100, background: 'linear-gradient(to bottom, rgba(15,23,42,0.9), transparent)' }}>
        <button onClick={onBack} className="clickable" style={{ border: 'none', background: 'rgba(255,255,255,0.1)', color: '#ffffff', width: '36px', height: '36px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} />
        </button>
        <h4 style={{ fontSize: '12px', fontWeight: '800', trackingSpace: '1.5px', textTransform: 'uppercase', margin: 0 }}>Scan QR Code</h4>
        <button 
          onClick={() => setFlashOn(!flashOn)}
          className="clickable"
          style={{ 
            border: 'none', 
            background: flashOn ? '#f59e0b' : 'rgba(255,255,255,0.1)', 
            color: '#ffffff', 
            width: '36px', 
            height: '36px', 
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Zap size={20} />
        </button>
      </div>

      {step === 'scanning' && (
        <>
          {/* Scanning Box */}
          <div className="flex-1 d-flex flex-col align-center justify-center px-6" style={{ margin: 'auto 0' }}>
            <div className="scan-box-dashed">
              <div className="scan-corner-tl" />
              <div className="scan-corner-tr" />
              <div className="scan-corner-bl" />
              <div className="scan-corner-br" />
              
              {/* Laser line */}
              <div 
                style={{ 
                  position: 'absolute',
                  width: '90%', 
                  height: '3px', 
                  backgroundColor: 'var(--primary)', 
                  borderRadius: '9999px', 
                  left: '5%',
                  boxShadow: '0 0 10px #246BFD',
                  animation: 'scannerLaser 2s infinite ease-in-out'
                }} 
              />
              
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', pointerEvents: 'none' }}>
                Align QR Code
              </p>
            </div>
            
            <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: '#94a3b8', padding: '0 24px', lineHeight: '1.6' }}>
              Scan invoice QR codes, vendor codes, or merchant checkouts to make payments instantly.
            </p>
          </div>

          {/* Bottom Upload button */}
          <div className="p-6 d-flex justify-center" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }}>
            <button 
              className="clickable"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '24px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '800'
              }}
            >
              <Image size={16} />
              <span>Upload from Gallery</span>
            </button>
          </div>
        </>
      )}

      {step === 'confirm' && (
        <div className="bottom-sheet-backdrop animate-fade-in" style={{ zIndex: 60 }}>
          <div className="bottom-sheet-content animate-slide-up" style={{ color: 'var(--text-primary)' }}>
            <div className="bottom-sheet-handle" />
            
            <h4 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 4px 0', textCenter: 'center', textAlign: 'center' }}>Confirm QR Payment</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>Starbucks Invoice checkout detected</p>

            <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Amount Due</span>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-primary)', marginTop: '6px' }}>${scannedAmount.toFixed(2)}</h2>
              <div style={{ height: '1px', backgroundColor: 'var(--border-color)', width: '100%', margin: '16px 0' }} />
              <div className="d-flex justify-between align-center" style={{ width: '100%', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Merchant</span>
                <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{scannedMerchant}</span>
              </div>
            </div>

            <div className="d-flex justify-between align-center" style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '24px' }}>
              <span>Available Balance:</span>
              <span style={{ color: 'var(--text-primary)' }}>${balance.toFixed(2)}</span>
            </div>

            <div className="d-flex gap-4">
              <button 
                onClick={() => setStep('scanning')}
                className="clickable flex-1"
                style={{
                  padding: '14px',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: '800'
                }}
              >
                Decline
              </button>
              <button 
                onClick={handlePayConfirm}
                className="btn-primary flex-1 clickable"
                style={{ padding: '14px' }}
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="absolute d-flex flex-col justify-between p-6 animate-fade-in text-slate-800 dark:text-white" style={{ inset: 0, backgroundColor: 'var(--bg-phone)', zIndex: 70 }}>
          <div className="d-flex justify-end">
            <button onClick={onBack} className="btn-icon clickable" style={{ width: '36px', height: '36px' }}>
              ✕
            </button>
          </div>

          <div className="text-center" style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '9999px', backgroundColor: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', marginBottom: '24px' }}>
              <CheckCircle2 size={56} className="stroke-[1.5]" />
            </div>
            
            <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Payment Successful!</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '0 16px', lineHeight: '1.5' }}>
              Your payment of ${scannedAmount.toFixed(2)} to {scannedMerchant} was completed.
            </p>
          </div>

          <button onClick={onBack} className="btn-primary w-full clickable">
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
