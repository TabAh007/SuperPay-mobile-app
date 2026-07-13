import React, { useState } from 'react';

export default function Onboarding({ onFinish }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The best app for finance, banking, & e-wallet today",
      description: "Fast, secure payments and financial tracking for all your accounts in one single place.",
      illustration: (
        <svg viewBox="0 0 280 280" style={{ width: '100%', height: '105%', maxHeight: '250px' }} className="animate-pulse-custom" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="140" cy="140" r="100" fill="url(#circle-grad)" opacity="0.15" />
          <circle cx="140" cy="140" r="70" fill="url(#circle-grad)" opacity="0.25" />
          
          <rect x="75" y="40" width="130" height="210" rx="24" fill="#0F172A" />
          <rect x="80" y="45" width="120" height="200" rx="20" fill="url(#phone-inner-grad)" />
          <rect x="110" y="52" width="60" height="12" rx="6" fill="#0F172A" />
          
          <g filter="url(#drop-shadow)">
            <rect x="95" y="90" width="110" height="66" rx="10" fill="url(#card-grad-ob)" />
            <circle cx="115" cy="105" r="12" fill="white" opacity="0.2" />
            <rect x="135" y="101" width="30" height="8" rx="4" fill="white" opacity="0.3" />
            <rect x="115" y="132" width="50" height="6" rx="3" fill="white" opacity="0.4" />
            <circle cx="185" cy="132" r="8" fill="#FFC107" />
          </g>

          <g filter="url(#coin-shadow)" className="animate-[bounce_3s_infinite]">
            <circle cx="190" cy="80" r="22" fill="url(#coin-grad)" />
            <text x="190" y="87" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">$</text>
          </g>

          <circle cx="70" cy="180" r="6" fill="#12D18E" />
          <circle cx="210" cy="180" r="8" fill="#FF5555" />
          <circle cx="80" cy="90" r="10" fill="#246BFD" opacity="0.4" />
          
          <defs>
            <linearGradient id="circle-grad" x1="40" y1="40" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#246BFD" />
              <stop offset="1" stopColor="#5085ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="phone-inner-grad" x1="80" y1="45" x2="200" y2="245" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E293B" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="card-grad-ob" x1="95" y1="90" x2="205" y2="156" gradientUnits="userSpaceOnUse">
              <stop stopColor="#246BFD" />
              <stop offset="1" stopColor="#0046E5" />
            </linearGradient>
            <linearGradient id="coin-grad" x1="168" y1="58" x2="212" y2="102" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFC107" />
              <stop offset="1" stopColor="#FF8F00" />
            </linearGradient>
            <filter id="drop-shadow" x="85" y="84" width="130" height="86" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
            </filter>
            <filter id="coin-shadow" x="160" y="54" width="60" height="60" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#FF8F00" floodOpacity="0.3" />
            </filter>
          </defs>
        </svg>
      )
    },
    {
      title: "Send money with zero fee and transfer instantly",
      description: "Transfer money to any local or international bank account with zero extra processing fees.",
      illustration: (
        <svg viewBox="0 0 280 280" style={{ width: '100%', height: '105%', maxHeight: '250px' }} className="animate-pulse-custom" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="140" cy="140" r="100" fill="url(#circle-grad-2)" opacity="0.1" />
          
          <g filter="url(#drop-shadow)">
            <rect x="40" y="100" width="86" height="56" rx="8" fill="url(#card-left-grad)" />
            <circle cx="55" cy="112" r="8" fill="white" opacity="0.3" />
            <rect x="52" y="136" width="30" height="4" rx="2" fill="white" opacity="0.4" />
          </g>

          <g filter="url(#drop-shadow)">
            <rect x="154" y="100" width="86" height="56" rx="8" fill="url(#card-right-grad)" />
            <circle cx="169" cy="112" r="8" fill="white" opacity="0.3" />
            <rect x="166" y="136" width="30" height="4" rx="2" fill="white" opacity="0.4" />
          </g>

          <path d="M106 85 C 130 65, 150 65, 174 85" stroke="#246BFD" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 4" />
          <path d="M174 85 L 165 80 M 174 85 L 167 92" stroke="#246BFD" strokeWidth="4" strokeLinecap="round" />

          <line x1="120" y1="128" x2="160" y2="128" stroke="#12D18E" strokeWidth="3" strokeLinecap="round" />
          <line x1="130" y1="136" x2="150" y2="136" stroke="#12D18E" strokeWidth="3" strokeLinecap="round" />

          <g filter="url(#badge-shadow)">
            <circle cx="140" cy="128" r="22" fill="#12D18E" />
            <path d="M131 128 L 137 134 L 149 122" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          <defs>
            <linearGradient id="circle-grad-2" x1="40" y1="40" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#12D18E" />
              <stop offset="1" stopColor="#12D18E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="card-left-grad" x1="40" y1="100" x2="126" y2="156" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5555" />
              <stop offset="1" stopColor="#FF1E1E" />
            </linearGradient>
            <linearGradient id="card-right-grad" x1="154" y1="100" x2="240" y2="156" gradientUnits="userSpaceOnUse">
              <stop stopColor="#246BFD" />
              <stop offset="1" stopColor="#0046E5" />
            </linearGradient>
            <filter id="badge-shadow" x="115" y="103" width="50" height="50" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#12D18E" floodOpacity="0.4" />
            </filter>
          </defs>
        </svg>
      )
    },
    {
      title: "Control and analyze your daily expenses easily",
      description: "Visual dashboards and automated charts help you budget, save, and grow your investments.",
      illustration: (
        <svg viewBox="0 0 280 280" style={{ width: '100%', height: '105%', maxHeight: '250px' }} className="animate-pulse-custom" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="140" cy="140" r="100" fill="url(#circle-grad-3)" opacity="0.12" />
          
          <g filter="url(#drop-shadow)">
            <rect x="50" y="80" width="180" height="130" rx="16" fill="url(#dashboard-bg)" />
          </g>
          
          <line x1="66" y1="120" x2="214" y2="120" stroke="var(--border-color)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="66" y1="150" x2="214" y2="150" stroke="var(--border-color)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="66" y1="180" x2="214" y2="180" stroke="var(--border-color)" strokeWidth="1" strokeOpacity="0.3" />

          <rect x="74" y="130" width="18" height="60" rx="4" fill="#246BFD" />
          <rect x="108" y="100" width="18" height="90" rx="4" fill="#12D18E" />
          <rect x="142" y="145" width="18" height="45" rx="4" fill="#FFC107" />
          <rect x="176" y="90" width="18" height="100" rx="4" fill="url(#accent-bar-grad)" />

          <g filter="url(#badge-shadow-3)" className="animate-[bounce_4s_infinite]">
            <circle cx="214" cy="90" r="24" fill="#246BFD" />
            <path d="M206 82 L214 78 L222 82 V89 C222 96, 214 102, 214 102 C214 102, 206 96, 206 89 V82 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
          </g>

          <defs>
            <linearGradient id="circle-grad-3" x1="40" y1="40" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFC107" />
              <stop offset="1" stopColor="#FFC107" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dashboard-bg" x1="50" y1="80" x2="230" y2="210" gradientUnits="userSpaceOnUse">
              <stop stopColor="#262935" />
              <stop offset="1" stopColor="#1B1C24" />
            </linearGradient>
            <linearGradient id="accent-bar-grad" x1="176" y1="90" x2="194" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5555" />
              <stop offset="1" stopColor="#FF8F00" />
            </linearGradient>
            <filter id="badge-shadow-3" x="185" y="63" width="58" height="58" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#246BFD" floodOpacity="0.4" />
            </filter>
          </defs>
        </svg>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="phone-viewport animate-fade-in d-flex flex-col justify-between h-full p-6 bg-white dark:bg-[#181920]">
      {/* Top logo & skip */}
      <div className="d-flex justify-between align-center" style={{ height: '32px' }}>
        <div className="d-flex align-center gap-2">
          <div style={{ width: '24px', height: '24px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '11px' }}>S</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '14px', letterSpacing: '-0.2px', color: 'var(--text-primary)' }}>SuperPay</span>
        </div>
        
        {currentSlide < slides.length - 1 && (
          <button 
            onClick={onFinish}
            className="clickable"
            style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '12px', fontWeight: '800' }}
          >
            Skip
          </button>
        )}
      </div>

      {/* Illustration */}
      <div className="d-flex align-center justify-center flex-1" style={{ margin: '24px 0' }}>
        {slides[currentSlide].illustration}
      </div>

      {/* Content */}
      <div className="text-center animate-slide-up" style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', lineHeight: '1.2', letterSpacing: '-0.5px', marginBottom: '12px', color: 'var(--text-primary)' }}>
          {slides[currentSlide].title}
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Footer controls */}
      <div className="d-flex flex-col gap-6 w-full" style={{ marginTop: '32px' }}>
        {/* Carousel indicators */}
        <div className="d-flex justify-center align-center gap-2">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              style={{ 
                height: '8px', 
                borderRadius: '9999px',
                width: idx === currentSlide ? '24px' : '8px',
                backgroundColor: idx === currentSlide ? 'var(--primary)' : 'var(--border-color)',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <button onClick={handleNext} className="btn-primary w-full clickable" style={{ padding: '16px 0', fontSize: '13px' }}>
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}
