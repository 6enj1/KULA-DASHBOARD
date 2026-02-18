import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { format } from 'date-fns';
import { ClipboardList, Clock, User, Check, X, QrCode, Search, Filter } from 'lucide-react';
import type { ApiResponse, Order, OrderStatus } from '../../types';

const statusColors: Record<string, string> = {
  pending: 'bg-gray-400/20 text-gray-400',
  paid: 'bg-blue-400/20 text-blue-400',
  ready: 'bg-kula-success/20 text-kula-success',
  collected: 'bg-kula-green/20 text-kula-green-light',
  cancelled: 'bg-kula-error/20 text-kula-error',
  refunded: 'bg-orange-400/20 text-orange-400',
};

const statusTabs: { label: string; value: string }[] = [
  { label: 'Active', value: 'active' },
  { label: 'All', value: 'all' },
  { label: 'Collected', value: 'collected' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function Orders() {
  const [tab, setTab] = useState('active');
  const [scanCode, setScanCode] = useState('KULA-');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const queryClient = useQueryClient();

  const statusFilter = tab === 'active' ? undefined : tab === 'all' ? undefined : tab;

  const { data: pendingData } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: () => api.get<ApiResponse<Order[]>>('/business/orders/pending'),
    refetchInterval: 15000,
    enabled: tab === 'active',
  });

  const { data: ordersData } = useQuery({
    queryKey: ['orders', tab],
    queryFn: () => api.get<ApiResponse<Order[]>>(`/business/orders${statusFilter ? `?status=${statusFilter}` : ''}`),
    enabled: tab !== 'active',
  });

  const orders = tab === 'active' ? (pendingData?.data || []) : (ordersData?.data || []);

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/business/orders/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingOrders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const scanMutation = useMutation({
    mutationFn: (qrCode: string) => api.post<ApiResponse<any>>(`/business/orders/scan`, { qrCode }),
    onSuccess: (data: any) => {
      setScanResult(`Order ${data.data.orderNumber} collected! (${data.data.customerName})`);
      setScanCode('KULA-');
      queryClient.invalidateQueries({ queryKey: ['pendingOrders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err: any) => {
      setScanResult(err.message);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-white/50 text-sm mt-1">Manage customer orders</p>
        </div>
        <button
          onClick={() => setShowScanner(!showScanner)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-kula-green/20 text-kula-green-light font-medium text-sm hover:bg-kula-green/30 transition-colors"
        >
          <QrCode size={18} /> Scan QR Code
        </button>
      </div>

      {/* QR Scanner */}
      {showScanner && (
        <div className="card-dark p-5 animate-fade-in">
          <h3 className="text-white font-semibold mb-3">Scan QR Code</h3>
          <div className="flex gap-3">
            <input
              value={scanCode}
              onChange={e => setScanCode(e.target.value)}
              className="input-dark flex-1"
              placeholder="KULA-XXXXXX"
            />
            <button
              onClick={() => scanCode.length > 5 && scanMutation.mutate(scanCode)}
              disabled={scanCode.length <= 5 || scanMutation.isPending}
              className="px-5 py-3 gradient-green text-white rounded-xl font-medium text-sm disabled:opacity-50"
            >
              {scanMutation.isPending ? 'Scanning...' : 'Verify'}
            </button>
          </div>
          {scanResult && (
            <p className={`mt-3 text-sm ${scanResult.includes('collected') ? 'text-kula-success' : 'text-kula-error'}`}>
              {scanResult}
            </p>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 w-fit">
        {statusTabs.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.value ? 'bg-kula-green text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {orders.length === 0 ? (
        <div className="card-dark p-12 text-center">
          <ClipboardList size={40} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/40">No orders found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="card-dark p-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Status indicator */}
                  <div className={`w-2 h-full min-h-[48px] rounded-full ${
                    order.customerArrivedAt && ['paid', 'ready'].includes(order.status)
                      ? 'bg-kula-amber animate-pulse'
                      : order.status === 'ready' ? 'bg-kula-success'
                      : order.status === 'paid' ? 'bg-blue-400'
                      : order.status === 'collected' ? 'bg-kula-green'
                      : 'bg-kula-error'
                  }`} />

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold">{order.orderNumber}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {order.customerArrivedAt && ['paid', 'ready'].includes(order.status) ? 'CUSTOMER HERE' : order.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50">
                      <span className="flex items-center gap-1"><User size={14} /> {order.user.name}</span>
                      <span>{order.bag.title} x{order.quantity}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {format(new Date(order.pickupStart), 'HH:mm')} - {format(new Date(order.pickupEnd), 'HH:mm')}
                      </span>
                    </div>
                    <p className="text-kula-green-light font-semibold text-sm mt-1">
                      R{(order.total / 100).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {['paid', 'ready'].includes(order.status) && (
                  <div className="flex gap-2 sm:shrink-0">
                    {order.status === 'paid' && (
                      <button
                        onClick={() => updateStatus.mutate({ id: order.id, status: 'ready' })}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kula-success/20 text-kula-success text-sm font-medium hover:bg-kula-success/30 transition-colors"
                      >
                        <Check size={16} /> Ready
                      </button>
                    )}
                    <button
                      onClick={() => updateStatus.mutate({ id: order.id, status: 'collected' })}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kula-green/20 text-kula-green-light text-sm font-medium hover:bg-kula-green/30 transition-colors"
                    >
                      <Check size={16} /> Collected
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Cancel this order?')) {
                          updateStatus.mutate({ id: order.id, status: 'cancelled' });
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-kula-error/10 text-kula-error/70 text-sm font-medium hover:bg-kula-error/20 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
