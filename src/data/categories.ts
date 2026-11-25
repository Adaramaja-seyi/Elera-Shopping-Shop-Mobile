/**
 * SAMPLE DATA ONLY: Categories for ÉLERA Atelier.
 */

export interface Category {
  id: string;
  name: string;
  label: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All',
    label: 'All Curations',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    itemCount: 42,
  },
  {
    id: 'clothing',
    name: 'Clothing',
    label: 'Prêt-à-Porter',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    itemCount: 18,
    featured: true,
  },
  {
    id: 'shoes',
    name: 'Shoes',
    label: 'Footwear & Heels',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
    itemCount: 12,
    featured: true,
  },
  {
    id: 'bags',
    name: 'Bags',
    label: 'Leather Goods',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    itemCount: 8,
    featured: true,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    label: 'Jewelry & Eyewear',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
    itemCount: 14,
    featured: true,
  },
  {
    id: 'women',
    name: 'Women',
    label: 'Women’s Collection',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
    itemCount: 26,
  },
  {
    id: 'men',
    name: 'Men',
    label: 'Men’s Collection',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    itemCount: 16,
  },
];
