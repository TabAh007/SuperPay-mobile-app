import React, { useState } from 'react';
import { Search, ChevronLeft, Delete, Share2, CheckCircle2, Lock } from 'lucide-react';

export default function Transfer({ balance, userPin, onBack, onTransferComplete }) {
  const [step, setStep] = useState('contacts'); // 'contacts' | 'amount' | 'pin' | 'success'
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState('0');
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  const contacts = [
    { id: 1, name: 'Myna Jenkins', phone: '+1 (555) 234-5678', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80' },
    { id: 2, name: 'James Carter', phone: '+1 (555) 345-6789', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80' },
    { id: 3, name: 'Sophia Martinez', phone: '+1 (555) 456-7890', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80' },
    { id: 4, name: 'Liam Sterling', phone: '+1 (555) 567-8901', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80' },
    { id: 5, name: 'David Lee', phone: '+1 (555) 678-9012', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80' },
    { id: 6, name: 'Sarah Connor', phone: '+1 (555) 789-0123', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80' }
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setStep('amount');
  };

  const handleKeyPress = (num) => {
    if (amount === '0') {
      if (num !== '0' && num !== '.') {
        setAmount(num);
      }
    } else {
      if (num === '.' && amount.includes('.')) return;
      if (amount.includes('.')) {
        const parts = amount.split('.');
        if (parts[1].length >= 2) return;
      }
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleAmountContinue = () => {
    const val = parseFloat(amount);
    if (val > 0 && val <= balance) {
      setStep('pin');
    }
  };

  const handlePinKeyPress = (num) => {
    if (enteredPin.length < 4) {
      const newPin = enteredPin + num;
      setEnteredPin(newPin);
      setPinError('');

      if (newPin.length === 4) {
        setTimeout(() => {
          const expectedPin = userPin || '1234';
          if (newPin === expectedPin) {
            onTransferComplete(selectedContact.name, parseFloat(amount), note, selectedContact.avatar);
            setStep('success');
          } else {
            setEnteredPin('');
            setPinError('Incorrect PIN. Please try again.');
          }
        }, 300);
      }
    }
  };

  const handlePinBackspace = () => {
    if (enteredPin.length > 0) {
      setEnteredPin(enteredPin.slice(0, -1));
    }
  };

  return (
    <div className="phone-viewport d-flex flex-col justify-between h-full bg-white dark:bg-[#181920]">
      {/* Step 1: Contacts Directory */}
      {step === 'contacts' && (
        <div className="flex-1 d-flex flex-col p-5 no-scrollbar" style={{ overflowY: 'auto' }}>
          {/* Header */}
          <div className="header-container mb-5">
            <button onClick={onBack} className="btn-icon clickable" style={{ border: 'none' }}>
              <ChevronLeft size={24} />
            </button>
            <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Transfer Money</h4>
            <div style={{ width: '40px' }} />
          </div>

          {/* Search bar */}
          <div className="relative mb-5" style={{ display: 'flex', alignItems: 'center' }}>
            <Search className="absolute" style={{ left: '16px', color: 'var(--text-secondary)' }} size={18} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input-field"
              style={{ 
                padding: '14px 14px 14px 44px',
                borderRadius: '16px', 
                backgroundColor: 'var(--bg-surface)', 
                border: '1px solid var(--border-color)',
                fontSize: '13px'
              }}
            />
          </div>

          {/* Horizontal Recent Contacts */}
          {searchQuery === '' && (
            <div className="mb-5">
              <h5 style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                Recent
              </h5>
              <div className="d-flex gap-4 no-scrollbar" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
                {contacts.slice(0, 4).map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className="clickable"
                    style={{ border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}
                  >
                    <img 
                      src={contact.avatar} 
                      alt={contact.name} 
                      style={{ width: '48px', height: '48px', borderRadius: '9999px', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
                    />
                    <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '6px', textAlign: 'center', width: '56px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {contact.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Directory */}
          <div>
            <h5 style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
              All Contacts
            </h5>
            <div className="d-flex flex-col gap-3">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className="transaction-item clickable"
                >
                  <div className="d-flex align-center gap-3">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name} 
                      style={{ width: '40px', height: '40px', borderRadius: '9999px', objectFit: 'cover' }} 
                    />
                    <div>
                      <h5 style={{ fontSize: '12px', fontWeight: '800', margin: 0 }}>{contact.name}</h5>
                      <p style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: '600', margin: '2px 0 0 0' }}>{contact.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && (
                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-tertiary)', padding: '24px 0' }}>No contacts found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Keypad Amount Screen */}
      {step === 'amount' && (
        <div className="flex-1 d-flex flex-col justify-between p-5">
          {/* Header */}
          <div>
            <div className="header-container mb-5">
              <button onClick={() => setStep('contacts')} className="btn-icon clickable" style={{ border: 'none' }}>
                <ChevronLeft size={24} />
              </button>
              <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Amount</h4>
              <div style={{ width: '40px' }} />
            </div>

            {/* Selected Contact Card */}
            <div className="transaction-item mb-5" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <div className="d-flex align-center gap-3">
                <img 
                  src={selectedContact.avatar} 
                  alt={selectedContact.name} 
                  style={{ width: '44px', height: '44px', borderRadius: '9999px', objectFit: 'cover' }} 
                />
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: '800', margin: 0 }}>Sending to {selectedContact.name}</h5>
                  <p style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: '600', margin: '2px 0 0 0' }}>{selectedContact.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amount Display and input */}
          <div className="text-center" style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '800', uppercase: 'true', letterSpacing: '1px' }}>Enter Amount</span>
            <div className="d-flex align-center justify-center mt-2">
              <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>$</span>
              <span style={{ fontSize: '50px', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
                {amount}
              </span>
            </div>
            
            {/* Note text field */}
            <input 
              type="text"
              placeholder="Add a note (optional)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ 
                marginTop: '16px', 
                padding: '8px 16px',
                width: '100%',
                maxWidth: '220px',
                textAlign: 'center',
                border: 'none',
                borderBottom: '1px dashed var(--border-color)',
                backgroundColor: 'transparent',
                fontSize: '12px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '16px' }}>
              Available Balance: <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>${balance.toFixed(2)}</span>
            </p>
            {parseFloat(amount) > balance && (
              <p className="animate-pulse-custom" style={{ color: 'var(--error)', fontSize: '10px', fontWeight: '700', marginTop: '6px' }}>
                Insufficient balance
              </p>
            )}
          </div>

          {/* Keypad */}
          <div className="d-flex flex-col gap-4">
            <div className="pin-grid" style={{ gap: '12px 24px', maxWidth: '240px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeyPress(num.toString())}
                  className="keypad-btn-circle clickable"
                  style={{ width: '56px', height: '56px', fontSize: '18px' }}
                >
                  {num}
                </button>
              ))}
              
              <button
                onClick={() => handleKeyPress('.')}
                className="clickable"
                style={{ width: '56px', height: '56px', border: 'none', background: 'transparent', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}
              >
                .
              </button>
              
              <button
                onClick={() => handleKeyPress('0')}
                className="keypad-btn-circle clickable"
                style={{ width: '56px', height: '56px', fontSize: '18px' }}
              >
                0
              </button>
              
              <button
                onClick={handleBackspace}
                className="clickable"
                style={{ width: '56px', height: '56px', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
              >
                <Delete size={20} />
              </button>
            </div>

            <button
              onClick={handleAmountContinue}
              disabled={parseFloat(amount) <= 0 || parseFloat(amount) > balance}
              className="btn-primary w-full clickable"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm PIN Screen */}
      {step === 'pin' && (
        <div className="flex-1 d-flex flex-col justify-between p-5">
          {/* Header */}
          <div className="header-container mb-5">
            <button onClick={() => setStep('amount')} className="btn-icon clickable" style={{ border: 'none' }}>
              <ChevronLeft size={24} />
            </button>
            <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Enter PIN</h4>
            <div style={{ width: '40px' }} />
          </div>

          {/* Secure lock info */}
          <div className="text-center" style={{ margin: 'auto 0' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Lock size={24} className="text-primary" />
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0' }}>Confirm Transaction</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '0 16px', lineHeight: '1.5' }}>
              Enter your secure 4-digit PIN code to verify and approve this transfer of <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>${parseFloat(amount).toFixed(2)}</span>.
            </p>

            {/* PIN Dot Indicators */}
            <div className="d-flex justify-center align-center gap-4" style={{ margin: '24px 0 12px 0' }}>
              {[0, 1, 2, 3].map((idx) => (
                <div 
                  key={idx}
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '9999px', 
                    border: '2px solid var(--border-focus)',
                    backgroundColor: idx < enteredPin.length ? 'var(--primary)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            {pinError && (
              <p className="animate-pulse-custom" style={{ color: 'var(--error)', fontSize: '11px', fontWeight: '600', marginTop: '8px' }}>
                {pinError}
              </p>
            )}
          </div>

          {/* Keypad */}
          <div className="d-flex flex-col gap-4">
            <div className="pin-grid" style={{ gap: '12px 24px', maxWidth: '240px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinKeyPress(num.toString())}
                  className="keypad-btn-circle clickable"
                  style={{ width: '56px', height: '56px', fontSize: '18px' }}
                >
                  {num}
                </button>
              ))}
              
              <div style={{ width: '56px' }} />
              
              <button
                onClick={() => handlePinKeyPress('0')}
                className="keypad-btn-circle clickable"
                style={{ width: '56px', height: '56px', fontSize: '18px' }}
              >
                0
              </button>
              
              <button
                onClick={handlePinBackspace}
                className="clickable"
                style={{ width: '56px', height: '56px', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
              >
                <Delete size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Success Receipt Screen */}
      {step === 'success' && (
        <div className="flex-1 d-flex flex-col justify-between p-6">
          <div className="d-flex justify-end">
            <button className="btn-icon clickable" style={{ width: '36px', height: '36px' }}>
              <Share2 size={16} />
            </button>
          </div>

          <div className="text-center" style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '9999px', backgroundColor: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', marginBottom: '24px' }}>
              <CheckCircle2 size={56} className="stroke-[1.5]" />
            </div>
            
            <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0' }}>Transfer Successful!</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '0 16px', lineHeight: '1.5' }}>
              Your transfer to {selectedContact.name} was completed successfully.
            </p>

            {/* Receipt details */}
            <div style={{ width: '100%', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '20px', marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="d-flex justify-between align-center" style={{ fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Recipient</span>
                <span style={{ fontWeight: '800' }}>{selectedContact.name}</span>
              </div>
              <div className="d-flex justify-between align-center" style={{ fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Amount sent</span>
                <span style={{ fontWeight: '900', color: 'var(--text-primary)' }}>${parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-between align-center" style={{ fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Reference note</span>
                <span style={{ fontWeight: '800', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                  {note || 'None'}
                </span>
              </div>
              <div className="d-flex justify-between align-center" style={{ fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Transaction ID</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-secondary)' }}>TXN849182305</span>
              </div>
            </div>
          </div>

          <button onClick={onBack} className="btn-primary w-full clickable">
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
