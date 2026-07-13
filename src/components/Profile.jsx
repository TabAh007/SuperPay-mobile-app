import React, { useState } from 'react';
import { User, Bell, Shield, Moon, HelpCircle, LogOut, ChevronRight, Camera } from 'lucide-react';

export default function Profile({ isDark, toggleTheme, onLogout }) {
  const [profileName, setProfileName] = useState('Andrew Ainsley');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 019-2834');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(profileName);
  const [tempPhone, setTempPhone] = useState(profilePhone);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (tempName) {
      setProfileName(tempName);
      setProfilePhone(tempPhone);
      setIsEditing(false);
    }
  };

  return (
    <div className="phone-viewport no-scrollbar pb-24 px-5 pt-6">
      {/* Profile Info Header */}
      <div className="d-flex flex-col align-center justify-center text-center mb-6">
        <div className="relative mb-4">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Andrew Ainsley Avatar" 
            style={{ width: '96px', height: '96px', borderRadius: '9999px', objectFit: 'cover', border: '4px solid var(--bg-surface)', boxShadow: 'var(--shadow-sm)' }}
          />
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute clickable"
            style={{
              bottom: 0,
              right: '6px',
              width: '30px',
              height: '30px',
              borderRadius: '9999px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-phone)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Camera size={13} />
          </button>
        </div>
        
        <h4 style={{ fontSize: '17px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
          {profileName}
        </h4>
        <p style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '4px' }}>
          {profilePhone}
        </p>
      </div>

      {/* Menu list */}
      <div className="d-flex flex-col gap-1 mb-6">
        {/* Edit profile */}
        <button 
          onClick={() => setIsEditing(true)}
          className="clickable text-left"
          style={{ border: 'none', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '14px' }}
        >
          <div className="d-flex align-center gap-3">
            <div className="action-circle-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '36px', height: '36px' }}>
              <User size={18} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>Edit Profile Details</span>
          </div>
          <ChevronRight size={16} className="text-slate-400 dark:text-slate-500" />
        </button>

        {/* Theme Settings Toggle */}
        <div className="d-flex justify-between align-center" style={{ padding: '14px' }}>
          <div className="d-flex align-center gap-3">
            <div className="action-circle-icon" style={{ backgroundColor: 'rgba(168,85,247,0.1)', color: '#a855f7', width: '36px', height: '36px' }}>
              <Moon size={18} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>Dark Mode Theme</span>
          </div>
          {/* Custom Toggle Switch */}
          <button 
            onClick={toggleTheme}
            className="clickable"
            style={{
              width: '40px',
              height: '24px',
              borderRadius: '9999px',
              padding: '2px',
              border: 'none',
              transition: 'background-color 0.25s',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: isDark ? 'var(--primary)' : '#e2e8f0',
              justifyContent: isDark ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{ width: '20px', height: '20px', borderRadius: '9999px', backgroundColor: '#ffffff', boxShadow: 'var(--shadow-sm)' }} />
          </button>
        </div>

        {/* Push Notification */}
        <div className="d-flex justify-between align-center" style={{ padding: '14px' }}>
          <div className="d-flex align-center gap-3">
            <div className="action-circle-icon" style={{ backgroundColor: 'var(--warning)', color: '#ca8a04', width: '36px', height: '36px' }}>
              <Bell size={18} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>Push Notifications</span>
          </div>
          <input type="checkbox" defaultChecked className="toggle-switch-bg" />
        </div>

        {/* Security */}
        <button className="clickable text-left" style={{ border: 'none', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '14px' }}>
          <div className="d-flex align-center gap-3">
            <div className="action-circle-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', width: '36px', height: '36px' }}>
              <Shield size={18} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>Account Security</span>
          </div>
          <ChevronRight size={16} className="text-slate-400 dark:text-slate-500" />
        </button>

        {/* Support */}
        <button className="clickable text-left" style={{ border: 'none', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '14px' }}>
          <div className="d-flex align-center gap-3">
            <div className="action-circle-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '36px', height: '36px' }}>
              <HelpCircle size={18} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>Help & Support</span>
          </div>
          <ChevronRight size={16} className="text-slate-400 dark:text-slate-500" />
        </button>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '16px 0' }} />

      {/* Logout */}
      <button 
        onClick={onLogout}
        className="clickable text-left"
        style={{ border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', gap: '14px', width: '100%', padding: '14px', color: 'var(--error)', fontWeight: '800' }}
      >
        <div className="action-circle-icon" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)', width: '36px', height: '36px' }}>
          <LogOut size={18} />
        </div>
        <span style={{ fontSize: '12px' }}>Log Out Account</span>
      </button>

      {/* Edit Profile overlay sheet */}
      {isEditing && (
        <div className="bottom-sheet-backdrop animate-fade-in">
          <div className="bottom-sheet-content animate-slide-up">
            <div className="bottom-sheet-handle" />
            
            <div className="d-flex justify-between align-center mb-5">
              <h4 style={{ fontSize: '17px', fontWeight: '800', margin: 0 }}>Edit Profile</h4>
              <button 
                type="button"
                onClick={() => {
                  setTempName(profileName);
                  setTempPhone(profilePhone);
                  setIsEditing(false);
                }}
                className="clickable"
                style={{ background: 'transparent', border: 'none', fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="d-flex flex-col gap-4">
              <div className="form-input-container">
                <label className="form-input-label">Full Name</label>
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  required
                  className="form-input-field"
                />
              </div>

              <div className="form-input-container">
                <label className="form-input-label">Phone Number</label>
                <input 
                  type="text" 
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  required
                  className="form-input-field"
                />
              </div>

              <button type="submit" className="btn-primary w-full clickable" style={{ padding: '14px', marginTop: '16px' }}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
