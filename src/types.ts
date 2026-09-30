export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  icon: 'calendar' | 'whatsapp' | 'instagram' | 'tiktok' | 'shopee' | 'hotmart' | 'store' | 'pix' | 'sparkle' | 'custom';
  url: string;
  isPrimary?: boolean;
  enabled: boolean;
  badge?: string;
}

export interface ConsultationType {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  description: string;
  canvas: string;
  textPrimary: string;
  textMuted: string;
  primaryButtonBg: string;
  primaryButtonText: string;
  cardBg: string;
  cardBorder: string;
  cardText: string;
  cardSubtitle: string;
  accentGold: string;
  divider: string;
  glowTop: string;
  glowMid: string;
  glowBot: string;
  cardShadow: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  whatsappNumber: string;
  instagramHandle: string;
  tiktokHandle: string;
  shopeeUrl: string;
  hotmartUrl: string;
  links: LinkItem[];
  themeId: string;
}
