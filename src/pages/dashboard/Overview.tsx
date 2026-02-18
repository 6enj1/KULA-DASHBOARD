import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useAuthStore } from '../../stores/auth';
import { ShoppingBag, ClipboardList, TrendingUp, Star, AlertCircle, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { ApiResponse, Analytics, Order } from '../../types';

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: any; label: string; value: string; sub?: string; color: string;
}) {
  return (
    <div className="card-dark p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/50 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-kula-green-light mt-1">{sub}</p>}
    </div>
  );
}

export default function Overview() {
  const { restaurant } = useAuthStore();

  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => api.get<ApiResponse<Analytics>>('/business/analytics'),
  });

  const { data: pendingOrders } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: () => api.get<ApiResponse<Order[]>>('/business/orders/pending'),
    refetchInterval: 15000, // Poll every 15s
  });

  const stats = analytics?.data?.summary;
  const pending = pendingOrders?.data || [];
  const arrivedOrders = pending.filter(o => o.customerArrivedAt);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">
          Welcome back, {restaurant?.name}
        </p>
      </div>

      {/* Arrived customers alert */}
      {arrivedOrders.length > 0 && (
        <div className="p-4 rounded-2xl bg-kula-amber/10 border border-kula-amber/20 flex items-start gap-3">
          <AlertCircle size={20} className="text-kula-amber mt-0.5 shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">
              {arrivedOrders.length} customer{arrivedOrders.length > 1 ? 's' : ''} waiting!
            </p>
            <p className="text-white/60 text-xs mt-0.5">
              {arrivedOrders.map(o => `${o.user.name} (${o.orderNumber})`).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardList}
          label="Total Orders"
          value={String(stats?.totalOrders || 0)}
          sub={`${stats?.completedOrders || 0} completed`}
          color="bg-kula-green/20 text-kula-green-light"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue"
          value={`R${((stats?.netRevenue || 0) / 100).toFixed(0)}`}
          sub="Last 30 days"
          color="bg-kula-amber/20 text-kula-amber"
        />
        <StatCard
          icon={Users}
          label="Avg Order Value"
          value={`R${((stats?.avgOrderValue || 0) / 100).toFixed(0)}`}
          color="bg-blue-500/20 text-blue-400"
        />
        <StatCard
          icon={Star}
          label="Rating"
          value={stats?.avgRating ? stats.avgRating.toFixed(1) : '---'}
          sub={restaurant?.ratingCount ? `${restaurant.ratingCount} reviews` : 'No reviews yet'}
          color="bg-purple-500/20 text-purple-400"
        />
      </div>

      {/* Pending orders */}
      <div className="card-dark p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Active Orders</h2>
          <span className="text-xs font-medium bg-kula-green/20 text-kula-green-light px-2.5 py-1 rounded-full">
            {pending.length} active
          </span>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No active orders right now</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    order.customerArrivedAt ? 'bg-kula-amber animate-pulse' :
                    order.status === 'ready' ? 'bg-kula-success' : 'bg-blue-400'
                  }`} />
                  <div>
                    <p className="text-white text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-white/40 text-xs">{order.user.name} &middot; {order.bag.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    order.customerArrivedAt
                      ? 'bg-kula-amber/20 text-kula-amber'
                      : order.status === 'ready'
                        ? 'bg-kula-success/20 text-kula-success'
                        : 'bg-blue-400/20 text-blue-400'
                  }`}>
                    {order.customerArrivedAt ? 'Customer here' : order.status}
                  </span>
                  <p className="text-white/30 text-xs mt-1">
                    <Clock size={10} className="inline mr-1" />
                    {format(new Date(order.pickupStart), 'HH:mm')} - {format(new Date(order.pickupEnd), 'HH:mm')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top bags */}
      {analytics?.data?.topBags && analytics.data.topBags.length > 0 && (
        <div className="card-dark p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Top Bags</h2>
          <div className="space-y-3">
            {analytics.data.topBags.map((bag, i) => (
              <div key={bag.bagId} className="flex items-center gap-3">
                <span className="w-6 text-center text-sm font-bold text-white/30">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{bag.title}</p>
                  <p className="text-white/40 text-xs">{bag.orderCount} orders</p>
                </div>
                <p className="text-kula-green-light text-sm font-medium">
                  R{(bag.revenue / 100).toFixed(0)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
