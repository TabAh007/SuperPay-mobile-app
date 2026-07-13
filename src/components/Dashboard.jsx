import React, { useState } from 'react';
import { Bell, Percent, ArrowUpRight, ArrowDownLeft, ArrowUpDown, Zap, Wifi, Droplet, Wallet, Shield, ShoppingBag, Tag, Activity, ChevronRight, X } from 'lucide-react';

export default function Dashboard({ balance, transactions, onNavigate, onPayBill }) {
  const [activeService, setActiveService] = useState(null);
  const [billAmount, setBillAmount] = useState('');
  const [billSuccess, setBillSuccess] = useState(false);

  const services = [
    { id: 'electricity', label: 'Electricity', icon: <Zap size={22} className="text-yellow-500" />, bg: 'bg-yellow-50 dark:bg-yellow-950/30', colorStyle: { color: '#eab308', backgroundColor: 'rgba(234,179,8,0.1)' } },
    { id: 'internet', label: 'Internet', icon: <Wifi size={22} className="text-orange-500" />, bg: 'bg-orange-50 dark:bg-orange-950/30', colorStyle: { color: '#f97316', backgroundColor: 'rgba(249,115,22,0.1)' } },
    { id: 'water', label: 'Water', icon: <Droplet size={22} className="text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-950/30', colorStyle: { color: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)' } },
    { id: 'ewallet', label: 'E-Wallet', icon: <Wallet size={22} className="text-purple-500" />, bg: 'bg-purple-50 dark:bg-purple-950/30', colorStyle: { color: '#a855f7', backgroundColor: 'rgba(168,85,247,0.1)' } },
    { id: 'assurance', label: 'Assurance', icon: <Shield size={22} className="text-emerald-500" />, bg: 'bg-emerald-50 dark:bg-emerald-950/30', colorStyle: { color: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)' } },
    { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={22} className="text-amber-500" />, bg: 'bg-amber-50 dark:bg-amber-950/30', colorStyle: { color: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)' } },
    { id: 'deals', label: 'Deals', icon: <Tag size={22} className="text-pink-500" />, bg: 'bg-pink-50 dark:bg-pink-950/30', colorStyle: { color: '#ec4899', backgroundColor: 'rgba(236,72,153,0.1)' } },
    { id: 'health', label: 'Health', icon: <Activity size={22} className="text-green-500" />, bg: 'bg-green-50 dark:bg-green-950/30', colorStyle: { color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)' } },
  ];

  const handlePayBillSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(billAmount);
    if (amt > 0 && amt <= balance) {
      onPayBill(activeService.label, amt);
      setBillSuccess(true);
      setTimeout(() => {
        setBillSuccess(false);
        setActiveService(null);
        setBillAmount('');
      }, 1500);
    }
  };

  return (
    <div className="phone-viewport no-scrollbar pb-24 px-5 pt-3">
      {/* Header Profile Row */}
      <div className="header-container mb-6">
        <div className="d-flex align-center gap-3">
          <div className="profile-avatar-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Profile" 
              className="profile-avatar"
            />
            <div className="profile-online-badge" />
          </div>
          <div>
            <div className="d-flex align-center gap-1">
              <span className="form-input-label" style={{ fontSize: '9px', fontWeight: '800' }}>Good Morning</span>
              <span>👋</span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>Andrew Ainsley</h3>
          </div>
        </div>

        {/* Header Icons */}
        <div className="d-flex align-center gap-2-5">
          <button className="btn-icon clickable">
            <Percent size={18} />
          </button>
          <div className="relative">
            <button className="btn-icon clickable">
              <Bell size={18} />
            </button>
            <span className="absolute" style={{ top: '4px', right: '4px', width: '8px', height: '8px', backgroundColor: 'var(--error)', borderRadius: '9999px' }} />
          </div>
        </div>
      </div>

      {/* Wallet Card Widget */}
      <div className="wallet-card mb-6">
        <div className="wallet-card-overlay" />
        <div className="wallet-card-glow" />
        
        <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card Top Details */}
          <div className="d-flex justify-between align-start">
            <div>
              <p style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.5px' }}>Andrew Ainsley</p>
              <p style={{ fontSize: '12px', fontFamily: 'monospace', letterSpacing: '1px', marginTop: '4px' }}>•••• •••• •••• 3749</p>
            </div>
            <div className="d-flex flex-col align-end">
              <span className="card-brand-logo">VISA</span>
              <div className="card-logo-circles">
                <div className="card-circle-red" />
                <div className="card-circle-orange" />
              </div>
            </div>
          </div>

          {/* Balance Display */}
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', opacity: 0.8, fontWeight: '750', letterSpacing: '0.5px' }}>Your balance</p>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '4px 0 0 0', letterSpacing: '-0.5px' }}>
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
        </div>

        {/* Bottom Floating Menu */}
        <div className="action-bar-container light-theme-nav dark-theme-nav">
          <button onClick={() => onNavigate('transfer')} className="action-bar-btn clickable">
            <div className="action-circle-icon" style={{ backgroundColor: 'var(--primary)' }}>
              <ArrowUpRight size={13} className="stroke-[3]" />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)' }}>Transfer</span>
          </button>
          
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />
          
          <button onClick={() => setActiveService({ label: 'Request Money' })} className="action-bar-btn clickable">
            <div className="action-circle-icon" style={{ backgroundColor: 'var(--success)' }}>
              <ArrowDownLeft size={13} className="stroke-[3]" />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)' }}>Request</span>
          </button>
          
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />

          <button onClick={() => onNavigate('statistics')} className="action-bar-btn clickable">
            <div className="action-circle-icon" style={{ backgroundColor: '#f59e0b' }}>
              <ArrowUpDown size={13} className="stroke-[3]" />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)' }}>In & Out</span>
          </button>
        </div>
      </div>

      <div style={{ height: '8px' }} />

      {/* Services Grid Section */}
      <div className="mb-6">
        <div className="d-flex justify-between align-center mb-4">
          <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>Services</h4>
          <button className="clickable" style={{ color: 'var(--primary)', border: 'none', background: 'transparent', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center' }}>
            <span>See All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="services-grid-container">
          {services.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setActiveService(svc)}
              className="service-btn clickable"
            >
              <div className="service-icon-circle" style={svc.colorStyle}>
                {svc.icon}
              </div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                {svc.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div>
        <div className="d-flex justify-between align-center mb-4">
          <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>Transaction History</h4>
          <button 
            onClick={() => onNavigate('card')}
            className="clickable"
            style={{ color: 'var(--primary)', border: 'none', background: 'transparent', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center' }}
          >
            <span>See All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="d-flex flex-col gap-3">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="d-flex align-center gap-3">
                <div className="transaction-avatar" style={{ 
                  backgroundColor: tx.type === 'deposit' ? 'var(--success-light)' : 'var(--primary-light)',
                  color: tx.type === 'deposit' ? 'var(--success)' : 'var(--primary)'
                }}>
                  {tx.icon}
                </div>
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: '800', margin: 0 }}>{tx.title}</h5>
                  <p style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: '600', margin: '2px 0 0 0' }}>{tx.category} • {tx.date}</p>
                </div>
              </div>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: '900',
                color: tx.type === 'deposit' ? 'var(--success)' : 'var(--text-primary)'
              }}>
                {tx.type === 'deposit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Sheet Modal Overlay */}
      {activeService && (
        <div className="bottom-sheet-backdrop animate-fade-in">
          <div className="bottom-sheet-content animate-slide-up">
            <div className="bottom-sheet-handle" />
            
            <div className="d-flex justify-between align-center mb-5">
              <div className="d-flex align-center gap-3">
                <div className="service-icon-circle" style={activeService.colorStyle || { backgroundColor: 'var(--primary-light)' }}>
                  {activeService.icon || <Wallet size={20} className="text-primary" />}
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: '800', margin: 0 }}>{activeService.label}</h4>
              </div>
              <button 
                onClick={() => { setActiveService(null); setBillAmount(''); }}
                className="btn-icon clickable"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
              </button>
            </div>

            {activeService.id === 'electricity' || activeService.id === 'internet' || activeService.id === 'water' ? (
              /* Bill Pay */
              <form onSubmit={handlePayBillSubmit} className="d-flex flex-col gap-4">
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', lineHeight: '1.5' }}>
                  Pay your monthly {activeService.label} utilities bill instantly. Simply enter the payment amount below.
                </p>
                
                <div className="form-input-container">
                  <label className="form-input-label">Amount to Pay</label>
                  <div className="d-flex align-center gap-1" style={{ marginTop: '4px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '800' }}>$</span>
                    <input 
                      type="number"
                      placeholder="0.00"
                      min="1"
                      max={balance}
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      required
                      className="form-input-field"
                      style={{ fontSize: '20px' }}
                    />
                  </div>
                </div>

                <div className="d-flex justify-between align-center" style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                  <span>Available Balance:</span>
                  <span style={{ color: 'var(--text-primary)' }}>${balance.toFixed(2)}</span>
                </div>

                {billSuccess ? (
                  <div style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', border: '1px solid var(--success)', padding: '12px', borderRadius: '16px', textAlign: 'center', fontWeight: '700', fontSize: '12px' }}>
                    Payment Successful!
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={!billAmount || parseFloat(billAmount) > balance}
                    className="btn-primary w-full clickable"
                    style={{ padding: '14px' }}
                  >
                    Pay Bill Now
                  </button>
                )}
              </form>
            ) : activeService.label === 'Request Money' ? (
              /* Request Money QR */
              <div className="d-flex flex-col gap-4">
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', lineHeight: '1.5' }}>
                  Request payments from your contacts. Copy your personal request link or show your QR code.
                </p>
                
                <div style={{ width: '130px', height: '130px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', color: 'var(--text-primary)', opacity: 0.8 }} fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M10 15 V10 H15 M25 10 H30 V15 M30 25 V30 H25 M15 30 H10 V25" />
                    <path d="M70 15 V10 H75 M85 10 H90 V15 M90 25 V30 H85 M75 30 H70 V25" />
                    <path d="M10 75 V70 H15 M25 70 H30 V75 M30 85 V90 H25 M15 90 H10 V85" />
                    <path d="M45 10 H55 V20 M45 45 H55 V55 M10 45 H20 V50 M45 80 H60 V90 M80 45 H90 V60" strokeDasharray="3 3" />
                    <rect x="42" y="28" width="8" height="8" fill="currentColor" />
                    <rect x="62" y="62" width="10" height="10" fill="currentColor" />
                  </svg>
                </div>

                <p className="text-center font-bold" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-primary)' }}>
                  allpay.me/andrew_ainsley
                </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText('allpay.me/andrew_ainsley');
                    alert('Link copied!');
                    setActiveService(null);
                  }}
                  className="btn-primary w-full clickable"
                  style={{ padding: '14px' }}
                >
                  Copy Request Link
                </button>
              </div>
            ) : (
              /* Default maintenance */
              <div className="d-flex flex-col gap-4">
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', lineHeight: '1.5' }}>
                  The {activeService.label} service portal is temporarily undergoing standard maintenance. Please check back later.
                </p>
                <button
                  onClick={() => setActiveService(null)}
                  className="btn-primary w-full clickable"
                  style={{ padding: '14px' }}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
