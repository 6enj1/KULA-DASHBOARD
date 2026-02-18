import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Calendar } from 'lucide-react';
import { format, subDays } from 'date-fns';
import type { ApiResponse, Analytics as AnalyticsType } from '../../types';

const COLORS = ['#297D6B', '#66D9A6', '#F2A640', '#4DCC80', '#F25959'];

export default function Analytics() {
  const [period, setPeriod] = useState(30);

  const startDate = format(subDays(new Date(), period), 'yyyy-MM-dd');
  const endDate = format(new Date(), 'yyyy-MM-dd');

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', period],
    queryFn: () => api.get<ApiResponse<AnalyticsType>>(`/business/analytics?startDate=${startDate}&endDate=${endDate}`),
  });

  const stats = data?.data?.summary;
  const topBags = data?.data?.topBags || [];

  const orderData = [
    { name: 'Completed', value: stats?.completedOrders || 0, color: '#4DCC80' },
    { name: 'Cancelled', value: stats?.cancelledOrders || 0, color: '#F25959' },
    { name: 'Other', value: Math.max(0, (stats?.totalOrders || 0) - (stats?.completedOrders || 0) - (stats?.cancelledOrders || 0)), color: '#F2A640' },
  ].filter(d => d.value > 0);

  const revenueData = [
    { name: 'Gross', amount: (stats?.totalRevenue || 0) / 100 },
    { name: 'Fees', amount: (stats?.platformFees || 0) / 100 },
    { name: 'Net', amount: (stats?.netRevenue || 0) / 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-white/50 text-sm mt-1">Track your restaurant performance</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/5">
          {[7, 30, 90].map(d => (
            <button
              key={d}
              onClick={() => setPeriod(d)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === d ? 'bg-kula-green text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-dark p-5">
          <p className="text-white/50 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-white mt-1">{stats?.totalOrders || 0}</p>
          <p className="text-kula-success text-xs mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> {stats?.completedOrders || 0} completed
          </p>
        </div>
        <div className="card-dark p-5">
          <p className="text-white/50 text-sm">Net Revenue</p>
          <p className="text-3xl font-bold text-kula-green-light mt-1">
            R{((stats?.netRevenue || 0) / 100).toLocaleString()}
          </p>
          <p className="text-white/30 text-xs mt-2">
            R{((stats?.platformFees || 0) / 100).toFixed(0)} in platform fees
          </p>
        </div>
        <div className="card-dark p-5">
          <p className="text-white/50 text-sm">Avg Order Value</p>
          <p className="text-3xl font-bold text-white mt-1">
            R{((stats?.avgOrderValue || 0) / 100).toFixed(0)}
          </p>
        </div>
        <div className="card-dark p-5">
          <p className="text-white/50 text-sm">Rating</p>
          <p className="text-3xl font-bold text-kula-amber mt-1">
            {stats?.avgRating ? Number(stats.avgRating).toFixed(1) : '---'}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue breakdown */}
        <div className="card-dark p-5">
          <h3 className="text-white font-semibold mb-4">Revenue Breakdown</h3>
          {stats?.totalRevenue ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0F2E33', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                  formatter={(v: number) => [`R${v.toFixed(0)}`, 'Amount']}
                />
                <Bar dataKey="amount" fill="#297D6B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-white/30 text-sm">No revenue data yet</div>
          )}
        </div>

        {/* Order status pie */}
        <div className="card-dark p-5">
          <h3 className="text-white font-semibold mb-4">Order Status</h3>
          {orderData.length > 0 ? (
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={orderData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
                    {orderData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {orderData.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    <span className="text-sm text-white/70">{d.name}</span>
                    <span className="text-sm font-medium text-white ml-2">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[160px] flex items-center justify-center text-white/30 text-sm">No order data yet</div>
          )}
        </div>
      </div>

      {/* Top bags */}
      <div className="card-dark p-5">
        <h3 className="text-white font-semibold mb-4">Top Performing Bags</h3>
        {topBags.length === 0 ? (
          <p className="text-white/30 text-sm py-4 text-center">No data yet</p>
        ) : (
          <div className="space-y-3">
            {topBags.map((bag, i) => (
              <div key={bag.bagId} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-kula-green/20 flex items-center justify-center text-kula-green-light text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{bag.title}</p>
                    <p className="text-white/40 text-xs">{bag.orderCount} orders</p>
                  </div>
                </div>
                <p className="text-kula-green-light font-semibold text-sm">
                  R{(bag.revenue / 100).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
