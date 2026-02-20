import { useEffect, useRef, useState } from 'react';
import { MapPin, ShoppingBag, QrCode } from 'lucide-react';

const steps = [
  {
    number: '01',
    Icon: MapPin,
    title: 'Browse nearby bags',
    description:
      'Open KULA and discover surprise bags from local restaurants near you. New listings drop every day — always fresh, always a great deal.',
  },
  {
    number: '02',
    Icon: ShoppingBag,
    title: 'Reserve & pay',
    description:
      'Tap a bag you like, check the details, and claim it in seconds. Payments are handled securely in-app through Yoco.',
  },
  {
    number: '03',
    Icon: QrCode,
    title: 'Pick up & enjoy',
    description:
      'Show your QR code at the restaurant during your pickup window. Grab your bag and go — food rescued, money saved.',
  },
];

const screens = [
  '/kula-screen-browse.png',
  '/kula-screen-reserve.png',
  '/kula-screen-pickup.png',
];

export default function HowItWorksSection() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const spacer = spacerRef.current;
      if (!spacer) return;
      const rect = spacer.getBoundingClientRect();
      const totalScroll = spacer.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const newStep = Math.min(2, Math.floor(progress * 3));
      setStep(newStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* Spacer — 400vh gives each step ~1 screen of scroll */
    <div ref={spacerRef} style={{ height: '400vh' }}>
      {/* Sticky viewport-height panel */}
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        className="relative flex flex-col justify-center bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950"
      >
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(41,125,107,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(102,217,166,0.06),transparent_55%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Section heading ── */}
          <div className="mb-10 text-center lg:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-kula-green-light">
              How It Works
            </span>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tighter text-white sm:text-5xl lg:text-6xl">
              From hungry to happy
              <br className="hidden sm:block" /> in three taps.
            </h2>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
            {/* ═══════════════════════════════════════════════════════
                LEFT — 3-D iPhone mockup
                The swing wrapper is NEVER touched by screen changes.
                Screen transitions happen only on the <img> tags inside.
            ════════════════════════════════════════════════════════ */}
            <div className="order-2 flex justify-center lg:order-1">
              {/* ── Swing wrapper ── */}
              <div
                style={{
                  animation: 'iphoneSwing 5s ease-in-out infinite',
                  willChange: 'transform',
                  filter:
                    'drop-shadow(0 48px 96px rgba(0,0,0,0.65)) drop-shadow(0 0 48px rgba(41,125,107,0.22))',
                }}
              >
                {/* ── iPhone shell ── */}
                <div
                  style={{
                    position: 'relative',
                    width: '244px',
                    height: '514px',
                    background:
                      'linear-gradient(160deg, #2c2c2e 0%, #1e1e20 55%, #111113 100%)',
                    borderRadius: '52px',
                    boxShadow: [
                      '0 0 0 1.5px rgba(255,255,255,0.09)',
                      'inset 0 0 0 1px rgba(0,0,0,0.9)',
                      'inset 0 1px 0 rgba(255,255,255,0.11)',
                    ].join(', '),
                  }}
                >
                  {/* Screen bezel */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '4px',
                      borderRadius: '48px',
                      overflow: 'hidden',
                      background: '#000',
                    }}
                  >
                    {/* ── Screenshots cross-fade — isolated from swing ── */}
                    {screens.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`KULA app — step ${i + 1}`}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          opacity: i === step ? 1 : 0,
                          transition:
                            'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    ))}
                  </div>

                  {/* Dynamic Island */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '112px',
                      height: '34px',
                      background: '#000',
                      borderRadius: '20px',
                      zIndex: 10,
                    }}
                  />

                  {/* ── Hardware buttons ── */}
                  {/* Silent toggle */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-3px',
                      top: '72px',
                      width: '3px',
                      height: '28px',
                      background: '#3a3a3c',
                      borderRadius: '3px 0 0 3px',
                    }}
                  />
                  {/* Volume up */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-3px',
                      top: '112px',
                      width: '3px',
                      height: '44px',
                      background: '#3a3a3c',
                      borderRadius: '3px 0 0 3px',
                    }}
                  />
                  {/* Volume down */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-3px',
                      top: '166px',
                      width: '3px',
                      height: '44px',
                      background: '#3a3a3c',
                      borderRadius: '3px 0 0 3px',
                    }}
                  />
                  {/* Power / sleep */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-3px',
                      top: '128px',
                      width: '3px',
                      height: '72px',
                      background: '#3a3a3c',
                      borderRadius: '0 3px 3px 0',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                RIGHT — Steps list
            ════════════════════════════════════════════════════════ */}
            <div className="order-1 lg:order-2">
              <div>
                {steps.map((s, i) => {
                  const { Icon } = s;
                  const isActive = i === step;
                  const isPast = i < step;

                  return (
                    <div
                      key={i}
                      className="flex gap-5"
                      style={{
                        opacity: isActive ? 1 : isPast ? 0.48 : 0.22,
                        transform: isActive
                          ? 'translateX(0)'
                          : 'translateX(-8px)',
                        transition:
                          'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      {/* Icon column + connector line */}
                      <div
                        className="flex flex-col items-center"
                        style={{ width: '52px', flexShrink: 0 }}
                      >
                        <div
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            background: isActive
                              ? 'rgba(41,125,107,0.22)'
                              : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${
                              isActive
                                ? 'rgba(102,217,166,0.38)'
                                : 'rgba(255,255,255,0.08)'
                            }`,
                            boxShadow: isActive
                              ? '0 0 24px rgba(41,125,107,0.28)'
                              : 'none',
                            transition:
                              'all 0.7s cubic-bezier(0.16,1,0.3,1)',
                          }}
                        >
                          <Icon
                            size={20}
                            color={
                              isActive
                                ? '#66D9A6'
                                : 'rgba(255,255,255,0.35)'
                            }
                          />
                        </div>

                        {/* Vertical connector */}
                        {i < steps.length - 1 && (
                          <div
                            style={{
                              width: '1px',
                              flex: 1,
                              marginTop: '8px',
                              minHeight: '28px',
                              background:
                                isActive || isPast
                                  ? 'linear-gradient(to bottom, rgba(102,217,166,0.28), rgba(255,255,255,0.05))'
                                  : 'rgba(255,255,255,0.07)',
                              transition: 'background 0.7s ease',
                            }}
                          />
                        )}
                      </div>

                      {/* Text content */}
                      <div
                        style={{
                          paddingBottom:
                            i < steps.length - 1 ? '36px' : '0',
                          paddingTop: '2px',
                          flex: 1,
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: isActive
                              ? '#66D9A6'
                              : 'rgba(255,255,255,0.3)',
                            transition: 'color 0.7s ease',
                          }}
                        >
                          {s.number}
                        </span>
                        <h3
                          style={{
                            marginTop: '5px',
                            marginBottom: '8px',
                            fontSize: '22px',
                            fontWeight: 700,
                            letterSpacing: '-0.025em',
                            lineHeight: 1.2,
                            color: 'white',
                          }}
                        >
                          {s.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '15px',
                            lineHeight: 1.65,
                            color: 'rgba(255,255,255,0.54)',
                            fontWeight: 400,
                          }}
                        >
                          {s.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div
                className="flex gap-1.5"
                style={{ marginTop: '28px', paddingLeft: '64px' }}
              >
                {steps.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '3px',
                      borderRadius: '2px',
                      flex: i === step ? 3 : 1,
                      background:
                        i === step
                          ? 'linear-gradient(90deg, #297D6B, #66D9A6)'
                          : i < step
                          ? 'rgba(102,217,166,0.28)'
                          : 'rgba(255,255,255,0.1)',
                      transition:
                        'flex 0.65s cubic-bezier(0.16,1,0.3,1), background 0.65s ease',
                    }}
                  />
                ))}
              </div>

              {/* Scroll hint */}
              <p
                style={{
                  marginTop: '14px',
                  paddingLeft: '64px',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 1v12M7 1L4.5 3.5M7 1l2.5 2.5M7 13l-2.5-2.5M7 13l2.5-2.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Scroll to explore all steps
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
