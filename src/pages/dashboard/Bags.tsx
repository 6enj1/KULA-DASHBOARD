import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { format } from 'date-fns';
import { Plus, ShoppingBag, Edit2, Trash2, X, Clock, Tag, Upload } from 'lucide-react';
import type { ApiResponse, Bag } from '../../types';

const defaultBag = {
  title: '', description: '', foodType: '', priceOriginal: '', priceCurrent: '',
  quantityTotal: '', pickupStart: '', pickupEnd: '', allergens: '', dietaryInfo: '', imageUrl: '',
};

export default function Bags() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultBag);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['businessBags'],
    queryFn: () => api.get<ApiResponse<Bag[]>>('/business/bags'),
  });

  const bags = data?.data || [];

  const saveMutation = useMutation({
    mutationFn: (data: any) => editingId
      ? api.patch(`/bags/${editingId}`, data)
      : api.post('/bags', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessBags'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/bags/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['businessBags'] }),
  });

  const resetForm = () => {
    setForm(defaultBag);
    setEditingId(null);
    setShowForm(false);
  };

  const openEdit = (bag: Bag) => {
    setEditingId(bag.id);
    setForm({
      title: bag.title,
      description: bag.description,
      foodType: bag.foodType,
      priceOriginal: String(bag.priceOriginal),
      priceCurrent: String(bag.priceCurrent),
      quantityTotal: String(bag.quantityTotal),
      pickupStart: bag.pickupStart ? format(new Date(bag.pickupStart), "yyyy-MM-dd'T'HH:mm") : '',
      pickupEnd: bag.pickupEnd ? format(new Date(bag.pickupEnd), "yyyy-MM-dd'T'HH:mm") : '',
      allergens: bag.allergens?.join(', ') || '',
      dietaryInfo: bag.dietaryInfo?.join(', ') || '',
      imageUrl: bag.imageUrl || '',
    });
    setShowForm(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const url = await api.upload(file);
      setForm(prev => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      title: form.title,
      description: form.description,
      foodType: form.foodType,
      priceOriginal: Number(form.priceOriginal),
      priceCurrent: Number(form.priceCurrent),
      quantityTotal: Number(form.quantityTotal),
      pickupStart: new Date(form.pickupStart).toISOString(),
      pickupEnd: new Date(form.pickupEnd).toISOString(),
    };
    if (form.allergens) payload.allergens = form.allergens.split(',').map(s => s.trim()).filter(Boolean);
    if (form.dietaryInfo) payload.dietaryInfo = form.dietaryInfo.split(',').map(s => s.trim()).filter(Boolean);
    if (form.imageUrl) payload.imageUrl = form.imageUrl;
    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Surprise Bags</h1>
          <p className="text-white/50 text-sm mt-1">Create and manage your food listings</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-green text-white font-medium text-sm hover:opacity-90 transition-all"
        >
          <Plus size={18} /> New Bag
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="card-dark p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Bag' : 'New Surprise Bag'}
              </h2>
              <button onClick={resetForm} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-dark" placeholder="e.g. Mystery Lunch Bag" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-dark min-h-[70px] resize-none" placeholder="What might customers expect?" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Food Type *</label>
                <input value={form.foodType} onChange={e => setForm({ ...form, foodType: e.target.value })} className="input-dark" placeholder="e.g. Sushi, Bakery, Mixed" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Original Price (cents) *</label>
                  <input type="number" value={form.priceOriginal} onChange={e => setForm({ ...form, priceOriginal: e.target.value })} className="input-dark" placeholder="8000" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Sale Price (cents) *</label>
                  <input type="number" value={form.priceCurrent} onChange={e => setForm({ ...form, priceCurrent: e.target.value })} className="input-dark" placeholder="3500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Quantity *</label>
                <input type="number" value={form.quantityTotal} onChange={e => setForm({ ...form, quantityTotal: e.target.value })} className="input-dark" placeholder="5" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Pickup Start *</label>
                  <input type="datetime-local" value={form.pickupStart} onChange={e => setForm({ ...form, pickupStart: e.target.value })} className="input-dark" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Pickup End *</label>
                  <input type="datetime-local" value={form.pickupEnd} onChange={e => setForm({ ...form, pickupEnd: e.target.value })} className="input-dark" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Allergens (comma-separated)</label>
                <input value={form.allergens} onChange={e => setForm({ ...form, allergens: e.target.value })} className="input-dark" placeholder="Gluten, Dairy, Nuts" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Dietary Info (comma-separated)</label>
                <input value={form.dietaryInfo} onChange={e => setForm({ ...form, dietaryInfo: e.target.value })} className="input-dark" placeholder="Vegetarian, Halal" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Image</label>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                </button>
                {form.imageUrl && <img src={form.imageUrl} alt="Bag" className="mt-2 w-full h-32 rounded-xl object-cover" />}
              </div>

              {saveMutation.isError && (
                <p className="text-kula-error text-sm">{(saveMutation.error as Error).message}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-medium hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-[2] gradient-green text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {saveMutation.isPending ? 'Saving...' : editingId ? 'Update Bag' : 'Create Bag'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bags grid */}
      {bags.length === 0 ? (
        <div className="card-dark p-12 text-center">
          <ShoppingBag size={40} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/40 mb-4">No bags yet. Create your first surprise bag!</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-green text-white font-medium text-sm"
          >
            <Plus size={18} /> Create Bag
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {bags.map(bag => {
            const isExpired = new Date(bag.pickupEnd) < new Date();
            return (
              <div key={bag.id} className={`card-dark overflow-hidden ${isExpired ? 'opacity-50' : ''}`}>
                {bag.imageUrl && (
                  <div className="h-36 bg-white/5 overflow-hidden">
                    <img src={bag.imageUrl} alt={bag.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-semibold">{bag.title}</h3>
                      <p className="text-white/40 text-xs mt-0.5">{bag.foodType}</p>
                    </div>
                    <div className="flex gap-1">
                      {bag.badges?.map(b => (
                        <span key={b} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-kula-amber/20 text-kula-amber">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-kula-green-light font-bold text-lg">
                      R{(bag.priceCurrent / 100).toFixed(0)}
                    </span>
                    <span className="text-white/30 text-sm line-through">
                      R{(bag.priceOriginal / 100).toFixed(0)}
                    </span>
                    <span className="text-kula-success text-xs font-medium">
                      -{bag.savingsPercent}%
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                    <span className="flex items-center gap-1">
                      <Tag size={12} /> {bag.quantityRemaining}/{bag.quantityTotal} left
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {bag.pickupStart ? format(new Date(bag.pickupStart), 'HH:mm') : '?'} - {bag.pickupEnd ? format(new Date(bag.pickupEnd), 'HH:mm') : '?'}
                    </span>
                  </div>

                  {bag.totalOrders !== undefined && (
                    <p className="text-white/30 text-xs mb-3">{bag.totalOrders} orders</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(bag)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${bag.title}"?`)) deleteMutation.mutate(bag.id);
                      }}
                      className="py-2 px-3 rounded-lg bg-kula-error/10 text-kula-error/60 hover:bg-kula-error/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
