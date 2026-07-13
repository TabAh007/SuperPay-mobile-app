import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, Lock, Unlock, Plus, Trash2, Globe, Wifi } from 'lucide-react';

export default function MyCard({ onBack }) {
  const [cards, setCards] = useState([
    { id: 1, type: 'Visa Black', name: 'Andrew Ainsley', number: '4284 9230 4581 3749', expiry: '09/29', cvv: '235', isFrozen: false, grad: 'linear-gradient(135deg, #1e1e24 0%, #2e3040 100%)', brand: 'VISA' },
    { id: 2, type: 'Mastercard Gold', name: 'Andrew Ainsley', number: '5391 1045 2840 8593', expiry: '04/28', cvv: '942', isFrozen: false, grad: 'linear-gradient(135deg, #e9a115 0%, #c78000 100%)', brand: 'mastercard' }
  ]);
  
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCVV, setNewCardCVV] = useState('');
  const [newCardBrand, setNewCardBrand] = useState('VISA');

  const activeCard = cards[activeCardIdx];

  const handleToggleFreeze = () => {
    const updated = [...cards];
    updated[activeCardIdx].isFrozen = !updated[activeCardIdx].isFrozen;
    setCards(updated);
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (newCardNumber && newCardExpiry && newCardCVV) {
      const formattedNum = newCardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      
      const newCard = {
        id: Date.now(),
        type: `${newCardBrand} Custom`,
        name: 'Andrew Ainsley',
        number: formattedNum,
        expiry: newCardExpiry,
        cvv: newCardCVV,
        isFrozen: false,
        grad: newCardBrand === 'VISA' ? 'linear-gradient(135deg, #246bfd 0%, #0046e5 100%)' : 'linear-gradient(135deg, #ec001b 0%, #a30010 100%)',
        brand: newCardBrand
      };

      setCards([...cards, newCard]);
      setActiveCardIdx(cards.length);
      setIsAddingCard(false);
      setNewCardNumber('');
      setNewCardExpiry('');
      setNewCardCVV('');
    }
  };

  const handleDeleteCard = (id) => {
    if (cards.length > 1) {
      const updated = cards.filter(c => c.id !== id);
      setCards(updated);
      setActiveCardIdx(0);
    } else {
      alert('You must keep at least one card in your wallet.');
    }
  };

  return (
    <div className="phone-viewport no-scrollbar pb-24 px-5 pt-3">
      {/* Header */}
      <div className="header-container mb-6">
        <button onClick={onBack} className="btn-icon clickable" style={{ border: 'none' }}>
          <ChevronLeft size={24} />
        </button>
        <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>My Cards</h4>
        <button 
          onClick={() => setIsAddingCard(true)}
          className="btn-icon clickable"
          style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', border: 'none' }}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Card horizontal carousel */}
      <div className="d-flex gap-4 no-scrollbar mb-6" style={{ overflowX: 'auto', padding: '8px 0' }}>
        {cards.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => { setActiveCardIdx(idx); setShowDetails(false); }}
            className="clickable text-left"
            style={{
              flexShrink: 0,
              width: '270px',
              height: '160px',
              borderRadius: '24px',
              background: c.grad,
              color: '#ffffff',
              padding: '20px',
              boxShadow: idx === activeCardIdx ? 'var(--shadow-card)' : 'none',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              border: idx === activeCardIdx ? '2px solid var(--primary)' : '2px solid transparent',
              opacity: idx === activeCardIdx ? 1 : 0.65,
              transition: 'all 0.3s'
            }}
          >
            {c.isFrozen && (
              <div className="wallet-card-frozen-overlay">
                <Lock className="text-white animate-bounce" size={22} />
                <span>Card Frozen</span>
              </div>
            )}

            <div className="d-flex justify-between align-start">
              <div>
                <p style={{ fontSize: '8px', opacity: 0.7, textTransform: 'uppercase', fontWeight: '800' }}>{c.type}</p>
                <p style={{ fontSize: '12px', fontFamily: 'monospace', letterSpacing: '1px', marginTop: '4px', fontWeight: '700' }}>
                  {showDetails ? c.number : `•••• •••• •••• ${c.number.slice(-4)}`}
                </p>
              </div>
              <span className="card-brand-logo" style={{ fontSize: '11px' }}>{c.brand.toUpperCase()}</span>
            </div>

            <div className="d-flex justify-between align-end">
              <div>
                <p style={{ fontSize: '7px', opacity: 0.6, textTransform: 'uppercase', fontWeight: '800' }}>Card Holder</p>
                <p style={{ fontSize: '10px', fontWeight: '800' }}>{c.name}</p>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <p style={{ fontSize: '7px', opacity: 0.6, textTransform: 'uppercase', fontWeight: '800' }}>Expiry</p>
                  <p style={{ fontSize: '10px', fontFamily: 'monospace' }}>{c.expiry}</p>
                </div>
                {showDetails && (
                  <div>
                    <p style={{ fontSize: '7px', opacity: 0.6, textTransform: 'uppercase', fontWeight: '800' }}>CVV</p>
                    <p style={{ fontSize: '10px', fontFamily: 'monospace' }}>{c.cvv}</p>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Details/Freeze Buttons */}
      <div className="d-flex justify-center gap-4 mb-6">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          disabled={activeCard.isFrozen}
          className="clickable"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            fontSize: '11px',
            fontWeight: '800',
            backgroundColor: 'var(--bg-surface-elevated)',
            color: 'var(--text-primary)',
            opacity: activeCard.isFrozen ? 0.4 : 1
          }}
        >
          {showDetails ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showDetails ? 'Hide Info' : 'Show Details'}</span>
        </button>

        <button 
          onClick={handleToggleFreeze}
          className="clickable"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            fontSize: '11px',
            fontWeight: '800',
            backgroundColor: 'var(--bg-surface-elevated)',
            color: 'var(--text-primary)'
          }}
        >
          {activeCard.isFrozen ? <Unlock size={14} className="text-success" /> : <Lock size={14} className="text-error" />}
          <span>{activeCard.isFrozen ? 'Unfreeze' : 'Freeze Card'}</span>
        </button>
      </div>

      {/* Settings list */}
      <div className="mb-6" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '16px' }}>
        <h5 style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>
          Settings
        </h5>
        <div className="d-flex flex-col gap-4">
          <div className="d-flex justify-between align-center">
            <div className="d-flex align-center gap-3">
              <div className="action-circle-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '32px', height: '32px' }}>
                <Wifi size={16} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>Contactless Payments</span>
            </div>
            <input type="checkbox" defaultChecked className="toggle-switch-bg" />
          </div>

          <div className="d-flex justify-between align-center">
            <div className="d-flex align-center gap-3">
              <div className="action-circle-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', width: '32px', height: '32px' }}>
                <Globe size={16} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>Online Transactions</span>
            </div>
            <input type="checkbox" defaultChecked className="toggle-switch-bg" />
          </div>

          {cards.length > 1 && (
            <button 
              onClick={() => handleDeleteCard(activeCard.id)}
              className="clickable text-left"
              style={{ border: 'none', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 0 }}
            >
              <div className="d-flex align-center gap-3">
                <div className="action-circle-icon" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)', width: '32px', height: '32px' }}>
                  <Trash2 size={16} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--error)' }}>Remove Card from Wallet</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Add card overlay sheet */}
      {isAddingCard && (
        <div className="bottom-sheet-backdrop animate-fade-in">
          <div className="bottom-sheet-content animate-slide-up">
            <div className="bottom-sheet-handle" />
            
            <div className="d-flex justify-between align-center mb-5">
              <h4 style={{ fontSize: '17px', fontWeight: '800', margin: 0 }}>Add New Card</h4>
              <button 
                onClick={() => setIsAddingCard(false)}
                className="clickable animate-fade-in"
                style={{ background: 'transparent', border: 'none', fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddCardSubmit} className="d-flex flex-col gap-4">
              <div>
                <label className="form-input-label" style={{ marginBottom: '8px', display: 'block' }}>Card Brand</label>
                <div className="d-flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setNewCardBrand('VISA')}
                    className="clickable"
                    style={{
                      flex: 1,
                      padding: '12px 0',
                      border: '1px solid var(--border-color)',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: '800',
                      backgroundColor: newCardBrand === 'VISA' ? 'var(--primary-light)' : 'transparent',
                      color: newCardBrand === 'VISA' ? 'var(--primary)' : 'var(--text-secondary)'
                    }}
                  >
                    VISA
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewCardBrand('mastercard')}
                    className="clickable"
                    style={{
                      flex: 1,
                      padding: '12px 0',
                      border: '1px solid var(--border-color)',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: '800',
                      backgroundColor: newCardBrand === 'mastercard' ? 'var(--primary-light)' : 'transparent',
                      color: newCardBrand === 'mastercard' ? 'var(--primary)' : 'var(--text-secondary)'
                    }}
                  >
                    Mastercard
                  </button>
                </div>
              </div>

              <div className="form-input-container">
                <label className="form-input-label">Card Number</label>
                <input 
                  type="text" 
                  placeholder="16-digit card number"
                  maxLength="16"
                  pattern="\d{16}"
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  required
                  className="form-input-field"
                />
              </div>

              <div className="d-flex gap-4">
                <div className="form-input-container flex-1">
                  <label className="form-input-label">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    maxLength="5"
                    value={newCardExpiry}
                    onChange={(e) => setNewCardExpiry(e.target.value)}
                    required
                    className="form-input-field"
                  />
                </div>
                <div className="form-input-container flex-1">
                  <label className="form-input-label">CVV</label>
                  <input 
                    type="password" 
                    placeholder="***"
                    maxLength="3"
                    pattern="\d{3}"
                    value={newCardCVV}
                    onChange={(e) => setNewCardCVV(e.target.value)}
                    required
                    className="form-input-field"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full clickable" style={{ padding: '14px', marginTop: '16px' }}>
                Add Card
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
