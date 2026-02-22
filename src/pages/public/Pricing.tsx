import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useInView } from '../../lib/useInView';

const tiers = [
  {
    name: 'Free',
    price: 'R0',
    period: '/month',
    desc: 'Start selling surplus with zero commitment.',
    features: ['15% commission per sale', 'Up to 10 bags/day', 'Basic order management', 'QR code verification', 'Email support'],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: 'R199',
    period: '/month',
    desc: 'Analytics + forecasting. For small cafes.',
    features: ['15% commission per sale', 'Unlimited bags', 'Full analytics dashboard', 'Waste analytics reports', 'Priority email support', 'Save R2,000+/month in waste'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R799',
    period: '/month',
    desc: 'Smart pricing + API. For busy restaurants.',
    features: ['12% commission (volume discount)', 'Everything in Starter', 'Smart pricing suggestions', 'Demand forecasting', 'API access', 'Phone support', 'Save R8,000+/month in waste'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'R1,499',
    period: '/month',
    desc: 'Multi-location dashboard. For chains.',
    features: ['12% commission', 'Everything in Pro', 'Multi-location dashboard', 'Custom integrations', 'Dedicated account manager', 'Priority feature requests', 'Save R15,000+/month in waste'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  const [cardsRef, cardsVisible] = useInView();
  const [commRef, commVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  return (
    <div>
      <title>Pricing — Start Free | KULA Restaurant Plans | South Africa</title>
      <meta name="description" content="Join KULA for free. Only 15% commission per sale — 40% lower than international competitors. First month at 0% commission. No setup fees, no contracts. Start selling surplus food today." />
      <link rel="canonical" href="https://www.kulasave.co.za/pricing" />
      <meta property="og:title" content="Pricing — Start Free | KULA Restaurant Plans" />
      <meta property="og:description" content="15% commission, first month free, no setup fees. The most affordable way to sell surplus food in South Africa." />
      <meta property="og:url" content="https://www.kulasave.co.za/pricing" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(41,125,107,0.1),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative hero-stagger">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter">Simple, Transparent Pricing</h1>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto font-light">
            Start free. Only pay commission when you sell. Upgrade to unlock AI-powered waste reduction tools.
          </p>
        </div>
      </section>

      {/* Pricing grid */}
      <section className="bg-white section-padding">
        <div ref={cardsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 lg:p-8 flex flex-col reveal ${cardsVisible ? 'visible' : ''} ${
                  tier.highlighted
                    ? 'bg-kula-green text-white ring-2 ring-kula-green scale-[1.02] glow-border-animate'
                    : 'bg-white border border-gray-200 shadow-premium hover:shadow-premium-lg transition-all duration-400'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div>
                  <h3 className={`text-lg font-semibold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className={`text-4xl lg:text-5xl font-bold tracking-tighter ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm ${tier.highlighted ? 'text-white/70' : 'text-gray-400'}`}>
                      {tier.period}
                    </span>
                  </div>
                  <p className={`text-sm mt-3 ${tier.highlighted ? 'text-white/80' : 'text-gray-400'}`}>
                    {tier.desc}
                  </p>
                </div>

                <ul className="mt-8 space-y-3.5 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={16} className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-white/80' : 'text-kula-green'}`} />
                      <span className={`text-sm ${tier.highlighted ? 'text-white/90' : 'text-gray-500'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={tier.name === 'Enterprise' ? '/contact' : '/partner'}
                  className={`mt-8 block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-white text-kula-green hover:bg-white/90 shadow-premium hover:shadow-premium-lg'
                      : 'bg-kula-green text-white hover:bg-kula-green/90 shadow-glow hover:shadow-glow-green'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission explainer */}
      <section className="bg-gray-50/50 section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={commRef} className={`text-center mb-16 reveal ${commVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight-heading">How Commission Works</h2>
            <p className="mt-4 text-gray-400">Simple math. You keep the majority.</p>
          </div>
          <div className={`bg-white rounded-2xl border border-gray-100 p-8 lg:p-10 shadow-premium reveal ${commVisible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <span className="text-gray-500">Bag listed at</span>
                <span className="font-bold text-gray-900 text-lg">R45.00</span>
              </div>
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <span className="text-gray-500">KULA commission (15%)</span>
                <span className="text-gray-400">- R6.75</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">You receive</span>
                <span className="font-bold text-gradient text-3xl tracking-tighter">R38.25</span>
              </div>
            </div>
            <p className="mt-8 text-gray-400 text-sm text-center">
              That's R38.25 from food that would have gone in the bin. Times 10 bags a day = R382.50 daily = R11,475/month.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-kula-green relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        <div ref={ctaRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight-heading">Start earning from day one</h2>
          <p className="mt-4 text-white/70 text-lg font-light">No setup fees. First month free. Cancel anytime.</p>
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
