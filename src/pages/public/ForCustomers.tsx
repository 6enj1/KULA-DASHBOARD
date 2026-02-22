import { ArrowRight, ShoppingBag, MapPin, Heart, Clock, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useInView } from '../../lib/useInView';
import HowItWorksSection from '../../components/public/HowItWorksSection';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { ApiResponse } from '../../types';

const mockBags = [
  { emoji: '🍣', name: 'Mystery Sushi Bag', restaurant: 'Sakura Japanese', was: 80, now: 35, savings: 56 },
  { emoji: '🥐', name: 'Bakery Surprise', restaurant: 'Fresh Bake Co.', was: 50, now: 20, savings: 60 },
  { emoji: '🥪', name: 'Gourmet Sandwich Box', restaurant: 'The Deli', was: 60, now: 28, savings: 53 },
  { emoji: '🍕', name: 'Pizza Party Bag', restaurant: 'Fired Up', was: 120, now: 50, savings: 58 },
];

function foodEmoji(foodType: string): string {
  const t = foodType.toLowerCase();
  if (t.includes('sushi') || t.includes('japanese')) return '🍣';
  if (t.includes('bak') || t.includes('bread') || t.includes('pastry')) return '🥐';
  if (t.includes('pizza')) return '🍕';
  if (t.includes('sandwich') || t.includes('deli')) return '🥪';
  if (t.includes('burger')) return '🍔';
  if (t.includes('salad')) return '🥗';
  if (t.includes('noodle') || t.includes('asian') || t.includes('chinese')) return '🍜';
  if (t.includes('indian') || t.includes('curry')) return '🍛';
  if (t.includes('mexican') || t.includes('taco')) return '🌮';
  if (t.includes('dessert') || t.includes('sweet')) return '🍰';
  return '🛍️';
}

export default function ForCustomers() {
  const [bagsRef, bagsVisible] = useInView();
  const [whyRef, whyVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  const { data: bagsData } = useQuery({
    queryKey: ['publicBags'],
    queryFn: () => api.get<ApiResponse<any[]>>('/bags?limit=4&sort=savings'),
    staleTime: 60_000,
  });

  const realBags = bagsData?.data ?? [];
  const showReal = realBags.length > 0;

  return (
    <div>
      <Helmet>
        <title>Save 50% on Restaurant Food | KULA for Customers | Johannesburg</title>
        <meta name="description" content="Rescue surprise bags of fresh surplus food from Johannesburg restaurants at 50% off or more. Great food at half the price — zero waste. Download the KULA app today." />
        <link rel="canonical" href="https://www.kulasave.co.za/for-customers" />
        <meta property="og:title" content="Save 50% on Restaurant Food | KULA for Customers" />
        <meta property="og:description" content="Rescue surplus food from Johannesburg restaurants at 50% off or more. Fresh, delicious, and guilt-free." />
        <meta property="og:url" content="https://www.kulasave.co.za/for-customers" />
      </Helmet>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(41,125,107,0.1),transparent_60%)]" />
        <div className="ambient-shape w-[400px] h-[400px] bg-kula-green-light/10 -bottom-40 -left-40 animate-float-delayed" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative hero-stagger">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter text-balance">
            Great food. Half the price.{' '}
            <span className="text-gradient">Zero waste.</span>
          </h1>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Rescue surplus food from local restaurants at 50% off or more.
            Every bag is a surprise - but always delicious.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl gradient-green text-white font-semibold text-lg shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Download the App <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Example bags */}
      <section className="bg-white py-20 lg:py-24 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 reveal ${bagsVisible ? 'visible' : ''}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight-heading">What you could rescue today</h2>
          </div>
          <div ref={bagsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {showReal ? realBags.map((bag, i) => (
              <div
                key={bag.id}
                className={`card-premium overflow-hidden reveal ${bagsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {bag.imageUrl ? (
                  <img src={bag.imageUrl} alt={bag.title} className="w-full h-32 object-cover" />
                ) : (
                  <div className="p-6 pb-0">
                    <span className="text-4xl">{foodEmoji(bag.foodType)}</span>
                  </div>
                )}
                <div className="p-6 pt-4">
                  <h3 className="font-semibold text-gray-900">{bag.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{bag.restaurant?.name}</p>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-2xl font-bold text-kula-green">R{(bag.priceCurrent / 100).toFixed(0)}</span>
                    <span className="text-gray-400 text-sm line-through">R{(bag.priceOriginal / 100).toFixed(0)}</span>
                  </div>
                  <span className="inline-block mt-3 text-xs font-medium text-kula-success bg-kula-success/10 px-2.5 py-1 rounded-full">
                    Save {bag.savingsPercent}%
                  </span>
                </div>
              </div>
            )) : mockBags.map((bag, i) => (
              <div
                key={bag.name}
                className={`card-premium p-6 reveal ${bagsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl">{bag.emoji}</span>
                <h3 className="font-semibold text-gray-900 mt-4">{bag.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{bag.restaurant}</p>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-2xl font-bold text-kula-green">R{bag.now}</span>
                  <span className="text-gray-400 text-sm line-through">R{bag.was}</span>
                </div>
                <span className="inline-block mt-3 text-xs font-medium text-kula-success bg-kula-success/10 px-2.5 py-1 rounded-full">
                  Save {bag.savings}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            {showReal
              ? 'Bags update daily. Pickup times vary by restaurant.'
              : '* Actual bags vary daily. That\'s what makes it a surprise!'}
          </p>
        </div>
      </section>

      {/* How it works — Apple-style sticky scroll with iPhone mockup */}
      <HowItWorksSection />

      {/* Why customers love it */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 reveal ${whyVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight-heading">Why You'll Love KULA</h2>
          </div>
          <div ref={whyRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'The Surprise Element', desc: "You never know exactly what's in the bag - that's the fun! But it's always fresh, always quality, always from today." },
              { icon: Heart, title: 'Save 50-75%', desc: 'R80 sushi for R35. R50 bakery haul for R20. Quality restaurant food at a fraction of the price.' },
              { icon: Clock, title: 'Quick Pickup', desc: 'No waiting for delivery. Pop in during the pickup window, grab your bag, and go.' },
              { icon: MapPin, title: 'Near You', desc: 'Discover great restaurants in your area. Perfect for campus lunch runs or evening dinner pickups.' },
              { icon: ShoppingBag, title: 'Quality Food', desc: "This isn't expired stock. It's today's fresh food that would otherwise go to waste." },
              { icon: Heart, title: 'Feel Good', desc: 'Every bag you rescue prevents food waste and supports a local business. That\'s a win-win-win.' },
            ].map((item, i) => (
              <div
                key={item.title + i}
                className={`card-premium p-8 reveal ${whyVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-kula-green/10 flex items-center justify-center mb-4">
                  <item.icon size={22} className="text-kula-green" />
                </div>
                <h3 className="font-semibold text-gray-900 tracking-tight-heading">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 section-padding">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(41,125,107,0.1),transparent_70%)]" />
        <div ref={ctaRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight-heading text-balance">Ready to start saving?</h2>
          <p className="mt-4 text-white/40 text-lg font-light">Download the KULA app and rescue your first bag today.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-white/90 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:-translate-y-0.5">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
            <a href="#" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-white/90 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:-translate-y-0.5">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zM16.5 12L6 3.5v17l10.5-8.5z"/></svg>
              Google Play
            </a>
          </div>
          <p className="mt-6 text-white/20 text-sm">Coming soon to iOS and Android</p>
        </div>
      </section>
    </div>
  );
}
