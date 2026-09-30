import React from 'react';

export const CalendarIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="8" cy="14" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="16" cy="14" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="8" cy="18" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="12" cy="18" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="16" cy="18" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9.5 9.5c.2-.5.5-.5.8-.5h.6c.2 0 .4.1.5.4.3.7.8 1.9.9 2 .1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.3.3c-.1.1-.2.3-.1.5.3.6.8 1.4 1.5 2 .7.7 1.4 1.1 2 1.4.2.1.4 0 .5-.1l.4-.5c.2-.2.4-.3.6-.2.2.1 1.4.7 2 .9.3.1.4.3.4.5 0 .7-.4 1.4-.9 1.6-.5.2-1.2.2-2.3-.3-1.6-.7-3.1-2.1-4.2-3.7-1-1.4-1.6-3-1.4-4 .1-.4.4-.7.6-.9z" fill="currentColor" stroke="none" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.891-2.891 2.896 2.896 0 0 1 2.891-2.892c.38 0 .739.076 1.068.214V9.43a6.34 6.34 0 0 0-1.068-.091C5.932 9.339 3 12.27 3 15.891 3 19.512 5.932 22.443 9.552 22.443c3.621 0 6.553-2.931 6.553-6.552V8.718a8.214 8.214 0 0 0 3.484.776V6.686z" />
  </svg>
);

export const ShopeeBagIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const HotmartFlameIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.4 2.2c-.3 0-.6.2-.7.4-.5 1.1-.9 2.5-.7 4 .2 1.3.8 2.4 1.5 3.3.3.4.3 1 0 1.4-.4.4-1.1.4-1.5 0-1.2-1.3-1.8-3-1.8-4.9 0-.4-.4-.7-.8-.7-.4 0-.7.3-.8.7-1.1 2.7-.8 5.7.9 8.1 1.7 2.4 4.5 3.8 7.5 3.8 4.7 0 8.5-3.8 8.5-8.5 0-3.3-1.9-6.3-4.8-7.7-.3-.1-.7 0-.9.3-.2.3-.1.7.1 1 1.5 1.5 2.3 3.6 2.3 5.8 0 3.1-2.5 5.6-5.6 5.6-1.9 0-3.6-.9-4.6-2.4-1.2-1.7-1.4-3.9-.7-5.9 1.1-1.3 2.1-2.9 2.2-4.7 0-.3-.3-.7-.6-.7z" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const MessageBubbleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const CartIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const SparkleStar: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-5 h-5', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
  </svg>
);

export const SparkleBadgeIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#B67587',
}) => (
  <svg className={className} viewBox="0 0 28 28" fill="none">
    {/* Central 4-pointed hollow star */}
    <path
      d="M14 4.5 C14 9.2 10.2 13 5.5 13 C10.2 13 14 16.8 14 21.5 C14 16.8 17.8 13 22.5 13 C17.8 13 14 9.2 14 4.5 Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="white"
    />
    {/* Small solid 4-pointed star in top right */}
    <path
      d="M22.5 4.5 C22.5 5.8 21.3 7 20 7 C21.3 7 22.5 8.2 22.5 9.5 C22.5 8.2 23.7 7 25 7 C23.7 7 22.5 5.8 22.5 4.5 Z"
      fill={color}
    />
    {/* Small solid dot in bottom left */}
    <circle cx="7" cy="21" r="1.8" fill={color} />
  </svg>
);

export const MoonOrnament: React.FC<{ color?: string }> = ({ color = 'currentColor' }) => (
  <div className="flex items-center justify-center gap-3 w-full max-w-[280px] my-3">
    <div className="h-[1px] flex-1 opacity-70" style={{ backgroundColor: color }} />
    <svg className="w-4 h-4 shrink-0" style={{ color }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <div className="h-[1px] flex-1 opacity-70" style={{ backgroundColor: color }} />
  </div>
);

export const HeartOutline: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-5 h-5', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const HibiscusFlowerIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = 'w-6 h-6', style }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor">
    {/* Stylized tropical hibiscus 5-petal flower with stamen */}
    <path d="M50 48 C42 30, 22 26, 26 44 C28 52, 40 52, 50 50 Z" opacity="0.9" />
    <path d="M52 48 C60 30, 80 28, 76 45 C74 53, 62 53, 52 50 Z" opacity="0.9" />
    <path d="M52 52 C65 52, 82 68, 68 80 C58 82, 53 66, 51 54 Z" opacity="0.95" />
    <path d="M48 52 C35 52, 18 68, 32 80 C42 82, 47 66, 49 54 Z" opacity="0.95" />
    <path d="M48 45 C38 36, 42 16, 50 18 C58 16, 62 36, 52 45 Z" opacity="0.9" />
    {/* Stamen curving upward with golden pollen nodes */}
    <path d="M50 50 Q56 36 68 28" fill="none" stroke="#D89C48" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="69" cy="27" r="2.5" fill="#E8B349" />
    <circle cx="65" cy="30" r="1.8" fill="#E8B349" />
    <circle cx="61" cy="34" r="1.8" fill="#E8B349" />
  </svg>
);

export const PixIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M112.5 133.3l69.7-69.7c41.1-41.1 107.7-41.1 148.8 0l69.7 69.7c41.1 41.1 41.1 107.7 0 148.8l-69.7 69.7c-41.1 41.1-107.7 41.1-148.8 0l-69.7-69.7c-41.1-41.1-41.1-107.7 0-148.8zm246.6 27.8c-25.7-25.7-67.4-25.7-93.1 0l-69.7 69.7c-25.7 25.7-25.7 67.4 0 93.1l69.7 69.7c25.7 25.7 67.4 25.7 93.1 0l69.7-69.7c25.7-25.7 25.7-67.4 0-93.1l-69.7-69.7z"/>
  </svg>
);

export const StoreIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l2-5h14l2 5" />
    <path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
    <path d="M3 9c0 1.66 1.34 3 3 3s3-1.34 3-3c0 1.66 1.34 3 3 3s3-1.34 3-3c0 1.66 1.34 3 3 3s3-1.34 3-3" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const WandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4l5 5L7 21l-5-5L15 4z" />
    <path d="M11.5 7.5l5 5" />
    <path d="M4 2v4" />
    <path d="M2 4h4" />
    <path d="M20 18v4" />
    <path d="M18 20h4" />
  </svg>
);

export const TarotCardsIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="11" height="16" rx="2" transform="rotate(-6 8.5 13)" />
    <rect x="9" y="3" width="11" height="16" rx="2" />
    <circle cx="14.5" cy="11" r="2.5" />
  </svg>
);

export const WitchcraftIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l7 7-7 13L5 9z" />
    <path d="M5 9h14" />
    <path d="M12 22V9" />
  </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const MoonStarIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    <path d="M19 3v4" />
    <path d="M21 5h-4" />
  </svg>
);



