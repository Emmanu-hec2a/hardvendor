import { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('hv-age-verified');
    if (!verified) {
      setIsVerified(false);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('hv-age-verified', 'true');
    setIsVerified(true);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isVerified) return null;

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-card">
        <div className="logo" style={{ fontSize: 28, marginBottom: 20, color: '#1a1a1a' }}>Hard<span>Vendor</span></div>
        <h2 style={{ color: '#1a1a1a', marginBottom: 12 }}>Age Verification</h2>
        <p style={{ color: '#4a4a4a', fontSize: 15 }}>You must be at least 18 years old to enter this site. Please confirm your age to continue.</p>

        <div className="age-gate-actions">
          <button className="btn btn-primary btn-block" onClick={handleVerify} style={{ background: '#1a1a1a', color: '#fff', border: 'none' }}>I am 18 or older</button>
          <button className="btn btn-outline btn-block" onClick={handleExit} style={{ borderColor: '#1a1a1a', color: '#1a1a1a' }}>I am under 18</button>
        </div>

        <p className="muted" style={{ fontSize: 11, marginTop: 24, color: '#888', lineHeight: 1.4 }}>
          HardVendor promotes responsible drinking. Excessive consumption of alcohol is harmful to your health. Not for sale to persons under the age of 18 years.
        </p>
      </div>

      <style>{`
        .age-gate-overlay {
          position: fixed;
          inset: 0;
          background: #0a0a0a;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .age-gate-card {
          background: #ffffff !important;
          padding: 40px;
          border-radius: 16px;
          max-width: 450px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .age-gate-actions {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .age-gate-card .logo span {
          color: var(--oxblood, #800000);
        }
      `}</style>
    </div>
  );
}
