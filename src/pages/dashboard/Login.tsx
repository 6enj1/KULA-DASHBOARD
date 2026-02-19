import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const store = useAuthStore.getState();
      navigate(store.restaurant || store.user?.role === 'admin' ? '/dashboard' : '/dashboard/onboarding');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex relative overflow-hidden">
      {/* Floating ambient shapes */}
      <div className="ambient-shape w-[600px] h-[600px] bg-kula-green/15 -top-64 -right-64 animate-float" />
      <div className="ambient-shape w-[500px] h-[500px] bg-kula-green-light/10 -bottom-48 -left-48 animate-float-delayed" />
      <div className="ambient-shape w-[300px] h-[300px] bg-kula-amber/8 top-1/2 left-1/3 animate-float" />

      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        <div className="hero-stagger">
          <div className="flex items-center gap-3 mb-10">
            <img src="/kula_logo.png" alt="KULA" className="h-14 w-auto" />
            <span className="text-white text-3xl font-bold tracking-tighter">KULA</span>
          </div>
          <h1 className="text-4xl xl:text-6xl font-bold text-white leading-[1.05] tracking-tighter mb-6">
            Manage your restaurant.<br />
            <span className="text-gradient">Reduce waste.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-md font-light leading-relaxed">
            Your restaurant dashboard to manage surprise bags, track orders, and grow your business.
          </p>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10 hero-stagger">
            <img src="/kula_logo.png" alt="KULA" className="h-11 w-auto" />
            <span className="text-white text-2xl font-bold tracking-tighter">KULA</span>
          </div>

          <div className="glass-premium rounded-2xl p-8 lg:p-10">
            <div className="hero-stagger">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight-heading">Welcome back</h2>
              <p className="text-white/40 text-sm mb-10 font-light">Sign in to your restaurant dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-kula-error/10 border border-kula-error/20 text-kula-error text-sm animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 auth-field-stagger">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-dark"
                  placeholder="you@restaurant.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-dark pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-green text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-glow"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-white/30">
            Don't have an account?{' '}
            <Link to="/dashboard/register" className="text-kula-green-light hover:underline font-medium transition-colors duration-300">
              Register your restaurant
            </Link>
          </p>
          <p className="mt-3 text-center">
            <Link to="/" className="text-sm text-white/20 hover:text-white/40 transition-colors duration-300">
              Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
