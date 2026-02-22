import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShoppingBag, QrCode, Star, TrendingUp, Users, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useInView } from '../../lib/useInView';

const stats = [
  { value: '200K+', label: 'Students in Joburg' },
  { value: '50%', label: 'Average Savings' },
  { value: '15%', label: 'Low Commission' },
  { value: 'R0', label: 'Setup Cost' },
];

const howItWorks = [
  { step: '01', icon: ShoppingBag, title: 'Restaurants list surplus', desc: 'Restaurants create surprise bags from their daily surplus food at 50%+ off.' },
  { step: '02', icon: QrCode, title: 'Customers reserve & pay', desc: 'Browse nearby bags, reserve in the app, and pay securely via Yoco.' },
  { step: '03', icon: MapPin, title: 'Pick up your bag', desc: 'Head to the restaurant during the pickup window and collect your surprise bag.' },
  { step: '04', icon: Leaf, title: 'Food rescued!', desc: 'Great food saved from waste. You eat well. Restaurants earn. Everyone wins.' },
];

const benefits = [
  { icon: TrendingUp, title: 'Earn from waste', desc: 'Turn food that would be thrown away into revenue. 85% of something beats 100% of nothing.' },
  { icon: Users, title: 'New customers', desc: 'Students and young professionals discover your restaurant through KULA and become regulars.' },
  { icon: Star, title: 'Low commission', desc: 'Just 15% - 40% lower than international competitors. First month completely free.' },
];

const faqs = [
  { q: "What's in a surprise bag?", a: "Whatever the restaurant has surplus of that day - it's always fresh, always from today's service. Could be sushi, sandwiches, bakery items, wraps, or full meals." },
  { q: 'How much can restaurants earn?', a: 'If you list 10 bags/day at R40 each, that\'s R340/day after commission (R6,800/month) from food you\'d throw away.' },
  { q: 'Is the food safe?', a: 'Yes. All food is fresh from that day\'s preparation. Restaurants follow standard food safety protocols.' },
  { q: 'How much does it cost to join?', a: 'Free to sign up. We take 15% commission only when a bag sells. First month is 0% commission.' },
  { q: 'What areas do you cover?', a: 'We\'re launching in Braamfontein and Auckland Park, expanding to Rosebank, Sandton, and Soweto.' },
];

