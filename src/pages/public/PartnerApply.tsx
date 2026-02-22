import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Building2, Mail, Phone, MapPin, MessageSquare, User } from 'lucide-react';
import { useInView } from '../../lib/useInView';
import { api } from '../../lib/api';

export default function PartnerApply() {
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroVisible] = useInView();
  const [formRef, formVisible] = useInView();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/partners/apply', form);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <title>Partner with KULA — Restaurant Sign Up | Johannesburg</title>
      <meta name="description" content="Apply to list your Johannesburg restaurant on KULA. Start selling surplus food bags and reaching new customers in under 48 hours. Free to join, 15% commission only when you sell." />
      <link rel="canonical" href="https://www.kulasave.co.za/partner" />
      <meta property="og:title" content="Partner with KULA — Restaurant Sign Up" />
      <meta property="og:description" content="List your restaurant on KULA and reach new customers. Free to join, 15% commission per sale." />
      <meta property="og:url" content="https://www.kulasave.co.za/partner" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(41,125,107,0.12),transparent_60%)]" />
        <div className="ambient-shape w-[500px] h-[500px] bg-kula-green/20 -top-48 -right-48 animate-float" />
        <div className="ambient-shape w-[300px] h-[300px] bg-kula-amber/10 bottom-0 left-[-150px] animate-float-delayed" />

        <div ref={heroRef} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative reveal ${heroVisible ? 'visible' : ''}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-kula-green-light text-sm font-medium">Join 50+ restaurants in Johannesburg</span>
          </span>
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter text-balance">
            Partner with KULA
          </h1>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Turn your daily food surplus into revenue. Tell us about your business and we'll get you set up within 24-48 hours.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="bg-white section-padding">
        <div ref={formRef} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className={`text-center py-16 reveal ${formVisible ? 'visible' : ''}`}>
              <div className="w-20 h-20 rounded-full bg-kula-green/10 flex items-center justify-center mx-auto mb-8">
                <Check size={40} className="text-kula-green" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight-heading mb-4">Application Received!</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
                Thank you for your interest in KULA! We'll review your application and get back to you within 24-48 hours.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 mt-10 text-kula-green font-semibold hover:gap-3 transition-all duration-300"
              >
                Back to homepage <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className={`reveal ${formVisible ? 'visible' : ''}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight-heading">Tell us about your business</h2>
                <p className="mt-4 text-gray-400 text-lg">Fill in the form below and we'll reach out to get you started.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 size={14} className="inline mr-1.5 text-gray-400" />
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g. Fresh Bake Co."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={14} className="inline mr-1.5 text-gray-400" />
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={14} className="inline mr-1.5 text-gray-400" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="you@restaurant.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={14} className="inline mr-1.5 text-gray-400" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+27 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={14} className="inline mr-1.5 text-gray-400" />
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g. Johannesburg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare size={14} className="inline mr-1.5 text-gray-400" />
                    Tell us about your business
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="input-field min-h-[120px] resize-y"
                    placeholder="What type of food do you serve? How much surplus do you typically have?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-green text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Submit Application <ArrowRight size={18} /></>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-400">
                Already have an invite code?{' '}
                <Link to="/dashboard/register" className="text-kula-green font-medium hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
