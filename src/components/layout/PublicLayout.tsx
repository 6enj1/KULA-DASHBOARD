import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'For Restaurants', to: '/for-restaurants' },
  { label: 'For Customers', to: '/for-customers' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ padding: scrolled ? '16px 16px 0' : '0' , transition: 'padding 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <nav
          style={{
            width: '100%',
            maxWidth: scrolled ? 900 : 1280,
            height: scrolled ? 56 : 88,
            paddingLeft: scrolled ? 20 : 24,
            paddingRight: scrolled ? 20 : 24,
            borderRadius: scrolled ? 16 : 0,
            background: scrolled ? 'rgba(255, 255, 255, 0.82)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(255,255,255,0.6) inset, 0 0 0 1px rgba(0,0,0,0.06)'
              : '0 0 0 0 transparent',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="flex items-center justify-between"
        >
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/kula_logo.png" alt="KULA" className="h-10 w-auto shrink-0" />
            <span className={`text-xl font-bold tracking-tight-heading transition-colors duration-500 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>KULA</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link rounded-lg text-sm font-medium transition-all duration-500 ${
                  pathname === link.to
                    ? 'text-kula-green bg-kula-green/5'
                    : scrolled
                      ? 'text-gray-500 hover:text-gray-900'
                      : 'text-white/70 hover:text-white'
                }`}
                style={{
                  padding: scrolled ? '6px 12px' : '8px 16px',
                  transition: 'padding 0.7s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s, background-color 0.3s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/dashboard/login" className={`text-sm font-medium px-4 py-2 transition-colors duration-300 ${
              scrolled ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
            }`}>
              Sign In
            </Link>
            <Link
              to="/partner"
              className="text-sm font-semibold text-white rounded-xl gradient-green shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-glow"
              style={{
                padding: scrolled ? '8px 20px' : '10px 24px',
                transition: 'padding 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, transform 0.3s',
              }}
            >
              Partner with Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden p-2 transition-colors duration-500 ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile nav overlay */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 right-0 z-40 lg:hidden animate-fade-in"
          style={{ top: scrolled ? 80 : 88, transition: 'top 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div className={`mx-4 rounded-2xl border backdrop-blur-xl ${
            scrolled
              ? 'border-gray-200/50 bg-white/82 shadow-premium'
              : 'border-white/10 bg-gray-950/80'
          }`}>
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    pathname === link.to
                      ? 'text-kula-green bg-kula-green/5'
                      : scrolled ? 'text-gray-600' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className={`pt-3 border-t space-y-2 ${scrolled ? 'border-gray-100' : 'border-white/10'}`}>
                <Link to="/dashboard/login" onClick={() => setMenuOpen(false)} className={`block px-4 py-2.5 text-sm font-medium ${scrolled ? 'text-gray-600' : 'text-white/70'}`}>
                  Sign In
                </Link>
                <Link to="/partner" onClick={() => setMenuOpen(false)} className="block btn-primary text-sm text-center">
                  Partner with Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content — no spacer so the hero sits behind the transparent header */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white relative">
        {/* Gradient divider line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kula-green/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-20">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <img src="/kula_logo.png" alt="KULA" className="h-9 w-auto" />
                <span className="text-lg font-bold">KULA</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Where nothing goes to waste, everyone eats well.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-5 text-gray-300">Company</h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">About</Link>
                <Link to="/contact" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">Contact</Link>
                <Link to="/pricing" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-5 text-gray-300">Product</h4>
              <div className="space-y-3">
                <Link to="/for-restaurants" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">For Restaurants</Link>
                <Link to="/for-customers" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">For Customers</Link>
                <Link to="/partner" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">Get Started</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-5 text-gray-300">Legal</h4>
              <div className="space-y-3">
                <Link to="/terms" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">Terms of Service</Link>
                <Link to="/privacy" className="block text-sm text-gray-500 hover:text-white transition-all duration-300 hover:translate-x-1">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} KULA. All rights reserved. Made in Johannesburg.
          </div>
        </div>
      </footer>
    </div>
  );
}
