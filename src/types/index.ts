export interface User {
  id: string;
  email: string;
  name: string;
  role: 'consumer' | 'business' | 'admin';
  avatarUrl?: string;
  phone?: string;
  loyaltyPoints: number;
  preferences: string[];
  createdAt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  heroImageUrl?: string;
  photos: string[];
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  ratingAvg: number;
  ratingCount: number;
  isActive: boolean;
  isVerified: boolean;
  categories: Category[];
  openingHours: OpeningHour[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  emoji?: string;
}

export interface OpeningHour {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Bag {
  id: string;
  title: string;
  description: string;
  foodType: string;
  priceOriginal: number;
  priceCurrent: number;
  quantityTotal: number;
  quantityRemaining: number;
  pickupStart: string;
  pickupEnd: string;
  badges: string[];
  allergens: string[];
  dietaryInfo: string[];
  imageUrl?: string;
  isActive: boolean;
  isSoldOut: boolean;
  savingsPercent: number;
  totalOrders?: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  quantity: number;
  subtotal: number;
  platformFee: number;
  total: number;
  status: OrderStatus;
  pickupStart: string;
  pickupEnd: string;
  qrCode: string;
  customerArrivedAt?: string;
  qrScannedAt?: string;
  createdAt: string;
  user: { id: string; name: string; avatarUrl?: string; phone?: string };
  bag: { id: string; title: string; imageUrl?: string };
}

export type OrderStatus = 'pending' | 'paid' | 'ready' | 'collected' | 'cancelled' | 'refunded';

export interface Analytics {
  period: { start: string; end: string };
  summary: {
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    platformFees: number;
    netRevenue: number;
    avgOrderValue: number;
    avgRating: number;
  };
  topBags: {
    bagId: string;
    title: string;
    orderCount: number;
    revenue: number;
  }[];
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: string;
  periodStart: string;
  periodEnd: string;
  orderCount: number;
  grossAmount: number;
  platformFees: number;
  netAmount: number;
  processedAt?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}
