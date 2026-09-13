import React, { createContext, useState, useEffect } from 'react';
import { paymentsService } from '../services/payments';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [audio] = useState(new Audio('/kaching.mp3'));

  const fetchGlobalData = async () => {
    const token = localStorage.getItem('ts_admin_token');
    if (token) {
      try {
        const data = await paymentsService.getStats();

        // Audio Alert Logic: if count increased, play sound
        if (data.unread_orders_count > pendingCount) {
          audio.play().catch(e => console.log("Audio play failed (interaction required):", e));
        }

        setPendingCount(data.unread_orders_count);
        setNotifications(data.unread_orders || []);
      } catch (err) {
        console.error("Failed to fetch pending count", err);
      }
    }
  };

  useEffect(() => {
    fetchGlobalData();
    const interval = setInterval(fetchGlobalData, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem('ts_admin_token');
    setUser(null);
  };

  return (
    <AdminContext.Provider value={{ user, setUser, pendingCount, setPendingCount, notifications, logout, refreshGlobalData: fetchGlobalData }}>
      {children}
    </AdminContext.Provider>
  );
};
