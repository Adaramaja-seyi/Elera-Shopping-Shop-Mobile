/**
 * SAMPLE DATA ONLY: All products, prices, stock and reviews in this file
 * are mock items created strictly for demonstration purposes.
 * None of the brand associations or commercial offers are real.
 */

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  gallery: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'clothing' | 'shoes' | 'bags' | 'accessories';
  gender: 'women' | 'men' | 'unisex';
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  isExclusive?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  sizes: string[];
  colors: ProductColor[];
  tags: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Sovereign Double-Breasted Wool Coat',
    brand: 'ÉLERA ATELIER',
    category: 'clothing',
    gender: 'women',
    price: 1890,
    originalPrice: 2250,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 48,
    description:
      'Sculpted from heavy Italian double-face virgin wool, tailored with dropped shoulders and a belted structured waistline. Finished with horn buttons and satin-lined welt pockets.',
    details: [
      '100% Italian Virgin Wool',
      'Cupro jacquard monogram lining',
      'Hand-finished pick-stitch seams',
      'Specialist dry clean only',
      'Made in Florence, Italy',
    ],
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40', 'FR 42'],
    colors: [
      {
        name: 'Oatmeal Taupe',
        hex: '#D6C8B8',
        image:
          'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Midnight Noir',
        hex: '#1B1D47',
        image:
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Fall/Winter', 'Editorial Choice'],
  },
  {
    id: 'prod-02',
    name: 'Palazzo Monogram Leather Tote',
    brand: "MAISON D'OR",
    category: 'bags',
    gender: 'women',
    price: 2450,
    isExclusive: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 36,
    description:
      'An architectural silhouette crafted in calfskin leather with Champagne Gold hardware. Designed with dual interior compartments, magnetic flap clasp, and a detachable shoulder strap.',
    details: [
      'Full-grain Tuscan calfskin',
      'Champagne gold brushed hardware',
      'Microfiber suede interior',
      'Protective metal base studs',
      'Made in Italy',
    ],
    sizes: ['One Size (32 x 24 x 14 cm)'],
    colors: [
      {
        name: 'Blush Sand',
        hex: '#F6DFDC',
        image:
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Caramel Glaze',
        hex: '#C58F91',
        image:
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Obsidian',
        hex: '#25232A',
        image:
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Exclusive', 'Bestseller', 'Italian Leather'],
  },
  {
    id: 'prod-03',
    name: 'Riviera Platform Mule',
    brand: 'ÉLERA SHOES',
    category: 'shoes',
    gender: 'women',
    price: 890,
    isNew: true,
    isTrending: true,
    rating: 4.7,
    reviewCount: 62,
    description:
      'An elevated platform mule in supple nappa leather, featuring a sculpted block heel and tortoiseshell buckle detailing. The signature ÉLERA toe-strap adds architectural polish.',
    details: [
      'Nappa calfskin upper',
      '90mm block heel, 20mm platform',
      'Leather-lined footbed',
      'Non-slip rubber sole',
      'Made in Spain',
    ],
    sizes: ['EU 35', 'EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
    colors: [
      {
        name: 'Warm Nude',
        hex: '#D6B98C',
        image:
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Blush Ivory',
        hex: '#FFF8F4',
        image:
          'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Noir Patent',
        hex: '#1A1A1A',
        image:
          'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Trending', 'SS26 Runway'],
  },
  {
    id: 'prod-04',
    name: 'Velvet Tailored Blazer',
    brand: 'MAISON NOIR',
    category: 'clothing',
    gender: 'men',
    price: 1240,
    isExclusive: true,
    isTrending: true,
    rating: 4.8,
    reviewCount: 29,
    description:
      'A midnight-blue velvet blazer cut in a slim peak-lapel silhouette. Fully canvassed with horn buttons and a subtle jacquard lining bearing the maison monogram.',
    details: [
      'Genoa crushed velvet',
      'Full canvas construction',
      'Three-button cuff',
      'Horn buttons',
      'Made in Naples, Italy',
    ],
    sizes: ['IT 44', 'IT 46', 'IT 48', 'IT 50', 'IT 52', 'IT 54'],
    colors: [
      {
        name: 'Midnight Velvet',
        hex: '#1B1D47',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Forest Sage',
        hex: '#4A5240',
        image:
          'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Exclusive', 'Trending', 'Eveningwear'],
  },
  {
    id: 'prod-05',
    name: 'Atelier Chain Shoulder Bag',
    brand: 'ÉLERA ATELIER',
    category: 'bags',
    gender: 'women',
    price: 1750,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 71,
    description:
      'A sculptural quilted bag with interlocking chain strap in antiqued gold. Lined in silk twill with the maison monogram and a lipstick mirror.',
    details: [
      'Matelassé lambskin leather',
      'Antiqued gold chain strap',
      'Silk twill interior lining',
      'Push-lock closure',
      'Made in France',
    ],
    sizes: ['One Size (25 x 17 x 7 cm)'],
    colors: [
      {
        name: 'Rose Petal',
        hex: '#C58F91',
        image:
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587467512961-120760940315?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Ivory Cream',
        hex: '#FFF8F4',
        image:
          'https://images.unsplash.com/photo-1587467512961-120760940315?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1587467512961-120760940315?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Bestseller', 'SS26'],
  },
  {
    id: 'prod-06',
    name: 'Corsaire High-Top Sneaker',
    brand: 'MAISON SPORT',
    category: 'shoes',
    gender: 'unisex',
    price: 650,
    isTrending: true,
    isBestseller: true,
    rating: 4.6,
    reviewCount: 112,
    description:
      'A luxury high-top sneaker handcrafted in Italian calf leather with a padded ankle collar. The concealed wedge sole and perforated side panels are signature details.',
    details: [
      'Italian calfskin upper',
      'Padded ankle and tongue',
      'Vulcanised rubber sole',
      'Leather-lined interior',
      'Handcrafted in Italy',
    ],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    colors: [
      {
        name: 'Triple White',
        hex: '#FFFFFF',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Midnight Ink',
        hex: '#1B1D47',
        image:
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Rose Blush',
        hex: '#F6DFDC',
        image:
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Trending', 'Bestseller', 'Unisex'],
  },
  {
    id: 'prod-07',
    name: 'Heirloom Silk Slip Dress',
    brand: 'ÉLERA COLLECTION',
    category: 'clothing',
    gender: 'women',
    price: 980,
    isNew: true,
    isExclusive: true,
    rating: 4.8,
    reviewCount: 44,
    description:
      'A fluid bias-cut slip dress in 22-momme mulberry silk charmeuse. The adjustable spaghetti straps, cowl neckline and invisible zip create an effortless, elevated silhouette.',
    details: [
      '100% 22mm Mulberry Silk',
      'Bias-cut construction',
      'Adjustable straps',
      'Invisible side zip',
      'Hand wash only',
      'Made in Lyon, France',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Champagne',
        hex: '#D6B98C',
        image:
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529635696929-10b5fd0f5e30?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Dusty Rose',
        hex: '#C58F91',
        image:
          'https://images.unsplash.com/photo-1529635696929-10b5fd0f5e30?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1529635696929-10b5fd0f5e30?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Midnight',
        hex: '#1B1D47',
        image:
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Exclusive', 'Runway Favourite'],
  },
  {
    id: 'prod-08',
    name: 'Ophelia Pearl Drop Earrings',
    brand: 'MAISON BIJOU',
    category: 'accessories',
    gender: 'women',
    price: 420,
    isExclusive: true,
    rating: 4.9,
    reviewCount: 38,
    description:
      'South Sea baroque pearls suspended from 18-carat yellow gold hooks. Each pearl is hand-selected for luminosity, with a custom ear cushion for all-day comfort.',
    details: [
      '18-carat yellow gold hooks',
      'South Sea baroque pearls (12–14mm)',
      'Hand-selected for luster',
      'Custom padded ear cushion',
      'Certificate of authenticity',
    ],
    sizes: ['One Size'],
    colors: [
      {
        name: 'Warm Pearl',
        hex: '#FFF8F4',
        image:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1573408301185-9519f94e9d44?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Blush Rose',
        hex: '#F6DFDC',
        image:
          'https://images.unsplash.com/photo-1573408301185-9519f94e9d44?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1573408301185-9519f94e9d44?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Exclusive', 'Fine Jewellery', 'Artisan'],
  },
  {
    id: 'prod-09',
    name: 'Corsaire Leather Oxford',
    brand: 'ÉLERA SHOES',
    category: 'shoes',
    gender: 'men',
    price: 780,
    isBestseller: true,
    isTrending: true,
    rating: 4.7,
    reviewCount: 55,
    description:
      'A Goodyear-welted brogue Oxford in antiqued dark-tan leather. The long-wing cap-toe detailing and double-leather sole provide both craft and comfort.',
    details: [
      'Antiqued English calf leather',
      'Goodyear-welt construction',
      'Double leather sole with rubber heel',
      'Full leather lining',
      'Handcrafted in Northampton, UK',
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    colors: [
      {
        name: 'Dark Tan',
        hex: '#A8754E',
        image:
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1555171133-d20f24c5f0c8?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Black Raven',
        hex: '#25232A',
        image:
          'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Bestseller', 'Trending', 'Craftsmanship'],
  },
  {
    id: 'prod-10',
    name: 'Lumière Cashmere Trench',
    brand: 'ÉLERA ATELIER',
    category: 'clothing',
    gender: 'women',
    price: 2850,
    originalPrice: 3200,
    isExclusive: true,
    isBestseller: true,
    rating: 5.0,
    reviewCount: 22,
    description:
      'A fluid cashmere-silk trench with a sculptural belt and deep storm lapels. Finished with hand-rolled edges, monogram anchor buttons and a waterfall back vent.',
    details: [
      '80% Mongolian cashmere, 20% wild silk',
      'Hand-rolled cuffs and collar',
      'Storm-flap breast pocket',
      'D-ring belt with anchor clasp',
      'Made in Edinburgh, Scotland',
    ],
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40', 'FR 42', 'FR 44'],
    colors: [
      {
        name: 'Warm Stone',
        hex: '#D6B98C',
        image:
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1521335629791-ce4aec067dd7?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Blush Ivory',
        hex: '#FFF8F4',
        image:
          'https://images.unsplash.com/photo-1521335629791-ce4aec067dd7?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1521335629791-ce4aec067dd7?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Exclusive', 'Bestseller', 'AW26 Hero'],
  },
  {
    id: 'prod-11',
    name: 'Artisan Monogram Silk Scarf',
    brand: 'MAISON BIJOU',
    category: 'accessories',
    gender: 'unisex',
    price: 320,
    isTrending: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 67,
    description:
      "A 90x90 cm printed silk twill scarf featuring the season's heritage toile print. Hand-rolled edges finished by artisans in a historic Lyon atelier.",
    details: [
      '100% fine silk twill',
      '90 x 90 cm',
      'Hand-rolled and stitched edges',
      'Digital heritage print',
      'Made in Lyon, France',
    ],
    sizes: ['One Size (90 x 90 cm)'],
    colors: [
      {
        name: 'Blush Garden',
        hex: '#F6DFDC',
        image:
          'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Navy Toile',
        hex: '#1B1D47',
        image:
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529720317453-c8da503f2051?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Trending', 'Accessories'],
  },
  {
    id: 'prod-12',
    name: 'Architecte Structured Clutch',
    brand: "MAISON D'OR",
    category: 'bags',
    gender: 'women',
    price: 1150,
    isNew: true,
    isExclusive: true,
    rating: 4.9,
    reviewCount: 19,
    description:
      'A rigid frame clutch in polished box calf leather with pyramid stud embellishment and a concealed magnetic closure. Interior fitted with a suede card-slot panel.',
    details: [
      'Box calf leather exterior',
      'Pyramid rivet embellishment',
      'Suede interior with card slots',
      'Magnetic closure',
      'Made in Italy',
    ],
    sizes: ['One Size (28 x 15 x 5 cm)'],
    colors: [
      {
        name: 'Muted Blush',
        hex: '#C58F91',
        image:
          'https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Polished Noir',
        hex: '#25232A',
        image:
          'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Exclusive', 'Evening'],
  },
  {
    id: 'prod-13',
    name: 'Titan Slim-Fit Trousers',
    brand: 'MAISON NOIR',
    category: 'clothing',
    gender: 'men',
    price: 580,
    isTrending: true,
    isBestseller: true,
    rating: 4.6,
    reviewCount: 83,
    description:
      'Sharp slim-fit dress trousers in a Japanese wool-stretch blend. Flat front, side pockets and a concealed clasp waistband for a clean silhouette.',
    details: [
      '92% Japanese wool, 8% elastane',
      'Slim flat-front cut',
      'Side and back pockets',
      'Concealed clasp waistband',
      'Half-lined',
      'Made in Japan',
    ],
    sizes: ['IT 44', 'IT 46', 'IT 48', 'IT 50', 'IT 52'],
    colors: [
      {
        name: 'Charcoal',
        hex: '#3C3C3C',
        image:
          'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Midnight Navy',
        hex: '#1B1D47',
        image:
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Trending', 'Bestseller', 'Office & Beyond'],
  },
  {
    id: 'prod-14',
    name: 'Vénus Gold Cuff Bracelet',
    brand: 'MAISON BIJOU',
    category: 'accessories',
    gender: 'women',
    price: 560,
    isNew: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 31,
    description:
      'A sculptural hammered gold-vermeil cuff inspired by ancient Greco-Roman armour. The asymmetric open form wraps the wrist in 2mm polished gold-plate over sterling silver.',
    details: [
      '18-carat gold vermeil over sterling silver',
      '2mm hammered finish',
      'Width: 15mm',
      'Fits most wrists',
      'Handcrafted in Athens',
    ],
    sizes: ['One Size (adjustable)'],
    colors: [
      {
        name: 'Champagne Gold',
        hex: '#D6B98C',
        image:
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1573408301185-9519f94e9d44?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Rose Gold',
        hex: '#A9787D',
        image:
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Trending', 'Fine Jewellery'],
  },
  {
    id: 'prod-15',
    name: 'Eclipse Leather Belt',
    brand: 'ÉLERA ATELIER',
    category: 'accessories',
    gender: 'unisex',
    price: 290,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 94,
    description:
      'A 35mm hand-burnished full-grain leather belt with a solid brass pin buckle. Available in a range of lengths. Each belt develops a unique patina with wear.',
    details: [
      'Full-grain English calf leather',
      '35mm width',
      'Solid brass pin buckle',
      'Hand-burnished edges',
      'Handcrafted in England',
    ],
    sizes: ['80cm', '85cm', '90cm', '95cm', '100cm', '105cm'],
    colors: [
      {
        name: 'Cognac',
        hex: '#A8754E',
        image:
          'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Jet Black',
        hex: '#1A1A1A',
        image:
          'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['Bestseller', 'Unisex', 'Staple'],
  },
  {
    id: 'prod-16',
    name: 'Nomad Suede Chelsea Boot',
    brand: 'ÉLERA SHOES',
    category: 'shoes',
    gender: 'men',
    price: 920,
    isNew: true,
    isExclusive: true,
    rating: 4.8,
    reviewCount: 41,
    description:
      'A refined Chelsea boot in whiskey suede with a Dainite rubber sole and an elasticated gusset panel. Handcrafted on a last exclusive to the maison.',
    details: [
      'Calfskin suede upper',
      'Elasticated ankle gusset',
      'Leather heel tab',
      'Dainite rubber sole',
      'Handcrafted in Northampton, UK',
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      {
        name: 'Whiskey Suede',
        hex: '#A8754E',
        image:
          'https://images.unsplash.com/photo-1555171133-d20f24c5f0c8?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1555171133-d20f24c5f0c8?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
        ],
      },
      {
        name: 'Midnight Suede',
        hex: '#1B1D47',
        image:
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1555171133-d20f24c5f0c8?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529543544282-ea669407fca3?q=80&w=1000&auto=format&fit=crop',
        ],
      },
    ],
    tags: ['New', 'Exclusive', 'Autumn Essential'],
  },
];
