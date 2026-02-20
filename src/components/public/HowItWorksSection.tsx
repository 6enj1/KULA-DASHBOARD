import { useEffect, useRef, useState } from 'react';
import { MapPin, ShoppingBag, QrCode } from 'lucide-react';

// ── Responsive window width ───────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth : 1200),
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return w;
}

// ── Content ───────────────────────────────────────────────────────────────
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

// Native iPhone size the mockup is built for
const IPHONE_W = 244;
const IPHONE_H = 514;

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  // stepRef keeps the authoritative step value accessible inside event-handler
  // closures without stale-closure issues.
  const stepRef = useRef(0);

  // ── Responsive iPhone sizing ─────────────────────────────────────────────
  const winW = useWindowWidth();
  const phoneW = Math.round(Math.min(IPHONE_W, Math.max(120, winW * 0.26)));
  const phoneH = Math.round(phoneW * (IPHONE_H / IPHONE_W));
  const phoneScale = phoneW / IPHONE_W;

  // ── Single unified interaction effect ────────────────────────────────────
  //
  // All handlers live in one effect so they share plain closure variables —
  // no cross-effect ref sharing, no stale closures, no race conditions.
  //
  // Lock condition: section "fills" the viewport, defined as:
  //   • section top  ≤ viewport top  (rect.top  ≤  8 px tolerance)
  //   • section bottom ≤ viewport bottom (rect.bottom ≤ vh + 8)
  //   • section bottom > 0  (section is not fully above the viewport —
  //     fixes the bug where rect.bottom < 0 still satisfied ≤ vh)
  //
  // This fires at exactly the moment the section bottom touches the screen
  // bottom while the section top is at/above the screen top.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Closure-local state (avoids cross-effect ref sharing) ────────────
    let locked      = false;  // scroll currently hijacked?
    let wasVisible  = false;  // was section filling viewport last tick?
    let cooldown    = false;  // step-change cooldown active?
    let grace       = false;  // brief post-lock grace period (kills inertia)?
    let touchStartY = 0;
    let lastScrollY = window.scrollY;

    // True only when the section completely fills the viewport
    const fills = (): boolean => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      return r.top <= 8 && r.bottom <= vh + 8 && r.bottom > 0;
    };

    const lock = (scrollingDown: boolean) => {
      locked     = true;
      wasVisible = true;   // prevent same-tick re-lock
      grace      = true;
      setTimeout(() => { grace = false; }, 500); // absorb trackpad inertia
      stepRef.current = scrollingDown ? 0 : 2;
      setStep(stepRef.current);
    };

    const unlock = () => {
      locked     = false;
      wasVisible = true;   // prevent immediate re-lock on next scroll tick
    };

    const advance = (dir: 1 | -1) => {
      if (!locked || grace || cooldown) return;
      if (dir > 0) {
        if (stepRef.current < 2) {
          stepRef.current++;
          setStep(stepRef.current);
          cooldown = true;
          setTimeout(() => { cooldown = false; }, 700);
        } else {
          unlock();
        }
      } else {
        if (stepRef.current > 0) {
          stepRef.current--;
          setStep(stepRef.current);
          cooldown = true;
          setTimeout(() => { cooldown = false; }, 700);
        } else {
          unlock();
        }
      }
    };

    // ── Scroll: detect when section fills the viewport ───────────────────
    const onScroll = () => {
      const visible = fills();

      if (visible && !wasVisible && !locked) {
        lock(window.scrollY >= lastScrollY); // true = scrolling down
      }

      // Only clear wasVisible when section has LEFT the viewport, so we
      // correctly re-lock the next time it enters.
      if (!visible) wasVisible = false;

      lastScrollY = window.scrollY;
    };

    // ── Wheel: intercept while locked ────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (!locked) return;
      e.preventDefault();
      if (Math.abs(e.deltaY) < 3) return;
      advance(e.deltaY > 0 ? 1 : -1);
    };

    // ── Touch: intercept while locked ────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!locked) return;
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) < 30) return;
      touchStartY = e.touches[0].clientY;
      advance(dy > 0 ? 1 : -1);
    };

    window.addEventListener('scroll',     onScroll,    { passive: true  });
    document.addEventListener('wheel',      onWheel,     { passive: false });
    document.addEventListener('touchstart', onTouchStart,{ passive: true  });
    document.addEventListener('touchmove',  onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('scroll',     onScroll);
      document.removeEventListener('wheel',      onWheel);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove',  onTouchMove);
    };
  }, []);

  // ── Icon size for steps (mirrors phone breakpoints) ──────────────────────
  const iconBoxSize = winW < 640 ? 32 : winW < 1024 ? 40 : 52;
  const iconSize    = winW < 640 ? 15 : winW < 1024 ? 18 : 20;
  const iconRadius  = winW < 640 ? 10 : winW < 1024 ? 12 : 16;
  const stepGap     = winW < 640 ? 24 : winW < 1024 ? 28 : 36;
  const titleSize   = winW < 640 ? 14 : winW < 1024 ? 17 : 22;
  const descSize    = winW < 640 ? 11 : winW < 1024 ? 13 : 15;
  const progressLeft = iconBoxSize + (winW < 640 ? 8 : 12);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-[#0a201d] to-gray-950"
      style={{ minHeight: '100svh' }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(41,125,107,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(102,217,166,0.06),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">

        {/* ── Section heading ─────────────────────────────────────────── */}
        <div className="mb-8 text-center lg:mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-kula-green-light sm:text-xs">
            How It Works
          </span>
          <h2 className="mt-2 text-balance text-2xl font-bold tracking-tighter text-white sm:text-3xl lg:text-5xl xl:text-6xl">
            From hungry to happy
            <br className="hidden sm:block" /> in three taps.
          </h2>
        </div>

        {/* ── Always side-by-side: iPhone left, steps right ───────────── */}
        <div className="flex flex-row items-center gap-4 sm:gap-8 lg:gap-14 xl:gap-24">

          {/* ══════════════════════════════════════════════════════════════
              iPhone — always on the LEFT, scales with viewport width.
              Layout space = phoneW × phoneH.
              The actual 244×514 mockup sits inside, scaled to fit.
          ══════════════════════════════════════════════════════════════ */}
          <div
            style={{ width: phoneW, height: phoneH, flexShrink: 0, position: 'relative' }}
          >
            {/* Centre + scale the full-size mockup into the layout box */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Scale wrapper (separate from swing so they don't conflict) */}
              <div style={{ transform: `scale(${phoneScale})`, transformOrigin: 'center center' }}>
                {/* ── Swing wrapper — the ONLY element with the swing animation ── */}
                <div
                  style={{
                    animation: 'iphoneSwing 5s ease-in-out infinite',
                    willChange: 'transform',
                    filter:
                      'drop-shadow(0 40px 80px rgba(0,0,0,0.65)) drop-shadow(0 0 40px rgba(41,125,107,0.22))',
                  }}
                >
                  {/* ── iPhone shell at native 244 × 514 ── */}
                  <div
                    style={{
                      position: 'relative',
                      width: IPHONE_W,
                      height: IPHONE_H,
                      background:
                        'linear-gradient(160deg, #2c2c2e 0%, #1e1e20 55%, #111113 100%)',
                      borderRadius: 52,
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
                        inset: 4,
                        borderRadius: 48,
                        overflow: 'hidden',
                        background: '#000',
                      }}
                    >
                      {/* Screenshots cross-fade — totally isolated from swing */}
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
                            transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />
                      ))}
                    </div>

                    {/* Dynamic Island */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 14,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 78,
                        height: 24,
                        background: '#000',
                        borderRadius: 12,
                        zIndex: 10,
                      }}
                    />

                    {/* Hardware buttons */}
                    <div style={{ position: 'absolute', left: -3, top: 72,  width: 3, height: 28, background: '#3a3a3c', borderRadius: '3px 0 0 3px' }} />
                    <div style={{ position: 'absolute', left: -3, top: 112, width: 3, height: 44, background: '#3a3a3c', borderRadius: '3px 0 0 3px' }} />
                    <div style={{ position: 'absolute', left: -3, top: 166, width: 3, height: 44, background: '#3a3a3c', borderRadius: '3px 0 0 3px' }} />
                    <div style={{ position: 'absolute', right: -3, top: 128, width: 3, height: 72, background: '#3a3a3c', borderRadius: '0 3px 3px 0' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              Steps — always on the RIGHT, fills remaining space
          ══════════════════════════════════════════════════════════════ */}
          <div className="min-w-0 flex-1">
            <div>
              {steps.map((s, i) => {
                const { Icon } = s;
                const isActive = i === step;
                const isPast   = i < step;

                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: winW < 640 ? 8 : 12,
                      opacity: isActive ? 1 : isPast ? 0.48 : 0.22,
                      transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                      transition:
                        'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {/* Icon + connector */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: iconBoxSize }}>
                      <div
                        style={{
                          width: iconBoxSize,
                          height: iconBoxSize,
                          borderRadius: iconRadius,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          background: isActive ? 'rgba(41,125,107,0.22)' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isActive ? 'rgba(102,217,166,0.38)' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: isActive ? '0 0 20px rgba(41,125,107,0.28)' : 'none',
                          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      >
                        <Icon size={iconSize} color={isActive ? '#66D9A6' : 'rgba(255,255,255,0.35)'} />
                      </div>

                      {i < steps.length - 1 && (
                        <div
                          style={{
                            width: 1,
                            flex: 1,
                            marginTop: 6,
                            minHeight: 20,
                            background: isActive || isPast
                              ? 'linear-gradient(to bottom, rgba(102,217,166,0.28), rgba(255,255,255,0.05))'
                              : 'rgba(255,255,255,0.07)',
                            transition: 'background 0.7s ease',
                          }}
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div
                      style={{
                        paddingBottom: i < steps.length - 1 ? stepGap : 0,
                        paddingTop: 2,
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: isActive ? '#66D9A6' : 'rgba(255,255,255,0.3)',
                          transition: 'color 0.7s ease',
                        }}
                      >
                        {s.number}
                      </span>
                      <h3
                        style={{
                          marginTop: 4,
                          marginBottom: winW < 640 ? 4 : 6,
                          fontSize: titleSize,
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                          color: 'white',
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        style={{
                          fontSize: descSize,
                          lineHeight: 1.6,
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
              style={{
                display: 'flex',
                gap: 6,
                marginTop: winW < 640 ? 16 : 24,
                paddingLeft: progressLeft,
              }}
            >
              {steps.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 3,
                    borderRadius: 2,
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
                marginTop: 10,
                paddingLeft: progressLeft,
                fontSize: 11,
                color: 'rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 1v12M7 1L4.5 3.5M7 1l2.5 2.5M7 13l-2.5-2.5M7 13l2.5-2.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Scroll to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
