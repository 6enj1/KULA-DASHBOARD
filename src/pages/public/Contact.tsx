import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useInView } from '../../lib/useInView';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [formRef, formVisible] = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950 py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(41,125,107,0.1),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative hero-stagger">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter">Get in Touch</h1>
          <p className="mt-6 text-white/50 text-lg font-light">
            Have questions? Want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div ref={formRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-20">
            {/* Contact info */}
            <div className={`lg:col-span-2 reveal ${formVisible ? 'visible' : ''}`}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight-heading">Contact Information</h2>
              <p className="text-gray-400 mt-4 font-light">We're based in Johannesburg and we'd love to connect.</p>

              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-kula-green/10 flex items-center justify-center shrink-0">
                    <Mail size={22} className="text-kula-green" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:hello@kulasave.co.za" className="text-kula-green text-sm hover:underline">hello@kulasave.co.za</a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-kula-green/10 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-kula-green" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-400 text-sm">Johannesburg, Gauteng<br />South Africa</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-kula-green/10 flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-kula-green" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-400 text-sm">Coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className={`lg:col-span-3 reveal ${formVisible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              {sent ? (
                <div className="bg-kula-green/5 rounded-2xl p-12 text-center border border-kula-green/10 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-kula-green/10 flex items-center justify-center mx-auto mb-5">
                    <Send size={24} className="text-kula-green" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                  <p className="text-gray-400 mt-3">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-8 text-kula-green font-medium text-sm hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" required>
                      <option value="">Select a topic...</option>
                      <option value="partnership">Restaurant Partnership</option>
                      <option value="support">Customer Support</option>
                      <option value="press">Press Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-field min-h-[160px] resize-none" placeholder="How can we help?" required />
                  </div>
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