function RevealSection({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const [ref, isVisible] = useInView();
  return (
    <div ref={ref} className={`reveal ${delay} ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsRef, statsVisible] = useInView();
  const [howRef, howVisible] = useInView();
  const [benefitsRef, benefitsVisible] = useInView();
  const [kulaRef, kulaVisible] = useInView();
  const [faqRef, faqVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  return (
    <div className="w-full">
      <title>KULA — Rescue Surplus Food at Half Price | Johannesburg</title>
      <meta name="description" content="KULA connects Johannesburg with surplus food from top local restaurants at up to 50% off. Save money, eat well, and reduce food waste. South Africa's food rescue marketplace." />
      <link rel="canonical" href="https://www.kulasave.co.za/" />
      <meta property="og:title" content="KULA — Rescue Surplus Food at Half Price | Johannesburg" />
      <meta property="og:description" content="KULA connects Johannesburg with surplus food from top local restaurants at up to 50% off. Save money, eat well, and reduce food waste." />
      <meta property="og:url" content="https://www.kulasave.co.za/" />
      {/* Hero — fixed behind scrolling content */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(41,125,107,0.12),transparent_60%)]" />
        {/* Ambient floating shapes */}
        <div className="ambient-shape w-[500px] h-[500px] bg-kula-green/20 -top-48 -right-48 animate-float" />
        <div className="ambient-shape w-[400px] h-[400px] bg-kula-green-light/10 bottom-0 left-[-200px] animate-float-delayed" />
        <div className="ambient-shape w-[300px] h-[300px] bg-kula-amber/10 top-1/3 right-1/4 animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40 relative h-full flex items-center">
          <div className="max-w-3xl hero-stagger">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <Leaf size={14} className="text-kula-green-light" />
              <span className="text-kula-green-light text-sm font-medium">Fighting food waste in South Africa</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.02] tracking-tighter text-balance">
              Where nothing goes to waste,{' '}
              <span className="text-gradient">everyone eats well.</span>
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-white/50 max-w-2xl leading-relaxed font-light">
              KULA connects hungry customers with local restaurants selling surplus food at 50% off or more. Save money, discover great food, reduce waste.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/partner"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl gradient-green text-white font-semibold text-lg shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Partner with Us <ArrowRight size={20} />
              </Link>
              <Link
                to="/for-customers"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-white/15 text-white font-semibold text-lg hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                I'm a Customer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer matching hero height so content starts below it */}
      <div className="h-screen" />

      {/* Everything below scrolls over the hero */}
      <div className="relative z-10">

      {/* Stats — rounded top corners to look like a card sliding up */}
      <section className="bg-white border-b border-gray-100/50 rounded-t-[28px] sm:rounded-t-[36px]"
        style={{ boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.15)' }}>
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center reveal ${statsVisible ? 'visible' : ''} lg:border-r lg:last:border-r-0 border-gray-100`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl lg:text-5xl font-bold tracking-tighter text-gradient">{s.value}</p>
                <p className="text-gray-400 text-sm mt-2 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading text-balance">How KULA Works</h2>
              <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                Simple for customers. Simple for restaurants. Great for the planet.
              </p>
            </div>
          </RevealSection>
          <div ref={howRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-kula-green/10 via-kula-green/20 to-kula-green/10" />
            {howItWorks.map((item, i) => (
              <div
                key={item.step}
                className={`card-premium p-8 relative reveal ${howVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-kula-green/10 flex items-center justify-center mb-5">
                  <item.icon size={26} className="text-kula-green" />
                </div>
                <span className="text-3xl font-bold text-gradient tracking-tighter">{item.step}</span>
                <h3 className="text-gray-900 font-semibold text-lg mt-2 tracking-tight-heading">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for restaurants */}
      <section className="bg-white section-padding">
        <div ref={benefitsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`reveal ${benefitsVisible ? 'visible' : ''}`}>
              <span className="text-kula-green font-semibold text-sm uppercase tracking-wider">For Restaurants</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-4 tracking-tight-heading text-balance">
                Stop throwing money in the bin.
              </h2>
              <p className="mt-6 text-gray-400 text-lg leading-relaxed font-light">
                Every night in Johannesburg, restaurants throw away thousands of rands worth of perfectly good food.
                Meanwhile, students are skipping meals. The disconnect is insane.
              </p>
              <div className="mt-10 space-y-8">
                {benefits.map((b, i) => (
                  <div
                    key={b.title}
                    className={`flex gap-5 reveal ${benefitsVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-kula-green/10 flex items-center justify-center shrink-0">
                      <b.icon size={22} className="text-kula-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{b.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/for-restaurants"
                className="inline-flex items-center gap-2 mt-10 text-kula-green font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn more about partnering <ArrowRight size={18} />
              </Link>
            </div>
            <div className={`reveal ${benefitsVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              <div className="bg-gradient-to-br from-kula-green/5 to-kula-green/10 rounded-3xl p-8 lg:p-12">
                <div className="bg-white rounded-2xl p-6 mb-5 shadow-premium animate-float">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-kula-amber/10 flex items-center justify-center">
                      <span className="text-lg">🍱</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mystery Sushi Bag</p>
                      <p className="text-gray-400 text-xs">Sakura Japanese</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-kula-green">R35</span>
                    <span className="text-gray-400 line-through">R80</span>
                    <span className="text-kula-success text-sm font-medium ml-auto">-56%</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-premium animate-float-delayed" style={{ transform: 'rotate(1deg)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-kula-green/10 flex items-center justify-center">
                      <span className="text-lg">🥐</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Bakery Surprise</p>
                      <p className="text-gray-400 text-xs">Fresh Bake Co.</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-kula-green">R20</span>
                    <span className="text-gray-400 line-through">R50</span>
                    <span className="text-kula-success text-sm font-medium ml-auto">-60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kula meaning */}
      <section className="bg-kula-green relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        <div ref={kulaRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal ${kulaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight-heading">What does KULA mean?</h2>
          <p className="mt-6 text-white/80 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            <strong className="font-semibold">Kula</strong> means "to eat" in Swahili and Zulu, and "to grow" in Sanskrit.
            Three languages. One truth: food is meant to nourish and build community - not rot in bins.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading">Frequently Asked Questions</h2>
            </div>
          </RevealSection>
          <div ref={faqRef} className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border border-gray-100 rounded-2xl overflow-hidden reveal ${faqVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 transition-colors duration-300"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-300 shrink-0 transition-transform duration-300 ease-apple ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`accordion-content ${openFaq === i ? 'open' : ''}`}>
                  <div>
                    <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 section-padding">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(41,125,107,0.1),transparent_70%)]" />
        <div className="ambient-shape w-[400px] h-[400px] bg-kula-green/15 -bottom-48 -left-48 animate-float" />
        <div ref={ctaRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tighter text-balance">Ready to reduce waste and grow your business?</h2>
          <p className="mt-6 text-white/40 text-lg max-w-2xl mx-auto font-light">
            Join KULA today. It takes 5 minutes to set up and the first month is completely free.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/partner"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl gradient-green text-white font-semibold text-lg shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started Free <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-white/15 text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
      </div>{/* end scrolling content wrapper */}
    </div>
  );
}
