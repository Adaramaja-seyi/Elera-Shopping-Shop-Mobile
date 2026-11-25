import { create } from 'zustand';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  id: string; // unique item key
  product: Product;
  selectedSize: string;
  selectedColor: {
    name: string;
    hex: string;
    image: string;
  };
  quantity: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Order Placed' | 'Atelier Tailoring' | 'Dispatched' | 'Delivered';
  timeline: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }[];
  shippingAddress: string;
}

export interface FilterState {
  category: string;
  gender: 'all' | 'women' | 'men' | 'unisex';
  minPrice: number;
  maxPrice: number;
  selectedSizes: string[];
  selectedColors: string[];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
}

interface AppState {
  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Bag / Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; hex: string; image: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartSubtotal: () => number;
  getCartTotal: () => number;

  // Recently Viewed
  recentlyViewedIds: string[];
  addRecentlyViewed: (productId: string) => void;

  // Filter state
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Auth & Profile
  user: {
    name: string;
    email: string;
    tier: string;
    vipNumber: string;
  } | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;

  // Orders
  orders: OrderItem[];
  addOrder: (order: OrderItem) => void;

  // Animation triggers
  flyingItem: {
    image: string;
    active: boolean;
  } | null;
  triggerFlyingItem: (image: string) => void;
  clearFlyingItem: () => void;
  bagBounceTrigger: number;
  triggerBagBounce: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  gender: 'all',
  minPrice: 0,
  maxPrice: 3000,
  selectedSizes: [],
  selectedColors: [],
  sortBy: 'featured',
};

export const useStore = create<AppState>((set, get) => ({
  // Wishlist
  wishlistIds: ['prod-01', 'prod-06'],
  toggleWishlist: (productId: string) => {
    set((state) => {
      const exists = state.wishlistIds.includes(productId);
      return {
        wishlistIds: exists
          ? state.wishlistIds.filter((id) => id !== productId)
          : [...state.wishlistIds, productId],
      };
    });
  },
  isWishlisted: (productId: string) => {
    return get().wishlistIds.includes(productId);
  },

  // Cart
  cart: [
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedSize: 'FR 38',
      selectedColor: PRODUCTS[0].colors[0],
      quantity: 1,
    },
  ],
  addToCart: (product, size, color, quantity = 1) => {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const nextCart = [...state.cart];
        nextCart[existingIndex].quantity += quantity;
        return { cart: nextCart };
      }

      const newItem: CartItem = {
        id: `${product.id}-${size}-${color.name}-${Date.now()}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
      };

      return { cart: [newItem, ...state.cart] };
    });
    get().triggerBagBounce();
  },
  removeFromCart: (cartItemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== cartItemId),
    }));
  },
  updateCartQuantity: (cartItemId, delta) => {
    set((state) => {
      const updated = state.cart
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      return { cart: updated };
    });
  },
  clearCart: () => set({ cart: [] }),
  getCartCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },
  getCartSubtotal: () => {
    return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },
  getCartTotal: () => {
    const subtotal = get().getCartSubtotal();
    return subtotal > 0 ? subtotal : 0;
  },

  // Recently viewed
  recentlyViewedIds: ['prod-02', 'prod-03', 'prod-05'],
  addRecentlyViewed: (productId) => {
    set((state) => {
      const filtered = state.recentlyViewedIds.filter((id) => id !== productId);
      return { recentlyViewedIds: [productId, ...filtered].slice(0, 10) };
    });
  },

  // Filters
  filters: DEFAULT_FILTERS,
  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  // Auth
  user: {
    name: 'Alexandra de Valois',
    email: 'alexandra.valois@elera-atelier.com',
    tier: 'Platinum Privilège',
    vipNumber: 'ELR-7889-VIP',
  },
  isAuthenticated: true,
  login: (email, name = 'Alexandra de Valois') => {
    set({
      user: {
        name,
        email,
        tier: 'Platinum Privilège',
        vipNumber: 'ELR-7889-VIP',
      },
      isAuthenticated: true,
    });
  },
  logout: () => set({ user: null, isAuthenticated: false }),

  // Orders
  orders: [
    {
      id: 'ord-901',
      orderNumber: 'ELR-2026-9812',
      date: '21 Nov 2026',
      items: [
        {
          id: 'item-ord-1',
          product: PRODUCTS[1],
          selectedSize: 'One Size',
          selectedColor: PRODUCTS[1].colors[0],
          quantity: 1,
        },
      ],
      total: 2450,
      status: 'Atelier Tailoring',
      timeline: [
        {
          title: 'Order Confirmed',
          description: 'Payment authorized & receipt dispatched',
          time: '21 Nov, 14:30',
          completed: true,
        },
        {
          title: 'Atelier Inspection & Gift Wrapping',
          description: 'Hand-inspected with scented tissue & ribbon sealed',
          time: '22 Nov, 09:15',
          completed: true,
          current: true,
        },
        {
          title: 'Dispatched via White Glove Express',
          description: 'Courier assignment pending collection',
          time: 'Est. 24 Nov',
          completed: false,
        },
        {
          title: 'Delivered',
          description: 'Signature upon delivery required',
          time: 'Est. 25 Nov',
          completed: false,
        },
      ],
      shippingAddress: '42 Avenue Montaigne, 75008 Paris, France',
    },
  ],
  addOrder: (order) => {
    set((state) => ({ orders: [order, ...state.orders] }));
  },

  // Animations
  flyingItem: null,
  triggerFlyingItem: (image) => {
    set({ flyingItem: { image, active: true } });
  },
  clearFlyingItem: () => {
    set({ flyingItem: null });
  },
  bagBounceTrigger: 0,
  triggerBagBounce: () => {
    set((state) => ({ bagBounceTrigger: state.bagBounceTrigger + 1 }));
  },
}));
