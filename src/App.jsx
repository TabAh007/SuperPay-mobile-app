import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Transfer from './components/Transfer';
import Statistics from './components/Statistics';
import MyCard from './components/MyCard';
import Profile from './components/Profile';
import Scan from './components/Scan';

import { Home, BarChart3, QrCode, CreditCard, User } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('onboarding'); // 'onboarding' | 'auth' | 'home' | 'transfer' | 'statistics' | 'scan' | 'card' | 'profile'
  const [isDark, setIsDark] = useState(false);
  const [balance, setBalance] = useState(12689.00);
  const [userPin, setUserPin] = useState('');
  
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Spotify Premium', category: 'Entertainment', amount: -14.99, date: 'July 06, 2026', type: 'expense', icon: '🎵' },
    { id: 2, title: 'Corporate Salary', category: 'Income', amount: 4500.00, date: 'July 01, 2026', type: 'deposit', icon: '💼' },
    { id: 3, title: 'Uber Rides Inc', category: 'Transport', amount: -25.50, date: 'June 29, 2026', type: 'expense', icon: '🚗' },
    { id: 4, title: 'Target Stores', category: 'Shopping', amount: -128.40, date: 'June 24, 2026', type: 'expense', icon: '🛍️' }
  ]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleReset = () => {
    setScreen('onboarding');
    setBalance(12689.00);
    setUserPin('');
    setTransactions([
      { id: 1, title: 'Spotify Premium', category: 'Entertainment', amount: -14.99, date: 'July 06, 2026', type: 'expense', icon: '🎵' },
      { id: 2, title: 'Corporate Salary', category: 'Income', amount: 4500.00, date: 'July 01, 2026', type: 'deposit', icon: '💼' },
      { id: 3, title: 'Uber Rides Inc', category: 'Transport', amount: -25.50, date: 'June 29, 2026', type: 'expense', icon: '🚗' },
      { id: 4, title: 'Target Stores', category: 'Shopping', amount: -128.40, date: 'June 24, 2026', type: 'expense', icon: '🛍️' }
    ]);
  };

  const handleAuthSuccess = (pin) => {
    if (pin) setUserPin(pin);
    setScreen('home');
  };

  const handleTransferComplete = (recipient, amount, note, avatar) => {
    setBalance(prev => prev - amount);
    const newTx = {
      id: Date.now(),
      title: `Transfer to ${recipient}`,
      category: note || 'Transfer',
      amount: -amount,
      date: 'Today',
      type: 'expense',
      icon: '💸'
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleScanComplete = (merchant, amount) => {
    setBalance(prev => prev - amount);
    const newTx = {
      id: Date.now(),
      title: merchant,
      category: 'QR Payment',
      amount: -amount,
      date: 'Today',
      type: 'expense',
      icon: '☕'
    };
    setTransactions([newTx, ...transactions]);
  };

  const handlePayBill = (serviceName, amount) => {
    setBalance(prev => prev - amount);
    const newTx = {
      id: Date.now(),
      title: `${serviceName} Bill Pay`,
      category: 'Utilities',
      amount: -amount,
      date: 'Today',
      type: 'expense',
      icon: '⚡'
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleLogout = () => {
    setScreen('auth');
  };

  const isTabBarScreen = ['home', 'statistics', 'card', 'profile'].includes(screen);

  return (
    <PhoneFrame isDark={isDark} toggleTheme={toggleTheme} onReset={handleReset}>
      <div className="w-full h-full relative">
        {screen === 'onboarding' && (
          <Onboarding onFinish={() => setScreen('auth')} />
        )}
        
        {screen === 'auth' && (
          <Auth onAuthSuccess={handleAuthSuccess} />
        )}
        
        {screen === 'home' && (
          <Dashboard 
            balance={balance} 
            transactions={transactions} 
            onNavigate={setScreen} 
            onPayBill={handlePayBill}
          />
        )}
        
        {screen === 'transfer' && (
          <Transfer 
            balance={balance} 
            userPin={userPin} 
            onBack={() => setScreen('home')} 
            onTransferComplete={handleTransferComplete}
          />
        )}
        
        {screen === 'statistics' && (
          <Statistics onBack={() => setScreen('home')} />
        )}

        {screen === 'card' && (
          <MyCard 
            transactions={transactions} 
            onBack={() => setScreen('home')} 
          />
        )}

        {screen === 'profile' && (
          <Profile 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            onLogout={handleLogout} 
            onBack={() => setScreen('home')} 
          />
        )}

        {screen === 'scan' && (
          <Scan 
            balance={balance} 
            onBack={() => setScreen('home')} 
            onScanComplete={handleScanComplete}
          />
        )}

        {/* Persistent Bottom Tab Nav Bar */}
        {isTabBarScreen && (
          <div className="bottom-nav-bar">
            {/* Home */}
            <button 
              onClick={() => setScreen('home')}
              className={`bottom-nav-tab clickable ${screen === 'home' ? 'active' : 'inactive'}`}
            >
              <Home size={18} className={screen === 'home' ? 'stroke-[2.5]' : 'stroke-[2]'} />
              <span className="text-[9px] font-extrabold tracking-tight">Home</span>
            </button>

            {/* Statistics */}
            <button 
              onClick={() => setScreen('statistics')}
              className={`bottom-nav-tab clickable ${screen === 'statistics' ? 'active' : 'inactive'}`}
            >
              <BarChart3 size={18} className={screen === 'statistics' ? 'stroke-[2.5]' : 'stroke-[2]'} />
              <span className="text-[9px] font-extrabold tracking-tight">Analytics</span>
            </button>

            {/* Scan */}
            <div className="floating-scan-wrapper">
              <button 
                onClick={() => setScreen('scan')}
                className="floating-scan-btn clickable"
              >
                <QrCode size={20} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Card */}
            <button 
              onClick={() => setScreen('card')}
              className={`bottom-nav-tab clickable ${screen === 'card' ? 'active' : 'inactive'}`}
            >
              <CreditCard size={18} className={screen === 'card' ? 'stroke-[2.5]' : 'stroke-[2]'} />
              <span className="text-[9px] font-extrabold tracking-tight">My Card</span>
            </button>

            {/* Profile */}
            <button 
              onClick={() => setScreen('profile')}
              className={`bottom-nav-tab clickable ${screen === 'profile' ? 'active' : 'inactive'}`}
            >
              <User size={18} className={screen === 'profile' ? 'stroke-[2.5]' : 'stroke-[2]'} />
              <span className="text-[9px] font-extrabold tracking-tight">Profile</span>
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
