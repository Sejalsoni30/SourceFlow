import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { PillButton } from '../components/common/PillButton';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  Split,
  ChevronDown,
  ChevronUp,
  FileText,
  MapPin,
  Truck
} from 'lucide-react';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedOrderId, setExpandedOrderId] = useState('ORD-9821'); // Expand first by default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.productName.toLowerCase().includes(search.toLowerCase()) ||
      o.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleExpand = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6]">
              Order Fulfillment Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Purchase Orders & Multi-Vendor Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Audit splits, track distributed shipments across ports, and verify realized cost savings.
          </p>
        </div>

        <PillButton
          variant="primary"
          size="sm"
          onClick={() => navigate('/app/optimizer')}
        >
          Optimize New Order
        </PillButton>
      </div>

      {/* Filter Bar */}
      <GlassCard hoverEffect={false} className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by ID, product, SKU..."
            className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A0]/40"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'In Transit', 'Production', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === status
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isExpanded = expandedOrderId === order.id;

          return (
            <GlassCard
              key={order.id}
              hoverEffect={false}
              className="p-4 sm:p-6 transition-all border-white/10 hover:border-white/20"
            >
              {/* Order Header Summary */}
              <div
                onClick={() => toggleExpand(order.id)}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-[#00E5A0] shrink-0">
                    <Split className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono font-bold text-sm sm:text-base text-white">{order.id}</span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-[#00E5A0] border border-emerald-500/30'
                            : order.status === 'In Transit'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white">{order.productName}</h3>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
                      {order.totalUnits.toLocaleString()} units • Dispatched {order.date}
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06] w-full sm:w-auto text-left sm:text-right">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Total Spend</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-white">
                      ${order.totalSpend.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Net Savings</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-[#00E5A0]">
                      -${order.savings.toLocaleString()} ({order.savingsPercent}%)
                    </div>
                  </div>

                  <button className="p-1.5 sm:p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Multi-Supplier Fulfillment Breakdown */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-6 animate-in fade-in duration-200">
                  {/* Split Distribution Bars */}
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Multi-Vendor Allocation & Tracking
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {order.splitRatio.map((split, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-white">{split.name}</span>
                            <span className="font-mono text-[#00E5A0] font-bold">
                              {split.share}% ({split.units.toLocaleString()} units)
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
                            <Truck className="w-3.5 h-3.5 text-[#22D3EE]" />
                            <span>Milestone: {split.status}</span>
                          </div>

                          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#00E5A0] rounded-full"
                              style={{ width: `${split.share}%` }}
                            />
                          </div>

                          <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                            <span>PO Subtotal: ${split.cost.toLocaleString()}</span>
                            <span>Rate Locked</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Audit Note */}
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs">
                    <span className="text-[#00E5A0] font-semibold font-mono">AI Rationale: </span>
                    <span className="text-slate-300">{order.aiDecisionNote}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => alert(`PO Export: Generating official commercial invoices and delivery notes for ${order.id}...`)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> Export PDF Rate Cards
                    </button>
                    <PillButton
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/app/optimizer')}
                    >
                      Re-order & Re-optimize
                    </PillButton>
                  </div>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
