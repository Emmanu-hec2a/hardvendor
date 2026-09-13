import React, { useState, useContext, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { Store, ShieldCheck, User, Save, Bell, Smartphone, Zap } from 'lucide-react';
import { authService } from '../services/auth';
import api from '../services/api';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const { user } = useContext(AdminContext);
  const [passData, setPassData] = useState({ old: '', new: '', confirm: '' });
  const [isChanging, setChanging] = useState(false);

  const [sysSettings, setSysSettings] = useState({
    flash_sale_active: 'false',
    flash_sale_message: '',
    whatsapp_hotline: ''
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings/');
      setSysSettings(prev => ({
        ...prev,
        ...response.data
      }));
    } catch (err) {
      toast.error('Failed to load system settings');
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleUpdateSetting = async (key, value) => {
    setIsUpdating(true);
    try {
      await api.post('/admin/settings/update/', { key, value });
      setSysSettings(prev => ({ ...prev, [key]: value }));
      toast.success('Setting updated');
    } catch (err) {
      toast.error('Failed to update setting');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePassChange = async (e) => {
    e.preventDefault();
    if (passData.new !== passData.confirm) {
        toast.error('New passwords do not match');
        return;
    }
    setChanging(true);
    try {
        await authService.changePassword(passData.old, passData.new);
        toast.success('Password updated successfully');
        setPassData({ old: '', new: '', confirm: '' });
    } catch (err) {
        toast.error(err.response?.data?.detail || 'Failed to change password');
    } finally {
        setChanging(false);
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
            {/* Store Config */}
            <div className="card space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                    <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                        <Store size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">Store Configuration</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                        <span className="text-sm text-neutral-500">Deposit Percentage</span>
                        <span className="font-bold text-neutral-900">60%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                        <span className="text-sm text-neutral-500">Flat Delivery Fee (Campus)</span>
                        <span className="font-bold text-neutral-900">KSh 50</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-neutral-500">Free Delivery Threshold</span>
                        <span className="font-bold text-neutral-900">KSh 2,500</span>
                    </div>
                </div>
                <div className="p-3 bg-neutral-50 rounded-md flex gap-3">
                    <Bell size={16} className="text-neutral-400 mt-0.5" />
                    <p className="text-xs text-neutral-500 leading-relaxed">
                        These settings are configured at the system level. Contact your developer to change business logic parameters.
                    </p>
                </div>
            </div>

            {/* Admin Info */}
            <div className="card space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                    <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                        <User size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">Account Information</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="label">Username</label>
                        <p className="text-md font-semibold text-neutral-900">{user?.username || 'admin'}</p>
                    </div>
                    <div>
                        <label className="label">Email Address</label>
                        <p className="text-sm text-neutral-600">admin@hardvendor.co.ke</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {/* Dynamic Controls */}
            <div className="card space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Zap size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">Advanced Features Control</h3>
                </div>

                <div className="space-y-6">
                    {/* Flash Sale Toggle */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-neutral-900">Flash Sale Banner</p>
                            <p className="text-xs text-neutral-500">Toggle visibility on the storefront</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={sysSettings.flash_sale_active === 'true'}
                                onChange={(e) => handleUpdateSetting('flash_sale_active', e.target.checked ? 'true' : 'false')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                    </div>

                    <div className="space-y-1.5">
                        <label className="label">Flash Sale Message</label>
                        <textarea
                            className="input min-h-[80px]"
                            value={sysSettings.flash_sale_message}
                            onChange={(e) => setSysSettings({...sysSettings, flash_sale_message: e.target.value})}
                            onBlur={(e) => handleUpdateSetting('flash_sale_message', e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 mb-1">
                            <Smartphone size={16} className="text-neutral-400" />
                            <label className="label mb-0">WhatsApp Hotline Number</label>
                        </div>
                        <input
                            type="text"
                            className="input"
                            value={sysSettings.whatsapp_hotline}
                            onChange={(e) => setSysSettings({...sysSettings, whatsapp_hotline: e.target.value})}
                            onBlur={(e) => handleUpdateSetting('whatsapp_hotline', e.target.value)}
                            placeholder="+254XXXXXXXXX"
                        />
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="card space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">Security & Password</h3>
                </div>
                <form onSubmit={handlePassChange} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="label">Current Password</label>
                        <input
                            type="password" required className="input"
                            value={passData.old} onChange={(e) => setPassData({ ...passData, old: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="label">New Password</label>
                        <input
                            type="password" required className="input"
                            value={passData.new} onChange={(e) => setPassData({ ...passData, new: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="label">Confirm New Password</label>
                        <input
                            type="password" required className="input"
                            value={passData.confirm} onChange={(e) => setPassData({ ...passData, confirm: e.target.value })}
                        />
                    </div>
                    <button type="submit" disabled={isChanging} className="btn btn-primary w-full gap-2 mt-4">
                        <Save size={18} />
                        {isChanging ? 'Updating Password...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
