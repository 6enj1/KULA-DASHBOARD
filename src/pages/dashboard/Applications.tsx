import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Check, X, Clock, RefreshCw, Copy } from 'lucide-react';

interface Application {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  city: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
  createdAt: string;
}

const statusConfig = {
  pending: { label: 'Pending', bg: 'bg-kula-amber/10', text: 'text-kula-amber', icon: Clock },
  approved: { label: 'Approved', bg: 'bg-kula-success/10', text: 'text-kula-success', icon: Check },
  rejected: { label: 'Rejected', bg: 'bg-kula-error/10', text: 'text-kula-error', icon: X },
};

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [inviteCodes, setInviteCodes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const url = filter ? `/partners/applications?status=${filter}` : '/partners/applications';
      const res = await api.get<{ success: boolean; data: Application[] }>(url);
      setApplications(res.data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await api.post<{ success: boolean; data: { inviteCode: string } }>(`/partners/applications/${id}/approve`);
      setInviteCodes(prev => ({ ...prev, [id]: res.data.inviteCode }));
      await fetchApplications();
    } catch {
      // ignore
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await api.post(`/partners/applications/${id}/reject`);
      await fetchApplications();
    } catch {
      // ignore
    } finally {
      setActionLoading(null);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight-heading">Partner Applications</h1>
          <p className="text-white/40 text-sm mt-1">Review and manage restaurant partner applications</p>
        </div>
        <button onClick={fetchApplications} className="sidebar-link px-3 py-2">
          <RefreshCw size={16} />
          <span className="ml-2 text-sm">Refresh</span>
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { value: '', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' },
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === tab.value
                ? 'bg-kula-green/20 text-kula-green-light'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-kula-green-light border-t-transparent rounded-full animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/30 text-sm">No applications found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => {
            const config = statusConfig[app.status];
            const StatusIcon = config.icon;
            const generatedCode = inviteCodes[app.id];

            return (
              <div key={app.id} className="glass-premium rounded-xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold text-lg truncate">{app.businessName}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                        <StatusIcon size={12} />
                        {config.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-white/30">Contact:</span>{' '}
                        <span className="text-white/70">{app.contactName}</span>
                      </div>
                      <div>
                        <span className="text-white/30">Email:</span>{' '}
                        <span className="text-white/70">{app.email}</span>
                      </div>
                      <div>
                        <span className="text-white/30">City:</span>{' '}
                        <span className="text-white/70">{app.city}</span>
                      </div>
                      <div>
                        <span className="text-white/30">Applied:</span>{' '}
                        <span className="text-white/70">{new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {app.phone && (
                      <p className="text-sm mt-2">
                        <span className="text-white/30">Phone:</span>{' '}
                        <span className="text-white/70">{app.phone}</span>
                      </p>
                    )}
                    {app.message && (
                      <p className="text-sm text-white/50 mt-3 bg-white/5 rounded-lg p-3">{app.message}</p>
                    )}
                  </div>

                  {app.status === 'pending' && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(app.id)}
                        disabled={actionLoading === app.id}
                        className="px-4 py-2 rounded-lg bg-kula-success/10 text-kula-success text-sm font-medium hover:bg-kula-success/20 transition-colors duration-300 disabled:opacity-50"
                      >
                        {actionLoading === app.id ? '...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(app.id)}
                        disabled={actionLoading === app.id}
                        className="px-4 py-2 rounded-lg bg-kula-error/10 text-kula-error text-sm font-medium hover:bg-kula-error/20 transition-colors duration-300 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>

                {generatedCode && (
                  <div className="mt-4 p-3 rounded-lg bg-kula-success/5 border border-kula-success/20 flex items-center gap-3">
                    <Check size={16} className="text-kula-success shrink-0" />
                    <span className="text-kula-success text-sm">Invite code sent:</span>
                    <code className="text-kula-green-light font-mono text-sm font-bold">{generatedCode}</code>
                    <button
                      onClick={() => copyCode(generatedCode)}
                      className="ml-auto text-white/40 hover:text-white/70 transition-colors"
                    >
                      {copied === generatedCode ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
