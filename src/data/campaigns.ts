/**
 * SAMPLE DATA ONLY: Editorial campaigns and promotional stories.
 */

export interface Campaign {
  id: string;
  season: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  image: string;
  badge?: string;
  tagline: string;
  gradientTheme?: 'blushChampagne' | 'midnightElegance' | 'violetMidnight' | 'navyChampagne';
}

export const HERO_CAMPAIGN: Campaign = {
  id: 'camp-hero',
  season: 'FALL / WINTER 2026',
  headline: 'THE ARCHITECTURAL SILHOUETTE',
  subheadline: 'A study in volume, noble virgin wools, and sculptural Italian tailoring.',
  ctaText: 'DISCOVER CAMPAIGN',
  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
  badge: 'NEW COLLECTION',
  tagline: 'ÉLERA COUTURE',
};

export const FEATURED_STORIES: Campaign[] = [
  {
    id: 'story-01',
    season: 'CAPSULE 01',
    headline: 'MONOGRAM LEATHERCRAFT',
    subheadline: 'Hand-dyed Tuscan full-grain skins sculpted with brushed Champagne Gold hardware.',
    ctaText: 'EXPLORE BAGS',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    badge: 'LIMITED EDITION',
    tagline: 'MAISON D’OR',
    gradientTheme: 'blushChampagne',
  },
  {
    id: 'story-02',
    season: 'INNOVATION',
    headline: 'KINETIC MINIMALISM',
    subheadline: 'Reimagining luxury footwear through ergonomic lightness and tactile reverse suedes.',
    ctaText: 'VIEW SNEAKERS',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop',
    badge: 'VIOLET DROP',
    tagline: 'KINETIC 01',
    gradientTheme: 'violetMidnight',
  },
];
