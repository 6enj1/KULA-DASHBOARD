import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { api } from '../../lib/api';
import { MapPin, ArrowRight, LogOut, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { ApiResponse, Restaurant, Category } from '../../types';

// Fix leaflet icon
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function DraggableMarker({ position, onMove }: { position: [number, number]; onMove: (lat: number, lng: number) => void }) {
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        const pos = marker.getLatLng();
        onMove(pos.lat, pos.lng);
      }
    },
  };
  return <Marker draggable position={position} ref={markerRef} eventHandlers={eventHandlers} icon={markerIcon} />;
}

function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e) { onClick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(center, map.getZoom()); }, [center]);
  return null;
}

export default function Onboarding() {
  const { logout, setRestaurant, fetchRestaurant } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  // Step 1: Basic info
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Step 2: Address
  const [addressSearch, setAddressSearch] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [position, setPosition] = useState<[number, number]>([-26.2041, 28.0473]); // Joburg default
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    api.get<ApiResponse<Category[]>>('/categories').then(res => {
      setCategories(res.data);
    }).catch(() => {});
  }, []);

  const geocodeAddress = useCallback(async (query: string) => {
    if (query.length < 3) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=za&limit=5`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => geocodeAddress(addressSearch), 400);
    return () => clearTimeout(timer);
  }, [addressSearch]);

  const selectAddress = (result: any) => {
    setPosition([parseFloat(result.lat), parseFloat(result.lon)]);
    const parts = result.display_name.split(', ');
    setAddressLine1(parts[0] + (parts[1] ? ', ' + parts[1] : ''));
    setCity(parts.find((p: string) => p.includes('City')) || parts[2] || '');
    setProvince(parts.find((p: string) => p.includes('Province') || p.includes('Cape') || p.includes('Gauteng')) || '');
    setPostalCode(parts.find((p: string) => /^\d{4}$/.test(p)) || '');
    setAddressSearch('');
    setSearchResults([]);
  };

  const handleMarkerMove = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data.address) {
        setAddressLine1(`${data.address.road || ''} ${data.address.house_number || ''}`.trim());
        setCity(data.address.city || data.address.town || data.address.suburb || '');
        setProvince(data.address.state || '');
        setPostalCode(data.address.postcode || '');
      }
    } catch {}
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<Restaurant>>('/restaurants', {
        name,
        description,
        addressLine1,
        addressLine2,
        city,
        province,
        postalCode,
        latitude: position[0],
        longitude: position[1],
        phone,
        email,
        website,
        categoryIds: selectedCategories,
      });
      setRestaurant(res.data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create restaurant');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/dashboard/login'); };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src="/kula_logo.png" alt="KULA" className="h-9 w-auto" />
            <span className="text-white font-bold text-lg">KULA</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/40 hover:text-white/60 text-sm">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? 'gradient-green text-white' : 'bg-white/5 text-white/30'
              }`}>
                {s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? 'text-white' : 'text-white/30'}`}>
                {s === 1 ? 'Details' : 'Location'}
              </span>
              {s < 2 && <div className={`w-12 h-0.5 ${step > s ? 'bg-kula-green' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="card-dark p-6 lg:p-8">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold text-white mb-1">Restaurant Details</h2>
              <p className="text-white/50 text-sm mb-6">Tell us about your restaurant</p>

              {error && (
                <div className="mb-6 p-3 rounded-lg bg-kula-error/10 border border-kula-error/20 text-kula-error text-sm">{error}</div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Restaurant Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="input-dark" placeholder="e.g. Mama's Kitchen" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} className="input-dark min-h-[80px] resize-none" placeholder="Tell customers what makes your food special..." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="input-dark" placeholder="+27 11 123 4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="input-dark" placeholder="info@restaurant.com" type="email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Website</label>
                  <input value={website} onChange={e => setWebsite(e.target.value)} className="input-dark" placeholder="https://..." />
                </div>
                {categories.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategories(prev =>
                            prev.includes(cat.id) ? prev.filter(c => c !== cat.id) : [...prev, cat.id]
                          )}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedCategories.includes(cat.id)
                              ? 'bg-kula-green text-white'
                              : 'bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          {cat.emoji || ''} {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={() => { if (name.trim()) setStep(2); }}
                  disabled={!name.trim()}
                  className="w-full gradient-green text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-1">Restaurant Location</h2>
              <p className="text-white/50 text-sm mb-6">Search for your address or drag the pin on the map</p>

              {error && (
                <div className="mb-6 p-3 rounded-lg bg-kula-error/10 border border-kula-error/20 text-kula-error text-sm">{error}</div>
              )}

              <div className="space-y-5">
                {/* Address search */}
                <div className="relative">
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Search Address</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      value={addressSearch}
                      onChange={e => setAddressSearch(e.target.value)}
                      className="input-dark pl-10"
                      placeholder="Type your address..."
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 card-dark divide-y divide-white/5 max-h-60 overflow-y-auto">
                      {searchResults.map((r: any) => (
                        <button
                          key={r.place_id}
                          onClick={() => selectAddress(r)}
                          className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <MapPin size={16} className="text-kula-green-light mt-0.5 shrink-0" />
                            <span className="text-sm text-white/80">{r.display_name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Map */}
                <div className="h-64 rounded-xl overflow-hidden">
                  <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableMarker position={position} onMove={handleMarkerMove} />
                    <MapClickHandler onClick={handleMarkerMove} />
                    <RecenterMap center={position} />
                  </MapContainer>
                </div>

                {/* Address fields */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Address Line 1 *</label>
                  <input value={addressLine1} onChange={e => setAddressLine1(e.target.value)} className="input-dark" placeholder="123 Main Street" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Address Line 2</label>
                  <input value={addressLine2} onChange={e => setAddressLine2(e.target.value)} className="input-dark" placeholder="Suite, Floor, Building..." />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">City *</label>
                    <input value={city} onChange={e => setCity(e.target.value)} className="input-dark" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Province *</label>
                    <input value={province} onChange={e => setProvince(e.target.value)} className="input-dark" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Postal Code *</label>
                    <input value={postalCode} onChange={e => setPostalCode(e.target.value)} className="input-dark" required />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border border-white/10 text-white/60 font-medium hover:bg-white/5 transition-all">
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !addressLine1 || !city || !province || !postalCode}
                    className="flex-[2] gradient-green text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Create Restaurant <ArrowRight size={18} /></>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
