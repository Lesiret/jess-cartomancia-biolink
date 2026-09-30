/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  WhatsAppIcon,
  InstagramIcon,
  TikTokIcon,
  HotmartFlameIcon,
  SparkleBadgeIcon,
  StoreIcon,
  PixIcon,
  ExternalLinkIcon,
  MessageBubbleIcon,
  CartIcon,
} from './components/Icons';
import { SmartImage } from './components/SmartImage';
import { HIBISCUS_THEMES, INITIAL_PROFILE_DATA } from './data/defaultData';
import { LinkItem, ProfileData } from './types';

// Componentes carregados sob demanda para carregamento inicial ultra-rápido do bio-link
const ScheduleNavFlow = React.lazy(() =>
  import('./components/ScheduleNavFlow').then((m) => ({ default: m.ScheduleNavFlow }))
);
const PixModal = React.lazy(() =>
  import('./components/PixModal').then((m) => ({ default: m.PixModal }))
);

// Fallback de carregamento suave com a paleta da marca
const FlowLoadingSkeleton: React.FC = () => (
  <div className="w-full max-w-[420px] mx-auto py-20 flex flex-col items-center justify-center animate-fadeIn text-center">
    <div className="w-9 h-9 border-2 border-[#C082A0]/25 border-t-[#C082A0] rounded-full animate-spin mb-3.5" />
    <span className="font-cinzel text-xs uppercase tracking-[0.14em] text-[#A0557A] font-semibold">
      Carregando...
    </span>
  </div>
);

