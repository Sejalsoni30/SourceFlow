import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { StatCard } from '../components/common/StatCard';
import { PillButton } from '../components/common/PillButton';
import { ScoreRing } from '../components/common/ScoreRing';
import { SupplierDetailDrawer } from '../components/app/SupplierDetailDrawer';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  TrendingDown,
  Users2,
  Clock,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Split,
  Plus,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricData, orderData, supplierData] = await Promise.all([
          api.getSpendMetrics(),
          api.getOrders(),
          api.getSuppliers(),
        ]);
        setMetrics(metricData);
        setOrders(orderData);
        setSuppliers(supplierData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = metrics?.history || [];

  return (
    <div className="space-y-8">
      {/* Top Greeting & Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Procurement Intelligence & Multi-Sourcing
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time status across 18 connected suppliers and 7 active multi-vendor orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PillButton
            variant="secondary"
            size="sm"
            onClick={() => navigate('/app/simulator')}
          >
            Run What-If Test
          </PillButton>
          <PillButton
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/optimizer')}
          >
            Optimize New Order
          </PillButton>
        </div>
      </div>

      {/* 4 Animated KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Sourcing Saved"
          value={metrics ? metrics.kpis.totalSavingsYTD : 284500}
          prefix="$"
          change="+23.4%"
          isPositive={true}
          changeLabel="vs single-vendor baseline"
          glowColor="emerald"
          icon={TrendingDown}
        />

        <StatCard
          title="Active Vetted Suppliers"
          value={metrics ? metrics.kpis.activeSuppliersCount : 18}
          suffix=" vendors"
          change="3 categories"
          isPositive={true}
          changeLabel="100% audited"
          glowColor="cyan"
          icon={Users2}
        />

        <StatCard
          title="Orders In Progress"
          value={metrics ? metrics.kpis.ordersInProgressCount : 7}
          suffix=" POs"
          change="98.4%"
          isPositive={true}
          changeLabel="on-time delivery SLA"
          glowColor="violet"
          icon={Clock}
        />

        <StatCard
          title="Active Risk Signals"
          value={metrics ? metrics.kpis.highRiskAlertsCount : 2}
          suffix=" alerts"
          change="Hedged"
          isPositive={false}
          changeLabel="2 mitigations queued"
          glowColor="emerald"
          icon={ShieldAlert}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spend & Savings Trajectory (Area Chart 7 cols) */}
        <GlassCard glowColor="emerald" className="lg:col-span-7 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Spend Trajectory & Net Savings</h3>
              <p className="text-xs text-slate-400">
                Single-supplier worst-case quotation vs. SourceFlow multi-vendor realized spend ($k)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" /> Single Supplier
              </span>
              <span className="flex items-center gap-1.5 text-[#00E5A0]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A0]" /> SourceFlow
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSourceflow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00E5A0" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBaseline" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(9, 13, 20, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                  formatter={(val) => [`$${val},000`, 'Spend']}
                />
                <Area
                  type="monotone"
                  dataKey="singleSupplierCost"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="url(#colorBaseline)"
                  name="Single Supplier Baseline"
                />
                <Area
                  type="monotone"
                  dataKey="sourceFlowCost"
                  stroke="#00E5A0"
                  strokeWidth={2.5}
                  fill="url(#colorSourceflow)"
                  name="SourceFlow Realized"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>Cumulative 6-month alpha: <span className="text-[#00E5A0] font-mono font-bold">+$479,000</span></span>
            <span className="font-mono text-[11px] text-[#00E5A0]">Validated against ERP ledger</span>
          </div>
        </GlassCard>

        {/* AI Autonomous Insights Panel (5 cols) */}
        <GlassCard glowColor="violet" className="lg:col-span-5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-base font-semibold text-white">AI Autonomous Recommendations</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6]">
                3 Actions
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              SourceFlow continuously monitors rate anomalies, port backlogs, and multi-supplier hedging opportunities.
            </p>

            <div className="space-y-3">
              {/* Insight 1 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#00E5A0]/40 transition-all cursor-pointer">
                <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                  <span className="flex items-center gap-1.5 text-[#00E5A0]">
                    <TrendingDown className="w-3.5 h-3.5" /> Shift 20% of Order #9821
                  </span>
                  <span className="text-[10px] font-mono text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-0.5 rounded">
                    Save $4.8k
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Novatech added high-speed SMT capacity today. Shifting 20% avoids Da Nang holiday queue and reduces unit cost by $2.40.
                </p>
              </div>

              {/* Insight 2 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/40 transition-all cursor-pointer">
                <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" /> Bauxite Price Hedge Alert
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    Action Req.
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Pre-commit Q1 casting order to Vanguard Heavy before raw aluminum price lock resets on Friday.
                </p>
              </div>

              {/* Insight 3 */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#22D3EE]/40 transition-all cursor-pointer">
                <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
                  <span className="flex items-center gap-1.5 text-[#22D3EE]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Packaging Supplier Certified
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  EcoPack Innovations renewed FSC Gold certification with zero-carbon logistics compliance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <span className="text-slate-400">FastAPI Model: Pareto v2.4</span>
            <button
              onClick={() => navigate('/app/optimizer')}
              className="text-[#00E5A0] hover:underline flex items-center gap-1"
            >
              Run Sourcing Audit <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Recent Multi-Supplier Orders Table */}
      <GlassCard glowColor="cyan" className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-semibold text-white">Recent Multi-Supplier Purchase Orders</h3>
            <p className="text-xs text-slate-400">
              Orders automatically split, audited, and tracked across diversified suppliers.
            </p>
          </div>
          <PillButton
            variant="secondary"
            size="sm"
            onClick={() => navigate('/app/orders')}
          >
            View All Orders
          </PillButton>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Product / SKU</th>
                <th className="pb-3 font-medium">Split Allocation</th>
                <th className="pb-3 font-medium">Total Spend</th>
                <th className="pb-3 font-medium">Net Savings</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 font-mono font-semibold text-white">
                    {order.id}
                  </td>
                  <td className="py-3.5">
                    <div className="font-medium text-white">{order.productName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{order.sku}</div>
                  </td>
                  <td className="py-3.5">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {order.splitRatio.map((split, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {split.name.split(' ')[0]}: <span className="text-[#00E5A0] font-bold">{split.share}%</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 font-mono text-white">
                    ${order.totalSpend.toLocaleString()}
                  </td>
                  <td className="py-3.5 font-mono">
                    <span className="text-[#00E5A0] font-semibold">
                      -${order.savings.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-[10px] ml-1">
                      (-{order.savingsPercent}%)
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/10 text-[#00E5A0] border border-emerald-500/20'
                          : order.status === 'In Transit'
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => navigate('/app/orders')}
                      className="text-xs text-slate-400 group-hover:text-white hover:underline font-mono"
                    >
                      Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Supplier Detail Slide-over Drawer */}
      <SupplierDetailDrawer
        supplier={selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
      />
    </div>
  );
};
