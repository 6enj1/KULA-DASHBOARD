import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { Eye, EyeOff, ArrowRight, Check, X, Lock } from 'lucide-react';

const passwordRules = [
  { test: (p: string) => p.length >= 12, label: '12+ characters' },
  { test: (p: string) => /[A-Z]/.test(p), label: 'Uppercase letter' },
  { test: (p: string) => /[a-z]/.test(p), label: 'Lowercase letter' },
  { test: (p: string) => /[0-9]/.test(p), label: 'Number' },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: 'Special character' },
];

export default function Register() {
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('code') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const allValid = passwordRules.every(r => r.test(password));

  // No invite code — show gated message
  if (!inviteCode) {
    return (
      <div className="min-h-screen gradient-bg flex relative overflow-hidden">
        <div className="ambient-shape w-[600px] h-[600px] bg-kula-green/15 -top-64 -left-64 animate-float" />
        <div className="ambient-shape w-[500px] h-[500px] bg-kula-green-light/10 -bottom-48 -right-48 animate-float-delayed" />

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center">
            <div className="glass-premium rounded-2xl p-10">
              <div className="w-16 h-16 rounded-full bg-kula-amber/10 flex items-center justify-center mx-auto mb-6">
                <Lock size={28} className="text-kula-amber" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight-heading">Registration is by Invitation Only</h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                To maintain quality on our platform, restaurant registration requires an invite code.
                Apply to become a partner and we'll review your application within 24-48 hours.
              </p>
              <Link
                to="/partner"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-green text-white font-semibold shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Apply to Partner <ArrowRight size={18} />
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/30">
              Already have an account?{' '}
              <Link to="/dashboard/login" className="text-kula-green-light hover:underline font-medium">Sign in</Link>
            </p>
            <p className="mt-3">
              <Link to="/" className="text-sm text-white/20 hover:text-white/40 transition-colors duration-300">Back to website</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    setError('');
    setLoading(true);
    try {
      await register(email, password, name, inviteCode);
      navigate('/dashboard/onboarding');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex relative overflow-hidden">
      {/* Floating ambient shapes */}
      <div className="ambient-shape w-[600px] h-[600px] bg-kula-green/15 -top-64 -left-64 animate-float" />
      <div className="ambient-shape w-[500px] h-[500px] bg-kula-green-light/10 -bottom-48 -right-48 animate-float-delayed" />
      <div className="ambient-shape w-[300px] h-[300px] bg-kula-amber/8 top-1/3 right-1/4 animate-float" />

      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        <div className="hero-stagger">
          <div className="flex items-center gap-3 mb-10">
            <img src="/kula_logo.png" alt="KULA" className="h-14 w-auto" />
            <span className="text-white text-3xl font-bold tracking-tighter">KULA</span>
          </div>
          <h1 className="text-4xl xl:text-6xl font-bold text-white leading-[1.05] tracking-tighter mb-6">
            Turn surplus into<br />
            <span className="text-gradient">revenue.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-md font-light leading-relaxed">
            Join KULA and start selling surprise bags to hungry customers near you. First month free.
          </p>
          <div className="mt-10 space-y-4">
            {['15% commission (40% less than competitors)', 'Free analytics dashboard', 'Reach 200,000+ customers'].map(item => (
              <div key={item} className="flex items-center gap-3 text-white/50 text-sm">
                <div className="w-6 h-6 rounded-full bg-kula-green/20 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-kula-green-light" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-10 hero-stagger">
            <img src="/kula_logo.png" alt="KULA" className="h-11 w-auto" />
            <span className="text-white text-2xl font-bold tracking-tighter">KULA</span>
          </div>

          <div className="glass-premium rounded-2xl p-8 lg:p-10">
            <div className="hero-stagger">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight-heading">Create your account</h2>
              <p className="text-white/40 text-sm mb-10 font-light">Start your restaurant partner journey</p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-kula-error/10 border border-kula-error/20 text-kula-error text-sm animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 auth-field-stagger">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Invite Code</label>
                <input
                  type="text"
                  value={inviteCode}
                  className="input-dark opacity-60 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-dark"
                  placeholder="John Smith"
                  required
                />
              </div>
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
                    placeholder="Create a strong password"
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
                {password && (
                  <div className="mt-4 space-y-2">
                    {passwordRules.map(rule => (
                      <div key={rule.label} className="flex items-center gap-2.5 text-xs">
                        {rule.test(password) ? (
                          <Check size={14} className="text-kula-success transition-colors duration-300" />
                        ) : (
                          <X size={14} className="text-white/20 transition-colors duration-300" />
                        )}
                        <span className={`transition-colors duration-300 ${rule.test(password) ? 'text-kula-success' : 'text-white/30'}`}>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || !allValid}
                className="w-full gradient-green text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-glow"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-white/30">
            Already have an account?{' '}
            <Link to="/dashboard/login" className="text-kula-green-light hover:underline font-medium transition-colors duration-300">
              Sign in
            </Link>
          </p>
          <p className="mt-3 text-center">
            <Link to="/" className="text-sm text-white/20 hover:text-white/40 transition-colors duration-300">Back to website</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
