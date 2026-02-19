import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/auth';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public pages
import Landing from './pages/public/Landing';
import About from './pages/public/About';
import ForRestaurants from './pages/public/ForRestaurants';
import ForCustomers from './pages/public/ForCustomers';
import Pricing from './pages/public/Pricing';
import Contact from './pages/public/Contact';
import Terms from './pages/public/Terms';
import Privacy from './pages/public/Privacy';
import PartnerApply from './pages/public/PartnerApply';

// Dashboard pages
import Login from './pages/dashboard/Login';
import Register from './pages/dashboard/Register';
import Onboarding from './pages/dashboard/Onboarding';
import Overview from './pages/dashboard/Overview';
import Orders from './pages/dashboard/Orders';
import Bags from './pages/dashboard/Bags';
import Analytics from './pages/dashboard/Analytics';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import Applications from './pages/dashboard/Applications';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kula-green-light border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/dashboard/login" replace />;
  return <>{children}</>;
}

function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, restaurant, isLoading } = useAuthStore();
  if (isLoading) return null;
  if (!restaurant && user?.role !== 'admin') return <Navigate to="/dashboard/onboarding" replace />;
  return <>{children}</>;
}

function GuestGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, restaurant, isLoading } = useAuthStore();
  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kula-green-light border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (isAuthenticated && (restaurant || user?.role === 'admin')) return <Navigate to="/dashboard" replace />;
  if (isAuthenticated && !restaurant) return <Navigate to="/dashboard/onboarding" replace />;
  return <>{children}</>;
}

export default function App() {
  const { fetchUser, fetchRestaurant, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser().then(() => fetchRestaurant());
    } else {
      useAuthStore.setState({ isLoading: false });
    }
  }, []);

  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/for-restaurants" element={<ForRestaurants />} />
        <Route path="/for-customers" element={<ForCustomers />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/partner" element={<PartnerApply />} />
      </Route>

      {/* Auth pages */}
      <Route path="/dashboard/login" element={<GuestGuard><Login /></GuestGuard>} />
      <Route path="/dashboard/register" element={<GuestGuard><Register /></GuestGuard>} />

      {/* Onboarding */}
      <Route path="/dashboard/onboarding" element={
        <AuthGuard><Onboarding /></AuthGuard>
      } />

      {/* Dashboard */}
      <Route path="/dashboard" element={
        <AuthGuard><OnboardingGuard><DashboardLayout /></OnboardingGuard></AuthGuard>
      }>
        <Route index element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="bags" element={<Bags />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="applications" element={<Applications />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
