import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/auth';
import { api } from '../../lib/api';
import { Save, MapPin, Globe, Phone, Mail, Store, Upload } from 'lucide-react';
import type { ApiResponse, Restaurant } from '../../types';

export default function Profile() {
  const { restaurant, setRestaurant } = useAuthStore();

  const [form, setForm] = useState({
    name: '', description: '', phone: '', email: '', website: '',
    addressLine1: '', addressLine2: '', city: '', province: '', postalCode: '',
    logoUrl: '', heroImageUrl: '',
  });

  useEffect(() => {
    if (restaurant) {
      setForm({
        name: restaurant.name || '',
        description: restaurant.description || '',
        phone: restaurant.phone || '',
        email: restaurant.email || '',
        website: restaurant.website || '',
        addressLine1: restaurant.addressLine1 || '',
        addressLine2: restaurant.addressLine2 || '',
        city: restaurant.city || '',
        province: restaurant.province || '',
        postalCode: restaurant.postalCode || '',
        logoUrl: restaurant.logoUrl || '',
        heroImageUrl: restaurant.heroImageUrl || '',
      });
    }
  }, [restaurant]);

  const [uploading, setUploading] = useState<'logo' | 'hero' | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File, field: 'logoUrl' | 'heroImageUrl') => {
    setUploading(field === 'logoUrl' ? 'logo' : 'hero');
    try {
      const url = await api.upload(file);
      setForm(prev => ({ ...prev, [field]: url }));
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(null);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: any) => api.patch<ApiResponse<Restaurant>>('/restaurants/mine', data),
    onSuccess: (res) => {
      setRestaurant(res.data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Restaurant Profile</h1>
        <p className="text-white/50 text-sm mt-1">Manage your restaurant details</p>
      </div>

      {/* Status badge */}
      <div className="flex gap-3">
        {restaurant?.isActive && (
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-kula-success/20 text-kula-success">Active</span>
        )}
        {!restaurant?.isActive && (
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-kula-amber/20 text-kula-amber">Pending Activation</span>
        )}
        {restaurant?.isVerified && (
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-400/20 text-blue-400">Verified</span>
        )}
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/40">
          Rating: {restaurant?.ratingAvg ? Number(restaurant.ratingAvg).toFixed(1) : 'N/A'} ({restaurant?.ratingCount || 0} reviews)
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card-dark p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Store size={20} className="text-kula-green-light" /> Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Restaurant Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-dark min-h-[80px] resize-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  <Phone size={14} className="inline mr-1" /> Phone
                </label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  <Mail size={14} className="inline mr-1" /> Email
                </label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  <Globe size={14} className="inline mr-1" /> Website
                </label>
                <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="input-dark" />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="card-dark p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-kula-green-light" /> Address
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Address Line 1</label>
              <input value={form.addressLine1} onChange={e => setForm({ ...form, addressLine1: e.target.value })} className="input-dark" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Address Line 2</label>
              <input value={form.addressLine2} onChange={e => setForm({ ...form, addressLine2: e.target.value })} className="input-dark" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">City</label>
                <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="input-dark" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Province</label>
                <input value={form.province} onChange={e => setForm({ ...form, province: e.target.value })} className="input-dark" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Postal Code</label>
                <input value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} className="input-dark" />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="card-dark p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Images</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Logo</label>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'logoUrl');
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploading === 'logo'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {uploading === 'logo' ? (
                  <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {uploading === 'logo' ? 'Uploading...' : 'Upload Logo'}
              </button>
              {form.logoUrl && <img src={form.logoUrl} alt="Logo" className="mt-2 w-16 h-16 rounded-xl object-cover" />}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Hero Image</label>
              <input
                ref={heroInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'heroImageUrl');
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                onClick={() => heroInputRef.current?.click()}
                disabled={uploading === 'hero'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {uploading === 'hero' ? (
                  <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {uploading === 'hero' ? 'Uploading...' : 'Upload Hero Image'}
              </button>
              {form.heroImageUrl && <img src={form.heroImageUrl} alt="Hero" className="mt-2 w-full h-32 rounded-xl object-cover" />}
            </div>
          </div>
        </div>

        {mutation.isSuccess && (
          <p className="text-kula-success text-sm">Profile updated successfully!</p>
        )}
        {mutation.isError && (
          <p className="text-kula-error text-sm">{(mutation.error as Error).message}</p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex items-center gap-2 px-6 py-3 gradient-green text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
        >
          {mutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <><Save size={18} /> Save Changes</>
          )}
        </button>
      </form>
    </div>
  );
}
