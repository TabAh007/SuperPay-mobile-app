import React, { useState } from 'react';
import { ChevronLeft, ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';

export default function Statistics({ onBack }) {
  const [tab, setTab] = useState('expense'); // 'income' | 'expense'
  const [period, setPeriod] = useState('weekly'); // 'weekly' | 'monthly' | 'yearly'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const weeklyData = {
    expense: [
      { label: 'Mon', value: 45, display: '$45.00' },
      { label: 'Tue', value: 85, display: '$85.00' },
      { label: 'Wed', value: 30, display: '$30.00' },
      { label: 'Thu', value: 120, display: '$120.00' },
      { label: 'Fri', value: 65, display: '$65.00' },
      { label: 'Sat', value: 150, display: '$150.00' },
      { label: 'Sun', value: 50, display: '$50.00' }
    ],
    income: [
      { label: 'Mon', value: 100, display: '$100.00' },
      { label: 'Tue', value: 50, display: '$50.00' },
      { label: 'Wed', value: 400, display: '$400.00' },
      { label: 'Thu', value: 80, display: '$80.00' },
      { label: 'Fri', value: 1200, display: '$1,200.00' },
      { label: 'Sat', value: 150, display: '$150.00' },
      { label: 'Sun', value: 0, display: '$0.00' }
    ]
  };

  const categories = {
    expense: [
      { name: 'Shopping', amount: 450.00, percentage: 32, bgStyle: { backgroundColor: '#f59e0b' }, textStyle: { color: '#f59e0b' } },
      { name: 'Food & Dining', amount: 380.00, percentage: 27, bgStyle: { backgroundColor: '#f97316' }, textStyle: { color: '#f97316' } },
      { name: 'Utilities & Bills', amount: 320.00, percentage: 22, bgStyle: { backgroundColor: '#3b82f6' }, textStyle: { color: '#3b82f6' } },
      { name: 'Entertainment', amount: 270.00, percentage: 19, bgStyle: { backgroundColor: '#a855f7' }, textStyle: { color: '#a855f7' } }
    ],
    income: [
      { name: 'Monthly Salary', amount: 1500.00, percentage: 76, bgStyle: { backgroundColor: '#10b981' }, textStyle: { color: '#10b981' } },
      { name: 'Freelance Design', amount: 350.00, percentage: 18, bgStyle: { backgroundColor: '#6366f1' }, textStyle: { color: '#6366f1' } },
      { name: 'Investments Div', amount: 130.00, percentage: 6, bgStyle: { backgroundColor: '#14b8a6' }, textStyle: { color: '#14b8a6' } }
    ]
  };

  const activePoints = weeklyData[tab];
  const totalExpense = 1420.50;
  const totalIncome = 5600.00;

  const chartHeight = 120;
  const chartWidth = 280;
  const padding = 20;

  const points = activePoints.map((item, index) => {
    const x = padding + (index * (chartWidth - 2 * padding)) / (activePoints.length - 1);
    const maxValue = tab === 'income' ? 1200 : 150;
    const scaledValue = item.value === 0 ? 0 : (item.value / maxValue) * (chartHeight - 2 * padding);
    const y = chartHeight - padding - scaledValue;
    return { x, y, label: item.label, value: item.display };
  });

  const linePath = points.reduce((acc, point, index) => {
    return acc + `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
  }, '');

  const areaPath = linePath + `L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="phone-viewport no-scrollbar pb-24 px-5 pt-3">
      {/* Header */}
      <div className="header-container mb-6">
        <button onClick={onBack} className="btn-icon clickable" style={{ border: 'none' }}>
          <ChevronLeft size={24} />
        </button>
        <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Statistics</h4>
        <button className="btn-icon clickable" style={{ border: 'none' }}>
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="d-flex mb-6" style={{ backgroundColor: 'var(--bg-surface)', padding: '6px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <button
          onClick={() => { setTab('income'); setHoveredPoint(null); }}
          className="clickable"
          style={{
            flex: 1,
            padding: '12px 0',
            border: 'none',
            fontSize: '12px',
            fontWeight: '850',
            borderRadius: '12px',
            backgroundColor: tab === 'income' ? 'var(--bg-surface-elevated)' : 'transparent',
            color: tab === 'income' ? 'var(--primary)' : 'var(--text-tertiary)',
            boxShadow: tab === 'income' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          Income
        </button>
        <button
          onClick={() => { setTab('expense'); setHoveredPoint(null); }}
          className="clickable"
          style={{
            flex: 1,
            padding: '12px 0',
            border: 'none',
            fontSize: '12px',
            fontWeight: '850',
            borderRadius: '12px',
            backgroundColor: tab === 'expense' ? 'var(--bg-surface-elevated)' : 'transparent',
            color: tab === 'expense' ? 'var(--primary)' : 'var(--text-tertiary)',
            boxShadow: tab === 'expense' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          Expense
        </button>
      </div>

      {/* Overview totals */}
      <div className="d-flex gap-4 mb-6">
        <div className="d-flex align-center gap-3 flex-1" style={{ backgroundColor: 'var(--success-light)', border: '1px solid rgba(18,209,142,0.1)', padding: '14px', borderRadius: '18px' }}>
          <div className="action-circle-icon" style={{ backgroundColor: 'var(--success)', width: '32px', height: '32px' }}>
            <ArrowUp size={16} />
          </div>
          <div>
            <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: '800', uppercase: 'true', letterSpacing: '0.5px' }}>Income</span>
            <h5 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>${totalIncome.toLocaleString()}</h5>
          </div>
        </div>
        
        <div className="d-flex align-center gap-3 flex-1" style={{ backgroundColor: 'var(--error-light)', border: '1px solid rgba(247,85,85,0.1)', padding: '14px', borderRadius: '18px' }}>
          <div className="action-circle-icon" style={{ backgroundColor: 'var(--error)', width: '32px', height: '32px' }}>
            <ArrowDown size={16} />
          </div>
          <div>
            <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: '800', uppercase: 'true', letterSpacing: '0.5px' }}>Expense</span>
            <h5 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>${totalExpense.toLocaleString()}</h5>
          </div>
        </div>
      </div>

      {/* Chart Period Selector */}
      <div className="d-flex justify-between align-center mb-4">
        <h5 style={{ fontSize: '14px', fontWeight: '800', margin: 0 }}>Cash Flow</h5>
        <div className="d-flex gap-1">
          {['weekly', 'monthly', 'yearly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="clickable"
              style={{
                border: 'none',
                background: period === p ? 'rgba(36,107,253,0.1)' : 'transparent',
                color: period === p ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '10px',
                fontWeight: '750',
                padding: '6px 10px',
                borderRadius: '8px',
                textTransform: 'capitalize'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive area chart */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '16px', marginBottom: '24px', position: 'relative' }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          <path d={areaPath} fill={`url(#area-grad-${tab})`} opacity="0.15" />
          
          <path d={linePath} fill="none" stroke={tab === 'income' ? 'var(--success)' : 'var(--primary)'} strokeWidth="3" strokeLinecap="round" />
          
          {points.map((pt, i) => (
            <g key={i}>
              <circle 
                cx={pt.x} 
                cy={pt.y} 
                r="10" 
                fill="transparent" 
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredPoint({ x: pt.x, y: pt.y, val: pt.value, label: pt.label })}
                onTouchStart={() => setHoveredPoint({ x: pt.x, y: pt.y, val: pt.value, label: pt.label })}
              />
              <circle 
                cx={pt.x} 
                cy={pt.y} 
                r={hoveredPoint?.label === pt.label ? "5" : "3.5"} 
                fill={tab === 'income' ? 'var(--success)' : 'var(--primary)'}
                stroke="white"
                strokeWidth="1.5"
                style={{ pointerEvents: 'none', transition: 'all 0.15s' }}
              />
            </g>
          ))}

          {points.map((pt, i) => (
            <text 
              key={i} 
              x={pt.x} 
              y={chartHeight} 
              fontSize="8" 
              fontWeight="700"
              fill="var(--text-tertiary)" 
              textAnchor="middle"
              style={{ pointerEvents: 'none' }}
            >
              {pt.label}
            </text>
          ))}

          <defs>
            <linearGradient id="area-grad-expense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="area-grad-income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--success)" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hovered point HTML Tooltip */}
        {hoveredPoint && (
          <div 
            className="glassmorphism"
            style={{ 
              position: 'absolute',
              zIndex: 10,
              padding: '6px 10px', 
              borderRadius: '10px', 
              textAlign: 'center', 
              boxShadow: 'var(--shadow-md)',
              left: `${(hoveredPoint.x / chartWidth) * 90}%`, 
              top: `${(hoveredPoint.y / chartHeight) * 55}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <p style={{ fontSize: '8px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>{hoveredPoint.label}</p>
            <p style={{ fontSize: '11px', fontWeight: '900', color: tab === 'income' ? 'var(--success)' : 'var(--primary)', margin: '2px 0 0 0' }}>{hoveredPoint.val}</p>
          </div>
        )}
      </div>

      {/* Category Breakdown */}
      <div>
        <div className="d-flex justify-between align-center mb-4">
          <h5 style={{ fontSize: '14px', fontWeight: '800', margin: 0 }}>Breakdown</h5>
          <span style={{ fontSize: '9px', fontWeight: '800', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Weekly</span>
        </div>

        <div className="d-flex flex-col gap-3.5">
          {categories[tab].map((cat, idx) => (
            <div key={idx} className="d-flex flex-col gap-2" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '20px' }}>
              <div className="d-flex justify-between align-center" style={{ fontSize: '12px' }}>
                <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{cat.name}</span>
                <span style={{ fontWeight: '900' }}>
                  ${cat.amount.toFixed(2)} 
                  <span style={{ ...cat.textStyle, fontSize: '10px', fontWeight: '800', marginLeft: '6px' }}>
                    ({cat.percentage}%)
                  </span>
                </span>
              </div>
              
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div 
                  style={{ ...cat.bgStyle, height: '100%', borderRadius: '9999px', transition: 'all 0.5s', width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
