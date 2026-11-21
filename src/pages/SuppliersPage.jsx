import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { ScoreRing } from '../components/common/ScoreRing';
import { PillButton } from '../components/common/PillButton';
import { SupplierDetailDrawer } from '../components/app/SupplierDetailDrawer';
import { SUPPLIER_CATEGORIES } from '../data/mockData';
import { api } from '../services/api';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  Clock,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Plus
} from 'lucide-react';

export const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [sortBy, setSortBy] = useState('score');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSuppliers = async () => {
      setLoading(true);
      try {
        const data = await api.getSuppliers({
          search,
          category: selectedCategory,
          riskLevel: selectedRisk,
          sortBy,
        });
        setSuppliers(data);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSuppliers();
  }, [search, selectedCategory, selectedRisk, sortBy]);

  return (
    <div className="space-y-6">
      {/* Page Title & Add Supplier CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-white/[0.05]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" />
            <span>18 Certified Vendors • Continuous Audits</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
            Suppliers Directory & <span className="font-serif italic text-gradient-brand font-normal">Intelligence</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
            Audited supplier rate cards, reliability metrics, and live geopolitical risk tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* View Mode Toggle */}
          <div className="p-1 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <PillButton
            variant="primary"
            size="sm"
            iconComponent={Plus}
            onClick={() => alert('New Supplier Onboarding flow: You can connect your ERP or import CSV!')}
          >
            Add Supplier
          </PillButton>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <GlassCard hoverEffect={false} className="p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vendor name, city, country, or category..."
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A0]/40 transition-colors"
            />
          </div>

          {/* Sort & Risk Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Risk:</span>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="All">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="moderate">Moderate Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="score">Overall Score</option>
                <option value="price">Price Index</option>
                <option value="speed">Lead Time Speed</option>
                <option value="reliability">Reliability SLA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.06]">
          {['All', ...SUPPLIER_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 font-semibold'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => {
            const isHighRisk = supplier.riskLevel === 'high';
            const isModerateRisk = supplier.riskLevel === 'moderate';

            return (
              <GlassCard
                key={supplier.id}
                onClick={() => setSelectedSupplier(supplier)}
                className="p-6 flex flex-col justify-between group cursor-pointer"
                glowColor={isHighRisk ? 'none' : 'emerald'}
              >
                <div>
                  {/* Top Bar: Category & Risk Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                      {supplier.category}
                    </span>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isHighRisk
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : isModerateRisk
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-[#00E5A0] border border-emerald-500/30'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {supplier.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>

                  {/* Supplier Name & Location */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#00E5A0] transition-colors">
                        {supplier.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#00E5A0]" />
                        <span>{supplier.city}, {supplier.country}</span>
                      </div>
                    </div>

                    <ScoreRing score={supplier.overallScore} size={48} strokeWidth={4} />
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center my-4 font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400">Lead Time</div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {supplier.deliveryDays} days
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">On-Time</div>
                      <div className="text-xs font-bold text-[#00E5A0] mt-0.5">
                        {supplier.onTimeRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Defects</div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {supplier.defectRate}%
                      </div>
                    </div>
                  </div>

                  {/* Short Summary */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {supplier.shortSummary}
                  </p>
                </div>

                {/* Footer Certifications & Detail trigger */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
                    {supplier.certifications[0]}
                  </span>
                  <span className="text-[#00E5A0] font-mono group-hover:underline flex items-center gap-1">
                    Audit Profile →
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <GlassCard hoverEffect={false} className="p-4 overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono">
                <th className="pb-3 font-medium">Vendor</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Country</th>
                <th className="pb-3 font-medium">Lead Time</th>
                <th className="pb-3 font-medium">On-Time</th>
                <th className="pb-3 font-medium">Risk Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {suppliers.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedSupplier(s)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 font-semibold text-white group-hover:text-[#00E5A0]">
                    {s.name}
                  </td>
                  <td className="py-3.5 font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#00E5A0]/10 text-[#00E5A0] font-bold">
                      {s.overallScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-300">{s.category}</td>
                  <td className="py-3.5 text-slate-400">{s.country}</td>
                  <td className="py-3.5 font-mono text-white">{s.deliveryDays} days</td>
                  <td className="py-3.5 font-mono text-[#00E5A0]">{s.onTimeRate}%</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        s.riskLevel === 'high'
                          ? 'bg-rose-500/20 text-rose-300'
                          : s.riskLevel === 'moderate'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-[#00E5A0]'
                      }`}
                    >
                      {s.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-mono text-[#00E5A0]">
                    View Audit →
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}

      {/* Supplier Detail Drawer */}
      <SupplierDetailDrawer
        supplier={selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
      />
    </div>
  );
};
