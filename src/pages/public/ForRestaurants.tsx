import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, BarChart3, Shield, Check, Clock, Zap } from 'lucide-react';
import { useInView } from '../../lib/useInView';

const steps = [
  { num: '1', title: 'Sign up free', desc: 'Create your account in under 2 minutes. No setup fees, no commitments.' },
  { num: '2', title: 'Add your restaurant', desc: 'Set up your profile with your address, categories, and opening hours.' },
  { num: '3', title: 'Create surprise bags', desc: 'List daily surplus as mystery bags at 50%+ off. Set quantity, price, and pickup window.' },
  { num: '4', title: 'Customers collect', desc: 'Customers reserve, pay, and pick up. You scan their QR code. Done.' },
];

const features = [
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track orders, revenue, top-performing bags, and customer trends in real-time.' },
  { icon: Clock, title: 'Order Management', desc: 'See pending orders, mark as ready, scan QR codes for collection. Simple and fast.' },
  { icon: Zap, title: '"I\'m Here" Alerts', desc: 'Get notified when a customer arrives to pick up their bag. No more waiting.' },
  { icon: Shield, title: 'Secure Payments', desc: 'Powered by Yoco. Customers pay upfront, you get paid automatically.' },
  { icon: TrendingUp, title: 'Bag Management', desc: 'Create, edit, and track your surprise bags. Set prices, quantities, and pickup windows.' },
  { icon: Users, title: 'Customer Acquisition', desc: 'Reach 200,000+ students and young professionals in Johannesburg.' },
];

export default function ForRestaurants() {
  const [statsRef, statsVisible] = useInView();
  const [howRef, howVisible] = useInView();
  const [featRef, featVisible] = useInView();
  const [compRef, compVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(41,125,107,0.1),transparent_60%)]" />
        <div className="ambient-shape w-[400px] h-[400px] bg-kula-green/15 -top-40 -right-40 animate-float" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative hero-stagger">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-kula-green-light text-sm font-medium">First month free - 0% commission</span>
          </span>
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter text-balance">
            Stop throwing money in the bin.
          </h1>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Turn your daily food surplus into revenue. List surprise bags, reach thousands of new customers,
            and get paid for food you'd otherwise throw away.
          </p>
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 mt-10 px-10 py-4 rounded-xl gradient-green text-white font-semibold text-lg shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Start Selling <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Value prop */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-100/50">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { val: '85%', label: 'Revenue you keep per bag', sub: 'Only 15% commission - lowest in the industry' },
              { val: 'R6,800+', label: 'Potential monthly earnings', sub: 'From 10 bags/day at R40 each' },
              { val: '5 min', label: 'Setup time', sub: 'Free signup, no contracts' },
            ].map((s, i) => (
              <div
                key={s.val}
                className={`reveal ${statsVisible ? 'visible' : ''} md:border-r md:last:border-r-0 border-gray-100 py-4`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-5xl font-bold tracking-tighter text-gradient">{s.val}</p>
                <p className="text-gray-600 mt-2 font-medium">{s.label}</p>
                <p className="text-gray-400 text-sm mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50/50 section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 reveal ${howVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading">How It Works</h2>
            <p className="mt-4 text-gray-400 text-lg">Four simple steps to start earning from surplus.</p>
          </div>
          <div ref={howRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`relative reveal ${howVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full gradient-green flex items-center justify-center text-white font-bold text-xl mb-5 shadow-glow-green">
                  {s.num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight-heading">{s.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 reveal ${featVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading">Your Restaurant Dashboard</h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage your surplus sales, all in one place.
            </p>
          </div>
          <div ref={featRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`card-premium p-8 reveal ${featVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-kula-green/10 flex items-center justify-center mb-5">
                  <f.icon size={24} className="text-kula-green" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg tracking-tight-heading">{f.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-gray-50/50 section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={compRef} className={`text-center mb-16 reveal ${compVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading">Why KULA?</h2>
            <p className="mt-4 text-gray-400">40% lower commission than international competitors.</p>
          </div>
          <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-premium reveal ${compVisible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div className="grid grid-cols-3 gap-0">
              <div className="p-6 border-b border-r border-gray-100" />
              <div className="p-6 border-b border-r border-gray-100 text-center">
                <p className="font-bold text-gray-900">KULA</p>
              </div>
              <div className="p-6 border-b border-gray-100 text-center">
                <p className="font-bold text-gray-400">Others</p>
              </div>

              {[
                ['Commission', '15%', '25-30%'],
                ['Setup Fee', 'R0', 'R500-R2,000'],
                ['First Month', 'Free (0%)', 'Full commission'],
                ['Analytics', 'Included', 'Premium only'],
                ['Local Support', 'Yes', 'Overseas call center'],
              ].map(([label, kula, other]) => (
                <div key={label} className="contents group">
                  <div className="p-4 border-b border-r border-gray-100 text-sm font-medium text-gray-600 group-hover:bg-gray-50/50 transition-colors duration-300">{label}</div>
                  <div className="p-4 border-b border-r border-gray-100 text-center text-sm font-medium text-kula-green group-hover:bg-gray-50/50 transition-colors duration-300">{kula}</div>
                  <div className="p-4 border-b border-gray-100 text-center text-sm text-gray-400 group-hover:bg-gray-50/50 transition-colors duration-300">{other}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-kula-green relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        <div ref={ctaRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight-heading text-balance">Ready to turn waste into revenue?</h2>
          <p className="mt-4 text-white/70 text-lg font-light">Sign up free. First month at 0% commission. Cancel anytime.</p>
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 mt-10 px-10 py-4 rounded-xl bg-white text-kula-green font-semibold text-lg hover:bg-white/90 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
