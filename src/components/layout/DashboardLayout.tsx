import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import {
  LayoutDashboard, ShoppingBag, ClipboardList, BarChart3,
  Store, Settings, LogOut, ChevronLeft, ChevronRight, FileText,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/dashboard/bags', icon: ShoppingBag, label: 'Bags' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/profile', icon: Store, label: 'Restaurant' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { to: '/dashboard/applications', icon: FileText, label: 'Applications', adminOnly: true },
];

export default function DashboardLayout() {
  const { user, restaurant, logout } = useAuthStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // Request browser notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  return (
    <div className="min-h-screen gradient-bg flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-[72px]' : 'w-64'} fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 border-r border-white/5`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 gap-2 border-b border-white/5">
          <img src="/kula_logo.png" alt="KULA" className="h-9 w-auto shrink-0" />
          {!collapsed && <span className="text-white font-bold text-lg tracking-tight">KULA</span>}
        </div>

        {/* Restaurant name */}
        {!collapsed && restaurant && (
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-white/90 text-sm font-medium truncate">{restaurant.name}</p>
            <p className="text-white/40 text-xs truncate">{restaurant.city}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems
            .filter(item => !('adminOnly' in item && item.adminOnly) || user?.role === 'admin')
            .map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'sidebar-link-active' : 'sidebar-link'
              }
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-1">
          <button onClick={() => setCollapsed(!collapsed)} className="sidebar-link w-full">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <button onClick={handleLogout} className="sidebar-link w-full text-kula-error/70 hover:text-kula-error hover:bg-kula-error/10">
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 ${collapsed ? 'ml-[72px]' : 'ml-64'} transition-all duration-300`}>
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-white/5">
          <div />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white/90 text-sm font-medium">{user?.name}</p>
              <p className="text-white/40 text-xs">{user?.email}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-kula-green/20 flex items-center justify-center">
              <span className="text-kula-green-light text-sm font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
