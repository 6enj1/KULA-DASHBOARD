import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Leaf, Users, Globe } from 'lucide-react';
import { useInView } from '../../lib/useInView';

const values = [
  { icon: Leaf, title: 'Zero Waste', desc: 'Every bag rescued is food saved from landfill. We believe surplus food should nourish people, not rot in bins.' },
  { icon: Heart, title: 'Community First', desc: 'Ubuntu - we rise by lifting others. KULA strengthens the bond between local restaurants and their communities.' },
  { icon: Users, title: 'Accessibility', desc: 'Great food should be affordable. We make quality restaurant meals accessible to students and young professionals.' },
  { icon: Globe, title: 'Local Impact', desc: 'Built in Joburg, for Joburg. We understand the unique challenges of South African restaurants and customers.' },
];

export default function About() {
  const [missionRef, missionVisible] = useInView();
  const [etymRef, etymVisible] = useInView();
  const [valuesRef, valuesVisible] = useInView();
  const [joburgRef, joburgVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  return (
    <div>
      <title>About KULA — South Africa's Food Rescue Marketplace</title>
      <meta name="description" content="Learn about KULA's mission to reduce food waste in Johannesburg while making quality restaurant meals affordable for students and young professionals. Built in Joburg, for Joburg." />
      <link rel="canonical" href="https://www.kulasave.co.za/about" />
      <meta property="og:title" content="About KULA — South Africa's Food Rescue Marketplace" />
      <meta property="og:description" content="KULA's mission: reduce food waste in Johannesburg while making quality restaurant meals affordable. Built in Joburg, for Joburg." />
      <meta property="og:url" content="https://www.kulasave.co.za/about" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(41,125,107,0.1),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative hero-stagger">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter">About KULA</h1>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Every night in Johannesburg, restaurants throw away thousands of rands worth of perfectly good food.
            Meanwhile, students are skipping meals. We're here to fix that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white section-padding">
        <div ref={missionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`reveal ${missionVisible ? 'visible' : ''}`}>
              <span className="text-kula-green font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-4 tracking-tight-heading text-balance">
                Building food wisdom, one bag at a time.
              </h2>
              <p className="mt-6 text-gray-400 text-lg leading-relaxed font-light">
                KULA is building two sides of the same solution: an AI-powered restaurant intelligence platform
                that reduces waste, and a consumer marketplace that lets customers "rescue" surplus meals for half price or less.
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed font-light">
                We're not just a marketplace - we're a business intelligence platform that happens to have a marketplace attached.
                We make money when restaurants make money. Not before. Not instead of. <strong className="text-gray-700 font-semibold">With them.</strong>
              </p>
            </div>
            <div className={`reveal ${missionVisible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <div ref={etymRef} className="glass-premium bg-kula-green/5 rounded-3xl p-8 lg:p-12 border border-kula-green/10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight-heading">What does KULA mean?</h3>
                <div className="space-y-5">
                  <div className={`flex items-start gap-4 reveal-left ${etymVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
                    <span className="text-2xl">🇹🇿</span>
                    <div>
                      <p className="font-semibold text-gray-900">Swahili</p>
                      <p className="text-gray-400 text-sm">"Kula" means <strong className="text-gray-600">to eat</strong></p>
                    </div>
                  </div>
                  <div className={`flex items-start gap-4 reveal-left ${etymVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                    <span className="text-2xl">🇿🇦</span>
                    <div>
                      <p className="font-semibold text-gray-900">Zulu</p>
                      <p className="text-gray-400 text-sm">"Kula" means <strong className="text-gray-600">to eat</strong></p>
                    </div>
                  </div>
                  <div className={`flex items-start gap-4 reveal-left ${etymVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                    <span className="text-2xl">🇮🇳</span>
                    <div>
                      <p className="font-semibold text-gray-900">Sanskrit</p>
                      <p className="text-gray-400 text-sm">"Kula" means <strong className="text-gray-600">to grow</strong></p>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-gray-500 text-sm italic">
                  Three languages. One truth: food is meant to nourish and build community - not rot in bins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50/50 section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 reveal ${valuesVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading">Our Values</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`card-premium p-8 lg:p-10 reveal ${valuesVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-kula-green/10 flex items-center justify-center mb-5">
                  <v.icon size={26} className="text-kula-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight-heading">{v.title}</h3>
                <p className="text-gray-400 mt-3 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Joburg */}
      <section className="bg-white section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={joburgRef} className={`text-center reveal ${joburgVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading">The Johannesburg Advantage</h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Why we're building here, and why we'll win.
            </p>
          </div>
          <div className="mt-16 space-y-4">
            {[
              { emoji: '🎓', text: '200,000+ students across Wits, UJ, and surrounding universities.' },
              { emoji: '🍽️', text: 'Incredible food scene diversity - from kota spots to trendy Maboneng cafes.' },
              { emoji: '⚡', text: 'Loadshedding creates unexpected surplus - we turn crisis into opportunity.' },
              { emoji: '💰', text: 'Cost of living crisis means everyone is looking for deals.' },
              { emoji: '🤝', text: 'Ubuntu culture - South Africans support platforms that help small businesses.' },
            ].map((item, i) => (
              <div
                key={item.text}
                className={`flex items-start gap-5 p-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 reveal-left ${joburgVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <p className="text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-kula-green relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        <div ref={ctaRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight-heading">Join the movement</h2>
          <p className="mt-4 text-white/70 text-lg font-light">Be part of the solution to food waste in South Africa.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/dashboard/register" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-kula-green font-semibold text-lg hover:bg-white/90 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:-translate-y-0.5">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
