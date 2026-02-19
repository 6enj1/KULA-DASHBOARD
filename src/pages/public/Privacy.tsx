export default function Privacy() {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-400">Last updated: February 2026</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly: name, email address, phone number, and location data when you create an account. For restaurant partners, we also collect business details including address, business registration information, and banking details for payouts.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">2. How We Use Your Information</h2>
          <p>We use your information to: provide and improve the Service; process transactions and send related information; send promotional communications (with your consent); respond to your comments and questions; detect and prevent fraud.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Location Data</h2>
          <p>We collect location data to show you nearby restaurants and bags. You can disable location services in your device settings, though this will limit some functionality. Location data is not shared with third parties except as needed to provide the Service.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Payment Information</h2>
          <p>Payment processing is handled by Yoco, our payment partner. We do not store full credit card numbers on our servers. We may store the last four digits and card type for your convenience and transaction records.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with: restaurant partners (limited order information needed to fulfil your order); payment processors; service providers who assist in operating our platform; law enforcement when required by law.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Data Security</h2>
          <p>We implement industry-standard security measures including: encryption of data in transit (TLS/SSL); secure password hashing (bcrypt); rate limiting on authentication endpoints; regular security audits.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Data Retention</h2>
          <p>We retain your data for as long as your account is active. You may request deletion of your account and associated data at any time through the app or by contacting us. Some data may be retained for legal or business purposes.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">8. Your Rights (POPIA Compliance)</h2>
          <p>Under the Protection of Personal Information Act (POPIA), you have the right to: access your personal information; correct inaccurate information; request deletion of your data; object to processing of your data; lodge a complaint with the Information Regulator.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">9. Cookies</h2>
          <p>We use essential cookies to keep you signed in and maintain your session. We do not use third-party tracking cookies. Analytics data is collected in aggregate form only.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">10. Children's Privacy</h2>
          <p>Our Service is not directed to children under 18. We do not knowingly collect personal information from children.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">11. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of material changes via email or in-app notification.</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">12. Contact</h2>
          <p>For privacy-related questions, contact us at <a href="mailto:hello@kulasave.co.za" className="text-kula-green hover:underline">hello@kulasave.co.za</a>.</p>
        </div>
      </div>
    </div>
  );
}