export default function App() {
  const [profile] = useState<ProfileData>(INITIAL_PROFILE_DATA);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isPixOpen, setIsPixOpen] = useState(false);
  const [pixAmount, setPixAmount] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const toastTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastHideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Transição suave de entrada da landing page
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Pré-carrega o fluxo de agendamento em background durante o tempo ocioso para clique instantâneo
    const preloadTimer = setTimeout(() => {
      import('./components/ScheduleNavFlow');
      import('./components/PixModal');
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(preloadTimer);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (toastHideTimerRef.current) clearTimeout(toastHideTimerRef.current);
    };
  }, []);

  const activeTheme = HIBISCUS_THEMES[profile.themeId] || HIBISCUS_THEMES.flor_de_hibisco;

  const showToast = (msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (toastHideTimerRef.current) clearTimeout(toastHideTimerRef.current);

    setToastMessage(msg);
    // Smooth transition into view
    requestAnimationFrame(() => {
      setIsToastVisible(true);
    });

    // Stay visible comfortably, then fade out gently
    toastTimerRef.current = setTimeout(() => {
      setIsToastVisible(false);
      toastHideTimerRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 500);
    }, 3600);
  };

  const handleLinkClick = (item: LinkItem, e: React.MouseEvent) => {
    if (item.id === 'agendar' || item.url === '#agendar') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsScheduling(true);
      return;
    }
    if (item.id === 'hotmart' || item.url === '#hotmart') {
      e.preventDefault();
      showToast('✨ Os cursos e e-books da Hotmart estarão disponíveis em breve!');
      return;
    }
    if (item.id === 'pix' || item.url === '#pix') {
      e.preventDefault();
      setIsPixOpen(true);
      return;
    }
  };

  // Helper to render matching icon based on item.icon
  const renderIcon = (iconType: string, isPrimary: boolean) => {
    const iconClass = `w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-105 ${
      isPrimary ? 'text-white' : 'text-[#C082A0]'
    }`;

    switch (iconType) {
      case 'whatsapp':
        return <MessageBubbleIcon className={iconClass} />;
      case 'instagram':
        return <InstagramIcon className={iconClass} />;
      case 'tiktok':
        return <TikTokIcon className={iconClass} />;
      case 'store':
        return <StoreIcon className={iconClass} />;
      case 'shopee':
        return <CartIcon className={iconClass} />;
      case 'hotmart':
        return <HotmartFlameIcon className={iconClass} />;
      case 'sparkle':
        return <SparkleBadgeIcon className={iconClass} color={isPrimary ? '#FFFFFF' : '#C082A0'} />;
      case 'pix':
        return <PixIcon className={`w-5 h-5 transition-transform group-hover:scale-105 ${isPrimary ? 'text-white' : 'text-[#C082A0]'}`} />;
      default:
        return <MessageBubbleIcon className={iconClass} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FCFBFB] flex flex-col items-center justify-between text-neutral-800 antialiased selection:bg-rose-100 overflow-x-hidden">
      {/* Dynamic Ambient Breathing Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Glow Orb 1 - Top Right (Soft Hibiscus Rose) */}
        <div className="absolute -top-24 -right-20 w-80 h-80 md:w-[460px] md:h-[460px] rounded-full bg-[#E5B2C7]/38 blur-3xl animate-ambient-breathe-1" />
        {/* Glow Orb 2 - Mid Left (Subtle Warm Petal Peach/Rose) */}
        <div className="absolute top-1/3 -left-28 w-72 h-72 md:w-[420px] md:h-[420px] rounded-full bg-[#F3D0DF]/40 blur-3xl animate-ambient-breathe-2" />
        {/* Glow Orb 3 - Bottom Center-Right (Delicate Petal Aura) */}
        <div className="absolute -bottom-28 right-8 w-80 h-80 md:w-[440px] md:h-[440px] rounded-full bg-[#E8B8CD]/32 blur-3xl animate-ambient-breathe-3" />
      </div>

      {/* Main Landing Page Content */}
      <main className="w-full max-w-[420px] mx-auto px-4 pt-12 md:pt-16 pb-16 flex flex-col items-center flex-1">
        
        {isScheduling ? (
          <React.Suspense fallback={<FlowLoadingSkeleton />}>
            <ScheduleNavFlow
              onBackToHome={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsScheduling(false);
              }}
              whatsappNumber={profile.whatsappNumber}
              showToast={showToast}
              onOpenPix={(amount) => {
                setPixAmount(amount);
                setIsPixOpen(true);
              }}
            />
          </React.Suspense>
        ) : (
          <div
            className={`w-full flex flex-col items-center transition-all duration-1000 ease-out transform ${
              isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-7 scale-[0.98]'
            }`}
          >
            {/* Profile Avatar with bottom-right floating star badge */}
            <div className="relative mb-4">
              <div className="w-34 h-34 md:w-36 md:h-36 rounded-full overflow-hidden shadow-sm border border-neutral-100/80">
                <SmartImage
                  src={profile.avatarUrl}
                  alt={profile.name}
                  wrapperClassName="w-full h-full rounded-full"
                  width={144}
                  height={144}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping white circular badge with identical hollow star, mini star and dot */}
              <div className="absolute -bottom-1 -right-0.5 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-neutral-100/90">
                <SparkleBadgeIcon className="w-5 h-5" color="#C082A0" />
              </div>
            </div>

            {/* Profile Name: JESS (Playfair Display bold serif, centered) */}
            <h1 className="font-playfair text-3xl md:text-[34px] font-semibold tracking-[0.06em] text-[#1E1E1E] mt-2 mb-2 text-center">
              {profile.name}
            </h1>

            {/* Bio sentence in Playfair/Cormorant italic with quotes & ampersand */}
            <p className="font-playfair italic text-[15px] md:text-base text-[#716468] leading-relaxed max-w-[330px] text-center font-normal px-2 mb-7">
              {profile.bio}
            </p>

            {/* Action Links Stack */}
            <section className="w-full space-y-3.5">
              {profile.links.map((link) => {
                const isFeatured = link.isPrimary;

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={(e) => handleLinkClick(link, e)}
                    onMouseEnter={() => {
                      if (link.id === 'agendar') import('./components/ScheduleNavFlow');
                      if (link.id === 'pix') import('./components/PixModal');
                    }}
                    onTouchStart={() => {
                      if (link.id === 'agendar') import('./components/ScheduleNavFlow');
                      if (link.id === 'pix') import('./components/PixModal');
                    }}
                    className={`group relative w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-150 cursor-pointer touch-manipulation select-none ${
                      isFeatured
                        ? 'bg-[#C082A0] text-white shadow-md hover:bg-[#B07290] active:scale-[0.98]'
                        : 'bg-white border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#C082A0]/40 active:border-[#C082A0] active:bg-[#FAF0F5] active:scale-[0.98]'
                    }`}
                  >
                    {/* Left: Icon (all in dusty rose #C082A0) */}
                    <div className="w-7 h-7 flex items-center justify-center shrink-0 mr-3">
                      {renderIcon(link.icon, !!isFeatured)}
                    </div>

                    {/* Center: Title */}
                    <div className="flex-1 flex items-center gap-2 min-w-0 pr-2">
                      <span
                        className={`font-cinzel text-xs md:text-[13px] tracking-[0.14em] uppercase font-bold truncate ${
                          isFeatured ? 'text-white' : 'text-neutral-800'
                        }`}
                      >
                        {link.title}
                      </span>

                      {link.badge && (
                        <span
                          className="text-[9px] font-sans font-medium px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 bg-rose-50 text-[#C082A0] border border-[#C082A0]/30"
                        >
                          {link.badge}
                        </span>
                      )}
                    </div>

                    {/* Right: External Link Arrow (↗) */}
                    <div
                      className={`shrink-0 pl-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isFeatured ? 'text-white/80' : 'text-[#C082A0]/70 group-hover:text-[#C082A0]'
                      }`}
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </section>
          </div>
        )}
      </main>

      {/* Pix Payment & Key Modal */}
      {isPixOpen && (
        <React.Suspense fallback={null}>
          <PixModal
            isOpen={isPixOpen}
            onClose={() => {
              setIsPixOpen(false);
              setPixAmount(undefined);
            }}
            onReturnHome={() => {
              setIsPixOpen(false);
              setPixAmount(undefined);
              setIsScheduling(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            pixKey="49013412000155"
            whatsappNumber={profile.whatsappNumber}
            amount={pixAmount}
          />
        </React.Suspense>
      )}

      {/* Toast Notification with subtle pink gradient, delicate border and readable typography */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-7 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 max-w-[90vw] md:max-w-md rounded-2xl shadow-[0_10px_35px_rgba(192,130,160,0.22)] border border-[#C082A0]/35 bg-gradient-to-r from-[#FFF5F8] via-[#FFFFFF] to-[#FCEDF4] backdrop-blur-md text-[13px] md:text-sm font-medium text-[#2E1B24] tracking-[0.01em] leading-snug text-center transition-all duration-500 ease-out transform ${
            isToastVisible
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
          }`}
        >
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
