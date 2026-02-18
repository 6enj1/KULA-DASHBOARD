import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { api } from '../../lib/api';
import { Shield, Bell, LogOut, Trash2, User } from 'lucide-react';

export default function Settings() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    try {
      await api.delete('/users/me');
      logout();
      navigate('/');
    } catch {}
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/50 text-sm mt-1">Manage your account</p>
      </div>

      {/* Account */}
      <div className="card-dark p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User size={20} className="text-kula-green-light" /> Account
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm font-medium">Name</p>
              <p className="text-white/40 text-xs">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm font-medium">Email</p>
              <p className="text-white/40 text-xs">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm font-medium">Role</p>
              <p className="text-white/40 text-xs capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card-dark p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield size={20} className="text-kula-green-light" /> Security
        </h2>
        <p className="text-white/50 text-sm">
          Password management is available through the mobile app. Contact support if you need to reset your password.
        </p>
      </div>

      {/* Actions */}
      <div className="card-dark p-6 space-y-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>

        <button
          onClick={handleDeleteAccount}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
            deleteConfirm
              ? 'border-kula-error bg-kula-error/10 text-kula-error'
              : 'border-kula-error/20 text-kula-error/50 hover:bg-kula-error/5'
          }`}
        >
          <Trash2 size={18} />
          <span className="font-medium text-sm">
            {deleteConfirm ? 'Click again to confirm deletion' : 'Delete Account'}
          </span>
        </button>
      </div>
    </div>
  );
}
