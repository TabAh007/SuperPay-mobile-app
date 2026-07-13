import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Sun, Moon, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

export default function PhoneFrame({ children, isDark, toggleTheme, onReset }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isFullscreen) {
    return (
      <div className={`fullscreen-container ${isDark ? 'dark-theme' : ''}`}>
        {/* Floating controls in fullscreen mode */}
        <div className="fullscreen-controls">
          <button 
            onClick={toggleTheme}
            className="clickable"
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
          </button>
          <button 
            onClick={onReset}
            className="clickable"
            title="Reset App"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={() => setIsFullscreen(false)}
            className="clickable"
            title="Exit Fullscreen"
          >
            <Minimize2 size={18} />
          </button>
        </div>
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="phone-frame-wrapper">
      {/* Outer controls container */}
      <div className="phone-frame-controls">
        <button onClick={toggleTheme} className="clickable">
          {isDark ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <div className="divider" />

        <button onClick={onReset} className="clickable">
          <RotateCcw size={16} />
          <span>Reset App</span>
        </button>

        <div className="divider" />

        <button onClick={() => setIsFullscreen(true)} className="clickable">
          <Maximize2 size={16} />
          <span>Fullscreen</span>
        </button>
      </div>

      {/* Simulated Phone Shell */}
      <div className={`phone-frame-shell ${isDark ? 'dark-theme' : ''}`}>
        {/* Notch / Dynamic Island */}
        <div className="phone-notch">
          <div className="phone-camera-dot" />
        </div>

        {/* Side physical buttons (left side: volume up/down, action; right side: power) */}
        <div className="phone-side-btn volume-up" />
        <div className="phone-side-btn volume-down" />
        <div className="phone-side-btn action-btn" />
        <div className="phone-side-btn power-btn" />

        {/* Inside Phone Content */}
        <div className={`phone-content-container ${isDark ? 'dark-theme' : ''}`}>
          
          {/* Status Bar */}
          <div className="phone-status-bar">
            {/* Live Clock */}
            <span className="w-14 text-left font-medium tracking-tight">{time}</span>

            {/* Status Icons */}
            <div className="d-flex align-center gap-1-5">
              <Signal size={14} className="stroke-[2.5]" />
              <span className="text-[10px] tracking-tight" style={{ fontWeight: '800' }}>5G</span>
              <Wifi size={14} className="stroke-[2.5]" />
              <div className="d-flex align-center gap-0-5">
                <span className="text-[10px]" style={{ fontWeight: '800' }}>88%</span>
                <Battery size={16} className="stroke-[2]" />
              </div>
            </div>
          </div>

          {/* Core App Screens */}
          <div className="flex-1 overflow-hidden relative">
            {children}
          </div>

          {/* Bottom Home Indicator */}
          <div className="phone-home-indicator-container">
            <div className="phone-home-indicator" />
          </div>

        </div>
      </div>
      
      {/* Footer Info */}
      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 font-medium" style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
        AllPay UI Simulation • iPhone 15 Pro Ratio
      </p>
    </div>
  );
}
