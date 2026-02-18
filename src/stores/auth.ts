import { create } from 'zustand';
import { api } from '../lib/api';
import type { User, Restaurant, AuthResponse, ApiResponse } from '../types';

interface AuthState {
  user: User | null;
  restaurant: Restaurant | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  fetchRestaurant: () => Promise<void>;
  setRestaurant: (restaurant: Restaurant) => void;
}

const createAuthStore = () => create<AuthState>((set, get) => ({
  user: null,
  restaurant: null,
  isLoading: true,
  isAuthenticated: api.isAuthenticated,

  login: async (email, password) => {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    api.setTokens(res.data.accessToken, res.data.refreshToken);
    set({ user: res.data.user, isAuthenticated: true });
    await get().fetchRestaurant();
  },

  register: async (email, password, name) => {
    const res = await api.post<AuthResponse>('/auth/register', {
      email, password, name, role: 'business',
    });
    api.setTokens(res.data.accessToken, res.data.refreshToken);
    set({ user: res.data.user, isAuthenticated: true });
    await get().fetchRestaurant();
  },

  logout: () => {
    api.post('/auth/logout').catch(() => {});
    api.clearTokens();
    set({ user: null, restaurant: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    try {
      const res = await api.get<ApiResponse<User>>('/users/me');
      set({ user: res.data, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
      api.clearTokens();
    }
  },

  fetchRestaurant: async () => {
    // Try the dedicated endpoint first
    try {
      const res = await api.get<ApiResponse<Restaurant>>('/restaurants/mine');
      set({ restaurant: res.data, isLoading: false });
      return;
    } catch {
      // /restaurants/mine failed — fall through to user-based fallback
    }

    // Fallback: /users/me includes restaurant summary data (id, name, slug, isActive)
    // Use it so the dashboard isn't empty and guards work correctly
    try {
      const userRes = await api.get<ApiResponse<any>>('/users/me');
      if (userRes.data?.restaurant) {
        set({ restaurant: userRes.data.restaurant as Restaurant, isLoading: false });
        return;
      }
    } catch {
      // ignore
    }

    set({ restaurant: null, isLoading: false });
  },

  setRestaurant: (restaurant) => set({ restaurant }),
}));

// Preserve store across Vite HMR to prevent isLoading reset
export const useAuthStore: ReturnType<typeof createAuthStore> =
  (import.meta.hot?.data?.store as ReturnType<typeof createAuthStore>) ?? createAuthStore();

if (import.meta.hot) {
  import.meta.hot.data.store = useAuthStore;
}
