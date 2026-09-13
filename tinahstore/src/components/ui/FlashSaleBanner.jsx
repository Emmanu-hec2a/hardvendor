import { useState, useEffect } from 'react';
import Icon from '../icons/Icon.jsx';
import { useSettings } from '../../hooks/useSettings.js';

export default function FlashSaleBanner() {
  const { getSetting, loading } = useSettings();
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours for demonstration

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  if (loading || getSetting('flash_sale_active') !== 'true' || timeLeft === 0) return null;

  return (
    <div className="flash-sale-banner">
      <div className="container banner-content">
        <div className="tag">FLASH SALE</div>
        <span className="message">{getSetting('flash_sale_message', 'Students Only: Free Delivery on all orders above KSh 1,500!')}</span>
        <div className="timer">
          <Icon name="clock" className="icon icon-sm" />
          Ends in: <span>{formatTime(timeLeft)}</span>
        </div>
      </div>
      <style>{`
        .flash-sale-banner {
          background: #FFD700;
          color: #000;
          padding: 8px 0;
          font-size: 13px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .banner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .flash-sale-banner .tag {
          background: #000;
          color: #FFD700;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 800;
          font-size: 11px;
        }
        .flash-sale-banner .timer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .banner-content {
            flex-direction: column;
            text-align: center;
            gap: 4px;
          }
          .flash-sale-banner .message {
             font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
