/**
 * SINGLE SOURCE OF TRUTH: Blush Midnight Luxury Palette
 * Strict compliance with design specifications.
 * No hard-coded hex values allowed anywhere outside this file.
 */

export const colors = {
  // Core brand
  softBlush: '#F6DFDC',
  midnightNavy: '#1B1D47',
  champagneGold: '#D6B98C',
  pearlIvory: '#FFF8F4',
  dustyRose: '#C58F91',
  mutedPlum: '#6D687D',

  // UI support
  pureWhite: '#FFFFFF',
  softBlack: '#25232A',
  lightBlush: '#FBEDEA',
  blushBorder: '#EAD5D1',
  warmGrey: '#99918E',
  deepNavy: '#12142F',
  paleGold: '#EAD9B8',
  roseShadow: '#A9787D',
  midnightBorder: '#45466A',
  goldBronze: '#A8754E',

  // Bold energy accents (campaign moments only, max a few % of any screen)
  electricViolet: '#7545FF',
  hotCoral: '#FF5A5F',

  // Functional semantic mappings
  background: '#FFF8F4',
  card: '#FFFFFF',
  textPrimary: '#1B1D47',
  textSecondary: '#6D687D',
  textBody: '#25232A',
  textMuted: '#99918E',
  border: '#EAD5D1',
  activeTint: '#1B1D47',
  inactiveTint: '#6D687D',
  accentSale: '#FF5A5F',
  accentGlow: '#7545FF',
  goldHighlight: '#D6B98C',
  pressedDark: '#12142F',
} as const;

export const gradients = {
  blushChampagne: ['#F6DFDC', '#EAD0C9', '#D6B98C'] as const,
  midnightElegance: ['#12142F', '#1B1D47', '#35365F'] as const,
  roseLuxury: ['#FBEDEA', '#E8C4C0', '#C58F91'] as const,
  navyChampagne: ['#1B1D47', '#343454', '#A88A68'] as const,
  violetMidnight: ['#1B1D47', '#3A2A8C', '#7545FF'] as const,
} as const;

export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients;
